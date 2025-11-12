# Slack Integration Guide - CSM Intelligence Platform

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                 SLACK WORKSPACE                      │
├─────────────────────────────────────────────────────┤
│ CSM Team channels:                                  │
│ • #customer-success                                 │
│ • #account-updates                                  │
│ • #qbr-tracking                                     │
│                                                     │
│ Slash Commands:                                     │
│ • /csm-account - Add/update account                 │
│ • /csm-objective - Add objective                    │
│ • /csm-risk - Track risks                           │
│ • /csm-engagement - Log customer interaction        │
│ • /csm-task - Create action item                    │
│ • /csm-health - Quick health score update           │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│            WEBHOOK SERVER (Heroku)                   │
│               webhook/server.js                      │
├─────────────────────────────────────────────────────┤
│ POST /webhook/slack                                 │
│ • Parses Slack command text                         │
│ • Validates data                                    │
│ • Transforms to Coda format                         │
│ • Calls Coda UpsertData API                         │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│          CODA PACK v17 (UpsertData)                  │
│                                                     │
│ • Receives data from webhook                        │
│ • Validates required fields                         │
│ • Auto-generates IDs & timestamps                   │
│ • Upserts into appropriate table                    │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│              CODA TABLES                             │
│                                                     │
│ Data appears instantly in:                          │
│ • AccountMaster                                     │
│ • StrategicObjectives                               │
│ • RiskRegister                                      │
│ • EngagementLog                                     │
│ • Tasks                                             │
└─────────────────────────────────────────────────────┘
```

---

## Setup (30 Minutes)

### Part 1: Deploy Webhook Server (10 min)

**1. Deploy to Heroku:**
```bash
cd webhook
npm install

# Create Heroku app
heroku create csm-intelligence-webhook

# Set environment variables
heroku config:set CODA_API_TOKEN=your-coda-token
heroku config:set CODA_DOC_ID=your-doc-id
heroku config:set WEBHOOK_SECRET=csm-slack-2024

# Deploy
git init
git add .
git commit -m "Deploy CSM webhook"
heroku git:remote -a csm-intelligence-webhook
git push heroku main
```

**2. Test webhook is running:**
```bash
curl https://csm-intelligence-webhook.herokuapp.com/health
```

Should return: `{"status":"ok"}`

**Your webhook URL:** `https://csm-intelligence-webhook.herokuapp.com/webhook/slack`

---

### Part 2: Create Slack App (15 min)

**1. Go to https://api.slack.com/apps**

**2. Click "Create New App"**
   - Choose "From scratch"
   - App Name: `CSM Intelligence`
   - Workspace: Your workspace
   - Click "Create App"

**3. Add Slash Commands:**

Go to **Slash Commands** → **Create New Command**

#### Command 1: /csm-account
```
Command: /csm-account
Request URL: https://csm-intelligence-webhook.herokuapp.com/webhook/slack
Short Description: Add or update account
Usage Hint: name:"Account Name" arr:850000 health:80
```

#### Command 2: /csm-objective
```
Command: /csm-objective
Request URL: https://csm-intelligence-webhook.herokuapp.com/webhook/slack
Short Description: Add strategic objective
Usage Hint: account:"Account Name" objective:"Reduce latency" progress:60
```

#### Command 3: /csm-risk
```
Command: /csm-risk
Request URL: https://csm-intelligence-webhook.herokuapp.com/webhook/slack
Short Description: Track account risk
Usage Hint: account:"Account Name" risk:"Budget constraints" level:High
```

#### Command 4: /csm-engagement
```
Command: /csm-engagement
Request URL: https://csm-intelligence-webhook.herokuapp.com/webhook/slack
Short Description: Log customer interaction
Usage Hint: account:"Account Name" type:QBR sentiment:Positive
```

#### Command 5: /csm-task
```
Command: /csm-task
Request URL: https://csm-intelligence-webhook.herokuapp.com/webhook/slack
Short Description: Create action item
Usage Hint: account:"Account Name" task:"Follow up on issue" priority:High
```

#### Command 6: /csm-health (Quick Update)
```
Command: /csm-health
Request URL: https://csm-intelligence-webhook.herokuapp.com/webhook/slack
Short Description: Quick health score update
Usage Hint: account:"Account Name" score:85
```

**4. Install App to Workspace:**
   - Go to **Install App**
   - Click "Install to Workspace"
   - Authorize permissions
   - Done!

---

### Part 3: Test Commands (5 min)

Open Slack and test each command:

#### Test 1: Add Account
```
/csm-account name:"Gard AS" arr:850000 health:80 csm:"Nirmal John"
```

**Expected response:**
```
✅ Updated Gard AS
Data upserted to accounts
```

Check Coda → Should see account in AccountMaster table!

#### Test 2: Add Objective
```
/csm-objective account:"Gard AS" objective:"Reduce API latency by 50%" status:"In Progress" progress:60
```

#### Test 3: Log Risk
```
/csm-risk account:"Gard AS" risk:"Budget constraints" level:High category:Financial
```

#### Test 4: Log Engagement
```
/csm-engagement account:"Gard AS" type:QBR sentiment:Positive topics:"Q4 planning, platform health"
```

#### Test 5: Create Task
```
/csm-task account:"Gard AS" task:"Schedule technical workshop" priority:High assignedTo:"Nirmal John"
```

#### Test 6: Quick Health Update
```
/csm-health account:"Gard AS" score:82
```

---

## Enhanced Slack Bot (Optional - Advanced)

The current implementation uses simple slash commands. For a richer experience, you can build an interactive Slack bot.

### Features:
- Interactive forms instead of text commands
- Autocomplete for account names
- Dropdown menus for status/priority
- Confirmation messages with buttons
- Scheduled reminders

### Setup:

**1. Install Slack Bolt SDK:**
```bash
cd webhook
npm install @slack/bolt
```

**2. Create enhanced bot** (`webhook/slack-bot.js`):
```javascript
const { App } = require('@slack/bolt');
const axios = require('axios');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// Interactive form for adding accounts
app.command('/csm-account-form', async ({ command, ack, client }) => {
  await ack();

  await client.views.open({
    trigger_id: command.trigger_id,
    view: {
      type: 'modal',
      callback_id: 'account_form',
      title: { type: 'plain_text', text: 'Add Account' },
      submit: { type: 'plain_text', text: 'Submit' },
      blocks: [
        {
          type: 'input',
          block_id: 'account_name',
          label: { type: 'plain_text', text: 'Account Name' },
          element: { type: 'plain_text_input', action_id: 'name' }
        },
        {
          type: 'input',
          block_id: 'arr',
          label: { type: 'plain_text', text: 'ARR (USD)' },
          element: { type: 'plain_text_input', action_id: 'arr_value' }
        },
        {
          type: 'input',
          block_id: 'health',
          label: { type: 'plain_text', text: 'Health Score (0-100)' },
          element: { type: 'plain_text_input', action_id: 'health_value' }
        },
        {
          type: 'input',
          block_id: 'csm',
          label: { type: 'plain_text', text: 'CSM Name' },
          element: {
            type: 'static_select',
            action_id: 'csm_select',
            options: [
              { text: { type: 'plain_text', text: 'Nirmal John' }, value: 'Nirmal John' },
              { text: { type: 'plain_text', text: 'Prathamesh Pable' }, value: 'Prathamesh Pable' }
            ]
          }
        }
      ]
    }
  });
});

// Handle form submission
app.view('account_form', async ({ ack, body, view, client }) => {
  await ack();

  const values = view.state.values;
  const accountData = {
    accountName: values.account_name.name.value,
    arr: parseInt(values.arr.arr_value.value),
    healthScore: parseInt(values.health.health_value.value),
    customerSuccessManager: values.csm.csm_select.selected_option.value
  };

  // Send to webhook
  const webhookUrl = process.env.WEBHOOK_URL + '/webhook';
  await axios.post(webhookUrl, {
    secret: process.env.WEBHOOK_SECRET,
    table: 'accounts',
    data: accountData
  });

  // Notify user
  await client.chat.postMessage({
    channel: body.user.id,
    text: `✅ Account ${accountData.accountName} added successfully!`
  });
});

app.start(process.env.PORT || 3001);
```

**3. Deploy enhanced bot:**
```bash
heroku config:set SLACK_BOT_TOKEN=xoxb-your-token
heroku config:set SLACK_SIGNING_SECRET=your-secret
git add webhook/slack-bot.js
git commit -m "Add enhanced Slack bot"
git push heroku main
```

---

## Usage Examples

### Example 1: After Customer Call

**Scenario:** Just finished QBR with Gard AS

**In Slack:**
```
/csm-engagement account:"Gard AS" type:QBR sentiment:"Very Positive" topics:"Discussed Q4 roadmap, platform health excellent, 3 new objectives identified"
```

**Result:** Engagement logged in Coda, visible in EngagementLog table

---

### Example 2: Weekly Health Update

**Scenario:** Monday morning health score review

**In Slack #customer-success channel:**
```
/csm-health account:"Gard AS" score:85
/csm-health account:"Wates Group" score:72
/csm-health account:"CSL Seqirus" score:88
/csm-health account:"Birkenstock" score:74
```

**Result:** All 4 accounts updated in < 1 minute

---

### Example 3: Risk Identified

**Scenario:** Customer mentions budget concerns

**In Slack:**
```
/csm-risk account:"Wates Group" risk:"Budget approval delayed for Q1 projects" level:High category:Financial mitigation:"Schedule meeting with CFO to discuss ROI"
```

**Result:** Risk tracked in RiskRegister, visible on dashboards

---

### Example 4: Task Assignment

**Scenario:** Need to follow up with customer

**In Slack:**
```
/csm-task account:"Gard AS" task:"Schedule technical workshop for new API implementation" priority:High assignedTo:"Nirmal John" due:2024-11-30
```

**Result:** Task created and assigned

---

### Example 5: New Objective from Customer

**Scenario:** Customer shares new business goal

**In Slack:**
```
/csm-objective account:"CSL Seqirus" objective:"Reduce order processing time by 40%" status:Planning businessValue:500000 target:2025-03-31
```

**Result:** Objective tracked, shows up in account view

---

## Command Syntax Reference

### General Format
```
/command field:"value" field:number field:"multi word value"
```

### Key:Value Patterns

**Text fields** (use quotes for multi-word):
```
account:"Gard AS"
name:"Nirmal John"
risk:"Budget constraints"
```

**Number fields** (no quotes):
```
arr:850000
health:80
progress:60
```

**Date fields** (YYYY-MM-DD):
```
due:2024-11-30
target:2025-06-30
```

### Full Command Examples

#### /csm-account
```
/csm-account name:"Company Name" arr:850000 health:80 csm:"CSM Name" ae:"AE Name" risk:Medium
```

#### /csm-objective
```
/csm-objective account:"Company" objective:"Goal description" status:"In Progress" progress:60 businessValue:250000 target:2025-03-31
```

#### /csm-risk
```
/csm-risk account:"Company" risk:"Risk description" level:High category:Technical mitigation:"Mitigation plan"
```

#### /csm-engagement
```
/csm-engagement account:"Company" type:QBR sentiment:Positive topics:"Key discussion points" attendees:"Customer attendees"
```

#### /csm-task
```
/csm-task account:"Company" task:"Task description" priority:High assignedTo:"Person Name" due:2024-12-31
```

#### /csm-health
```
/csm-health account:"Company" score:85
```

---

## Team Workflows

### Workflow 1: Daily Standup

**In #customer-success channel each morning:**

```
@nirmal: Daily update
/csm-health account:"Gard AS" score:82
/csm-task account:"Gard AS" task:"Follow up on API latency discussion" priority:Medium

@prathamesh: Update
/csm-health account:"CSL Seqirus" score:88
/csm-engagement account:"CSL Seqirus" type:"Check-in" sentiment:Positive
```

**Result:** All updates in Coda, 2 minutes total

---

### Workflow 2: Risk Review Meeting

**During weekly risk review:**

```
/csm-risk account:"Wates Group" risk:"Platform migration delayed" level:High category:Technical

/csm-risk account:"Birkenstock" risk:"Budget freeze announced" level:Critical category:Financial

/csm-task account:"Wates Group" task:"Create revised migration timeline" priority:High assignedTo:"Solutions Architect"
```

**Result:** Risks tracked, tasks created, all documented

---

### Workflow 3: QBR Preparation

**Week before QBR:**

```
/csm-task account:"Gard AS" task:"Prepare QBR deck" priority:High due:2024-11-25
/csm-task account:"Gard AS" task:"Review objectives progress" priority:High due:2024-11-24
/csm-task account:"Gard AS" task:"Calculate business value delivered" priority:Medium due:2024-11-23
```

**Result:** QBR prep tasks organized

---

## Automation Ideas

### 1. Scheduled Reminders

Create Slack workflow to remind team:

```
Every Monday 9 AM:
"Time for weekly health updates! Use /csm-health to update your accounts"
```

### 2. Auto-post to Channel

When critical risk added, post to channel:

```javascript
// In webhook server
if (risk.level === 'Critical') {
  await axios.post('https://slack.com/api/chat.postMessage', {
    channel: '#customer-success',
    text: `🚨 Critical risk added: ${risk.title} for ${risk.account}`
  });
}
```

### 3. Weekly Summary

Every Friday, post summary:

```
📊 This Week's Activity:
• 12 health score updates
• 8 customer engagements logged
• 5 new objectives added
• 3 risks identified and mitigated
• 15 tasks created

Great work team! 🎉
```

---

## Best Practices

### 1. Use Consistent Account Names
❌ Bad: "Gard", "Gard AS", "GARD AS"
✅ Good: "Gard AS" (always exact same format)

### 2. Log Engagements Immediately
Best practice: Log engagement right after customer call while fresh in memory

```
Just finished QBR...
/csm-engagement account:"Gard AS" type:QBR sentiment:Positive topics:"..."
```

### 3. Use Channels Strategically
- `#customer-success` - All CSM activity
- `#account-updates` - Health score changes, risks
- `#qbr-tracking` - QBR-related updates

### 4. Adopt Team Standards
Example format for risk logging:
```
/csm-risk account:"[Account]" risk:"Clear description" level:[Level] category:[Category] mitigation:"Action plan"
```

---

## Troubleshooting

### Command Not Working

**Issue:** Slash command returns error

**Check:**
1. Is webhook server running? Test: `curl https://your-webhook.herokuapp.com/health`
2. Is Request URL correct in Slack app settings?
3. Check Heroku logs: `heroku logs --tail`

### Data Not Appearing in Coda

**Issue:** Slack command succeeds but data not in Coda

**Check:**
1. Is Pack v17 installed in Coda doc?
2. Is `CODA_API_TOKEN` set correctly? `heroku config:get CODA_API_TOKEN`
3. Is `CODA_DOC_ID` correct? Should be without `_d` prefix
4. Check webhook logs for errors

### Syntax Errors

**Issue:** "Failed to parse command"

**Common mistakes:**
- Missing quotes for multi-word values: `account:Gard AS` → `account:"Gard AS"`
- Extra spaces: `account: "Gard AS"` → `account:"Gard AS"`
- Wrong field names: `company:"..."` → `account:"..."`

---

## Summary

✅ **What You Have:**
- 6 Slack slash commands
- Direct Slack → Webhook → Coda pipeline
- Real-time updates (< 2 seconds)
- No manual data entry
- Team-friendly (anyone can use)

✅ **What You Can Do:**
- Update account health from Slack
- Log customer engagements instantly
- Track risks as they're identified
- Create tasks on the fly
- Add objectives during customer calls
- All without leaving Slack

✅ **Result:**
**Zero friction data entry. Real-time CSM intelligence. Complete team adoption.** 🚀

---

## Next Steps

1. ✅ Deploy webhook server (10 min)
2. ✅ Create Slack app with 6 commands (15 min)
3. ✅ Test each command (5 min)
4. 📢 Share with team and train on usage
5. 🎯 Start using in daily workflows

**Your Slack workspace is now your CSM command center!**
