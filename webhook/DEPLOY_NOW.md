# Deploy Webhook to Heroku - Step by Step

## Prerequisites

Before you start, you need:
1. **Coda API Token** - Get from https://coda.io/account
2. **Coda Doc ID** - From your doc URL (e.g., `_dABCD1234`)
3. **Heroku account** - Create free at https://heroku.com if needed

---

## Step 1: Get Your Coda Information (2 minutes)

### Get Coda API Token:
1. Go to https://coda.io/account
2. Scroll to "API Settings"
3. Click "Generate API token"
4. Copy the token (starts with `coda_...`)
5. **Save it** - You'll need it in Step 3

### Get Coda Doc ID:
1. Open your CSM Intelligence Platform doc in Coda
2. Look at the URL: `https://coda.io/d/_dABCD1234EFGH`
3. Your Doc ID is: `ABCD1234EFGH` (everything after `_d`)
4. **Save it** - You'll need it in Step 3

---

## Step 2: Deploy to Heroku (5 minutes)

### Option A: Heroku CLI (Recommended)

**If you have Heroku CLI installed:**

```bash
# Login to Heroku
heroku login

# Navigate to webhook folder
cd /Users/nirmalprince/csm-cockpit/webhook

# Create Heroku app
heroku create csm-intelligence-webhook

# Done! Heroku git remote added automatically
```

**If you need to install Heroku CLI:**

```bash
# Mac
brew install heroku

# Then login
heroku login
```

---

### Option B: Heroku Dashboard (No CLI needed)

1. Go to https://dashboard.heroku.com
2. Click "New" → "Create new app"
3. App name: `csm-intelligence-webhook`
4. Region: Choose closest to you
5. Click "Create app"

6. **Connect to GitHub:**
   - Go to "Deploy" tab
   - Deployment method: Choose "GitHub"
   - Connect your repository
   - Or use Heroku Git (see instructions on page)

---

## Step 3: Set Environment Variables (2 minutes)

You need to set 3 environment variables:

### Via Heroku CLI:

```bash
# Set Coda API token
heroku config:set CODA_API_TOKEN=coda_your_token_here

# Set Coda Doc ID (without _d prefix)
heroku config:set CODA_DOC_ID=ABCD1234EFGH

# Set webhook secret (create any random string)
heroku config:set WEBHOOK_SECRET=csm-slack-webhook-2024-secure
```

### Via Heroku Dashboard:

1. Go to your app: https://dashboard.heroku.com/apps/csm-intelligence-webhook
2. Click "Settings" tab
3. Click "Reveal Config Vars"
4. Add these 3 variables:

| Key | Value |
|-----|-------|
| `CODA_API_TOKEN` | `coda_your_token_here` |
| `CODA_DOC_ID` | `ABCD1234EFGH` |
| `WEBHOOK_SECRET` | `csm-slack-webhook-2024-secure` |

**Important:**
- CODA_DOC_ID should NOT have `_d` prefix
- WEBHOOK_SECRET can be any string (keep it secret!)

---

## Step 4: Deploy Code (3 minutes)

### If using Heroku CLI:

```bash
# Make sure you're in webhook folder
cd /Users/nirmalprince/csm-cockpit/webhook

# Deploy
git push heroku master

# Wait for build to complete...
# Should see: "Verifying deploy... done."
```

### If using Heroku Dashboard + GitHub:

1. In "Deploy" tab
2. Scroll to "Manual deploy"
3. Choose branch: `main` or `master`
4. Click "Deploy Branch"
5. Wait for build to complete

---

## Step 5: Test the Webhook (2 minutes)

### Test 1: Health Check

```bash
curl https://csm-intelligence-webhook.herokuapp.com/health
```

**Expected response:**
```json
{
  "status": "ok",
  "service": "CSM Intelligence Webhook",
  "timestamp": "2024-11-15T10:30:00Z"
}
```

✅ If you see this, webhook is running!

---

### Test 2: Add Test Account

```bash
curl -X POST https://csm-intelligence-webhook.herokuapp.com/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "secret": "csm-slack-webhook-2024-secure",
    "table": "accounts",
    "data": {
      "accountName": "Webhook Test Account",
      "arr": 500000,
      "healthScore": 85,
      "customerSuccessManager": "Test CSM"
    }
  }'
```

**Expected response:**
```json
{
  "success": true,
  "message": "Data upserted to accounts",
  "result": "✅ Upserted 1 record(s) in accounts: Webhook Test Account",
  "timestamp": "2024-11-15T10:30:00Z"
}
```

✅ **Now check your Coda doc!**

Go to AccountMaster table → You should see "Webhook Test Account"!

---

## Troubleshooting

### Error: "Invalid credentials provided" (Heroku CLI)

**Solution:**
```bash
heroku login
# Browser will open, login to Heroku
```

### Error: "Application error" when accessing webhook URL

**Check logs:**
```bash
heroku logs --tail --app csm-intelligence-webhook
```

Common issues:
- Missing environment variables
- Incorrect CODA_DOC_ID format (should not have `_d`)
- Invalid CODA_API_TOKEN

**Fix:**
```bash
# Check current config
heroku config --app csm-intelligence-webhook

# Update if needed
heroku config:set CODA_API_TOKEN=correct_token
```

### Error: "Failed to send to Coda"

**Checklist:**
- [ ] Is CODA_API_TOKEN correct? (starts with `coda_`)
- [ ] Is CODA_DOC_ID correct? (no `_d` prefix)
- [ ] Is Pack v17 installed in your Coda doc?
- [ ] Does UpsertData action exist in the pack?

**Test your token:**
```bash
curl https://coda.io/apis/v1/docs \
  -H "Authorization: Bearer YOUR_CODA_API_TOKEN"
```

Should return list of your docs.

---

## Your Webhook URLs

Once deployed, you'll have these endpoints:

### Health Check:
```
https://csm-intelligence-webhook.herokuapp.com/health
```

### Universal Webhook:
```
https://csm-intelligence-webhook.herokuapp.com/webhook
```

### Slack Webhook (for Slack app):
```
https://csm-intelligence-webhook.herokuapp.com/webhook/slack
```

**Save these URLs!** You'll need them for:
1. Slack app configuration
2. Testing
3. Monitoring

---

## Next Steps After Deployment

### 1. Set Up Slack App (15 min)

Now that webhook is deployed, follow: `SLACK_INTEGRATION.md`

Quick steps:
1. Go to https://api.slack.com/apps
2. Create new app
3. Add slash commands pointing to your webhook URL
4. Install to workspace

### 2. Share Webhook URL with Team

Your webhook URL:
```
https://csm-intelligence-webhook.herokuapp.com/webhook/slack
```

Use this in:
- Slack app slash commands
- Zapier webhooks
- Custom scripts

### 3. Monitor Your Webhook

**View logs:**
```bash
heroku logs --tail --app csm-intelligence-webhook
```

**Check status:**
```bash
heroku ps --app csm-intelligence-webhook
```

**Restart if needed:**
```bash
heroku restart --app csm-intelligence-webhook
```

---

## Cost & Usage

### Free Tier (Current)
- 550 dyno hours per month (enough for 24/7 if only 1 app)
- Automatic sleep after 30 min inactivity
- Wakes up on first request (~5 sec delay)

### If You Need More
**Heroku Hobby - $7/month:**
- 24/7 uptime (never sleeps)
- Custom domain support
- Metrics & monitoring

**Upgrade command:**
```bash
heroku ps:scale web=1:hobby --app csm-intelligence-webhook
```

---

## Quick Reference Commands

```bash
# View logs
heroku logs --tail --app csm-intelligence-webhook

# Check status
heroku ps --app csm-intelligence-webhook

# Restart
heroku restart --app csm-intelligence-webhook

# View config
heroku config --app csm-intelligence-webhook

# Update config
heroku config:set KEY=VALUE --app csm-intelligence-webhook

# Open in browser
heroku open --app csm-intelligence-webhook

# SSH into dyno (for debugging)
heroku run bash --app csm-intelligence-webhook
```

---

## Success Checklist

- [ ] Heroku app created: `csm-intelligence-webhook`
- [ ] Environment variables set (3 variables)
- [ ] Code deployed successfully
- [ ] Health check returns OK: `/health`
- [ ] Test account created successfully
- [ ] Test account visible in Coda AccountMaster table
- [ ] Webhook URL saved for Slack integration

---

## What You Just Built

✅ **Production webhook server** running 24/7
✅ **Real-time data pipeline** to Coda
✅ **Ready for Slack integration**
✅ **Free to run** (Heroku free tier)
✅ **Secure** (HTTPS, secret validation)

**Your webhook URL:**
`https://csm-intelligence-webhook.herokuapp.com/webhook/slack`

---

## Need Help?

**Check logs first:**
```bash
heroku logs --tail --app csm-intelligence-webhook
```

**Common solutions:**
- Restart: `heroku restart`
- Check config: `heroku config`
- Verify Coda credentials
- Check Pack v17 is installed

---

**🎉 Webhook deployed! Ready for Slack integration next!**
