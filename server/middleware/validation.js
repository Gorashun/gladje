'use strict';

const crypto = require('crypto');
const rateLimit = require('express-rate-limit');

/**
 * Validate email format
 */
function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim()) && email.length <= 254;
}

/**
 * Hash an IP address with SHA-256 + salt for GDPR compliance
 */
function hashIp(ip) {
  const salt = process.env.IP_HASH_SALT || 'gladje-harmoni-default-salt';
  return crypto
    .createHmac('sha256', salt)
    .update(ip || 'unknown')
    .digest('hex');
}

/**
 * Sanitize a string input
 */
function sanitizeString(value, maxLength = 255) {
  if (value === null || value === undefined) return null;
  return String(value).trim().substring(0, maxLength);
}

/**
 * Middleware: validate email in request body
 */
function validateEmail(req, res, next) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, error: 'E-postadress krävs.' });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ success: false, error: 'Ogiltig e-postadress.' });
  }
  req.body.email = email.trim().toLowerCase();
  next();
}

/**
 * Rate limiter: quiz submissions — 5 per IP per hour
 */
const quizRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => hashIp(req.ip),
  message: {
    success: false,
    error: 'För många försök. Försök igen om en timme.',
  },
});

/**
 * Rate limiter: lead opt-in — 10 per IP per hour
 */
const leadRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => hashIp(req.ip),
  message: {
    success: false,
    error: 'För många förfrågningar. Försök igen senare.',
  },
});

/**
 * General API rate limiter
 */
const apiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => hashIp(req.ip),
  message: {
    success: false,
    error: 'För många förfrågningar. Försök igen senare.',
  },
});

module.exports = {
  isValidEmail,
  hashIp,
  sanitizeString,
  validateEmail,
  quizRateLimit,
  leadRateLimit,
  apiRateLimit,
};
