# Coda Template Creator - Google Apps Script

Automate CSM Intelligence Platform template creation in Coda using Google Apps Script.

## What This Does

Creates Coda templates for your CSM Intelligence Platform in **5 seconds** instead of 2 hours of manual work.

## Quick Setup (5 Minutes)

1. **Get Coda API Token:** https://coda.io/account → Generate API Token
2. **Create Google Sheet:** New blank spreadsheet
3. **Add Script:**
   - Extensions → Apps Script
   - Paste `CodaTemplateCreator.gs` code
   - Update `CODA_API_TOKEN` with your token
   - Save
4. **Run Setup:**
   - Select `setupMenu` function → Run
   - Grant permissions
   - Refresh sheet
5. **Test:** 🎯 Coda Templates → 🔧 Test API Connection

## Usage

### Best Method: Copy Master Template (Recommended)

**One-time setup (60 minutes):**
1. Click 🎯 Coda Templates → Create Master Template Doc
2. Configure it perfectly in Coda with all tables/views
3. Copy Doc ID to script config

**Create templates (5 seconds each):**
1. Click 🎯 Coda Templates → 📋 Create Full Workspace Template
2. Enter name → OK
3. **Done!** Perfect copy created instantly

### Alternative: Single Account Template

1. Click 🎯 Coda Templates → 📄 Create Single Account Template
2. Enter name
3. Add pack tables manually in Coda

### NEW: Backfill Account Data

Pre-populate templates with real account data from a spreadsheet!

**Setup (one-time):**
1. Click 🎯 Coda Templates → 📋 Setup Backfill Sheet
2. Fill in your account data (Gard AS, Wates Group, CSL Seqirus, Birkenstock, etc.)
3. Save the sheet

**Create pre-filled templates:**
1. Click 🎯 Coda Templates → 📝 Create Template with Backfill Data
2. Select account from list
3. **Done!** Template created with account data pre-filled in AccountMaster table

**What gets backfilled:**
- Account Name, Industry, ARR
- CSM Name, Account Executive, Executive Sponsor
- Contact details
- Health scores (Platform, Business Value, Stakeholder, Strategic)
- Contract dates and renewal date
- Geography, Risk Level
- Notes

## Files

- `CodaTemplateCreator.gs` - Main script (paste into Apps Script editor)
- `SETUP_GUIDE.md` - Detailed setup and usage instructions
- `README.md` - This file

## Features

✅ Create full workspace templates (all 6 pages)
✅ Create single-account templates
✅ **NEW: Backfill account data** (pre-populate templates with real data)
✅ Copy master template (fastest method)
✅ Batch create multiple templates
✅ List your Coda docs
✅ Test API connection
✅ Track template creation history

## Requirements

- Google account (free or Workspace)
- Coda account with API access
- CSM Intelligence Platform Pack (ID: 46088) installed

## API Quotas

- **Google Apps Script:** 20,000 URL fetches/day (free) or 100,000/day (Workspace)
- **Coda API:** ~100 requests/minute
- **Execution Time:** 6 minutes max per run

**Script uses 1 API call per template** (copy method) - very efficient!

## Support

See `SETUP_GUIDE.md` for:
- Detailed setup instructions
- Troubleshooting guide
- Advanced features
- Integration ideas
- Security best practices

## Quick Reference

| Action | Menu Path |
|--------|-----------|
| Create full template | 🎯 Coda Templates → 📋 Create Full Workspace Template |
| Create single template | 🎯 Coda Templates → 📄 Create Single Account Template |
| **Create with backfill** | 🎯 Coda Templates → 📝 Create Template with Backfill Data |
| **Setup backfill sheet** | 🎯 Coda Templates → 📋 Setup Backfill Sheet |
| List docs | 🎯 Coda Templates → 📊 List My Coda Docs |
| Test connection | 🎯 Coda Templates → 🔧 Test API Connection |
| View settings | 🎯 Coda Templates → ⚙️ Settings |

## Configuration

Edit `CONFIG` object in script (lines 16-28):

```javascript
const CONFIG = {
  CODA_API_TOKEN: 'your-token-here',           // Required
  MASTER_TEMPLATE_DOC_ID: 'abc123',            // Optional (for copy method)
  PACK_ID: '46088',                            // CSM Intelligence Platform
  WORKSPACE_ID: ''                             // Optional
};
```

## Workflow

```
1. One-time: Create & configure master template doc in Coda
              ↓
2. Update script with master Doc ID
              ↓
3. Run script: Create Full Workspace Template
              ↓
4. Instant perfect copy created (5 seconds)
              ↓
5. Publish as Coda template to workspace
              ↓
6. Team can use template immediately
```

## Time Savings

| Method | Time |
|--------|------|
| Manual template creation | ~2 hours |
| Script with master copy | **5 seconds** |
| **Time saved** | **99.9%** 🚀 |

## Next Steps

1. Read `SETUP_GUIDE.md` for detailed instructions
2. Complete 5-minute setup
3. Create master template doc
4. Configure master perfectly (one-time, 60 minutes)
5. Use script to create instant copies!

---

**Pack Version:** 11
**Pack ID:** 46088
**Script Version:** 1.0
**Last Updated:** November 2024

**Author:** CSM Intelligence Platform Team
**License:** MIT
