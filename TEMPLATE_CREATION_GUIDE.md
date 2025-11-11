# CSM Intelligence Platform - Custom Template Creation Guide

## Overview

This guide helps you create a custom Coda template for the CSM Intelligence Platform. You can create either:
1. **Complete Workspace Template** - Full platform with all 5 pages for multiple accounts
2. **Single Account Template** - Focused template for one account (like "Gard AS Executive Summary")

---

## Option 1: Complete Workspace Template (Recommended)

This creates a full CSM Intelligence Platform workspace with all pages and tables.

### Step 1: Create Base Document

1. Go to your Coda homepage (coda.io/docs)
2. Click **+ New doc** in upper-left
3. Name it: "CSM Intelligence Platform - Template Base"
4. This will be your template document

### Step 2: Install the CSM Intelligence Platform Pack

1. In the new doc, click **Insert** (top-right)
2. Search for "CSM Intelligence Platform" (Pack ID: 46088)
3. Click **Add to doc**
4. Pack is now available for use

### Step 3: Build the 5 Core Pages

Create these 5 pages following the detailed instructions from the ViewTemplates table:

#### Page 1: Executive Summary (Template)
```
Page Name: "[Account Name] - Executive Summary"
Purpose: Single-account executive dashboard
```

**Setup Instructions:**
1. Create new page: Click **+** at bottom of page list → Name it "Executive Summary"
2. Add page filter control at top: "Select Account" (will be filled per account)
3. Follow VIEW-001 setup instructions from pack's ViewTemplates table

**Sections to Add:**
- Section 1: Account Overview Card (canvas)
  - Insert canvas
  - Add formula: `=AccountMaster.Filter(accountName=[AccountName]).First()`
  - Display: accountName, arr, healthScore, daysToRenewal, riskLevel, customerSuccessManager

- Section 2: Strategic Objectives Table
  - Insert → CSM Intelligence Platform → StrategicObjectives
  - Filter: `account=[AccountName] AND status!='Completed'`
  - Sort: businessValueUsd DESC
  - Limit: Top 5 rows
  - Columns: objectiveName, strategicPillar, progressPercent, businessValueUsd, status, targetDate
  - Conditional format: progressPercent <30 red, 30-69 yellow, 70+ green

- Section 3: Health Metrics Tiles (canvas)
  - Create 2x2 grid of tiles showing:
    - Platform Health Score
    - Business Value Realization Score
    - Stakeholder Engagement Score
    - Strategic Alignment Score
  - Each tile shows gauge chart from AccountMaster

- Section 4: Key Initiatives Table
  - Insert → CSM Intelligence Platform → Initiatives
  - Filter: `account=[AccountName] AND status IN ('In Progress','Planning','At Risk')`
  - Sort: threeYearROIPercent DESC
  - Limit: Top 3
  - Columns: initiativeName, status, threeYearROIPercent, investmentAmountUsd, expectedAnnualBenefitUsd

- Section 5: Top Risks Table
  - Insert → CSM Intelligence Platform → RiskRegister
  - Filter: `account=[AccountName] AND status='Active'`
  - Sort: riskScore DESC
  - Limit: Top 3
  - Columns: riskTitle, riskLevel, riskScore, potentialBusinessImpactUsd, mitigationStrategy, mitigationOwner

- Section 6: Recent Engagements Table
  - Insert → CSM Intelligence Platform → EngagementLog
  - Filter: `account=[AccountName]`
  - Sort: engagementDate DESC
  - Limit: Top 3
  - Columns: engagementDate, engagementType, sentiment, attendeesCustomer, nextSteps

**Page Settings:**
- Add page-level filter variable: "AccountName" (text input)
- Set default to blank (user selects account when using template)

---

#### Page 2: CSM Command Center
```
Page Name: "🎯 My Command Center"
Purpose: Daily CSM portfolio dashboard
```

Follow VIEW-002 setup instructions:

**Sections:**
1. Account Portfolio table (AccountMaster)
   - Filter: `customerSuccessManager=[YourName]`
   - Group by: riskLevel
   - Sort: healthScore ASC, daysToRenewal ASC

2. Renewal Pipeline table (AccountMaster filtered)
   - Filter: `customerSuccessManager=[YourName] AND daysToRenewal <= 90`
   - Sort: daysToRenewal ASC

3. My Tasks table (ActivitiesTasks)
   - Filter: `assignedTo=[YourName] AND status IN ('Open','In Progress','Blocked')`
   - Group by: priority

4. Portfolio Risks table (RiskRegister)
   - Filter: Active risks for my accounts
   - Sort: riskScore DESC

**Page Settings:**
- Add page-level filter: "YourName" (person selector)

---

#### Page 3: Health Dashboard
```
Page Name: "🏥 Health Dashboard"
Purpose: Team-wide health monitoring
```

Follow VIEW-003 setup instructions:

**Sections:**
1. Health Summary Tiles (canvas at top)
   - Critical Accounts Count
   - At Risk Accounts Count
   - Active High Risks Count
   - Platform Alerts Count

2. At-Risk Accounts table (AccountMaster)
   - Filter: `healthScore < 80 OR riskLevel IN ('Critical', 'At Risk')`
   - Group by: riskLevel

3. Platform Health Metrics table (PlatformHealthMetrics)
   - Filter: `healthStatus IN ('Critical', 'Warning')`
   - Group by: metricCategory

4. Active Risks table (RiskRegister)
   - Filter: `status IN ('Active - Not Started', 'Active - In Progress') AND riskLevel IN ('High', 'Critical')`
   - Group by: riskLevel

---

#### Page 4: QBR Preparation View
```
Page Name: "[Account Name] - QBR [Quarter] [Year]"
Purpose: Quarterly business review prep
```

Follow VIEW-004 setup instructions:

**Sections:**
1. Account Executive Summary (canvas)
2. Strategic Objectives Progress (StrategicObjectives table)
3. Value Delivered & ROI (Initiatives table - completed only)
4. Platform Adoption & Health (PlatformCapabilities + PlatformHealthMetrics)
5. Stakeholder Engagement Summary (EngagementLog)
6. Risks & Mitigation Status (RiskRegister)
7. Next Quarter Success Plan (SuccessPlanTracker)

**Page Settings:**
- Add page-level filter: "AccountName", "QuarterYear"
- Add footer with: Prepared by, Preparation Date, QBR Date

---

#### Page 5: Renewal Risk Pipeline
```
Page Name: "💼 Renewal Pipeline - Next 180 Days"
Purpose: Renewal and expansion tracking
```

Follow VIEW-005 setup instructions:

**Sections:**
1. Pipeline Summary Tiles (canvas)
2. Main Renewal Pipeline table (AccountMaster)
   - Filter: `daysToRenewal <= 180`
   - Group by: riskLevel
3. At-Risk Renewals Detail (AccountMaster cards)
4. Expansion Opportunities (SuccessPlanTracker)
5. Renewal Timeline (canvas visual)
6. Renewal Risk Factors (RiskRegister)

**View Controls:**
- Dropdown: Filter by CSM
- Dropdown: Filter by Risk Level
- Dropdown: Time Window (30/60/90/180 days)

---

### Step 4: Add Quick Start Guide Page

1. Create page: "📚 Getting Started"
2. Insert → CSM Intelligence Platform → QuickStartGuide
3. This table contains 8 steps for users to follow
4. Place this as the first page in the template

---

### Step 5: Add Sample Data (Optional)

**Option A: Use Pack Sample Data**
- All sync tables come with 4 sample accounts pre-loaded:
  - Gard AS (Maritime, $850K ARR)
  - Wates Group (Construction, $99K ARR)
  - CSL Seqirus (Healthcare, $4.6M ARR)
  - Birkenstock (Retail, $750K ARR)

**Option B: Clear Sample Data**
- Delete all rows from each table
- Users will add their own accounts

**Recommendation:** Keep sample data in template so users can see structure and examples.

---

### Step 6: Configure Template Settings

1. Add a **Template Instructions** page (first page):

```markdown
# Welcome to CSM Intelligence Platform

This template provides a complete Customer Success Management workspace with:
- ✅ 5 pre-built pages (Executive Summary, Command Center, Health Dashboard, QBR Prep, Renewal Pipeline)
- ✅ 14 interconnected data tables
- ✅ Sample data for 4 accounts
- ✅ View templates with formulas and filters
- ✅ Conditional formatting rules

## Quick Start
1. Start with "Getting Started" page
2. Follow the 8-step QuickStartGuide
3. Customize pages for your needs
4. Clear sample data and add your accounts

## Pages Included
- 📚 Getting Started - Quick start guide
- 📊 [Account] Executive Summary - Single-account dashboard
- 🎯 My Command Center - Daily CSM workspace
- 🏥 Health Dashboard - Team health monitoring
- 📋 [Account] QBR Prep - Quarterly review preparation
- 💼 Renewal Pipeline - 180-day renewal tracking

## Support
- View Templates table: Detailed setup instructions for each page
- Pack documentation: Available in pack settings
```

2. Set page order:
   - Welcome/Instructions (first)
   - Getting Started
   - Executive Summary
   - Command Center
   - Health Dashboard
   - QBR Prep
   - Renewal Pipeline

---

### Step 7: Publish as Custom Template

1. Click three-dot menu (⋮) in upper-right corner
2. Select **Doc settings**
3. Click **Create a template**
4. Choose **Create a copy of this doc** (recommended - keeps your working doc)
5. Click **Publish** in upper-right
6. Choose visibility:
   - **Available to workspace** (recommended for team templates)
   - **Private** (only you can use it)
7. Set accessibility:
   - **Creating a new doc and adding to an existing doc** (default, recommended)
8. Add template metadata:
   - **Template name:** "CSM Intelligence Platform - Full Workspace"
   - **Description:** "Complete Customer Success Management workspace with 5 pages, 14 tables, sample data, and pre-configured views for account health tracking, QBR prep, and renewal pipeline management."
   - **Category:** "Customer Success"
   - **Tags:** "customer success, csm, account management, qbr, renewals, health score"
9. Click **Publish**

---

## Option 2: Single Account Template (Focused)

This creates a lightweight template for a single account (perfect for QBR decks or executive summaries).

### Step 1: Create Single-Account Document

1. Create new doc: "Account Executive Summary - Template"
2. Install CSM Intelligence Platform pack
3. Set page-level filter variable: "AccountName" (text input at top)

### Step 2: Build Single-Account Executive Summary

Follow the **Executive Summary** page setup from Option 1, Page 1 above.

This creates a single-page template with:
- Account overview card
- Strategic objectives (top 5)
- Health metrics tiles
- Key initiatives (top 3)
- Top risks (top 3)
- Recent engagements (last 3)

### Step 3: Make it Account-Specific

**Two approaches:**

**Approach A: Template with Variable (Reusable)**
- Keep `[AccountName]` variable at top
- Users select account from dropdown when using template
- All tables filter based on selected account
- Template can be duplicated for multiple accounts

**Approach B: Hard-coded Account (One-time use)**
- Replace `[AccountName]` with specific account like "Gard AS"
- All filters use hard-coded account name
- Template is specific to one account
- Good for creating QBR-specific templates

### Step 4: Add Instructions Section

At the top of the page, add:

```markdown
# [Account Name] - Executive Summary

**Instructions:**
1. Select account from dropdown at top
2. Review all 6 sections
3. Update health score if needed
4. Log recent engagements
5. Export as PDF for stakeholder sharing

**Last Updated:** [Auto-date formula]
**Prepared By:** [CSM Name]
```

### Step 5: Publish as Custom Template

Follow Step 7 from Option 1 above, but use:
- **Template name:** "CSM Account Executive Summary (Single Page)"
- **Description:** "Single-page executive summary for account health, objectives, initiatives, and risks. Perfect for QBRs and stakeholder updates."
- **Accessibility:** "Creating a new doc and adding to an existing doc"

---

## Using Your Custom Template

### Method 1: Creating a New Doc from Template

1. Go to Coda homepage (coda.io/docs)
2. Click **Use template** button (upper-right)
3. Find your template in "My workspace templates" section
4. Click template to create new doc from it

### Method 2: Adding Template to Existing Doc

1. Open existing doc
2. Click **Insert** (top-right)
3. Search for your template name
4. Drag and drop template into doc

### Method 3: Via Slash Command

1. In any doc, type `/` followed by template name
2. Example: `/CSM Intelligence Platform`
3. Press Enter to insert

---

## Template Maintenance

### Updating Your Template

1. Navigate to your workspace homepage
2. Hover over workspace name in left panel
3. Click three-dot menu (⋮)
4. Select **Manage templates**
5. Find your template and click **Edit**
6. Make changes
7. Click **Publish** to update

### Pinning Template for Team (Admin Only)

1. Go to **Manage templates**
2. Find your template
3. Click chevron icon (>) on right
4. Select **Pin template**
5. Template now appears in "Pinned by your admin" section for all workspace members

### Sharing Template Across Workspaces

Custom templates are workspace-specific. To share across workspaces:

1. **Option A:** Export doc and import to other workspace, then convert to template
2. **Option B:** Publish to Coda Gallery (requires Coda approval)
3. **Option C:** Share doc link with other workspace admins

---

## Best Practices

### Template Design

1. **Keep sample data** - Helps users understand structure
2. **Add instructions** - Create "Getting Started" or instructions page
3. **Use clear naming** - Descriptive page names like "[Account] - Executive Summary"
4. **Include formulas** - Pre-configure filters, sorts, and conditional formatting
5. **Document variables** - Clearly mark where users should input their data (e.g., [AccountName])

### Data Structure

1. **Use pack tables** - Don't create custom tables; use pack sync tables
2. **Leverage lookups** - Create lookup columns between tables for relationships
3. **Add calculated columns** - Pre-create helpful calculations (Days to Renewal, Risk Score, etc.)
4. **Set defaults** - Configure default filters and sorts

### Visual Design

1. **Use emojis sparingly** - Only in page titles (🎯, 📊, 🏥, 💼)
2. **Consistent colors** - Use same color scheme across all conditional formatting
3. **Group related content** - Use canvas sections and headers
4. **White space** - Don't overcrowd pages

### Testing

Before publishing:

1. **Test with sample data** - Verify all formulas work
2. **Check page filters** - Ensure account filtering works across all sections
3. **Verify lookups** - Make sure cross-table references work
4. **Test as new user** - Create doc from template as if you're a first-time user
5. **Check mobile view** - Verify template looks good on mobile devices

---

## Troubleshooting

### Issue: Template doesn't show in Insert panel

**Solution:** Template must be set to "Adding to an existing doc" or "Creating a new doc and adding to an existing doc" in publish settings.

### Issue: Tables are empty after creating doc from template

**Solution:** Pack sync tables sync on first load. Wait 10-15 seconds, then refresh page. Sample data should appear.

### Issue: Page filters not working

**Solution:** Check that:
1. Page-level filter variable is created (e.g., "AccountName")
2. All table filters reference the correct variable name
3. Variable type matches column type (text, date, etc.)

### Issue: Formulas showing errors

**Solution:**
1. Verify all pack tables are inserted (AccountMaster, StrategicObjectives, etc.)
2. Check column names match exactly (case-sensitive)
3. Ensure pack is up to date (latest version)

### Issue: Can't find custom template

**Solution:**
1. Verify template is published (not in Draft mode)
2. Check visibility settings (workspace vs private)
3. Refresh browser or clear cache

---

## Example Use Cases

### Use Case 1: QBR Deck for Gard AS

1. Create doc from "CSM Account Executive Summary" template
2. Name doc: "Gard AS - QBR Q4 2024"
3. Set account filter to "Gard AS"
4. Review and update all sections
5. Export as PDF
6. Share with stakeholders

### Use Case 2: Weekly Team Health Review

1. Create doc from "CSM Intelligence Platform - Full Workspace" template
2. Navigate to "Health Dashboard" page
3. Review at-risk accounts section
4. Discuss platform health metrics
5. Assign mitigation tasks from risk register

### Use Case 3: New Account Onboarding

1. Add "Executive Summary" template to existing workspace doc
2. Create new page for new account
3. Set account name in filter
4. All sections auto-populate with account data
5. Customize as needed for account

---

## Next Steps

1. **Create your template** using Option 1 or Option 2 above
2. **Test thoroughly** before publishing to workspace
3. **Train team** on how to use templates
4. **Iterate** based on user feedback
5. **Update regularly** as pack evolves

---

## Additional Resources

- **Pack Documentation:** See PHASE1_COMPLETE.md for pack details
- **View Templates:** ViewTemplates sync table in pack contains detailed setup instructions
- **Quick Start Guide:** QuickStartGuide sync table provides 8-step setup
- **Coda Help:** https://help.coda.io/en/articles/5120723-create-custom-templates
- **Pack Management:** https://coda.io/p/46088

---

**Created:** November 2024
**Pack Version:** 11
**Author:** CSM Intelligence Platform Team
