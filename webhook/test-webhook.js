/**
 * Test script for webhook server
 * Run: node test-webhook.js
 */

const axios = require('axios');

const WEBHOOK_URL = process.env.WEBHOOK_URL || 'http://localhost:3000';
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'your-secret-key';

async function testWebhook() {
  console.log('🧪 Testing CSM Intelligence Webhook...\n');

  // Test 1: Health check
  console.log('Test 1: Health check');
  try {
    const health = await axios.get(`${WEBHOOK_URL}/health`);
    console.log('✅ Health check passed:', health.data);
  } catch (error) {
    console.log('❌ Health check failed:', error.message);
  }

  console.log('\n---\n');

  // Test 2: Single account upsert
  console.log('Test 2: Single account upsert');
  try {
    const response = await axios.post(`${WEBHOOK_URL}/webhook`, {
      secret: WEBHOOK_SECRET,
      table: 'accounts',
      data: {
        accountName: 'Test Account',
        arr: 500000,
        healthScore: 85,
        customerSuccessManager: 'Test CSM',
        industryVertical: 'Technology'
      }
    });
    console.log('✅ Single account upsert:', response.data);
  } catch (error) {
    console.log('❌ Single account upsert failed:', error.response?.data || error.message);
  }

  console.log('\n---\n');

  // Test 3: Batch accounts upsert
  console.log('Test 3: Batch accounts upsert');
  try {
    const response = await axios.post(`${WEBHOOK_URL}/webhook`, {
      secret: WEBHOOK_SECRET,
      table: 'accounts',
      data: [
        {
          accountName: 'Test Account 1',
          arr: 300000,
          healthScore: 75
        },
        {
          accountName: 'Test Account 2',
          arr: 450000,
          healthScore: 82
        }
      ]
    });
    console.log('✅ Batch accounts upsert:', response.data);
  } catch (error) {
    console.log('❌ Batch accounts upsert failed:', error.response?.data || error.message);
  }

  console.log('\n---\n');

  // Test 4: Objective upsert
  console.log('Test 4: Objective upsert');
  try {
    const response = await axios.post(`${WEBHOOK_URL}/webhook`, {
      secret: WEBHOOK_SECRET,
      table: 'objectives',
      data: {
        account: 'Test Account',
        objectiveName: 'Reduce API Latency',
        status: 'In Progress',
        progressPercent: 60,
        businessValueUsd: 250000
      }
    });
    console.log('✅ Objective upsert:', response.data);
  } catch (error) {
    console.log('❌ Objective upsert failed:', error.response?.data || error.message);
  }

  console.log('\n---\n');

  // Test 5: Engagement upsert
  console.log('Test 5: Engagement upsert');
  try {
    const response = await axios.post(`${WEBHOOK_URL}/webhook`, {
      secret: WEBHOOK_SECRET,
      table: 'engagements',
      data: {
        account: 'Test Account',
        engagementDate: new Date().toISOString().split('T')[0],
        engagementType: 'QBR',
        sentiment: 'Positive',
        keyTopicsDiscussed: 'Q4 planning, Platform health review'
      }
    });
    console.log('✅ Engagement upsert:', response.data);
  } catch (error) {
    console.log('❌ Engagement upsert failed:', error.response?.data || error.message);
  }

  console.log('\n---\n');

  // Test 6: Salesforce webhook
  console.log('Test 6: Salesforce webhook');
  try {
    const response = await axios.post(`${WEBHOOK_URL}/webhook/salesforce`, {
      secret: WEBHOOK_SECRET,
      data: {
        AccountName: 'Salesforce Test Account',
        Amount: 850000,
        CloseDate: '2025-06-30',
        OwnerName: 'John Doe',
        Industry: 'Financial Services'
      }
    });
    console.log('✅ Salesforce webhook:', response.data);
  } catch (error) {
    console.log('❌ Salesforce webhook failed:', error.response?.data || error.message);
  }

  console.log('\n---\n');

  // Test 7: Email webhook
  console.log('Test 7: Email webhook');
  try {
    const response = await axios.post(`${WEBHOOK_URL}/webhook/email`, {
      secret: WEBHOOK_SECRET,
      data: {
        account: 'Test Account',
        subject: 'QBR Meeting Follow-up',
        summary: 'Discussed platform health and Q4 objectives',
        sentiment: 'Positive',
        fromEmail: 'customer@example.com',
        toEmail: 'csm@company.com'
      }
    });
    console.log('✅ Email webhook:', response.data);
  } catch (error) {
    console.log('❌ Email webhook failed:', error.response?.data || error.message);
  }

  console.log('\n---\n');

  // Test 8: Invalid secret
  console.log('Test 8: Invalid secret (should fail)');
  try {
    const response = await axios.post(`${WEBHOOK_URL}/webhook`, {
      secret: 'wrong-secret',
      table: 'accounts',
      data: { accountName: 'Test' }
    });
    console.log('❌ Should have failed but passed:', response.data);
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('✅ Correctly rejected invalid secret');
    } else {
      console.log('❌ Unexpected error:', error.message);
    }
  }

  console.log('\n✅ All tests completed!\n');
}

// Run tests
testWebhook().catch(console.error);
