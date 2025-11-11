# Google Apps Script Template Creator - Setup Guide

## Overview

This Google Apps Script automates the creation of Coda templates for the CSM Intelligence Platform using the Coda API.

**Best Method: Copy Master Template** (Fastest & Most Reliable)

---

## Quick Start (5 Minutes)

### Step 1: Get Your Coda API Token

1. Go to https://coda.io/account
2. Scroll to "API SETTINGS"
3. Click "Generate API Token"
4. Name it: "Template Creator Script"
5. Copy the token (starts with something like `a1b2c3d4-...`)
6. **Save it somewhere safe** - you'll need it in Step 3

### Step 2: Create Google Sheet

1. Go to https://sheets.google.com
2. Create new blank spreadsheet
3. Name it: "Coda Template Creator"

### Step 3: Add the Script

1. In the Google Sheet, go to **Extensions → Apps Script**
2. Delete any default code
3. Copy the entire contents of `CodaTemplateCreator.gs`
4. Paste into Apps Script editor
5. Update line 18 with your API token:
   ```javascript
   CODA_API_TOKEN: 'YOUR_TOKEN_HERE',
   ```
6. Click **💾 Save** (or Ctrl+S / Cmd+S)
7. Name the project: "Coda Template Creator"

### Step 4: Run First-Time Setup

1. In Apps Script editor, select function: `setupMenu`
2. Click **▶ Run**
3. You'll see a permission dialog:
   - Click "Review permissions"
   - Choose your Google account
   - Click "Advanced" → "Go to Coda Template Creator (unsafe)"
   - Click "Allow"
4. Close Apps Script editor
5. **Refresh your Google Sheet**

You should now see a new menu: **🎯 Coda Templates**

### Step 5: Test the Connection

1. In Google Sheet, click **🎯 Coda Templates → 🔧 Test API Connection**
2. If successful, you'll see: "✅ API Connection Successful!"
3. If error, check your API token in the script

---

## Usage Methods

### Method 1: Copy Master Template (RECOMMENDED - Fastest)

**This is the BEST method** - creates perfect copies in seconds.

#### Initial Setup (One-Time):

1. In Google Sheet, click **🎯 Coda Templates → Create Master Template Doc**
2. Enter name: "CSM Intelligence Platform - MASTER"
3. Copy the Doc ID from the success message
4. Open the doc in Coda (click the URL)
5. **Manually configure this master doc completely:**

   **Page 1: Getting Started**
   - Insert → Packs → CSM Intelligence Platform
   - Insert → QuickStartGuide table

   **Page 2: Executive Summary**
   - Insert → AccountMaster table (configured as per VIEW-001)
   - Insert → StrategicObjectives table
   - Insert → Initiatives table
   - Insert → RiskRegister table
   - Insert → EngagementLog table
   - Add canvas sections with formulas
   - Configure filters, sorts, conditional formatting

   **Page 3: My Command Center**
   - Set up per VIEW-002 instructions

   **Page 4: Health Dashboard**
   - Set up per VIEW-003 instructions

   **Page 5: QBR Preparation**
   - Set up per VIEW-004 instructions

   **Page 6: Renewal Pipeline**
   - Set up per VIEW-005 instructions

6. Once perfect, go back to Apps Script editor
7. Update line 24 with your master Doc ID:
   ```javascript
   MASTER_TEMPLATE_DOC_ID: 'abc123def456',
   ```
8. Save

#### Creating Templates (Takes 5 seconds):

1. Click **🎯 Coda Templates → 📋 Create Full Workspace Template**
2. Enter template name (or press OK for default)
3. Wait 5-10 seconds
4. **Done!** Perfect copy created

The script creates a complete copy with:
- ✅ All 6 pages
- ✅ All pack tables configured
- ✅ All formulas and filters
- ✅ All conditional formatting
- ✅ Sample data included

---

### Method 2: Create from Scratch (Slower)

Creates empty doc with pages, but you must manually add pack tables.

**When to use:** For creating base structure only, or if you don't have a master template yet.

#### Setup:

1. Leave `MASTER_TEMPLATE_DOC_ID` blank (empty string)
2. Use the script to create doc with pages

#### Usage:

1. Click **🎯 Coda Templates → 📋 Create Full Workspace Template**
2. Enter template name
3. Script creates doc with 6 pages
4. Open doc in Coda
5. **Manually add pack tables to each page**
6. Configure views, filters, formatting

---

### Method 3: Single Account Template

Creates a lightweight single-page template.

1. Click **🎯 Coda Templates → 📄 Create Single Account Template**
2. Enter template name (e.g., "Account Executive Summary")
3. Script creates doc with single page
4. Open in Coda
5. Add pack tables for executive summary view
6. Configure for single-account focus

---

## Converting to Coda Template

After creating doc via script, you must publish it as a Coda template:

1. Open the created doc in Coda
2. Click **three-dot menu (⋮)** in upper-right
3. Select **Doc settings**
4. Click **Create a template**
5. Choose: **Create a copy of this doc** (recommended)
6. Click **Publish**
7. Choose visibility:
   - **Available to workspace** (for team)
   - **Private** (only you)
8. Set accessibility: **Creating a new doc and adding to an existing doc**
9. Add metadata:
   - Name, description, tags
10. Click **Publish**

**Done!** Template now available in your workspace.

---

## Advanced Features

### Batch Create Templates

Create multiple templates at once from a list.

1. In your Google Sheet, create new sheet named: **Templates to Create**
2. Add headers:
   ```
   A: Template Name
   B: Type (Full/Single)
   C: Account Name
   ```
3. Fill in rows with templates to create
4. Run: **Extensions → Apps Script → Run → batchCreateTemplates**
5. Check "Creation Results" sheet for outcomes

Example data:
```
Template Name                           | Type   | Account Name
CSM Platform - Sales Team               | Full   |
Gard AS Executive Summary               | Single | Gard AS
Wates Group QBR Q1 2025                 | Single | Wates Group
```

### List Your Coda Docs

View all your Coda documents:

1. Click **🎯 Coda Templates → 📊 List My Coda Docs**
2. See list of docs with IDs

Useful for finding doc IDs.

### View Settings

Check current configuration:

1. Click **🎯 Coda Templates → ⚙️ Settings**
2. See API token status, Pack ID, Master template doc ID

---

## Troubleshooting

### "API Connection Failed"

**Cause:** Invalid or missing API token

**Fix:**
1. Go to https://coda.io/account
2. Generate new API token
3. Update `CODA_API_TOKEN` in script
4. Save and test again

### "Failed to create template: 429"

**Cause:** Rate limit exceeded (too many requests too fast)

**Fix:**
1. Wait 1 minute
2. Try again
3. For batch operations, add longer delays

### "Permission denied"

**Cause:** Script permissions not granted

**Fix:**
1. Go to Extensions → Apps Script
2. Run `setupMenu` function
3. Grant all permissions
4. Refresh sheet

### "Doc created but empty"

**Cause:** Using "from scratch" method without master template

**Fix:**
1. Use Method 1 (Copy Master Template) instead
2. OR manually add pack tables after creation

### "Cannot find pack tables"

**Cause:** Pack not installed in doc

**Fix:**
1. Open doc in Coda
2. Click Insert → Packs
3. Search "CSM Intelligence Platform" (Pack ID 46088)
4. Click "Add to doc"
5. Now you can insert pack tables

---

## API Quotas & Limits

### Google Apps Script Limits:

- **URL Fetch Calls:**
  - Free accounts: 20,000/day
  - Workspace accounts: 100,000/day
- **Execution Time:** 6 minutes per run
- **Trigger Runtime:** 90 minutes total per day

### Coda API Limits:

- **Rate Limit:** ~100 requests per minute
- **Doc Creation:** No specific limit, but respect rate limits
- **Page Creation:** Asynchronous, may take a few seconds

### Best Practices:

- Use **Copy Master Template** method (1 API call vs 10+)
- Add delays between batch operations (`Utilities.sleep(2000)`)
- Monitor quota usage in Apps Script dashboard

---

## Workflow Recommendations

### For Teams (Recommended):

1. **One-time setup:**
   - Create master template doc (Method 1)
   - Configure it perfectly in Coda
   - Save Doc ID in script

2. **Creating templates:**
   - Use "Copy Master Template" (5 seconds per template)
   - Publish to workspace
   - Team can use immediately

3. **Maintenance:**
   - Update master doc when pack changes
   - Re-copy to create new versions

### For Individual Users:

1. Create single-account templates for each major account
2. Use batch create for multiple accounts
3. Export as PDFs for stakeholder sharing

### For QBR Preparation:

1. Create single-account template per account
2. Name: "[Account Name] - QBR [Quarter] [Year]"
3. Configure executive summary view
4. Update before each QBR
5. Export and present

---

## Integration Ideas

### Automate with Triggers:

Add time-based triggers to auto-create templates:

```javascript
function createWeeklyQBRTemplates() {
  // Get accounts needing QBRs this week from spreadsheet
  // Create template for each
  // Send notification
}
```

### Connect to Other Tools:

- **Slack:** Post template creation notifications
- **Salesforce:** Pull account data to customize templates
- **Google Calendar:** Auto-create templates before scheduled QBRs
- **Email:** Send template links to CSMs

### Custom UI:

Build sidebar UI for easier template creation:

```javascript
function showSidebar() {
  const html = HtmlService.createHtmlOutputFromFile('Sidebar')
    .setTitle('Coda Template Creator');
  SpreadsheetApp.getUi().showSidebar(html);
}
```

---

## Security Best Practices

### API Token Security:

1. **Never share** your API token
2. **Never commit** token to version control (Git)
3. **Rotate tokens** every 90 days
4. **Use separate tokens** for different scripts

### Script Sharing:

When sharing script with team:

1. Remove your API token from code
2. Add instructions for team members to add their own tokens
3. OR use Script Properties (see below)

### Using Script Properties (Advanced):

Store API token securely:

```javascript
// Set token once:
function setApiToken() {
  PropertiesService.getScriptProperties()
    .setProperty('CODA_API_TOKEN', 'your-token-here');
}

// Use in script:
const CONFIG = {
  CODA_API_TOKEN: PropertiesService.getScriptProperties()
    .getProperty('CODA_API_TOKEN'),
  // ... rest of config
};
```

---

## Version History & Updates

### Updating the Script:

1. Go to Extensions → Apps Script
2. Update code
3. Save
4. Refresh Google Sheet

Changes take effect immediately.

### Rollback:

Apps Script keeps version history:

1. Apps Script editor → File → Version history
2. Select previous version
3. Restore if needed

---

## Support & Resources

### Coda API Documentation:
- https://coda.io/developers/apis/v1

### Google Apps Script Docs:
- https://developers.google.com/apps-script

### CSM Intelligence Platform Pack:
- Pack ID: 46088
- Management: https://coda.io/p/46088

### Documentation Files:
- `TEMPLATE_CREATION_GUIDE.md` - Manual template creation
- `PHASE1_COMPLETE.md` - Pack overview
- `QUICK_IMPORT_GUIDE.md` - Getting started with pack

---

## Next Steps

1. ✅ Complete setup (Steps 1-5 above)
2. ✅ Create master template doc
3. ✅ Configure master doc perfectly in Coda
4. ✅ Use script to copy master (instant templates!)
5. ✅ Publish templates to workspace
6. ✅ Train team on using templates

**Time Investment:**
- Initial setup: 15 minutes
- Master doc configuration: 60-90 minutes (one time)
- Each template creation after: **5 seconds** ⚡

**ROI:**
- Manual template creation: ~2 hours
- Script template creation: 5 seconds
- **Time saved: 99.9%** 🚀

---

**Questions?** Check troubleshooting section or review Coda API docs.

**Ready?** Start with Step 1 above! 🎯
