# CSM Intelligence Platform - Template Doc Builder

Since Coda doesn't allow programmatic template creation via API, you'll need to build the template doc manually once in Coda, then share it as a template. Here's the complete blueprint.

---

## 🎯 Template Doc Structure

**Doc Name**: "Customer Success Intelligence Platform - Template"

### Doc Settings:
- Enable Pack: Customer Success Intelligence Platform (Pack ID: 46088)
- Access: Template (anyone can copy)
- Featured: Yes

---

## 📄 Page 1: 🚀 Getting Started

### Content:

**Header Section:**
```
# Welcome to Your CSM Intelligence Platform

This workspace helps Customer Success teams track accounts, health, strategic objectives,
renewals, and business value in one centralized location.

## What's Inside:
✅ 5 Pre-configured Pages
✅ 16 Data Tables with Sample Data
✅ Pre-built Views and Filters
✅ Ready-to-use Dashboards

## Quick Start:
1. Review sample data in each table
2. Clear sample data: Select all rows → Delete
3. Import your real account data
4. Customize views for your team
5. Invite team members

📖 **Estimated setup time**: 5 minutes (just clear sample data and add yours!)
```

**Table 1: Quick Start Guide**
- Insert: QuickStartGuide table
- Purpose: Reference guide for customization
- Configuration: No filters, show all columns

**Table 2: View Templates**
- Insert: ViewTemplates table
- Purpose: Additional view configuration ideas
- Configuration: No filters, show featured columns only

---

## 📄 Page 2: 🎯 Command Center

**Purpose**: Daily CSM dashboard

**Header:**
```
# Command Center
Your daily view of all accounts, health scores, and active tasks.

**Key Metrics:**
```

**Add these formulas above tables:**
```coda
Total ARR: [AccountMaster].Sum([arr]).Format()
Average Health Score: [AccountMaster].Average([healthScore]).Round()
At-Risk Accounts: [AccountMaster].Filter([riskLevel]="High").Count()
Tasks Due This Week: [ActivitiesTasks].Filter([dueDate] <= Today()+7 AND [status] != "Completed").Count()
```

**Section 1: Account Overview**

**Table: AccountMaster**
- **Group by**: customerSuccessManager
- **Sort**:
  1. healthScore (ascending)
  2. daysToRenewal (ascending)
- **Columns to show** (in this order):
  1. accountName
  2. healthScore
  3. compositeHealthScore
  4. riskLevel
  5. arr
  6. daysToRenewal
  7. renewalDate
  8. customerSuccessManager
  9. lastEngagementDate
  10. nextEngagementDate
  11. engagementCadenceStatus
- **Hidden columns**: contractType, contractStartDate, contractEndDate, industrySubSector, spRating, customerAnnualRevenue, employeeCount, geography, primaryContactName, primaryContactEmail, primaryContactRole, createdDate, lastModified, accountExecutive, solutionsArchitect, executiveSponsorCustomer, executiveSponsorVendor
- **Conditional Formatting**:
  - healthScore < 60: Red background
  - healthScore 60-79: Yellow background
  - healthScore >= 80: Green background
  - riskLevel = "High": Red text
  - riskLevel = "Medium": Orange text
  - riskLevel = "Low": Green text
  - daysToRenewal < 90: Orange background

**Section 2: My Tasks**

**Table: ActivitiesTasks**
- **Filter**: status = "Pending" OR status = "In Progress"
- **Group by**: assignedTo
- **Sort**: dueDate (ascending)
- **Columns to show**:
  1. taskTitle
  2. account
  3. priority
  4. status
  5. dueDate
  6. daysUntilDue
  7. assignedTo
  8. linkedInitiative
- **Hidden columns**: taskId, taskDescription, taskType, createdBy, createdDate, completedDate, linkedEngagement, linkedRisk, notes
- **Conditional Formatting**:
  - daysUntilDue < 0: Red (overdue)
  - daysUntilDue < 3: Orange (due soon)
  - priority = "High": Bold text

---

## 📄 Page 3: 📊 Strategic Board

**Purpose**: Kanban view of strategic objectives

**Header:**
```
# Strategic Objectives Board
Track customer strategic goals and linked initiatives across all accounts.
```

**Section 1: Objectives Board**

**Table: StrategicObjectives**
- **Layout**: Board view (Kanban)
- **Group by**: status (creates swim lanes: Planning, In Progress, On Hold, Completed)
- **Sort within groups**:
  1. progressPercent (descending)
  2. targetDate (ascending)
- **Card display fields**:
  - Title: objectiveName
  - Subtitle: account
  - Field 1: progressPercent (as progress bar)
  - Field 2: businessValue
  - Field 3: targetDate
- **Card colors**: Based on status
  - Planning: Gray
  - In Progress: Blue
  - On Hold: Orange
  - Completed: Green
- **Additional card formatting**:
  - progressPercent < 30%: Red border
  - progressPercent 30-69%: Yellow border
  - progressPercent >= 70%: Green border

**Section 2: Active Initiatives**

**Table: Initiatives**
- **Filter**: status != "Completed"
- **Sort**:
  1. priority (P0, P1, P2)
  2. threeYearROIPercent (descending)
- **Columns to show**:
  1. initiativeName
  2. account
  3. priority
  4. status
  5. threeYearROIPercent
  6. expectedPaybackMonths
  7. investmentAmount
  8. targetCompletionDate
  9. ownerVendor
  10. ownerCustomer
- **Conditional Formatting**:
  - threeYearROIPercent > 500%: Green bold
  - priority = "P0": Red background
  - status = "At Risk": Orange background

---

## 📄 Page 4: 🏥 Health Dashboard

**Purpose**: Monitor at-risk accounts and platform health

**Header:**
```
# Health Dashboard
Weekly health review - accounts, metrics, and risks needing attention.
```

**Add formula at top:**
```coda
Critical Accounts: [AccountMaster].Filter([healthScore] < 60).Count()
```

**Section 1: At-Risk Accounts**

**Table: AccountMaster**
- **Filter**: healthScore < 80 OR riskLevel = "High"
- **Sort**: healthScore (ascending) - worst first
- **Columns to show**:
  1. accountName
  2. healthScore
  3. compositeHealthScore
  4. riskLevel
  5. arr
  6. customerSuccessManager
  7. lastEngagementDate
  8. platformHealthScore
  9. businessValueRealizationScore
  10. stakeholderEngagementScore
- **Conditional Formatting**: Same as Command Center

**Section 2: Platform Metrics Needing Attention**

**Table: PlatformHealthMetrics**
- **Filter**: healthStatus = "Critical" OR healthStatus = "Acceptable"
- **Group by**: account
- **Sort**: healthStatus (Critical first), then currentValue
- **Columns to show**:
  1. account
  2. metricName
  3. currentValue
  4. targetValue
  5. healthStatus
  6. unit
  7. lastMeasured
- **Conditional Formatting**:
  - healthStatus = "Critical": Red background
  - healthStatus = "Acceptable": Yellow background

**Section 3: Active Risks**

**Table: RiskRegister**
- **Filter**: status contains "Active"
- **Sort**: riskScore (descending) - highest risk first
- **Columns to show**:
  1. account
  2. riskTitle
  3. riskLevel
  4. riskScore
  5. mitigationStrategy
  6. mitigationOwner
  7. targetResolutionDate
  8. status
- **Conditional Formatting**:
  - riskLevel = "High": Red background
  - riskLevel = "Medium": Orange background

---

## 📄 Page 5: 📈 QBR Preparation

**Purpose**: Single-account deep dive

**Header:**
```
# QBR Preparation
Select an account below to view all related data for Quarterly Business Review prep.
```

**Control at Top:**
- **Type**: Dropdown
- **Name**: "Select Account"
- **Options**: AccountMaster.accountName (all values)
- **Default**: First account

**Page-Level Filter:**
- **Apply to**: All tables on this page
- **Filter**: account = [Select Account control]

**Section 1: Account Overview**

**Table: AccountMaster**
- Display: Card layout (1 row max)
- Show all key fields in card format

**Section 2: Business Context**

**Table: BusinessContext**
- Display: Card layout (1 row max)

**Section 3: Strategic Progress**

**Table: StrategicObjectives**
- Sort: businessValue (descending)
- Show: All columns with progress bars

**Section 4: Initiatives & ROI**

**Table: Initiatives**
- Filter: (already filtered by page filter)
- Sort: priority, threeYearROIPercent (descending)
- Highlight: ROI columns

**Section 5: Value Delivered**

**Table: ValueStreams**
- Show: totalBusinessValue, annualCostSavings, cycleTimeReductionPercent
- Add sum row at bottom

**Section 6: Recent Engagements (Last 90 Days)**

**Table: EngagementLog**
- Additional filter: engagementDate > Today()-90
- Sort: engagementDate (descending)

**Section 7: Active Risks**

**Table: RiskRegister**
- Additional filter: status contains "Active"
- Sort: riskScore (descending)

**Section 8: Success Plan**

**Table: SuccessPlanTracker**
- Show current quarter plan
- Display: Card layout

---

## 📄 Page 6: 🔄 Renewal Pipeline

**Purpose**: Track upcoming renewals

**Header:**
```
# Renewal Pipeline
Next 180 days of renewals, grouped by risk level.
```

**Add formulas at top:**
```coda
Total ARR at Risk: [AccountMaster].Filter([riskLevel]="High" AND [daysToRenewal] <= 180).Sum([arr]).Format()
Renewals This Quarter: [AccountMaster].Filter([daysToRenewal] <= 90).Count()
Renewal ARR This Quarter: [AccountMaster].Filter([daysToRenewal] <= 90).Sum([arr]).Format()
```

**Section 1: Renewal Pipeline**

**Table: AccountMaster**
- **Filter**: daysToRenewal <= 180
- **Group by**: riskLevel (order: High, Medium, Low)
- **Sort within groups**: daysToRenewal (ascending) - most urgent first
- **Columns to show**:
  1. accountName
  2. daysToRenewal
  3. renewalDate
  4. arr
  5. healthScore
  6. riskLevel
  7. customerSuccessManager
  8. lastEngagementDate
- **Add calculated column**: "Renewal Quarter"
  - Formula: `If([daysToRenewal] <= 90, "This Quarter", If([daysToRenewal] <= 180, "Next Quarter", "Future"))`
- **Conditional Formatting**:
  - daysToRenewal < 60: Red background
  - daysToRenewal 60-90: Orange background
  - daysToRenewal 91-180: Yellow background

**Section 2: Expansion Opportunities**

**Table: SuccessPlanTracker**
- **Filter**: renewalRiskLevel = "Low" AND expansionOpportunityUsd > 0
- **Sort**: expansionOpportunityUsd (descending)
- **Columns to show**:
  1. account
  2. overallHealthScore
  3. renewalRiskLevel
  4. expansionOpportunityUsd
  5. nextQBRDate

---

## 📄 Page 7: 📚 Data Tables (Reference)

**Purpose**: Data management for CS Ops

**Header:**
```
# Data Tables
Reference page for managing all data tables. Hide this page from main navigation if desired.
```

**Add all remaining tables with minimal configuration:**

1. **PeopleTeam** - Team roster
2. **BusinessContext** - Account business context
3. **PlatformCapabilities** - Capability maturity tracking
4. **APIPortfolio** - API catalog and health
5. **StakeholderOutcomes** - Outcome metrics
6. **EngagementLog** (full table, no filters)
7. **ValueStreams** (full table)
8. **PlatformHealthMetrics** (full table)
9. **RiskRegister** (full table)
10. **SuccessPlanTracker** (full table)

---

## 🎨 Doc-Level Settings

### Theme:
- Use Coda's "Professional" theme
- Primary color: Blue (#2D7FF9)
- Accent color: Green (#00C875) for positive metrics

### Navigation:
- Show pages in sidebar
- Pin: Command Center, Strategic Board, Health Dashboard
- Hide: Data Tables page (optional)

### Sharing:
- Template mode: ON
- Anyone with link can copy
- Featured template: Request from Coda

### Pack Settings:
- Auto-install: Customer Success Intelligence Platform
- Auto-sync: All tables on doc copy

---

## 📋 Template Publishing Checklist

Before sharing as template:

- [ ] All 7 pages created and configured
- [ ] All tables added with correct filters/sorts/groups
- [ ] Conditional formatting applied
- [ ] Sample data present in all tables
- [ ] Formulas working correctly
- [ ] Page-level filter working on QBR page
- [ ] Control (dropdown) working on QBR page
- [ ] Navigation configured
- [ ] Theme applied
- [ ] Template mode enabled
- [ ] Share link copied

---

## 🔗 How Users Will Use Template

1. User clicks your template link
2. Clicks "Use Template" button
3. Coda creates a copy with all pages/tables/configurations
4. Pack auto-installs
5. Tables auto-sync with sample data
6. User clears sample data and adds their accounts
7. Ready to use in 5 minutes!

---

## 📤 Export Instructions

Unfortunately, Coda doesn't support JSON export for templates. You must:

1. **Build manually in Coda** (use this document as blueprint)
2. **Enable template mode** (Doc settings → Make template)
3. **Share template link** (Get shareable link)
4. **Submit to Coda gallery** (optional - featured templates)

**Estimated build time**: 45-60 minutes to build perfect template once

---

## 🎓 Build Tips

1. **Build in order**: Pages 1-7 as listed
2. **Test each page**: Ensure filters/sorts work
3. **Use sample data**: Keep it for template users
4. **Add helpful text**: Section headers with instructions
5. **Set defaults**: Default groupings, sorts, filters
6. **Hide complexity**: Hide non-essential columns
7. **Make it beautiful**: Use colors, formatting, spacing

---

## Next Steps

1. Create a new Coda doc
2. Install the Customer Success Intelligence Platform pack
3. Follow this blueprint page by page
4. Enable template mode
5. Share with your team!

**Alternative**: I can provide you with detailed screenshots or a video walkthrough if needed.
