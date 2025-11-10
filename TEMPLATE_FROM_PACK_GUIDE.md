# 🚀 Create Template from Pack - 30 Minute Setup Guide

## Overview
Use the existing Coda Pack to create a fully-functional template doc with all relationships and views configured.

**Time Required:** 30-45 minutes  
**Result:** Shareable template with zero setup for end users

---

## 📋 Step-by-Step Instructions

### **Phase 1: Install Pack & Sync Tables (5 minutes)**

#### 1.1 Create New Doc
- Go to https://coda.io
- Click **+ New Doc**
- Name it: "Customer Success Intelligence Platform - Template"

#### 1.2 Install the Pack
- Type `/pack` or click Insert → Packs
- Search for Pack ID: **46088** or "Customer Success Intelligence Platform"
- Click **Install**

#### 1.3 Sync All 16 Tables
Create a new page called "📊 All Tables" and add all sync tables:

```
1. People_Team
2. Account_Master
3. Business_Context
4. Strategic_Objectives
5. Platform_Capabilities
6. Value_Streams
7. API_Portfolio
8. Platform_Health_Metrics
9. Initiatives
10. Risk_Register
11. Stakeholder_Outcomes
12. Engagement_Log
13. Success_Plan_Tracker
14. Activities_Tasks
15. View_Templates
16. Quick_Start_Guide
```

**How to sync each table:**
- Type `/sync` or Insert → Sync table
- Select the pack
- Choose the table name
- Click **Insert**
- Wait for sync to complete (sample data loads automatically!)

✅ **Result:** All 16 tables with sample data, SelectLists, and formulas working!

---

### **Phase 2: Create Relationships (15 minutes)**

Now convert string fields to Lookup columns to enable relationships.

#### 2.1 Account_Master Table

**Field: customerSuccessManager**
1. Click on the `customerSuccessManager` column header
2. Click **Column options** (three dots)
3. Select **Change column type** → **Lookup**
4. Choose table: `People_Team`
5. Display column: `fullName`
6. Click **Done**

**Repeat for:**
- `accountExecutive` → People_Team.fullName
- `solutionsArchitect` → People_Team.fullName
- `executiveSponsorMuleSoft` → People_Team.fullName

#### 2.2 Business_Context Table

**Field: account**
1. Click `account` column
2. Change to **Lookup**
3. Table: `Account_Master`
4. Display: `accountName`

#### 2.3 Strategic_Objectives Table

**Field: account**
- Change to Lookup → Account_Master.accountName

**Field: linkedCapabilities**
1. Click `linkedCapabilities` column
2. Change to **Lookup**
3. Table: `Platform_Capabilities`
4. Display: `capabilityName`
5. ✅ Enable **Allow multiple selections**

**Repeat for:**
- `linkedValueStreams` → Value_Streams.valueStreamName (multiple)
- `linkedInitiatives` → Initiatives.initiativeName (multiple)

#### 2.4 Platform_Capabilities Table

**Field: account**
- Change to Lookup → Account_Master.accountName

**Field: linkedObjectives**
- Change to Lookup → Strategic_Objectives.objectiveName (multiple)

**Field: supportingValueStreams**
- Change to Lookup → Value_Streams.valueStreamName (multiple)

#### 2.5 Value_Streams Table

**Field: account**
- Change to Lookup → Account_Master.accountName

**Field: linkedObjectives**
- Change to Lookup → Strategic_Objectives.objectiveName (multiple)

**Field: enabledCapabilities**
- Change to Lookup → Platform_Capabilities.capabilityName (multiple)

#### 2.6 API_Portfolio Table

**Field: account**
- Change to Lookup → Account_Master.accountName

**Field: linkedValueStreams**
- Change to Lookup → Value_Streams.valueStreamName (multiple)

**Field: linkedObjectives**
- Change to Lookup → Strategic_Objectives.objectiveName (multiple)

#### 2.7 Platform_Health_Metrics Table

**Field: account**
- Change to Lookup → Account_Master.accountName

**Field: linkedCapability**
- Change to Lookup → Platform_Capabilities.capabilityName

**Field: linkedObjective**
- Change to Lookup → Strategic_Objectives.objectiveName

#### 2.8 Initiatives Table

**Field: account**
- Change to Lookup → Account_Master.accountName

**Field: linkedObjectives**
- Change to Lookup → Strategic_Objectives.objectiveName (multiple)

**Field: linkedCapabilities**
- Change to Lookup → Platform_Capabilities.capabilityName (multiple)

**Field: ownerMuleSoft**
- Change to Lookup → People_Team.fullName

#### 2.9 Risk_Register Table

**Field: account**
- Change to Lookup → Account_Master.accountName

**Field: affectedCapability**
- Change to Lookup → Platform_Capabilities.capabilityName

**Field: affectedAPIs**
- Change to Lookup → API_Portfolio.apiName (multiple)

**Field: affectedValueStreams**
- Change to Lookup → Value_Streams.valueStreamName (multiple)

**Field: linkedObjectivesAtRisk**
- Change to Lookup → Strategic_Objectives.objectiveName (multiple)

**Field: mitigationInitiative**
- Change to Lookup → Initiatives.initiativeName

**Field: mitigationOwner**
- Change to Lookup → People_Team.fullName

#### 2.10 Stakeholder_Outcomes Table

**Field: account**
- Change to Lookup → Account_Master.accountName

**Field: linkedObjective**
- Change to Lookup → Strategic_Objectives.objectiveName

**Field: linkedValueStream**
- Change to Lookup → Value_Streams.valueStreamName

**Field: linkedAPIServices**
- Change to Lookup → API_Portfolio.apiName (multiple)

#### 2.11 Engagement_Log Table

**Field: account**
- Change to Lookup → Account_Master.accountName

#### 2.12 Success_Plan_Tracker Table

**Field: account**
- Change to Lookup → Account_Master.accountName

**Field: executiveSponsorMuleSoft**
- Change to Lookup → People_Team.fullName

#### 2.13 Activities_Tasks Table

**Field: account**
- Change to Lookup → Account_Master.accountName

**Field: assignedTo**
- Change to Lookup → People_Team.fullName

**Field: createdBy**
- Change to Lookup → People_Team.fullName

**Field: linkedEngagement**
- Change to Lookup → Engagement_Log.engagementId

**Field: linkedInitiative**
- Change to Lookup → Initiatives.initiativeName

**Field: linkedRisk**
- Change to Lookup → Risk_Register.riskTitle

✅ **Result:** All relationships working! Tables are now interconnected.

---

### **Phase 3: Create Pages & Views (20 minutes)**

#### Page 1: 🏠 Home & Quick Start

**Create the page:**
1. Click **+ Add page**
2. Name: "🏠 Home & Quick Start"
3. Add icon: 🏠

**Add content:**

**Section 1: Welcome Header**
```
# 🎯 Customer Success Intelligence Platform

Welcome! This workspace helps you manage customer health, track strategic 
objectives, monitor platform metrics, and drive successful outcomes.

**Quick Stats:** 3 Accounts | $2.4M Total ARR | 1 At Risk | 2 QBRs Due
```

**Section 2: Quick Actions**
Add these buttons (we'll configure later):
- 📝 Log Engagement
- ✅ Create Task
- 📊 Generate QBR Brief
- 🧹 Clear Sample Data

**Section 3: Getting Started**
```
## 📚 Getting Started

1. ✅ Explore the sample data (3 pilot accounts loaded)
2. ✅ Navigate through the 7 pages to see all features
3. ✅ All relationships are pre-configured
4. ✅ When ready, click "Clear Sample Data" button
5. ✅ Start adding your own accounts and data

## 📖 What's Included

- 16 interconnected tables with sample data
- 50+ dropdown fields (SelectLists) for consistent data entry
- 5 pre-configured views (Command Center, Kanban, Dashboards)
- Automated health scoring and ROI calculations
- Cross-table relationships already set up
```

**Section 4: Add Tables**
- Insert `Quick_Start_Guide` table (table view)
- Insert `View_Templates` table (table view)

---

#### Page 2: 👥 Team & Accounts

**Create the page:**
1. Click **+ Add page**
2. Name: "👥 Team & Accounts"
3. Add icon: 👥

**Section 1: Team Roster**
- Insert `People_Team` table
- View: Table
- Sort: Department, then Role
- Group by: Department
- Columns to show: Full Name, Email, Role, Department, Region, Active Status

**Section 2: Account Portfolio (CSM Command Center)**
- Insert `Account_Master` table
- View: **Card View**
- Group by: Risk Level
- Sort: Risk Level DESC, ARR DESC

**Configure Card Layout:**
1. Click **Display** → **Card layout**
2. Set:
   - **Title**: accountName
   - **Subtitle**: industryVertical + " | " + contractType
   - **Image**: (none)
   - **Body fields**: 
     - healthScore (show as progress bar)
     - arr (show as currency)
     - daysToRenewal (show as number)
     - lastEngagementDate
     - customerSuccessManager
   - **Badge**: riskLevel

**Add Color Rules:**
1. Click **Conditional formatting**
2. Add rules:
   - If `riskLevel` = "Critical" → Red background
   - If `riskLevel` = "At Risk" → Yellow background
   - If `riskLevel` = "Healthy" → Green background
   - If `riskLevel` = "Excellent" → Blue background

**Section 3: Business Context**
- Insert `Business_Context` table
- View: Table
- Columns: Account, Digital Maturity, Cloud Strategy, IT Complexity Score

---

#### Page 3: 🎯 Strategy & Planning

**Create the page:**
1. Click **+ Add page**
2. Name: "🎯 Strategy & Planning"
3. Add icon: 🎯

**Section 1: Strategic Objectives Board**
- Insert `Strategic_Objectives` table
- View: **Kanban / Board View**
- Group by: status
- Sort: businessValueUsd DESC

**Configure Kanban:**
1. Click **Display** → **Board layout**
2. Group by: `status`
3. Card shows:
   - Title: objectiveName
   - Subtitle: strategicPillar
   - Badge: muleSoftRelevance
   - Progress bar: progressPercent
   - Fields: targetDate, businessValueUsd

**Add Filter Control:**
- Add control: "Filter by Account" → Dropdown from Account_Master

**Section 2: Platform Capabilities**
- Insert `Platform_Capabilities` table
- View: Table
- Sort: Priority, Gap Status
- Filter: implementationStatus ≠ "Completed"
- Columns: Account, Capability Name, Domain, Current Maturity, Target Maturity, Maturity Gap, Gap Status, Priority

**Add Color Rules:**
- gapStatus = "Critical" → Red row
- gapStatus = "High" → Orange row
- gapStatus = "Medium" → Yellow row

**Section 3: Value Streams**
- Insert `Value_Streams` table
- View: Table
- Sort: totalBusinessValueUsd DESC
- Columns: Account, Value Stream Name, Cycle Time Reduction %, Annual Cost Savings, Total Business Value, Cycle Time Progress

---

#### Page 4: 📊 Health & Metrics

**Create the page:**
1. Click **+ Add page**
2. Name: "📊 Health & Metrics"
3. Add icon: 📊

**Section 1: Summary Tiles**
Add these formulas as text/number displays:

```
Overall Health Score: =Account_Master.compositeHealthScore.Average()
Critical Metrics: =Platform_Health_Metrics.Filter(healthStatus="Critical").Count()
APIs in Production: =API_Portfolio.Filter(environment="Production").Count()
Open High Risks: =Risk_Register.Filter(status="Open" AND riskLevel.IsInList(["Critical","High"])).Count()
```

**Section 2: API Portfolio**
- Insert `API_Portfolio` table
- View: Table
- Filter: environment = "Production"
- Sort: businessCriticality DESC, healthStatus ASC
- Columns: Account, API Name, Type, Environment, Monthly Transactions, SLA Compliance %, Uptime %, Business Criticality, Health Status

**Add Color Rules:**
- healthStatus = "Critical" → Red row
- healthStatus = "Warning" → Yellow row
- healthStatus = "Healthy" → Green row

**Section 3: Platform Health Metrics**
- Insert `Platform_Health_Metrics` table
- View: Table
- Sort: healthStatus ASC (Critical first)
- Filter: healthStatus ≠ "Healthy"
- Columns: Account, Metric Name, Category, Current Value, Target Value, Health Status, Last Measured

---

#### Page 5: 💼 Initiatives & ROI

**Create the page:**
1. Click **+ Add page**
2. Name: "💼 Initiatives & ROI"
3. Add icon: 💼

**Section 1: Initiatives Portfolio**
- Insert `Initiatives` table
- View: Table
- Filter: status NOT IN ["Completed", "Cancelled"]
- Sort: priority, status
- Columns: Account, Initiative Name, Type, Priority, Phase, Status, Investment, Expected Benefit, 3-Year ROI %, Target Completion

**Add Color Rules:**
- priority = "P0-Critical" → Red row
- priority = "P1-High" → Orange row
- status = "On Hold" → Gray background

**Section 2: Stakeholder Outcomes**
- Insert `Stakeholder_Outcomes` table
- View: Table
- Sort: targetAchievementPercent DESC
- Filter: status ≠ "Achieved"
- Columns: Account, Stakeholder Name, Type, Outcome Statement, Baseline, Current, Target, Improvement %, Target Achievement %, Status

---

#### Page 6: ⚠️ Risks & Tasks

**Create the page:**
1. Click **+ Add page**
2. Name: "⚠️ Risks & Tasks"
3. Add icon: ⚠️

**Section 1: Risk Register**
- Insert `Risk_Register` table
- View: Table
- Filter: status NOT IN ["Closed", "Mitigated"]
- Sort: riskLevel DESC, riskScore DESC
- Columns: Account, Risk Title, Category, Risk Level, Risk Score, Potential Impact, Mitigation Strategy, Status, Target Resolution

**Add Color Rules:**
- riskLevel = "Critical" → Red row
- riskLevel = "High" → Orange row
- riskLevel = "Medium" → Yellow row

**Section 2: Activities & Tasks**
- Insert `Activities_Tasks` table
- View: Table
- Filter: status NOT IN ["Completed", "Cancelled"]
- Sort: priority DESC, dueDate ASC
- Columns: Account, Task Title, Type, Priority, Status, Assigned To, Due Date, Days Until Due

**Add Color Rules:**
- daysUntilDue < 0 → Red row (overdue)
- daysUntilDue ≤ 3 → Yellow row (due soon)
- priority = "Critical" → Bold text

**Section 3: Engagement Log**
- Insert `Engagement_Log` table
- View: Table
- Sort: engagementDate DESC
- Filter: engagementDate >= Today()-90 (last 90 days)
- Columns: Account, Engagement Date, Type, Customer Seniority, Sentiment, Engagement Score, Cadence Status, Next Engagement

---

#### Page 7: 📈 Executive Dashboard

**Create the page:**
1. Click **+ Add page**
2. Name: "📈 Executive Dashboard"
3. Add icon: 📈

**Section 1: Renewal Risk Dashboard**
- Insert `Account_Master` table
- View: Table
- Filter: daysToRenewal ≤ 365 AND healthScore < 75
- Sort: arr DESC, daysToRenewal ASC
- Columns: Account Name, Industry, ARR, Days to Renewal, Health Score, Risk Level, CSM, Last Engagement, Next Engagement

**Add Color Rules:**
- riskLevel = "Critical" → Red row
- riskLevel = "At Risk" → Yellow row
- arr > 500000 → Bold text

**Add Summary Bar:**
```
Total At-Risk ARR: =Account_Master.Filter(riskLevel.IsInList(["Critical","At Risk"])).arr.Sum()
Critical Accounts: =Account_Master.Filter(riskLevel="Critical").Count()
At Risk Accounts: =Account_Master.Filter(riskLevel="At Risk").Count()
Avg Health Score: =Account_Master.healthScore.Average()
```

**Section 2: Success Plans**
- Insert `Success_Plan_Tracker` table
- View: Table
- Filter: planStatus = "Active"
- Sort: nextQBRDate ASC
- Columns: Account, Plan Period, Plan Status, Overall Health Score, Renewal Risk Level, Expansion Opportunity, Next QBR Date

---

### **Phase 4: Configure Buttons (10 minutes)**

#### Button 1: Clear Sample Data

**Location:** Home page

1. Type `/button` → Create button
2. Label: "🧹 Clear Sample Data"
3. Action: **Run actions**
4. Add these actions:

```
DeleteRows(People_Team, People_Team)
DeleteRows(Account_Master, Account_Master)
DeleteRows(Business_Context, Business_Context)
DeleteRows(Strategic_Objectives, Strategic_Objectives)
DeleteRows(Platform_Capabilities, Platform_Capabilities)
DeleteRows(Value_Streams, Value_Streams)
DeleteRows(API_Portfolio, API_Portfolio)
DeleteRows(Platform_Health_Metrics, Platform_Health_Metrics)
DeleteRows(Initiatives, Initiatives)
DeleteRows(Risk_Register, Risk_Register)
DeleteRows(Stakeholder_Outcomes, Stakeholder_Outcomes)
DeleteRows(Engagement_Log, Engagement_Log)
DeleteRows(Success_Plan_Tracker, Success_Plan_Tracker)
DeleteRows(Activities_Tasks, Activities_Tasks)
```

5. Confirmation: "Are you sure? This will delete all sample data."
6. Style: Red button

#### Button 2: Log Engagement

**Location:** Home page

1. Type `/button` → Create button
2. Label: "📝 Log Engagement"
3. Action: **Open modal**
4. Add form fields:
   - Account (Select from Account_Master)
   - Engagement Date (Date, default: Today())
   - Engagement Type (Select)
   - Customer Seniority (Select)
   - Topics Discussed (Text area)
   - Sentiment (Select)
   - Strategic Alignment Score (Number, 1-10)
   - Technical Health Score (Number, 1-10)
   - Relationship Depth Score (Number, 1-10)
   - Next Engagement Date (Date)
   - Notes (Text area)
5. Submit action: AddRow(Engagement_Log, {fields})

#### Button 3: Create Task

**Location:** Home page

1. Type `/button` → Create button
2. Label: "✅ Create Task"
3. Action: **Open modal**
4. Add form fields:
   - Account (Select from Account_Master)
   - Task Title (Text)
   - Task Type (Select)
   - Priority (Select)
   - Assigned To (Select from People_Team)
   - Due Date (Date)
   - Description (Text area)
5. Submit action: AddRow(Activities_Tasks, {fields})

#### Button 4: Generate QBR Brief

**Location:** Home page, Executive Dashboard

1. Type `/button` → Create button
2. Label: "📊 Generate QBR Brief"
3. Action: **Open modal**
4. Add control: Select Account
5. Display formatted text:

```
="QBR Brief for " + [Selected Account].accountName + 
"\nGenerated: " + Today().ToText() +
"\nCSM: " + [Selected Account].customerSuccessManager +
"\nHealth Score: " + [Selected Account].healthScore + "/100" +
"\nRisk Level: " + [Selected Account].riskLevel +
"\nDays to Renewal: " + [Selected Account].daysToRenewal +
"\nARR: $" + [Selected Account].arr.ToText() +
"\n\nStrategic Objectives Progress:\n" +
Strategic_Objectives.Filter(account=[Selected Account]).
  FormulaMap(objectiveName + " - " + status + " (" + progressPercent + "%)").Join("\n") +
"\n\nTop Health Concerns:\n" +
Platform_Health_Metrics.Filter(account=[Selected Account] AND healthStatus="Critical").
  FormulaMap(metricName + ": " + currentValue + " (Target: " + targetValue + ")").Join("\n") +
"\n\nValue Delivered:\n" +
Stakeholder_Outcomes.Filter(account=[Selected Account] AND status="Achieved").
  FormulaMap(outcomeStatement + " - " + targetAchievementPercent + "% achieved").Join("\n") +
"\n\nOpen Risks:\n" +
Risk_Register.Filter(account=[Selected Account] AND riskLevel.IsInList(["Critical","High"])).
  FormulaMap(riskTitle + " (" + riskLevel + ")").Join("\n") +
"\n\nProposed Initiatives:\n" +
Initiatives.Filter(account=[Selected Account] AND status="Proposed" AND priority.IsInList(["P0-Critical","P1-High"])).
  FormulaMap(initiativeName + " - ROI: " + threeYearROIPercent + "% | Payback: " + expectedPaybackMonths + " months").Join("\n")
```

---

### **Phase 5: Save as Template (2 minutes)**

#### 5.1 Configure Doc Settings
1. Click **⋮** (three dots) in top right
2. Select **Doc settings**
3. Set:
   - **Doc name**: Customer Success Intelligence Platform
   - **Description**: Complete CSM workspace with health tracking, strategic planning, and QBR preparation
   - **Category**: Business Operations

#### 5.2 Create Template
1. In Doc settings, click **Create a template**
2. Choose: **Create a copy** (keeps your working doc)
3. Template options:
   - ✅ Make template public
   - ✅ Allow copying
   - ✅ Show in gallery

#### 5.3 Get Shareable Link
1. Click **Share** button
2. Set: "Anyone with the link can view"
3. Copy link
4. Share with your team!

---

## ✅ Final Checklist

Before sharing your template, verify:

- [ ] All 16 tables synced with sample data
- [ ] All lookup relationships configured (40+ relationships)
- [ ] All 7 pages created with correct icons
- [ ] All 5 views configured (Card, Kanban, Tables, Dashboard)
- [ ] All 4 buttons working (Clear Data, Log Engagement, Create Task, Generate QBR)
- [ ] Color rules applied to all relevant tables
- [ ] Sort/filter/group settings configured
- [ ] Summary formulas working on Executive Dashboard
- [ ] Template saved and shareable link generated

---

## 🎉 You're Done!

**Your template is now ready!**

Users can:
1. Click your template link
2. Click "Copy doc"
3. Start using immediately with sample data
4. Click "Clear Sample Data" when ready
5. Add their own accounts

**Total setup time for end users: 0 minutes!** 🚀

---

## 📊 What Users Get

- ✅ 16 interconnected tables
- ✅ 50+ dropdown fields (SelectLists)
- ✅ 100+ sample records (3 pilot accounts)
- ✅ All relationships pre-configured
- ✅ 5 pre-built views
- ✅ 4 action buttons
- ✅ Automated calculations
- ✅ Color-coded dashboards
- ✅ Zero setup required!

---

## 🆘 Troubleshooting

**Issue:** Lookup columns not showing data
- **Fix:** Make sure the source table has data synced first

**Issue:** Formulas showing errors
- **Fix:** Re-sync the tables to refresh calculated fields

**Issue:** Button not working
- **Fix:** Check that all referenced tables exist and have correct names

**Issue:** Can't find the Pack
- **Fix:** Use Pack ID: 46088 to search directly

---

## 📚 Additional Resources

- Pack Documentation: See `README.md`
- Relationship Guide: See `RELATIONSHIPS_GUIDE.md`
- Formula Reference: See Pack formulas in Coda
- Video Tutorial: (Coming soon)

---

**Questions?** Check the Quick_Start_Guide table in the template for step-by-step instructions!

