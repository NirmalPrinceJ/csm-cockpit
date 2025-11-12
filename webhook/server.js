/**
 * CSM Intelligence Platform - Webhook Receiver
 *
 * Receives data from external sources (Salesforce, Email parsers, Slack bots, etc.)
 * and pushes directly into Coda via the UpsertData action
 *
 * Deploy to: Heroku, Vercel, Railway, or any Node.js host
 */

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration from environment variables
const CODA_API_TOKEN = process.env.CODA_API_TOKEN; // Your Coda API token
const CODA_DOC_ID = process.env.CODA_DOC_ID; // Your Coda doc ID
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'your-secret-key'; // For security

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ============================================================================
// HEALTH CHECK ENDPOINT
// ============================================================================

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'CSM Intelligence Webhook',
    timestamp: new Date().toISOString()
  });
});

// ============================================================================
// UNIVERSAL WEBHOOK ENDPOINT
// ============================================================================

/**
 * POST /webhook
 *
 * Body format:
 * {
 *   "secret": "your-secret-key",
 *   "table": "accounts",
 *   "data": {
 *     "accountName": "Gard AS",
 *     "arr": 850000,
 *     "healthScore": 80
 *   }
 * }
 *
 * Or batch:
 * {
 *   "secret": "your-secret-key",
 *   "table": "accounts",
 *   "data": [
 *     {"accountName": "Gard AS", "arr": 850000},
 *     {"accountName": "Wates Group", "arr": 99000}
 *   ]
 * }
 */
app.post('/webhook', async (req, res) => {
  try {
    // Verify secret
    if (req.body.secret !== WEBHOOK_SECRET) {
      return res.status(401).json({ error: 'Invalid secret' });
    }

    const { table, data } = req.body;

    if (!table || !data) {
      return res.status(400).json({
        error: 'Missing required fields: table and data'
      });
    }

    // Send to Coda via UpsertData action
    const result = await sendToCoda(table, data);

    res.json({
      success: true,
      message: `Data upserted to ${table}`,
      result: result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// ============================================================================
// SALESFORCE DATA IMPORT (Manual via Slack)
// ============================================================================
// Note: No direct Salesforce webhook
// Data flows: Salesforce → Manual export → Slack command → Coda
// Or: Salesforce → Zapier → Webhook → Coda

// ============================================================================
// EMAIL PARSER WEBHOOK ENDPOINT
// ============================================================================

/**
 * POST /webhook/email
 *
 * Receives parsed email data (from Zapier, Make.com, or custom parser)
 */
app.post('/webhook/email', async (req, res) => {
  try {
    if (req.body.secret !== WEBHOOK_SECRET) {
      return res.status(401).json({ error: 'Invalid secret' });
    }

    // Email data format
    const emailData = req.body.data;

    // Create engagement record
    const engagement = {
      account: emailData.account,
      engagementDate: new Date().toISOString().split('T')[0],
      engagementType: 'Email',
      sentiment: emailData.sentiment || 'Neutral',
      keyTopicsDiscussed: emailData.subject + ': ' + emailData.summary,
      attendeesCustomer: emailData.fromEmail,
      attendeesMuleSoft: emailData.toEmail,
    };

    const result = await sendToCoda('engagements', engagement);

    res.json({
      success: true,
      message: 'Email logged as engagement',
      result: result
    });

  } catch (error) {
    console.error('Email webhook error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ============================================================================
// SLACK BOT WEBHOOK ENDPOINT
// ============================================================================

/**
 * POST /webhook/slack
 *
 * Receives Slack slash command data
 * Example: /csm-update account:"Gard AS" health:82
 */
app.post('/webhook/slack', async (req, res) => {
  try {
    // Slack sends form-encoded data
    const slackData = req.body;

    // Parse command text (simple key:value parser)
    const updates = parseSlackCommand(slackData.text);

    if (updates.account) {
      // Update account health
      const accountData = {
        accountName: updates.account,
        healthScore: updates.health || updates.healthScore,
        riskLevel: updates.risk || updates.riskLevel,
        // Add more fields as needed
      };

      const result = await sendToCoda('accounts', accountData);

      // Respond to Slack
      res.json({
        response_type: 'in_channel',
        text: `✅ Updated ${updates.account}: ${result}`
      });
    } else {
      res.json({
        response_type: 'ephemeral',
        text: 'Usage: /csm-update account:"Account Name" health:80'
      });
    }

  } catch (error) {
    console.error('Slack webhook error:', error);
    res.json({
      response_type: 'ephemeral',
      text: `Error: ${error.message}`
    });
  }
});

// ============================================================================
// SCHEDULED JOB ENDPOINT (Call from cron service)
// ============================================================================

/**
 * POST /job/calculate-health
 *
 * Calculates composite health scores for all accounts
 * Call this from a cron service (cron-job.org, EasyCron, etc.)
 */
app.post('/job/calculate-health', async (req, res) => {
  try {
    if (req.body.secret !== WEBHOOK_SECRET) {
      return res.status(401).json({ error: 'Invalid secret' });
    }

    // In a real implementation, you'd fetch current data from Coda,
    // calculate new health scores, then update back

    // Example: Fetch accounts, calculate, update
    // This requires Coda API read access

    res.json({
      success: true,
      message: 'Health score calculation job completed',
      processed: 0 // Would be actual count
    });

  } catch (error) {
    console.error('Health calculation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Send data to Coda using UpsertData action
 */
async function sendToCoda(table, data) {
  try {
    // Prepare UpsertData payload
    const upsertPayload = {
      table: table,
      data: data
    };

    // Call Coda Packs API
    // Note: This uses Coda's Packs API which requires the pack to be installed in the doc
    const response = await axios.post(
      `https://coda.io/apis/v1/docs/${CODA_DOC_ID}/formulas/UpsertData`,
      {
        parameters: [JSON.stringify(upsertPayload)]
      },
      {
        headers: {
          'Authorization': `Bearer ${CODA_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;

  } catch (error) {
    console.error('Error sending to Coda:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Parse Slack command text
 * Example: account:"Gard AS" health:80 risk:Medium
 */
function parseSlackCommand(text) {
  const result = {};

  // Match key:value or key:"quoted value"
  const regex = /(\w+):(?:"([^"]+)"|(\S+))/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const key = match[1];
    const value = match[2] || match[3];

    // Try to parse as number if possible
    result[key] = isNaN(value) ? value : parseFloat(value);
  }

  return result;
}

// ============================================================================
// START SERVER
// ============================================================================

app.listen(PORT, () => {
  console.log(`🚀 CSM Intelligence Webhook Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 Webhook endpoint: http://localhost:${PORT}/webhook`);
  console.log(`\n⚠️  Make sure to set environment variables:`);
  console.log(`   CODA_API_TOKEN=<your-token>`);
  console.log(`   CODA_DOC_ID=<your-doc-id>`);
  console.log(`   WEBHOOK_SECRET=<your-secret>\n`);
});

module.exports = app;
