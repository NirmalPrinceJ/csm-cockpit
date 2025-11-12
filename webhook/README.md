# CSM Intelligence Platform - Webhook Receiver

Real-time data pipeline from external sources → Coda

## What This Does

Receives data from ANY source and pushes it directly into your Coda CSM Intelligence Platform using the new **UpsertData** action.

**No more manual data entry. No tool hopping.**

## Architecture

```
Salesforce/Email/Slack/Custom → Webhook Server → Coda (UpsertData)
                                    ↓
                           Direct data insertion
```

## Quick Start

### 1. Install Dependencies

```bash
cd webhook
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env`:
```env
CODA_API_TOKEN=your-api-token
CODA_DOC_ID=your-doc-id
WEBHOOK_SECRET=your-secret-key
```

**How to get these values:**

- **CODA_API_TOKEN**: Go to https://coda.io/account → API Settings → Generate Token
- **CODA_DOC_ID**: Open your doc URL: `https://coda.io/d/_dXXXXXXX` → Copy `XXXXXXX`
- **WEBHOOK_SECRET**: Create any random string (e.g., `mycompany-webhook-2024`)

### 3. Run Locally

```bash
npm start
```

Server runs on `http://localhost:3000`

### 4. Test It

```bash
npm test
```

This runs 8 test cases to verify everything works.

## API Endpoints

### 1. Universal Webhook

**POST** `/webhook`

Add or modify ANY table.

**Request:**
```json
{
  "secret": "your-secret-key",
  "table": "accounts",
  "data": {
    "accountName": "Gard AS",
    "arr": 850000,
    "healthScore": 80
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Data upserted to accounts",
  "result": "✅ Upserted 1 record(s) in accounts: Gard AS"
}
```

**Batch insert:**
```json
{
  "secret": "your-secret-key",
  "table": "accounts",
  "data": [
    {"accountName": "Gard AS", "arr": 850000},
    {"accountName": "Wates Group", "arr": 99000}
  ]
}
```

**Valid table names:**
- `accounts`
- `people`
- `businessContext`
- `objectives`
- `capabilities`
- `valueStreams`
- `apis`
- `metrics`
- `initiatives`
- `risks`
- `outcomes`
- `engagements`
- `successPlans`
- `tasks`

### 2. Salesforce Webhook

**POST** `/webhook/salesforce`

Automatically transforms Salesforce opportunity data.

**Request:**
```json
{
  "secret": "your-secret-key",
  "data": {
    "AccountName": "Gard AS",
    "Amount": 850000,
    "CloseDate": "2025-06-30",
    "OwnerName": "Emilie Moen",
    "Industry": "Maritime"
  }
}
```

Maps to CSM account fields automatically.

### 3. Email Parser Webhook

**POST** `/webhook/email`

Logs emails as engagements.

**Request:**
```json
{
  "secret": "your-secret-key",
  "data": {
    "account": "Gard AS",
    "subject": "QBR Follow-up",
    "summary": "Discussed Q4 objectives",
    "sentiment": "Positive",
    "fromEmail": "customer@gardas.com",
    "toEmail": "csm@company.com"
  }
}
```

### 4. Slack Command Webhook

**POST** `/webhook/slack`

Update account from Slack command.

**Slack Command:**
```
/csm-update account:"Gard AS" health:82 risk:Low
```

**Request (sent by Slack):**
```
text=account:"Gard AS" health:82 risk:Low
```

### 5. Health Check

**GET** `/health`

Check if server is running.

**Response:**
```json
{
  "status": "ok",
  "service": "CSM Intelligence Webhook",
  "timestamp": "2024-11-15T10:30:00Z"
}
```

## Deploy to Production

### Option 1: Heroku (Easiest)

```bash
# Install Heroku CLI
brew install heroku

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
git commit -m "Initial commit"
heroku git:remote -a csm-intelligence-webhook
git push heroku main
```

Your webhook URL: `https://csm-intelligence-webhook.herokuapp.com/webhook`

### Option 2: Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd webhook
vercel

# Set environment variables in Vercel dashboard
```

### Option 3: Railway

1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub repo"
3. Select this repo
4. Set environment variables in Railway dashboard
5. Done!

### Option 4: Any VPS (DigitalOcean, AWS, etc.)

```bash
# SSH into server
ssh user@your-server

# Clone repo
git clone your-repo
cd csm-cockpit/webhook

# Install dependencies
npm install

# Set environment variables
nano .env

# Install PM2 for process management
npm install -g pm2

# Start server
pm2 start server.js --name csm-webhook

# Make it auto-start on reboot
pm2 startup
pm2 save
```

## Integration Examples

### Salesforce Integration

**Setup:**
1. Deploy webhook to production
2. In Salesforce: Setup → Workflow Rules → Create New Rule
3. Trigger: Opportunity Update
4. Action: Outbound Message → `https://your-webhook.com/webhook/salesforce`
5. Add secret to message body

**Result:** Every opportunity update → Auto-syncs to Coda

### Email Integration (Zapier)

**Setup:**
1. Zapier: Gmail → Webhook
2. Trigger: New email with label "CSM Update"
3. Action: POST to `https://your-webhook.com/webhook/email`
4. Map email fields to webhook payload

**Result:** Forward email → Logged as engagement in Coda

### Slack Bot Integration

**Setup:**
1. Create Slack app at https://api.slack.com/apps
2. Add Slash Command: `/csm-update`
3. Request URL: `https://your-webhook.com/webhook/slack`
4. Install app to workspace

**Result:** Type `/csm-update account:"Gard AS" health:80` → Updates Coda

### Custom Script Integration

**Python example:**
```python
import requests

webhook_url = "https://your-webhook.com/webhook"
secret = "your-secret-key"

data = {
    "secret": secret,
    "table": "accounts",
    "data": {
        "accountName": "Gard AS",
        "healthScore": 85
    }
}

response = requests.post(webhook_url, json=data)
print(response.json())
```

**Node.js example:**
```javascript
const axios = require('axios');

const webhookUrl = "https://your-webhook.com/webhook";
const secret = "your-secret-key";

const data = {
  secret: secret,
  table: "accounts",
  data: {
    accountName: "Gard AS",
    healthScore: 85
  }
};

axios.post(webhookUrl, data)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));
```

## Security

### Best Practices

1. **Always use HTTPS in production** (Heroku/Vercel/Railway provide this automatically)
2. **Keep WEBHOOK_SECRET private** - never commit to Git
3. **Rotate secrets periodically** - change every 3-6 months
4. **Use strong secrets** - minimum 20 random characters
5. **Monitor logs** - check for unauthorized access attempts

### Rate Limiting (Optional)

Add to `server.js`:
```javascript
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use("/webhook", limiter);
```

## Monitoring

### Check Server Health

```bash
curl https://your-webhook.com/health
```

### View Logs (Heroku)

```bash
heroku logs --tail
```

### View Logs (PM2)

```bash
pm2 logs csm-webhook
```

## Troubleshooting

### Error: "Invalid secret"

- Check that `WEBHOOK_SECRET` matches in both `.env` and your request
- Verify environment variables are set: `heroku config` or check hosting dashboard

### Error: "Missing required fields"

- Verify your request includes both `table` and `data`
- Check table name is valid (lowercase: `accounts`, not `Accounts`)
- Ensure required fields for that table are included

### Error: "Failed to send to Coda"

- Verify `CODA_API_TOKEN` is correct
- Check `CODA_DOC_ID` is correct
- Ensure CSM Intelligence Pack is installed in your Coda doc
- Verify UpsertData action is available in the pack

### Server not starting

- Check Node.js version: `node --version` (need >= 16)
- Install dependencies: `npm install`
- Check port not in use: `lsof -i :3000`

## Support

- Webhook issues: Check logs and error messages
- Coda API issues: https://coda.io/developers/apis/v1
- Pack issues: https://coda.io/packs/

## What's Next

1. **Deploy webhook to production** (Heroku recommended for quick start)
2. **Set up Salesforce integration** (if approved at your company)
3. **Configure email forwarding** (Zapier or Make.com)
4. **Create Slack bot** (for team updates)
5. **Test end-to-end flow**

**Result:** Real-time data pipeline with ZERO manual entry!
