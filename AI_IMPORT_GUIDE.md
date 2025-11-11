# AI-Powered Data Import - Like Notion AI

## Overview

Import data using **natural language** - paste meeting notes, reports, docs, or any text. AI parses it into structured JSON and loads into Coda automatically.

**No manual JSON formatting needed!**

---

## Quick Start

### Step 1: Copy Your Text

From anywhere:
- Meeting notes
- Email summaries
- Slack conversations
- Reports/documents
- Copy-paste from anywhere

### Step 2: Ask AI to Parse

Use this prompt with **Claude** or **Gemini**:

```
Parse this text and convert to JSON for CSM Intelligence Platform import.

Use this exact structure:
{
  "accounts": [...],
  "people": [...],
  "objectives": [...],
  "initiatives": [...],
  "risks": [...],
  "engagements": [...]
}

REQUIRED FIELDS:
- accounts: accountName, arr, customerSuccessManager, healthScore
- people: fullName, role, account
- objectives: account, objectiveName, status, progressPercent
- initiatives: account, initiativeName, status
- risks: account, riskTitle, riskLevel
- engagements: account, engagementDate, engagementType, sentiment

Extract only available information. Use "Unknown" for missing fields.

TEXT TO PARSE:
---
[PASTE YOUR TEXT HERE]
---

Return ONLY the JSON object, no explanations.
```

### Step 3: Import to Coda

Copy AI's JSON output and paste in Coda:

```
=BatchImportAll([paste AI JSON here])
```

Done! ✅

---

## Example 1: Meeting Notes

### Input Text:
```
QBR Meeting - Gard AS
Date: Nov 15, 2024
Attendees: Christian Tome (CEO), Nirmal John (CSM)

Key Discussion:
- Overall health is good, around 80%
- ARR is $850K, renewing June 2025
- Main objective: Reduce API latency by 50%
- Currently 60% complete on this goal
- New risk identified: Legacy system dependencies
  Risk level is High
- Next meeting scheduled for Feb 2025
- Sentiment was very positive
```

### AI Prompt:
```
Parse this QBR meeting notes and convert to JSON for CSM Intelligence Platform.

Use this structure:
{
  "accounts": [...],
  "objectives": [...],
  "risks": [...],
  "engagements": [...]
}

TEXT:
[paste meeting notes above]

Return ONLY JSON.
```

### AI Output:
```json
{
  "accounts": [
    {
      "accountName": "Gard AS",
      "arr": 850000,
      "customerSuccessManager": "Nirmal John",
      "healthScore": 80,
      "renewalDate": "2025-06-30"
    }
  ],
  "objectives": [
    {
      "account": "Gard AS",
      "objectiveName": "Reduce API latency by 50%",
      "status": "In Progress",
      "progressPercent": 60
    }
  ],
  "risks": [
    {
      "account": "Gard AS",
      "riskTitle": "Legacy system dependencies",
      "riskLevel": "High",
      "status": "Active - Not Started"
    }
  ],
  "engagements": [
    {
      "account": "Gard AS",
      "engagementDate": "2024-11-15",
      "engagementType": "QBR",
      "sentiment": "Positive",
      "attendeesCustomer": "Christian Tome (CEO)",
      "attendeesMuleSoft": "Nirmal John (CSM)",
      "nextEngagementDate": "2025-02-15"
    }
  ]
}
```

### Import to Coda:
```
=BatchImportAll('[paste AI JSON]')
```

✅ **Result:**
- 1 account updated
- 1 objective added
- 1 risk added
- 1 engagement logged

---

## Example 2: Email Report

### Input Text:
```
Subject: Wates Group - Weekly Update

Team,

Quick update on Wates Group account:
- Health score dropped to 72 this week
- They're at $99K ARR
- 13 months until renewal (Jan 2026)
- Ritchie Neil is the AE, I'm the CSM

We have a critical initiative: Platform migration
Status: In Progress
Investment: $100K
Expected benefits: $300K

Two new tasks:
1. Schedule technical workshop - Due Nov 25 - High priority
2. Review migration plan - Due Dec 1 - Medium priority

Let me know if questions.

Nirmal
```

### AI Prompt:
```
Parse this email and extract CSM data to JSON.

Structure:
{
  "accounts": [...],
  "people": [...],
  "initiatives": [...],
  "tasks": [...]
}

EMAIL:
[paste email above]

Return ONLY JSON.
```

### AI Output:
```json
{
  "accounts": [
    {
      "accountName": "Wates Group",
      "arr": 99000,
      "customerSuccessManager": "Nirmal John",
      "accountExecutive": "Ritchie Neil",
      "healthScore": 72,
      "renewalDate": "2026-01-31",
      "daysToRenewal": 395
    }
  ],
  "initiatives": [
    {
      "account": "Wates Group",
      "initiativeName": "Platform migration",
      "status": "In Progress",
      "investmentUsd": 100000,
      "expectedBenefitsUsd": 300000
    }
  ],
  "tasks": [
    {
      "account": "Wates Group",
      "taskTitle": "Schedule technical workshop",
      "priority": "High",
      "dueDate": "2024-11-25",
      "status": "Open",
      "assignedTo": "Nirmal John"
    },
    {
      "account": "Wates Group",
      "taskTitle": "Review migration plan",
      "priority": "Medium",
      "dueDate": "2024-12-01",
      "status": "Open",
      "assignedTo": "Nirmal John"
    }
  ]
}
```

---

## Example 3: Slack Conversation

### Input Text:
```
@nirmal: How's CSL Seqirus doing?

@prathamesh: Pretty good! Health is 85/100. They're our biggest account at $4.6M ARR.
Main focus right now is their API performance objective.
We're 75% complete, target is end of Q1.

@nirmal: Any risks?

@prathamesh: One medium risk - resource constraints for the migration.
Dominic (AE) is working on mitigation.

@nirmal: Cool, when's next check-in?

@prathamesh: Had one yesterday, next is in 2 weeks.
Sentiment was positive, discussed platform health mostly.
```

### AI Prompt:
```
Parse this Slack conversation and extract CSM data.

Structure:
{
  "accounts": [...],
  "objectives": [...],
  "risks": [...],
  "engagements": [...]
}

SLACK THREAD:
[paste conversation]

Return ONLY JSON.
```

### AI Output:
```json
{
  "accounts": [
    {
      "accountName": "CSL Seqirus",
      "arr": 4600000,
      "customerSuccessManager": "Prathamesh Pable",
      "accountExecutive": "Dominic Holroyd",
      "healthScore": 85
    }
  ],
  "objectives": [
    {
      "account": "CSL Seqirus",
      "objectiveName": "API performance improvement",
      "status": "In Progress",
      "progressPercent": 75,
      "targetDate": "2025-03-31"
    }
  ],
  "risks": [
    {
      "account": "CSL Seqirus",
      "riskTitle": "Resource constraints for migration",
      "riskLevel": "Medium",
      "status": "Active - In Progress",
      "mitigationOwner": "Dominic Holroyd"
    }
  ],
  "engagements": [
    {
      "account": "CSL Seqirus",
      "engagementDate": "2024-11-14",
      "engagementType": "Check-in",
      "sentiment": "Positive",
      "keyTopicsDiscussed": "Platform health",
      "attendeesMuleSoft": "Prathamesh Pable"
    }
  ]
}
```

---

## Example 4: Google Doc Report

### Input Text:
```
BIRKENSTOCK - ACCOUNT REVIEW
Q4 2024

OVERVIEW
Birkenstock is a retail footwear company with $750K ARR.
Account executive is Lisa Martinez.
CSM is Nirmal John.
Overall health: 74/100 (At Risk due to upcoming renewal)

STRATEGIC OBJECTIVES
1. E-commerce platform modernization
   - Status: Planning
   - Business value: $500K
   - Target: Q2 2025

2. Inventory integration automation
   - Status: In Progress
   - 40% complete
   - Business value: $300K

INITIATIVES
- Cloud migration project
  Investment: $200K
  Expected ROI: 350%
  Status: Planning

RISKS
- Budget approval delayed (High risk)
- Technical resource availability (Medium risk)

NEXT STEPS
- Executive briefing scheduled Dec 5
- Technical workshop planned for Dec 12
```

### AI Output:
```json
{
  "accounts": [
    {
      "accountName": "Birkenstock",
      "industryVertical": "Retail",
      "arr": 750000,
      "customerSuccessManager": "Nirmal John",
      "accountExecutive": "Lisa Martinez",
      "healthScore": 74,
      "riskLevel": "At Risk"
    }
  ],
  "objectives": [
    {
      "account": "Birkenstock",
      "objectiveName": "E-commerce platform modernization",
      "status": "Planning",
      "businessValueUsd": 500000,
      "targetDate": "2025-06-30"
    },
    {
      "account": "Birkenstock",
      "objectiveName": "Inventory integration automation",
      "status": "In Progress",
      "progressPercent": 40,
      "businessValueUsd": 300000
    }
  ],
  "initiatives": [
    {
      "account": "Birkenstock",
      "initiativeName": "Cloud migration project",
      "status": "Planning",
      "investmentUsd": 200000,
      "threeYearROIPercent": 350
    }
  ],
  "risks": [
    {
      "account": "Birkenstock",
      "riskTitle": "Budget approval delayed",
      "riskLevel": "High",
      "status": "Active - Not Started"
    },
    {
      "account": "Birkenstock",
      "riskTitle": "Technical resource availability",
      "riskLevel": "Medium",
      "status": "Active - Not Started"
    }
  ],
  "engagements": [
    {
      "account": "Birkenstock",
      "engagementDate": "2024-12-05",
      "engagementType": "Executive Briefing",
      "status": "Scheduled"
    },
    {
      "account": "Birkenstock",
      "engagementDate": "2024-12-12",
      "engagementType": "Technical Workshop",
      "status": "Scheduled"
    }
  ]
}
```

---

## AI Prompt Template

### Universal Prompt (Copy-Paste Ready):

```
You are a CSM data extraction assistant. Parse the following text and convert it to JSON for import into a Customer Success Management platform.

REQUIRED JSON STRUCTURE:
{
  "accounts": [
    {
      "accountName": "string (required)",
      "arr": number,
      "customerSuccessManager": "string",
      "accountExecutive": "string",
      "healthScore": number (0-100),
      "riskLevel": "Low|Medium|High|Critical",
      "renewalDate": "YYYY-MM-DD",
      "industryVertical": "string"
    }
  ],
  "people": [
    {
      "fullName": "string (required)",
      "email": "string",
      "role": "CSM|Account Executive|Executive Sponsor",
      "account": "string (required)",
      "department": "string"
    }
  ],
  "objectives": [
    {
      "account": "string (required)",
      "objectiveName": "string (required)",
      "status": "Planning|In Progress|Completed|On Hold",
      "progressPercent": number (0-100),
      "businessValueUsd": number,
      "targetDate": "YYYY-MM-DD"
    }
  ],
  "initiatives": [
    {
      "account": "string (required)",
      "initiativeName": "string (required)",
      "status": "Planning|In Progress|Completed|At Risk",
      "investmentUsd": number,
      "expectedBenefitsUsd": number,
      "threeYearROIPercent": number
    }
  ],
  "risks": [
    {
      "account": "string (required)",
      "riskTitle": "string (required)",
      "riskLevel": "Low|Medium|High|Critical",
      "riskCategory": "Technical|Financial|Resource|Strategic",
      "status": "Active - Not Started|Active - In Progress|Mitigated|Closed",
      "mitigationStrategy": "string"
    }
  ],
  "engagements": [
    {
      "account": "string (required)",
      "engagementDate": "YYYY-MM-DD (required)",
      "engagementType": "QBR|Check-in|Executive Briefing|Technical Workshop",
      "sentiment": "Very Positive|Positive|Neutral|Negative|Very Negative",
      "attendeesCustomer": "string",
      "attendeesMuleSoft": "string",
      "keyTopicsDiscussed": "string",
      "nextEngagementDate": "YYYY-MM-DD"
    }
  ],
  "tasks": [
    {
      "account": "string (required)",
      "taskTitle": "string (required)",
      "priority": "Critical|High|Medium|Low",
      "status": "Open|In Progress|Completed",
      "assignedTo": "string",
      "dueDate": "YYYY-MM-DD"
    }
  ]
}

EXTRACTION RULES:
1. Extract only information explicitly mentioned in the text
2. Use "Unknown" for missing required fields
3. Infer reasonable values based on context (e.g., if health is described as "good", use 80)
4. Convert all dates to YYYY-MM-DD format
5. Convert currency to numbers (e.g., "$850K" → 850000)
6. Include only tables that have data in the text
7. Return ONLY the JSON object, no explanations or markdown

TEXT TO PARSE:
---
[PASTE YOUR TEXT HERE]
---

Output:
```

---

## Best Practices

### 1. Be Specific with Context
Bad:
```
"We had a meeting about the account"
```

Good:
```
"QBR meeting with Gard AS on Nov 15. Health score is 80.
Discussed API latency objective which is 60% complete."
```

### 2. Include Numbers
AI extracts:
- ARR amounts ($850K, $4.6M)
- Health scores (80/100, 85%)
- Progress percentages (60% complete)
- Dates (Nov 15, Q1 2025)

### 3. Mention People and Roles
```
"Christian Tome (CEO) attended"
"Nirmal John is the CSM"
"AE: Lisa Martinez"
```

### 4. Specify Risk Levels
```
"High risk: Budget constraints"
"Critical issue: Platform downtime"
"Medium concern: Resource availability"
```

### 5. Include Sentiment
```
"Very positive meeting"
"Customer expressed concerns"
"Neutral check-in"
```

---

## Supported Input Formats

✅ **Meeting notes** (structured or unstructured)
✅ **Email summaries**
✅ **Slack/Teams conversations**
✅ **Google Docs reports**
✅ **Word documents** (copy-paste)
✅ **Excel comments** (copy-paste)
✅ **Jira tickets**
✅ **Salesforce notes**
✅ **Any text format**

---

## Limitations

❌ **Cannot parse**:
- Images/screenshots (need OCR first)
- PDFs (copy text out first)
- Audio/video (need transcription first)
- Handwritten notes (need typing first)

✅ **Workarounds**:
- Use OCR tools for images
- Copy text from PDFs
- Use transcription services for audio/video
- Type handwritten notes

---

## Tips for Best Results

### 1. Use AI Twice for Validation
**First pass:** Extract data
**Second pass:** "Validate this JSON for errors"

### 2. Review Before Import
Check AI output for:
- Correct account names
- Valid dates
- Reasonable numbers
- Proper statuses

### 3. Start Small
Import one table at a time:
```
Step 1: Just accounts
Step 2: Add objectives
Step 3: Add risks
etc.
```

### 4. Keep Prompts Saved
Save your custom prompts for:
- Weekly meeting notes
- Monthly QBRs
- Risk reviews
- Different input formats

---

## Advanced: Custom AI Workflows

### Workflow 1: Weekly Slack Digest
```
1. Copy week's Slack conversations
2. Run through AI with prompt
3. Import all engagements automatically
4. Weekly update complete in 2 minutes!
```

### Workflow 2: Automated Email Parsing
```
1. Forward weekly CSM emails to Claude
2. AI extracts all updates
3. Generate single JSON for all accounts
4. Batch import once per week
```

### Workflow 3: Meeting Recording Transcription
```
1. Record QBR meeting
2. Use Otter.ai/Rev for transcription
3. Paste transcript to AI
4. AI extracts objectives, risks, action items
5. Import to Coda
```

---

## FAQ

**Q: Which AI should I use?**
A: Claude 3.5 Sonnet or Gemini 1.5 Pro work best. GPT-4 also works.

**Q: Can I automate the AI step?**
A: Not directly in Coda Packs yet. Use external automation (Zapier, Make.com) or wait for Phase 2.

**Q: What if AI makes mistakes?**
A: Review JSON before importing. Fix any errors in the JSON, then import.

**Q: Can I update existing records?**
A: Currently imports create new records. For updates, delete old record first or use upcoming update actions.

**Q: Does this cost money?**
A: If using Claude/Gemini APIs, yes. But very cheap (~$0.01 per import). Free tier usually sufficient.

---

## Next Steps

1. **Try the examples above** - Copy-paste and test
2. **Create your own prompts** - Customize for your workflows
3. **Set up weekly routine** - Automate data entry
4. **Train your team** - Share this guide

---

**Ready to use AI-powered import!** 🤖

No more manual data entry - just paste your notes and import!
