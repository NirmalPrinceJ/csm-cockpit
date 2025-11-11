# CSM Intelligence Platform - Troubleshooting Guide

## Common Issues & Solutions

---

## Issue 0: ALL Fields Showing as Icons Instead of Data ⚠️⚠️⚠️ **CRITICAL**

### Problem:
ALL columns in ALL tables show pack logo icons instead of actual data values. Fields like Account, Person, Context, Objective, ValueStream, API, Metric, Initiative, Risk, Outcome, Capability, Engagement, SuccessPlan, and Task all display as icons.

### Why This Happens:
This is a **display bug in Coda** related to how sync tables with `identityName` are rendered. The `identityName` property is REQUIRED by Coda SDK for all sync tables, but sometimes Coda incorrectly renders ALL columns as reference columns (showing icons) instead of showing the actual data values.

### Root Cause:
The pack schemas are correct. The issue is with how Coda is displaying the data in the browser. This can happen when:
1. Coda's sync cache gets corrupted
2. Browser cache has stale pack metadata
3. Pack was recently updated and Coda hasn't refreshed properly

### Solution A: Force Refresh (Quick - Try First)
```
1. Close the Coda doc completely
2. Clear your browser cache (Cmd+Shift+Delete on Mac, Ctrl+Shift+Delete on Windows)
3. Log out of Coda
4. Log back in to Coda
5. Open the doc again
6. Click "Sync" button on ANY table
7. Wait 15-20 seconds
8. Refresh the browser page (Cmd+R or F5)
9. Check if data displays correctly now
```

### Solution B: Re-insert Tables (Clean Slate)
```
1. Delete ALL sync tables from your doc
2. Close the doc
3. Clear browser cache
4. Re-open doc
5. Re-insert tables one by one:
   Insert → Packs → CSM Intelligence Platform → [Table Name]
6. After each insert, wait 5 seconds for sync to complete
7. Check if data displays correctly
```

### Solution C: Create New Doc (Nuclear Option)
```
1. Create brand new Coda doc
2. Install pack fresh (Pack ID 46088)
3. Insert tables
4. Should display correctly in fresh doc
```

### Solution D: Contact Coda Support
If none of the above work, this is likely a Coda platform bug. Report to:
- Coda Support: help@coda.io
- Coda Community: community.coda.io
- Include Pack ID: 46088
- Include screenshot of the issue

### Technical Details:
The pack uses `identityName` (required by SDK) and proper schema configuration:
- `idProperty`: Unique identifier field (e.g., personId, accountId)
- `displayProperty`: Human-readable field (e.g., fullName, accountName)
- `featuredProperties`: Default visible columns

These are all configured correctly. The issue is Coda's rendering engine, not the pack code.

---

## Issue 1: Pack Logo Showing as First Column ⚠️

### Problem:
When you insert a sync table, the first column shows the pack logo instead of account data.

### Why This Happens:
Coda automatically creates an "identity column" for each sync table that displays the pack logo by default.

### Solution:
**Hide the identity column** after inserting any table:

```
1. Insert table from pack
2. Right-click the FIRST column header (with pack logo)
3. Select "Hide column"
4. Done! Now you see your data columns
```

### Do This for ALL Tables:
- AccountMaster
- BusinessContext
- StrategicObjectives
- PlatformCapabilities
- ValueStreams
- APIPortfolio
- PlatformHealthMetrics
- Initiatives
- RiskRegister
- StakeholderOutcomes
- EngagementLog
- SuccessPlanTracker
- ActivitiesTasks
- PeopleTeam

---

## Issue 2: Tables Not Grouped by Account

### Problem:
All tables show data from all accounts mixed together, making it hard to find specific account data.

### Solution:
**Manually group by account** after inserting tables:

```
For tables with "account" field:

1. Click table options (⋮ in top-right of table)
2. Click "Group"
3. Select "account" from dropdown
4. Done! Rows now grouped by account name
```

### Which Tables to Group by Account:
- ✅ BusinessContext → Group by `account`
- ✅ StrategicObjectives → Group by `account`
- ✅ PlatformCapabilities → Group by `account`
- ✅ ValueStreams → Group by `account`
- ✅ APIPortfolio → Group by `account`
- ✅ PlatformHealthMetrics → Group by `account`
- ✅ Initiatives → Group by `account`
- ✅ RiskRegister → Group by `account`
- ✅ StakeholderOutcomes → Group by `account`
- ✅ EngagementLog → Group by `account`
- ✅ SuccessPlanTracker → Group by `account`
- ✅ ActivitiesTasks → Group by `account`

### Tables That DON'T Group by Account:
- AccountMaster → Group by `customerSuccessManager` or `riskLevel`
- PeopleTeam → Group by `department` or `role`

---

## Issue 3: Need to Filter by Specific Account

### Problem:
Want to see data for only one account (e.g., "Gard AS") across all tables.

### Solution A: Page-Level Filter (Recommended)

```
1. Create new page: "Gard AS - Dashboard"
2. At top of page, click "+ Add" → "Control" → "Select list"
3. Configure control:
   - Name: "Account"
   - Options: Gard AS, Wates Group, CSL Seqirus, Birkenstock
   - Default: Gard AS
4. For EACH table on the page:
   - Click table options (⋮)
   - Click "Filter"
   - Add filter: account = [Account control value]
5. Now changing the control filters ALL tables on the page!
```

###Solution B: Individual Table Filters

```
For each table:
1. Click table options (⋮)
2. Click "Filter"
3. Click "+ Add filter"
4. Select column: "account"
5. Operator: "is"
6. Value: "Gard AS" (or select from dropdown)
7. Click "Apply"
```

### Quick Filters to Add:

**StrategicObjectives:**
```
Filter: account = "Gard AS" AND status != "Completed"
Sort: businessValueUsd DESC
```

**Initiatives:**
```
Filter: account = "Gard AS" AND status IN ("Planning", "In Progress", "At Risk")
Sort: priority ASC, threeYearROIPercent DESC
```

**RiskRegister:**
```
Filter: account = "Gard AS" AND status CONTAINS "Active"
Sort: riskLevel DESC, riskScore DESC
```

**ActivitiesTasks:**
```
Filter: account = "Gard AS" AND status IN ("Pending", "In Progress")
Sort: dueDate ASC, priority DESC
```

---

## Issue 4: PeopleTeam Only Shows 1 Person

### Problem:
PeopleTeam table only displays one person instead of all team members.

### Status:
**FIXED in Version 12** ✅

The table now includes 6 people:
1. Nirmal John (CSM)
2. Prathamesh Pable (CSM)
3. Emilie Moen (Account Executive)
4. Ritchie Neil (Account Executive)
5. Dominic Holroyd (Account Executive)
6. Christian Tome (Executive Sponsor)

### If Still Not Showing:
1. Delete the PeopleTeam table from your doc
2. Re-insert: Insert → Packs → CSM Intelligence Platform → PeopleTeam
3. Wait 5-10 seconds for sync
4. Refresh page
5. Should now show all 6 people

---

## Issue 5: Tables Show Old/Wrong Data

### Problem:
Some tables still display old sample data (Acme Financial, Nordic Logistics, HealthTech) instead of new accounts (Gard AS, Wates Group, CSL Seqirus, Birkenstock).

### Status:
**FIXED in Version 12** ✅

All tables now use the 4 real accounts:
- Gard AS (Maritime, $850K ARR)
- Wates Group (Construction, $99K ARR)
- CSL Seqirus (Healthcare, $4.6M ARR)
- Birkenstock (Retail, $750K ARR)

### How to Update Existing Docs:

**Method 1: Refresh Sync (Quick)**
```
1. Open your doc with the pack tables
2. Click on any sync table
3. Click the "Sync" button in table header
4. Wait 10-15 seconds
5. Refresh browser page
6. Should show new data
```

**Method 2: Re-insert Tables (Clean)**
```
1. Delete old table
2. Insert → Packs → CSM Intelligence Platform → [Table Name]
3. Hide first column (pack logo)
4. Group by account
5. Add filters
6. Configure views
```

**Method 3: Create New Doc**
```
1. Create brand new Coda doc
2. Install pack (Pack ID 46088)
3. Insert all tables fresh
4. Will have all new data automatically
```

---

## Issue 6: Want Default Grouping/Filtering

### Problem:
Every time you insert a table, you have to manually group by account and add filters.

### Why This Happens:
Coda Packs don't support default grouping/filtering in table definitions. Users must configure after insertion.

### Workaround: Create Template Doc

**One-Time Setup (30 minutes):**
```
1. Create new doc: "CSM Platform - Master Template"
2. Install pack
3. Create 5 pages (Executive Summary, Command Center, Health Dashboard, QBR Prep, Renewal Pipeline)
4. Insert all tables
5. Configure EACH table:
   - Hide first column (pack logo)
   - Group by account (where applicable)
   - Add filters
   - Set sorts
   - Configure conditional formatting
6. Save this doc
```

**Using Template (5 seconds per new doc):**
```
1. Duplicate "Master Template" doc
2. Rename for specific use
3. All tables already configured!
4. Just add/remove accounts as needed
```

Alternatively, use the **Google Apps Script** we created to automate template creation!

---

## Issue 7: Sample Data Doesn't Match My Accounts

### Problem:
Pack includes sample data for 4 accounts, but you want your own account data.

### Solution: Clear & Replace

**Clear Sample Data:**
```
For EACH table:
1. Select all rows (click checkbox in header)
2. Right-click → Delete rows
3. Table now empty
```

**Add Your Data:**
```
Option A: Manual Entry
- Click "+ New row" at bottom of table
- Fill in all fields
- Repeat for each account

Option B: Import from CSV
- Prepare CSV with your account data
- Use Coda's "Import data" feature
- Map columns to table fields

Option C: Use Google Apps Script Backfill
- Use our backfill script
- Pre-populate from Google Sheets
- Instant account creation
```

---

## Issue 8: Health Scores Not Calculating

### Problem:
Health scores show as 0 or empty.

### Why:
In Phase 1, health scores are **manual entry fields**, not auto-calculated.

### Solution:
**Manually enter health scores** for each account in AccountMaster:
- platformHealthScore (0-100)
- businessValueRealizationScore (0-100)
- stakeholderEngagementScore (0-100)
- strategicAlignmentScore (0-100)

**Future Enhancement:**
Phase 2 will include auto-calculated composite health scores based on:
- Objectives progress
- Risk levels
- Engagement cadence
- Platform metrics

---

## Issue 9: Can't Find Pack in Coda

### Problem:
When searching for "CSM Intelligence Platform" in Coda packs, nothing appears.

### Solutions:

**Method 1: Use Pack ID**
```
1. In Coda doc, click Insert → Packs
2. Instead of searching, paste: 46088
3. Press Enter
4. Pack should appear
5. Click "Add to doc"
```

**Method 2: Use Direct URL**
```
Go to: https://coda.io/p/46088
```

**Method 3: Check Workspace Access**
```
- Pack might be private to specific workspace
- Ask workspace admin to share pack
- Or create pack in your own workspace
```

---

## Issue 10: Tables Not Syncing / Showing "Error"

### Problem:
Tables show sync errors or don't update.

### Troubleshooting Steps:

**Step 1: Check Pack Version**
```
1. Click table → Options (⋮)
2. Check "Pack version"
3. Should show Version 12 (latest)
4. If older, click "Update pack"
```

**Step 2: Force Sync**
```
1. Click table
2. Click "Sync" button in header
3. Wait 10-15 seconds
4. Refresh browser
```

**Step 3: Check Coda Status**
```
Go to: https://status.coda.io
Check if Coda services are operational
```

**Step 4: Clear Browser Cache**
```
1. Clear browser cache
2. Log out of Coda
3. Log back in
4. Try again
```

**Step 5: Re-install Pack**
```
1. Remove pack from doc
2. Re-add pack (ID 46088)
3. Re-insert tables
```

---

## Quick Setup Checklist

Use this checklist when inserting ANY pack table:

```
□ Insert table from pack
□ Hide first column (pack logo) - Right-click → Hide column
□ Group by account (if table has "account" field)
□ Add filters (see Filter Examples above)
□ Sort by relevant field (e.g., healthScore ASC, dueDate ASC)
□ Hide unnecessary columns (contractStartDate, createdDate, etc.)
□ Add conditional formatting (health scores, risk levels)
□ Save table configuration
□ Test with sample data
```

---

## Filter Quick Reference

Copy these filters for each table:

### StrategicObjectives
```
account = [Selected Account]
AND status != "Completed"
AND status != "Cancelled"

Sort: businessValueUsd DESC, progressPercent ASC
Group: strategicPillar
```

### Initiatives
```
account = [Selected Account]
AND status IN ("Planning", "In Progress", "At Risk")

Sort: priority ASC, threeYearROIPercent DESC
Group: businessDriver
```

### RiskRegister
```
account = [Selected Account]
AND status CONTAINS "Active"

Sort: riskLevel DESC, riskScore DESC
Group: riskCategory
```

### ActivitiesTasks
```
account = [Selected Account]
AND status IN ("Pending", "In Progress")

Sort: dueDate ASC, priority DESC
Group: priority
```

### EngagementLog
```
account = [Selected Account]
AND engagementDate >= [90 days ago]

Sort: engagementDate DESC
Group: engagementType
```

### PlatformHealthMetrics
```
account = [Selected Account]
AND healthStatus IN ("Critical", "Warning", "Acceptable")

Sort: healthStatus DESC, metricCategory
Group: metricCategory
```

---

## Contact & Support

**Issue Not Listed Here?**

1. Check main documentation:
   - README.md
   - PHASE1_COMPLETE.md
   - QUICK_IMPORT_GUIDE.md
   - RELATIONSHIPS_GUIDE.md

2. Check pack management:
   - https://coda.io/p/46088

3. Check Coda Pack SDK docs:
   - https://coda.io/packs/build/latest/

---

## Version Notes

**Version 12 (Current)** - November 2024
- ✅ Fixed PeopleTeam to show all 6 people
- ✅ Updated all tables with 4 real accounts
- ✅ Added instructions for hiding pack logo column
- ✅ Added grouping/filtering guidance

**Version 11** - November 2024
- Added comprehensive View Templates with detailed instructions

**Version 10** - November 2024
- Updated to 4 real account names (Gard AS, Wates Group, CSL Seqirus, Birkenstock)

---

**Pack ID:** 46088
**Current Version:** 12
**Last Updated:** November 2024
