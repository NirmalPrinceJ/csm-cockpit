# MuleSoft CSM Intelligence Platform - Template Doc Guide

This guide shows you how to set up a complete Customer Success workspace using the MuleSoft CSM Intelligence Platform pack.

---

## 📋 Quick Start: 5-Minute Setup

### Step 1: Create Your Doc
1. Create a new Coda doc: "CSM Command Center - [Your Name]"
2. Add the **MuleSoft CSM Intelligence Platform** pack
3. Set up the 5 core pages (templates below)

### Step 2: Add Sample Data
All tables come with sample data. You can:
- **Keep it** to explore the platform
- **Clear rows** and add your real accounts
- **Edit sample data** to match your accounts

### Step 3: Customize Views
Follow the ViewTemplates table instructions to build the 5 core views.

---

## 📄 Recommended Page Structure

### Page 1: 🎯 Command Center (Home)
**Purpose**: Daily CSM dashboard - all accounts at a glance

**Tables to Add**:
1. **AccountMaster** table
   - Filter: None (show all accounts)
   - Group by: `customerSuccessManager`
   - Sort by: `healthScore` (ascending), `daysToRenewal` (ascending)
   - Hide columns: Contract dates, metadata fields
   - **Color rules**:
     - Health Score: <60 = Red, 60-79 = Yellow, 80+ = Green
     - Risk Level: High = Red, Medium = Yellow, Low = Green
     - Days to Renewal: <90 = Orange

2. **ActivitiesTasks** table (below accounts)
   - Filter: `status` = "Pending" OR "In Progress"
   - Sort by: `dueDate` (ascending)
   - Group by: `assignedTo`

**Key Metrics (add at top)**:
- Total ARR (sum of AccountMaster.arr)
- Avg Health Score
- Accounts at Risk (count where riskLevel = "High")
- Tasks Due This Week

---

### Page 2: 📊 Strategic Objectives
**Purpose**: Track customer strategic goals across all accounts

**Tables to Add**:
1. **StrategicObjectives** table
   - View style: **Kanban board**
   - Group by: `status` (creates swim lanes: Planning → In Progress → Completed)
   - Sort by: `progressPercent` (descending), `targetDate` (ascending)
   - Card display: Show `objectiveName`, `account`, `progressPercent`, `businessValue`
   - **Color rules**:
     - Status: Planning = Gray, In Progress = Blue, Completed = Green
     - Progress: <30% = Red, 30-69% = Yellow, 70%+ = Green

2. **Initiatives** table (linked view)
   - Filter: Show only active initiatives
   - Sort by: `priority`, `threeYearROIPercent` (descending)

**Tip**: Use Coda's "Filter by selection" to view objectives for a specific account.

---

### Page 3: 🏥 Health Dashboard
**Purpose**: Monitor account health, platform metrics, and risks

**Section 1: At-Risk Accounts**
- **AccountMaster** table
- Filter: `healthScore` < 80 OR `riskLevel` = "High"
- Sort by: `healthScore` (ascending)
- Show: Account, Health Score, Risk Level, ARR, CSM, Last Engagement

**Section 2: Platform Health**
- **PlatformHealthMetrics** table
- Filter: `healthStatus` = "Critical" OR "Acceptable"
- Group by: `account`
- Color: Red if below threshold

**Section 3: Active Risks**
- **RiskRegister** table
- Filter: `status` contains "Active"
- Sort by: `riskScore` (descending)
- Show: Risk Title, Account, Risk Level, Mitigation Strategy, Owner

**Add this formula at top**:
```
Accounts Needing Attention: [AccountMaster table].Filter(healthScore < 80).Count()
```

---

### Page 4: 📈 QBR Preparation
**Purpose**: Single-account deep dive for Quarterly Business Reviews

**Setup Instructions**:

1. **Add a page control at top**:
   - Create a dropdown: Select Account
   - Options: All values from AccountMaster.accountName
   - Name this control: `SelectedAccount`

2. **Add page-level filter**:
   - Apply to ALL tables on this page
   - Filter: `account` = `SelectedAccount` (the control above)

3. **Add these sections** (all auto-filtered by selected account):

   **A. Account Overview**
   - Display 1 row from **AccountMaster**
   - Show: All key metrics (ARR, Health Score, Renewal Date, etc.)

   **B. Business Context**
   - Display 1 row from **BusinessContext**
   - Show: Strategic priorities, digital maturity, key challenges

   **C. Strategic Progress**
   - **StrategicObjectives** table
   - Sort by: `businessValue` (descending)
   - Show progress bars for each objective

   **D. Initiatives & ROI**
   - **Initiatives** table
   - Show: Name, Status, Investment, 3-Yr ROI %, Expected Payback
   - Highlight initiatives with ROI > 500%

   **E. Value Delivered**
   - **ValueStreams** table
   - Show: Business Value, Cost Savings, Cycle Time Reduction
   - Total value at bottom

   **F. Recent Engagements**
   - **EngagementLog** table
   - Filter: Last 90 days (`engagementDate` > Today()-90)
   - Sort by: Date (descending)

   **G. Risks & Mitigation**
   - **RiskRegister** table
   - Filter: Active risks only
   - Show: Top 3 risks with mitigation status

   **H. Success Plan Summary**
   - **SuccessPlanTracker** table
   - Show: Current quarter plan
   - Display: Health Score, Renewal Risk, Expansion Opportunity

**Tip**: Use this page 2 weeks before each QBR. Update engagement notes and success plan.

---

### Page 5: 🔄 Renewal Pipeline
**Purpose**: Track upcoming renewals and expansion opportunities

**Tables to Add**:

1. **AccountMaster** table
   - Filter: `daysToRenewal` ≤ 180
   - Group by: `riskLevel` (High → Medium → Low)
   - Sort within groups: `daysToRenewal` (ascending - most urgent first)
   - Show columns:
     - Account Name
     - Days to Renewal
     - Renewal Date
     - ARR
     - Health Score
     - Risk Level
     - CSM
   - **Color coding**:
     - Days to Renewal: <60 = Red, 60-90 = Orange, 91-180 = Yellow

2. **Add calculated columns**:
   ```
   Renewal Quarter:
   If(daysToRenewal <= 90, "This Quarter",
      If(daysToRenewal <= 180, "Next Quarter", "Future"))

   Renewal Status:
   If(healthScore >= 80 AND riskLevel = "Low", "✅ On Track",
      If(healthScore >= 60, "⚠️ Needs Attention", "🚨 At Risk"))
   ```

3. **SuccessPlanTracker** (linked data)
   - Join to AccountMaster
   - Show: Renewal Risk Level, Expansion Opportunity

**Add metrics at top**:
- Total ARR at Risk (sum where riskLevel = "High")
- Renewal Count by Quarter
- Expansion Pipeline (sum of expansionOpportunity)

---

## 🎨 Template Customization Tips

### 1. Add Team-Specific Views
- **By Region**: Filter/group accounts by geography
- **By Industry**: Group by industryVertical
- **By Product**: Filter based on MuleSoft capabilities used

### 2. Create Custom Dashboards
Example: Executive Dashboard
- Total ARR across all accounts
- Average Health Score trend
- Top 5 At-Risk Accounts
- Quarterly renewal pipeline value
- Active initiatives count

### 3. Set Up Automations
- **Weekly email**: Send at-risk accounts report every Monday
- **Renewal alerts**: Notify CSM when daysToRenewal < 60
- **Task reminders**: Alert assignee 3 days before task due date

### 4. Use Coda Formulas
```
// Account Health Summary
AccountMaster.Filter(healthScore < 60).Count() + " critical accounts"

// This Week's Renewals
AccountMaster.Filter(daysToRenewal <= 7).Format()

// Engagement Cadence Status
If(Today() - lastEngagementDate > engagementCadenceTargetDays,
   "⚠️ Overdue", "✅ On Track")
```

---

## 📊 Sample Data Overview

The pack includes 3 sample accounts to help you get started:

### Account 1: Acme Financial Services
- Industry: Financial Services / Investment Banking
- ARR: $1.2M
- Health Score: 82
- Use case: High-value enterprise customer with complex integration needs

### Account 2: Nordic Logistics Group
- Industry: Transportation & Logistics
- ARR: $850K
- Health Score: 88
- Use case: Mid-market customer with strong platform adoption

### Account 3: HealthTech Solutions
- Industry: Healthcare / Hospital Networks
- ARR: $350K
- Health Score: 74
- Use case: Growing customer with moderate health, needs attention

**To clear sample data**: Select all rows in a table → right-click → Delete rows

---

## 🚀 Advanced Features

### 1. Cross-Table Lookups
Link related data across tables:
```
// In StrategicObjectives, show Initiative ROI
Initiatives.Filter(initiativeId = thisRow.linkedInitiatives).threeYearROIPercent
```

### 2. Use Pack Formulas
The pack includes helper formulas:
- `Risk_Level(healthScore, daysToRenewal)` - Calculate risk
- `Days_To_Renewal(renewalDate)` - Auto-calculate days
- `Composite_Health(...)` - Calculate overall health score
- `Engagement_Score(...)` - Score engagement quality

### 3. Create Buttons
Add action buttons to tables:
- "Log New Engagement" → Creates row in EngagementLog
- "Create Follow-up Task" → Adds task to ActivitiesTasks
- "Generate QBR Brief" → Creates summary document

---

## 📖 Using ViewTemplates Table

The **ViewTemplates** table provides step-by-step instructions for creating the 5 core views:

1. Insert the **ViewTemplates** table in your doc
2. Browse the 5 templates (VIEW-001 through VIEW-005)
3. Each row contains:
   - **Setup Instructions**: Step-by-step guide
   - **Filter Criteria**: What to filter
   - **Sort/Group Settings**: How to organize
   - **Color Rules**: Conditional formatting
   - **Columns to Show/Hide**: Which fields to display

4. Follow the instructions to recreate views in your doc

---

## 🎓 Training Resources

### For New Users
1. Start with **Page 1: Command Center** - get familiar with account data
2. Add your first real account (or edit sample data)
3. Create your first engagement log entry
4. Set up one task and assign it to yourself

### For CSMs
1. Set up all 5 pages
2. Import your account portfolio (replace sample data)
3. Customize health score thresholds for your team
4. Create weekly reports for your manager

### For CS Leadership
1. Use Command Center for team overview
2. Create executive dashboard with key metrics
3. Set up renewal pipeline tracking
4. Build QBR calendar with reminders

---

## 💡 Best Practices

### Data Entry
- ✅ Update account health scores weekly
- ✅ Log every customer engagement within 24 hours
- ✅ Review and update strategic objectives monthly
- ✅ Track all initiatives with expected ROI

### Maintenance
- 🔄 Weekly: Update health scores, engagement logs, tasks
- 🔄 Monthly: Review strategic objectives, update success plans
- 🔄 Quarterly: Conduct QBRs, assess risk levels
- 🔄 Annually: Archive completed initiatives, refresh sample data

### Collaboration
- 👥 Share Command Center with entire CS team
- 👥 Share QBR pages with Account Executives
- 👥 Share Health Dashboard with Solutions Architects
- 👥 Restrict access to sensitive financial data

---

## 🆘 Troubleshooting

**Q: Tables show no data**
- A: Click "Sync" button on each table to load sample data
- Or manually add your first row

**Q: Filters not working**
- A: Check that column names match exactly (case-sensitive)
- Verify date formats are correct

**Q: Can't find a table**
- A: Go to Insert → Add table → MuleSoft CSM Intelligence Platform
- Select the table you need from the pack

**Q: Want to customize fields**
- A: You can add custom columns to any table
- Pack columns can't be edited, but you can hide them

---

## 📞 Support

**Pack ID**: 46088
**Version**: 3
**Management URL**: https://coda.io/p/46088

For questions or feature requests:
- Review pack documentation
- Check Coda community forums
- Contact your Coda administrator

---

**Last Updated**: November 2024
**Template Version**: 1.0
