# Webhook Integration Guide - CSM Intelligence Platform

## Overview

This guide shows you how to set up **direct, real-time data pipelines** into your Coda CSM Intelligence Platform.

**No more manual data entry. No tool hopping. Just automated data flow.**

---

## What You're Building

```
┌─────────────────┐
│   Salesforce    │──┐
└─────────────────┘  │
                     │
┌─────────────────┐  │
│  Email Parser   │──┤
└─────────────────┘  │         ┌──────────────┐         ┌──────────────┐
                     ├────────→│   Webhook    │────────→│  Coda Pack   │
┌─────────────────┐  │         │    Server    │         │  UpsertData  │
│   Slack Bot     │──┤         └──────────────┘         └──────────────┘
└─────────────────┘  │                                           ↓
                     │                                   ┌──────────────┐
┌─────────────────┐  │                                   │ Coda Tables  │
│ Custom Scripts  │──┘                                   │ (14 tables)  │
└─────────────────┘                                      └──────────────┘
```

**Result:** Data from ANY source → Automatically appears in Coda

---

## Prerequisites

✅ **Pack Version 16 installed** in your Coda doc (includes UpsertData action)
✅ **Node.js 16+** installed (`node --version`)
✅ **Coda API token** (get from https://coda.io/account)
✅ **Hosting account** (Heroku free tier works perfectly)

---

## Part 1: Local Setup & Testing (15 minutes)

### Step 1: Install Webhook Server

```bash
cd webhook
npm install
```

### Step 2: Configure Environment

```bash
cp .env.example .env
```

Edit `.env`:
```env
CODA_API_TOKEN=your-api-token-here
CODA_DOC_ID=your-doc-id-here
WEBHOOK_SECRET=csm-webhook-2024
```

**Get your values:**

1. **CODA_API_TOKEN**:
   - Go to https://coda.io/account
   - Click "Generate API token"
   - Copy token

2. **CODA_DOC_ID**:
   - Open your CSM doc
   - URL is `https://coda.io/d/_dABCD1234`
   - Copy `ABCD1234` (everything after `_d`)

3. **WEBHOOK_SECRET**:
   - Create any random string
   - Example: `csm-intelligence-2024-secret`

### Step 3: Start Server

```bash
npm start
```

You should see:
```
🚀 CSM Intelligence Webhook Server running on port 3000
📊 Health check: http://localhost:3000/health
🔗 Webhook endpoint: http://localhost:3000/webhook
```

### Step 4: Test It

Open new terminal:
```bash
npm test
```

This runs 8 tests:
- ✅ Health check
- ✅ Single account upsert
- ✅ Batch accounts upsert
- ✅ Objective upsert
- ✅ Engagement upsert
- ✅ Salesforce webhook
- ✅ Email webhook
- ✅ Invalid secret rejection

**If all tests pass, you're ready for production!**

---

## Part 2: Deploy to Production (10 minutes)

### Option A: Heroku (Recommended - Free Tier Available)

```bash
# Install Heroku CLI
brew install heroku  # Mac
# or download from heroku.com

# Login
heroku login

# Create app
heroku create csm-intelligence-webhook

# Set environment variables
heroku config:set CODA_API_TOKEN=your-token
heroku config:set CODA_DOC_ID=your-doc-id
heroku config:set WEBHOOK_SECRET=your-secret

# Deploy
cd webhook
git init
git add .
git commit -m "Deploy webhook"
heroku git:remote -a csm-intelligence-webhook
git push heroku main
```

**Your webhook URL:**
`https://csm-intelligence-webhook.herokuapp.com/webhook`

**Verify it's working:**
```bash
curl https://csm-intelligence-webhook.herokuapp.com/health
```

### Option B: Railway (Free Tier, No Credit Card)

1. Go to https://railway.app
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Connect your repo
5. Set root directory to `/webhook`
6. Add environment variables:
   - `CODA_API_TOKEN`
   - `CODA_DOC_ID`
   - `WEBHOOK_SECRET`
7. Deploy!

Railway gives you a URL like:
`https://csm-webhook-production.up.railway.app`

### Option C: Vercel (Serverless)

```bash
npm install -g vercel
cd webhook
vercel

# Follow prompts
# Set environment variables in Vercel dashboard
```

---

## Part 3: Integrate with External Systems

### Integration 1: Salesforce → Coda (RECOMMENDED)

Salesforce is already approved at your company for workflow capture.

#### Setup Steps:

**1. In Salesforce:**
   - Setup → Process Builder → New Process
   - Object: Opportunity
   - Trigger: When a record is created or edited
   - Criteria: `IsClosed = TRUE AND IsWon = TRUE`

**2. Add Action:**
   - Action Type: Send Custom Notification
   - Or use Salesforce Flow → HTTP Callout
   - URL: `https://your-webhook.herokuapp.com/webhook/salesforce`
   - Method: POST
   - Body:
```json
{
  "secret": "your-webhook-secret",
  "data": {
    "AccountName": "{!Account.Name}",
    "Amount": "{!Opportunity.Amount}",
    "CloseDate": "{!Opportunity.CloseDate}",
    "OwnerName": "{!Opportunity.Owner.Name}",
    "Industry": "{!Account.Industry}"
  }
}
```

**Result:** Every closed-won opportunity → Auto-creates/updates account in Coda

---

### Integration 2: Email → Coda (via Zapier/Make.com)

#### Zapier Setup:

**1. Create Zap:**
   - Trigger: Gmail → New Email Matching Search
   - Search: `label:csm-update`

**2. Add Action:**
   - Action: Webhooks → POST
   - URL: `https://your-webhook.herokuapp.com/webhook/email`
   - Payload:
```json
{
  "secret": "your-webhook-secret",
  "data": {
    "account": "{{Email Subject}}",
    "subject": "{{Email Subject}}",
    "summary": "{{Email Body Plain}}",
    "sentiment": "Neutral",
    "fromEmail": "{{Email From}}",
    "toEmail": "{{Email To}}"
  }
}
```

**Usage:** Forward any email to yourself with label "csm-update" → Logged as engagement

**Pro Tip:** Use AI to parse email content:
- Add "ChatGPT" step in Zapier
- Extract account name, sentiment, key topics
- Send structured data to webhook

---

### Integration 3: Slack → Coda

#### Create Slack Bot:

**1. Go to https://api.slack.com/apps**

**2. Create New App:**
   - Name: CSM Intelligence Bot
   - Workspace: Your workspace

**3. Add Slash Command:**
   - Command: `/csm-update`
   - Request URL: `https://your-webhook.herokuapp.com/webhook/slack`
   - Description: Update CSM account data
   - Usage Hint: `account:"Account Name" health:80`

**4. Install App to Workspace**

**Usage:**
```
/csm-update account:"Gard AS" health:85 risk:Low
/csm-update account:"Wates Group" health:72 risk:Medium
```

**Result:** Updates pushed to Coda instantly

---

### Integration 4: Custom Python Scripts

**Example: Update from internal system**

```python
import requests
import os

WEBHOOK_URL = os.getenv("WEBHOOK_URL")
WEBHOOK_SECRET = os.getenv("WEBHOOK_SECRET")

def update_account_health(account_name, health_score):
    payload = {
        "secret": WEBHOOK_SECRET,
        "table": "accounts",
        "data": {
            "accountName": account_name,
            "healthScore": health_score
        }
    }

    response = requests.post(WEBHOOK_URL, json=payload)
    return response.json()

# Usage
result = update_account_health("Gard AS", 85)
print(result)
```

**Deploy as cron job:**
```bash
# crontab -e
0 2 * * * /usr/bin/python3 /path/to/update_health.py
```

Runs daily at 2 AM.

---

### Integration 5: Google Sheets → Coda

**Use Case:** Team maintains data in Google Sheets, auto-sync to Coda

**Setup:**

**1. Create Google Apps Script:**
   - Tools → Script editor
   - Paste:
```javascript
function syncToCoda() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Accounts");
  const data = sheet.getDataRange().getValues();

  const webhookUrl = "https://your-webhook.herokuapp.com/webhook";
  const secret = "your-webhook-secret";

  // Skip header row
  for (let i = 1; i < data.length; i++) {
    const row = data[i];

    const payload = {
      secret: secret,
      table: "accounts",
      data: {
        accountName: row[0],
        arr: row[1],
        healthScore: row[2],
        customerSuccessManager: row[3]
      }
    };

    UrlFetchApp.fetch(webhookUrl, {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(payload)
    });
  }
}
```

**2. Set Trigger:**
   - Edit → Current project's triggers
   - Add trigger: `syncToCoda`
   - Event source: Time-driven
   - Type: Hour timer
   - Every: 1 hour

**Result:** Google Sheets → Auto-syncs to Coda every hour

---

## Part 4: Real-Time Health Score Calculation

**Problem:** Health scores need daily recalculation

**Solution:** Scheduled webhook call

### Setup:

**1. Create cron job script:**

```python
# calculate_health.py
import requests
import os

WEBHOOK_URL = os.getenv("WEBHOOK_URL")
SECRET = os.getenv("WEBHOOK_SECRET")

# This would fetch data, calculate health, update Coda
# For now, example:

accounts = [
    {"accountName": "Gard AS", "healthScore": 85},
    {"accountName": "Wates Group", "healthScore": 72}
]

for account in accounts:
    payload = {
        "secret": SECRET,
        "table": "accounts",
        "data": account
    }
    requests.post(WEBHOOK_URL, json=payload)

print("Health scores updated!")
```

**2. Schedule with cron-job.org (free):**
   - Go to https://cron-job.org
   - Create account
   - Add job:
     - Title: Calculate CSM Health Scores
     - URL: POST to `https://your-webhook.herokuapp.com/job/calculate-health`
     - Body: `{"secret": "your-secret"}`
     - Schedule: Daily at 2:00 AM

**Result:** Health scores auto-calculated daily

---

## Part 5: Monitoring & Maintenance

### Check Server Health

```bash
curl https://your-webhook.herokuapp.com/health
```

Should return:
```json
{
  "status": "ok",
  "service": "CSM Intelligence Webhook",
  "timestamp": "2024-11-15T10:30:00Z"
}
```

### View Logs (Heroku)

```bash
heroku logs --tail --app csm-intelligence-webhook
```

### View Logs (Railway)

In Railway dashboard → Your project → Deployments → View logs

### Set Up Monitoring (Optional)

**Use UptimeRobot (free):**
1. Go to https://uptimerobot.com
2. Add monitor:
   - Type: HTTP(s)
   - URL: `https://your-webhook.herokuapp.com/health`
   - Interval: 5 minutes
3. Add alert contacts (email, Slack)

**Result:** Get notified if webhook goes down

---

## Troubleshooting

### Issue: "Invalid secret"

**Cause:** Secret in request doesn't match `WEBHOOK_SECRET`

**Fix:**
```bash
# Check your environment variable
heroku config:get WEBHOOK_SECRET

# Update if needed
heroku config:set WEBHOOK_SECRET=new-secret
```

### Issue: "Failed to send to Coda"

**Cause:** Coda API token invalid or doc ID wrong

**Fix:**
```bash
# Verify doc ID
# URL: https://coda.io/d/_dABCD1234
# Doc ID is: ABCD1234 (without _d)

# Update
heroku config:set CODA_DOC_ID=ABCD1234

# Verify API token
# Generate new one at https://coda.io/account
heroku config:set CODA_API_TOKEN=new-token
```

### Issue: Server crashes

**Cause:** Usually memory or port issues

**Fix (Heroku):**
```bash
# Check logs
heroku logs --tail

# Restart
heroku restart

# Scale up if needed (free tier: 1 dyno)
heroku ps:scale web=1
```

### Issue: Rate limiting

**Cause:** Too many requests

**Solution:** Add rate limiting:
```bash
cd webhook
npm install express-rate-limit
```

Then add to `server.js`:
```javascript
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use("/webhook", limiter);
```

---

## Security Best Practices

### 1. Use Strong Secrets

❌ Bad: `secret123`
✅ Good: `csm-intelligence-prod-aBc123XyZ789`

### 2. Rotate Secrets Regularly

Every 3-6 months:
```bash
# Generate new secret
openssl rand -base64 32

# Update everywhere
heroku config:set WEBHOOK_SECRET=new-secret
# Update Salesforce, Zapier, etc.
```

### 3. Use HTTPS Only

All hosting providers (Heroku, Railway, Vercel) provide HTTPS automatically.

❌ Never use: `http://webhook.com`
✅ Always use: `https://webhook.com`

### 4. Monitor Logs

Check for suspicious activity:
```bash
heroku logs --tail | grep "401\|403\|500"
```

### 5. IP Whitelisting (Advanced)

Add to `server.js`:
```javascript
const allowedIPs = ['1.2.3.4', '5.6.7.8']; // Salesforce IPs

app.use('/webhook', (req, res, next) => {
  const clientIP = req.ip;
  if (!allowedIPs.includes(clientIP)) {
    return res.status(403).json({error: 'Forbidden'});
  }
  next();
});
```

---

## Complete Example: End-to-End Flow

### Scenario: Salesforce opportunity closes → Auto-updates Coda

**1. Opportunity closes in Salesforce**
   - Account: Gard AS
   - Amount: $850,000
   - Close Date: 2025-06-30

**2. Salesforce webhook fires**
   - POST to `https://webhook.herokuapp.com/webhook/salesforce`
   - Payload includes opportunity data

**3. Webhook transforms data**
   - Maps Salesforce fields → CSM fields
   - `Amount` → `arr`
   - `CloseDate` → `renewalDate`

**4. Webhook calls Coda UpsertData**
   - Table: `accounts`
   - Data: `{accountName: "Gard AS", arr: 850000, renewalDate: "2025-06-30"}`

**5. Coda updates table**
   - If account exists → Updates fields
   - If new account → Creates row

**6. Result visible in Coda**
   - Immediate update (< 2 seconds)
   - No manual work required

---

## What's Next

### Phase 1 (Now): Basic Integrations
- ✅ Salesforce → Coda
- ✅ Email → Coda (via Zapier)
- ✅ Slack → Coda

### Phase 2 (Future): Advanced Automation
- AI-powered email parsing (Claude API)
- Automated health score calculation
- Predictive analytics
- QBR auto-generation
- Risk prediction models

---

## Support

- **Webhook issues:** Check logs and README.md
- **Coda API:** https://coda.io/developers/apis/v1
- **Heroku issues:** https://devcenter.heroku.com

---

## Summary

You now have:
- ✅ Universal webhook receiver
- ✅ Single `UpsertData` action for all tables
- ✅ Direct Salesforce integration
- ✅ Email/Slack integration capability
- ✅ Real-time data pipeline
- ✅ Zero manual data entry

**Next:** Deploy to production and connect your first integration!
