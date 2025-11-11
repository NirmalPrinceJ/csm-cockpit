# Backfill Account Data - Complete Guide

## What is Backfill?

**Backfill** allows you to pre-populate Coda templates with real account data **without tedious manual entry**. Instead of creating empty templates and filling in data by hand, you maintain account data in a Google Sheet and automatically inject it when creating templates.

## Why Use Backfill?

✅ **Save time** - No manual data entry in Coda
✅ **Consistency** - All templates have complete, accurate data
✅ **Scalability** - Create 10 templates as fast as 1
✅ **Maintainability** - Update account data in one place (spreadsheet)
✅ **Team sharing** - Centralized account database in Google Sheets

## Quick Start (3 Steps)

### Step 1: Setup Backfill Sheet (1 minute)

1. Open your Google Sheet with the script installed
2. Click **🎯 Coda Templates → 📋 Setup Backfill Sheet**
3. A new sheet "Backfill Data" is created with 20 columns

### Step 2: Add Your Account Data (5-10 minutes)

Fill in rows with your account information:

| Account Name | Industry | Sub-Sector | Contract Type | ARR | CSM | AE | ... |
|--------------|----------|------------|---------------|-----|-----|-----|-----|
| Gard AS | Maritime | P&I Insurance | Signature Success | 850000 | Nirmal John | Emilie Moen | ... |
| Wates Group | Construction | General Contracting | Standard | 99000 | Nirmal John | Ritchie Neil | ... |
| CSL Seqirus | Healthcare | Pharmaceutical | Premier | 4600000 | Prathamesh Pable | Dominic Holroyd | ... |
| Birkenstock | Retail | Footwear | Signature Success | 750000 | Nirmal John | Sarah Miller | ... |

### Step 3: Create Pre-filled Template (10 seconds)

1. Click **🎯 Coda Templates → 📝 Create Template with Backfill Data**
2. Select account: Enter `1` (for first account) or type account name
3. Confirm → **Done!**

Template created with all account data pre-filled in AccountMaster table.

---

## Backfill Sheet Columns

### Required Columns:

1. **Account Name** - Primary identifier (REQUIRED)
2. **Industry Vertical** - E.g., Maritime, Healthcare, Retail
3. **Industry Sub-Sector** - E.g., P&I Insurance, Pharmaceutical
4. **Contract Type** - Signature Success, Premier, Standard
5. **ARR** - Annual Recurring Revenue (number)

### Contact & Team:

6. **CSM Name** - Customer Success Manager
7. **Account Executive** - Sales owner
8. **Executive Sponsor** - Customer executive sponsor
9. **Primary Contact Name** - Main customer contact
10. **Primary Contact Email** - Contact email

### Location & Health:

11. **Geography** - EMEA, Americas, APAC
12. **Health Score** - Overall health (0-100)
13. **Business Value Score** - Value realization (0-100)
14. **Stakeholder Engagement Score** - Engagement level (0-100)
15. **Strategic Alignment Score** - Strategic fit (0-100)

### Dates:

16. **Contract Start Date** - Format: YYYY-MM-DD
17. **Contract End Date** - Format: YYYY-MM-DD
18. **Renewal Date** - Format: YYYY-MM-DD

### Status:

19. **Risk Level** - Healthy, At Risk, Critical
20. **Notes** - Any additional notes

---

## Usage Examples

### Example 1: Create Executive Summary for Gard AS

**Backfill Data:**
```
Account Name: Gard AS
Industry: Maritime
Sub-Sector: P&I Insurance
ARR: 850000
CSM: Nirmal John
Health Score: 80
```

**Steps:**
1. Click 📝 Create Template with Backfill Data
2. Enter: `Gard AS` (or `1`)
3. Script creates: "Gard AS - CSM Executive Summary"
4. AccountMaster table pre-filled with all data

**Result:** Ready-to-use template in 10 seconds!

---

### Example 2: Batch Create QBR Templates

**Scenario:** You need QBR templates for 4 accounts.

**Backfill Data Sheet:**
```
Gard AS, Maritime, 850K, Nirmal John, 80
Wates Group, Construction, 99K, Nirmal John, 35
CSL Seqirus, Healthcare, 4.6M, Prathamesh Pable, 68
Birkenstock, Retail, 750K, Nirmal John, 75
```

**Process:**
1. Run script 4 times, selecting each account
2. Each run takes 10 seconds
3. **Total time: 40 seconds for 4 complete templates**

Compare to manual: ~8 hours (2 hours per template × 4)

**Time saved: 99%**

---

### Example 3: Update Account Data Centrally

**Scenario:** Gard AS ARR increased from $850K to $1.2M.

**Steps:**
1. Update ARR in Backfill Data sheet: `850000` → `1200000`
2. Create new template → Automatically uses updated ARR
3. Old templates unchanged (you can update or recreate)

**Benefit:** Single source of truth in Google Sheets.

---

## Advanced Features

### Partial Backfill

**Leave columns blank** if you don't want to backfill that field:

| Account Name | Industry | ARR | CSM | Health Score | Notes |
|--------------|----------|-----|-----|--------------|-------|
| Gard AS | Maritime | 850000 | Nirmal John | 80 | |
| Wates Group | Construction | | Nirmal John | | TBD |

In this example, Wates Group template will be created but ARR and Health Score will be empty (you'll fill them in Coda later).

---

### Backfill with Formulas

Use Google Sheets formulas in Backfill Data:

```
=IF(D2="Signature Success", E2*0.8, E2*0.5)  // Calculate health based on contract
=TEXT(TODAY()+365, "YYYY-MM-DD")              // Auto-set renewal date to 1 year from today
=VLOOKUP(A2, TeamRoster!A:B, 2, FALSE)        // Lookup CSM from team roster sheet
```

Script will evaluate formulas when creating templates.

---

### Multiple Backfill Sheets

Create separate sheets for different use cases:

**Sheet 1: "Backfill Data - Active Accounts"**
- Current customers
- Full data required

**Sheet 2: "Backfill Data - Prospects"**
- Potential customers
- Minimal data (name, industry, potential ARR)

**Sheet 3: "Backfill Data - Renewals"**
- Accounts renewing this quarter
- Focus on renewal dates and risk levels

Update the script to read from different sheets based on scenario.

---

## Workflow Recommendations

### Daily Workflow:

1. **Maintain Backfill Data sheet** - Update as account info changes
2. **Create templates as needed** - 10 seconds per template
3. **Log creation** - Script automatically logs to main sheet

### Weekly Workflow:

1. **Review Backfill Data** - Ensure all accounts have current data
2. **Batch create QBR templates** - For upcoming QBRs
3. **Share templates** - Publish to Coda workspace

### Monthly Workflow:

1. **Audit Backfill Data** - Remove closed accounts, add new accounts
2. **Update health scores** - Reflect current health
3. **Review template usage** - Check creation log

---

## Data Sources for Backfill

### Option 1: Manual Entry
Enter data directly in Backfill Data sheet.

**Best for:** Small teams, <20 accounts

### Option 2: Import from Salesforce
Export Salesforce account data → Paste into Backfill Data sheet.

**Steps:**
1. Salesforce → Reports → Create Account Report
2. Include: Account Name, Industry, ARR, Owner, etc.
3. Export as CSV
4. Paste into Backfill Data sheet

### Option 3: Google Sheets Integration
Use Google Sheets add-ons to connect to CRM/data sources.

**Add-ons:**
- Salesforce Connector
- HubSpot for Sheets
- Zapier

### Option 4: Apps Script Automation
Write Apps Script to fetch data from external APIs.

```javascript
function updateBackfillFromAPI() {
  // Fetch from your internal API
  const response = UrlFetchApp.fetch('https://api.yourcompany.com/accounts');
  const accounts = JSON.parse(response);

  // Write to Backfill Data sheet
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Backfill Data');
  // ... populate sheet
}
```

---

## Troubleshooting

### Issue: "Backfill Data sheet not found"

**Solution:** Run "Setup Backfill Sheet" first.

### Issue: "No data found"

**Solution:**
- Add at least one account row
- Make sure Account Name column is filled
- Delete the example row (Gard AS) if you don't want it

### Issue: "Failed to add row to table"

**Possible causes:**
1. AccountMaster table not found in template
2. Column names don't match
3. API error

**Solutions:**
- Ensure master template has AccountMaster table
- Check that table is from CSM Intelligence Platform pack
- Wait a few seconds and try again

### Issue: "Data not showing in Coda"

**Solution:**
- Refresh Coda doc page
- Wait 10-15 seconds for sync
- Check that row was actually added (view AccountMaster table)

---

## Best Practices

### Data Entry:

1. **Use consistent naming** - "Gard AS" not "GARD AS" or "Gard A/S"
2. **Format dates correctly** - YYYY-MM-DD (e.g., 2025-12-31)
3. **Numbers only for scores** - 80, not "80%" or "80 pts"
4. **Validate ARR** - Use numbers, not formatted currency ($850K → 850000)

### Data Maintenance:

1. **Update regularly** - Keep health scores current
2. **Archive closed accounts** - Move to separate sheet
3. **Document changes** - Use Notes column for updates
4. **Version control** - Keep backup copies of Backfill Data sheet

### Template Creation:

1. **Test first** - Create one template, verify data looks correct
2. **Batch create** - Create multiple templates at once for efficiency
3. **Review before publishing** - Check pre-filled data in Coda
4. **Clean up** - Remove test templates

---

## FAQs

**Q: Can I backfill data to other tables (StrategicObjectives, Initiatives, etc.)?**

A: Currently the script only backfills AccountMaster. You can extend it to backfill other tables by:
1. Creating additional backfill sheets (e.g., "Backfill Objectives")
2. Modifying the script to insert rows into other tables
3. See "Advanced Customization" section in SETUP_GUIDE.md

**Q: What happens if I update Backfill Data after creating templates?**

A: Existing templates are not affected. Only new templates created after the update will have the new data. To update existing templates, you must:
1. Open the template in Coda
2. Manually update the data, OR
3. Delete and recreate the template

**Q: Can I use this with accounts not in the pack sample data?**

A: Yes! The backfill feature is designed to add YOUR real accounts, not the sample data (Gard AS, Wates Group, etc.). The sample accounts in the pack are just examples.

**Q: How many accounts can I have in Backfill Data sheet?**

A: No limit! Google Sheets supports 10 million cells. You can easily manage 1000+ accounts.

**Q: Can I export templates with backfill data?**

A: Yes. Once created in Coda, you can:
1. Export as PDF
2. Publish as Coda template
3. Share doc link
4. Copy to other workspaces

**Q: Does backfill work with the "from scratch" method?**

A: No, backfill requires the "Copy Master Template" method because it needs the AccountMaster table to exist. The "from scratch" method only creates empty pages.

---

## Comparison: With vs Without Backfill

### Without Backfill (Traditional):

1. Create empty template (5 seconds)
2. Open in Coda
3. Manually enter account name
4. Manually enter industry, ARR, CSM, etc. (15 minutes)
5. Manually enter health scores (5 minutes)
6. Manually enter contacts (5 minutes)
7. Review and fix typos (5 minutes)

**Total: ~30 minutes per template**

### With Backfill:

1. Click "Create Template with Backfill Data" (5 seconds)
2. Select account (2 seconds)
3. Confirm (1 second)
4. **Done!**

**Total: ~10 seconds per template**

**Time saved: 99.4%**

---

## Next Steps

1. ✅ Run "Setup Backfill Sheet"
2. ✅ Add your accounts (Gard AS, Wates Group, CSL Seqirus, Birkenstock, others)
3. ✅ Test with one account
4. ✅ Batch create templates for all accounts
5. ✅ Publish to Coda workspace

---

## Support

- See `SETUP_GUIDE.md` for detailed script setup
- See `README.md` for quick reference
- See `TEMPLATE_CREATION_GUIDE.md` for manual template creation

---

**Created:** November 2024
**Script Version:** 1.1 (with Backfill)
**Pack Version:** 11
**Pack ID:** 46088
