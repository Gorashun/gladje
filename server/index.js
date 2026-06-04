'use strict';

require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

const { initDb, closeDb } = require('./database/db');
const { apiRateLimit } = require('./middleware/validation');

const quizRoutes = require('./routes/quiz');
const leadsRoutes = require('./routes/leads');
const articlesRoutes = require('./routes/articles');
const webhookRoutes = require('./routes/webhook');

// ---------------------------------------------------------------------------
// App setup
// ---------------------------------------------------------------------------

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// ---------------------------------------------------------------------------
// Security headers
// ---------------------------------------------------------------------------

app.set('trust proxy', 1); // Trust first proxy (nginx)

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"], // Allow inline scripts for SPA
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'"],
        fontSrc: ["'self'", 'https:', 'data:'],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
  })
);

// ---------------------------------------------------------------------------
// CORS
// ---------------------------------------------------------------------------

const allowedOrigins =
  NODE_ENV === 'production'
    ? [FRONTEND_URL, 'https://gladjeharmoni.se', 'https://www.gladjeharmoni.se']
    : [FRONTEND_URL, 'http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:5173'];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, etc.) in dev
      if (!origin && NODE_ENV !== 'production') return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS: origin "${origin}" not allowed`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ---------------------------------------------------------------------------
// Body parsing (JSON for all routes except /webhook/github which uses raw)
// ---------------------------------------------------------------------------

app.use((req, res, next) => {
  if (req.path === '/webhook/github') return next(); // handled by express.raw in route
  express.json({ limit: '10kb' })(req, res, next);
});

// ---------------------------------------------------------------------------
// Static frontend serving
// ---------------------------------------------------------------------------

const FRONTEND_DIST = path.resolve(__dirname, '../src');
app.use(express.static(FRONTEND_DIST, { maxAge: NODE_ENV === 'production' ? '1d' : 0 }));

// ---------------------------------------------------------------------------
// Health check (no rate limit, no auth)
// ---------------------------------------------------------------------------

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    env: NODE_ENV,
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

// ---------------------------------------------------------------------------
// API routes
// ---------------------------------------------------------------------------

app.use('/api', apiRateLimit);
app.use('/api/quiz', quizRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/api/articles', articlesRoutes);
app.use('/webhook', webhookRoutes);

// ---------------------------------------------------------------------------
// SPA fallback — serve index.html for all non-API routes
// ---------------------------------------------------------------------------

app.get('*', (req, res) => {
  res.sendFile(path.join(FRONTEND_DIST, 'index.html'), (err) => {
    if (err) {
      res.status(404).json({ error: 'Not found' });
    }
  });
});

// ---------------------------------------------------------------------------
// Error handling middleware
// ---------------------------------------------------------------------------

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // CORS errors
  if (err.message && err.message.startsWith('CORS:')) {
    return res.status(403).json({ error: err.message });
  }
  console.error('Unhandled error:', err.message || err);
  res.status(500).json({ error: 'Internt serverfel.' });
});

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------

let server;

function start() {
  try {
    initDb();
  } catch (err) {
    console.error('Fatal: database initialization failed:', err.message);
    process.exit(1);
  }

  server = app.listen(PORT, () => {
    console.log(`[Glädje & Harmoni] Server running on port ${PORT} (${NODE_ENV})`);
    console.log(`  Frontend dist: ${FRONTEND_DIST}`);
    console.log(`  Database: ${process.env.DATABASE_PATH || './data/gladje.db'}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use.`);
    } else {
      console.error('Server error:', err);
    }
    process.exit(1);
  });
}

// ---------------------------------------------------------------------------
// Graceful shutdown
// ---------------------------------------------------------------------------

function gracefulShutdown(signal) {
  console.log(`\nReceived ${signal}. Shutting down gracefully...`);
  if (server) {
    server.close(() => {
      console.log('HTTP server closed.');
      closeDb();
      console.log('Database connection closed.');
      process.exit(0);
    });
    // Force exit after 10 seconds
    setTimeout(() => {
      console.error('Forced shutdown after timeout.');
      process.exit(1);
    }, 10000).unref();
  } else {
    closeDb();
    process.exit(0);
  }
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  gracefulShutdown('uncaughtException');
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason);
});

start();

module.exports = app; // for testing
