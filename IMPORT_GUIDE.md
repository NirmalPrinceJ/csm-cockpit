# CSM Intelligence Platform - Data Import Guide

## Overview

The CSM Intelligence Platform now supports **JSON/Text-based data import** for all 14 tables. This allows you to:

✅ **Populate tables from text/JSON** - Paste data directly
✅ **AI-assisted data entry** - Use Gemini/Claude to parse and format data
✅ **Daily updates** - Import incremental changes
✅ **Bulk imports** - Load all tables at once

---

## Import Actions Available

### Individual Table Imports

1. **ImportAccounts** - Import account master data
2. **ImportPeople** - Import people/team data
3. **ImportBusinessContext** - Import business context
4. **ImportObjectives** - Import strategic objectives
5. **ImportCapabilities** - Import platform capabilities
6. **ImportValueStreams** - Import value streams
7. **ImportAPIs** - Import API portfolio
8. **ImportMetrics** - Import platform health metrics
9. **ImportInitiatives** - Import initiatives
10. **ImportRisks** - Import risk register
11. **ImportOutcomes** - Import stakeholder outcomes
12. **ImportEngagements** - Import engagement log
13. **ImportSuccessPlans** - Import success plans
14. **ImportTasks** - Import tasks

### Batch Import

**BatchImportAll** - Import data for multiple tables in one action

---

## How to Use

### Method 1: Individual Table Import

**Step 1:** Prepare your JSON data

```json
[
  {
    "accountName": "Gard AS",
    "industryVertical": "Maritime",
    "arr": 850000,
    "customerSuccessManager": "Nirmal John",
    "healthScore": 80
  },
  {
    "accountName": "Wates Group",
    "industryVertical": "Construction",
    "arr": 99000,
    "customerSuccessManager": "Nirmal John",
    "healthScore": 72
  }
]
```

**Step 2:** In your Coda doc, click on a cell and type:

```
=ImportAccounts([paste your JSON here])
```

**Step 3:** Press Enter - Data will be imported!

---

### Method 2: Batch Import All Tables

**Step 1:** Prepare comprehensive JSON with all table data

```json
{
  "accounts": [
    { "accountName": "Gard AS", "arr": 850000 }
  ],
  "people": [
    { "fullName": "Nirmal John", "role": "CSM", "account": "Gard AS" }
  ],
  "objectives": [
    { "account": "Gard AS", "objectiveName": "Reduce API Latency" }
  ]
}
```

**Step 2:** In Coda, type:

```
=BatchImportAll([paste your comprehensive JSON here])
```

**Step 3:** Get summary of all imported records

---

## JSON Template

Use `IMPORT_TEMPLATE.json` as your starting point. It includes:

- All 14 table structures
- Required fields marked
- Optional fields with defaults
- Example values for each field

**Copy the template:**
```bash
cp IMPORT_TEMPLATE.json my-data.json
```

**Edit with your data**, then paste into Coda.

---

## AI-Assisted Import (Gemini/Claude)

### Workflow with Claude/Gemini:

**Step 1:** Give AI your raw data

```
I have this account information:
- Company: Gard AS
- Industry: Maritime Insurance
- ARR: $850K
- CSM: Nirmal John
- Health: Good (80)

Convert this to JSON format for ImportAccounts action.
```

**Step 2:** AI generates JSON

```json
[
  {
    "accountName": "Gard AS",
    "industryVertical": "Maritime",
    "industrySubSector": "P&I Insurance",
    "arr": 850000,
    "customerSuccessManager": "Nirmal John",
    "healthScore": 80
  }
]
```

**Step 3:** Copy AI output and paste into Coda

```
=ImportAccounts([AI generated JSON])
```

---

## Field Requirements

### Required Fields Per Table

**Accounts:**
- `accountName` (string)

**People:**
- `fullName` (string)

**Objectives:**
- `account` (string)
- `objectiveName` (string)

**Initiatives:**
- `account` (string)
- `initiativeName` (string)

**Risks:**
- `account` (string)
- `riskTitle` (string)

**All Other Tables:**
- `account` (string)
- Primary name field (e.g., `capabilityName`, `valueStreamName`)

### Auto-Generated Fields

If not provided, these are auto-generated:
- `*Id` fields - Unique IDs (e.g., `ACC-1234567890`)
- `createdDate` - Current timestamp
- `lastUpdated` - Current timestamp

---

## Import Examples

### Example 1: Import Single Account

```
=ImportAccounts('{"accountName":"CSL Seqirus","arr":4600000,"healthScore":85}')
```

### Example 2: Import Multiple Objectives

```
=ImportObjectives('[
  {"account":"Gard AS","objectiveName":"Improve API Performance","businessValueUsd":250000},
  {"account":"Gard AS","objectiveName":"Reduce Support Tickets","businessValueUsd":150000}
]')
```

### Example 3: Import Risks

```
=ImportRisks('[
  {
    "account":"Wates Group",
    "riskTitle":"Budget Constraints",
    "riskCategory":"Financial",
    "impactLevel":4,
    "probabilityLevel":3,
    "riskLevel":"High"
  }
]')
```

### Example 4: Batch Import Everything

```
=BatchImportAll('{
  "accounts":[{"accountName":"Birkenstock","arr":750000}],
  "people":[{"fullName":"Lisa Martinez","role":"AE","account":"Birkenstock"}],
  "objectives":[{"account":"Birkenstock","objectiveName":"Platform Migration"}]
}')
```

---

## Daily Update Workflow

### Scenario: Daily data sync from external system

**Step 1:** External system exports JSON

```json
{
  "engagements": [
    {
      "account": "Gard AS",
      "engagementDate": "2024-11-15",
      "engagementType": "Check-in",
      "sentiment": "Positive",
      "keyTopicsDiscussed": "Q4 planning, Platform health review"
    }
  ],
  "tasks": [
    {
      "account": "Gard AS",
      "taskTitle": "Follow up on API performance concerns",
      "priority": "High",
      "dueDate": "2024-11-20",
      "assignedTo": "Nirmal John"
    }
  ]
}
```

**Step 2:** Use BatchImportAll to load daily updates

```
=BatchImportAll([paste daily export JSON])
```

**Step 3:** Review summary

```
✅ Engagements: 1 record(s)
✅ Tasks: 1 record(s)

📈 Total: 2 records ready for import
```

---

## Troubleshooting

### Error: "Failed to parse JSON"

**Problem:** Invalid JSON format

**Solution:**
1. Validate JSON at https://jsonlint.com
2. Ensure proper quotes (double quotes `"`, not single `'`)
3. Check for trailing commas

### Error: "Required field missing"

**Problem:** Missing required fields like `accountName` or `objectiveName`

**Solution:**
1. Check "Field Requirements" section above
2. Add required fields to your JSON

### Import shows 0 records

**Problem:** JSON format doesn't match expected structure

**Solution:**
1. Use IMPORT_TEMPLATE.json as reference
2. Ensure you're using correct key names (case-sensitive)
3. For batch import, use correct top-level keys (`accounts`, `people`, etc.)

---

## Best Practices

### 1. Start Small
- Import 1-2 accounts first
- Verify data displays correctly
- Then import remaining data

### 2. Use Batch Import for Initial Load
- Prepare comprehensive JSON once
- Import all tables together
- Saves time vs individual imports

### 3. Use Individual Imports for Updates
- Daily/weekly updates
- Specific table changes
- Incremental data additions

### 4. Validate Before Import
- Check JSON syntax
- Verify account names match across tables
- Ensure dates are in YYYY-MM-DD format

### 5. Keep Import History
- Save your JSON files
- Version control (Git) recommended
- Easy to re-import if needed

---

## Integration Ideas

### 1. CRM Integration
Export from Salesforce → Convert to JSON → ImportAccounts

### 2. Project Management
Jira/Asana export → JSON format → ImportInitiatives + ImportTasks

### 3. Support Ticketing
Zendesk/Intercom data → JSON → ImportEngagements

### 4. Custom Scripts
Python/Node.js script → Generate JSON → Paste into Coda

### 5. AI Data Entry
Meeting notes → Claude/Gemini → Structured JSON → Import

---

## Next Steps

After importing your data:

1. **Hide identity columns** - Right-click first column → Hide column
2. **Group by account** - Table options → Group → Select "account"
3. **Add filters** - Filter to specific accounts or date ranges
4. **Create view pages** - Use wireframes to build Executive Summary, QBR Prep, etc.
5. **Set up automations** - Coda automations for daily imports

---

## Support

- **Template File:** IMPORT_TEMPLATE.json
- **Troubleshooting:** TROUBLESHOOTING_GUIDE.md
- **Pack ID:** 46088
- **Version:** 15

---

**Ready to import your data!** 🚀

Start with the template, customize for your accounts, and paste into Coda.
