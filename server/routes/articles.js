'use strict';

const express = require('express');
const router = express.Router();
const { getDb } = require('../database/db');
const { sanitizeString } = require('../middleware/validation');

/**
 * GET /api/articles
 * List all published articles (without full content).
 * Optional query params: ?category=xxx&limit=10&offset=0
 */
router.get('/', (req, res) => {
  const db = getDb();

  const category = sanitizeString(req.query.category, 100);
  const limit = Math.min(parseInt(req.query.limit, 10) || 20, 100);
  const offset = Math.max(parseInt(req.query.offset, 10) || 0, 0);

  let query = `
    SELECT id, slug, title, excerpt, category, author, created_at, updated_at
    FROM articles
    WHERE published = 1
  `;
  const params = [];

  if (category) {
    query += ' AND category = ?';
    params.push(category);
  }

  query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  params.push(limit, offset);

  const articles = db.prepare(query).all(...params);
  const total = db.prepare(
    `SELECT COUNT(*) as count FROM articles WHERE published = 1${category ? ' AND category = ?' : ''}`
  ).get(...(category ? [category] : []));

  res.json({
    success: true,
    articles,
    pagination: {
      total: total.count,
      limit,
      offset,
      hasMore: offset + limit < total.count,
    },
  });
});

/**
 * GET /api/articles/:slug
 * Fetch a single published article by slug.
 */
router.get('/:slug', (req, res) => {
  const slug = sanitizeString(req.params.slug, 200);
  if (!slug) {
    return res.status(400).json({ success: false, error: 'Ogiltig slug.' });
  }

  const db = getDb();
  const article = db.prepare(
    'SELECT * FROM articles WHERE slug = ? AND published = 1'
  ).get(slug);

  if (!article) {
    return res.status(404).json({ success: false, error: 'Artikeln hittades inte.' });
  }

  res.json({ success: true, article });
});

module.exports = router;
