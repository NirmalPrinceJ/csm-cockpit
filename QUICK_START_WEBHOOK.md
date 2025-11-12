# Quick Start - Webhook Integration

## What Changed in Version 16

### ✅ Single Universal Action

**Before:** 14+ different import actions (ImportAccounts, ImportPeople, ImportObjectives, etc.)

**Now:** ONE action for everything: **UpsertData**

```
=UpsertData('{
  "table": "accounts",
  "data": {"accountName": "Gard AS", "arr": 850000, "healthScore": 80}
}')
```

Works for ALL 14 tables:
- accounts
- people
- objectives
- initiatives
- risks
- engagements
- businessContext
- capabilities
- valueStreams
- apis
- metrics
- outcomes
- successPlans
- tasks

### ✅ Direct Webhook Receiver

**Before:** Manual JSON entry or tool hopping (Asana → Coda)

**Now:** Direct data pipeline from ANY source

```
Salesforce → Webhook → Coda (instant)
Email → Webhook → Coda (instant)
Slack → Webhook → Coda (instant)
```

---

## 5-Minute Setup

### 1. Deploy Webhook (5 minutes)

```bash
# Install dependencies
cd webhook
npm install

# Configure
cp .env.example .env
# Edit .env with your Coda API token, doc ID, and secret

# Deploy to Heroku (free)
heroku create csm-webhook
heroku config:set CODA_API_TOKEN=your-token
heroku config:set CODA_DOC_ID=your-doc-id
heroku config:set WEBHOOK_SECRET=your-secret
git init
git add .
git commit -m "Deploy"
heroku git:remote -a csm-webhook
git push heroku main
```

**Your webhook URL:** `https://csm-webhook.herokuapp.com/webhook`

### 2. Test It

```bash
curl -X POST https://csm-webhook.herokuapp.com/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "secret": "your-secret",
    "table": "accounts",
    "data": {
      "accountName": "Test Account",
      "arr": 500000,
      "healthScore": 85
    }
  }'
```

Response:
```json
{
  "success": true,
  "message": "Data upserted to accounts",
  "result": "✅ Upserted 1 record(s) in accounts: Test Account"
}
```

Check Coda → Account should appear in AccountMaster table!

---

## Use Cases

### Use Case 1: Salesforce Integration

**Setup once:**
- Salesforce → Process Builder → HTTP Callout
- URL: `https://csm-webhook.herokuapp.com/webhook/salesforce`
- Body: Opportunity data

**Result:** Every closed opportunity → Auto-creates account in Coda

---

### Use Case 2: Email to Engagement

**Setup once:**
- Zapier: Gmail → Webhook
- Trigger: Email with label "CSM"
- Action: POST to webhook

**Result:** Forward customer email → Logged as engagement in Coda

---

### Use Case 3: Slack Updates

**Setup once:**
- Create Slack app with slash command
- Command: `/csm-update`
- URL: `https://csm-webhook.herokuapp.com/webhook/slack`

**Usage:**
```
/csm-update account:"Gard AS" health:85
```

**Result:** Instant update in Coda

---

### Use Case 4: Automated Health Scores

**Setup once:**
- Deploy Python script to calculate health
- Schedule with cron-job.org (daily at 2 AM)
- Script POSTs updated scores to webhook

**Result:** Health scores auto-calculated daily

---

## Files Created

### Coda Pack (Version 16)
- **src/upsert.ts** - Universal upsert logic
- **src/pack.ts** - UpsertData action added

### Webhook Server
- **webhook/server.js** - Express server with 5 endpoints
- **webhook/package.json** - Dependencies
- **webhook/test-webhook.js** - Test suite
- **webhook/.env.example** - Environment template
- **webhook/Procfile** - Heroku deployment config
- **webhook/README.md** - Complete webhook documentation

### Guides
- **WEBHOOK_INTEGRATION_GUIDE.md** - Complete integration guide (all platforms)
- **QUICK_START_WEBHOOK.md** - This file (5-minute setup)

---

## Architecture

```
┌──────────────────────────────────────────────────────┐
│              EXTERNAL DATA SOURCES                    │
├──────────────────────────────────────────────────────┤
│ • Salesforce (Process Builder webhook)               │
│ • Email (Zapier/Make.com → webhook)                  │
│ • Slack (Slash command → webhook)                    │
│ • Google Sheets (Apps Script → webhook)              │
│ • Custom Python/Node scripts → webhook               │
└──────────────────────────────────────────────────────┘
                        ↓
┌──────────────────────────────────────────────────────┐
│         WEBHOOK SERVER (webhook/server.js)            │
├──────────────────────────────────────────────────────┤
│ Endpoints:                                           │
│ • POST /webhook (universal)                          │
│ • POST /webhook/salesforce                           │
│ • POST /webhook/email                                │
│ • POST /webhook/slack                                │
│ • GET  /health                                       │
│                                                      │
│ Transforms data → Validates → Calls Coda API        │
└──────────────────────────────────────────────────────┘
                        ↓
┌──────────────────────────────────────────────────────┐
│         CODA PACK (Version 16)                        │
├──────────────────────────────────────────────────────┤
│ Action: UpsertData                                   │
│ • Receives: {table, data}                            │
│ • Validates required fields                          │
│ • Auto-generates IDs                                 │
│ • Adds timestamps                                    │
│ • Inserts/updates records                            │
└──────────────────────────────────────────────────────┘
                        ↓
┌──────────────────────────────────────────────────────┐
│              CODA TABLES (14 tables)                  │
├──────────────────────────────────────────────────────┤
│ • AccountMaster                                      │
│ • PeopleTeam                                         │
│ • StrategicObjectives                                │
│ • Initiatives                                        │
│ • RiskRegister                                       │
│ • EngagementLog                                      │
│ • [8 more tables]                                    │
│                                                      │
│ → Data appears instantly (<2 seconds)                │
└──────────────────────────────────────────────────────┘
```

---

## Benefits

### Before (Manual Entry)
- ❌ Copy data from Salesforce
- ❌ Paste into JSON template
- ❌ Fix formatting errors
- ❌ Import into Coda
- ❌ Repeat for each update
- ⏱️ **Time:** 5-10 minutes per update

### After (Webhook Pipeline)
- ✅ Data flows automatically
- ✅ Real-time updates
- ✅ Zero manual work
- ✅ No formatting needed
- ✅ Works 24/7
- ⏱️ **Time:** 0 minutes (automated)

---

## Next Steps

1. **Deploy webhook** (5 min) - Follow "5-Minute Setup" above
2. **Test with sample data** (2 min) - Use curl command
3. **Connect Salesforce** (10 min) - If approved at your company
4. **Set up email integration** (10 min) - Via Zapier
5. **Create Slack bot** (15 min) - Optional but powerful

**Total setup time:** 30-45 minutes
**Result:** Fully automated data pipeline

---

## Support

- Webhook setup: See **webhook/README.md**
- Integration examples: See **WEBHOOK_INTEGRATION_GUIDE.md**
- Coda Pack: Version 16 (published)
- Questions: Check logs with `heroku logs --tail`

---

## What You Built

✅ Universal data action (UpsertData) - ONE action for 14 tables
✅ Webhook receiver - Accepts data from ANY source
✅ Salesforce integration - Auto-sync opportunities
✅ Email integration - Log engagements automatically
✅ Slack bot - Update from chat
✅ Python/Node.js examples - Custom automation
✅ Complete documentation - Step-by-step guides

**You're now ready for ZERO manual data entry!** 🚀
