# 🎯 Customer Success Intelligence Platform - Coda Template Doc Specification

## Template Overview

**Template Name:** Customer Success Intelligence Platform  
**Version:** 1.0  
**Purpose:** Complete CSM workspace with pre-configured tables, relationships, views, and sample data  
**Setup Time:** 0 minutes (just copy the template!)

---

## 📄 Page Structure (7 Pages)

### **Page 1: 🏠 Home & Quick Start**

#### Layout:
```
┌─────────────────────────────────────────────────────────────┐
│  🎯 Customer Success Intelligence Platform                  │
│                                                              │
│  Welcome! This workspace helps you manage customer health,  │
│  track strategic objectives, monitor platform metrics, and  │
│  drive successful outcomes.                                 │
│                                                              │
│  📊 Quick Stats (Live Metrics)                              │
│  ┌──────────┬──────────┬──────────┬──────────┐            │
│  │ Accounts │ Total ARR│ At Risk  │ QBRs Due │            │
│  │    3     │  $2.4M   │    1     │    2     │            │
│  └──────────┴──────────┴──────────┴──────────┘            │
│                                                              │
│  🚀 Quick Actions                                           │
│  [📝 Log Engagement] [✅ Create Task] [📊 Generate QBR]    │
│  [🧹 Clear Sample Data]                                     │
│                                                              │
│  📚 Getting Started                                         │
│  1. Explore the sample data (3 pilot accounts)             │
│  2. Navigate through the 7 pages to see all features       │
│  3. When ready, click "Clear Sample Data" button           │
│  4. Start adding your own accounts and data                │
│                                                              │
│  📖 Documentation                                           │
│  • How to use this template                                │
│  • Table relationships explained                           │
│  • Formula reference guide                                 │
│  • Video tutorials                                         │
└─────────────────────────────────────────────────────────────┘
```

#### Tables on Page 1:
- **Quick_Start_Guide** (Table view, 8 steps)
- **View_Templates** (Table view, 5 templates)

#### Buttons on Page 1:
1. **Clear Sample Data** - Deletes all sample rows from all tables
2. **Log Engagement** - Quick engagement entry form
3. **Create Task** - Quick task creation
4. **Generate QBR** - Generate QBR brief for selected account

---

### **Page 2: 👥 Team & Accounts**

#### Section 1: Team Roster
**Table:** People_Team (Table view)
- **Columns Shown:** Full Name, Email, Role, Department, Region, Active Status
- **Sort:** Department, then Role
- **Filter:** Active Status = true
- **Group By:** Department

#### Section 2: Account Portfolio
**Table:** Account_Master (Card view - "CSM Command Center")
- **Layout:** Cards grouped by Risk Level
- **Card Display:**
  - Header: Account Name
  - Subtitle: Industry | Contract Type
  - Badge: Risk Level (color-coded)
  - Large Number: Health Score / 100
  - Metrics: Days to Renewal, ARR
  - Text: Last Engagement Date
  - Footer: CSM name
- **Actions:** View Details, Log Engagement, Add Task
- **Sort:** Risk Level DESC, ARR DESC
- **Color Rules:**
  - Critical = Red background
  - At Risk = Yellow background
  - Healthy = Green background
  - Excellent = Blue background

#### Section 3: Business Context
**Table:** Business_Context (Table view)
- **Columns Shown:** Account (lookup), Digital Maturity, Cloud Strategy, IT Complexity Score
- **Linked:** Account → Account_Master (Lookup column)

---

### **Page 3: 🎯 Strategy & Planning**

#### Section 1: Strategic Objectives Board
**Table:** Strategic_Objectives (Kanban view - "Strategic Alignment Board")
- **Columns (by Status):**
  1. Planning
  2. In Progress
  3. On Hold
  4. Completed
  5. Cancelled
- **Card Display:**
  - Title: Objective Name
  - Subtitle: Strategic Pillar
  - Badge: Relevance level
  - Progress Bar: Progress %
  - Text: Target Date
  - Text: Business Value (USD)
  - Icons: Linked Capabilities count, Linked Initiatives count
- **Filter:** Account = [dropdown selector]
- **Sort:** Business Value DESC
- **Linked Fields:**
  - account → Account_Master (Lookup)
  - linkedCapabilities → Platform_Capabilities (Lookup, multiple)
  - linkedValueStreams → Value_Streams (Lookup, multiple)
  - linkedInitiatives → Initiatives (Lookup, multiple)

#### Section 2: Platform Capabilities
**Table:** Platform_Capabilities (Table view)
- **Columns Shown:** Account (lookup), Capability Name, Domain, Current Maturity, Target Maturity, Maturity Gap, Gap Status, Priority, Implementation Status
- **Sort:** Priority, Gap Status
- **Filter:** Implementation Status ≠ "Completed"
- **Color Rules:**
  - Gap Status = "Critical" → Red row
  - Gap Status = "High" → Orange row
  - Gap Status = "Medium" → Yellow row
- **Linked Fields:**
  - account → Account_Master (Lookup)
  - linkedObjectives → Strategic_Objectives (Lookup, multiple)

#### Section 3: Value Streams
**Table:** Value_Streams (Table view)
- **Columns Shown:** Account (lookup), Value Stream Name, Business Process, Cycle Time Reduction %, Annual Cost Savings (USD), Total Business Value (USD), Cycle Time Progress
- **Sort:** Total Business Value DESC
- **Conditional Format:**
  - Cycle Time Progress = "Ahead" → Green
  - Cycle Time Progress = "On Track" → Blue
  - Cycle Time Progress = "Behind" → Red
- **Linked Fields:**
  - account → Account_Master (Lookup)
  - linkedObjectives → Strategic_Objectives (Lookup, multiple)

---

### **Page 4: 📊 Health & Metrics**

#### Section 1: Platform Health Dashboard (Summary Tiles)
**Tiles (formulas):**
1. **Overall Health Score** = Average(Account_Master.compositeHealthScore)
2. **Critical Metrics** = CountIf(Platform_Health_Metrics.healthStatus = "Critical")
3. **APIs in Production** = CountIf(API_Portfolio.environment = "Production")
4. **Open Risks** = CountIf(Risk_Register.status = "Open" AND riskLevel IN ["Critical", "High"])

#### Section 2: API Portfolio
**Table:** API_Portfolio (Table view)
- **Columns Shown:** Account (lookup), API Name, API Type, Environment, Monthly Transactions, SLA Compliance %, Uptime %, Business Criticality, Health Status
- **Sort:** Business Criticality DESC, Health Status ASC
- **Filter:** Environment = "Production"
- **Color Rules:**
  - Health Status = "Critical" → Red row
  - Health Status = "Warning" → Yellow row
  - Health Status = "Healthy" → Green row
- **Linked Fields:**
  - account → Account_Master (Lookup)
  - linkedValueStreams → Value_Streams (Lookup, multiple)

#### Section 3: Platform Health Metrics
**Table:** Platform_Health_Metrics (Table view)
- **Columns Shown:** Account (lookup), Metric Name, Category, Current Value, Target Value, Health Status, Last Measured
- **Sort:** Health Status ASC (Critical first)
- **Filter:** Health Status ≠ "Healthy"
- **Color Rules:**
  - Health Status = "Critical" → Red background
  - Health Status = "Warning" → Yellow background
- **Linked Fields:**
  - account → Account_Master (Lookup)
  - linkedCapability → Platform_Capabilities (Lookup)
  - linkedObjective → Strategic_Objectives (Lookup)

---

### **Page 5: 💼 Initiatives & ROI**

#### Section 1: Initiatives Portfolio
**Table:** Initiatives (Table view)
- **Columns Shown:** Account (lookup), Initiative Name, Type, Priority, Phase, Status, Investment (USD), Expected Annual Benefit (USD), 3-Year ROI %, Target Completion Date
- **Sort:** Priority, Status
- **Filter:** Status ≠ "Completed" AND Status ≠ "Cancelled"
- **Color Rules:**
  - Priority = "P0-Critical" → Red row
  - Priority = "P1-High" → Orange row
  - Status = "On Hold" → Gray background
- **Linked Fields:**
  - account → Account_Master (Lookup)
  - linkedObjectives → Strategic_Objectives (Lookup, multiple)
  - linkedCapabilities → Platform_Capabilities (Lookup, multiple)

#### Section 2: Stakeholder Outcomes
**Table:** Stakeholder_Outcomes (Table view)
- **Columns Shown:** Account (lookup), Stakeholder Name, Type, Outcome Statement, Baseline Value, Current Value, Target Value, Improvement %, Target Achievement %, Status
- **Sort:** Target Achievement % DESC
- **Filter:** Status ≠ "Achieved"
- **Conditional Format:**
  - Target Achievement ≥ 100% → Green
  - Target Achievement ≥ 75% → Blue
  - Target Achievement < 75% → Yellow
- **Linked Fields:**
  - account → Account_Master (Lookup)
  - linkedObjective → Strategic_Objectives (Lookup)
  - linkedValueStream → Value_Streams (Lookup)

---

### **Page 6: ⚠️ Risks & Tasks**

#### Section 1: Risk Register
**Table:** Risk_Register (Table view)
- **Columns Shown:** Account (lookup), Risk Title, Category, Risk Level, Risk Score, Potential Business Impact (USD), Mitigation Strategy, Status, Target Resolution Date
- **Sort:** Risk Level DESC, Risk Score DESC
- **Filter:** Status ≠ "Closed" AND Status ≠ "Mitigated"
- **Color Rules:**
  - Risk Level = "Critical" → Red row
  - Risk Level = "High" → Orange row
  - Risk Level = "Medium" → Yellow row
- **Linked Fields:**
  - account → Account_Master (Lookup)
  - affectedCapability → Platform_Capabilities (Lookup)
  - affectedAPIs → API_Portfolio (Lookup, multiple)
  - linkedObjectivesAtRisk → Strategic_Objectives (Lookup, multiple)
  - mitigationInitiative → Initiatives (Lookup)

#### Section 2: Activities & Tasks
**Table:** Activities_Tasks (Table view)
- **Columns Shown:** Account (lookup), Task Title, Type, Priority, Status, Assigned To (lookup), Due Date, Days Until Due
- **Sort:** Priority DESC, Due Date ASC
- **Filter:** Status ≠ "Completed" AND Status ≠ "Cancelled"
- **Color Rules:**
  - Days Until Due < 0 → Red row (overdue)
  - Days Until Due ≤ 3 → Yellow row (due soon)
  - Priority = "Critical" → Bold text
- **Linked Fields:**
  - account → Account_Master (Lookup)
  - assignedTo → People_Team (Lookup)
  - createdBy → People_Team (Lookup)
  - linkedEngagement → Engagement_Log (Lookup)
  - linkedInitiative → Initiatives (Lookup)
  - linkedRisk → Risk_Register (Lookup)

#### Section 3: Engagement Log
**Table:** Engagement_Log (Table view)
- **Columns Shown:** Account (lookup), Engagement Date, Type, Customer Seniority, Sentiment, Engagement Score, Cadence Status, Next Engagement Date
- **Sort:** Engagement Date DESC
- **Filter:** Last 90 days
- **Color Rules:**
  - Sentiment = "Very Concerned" → Red
  - Sentiment = "Concerned" → Orange
  - Sentiment = "Very Positive" → Green
- **Linked Fields:**
  - account → Account_Master (Lookup)

---

### **Page 7: 📈 Executive Dashboard**

#### Section 1: QBR Preparation View
**Multi-section report view for selected account**

**Account Selector:** Dropdown to select account

**Section 1: Account Overview (Cards)**
- Account Name, CSM, ARR
- Health Score (gauge)
- Days to Renewal
- Risk Level

**Section 2: Strategic Objectives Progress (Table)**
- Source: Strategic_Objectives filtered by selected account
- Columns: Objective Name, Pillar, Status, Progress %, Target Date
- Sort: Status ASC (At Risk first), Progress % ASC

**Section 3: Top 5 Health Metrics (Table)**
- Source: Platform_Health_Metrics filtered by selected account
- Filter: Business Criticality = "Mission-Critical" OR Health Status = "Critical"
- Limit: 5 rows
- Columns: Metric Name, Current vs Target, Health Status

**Section 4: Completed Initiatives (Table)**
- Source: Initiatives filtered by selected account AND Status = "Completed"
- Columns: Initiative Name, Completion Date, Investment, Realized Benefit, Actual ROI %

**Section 5: Value Realized (Table)**
- Source: Stakeholder_Outcomes filtered by selected account AND Status = "Achieved"
- Columns: Outcome Statement, Baseline → Current, Target Achievement %

**Section 6: Open Risks (Table)**
- Source: Risk_Register filtered by selected account AND Status IN ["Open", "In Progress"]
- Filter: Risk Level IN ["Critical", "High"]
- Columns: Risk Title, Risk Level, Mitigation Strategy, Owner

**Section 7: Proposed Next Phase (Table)**
- Source: Initiatives filtered by selected account AND Status = "Proposed"
- Filter: Priority IN ["P0-Critical", "P1-High"]
- Columns: Initiative Name, Investment, Expected Benefit, Payback Months

**Action Buttons:**
- [📊 Generate QBR Brief] - Creates formatted QBR summary
- [📤 Export to PDF] - (Phase 3)

#### Section 2: Renewal Risk Dashboard
**Table:** Account_Master (Table view)
- **Columns Shown:** Account Name, Industry, ARR, Days to Renewal, Health Score, Risk Level, CSM, Last Engagement Date, Next Engagement Date
- **Sort:** ARR DESC, Days to Renewal ASC
- **Filter:** Days to Renewal ≤ 365 AND Health Score < 75
- **Color Rules:**
  - Risk Level = "Critical" → Red row
  - Risk Level = "At Risk" → Yellow row
  - ARR > $500K → Bold text

**Summary Bar (formulas):**
- Total At-Risk ARR = SumIf(ARR WHERE Risk Level IN ["Critical", "At Risk"])
- # Critical Accounts = CountIf(Risk Level = "Critical")
- # At Risk Accounts = CountIf(Risk Level = "At Risk")
- Avg Health Score = Average(Health Score)

#### Section 3: Success Plans
**Table:** Success_Plan_Tracker (Table view)
- **Columns Shown:** Account (lookup), Plan Period, Plan Status, Overall Health Score, Renewal Risk Level, Expansion Opportunity (USD), Next QBR Date
- **Sort:** Next QBR Date ASC
- **Filter:** Plan Status = "Active"
- **Linked Fields:**
  - account → Account_Master (Lookup)
  - executiveSponsorMuleSoft → People_Team (Lookup)

---

## 🔗 Relationship Configuration

### **All Lookup Columns (Pre-configured):**

#### Account_Master:
- `customerSuccessManager` → People_Team.fullName
- `accountExecutive` → People_Team.fullName
- `solutionsArchitect` → People_Team.fullName
- `executiveSponsorMuleSoft` → People_Team.fullName

#### Business_Context:
- `account` → Account_Master.accountName

#### Strategic_Objectives:
- `account` → Account_Master.accountName
- `linkedCapabilities` → Platform_Capabilities.capabilityName (multiple)
- `linkedValueStreams` → Value_Streams.valueStreamName (multiple)
- `linkedInitiatives` → Initiatives.initiativeName (multiple)

#### Platform_Capabilities:
- `account` → Account_Master.accountName
- `linkedObjectives` → Strategic_Objectives.objectiveName (multiple)
- `supportingValueStreams` → Value_Streams.valueStreamName (multiple)

#### Value_Streams:
- `account` → Account_Master.accountName
- `linkedObjectives` → Strategic_Objectives.objectiveName (multiple)
- `enabledCapabilities` → Platform_Capabilities.capabilityName (multiple)

#### API_Portfolio:
- `account` → Account_Master.accountName
- `linkedValueStreams` → Value_Streams.valueStreamName (multiple)
- `linkedObjectives` → Strategic_Objectives.objectiveName (multiple)

#### Platform_Health_Metrics:
- `account` → Account_Master.accountName
- `linkedCapability` → Platform_Capabilities.capabilityName
- `linkedObjective` → Strategic_Objectives.objectiveName

#### Initiatives:
- `account` → Account_Master.accountName
- `linkedObjectives` → Strategic_Objectives.objectiveName (multiple)
- `linkedCapabilities` → Platform_Capabilities.capabilityName (multiple)
- `ownerMuleSoft` → People_Team.fullName

#### Risk_Register:
- `account` → Account_Master.accountName
- `affectedCapability` → Platform_Capabilities.capabilityName
- `affectedAPIs` → API_Portfolio.apiName (multiple)
- `affectedValueStreams` → Value_Streams.valueStreamName (multiple)
- `linkedObjectivesAtRisk` → Strategic_Objectives.objectiveName (multiple)
- `mitigationInitiative` → Initiatives.initiativeName
- `mitigationOwner` → People_Team.fullName

#### Stakeholder_Outcomes:
- `account` → Account_Master.accountName
- `linkedObjective` → Strategic_Objectives.objectiveName
- `linkedValueStream` → Value_Streams.valueStreamName
- `linkedAPIServices` → API_Portfolio.apiName (multiple)

#### Engagement_Log:
- `account` → Account_Master.accountName

#### Success_Plan_Tracker:
- `account` → Account_Master.accountName
- `executiveSponsorMuleSoft` → People_Team.fullName

#### Activities_Tasks:
- `account` → Account_Master.accountName
- `assignedTo` → People_Team.fullName
- `createdBy` → People_Team.fullName
- `linkedEngagement` → Engagement_Log.engagementId
- `linkedInitiative` → Initiatives.initiativeName
- `linkedRisk` → Risk_Register.riskTitle

---

## 🧮 Formula Columns (Pre-configured)

### Account_Master Table:
1. **daysToRenewal** = `[Renewal Date] - Today()`
2. **riskLevel** = 
   ```
   If([Health Score] < 60, "Critical",
     If([Health Score] < 75 AND [Days To Renewal] < 180, "At Risk",
       If([Days To Renewal] < 90, "At Risk",
         If([Health Score] >= 85, "Excellent", "Healthy"))))
   ```
3. **compositeHealthScore** = 
   ```
   ([Platform Health Score] * 0.3 + 
    [Business Value Realization Score] * 0.25 + 
    [Stakeholder Engagement Score] * 0.25 + 
    [Strategic Alignment Score] * 0.2)
   ```

### Platform_Capabilities Table:
1. **currentMaturityNumeric** = 
   ```
   Switch([Current Maturity],
     "Level 1", 1,
     "Level 2", 2,
     "Level 3", 3,
     "Level 4", 4,
     "Level 5", 5, 0)
   ```
2. **targetMaturityNumeric** = (same as above for Target Maturity)
3. **maturityGap** = `[Target Maturity Numeric] - [Current Maturity Numeric]`
4. **gapStatus** = 
   ```
   If([Maturity Gap] >= 3, "Critical",
     If([Maturity Gap] = 2, "High",
       If([Maturity Gap] = 1, "Medium",
         If([Maturity Gap] = 0, "None", "Low"))))
   ```

### Value_Streams Table:
1. **cycleTimeReductionPercent** = 
   ```
   If([Cycle Time Baseline Hours] > 0,
     (([Cycle Time Baseline Hours] - [Cycle Time Current Hours]) / 
      [Cycle Time Baseline Hours]) * 100, 0)
   ```
2. **cycleTimeProgress** = 
   ```
   If([Cycle Time Current Hours] <= [Cycle Time Target Hours], "Ahead",
     If([Cycle Time Reduction Percent] >= 50, "On Track", "Behind"))
   ```
3. **annualCostSavingsUsd** = 
   ```
   If([Cost Per Transaction Before USD] > 0 AND [Annual Transaction Volume] > 0,
     ([Cost Per Transaction Before USD] - [Cost Per Transaction After USD]) * 
     [Annual Transaction Volume], 0)
   ```
4. **totalBusinessValueUsd** = `[Annual Cost Savings USD] + [Revenue Impact USD]`

### API_Portfolio Table:
1. **annualTransactionVolume** = `[Monthly Transactions] * 12`
2. **slaCompliancePercent** = 
   ```
   If([Avg Response Time ms] > 0 AND [SLA Target ms] > 0,
     If([Avg Response Time ms] <= [SLA Target ms], 100,
       Max(0, 100 - (([Avg Response Time ms] - [SLA Target ms]) / 
                     [SLA Target ms]) * 100)), 0)
   ```
3. **businessCriticality** = 
   ```
   If([Uptime Percent] >= 99.9 OR [Revenue Attribution USD] > 1000000, "Mission Critical",
     If([Monthly Transactions] > 100000 OR [Consuming Applications] > 5, "High",
       If([Monthly Transactions] > 10000, "Medium", "Low")))
   ```
4. **healthStatus** = 
   ```
   If([Uptime Percent] < 99.5 OR [Error Rate Percent] > 1, "Critical",
     If([SLA Compliance Percent] < 95 OR [Error Rate Percent] > 0.5, "Warning", "Healthy"))
   ```

### Platform_Health_Metrics Table:
1. **healthStatus** = 
   ```
   If([Current Value] >= [Target Value] * 0.95, "Healthy",
     If([Current Value] >= [Threshold Warning], "Acceptable",
       If([Current Value] >= [Threshold Critical], "Warning", "Critical")))
   ```

### Initiatives Table:
1. **daysOverdue** = 
   ```
   If(IsBlank([Actual Completion Date]) AND [Target Completion Date] < Today(),
     Today() - [Target Completion Date], 0)
   ```
2. **expectedPaybackMonths** = 
   ```
   If([Expected Annual Benefit USD] > 0,
     [Investment Amount USD] / ([Expected Annual Benefit USD] / 12), 0)
   ```
3. **threeYearROIPercent** = 
   ```
   If([Investment Amount USD] > 0,
     ((([Expected Annual Benefit USD] * 3) - [Investment Amount USD]) / 
      [Investment Amount USD]) * 100, 0)
   ```
4. **actualROIPercent** = 
   ```
   If([Investment Amount USD] > 0 AND [Realized Annual Benefit USD] > 0,
     ((([Realized Annual Benefit USD] * 3) - [Investment Amount USD]) / 
      [Investment Amount USD]) * 100, 0)
   ```

### Risk_Register Table:
1. **riskScore** = `[Impact Score] * [Probability Score]`
2. **riskLevel** = 
   ```
   If([Risk Score] >= 20, "Critical",
     If([Risk Score] >= 12, "High",
       If([Risk Score] >= 6, "Medium", "Low")))
   ```

### Stakeholder_Outcomes Table:
1. **improvementPercent** = 
   ```
   If([Baseline Value] > 0,
     (([Current Value] - [Baseline Value]) / [Baseline Value]) * 100, 0)
   ```
2. **targetAchievementPercent** = 
   ```
   If([Target Value] != [Baseline Value],
     (([Current Value] - [Baseline Value]) / 
      ([Target Value] - [Baseline Value])) * 100, 100)
   ```
3. **status** = 
   ```
   If([Target Achievement Percent] >= 100, "Achieved",
     If([Target Achievement Percent] >= 75, "On Track", "Needs Attention"))
   ```

### Activities_Tasks Table:
1. **daysUntilDue** = `[Due Date] - Today()`

---

## 🔘 Action Buttons (Pre-configured)

### Button 1: Clear Sample Data
**Location:** Home page  
**Label:** 🧹 Clear Sample Data  
**Action:** 
```
DeleteRows(People_Team, People_Team.All())
DeleteRows(Account_Master, Account_Master.All())
DeleteRows(Business_Context, Business_Context.All())
DeleteRows(Strategic_Objectives, Strategic_Objectives.All())
DeleteRows(Platform_Capabilities, Platform_Capabilities.All())
DeleteRows(Value_Streams, Value_Streams.All())
DeleteRows(API_Portfolio, API_Portfolio.All())
DeleteRows(Platform_Health_Metrics, Platform_Health_Metrics.All())
DeleteRows(Initiatives, Initiatives.All())
DeleteRows(Risk_Register, Risk_Register.All())
DeleteRows(Stakeholder_Outcomes, Stakeholder_Outcomes.All())
DeleteRows(Engagement_Log, Engagement_Log.All())
DeleteRows(Success_Plan_Tracker, Success_Plan_Tracker.All())
DeleteRows(Activities_Tasks, Activities_Tasks.All())
```
**Confirmation:** "Are you sure? This will delete all sample data from all tables."

### Button 2: Log Engagement
**Location:** Home page, Team & Accounts page  
**Label:** 📝 Log Engagement  
**Action:** Opens modal form with fields:
- Account (dropdown from Account_Master)
- Engagement Date (date picker, default: Today())
- Engagement Type (dropdown)
- Customer Seniority (dropdown)
- Topics Discussed (text area)
- Sentiment (dropdown)
- Strategic Alignment Score (slider 1-10)
- Technical Health Score (slider 1-10)
- Relationship Depth Score (slider 1-10)
- Next Engagement Date (date picker)
- Notes (text area)

**Submit Action:** AddRow(Engagement_Log, {...fields})

### Button 3: Create Task
**Location:** Home page, Risks & Tasks page  
**Label:** ✅ Create Task  
**Action:** Opens modal form with fields:
- Account (dropdown from Account_Master)
- Task Title (text)
- Task Type (dropdown)
- Priority (dropdown)
- Assigned To (dropdown from People_Team)
- Due Date (date picker)
- Description (text area)

**Submit Action:** AddRow(Activities_Tasks, {...fields})

### Button 4: Generate QBR Brief
**Location:** Home page, Executive Dashboard  
**Label:** 📊 Generate QBR Brief  
**Action:** Creates formatted text summary:
```
"QBR Brief for " + [Selected Account]
"Generated: " + Today()
"CSM: " + [CSM Name]
"Health Score: " + [Health Score] + "/100"
"Risk Level: " + [Risk Level]
"Days to Renewal: " + [Days to Renewal]
"ARR: $" + [ARR]

"Strategic Objectives Progress:"
[List of objectives with status and progress %]

"Top Health Concerns:"
[List of critical metrics]

"Value Delivered:"
[List of achieved outcomes]

"Open Risks:"
[List of high/critical risks]

"Proposed Initiatives:"
[List of proposed initiatives with ROI]
```

---

## 📊 Sample Data (Pre-loaded)

### Account 1: Acme Financial Services
- **Industry:** Financial Services
- **Contract:** Premier Success
- **ARR:** $1,200,000
- **Health Score:** 65 (At Risk)
- **CSM:** Sarah Chen
- **Renewal Date:** 2026-05-31
- **3 Strategic Objectives**
- **5 Capabilities**
- **2 Value Streams**
- **5 APIs**
- **4 Health Metrics**
- **3 Initiatives**
- **2 Risks**
- **2 Stakeholder Outcomes**
- **3 Engagement Log entries**
- **1 Success Plan**
- **5 Tasks**

### Account 2: Nordic Logistics Group
- **Industry:** Maritime
- **Contract:** Signature Success
- **ARR:** $850,000
- **Health Score:** 78 (Healthy)
- **CSM:** James Rodriguez
- **Renewal Date:** 2025-01-14
- **5 Strategic Objectives**
- **7 Capabilities**
- **3 Value Streams**
- **5 APIs**
- **4 Health Metrics**
- **3 Initiatives**
- **2 Risks**
- **3 Stakeholder Outcomes**
- **4 Engagement Log entries**
- **1 Success Plan**
- **6 Tasks**

### Account 3: HealthTech Solutions
- **Industry:** Healthcare
- **Contract:** Standard
- **ARR:** $350,000
- **Health Score:** 82 (Healthy)
- **CSM:** Maria Garcia
- **Renewal Date:** 2025-12-31
- **3 Strategic Objectives**
- **4 Capabilities**
- **2 Value Streams**
- **5 APIs**
- **4 Health Metrics**
- **2 Initiatives**
- **2 Risks**
- **3 Stakeholder Outcomes**
- **3 Engagement Log entries**
- **1 Success Plan**
- **4 Tasks**

### Team Members (15 people):
- 5 CSMs
- 3 Account Executives
- 3 Solutions Engineers
- 2 Executive Sponsors
- 2 Support Engineers

---

## 🎨 Color Scheme & Styling

### Page Icons:
- 🏠 Home
- 👥 Team & Accounts
- 🎯 Strategy & Planning
- 📊 Health & Metrics
- 💼 Initiatives & ROI
- ⚠️ Risks & Tasks
- 📈 Executive Dashboard

### Color Rules:
- **Critical/Red:** #DC2626 (Red 600)
- **At Risk/Orange:** #EA580C (Orange 600)
- **Warning/Yellow:** #CA8A04 (Yellow 600)
- **Healthy/Green:** #16A34A (Green 600)
- **Excellent/Blue:** #2563EB (Blue 600)
- **Neutral/Gray:** #6B7280 (Gray 500)

---

## 📝 Documentation Sections (on Home page)

### Section 1: How to Use This Template
- Overview of the 7 pages
- Navigation guide
- Key features explanation

### Section 2: Table Relationships Explained
- Visual relationship diagram
- How lookups work
- How to add new relationships

### Section 3: Formula Reference Guide
- List of all calculated fields
- How to modify formulas
- Common formula patterns

### Section 4: Video Tutorials
- 5-minute overview walkthrough
- How to log engagements
- How to track initiatives
- How to prepare for QBRs
- How to clear and add your own data

---

## ✅ Template Checklist

When creating the template, ensure:

- [ ] All 16 tables created
- [ ] All lookup columns configured
- [ ] All formula columns added
- [ ] All 7 pages created
- [ ] All 5 views configured
- [ ] All 4 action buttons added
- [ ] Sample data loaded (3 accounts)
- [ ] Color rules applied
- [ ] Sort/filter/group settings configured
- [ ] Documentation sections written
- [ ] Clear Sample Data button tested
- [ ] All relationships working
- [ ] All formulas calculating correctly
- [ ] Template published to gallery

---

## 🚀 User Experience Flow

1. **User discovers template** in Coda Gallery
2. **User clicks "Use Template"** → Creates copy in their workspace
3. **User lands on Home page** → Sees welcome message and quick stats
4. **User explores sample data** → Navigates through 7 pages
5. **User understands the structure** → Sees how tables relate
6. **User clicks "Clear Sample Data"** → Removes all sample rows
7. **User adds their own data** → Starts with People_Team, then Account_Master
8. **User enjoys zero-setup experience** → Everything just works!

---

## 📦 Template Publishing

**Template Name:** Customer Success Intelligence Platform  
**Category:** Business Operations > Customer Success  
**Tags:** Customer Success, CSM, Account Management, Health Score, QBR, ROI Tracking  
**Short Description:** Complete CSM workspace with health tracking, strategic planning, and QBR preparation  
**Long Description:** A comprehensive Customer Success Management platform with 16 interconnected tables, 5 pre-configured views, automated health scoring, ROI tracking, and QBR preparation tools. Includes sample data for 3 pilot accounts. Perfect for CS teams managing B2B SaaS customers.

---

**This template provides the complete solution with ZERO setup required!** 🎉

