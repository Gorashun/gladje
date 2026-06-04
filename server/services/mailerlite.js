'use strict';

const axios = require('axios');

const API_BASE = 'https://api.mailerlite.com/api/v2';

function getHeaders() {
  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) {
    throw new Error('MAILERLITE_API_KEY is not configured');
  }
  return {
    'X-MailerLite-ApiKey': apiKey,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
}

/**
 * Map quiz category to MailerLite group ID.
 * Override via env vars if needed, otherwise fall back to default group.
 */
function getGroupIdForCategory(category) {
  const categoryGroupMap = {
    borja: process.env.MAILERLITE_GROUP_BORJA || process.env.MAILERLITE_GROUP_ID,
    forbattring: process.env.MAILERLITE_GROUP_FORBATTRING || process.env.MAILERLITE_GROUP_ID,
    god: process.env.MAILERLITE_GROUP_GOD || process.env.MAILERLITE_GROUP_ID,
    optimerare: process.env.MAILERLITE_GROUP_OPTIMERARE || process.env.MAILERLITE_GROUP_ID,
  };
  return categoryGroupMap[category] || process.env.MAILERLITE_GROUP_ID;
}

/**
 * Add a subscriber to MailerLite and assign to the appropriate group.
 */
async function addSubscriber(email, firstName, fields = {}) {
  const groupId = getGroupIdForCategory(fields.quiz_category);

  if (!groupId) {
    console.warn('MailerLite: No group ID configured, skipping group assignment.');
  }

  // Upsert subscriber
  const subscriberPayload = {
    email: email.toLowerCase().trim(),
    name: firstName || '',
    fields: {
      quiz_category: fields.quiz_category || '',
      quiz_score: fields.quiz_score !== undefined ? String(fields.quiz_score) : '',
      opted_in_at: fields.opted_in_at || new Date().toISOString(),
    },
    resubscribe: false,
  };

  let subscriberId = null;

  try {
    const response = await axios.post(
      `${API_BASE}/subscribers`,
      subscriberPayload,
      { headers: getHeaders() }
    );
    subscriberId = response.data && response.data.id ? String(response.data.id) : null;
    // Note: never log email in plaintext
    console.log('MailerLite: subscriber upserted, id:', subscriberId);
  } catch (err) {
    const status = err.response && err.response.status;
    const message = err.response && err.response.data
      ? JSON.stringify(err.response.data)
      : err.message;
    console.error(`MailerLite addSubscriber error (status ${status}):`, message);
    throw err;
  }

  // Assign to group
  if (groupId && subscriberId) {
    try {
      await axios.post(
        `${API_BASE}/groups/${groupId}/subscribers`,
        { email: email.toLowerCase().trim() },
        { headers: getHeaders() }
      );
      console.log(`MailerLite: subscriber added to group ${groupId}`);
    } catch (err) {
      // Non-fatal — subscriber was already created
      const status = err.response && err.response.status;
      console.warn(`MailerLite: could not add to group ${groupId} (status ${status})`);
    }
  }

  return subscriberId;
}

/**
 * Remove a subscriber by email (GDPR deletion).
 */
async function removeSubscriber(email) {
  const normalizedEmail = email.toLowerCase().trim();
  try {
    // Fetch subscriber first to get id
    const searchResponse = await axios.get(
      `${API_BASE}/subscribers/${encodeURIComponent(normalizedEmail)}`,
      { headers: getHeaders() }
    );
    const id = searchResponse.data && searchResponse.data.id;
    if (!id) {
      console.warn('MailerLite removeSubscriber: subscriber not found');
      return false;
    }
    await axios.delete(`${API_BASE}/subscribers/${id}`, { headers: getHeaders() });
    console.log('MailerLite: subscriber deleted, id:', id);
    return true;
  } catch (err) {
    const status = err.response && err.response.status;
    if (status === 404) {
      console.warn('MailerLite removeSubscriber: subscriber not found (404)');
      return false;
    }
    const message = err.response && err.response.data
      ? JSON.stringify(err.response.data)
      : err.message;
    console.error(`MailerLite removeSubscriber error (status ${status}):`, message);
    throw err;
  }
}

/**
 * Trigger a quiz-result automation for a subscriber.
 * MailerLite v2 automations are triggered by adding a subscriber to a specific group
 * or via a workflow trigger group. Configure MAILERLITE_AUTOMATION_GROUP_ID for this.
 */
async function sendQuizResult(email, firstName, category, score, recommendations) {
  const automationGroupId = process.env.MAILERLITE_AUTOMATION_GROUP_ID;
  if (!automationGroupId) {
    console.warn('MailerLite sendQuizResult: MAILERLITE_AUTOMATION_GROUP_ID not set, skipping automation trigger.');
    return false;
  }

  try {
    // Update subscriber fields with result data, then add to automation group
    const payload = {
      email: email.toLowerCase().trim(),
      name: firstName || '',
      fields: {
        quiz_category: category || '',
        quiz_score: score !== undefined ? String(score) : '',
        quiz_recommendations: Array.isArray(recommendations)
          ? recommendations.slice(0, 3).join(' | ')
          : '',
      },
      resubscribe: false,
    };

    await axios.post(`${API_BASE}/subscribers`, payload, { headers: getHeaders() });

    // Add to automation-trigger group
    await axios.post(
      `${API_BASE}/groups/${automationGroupId}/subscribers`,
      { email: email.toLowerCase().trim() },
      { headers: getHeaders() }
    );

    console.log('MailerLite: quiz result automation triggered for group', automationGroupId);
    return true;
  } catch (err) {
    const status = err.response && err.response.status;
    const message = err.response && err.response.data
      ? JSON.stringify(err.response.data)
      : err.message;
    console.error(`MailerLite sendQuizResult error (status ${status}):`, message);
    // Non-fatal: do not propagate to caller
    return false;
  }
}

module.exports = { addSubscriber, removeSubscriber, sendQuizResult };
