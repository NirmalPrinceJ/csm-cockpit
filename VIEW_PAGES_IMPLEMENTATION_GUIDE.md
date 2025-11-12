# View Pages Implementation Guide
## Account Success Intelligence Platform

This guide provides step-by-step instructions for implementing all 5 view pages in your Coda document at https://coda.io/d/_dCN5m3nEzNl/Account-Success-Intelligence_sufmyQTQ

---

## Overview

You need to create 5 view pages:
1. ✅ **Executive Summary** - Single account dashboard
2. 🎯 **CSM Command Center** - Daily CSM portfolio
3. 🏥 **Health Dashboard** - Team health monitoring  
4. 📋 **QBR Preparation** - Quarterly review prep
5. 💼 **Renewal Pipeline** - 180-day renewal tracking

---

## Prerequisites

Before starting, ensure you have:
- [ ] All 12 tables created in Coda (Account_Master, Strategic_Objectives, etc.)
- [ ] CSM Intelligence Platform Pack installed (Pack ID: 46088)
- [ ] Sample data loaded for at least 1-3 accounts
- [ ] Access to edit the document

---

## PAGE 1: EXECUTIVE SUMMARY

### Setup Overview
- **Page Name:** `[Account Name] - Executive Summary`
- **Purpose:** Single-account executive dashboard
- **Time to Build:** 15-20 minutes
- **Sections:** 6 total

### Step-by-Step Implementation

#### Step 1.1: Create the Page
```
1. In left sidebar, click + at bottom of page list
2. Name page: "Executive Summary"
3. Add emoji to title: 📊
```

#### Step 1.2: Add Page Filter Control
```
1. At very top of page, type: /control
2. Select "Select list" control
3. Configure:
   - Name: AccountName
   - Options: Pull from Account_Master.accountName
   - Default: (Leave blank or select default account)
```

#### Step 1.3: Section 1 - Account Overview Card
```
1. Add heading: ## Account Overview
2. Insert canvas (type /canvas)
3. Inside canvas, add these elements:

   LEFT COLUMN:
   - Account Name: =AccountMaster.Filter(accountName=[AccountName]).First().accountName
   - Industry: =AccountMaster.Filter(accountName=[AccountName]).First().industryVertical
   - Industry Sub-Sector: =AccountMaster.Filter(accountName=[AccountName]).First().industrySubSector
   - ARR: =AccountMaster.Filter(accountName=[AccountName]).First().arr
   - Contract Type: =AccountMaster.Filter(accountName=[AccountName]).First().contractType
   - Renewal Date: =AccountMaster.Filter(accountName=[AccountName]).First().renewalDate
   - Days to Renewal: =AccountMaster.Filter(accountName=[AccountName]).First().daysToRenewal
   - Geography: =AccountMaster.Filter(accountName=[AccountName]).First().geography
   - Risk Level: =AccountMaster.Filter(accountName=[AccountName]).First().riskLevel
   - CSM: =AccountMaster.Filter(accountName=[AccountName]).First().customerSuccessManager
   
   RIGHT COLUMN (Health Gauges):
   - Overall Health: =AccountMaster.Filter(accountName=[AccountName]).First().healthScore
   - Platform Health: =AccountMaster.Filter(accountName=[AccountName]).First().platformHealthScore
   - Business Value: =AccountMaster.Filter(accountName=[AccountName]).First().businessValueRealizationScore
   - Stakeholder Engagement: =AccountMaster.Filter(accountName=[AccountName]).First().stakeholderEngagementScore
   - Strategic Alignment: =AccountMaster.Filter(accountName=[AccountName]).First().strategicAlignmentScore

4. Format canvas:
   - Background: Light gray (#F7FAFC)
   - Border radius: 8px
   - Padding: 20px
```

**Conditional Formatting for Overview Card:**
```
Days to Renewal:
  - If < 90: Red text (#E53E3E)
  - If 90-180: Yellow text (#D69E2E)
  - If > 180: Green text (#38A169)

Risk Level:
  - Critical: Red badge
  - At Risk: Orange badge
  - Healthy: Green badge

Health Score:
  - < 60: Red gauge
  - 60-79: Yellow gauge
  - 80+: Green gauge
```

#### Step 1.4: Section 2 - Strategic Objectives Table
```
1. Add heading: ## 🎯 Strategic Objectives - Top 5
2. Insert table: /table → Select from pack → StrategicObjectives
3. Configure table:
   
   FILTERS:
   - account = [AccountName]
   - status != 'Completed'
   
   SORT:
   - businessValueUsd: Descending
   - progressPercent: Ascending
   
   DISPLAY OPTIONS:
   - Layout: Table
   - Rows to show: First 5
   - Group by: None
   
   COLUMNS TO SHOW:
   1. objectiveName
   2. strategicPillar (show as badge)
   3. progressPercent (show as progress bar)
   4. businessValueUsd (currency format)
   5. status (show as badge)
   6. targetDate
   
   COLUMNS TO HIDE:
   - account (already filtered)
   - objectiveId
   - description
   - All linked fields
```

**Conditional Formatting for Objectives:**
```
progressPercent column:
  - < 30%: Red background (#FED7D7)
  - 30-69%: Yellow background (#FEFCBF)
  - 70%+: Green background (#C6F6D5)

status column:
  - Completed: Green badge
  - In Progress: Blue badge
  - At Risk: Red badge
  - On Hold: Gray badge

targetDate column:
  - If date < Today(): Red text (overdue)
```

#### Step 1.5: Section 3 - Health Metrics Tiles
```
1. Add heading: ## 📊 Health Metrics
2. Insert canvas
3. Create 2x2 grid layout:

   ROW 1:
   [Tile 1: Platform Health] [Tile 2: Business Value]
   
   ROW 2:
   [Tile 3: Stakeholder Engagement] [Tile 4: Strategic Alignment]

4. Each tile should have:
   - Title (14px, bold)
   - Gauge chart (large, colored)
   - Number below gauge (24px, bold)
   
5. Formulas:
   Tile 1: =AccountMaster.Filter(accountName=[AccountName]).First().platformHealthScore
   Tile 2: =AccountMaster.Filter(accountName=[AccountName]).First().businessValueRealizationScore
   Tile 3: =AccountMaster.Filter(accountName=[AccountName]).First().stakeholderEngagementScore
   Tile 4: =AccountMaster.Filter(accountName=[AccountName]).First().strategicAlignmentScore

6. Format each gauge:
   - Type: Radial gauge
   - Min: 0
   - Max: 100
   - Color rules:
     - < 60: Red (#E53E3E)
     - 60-79: Yellow (#D69E2E)
     - 80+: Green (#38A169)
```

#### Step 1.6: Section 4 - Key Initiatives Table
```
1. Add heading: ## 💰 Active Initiatives - Top 3
2. Insert table: /table → Select from pack → Initiatives
3. Configure:
   
   FILTERS:
   - account = [AccountName]
   - status IN ('In Progress', 'Planning', 'At Risk')
   
   SORT:
   - threeYearROIPercent: Descending
   - priority: Ascending
   
   DISPLAY:
   - Rows: First 3
   
   COLUMNS:
   1. initiativeName
   2. status (badge)
   3. threeYearROIPercent (%, bold)
   4. investmentAmountUsd (currency)
   5. expectedAnnualBenefitUsd (currency)
   6. targetCompletionDate
```

**Conditional Formatting for Initiatives:**
```
threeYearROIPercent:
  - > 300%: Green bold text
  - 200-299%: Green text
  - 100-199%: Yellow text
  - < 100%: Red text

status:
  - At Risk: Red badge
  - In Progress: Blue badge
  - Planning: Yellow badge

targetCompletionDate:
  - < 30 days from now: Orange text
```

#### Step 1.7: Section 5 - Top Risks Table
```
1. Add heading: ## ⚠️ Top Risks
2. Insert table: /table → Select from pack → RiskRegister
3. Configure:
   
   FILTERS:
   - account = [AccountName]
   - status = 'Active'
   
   SORT:
   - riskScore: Descending
   - potentialBusinessImpactUsd: Descending
   
   DISPLAY:
   - Rows: First 3
   
   COLUMNS:
   1. riskTitle
   2. riskLevel (badge with color)
   3. riskScore (number)
   4. potentialBusinessImpactUsd (currency)
   5. mitigationStrategy (truncate to 100 chars)
   6. mitigationOwner
```

**Conditional Formatting for Risks:**
```
Entire row:
  - If riskLevel = 'Critical': Red background
  - If riskLevel = 'High': Orange background

riskScore:
  - > 15: Red bold text
  - 10-15: Orange text
  - < 10: Yellow text
```

#### Step 1.8: Section 6 - Recent Engagements Table
```
1. Add heading: ## 🤝 Recent Engagements - Last 3
2. Insert table: /table → Select from pack → EngagementLog
3. Configure:
   
   FILTERS:
   - account = [AccountName]
   
   SORT:
   - engagementDate: Descending
   
   DISPLAY:
   - Rows: First 3
   
   COLUMNS:
   1. engagementDate
   2. engagementType (badge)
   3. sentiment (badge)
   4. attendeesCustomer (truncate)
   5. nextSteps (truncate to 150 chars)
```

**Conditional Formatting for Engagements:**
```
sentiment:
  - Very Positive: Dark green badge
  - Positive: Green badge
  - Neutral: Gray badge
  - Concerned: Orange badge
  - Very Concerned: Red badge

engagementType:
  - QBR: Purple badge
  - Executive Briefing: Gold badge
  - Workshop: Blue badge
```

#### Page 1 Complete! ✅

---

## PAGE 2: CSM COMMAND CENTER

### Setup Overview
- **Page Name:** `🎯 My Command Center`
- **Purpose:** Daily CSM portfolio dashboard
- **Time to Build:** 20-25 minutes
- **Sections:** 4 total

### Step-by-Step Implementation

#### Step 2.1: Create the Page
```
1. Create new page: "My Command Center"
2. Add emoji: 🎯
```

#### Step 2.2: Add Page Filter Control
```
1. At top, add control: /control → Person
2. Configure:
   - Name: YourName
   - Default: (Set to current user or leave for user selection)
```

#### Step 2.3: Section 1 - Account Portfolio Table
```
1. Add heading: ## 📊 My Account Portfolio
2. Insert AccountMaster table
3. Configure:
   
   FILTERS:
   - customerSuccessManager = [YourName]
   
   SORT:
   - healthScore: Ascending (worst first)
   - daysToRenewal: Ascending (most urgent first)
   
   GROUP BY:
   - riskLevel (creates Critical, At Risk, Healthy groups)
   
   COLUMNS:
   1. accountName (with link to Executive Summary page)
   2. healthScore (gauge + number)
   3. arr (currency, large format)
   4. daysToRenewal (number, bold)
   5. riskLevel (badge)
   6. renewalDate
   7. lastEngagementDate
   8. nextEngagementDate
   
   SUMMARY ROW (at bottom):
   - Total ARR: =Sum(arr)
   - Average Health: =Average(healthScore)
   - Account Count: =Count()
```

**Conditional Formatting:**
```
Entire row:
  - If healthScore < 60: Red background
  - If healthScore 60-79: Yellow background
  - If healthScore 80+: Green background

daysToRenewal:
  - < 90: Orange bold text
  
riskLevel badges:
  - Critical: Red
  - At Risk: Orange
  - Healthy: Green
```

#### Step 2.4: Section 2 - Renewal Pipeline (Next 90 Days)
```
1. Add heading: ## 💼 Renewal Pipeline - Next 90 Days
2. Insert AccountMaster table (new instance)
3. Configure:
   
   FILTERS:
   - customerSuccessManager = [YourName]
   - daysToRenewal <= 90
   
   SORT:
   - daysToRenewal: Ascending
   
   GROUP BY: None
   
   COLUMNS:
   1. accountName
   2. arr (currency)
   3. renewalDate
   4. daysToRenewal (bold, large)
   5. healthScore (gauge)
   6. riskLevel (badge)
   7. expansionOpportunityUsd (lookup from SuccessPlanTracker)
   
   SUMMARY ROW:
   - Total Renewal Value: =Sum(arr)
   - Total Expansion Opportunity: =Sum(expansionOpportunityUsd)
```

**Conditional Formatting:**
```
daysToRenewal:
  - < 30: Red background
  - 30-60: Orange background
  - 61-90: Yellow background

arr column:
  - Show as large bold currency
```

#### Step 2.5: Section 3 - My Tasks
```
1. Add heading: ## ✅ My Action Items
2. Insert ActivitiesTasks table
3. Configure:
   
   FILTERS:
   - assignedTo = [YourName]
   - status IN ('Open', 'In Progress', 'Blocked')
   
   SORT:
   - priority: Descending (Critical first)
   - dueDate: Ascending
   
   GROUP BY:
   - priority (creates groups: Critical, High, Medium, Low)
   
   COLUMNS:
   1. taskTitle
   2. account (lookup to AccountMaster with link)
   3. priority (badge)
   4. status (badge)
   5. dueDate
   6. daysUntilDue (calculated: =dueDate - Today())
   7. linkedInitiative
```

**Conditional Formatting:**
```
daysUntilDue:
  - < 0 (overdue): Red background, white text
  - 0-7: Orange background
  - 7-14: Yellow background

priority badges:
  - Critical: Red
  - High: Orange
  - Medium: Yellow
  - Low: Gray

status:
  - Blocked: Red badge with ⚠️ icon
```

#### Step 2.6: Section 4 - Portfolio Risks
```
1. Add heading: ## ⚠️ Active Risks Across My Portfolio
2. Insert RiskRegister table
3. Configure:
   
   FILTERS:
   - Filter to risks where account.customerSuccessManager = [YourName]
   - status IN ('Active - Not Started', 'Active - In Progress')
   
   SORT:
   - riskScore: Descending
   - potentialBusinessImpactUsd: Descending
   
   COLUMNS:
   1. riskTitle
   2. account (with link)
   3. riskLevel (badge)
   4. riskScore (bold)
   5. status (badge)
   6. mitigationOwner
   7. targetResolutionDate
   
   COUNT BADGE at top: "Active Risks: [count]"
```

**Conditional Formatting:**
```
Entire row:
  - If riskLevel = 'Critical': Red highlight
  - If riskLevel = 'High': Orange highlight

targetResolutionDate:
  - < 14 days: Orange text
```

#### Page 2 Complete! ✅

---

## PAGE 3: HEALTH DASHBOARD

### Setup Overview
- **Page Name:** `🏥 Health Dashboard`
- **Purpose:** Team-wide health monitoring
- **Time to Build:** 20-25 minutes
- **Sections:** 4 + header tiles

### Step-by-Step Implementation

#### Step 3.1: Create the Page
```
1. Create new page: "Health Dashboard"
2. Add emoji: 🏥
```

#### Step 3.2: Section 0 - Health Summary Tiles (Top)
```
1. Insert canvas at very top
2. Create 4 tiles in horizontal row:

   [Critical Accounts] [At Risk Accounts] [Active High Risks] [Platform Alerts]

3. Formulas for each tile:
   
   Tile 1 - Critical Accounts:
   =AccountMaster.Filter(healthScore < 60).Count()
   
   Tile 2 - At Risk Accounts:
   =AccountMaster.Filter(healthScore >= 60 AND healthScore < 80).Count()
   
   Tile 3 - Active High Risks:
   =RiskRegister.Filter(status.Contains('Active') AND riskLevel IN ['High', 'Critical']).Count()
   
   Tile 4 - Platform Alerts:
   =PlatformHealthMetrics.Filter(healthStatus = 'Critical').Count()

4. Format:
   - Large numbers (32px, bold)
   - Icons above each number
   - Color coding: Red, Yellow, Orange, Red
```

#### Step 3.3: Section 1 - At-Risk Accounts Table
```
1. Add heading: ## 🚨 At-Risk Accounts Requiring Attention
2. Insert AccountMaster table
3. Configure:
   
   FILTERS:
   - healthScore < 80 OR riskLevel IN ('Critical', 'At Risk')
   
   SORT:
   - healthScore: Ascending (worst first)
   - daysToRenewal: Ascending
   
   GROUP BY:
   - riskLevel (Critical → At Risk → Healthy)
   
   COLUMNS:
   1. accountName (link)
   2. healthScore (gauge + number)
   3. riskLevel (badge)
   4. daysToRenewal
   5. arr (currency)
   6. customerSuccessManager
   7. lastEngagementDate
   8. daysSinceLastTouch (calculated: =Today() - lastEngagementDate)
```

**Conditional Formatting:**
```
Entire row:
  - If healthScore < 60: Red background
  - If healthScore 60-79: Yellow background

daysSinceLastTouch:
  - > 30: Red text
  - 15-30: Yellow text
  - < 15: Green text
```

#### Step 3.4: Section 2 - Platform Health Metrics (Critical/Warning)
```
1. Add heading: ## 📊 Platform Health Metrics (Critical & Warning)
2. Insert PlatformHealthMetrics table
3. Configure:
   
   FILTERS:
   - healthStatus IN ('Critical', 'Warning')
   
   SORT:
   - healthStatus: Descending (Critical first)
   - metricCategory
   
   GROUP BY:
   - metricCategory (Performance, Reliability, Security, etc.)
   
   COLUMNS:
   1. metricName
   2. currentValue
   3. targetValue
   4. healthStatus (badge)
   5. trend (arrow icon: ↑↓→)
   6. lastMeasured
   7. accountName (lookup)
   8. gapPercent (calculated: =((targetValue - currentValue) / targetValue) * 100)
```

**Conditional Formatting:**
```
Entire row:
  - If healthStatus = 'Critical': Red background
  - If healthStatus = 'Warning': Orange background

trend:
  - Degrading (↓): Red
  - Stable (→): Yellow
  - Improving (↑): Green
```

#### Step 3.5: Section 3 - Active High/Critical Risks
```
1. Add heading: ## ⚠️ Active High/Critical Risks
2. Insert RiskRegister table
3. Configure:
   
   FILTERS:
   - status IN ('Active - Not Started', 'Active - In Progress')
   - riskLevel IN ('High', 'Critical')
   
   SORT:
   - riskLevel: Descending (Critical first)
   - riskScore: Descending
   
   GROUP BY:
   - riskLevel
   
   LIMIT: Top 10 by risk score
   
   COLUMNS:
   1. accountName (lookup with link)
   2. riskTitle
   3. riskCategory (badge)
   4. riskLevel (badge)
   5. impactScore (1-5)
   6. probabilityScore (1-5)
   7. mitigationStrategy (truncate)
   8. mitigationOwner
   9. targetResolutionDate
   10. status
   11. riskScore (calculated: =impactScore * probabilityScore)
```

**Conditional Formatting:**
```
Entire row:
  - If riskLevel = 'Critical': Red highlight
  - If riskLevel = 'High': Orange highlight

targetResolutionDate:
  - < 7 days: Red text
  - 7-14 days: Yellow text
  - Overdue: Dark red background

riskScore:
  - > 20: Dark red
  - 15-20: Red
  - 10-14: Orange
```

#### Page 3 Complete! ✅

---

## PAGE 4: QBR PREPARATION VIEW

### Setup Overview
- **Page Name:** `[Account Name] - QBR [Quarter] [Year]`
- **Purpose:** Comprehensive quarterly business review prep
- **Time to Build:** 30-35 minutes
- **Sections:** 7 + footer

### Step-by-Step Implementation

#### Step 4.1: Create the Page
```
1. Create new page: "QBR Preparation View"
2. Add emoji: 📋
```

#### Step 4.2: Add Page Filter Controls
```
1. At top, add two controls:
   
   Control 1:
   - Type: Select list
   - Name: AccountName
   - Options: From Account_Master.accountName
   
   Control 2:
   - Type: Text
   - Name: QuarterYear
   - Placeholder: "Q4 2024"
```

#### Step 4.3: Section 1 - Account Executive Summary Card
```
1. Add heading: ## Account Executive Summary
2. Insert canvas
3. Create two-column layout:
   
   LEFT COLUMN:
   - Account Name (large, bold)
   - Industry
   - ARR
   - Contract Type
   - Renewal Date
   - Days to Renewal
   - Geography
   
   RIGHT COLUMN:
   - 5 health gauge charts in vertical stack:
     - Overall Health
     - Platform Health
     - Business Value
     - Stakeholder Engagement
     - Strategic Alignment
   
   BOTTOM SECTION:
   - Business Context Summary (from BusinessContext table):
     - Digital Maturity
     - Cloud Strategy
     - Key Drivers
     - Current Challenges

4. All data pulled from:
   =AccountMaster.Filter(accountName=[AccountName]).First()
   =BusinessContext.Filter(account=[AccountName]).First()
```

#### Step 4.4: Section 2 - Strategic Objectives Progress
```
1. Add heading: ## 🎯 Strategic Objectives - [QuarterYear] Progress
2. Insert StrategicObjectives table
3. Configure:
   
   FILTERS:
   - account = [AccountName]
   - status != 'Cancelled'
   
   SORT:
   - strategicPillar
   - progressPercent: Descending
   
   GROUP BY:
   - strategicPillar (groups by Cost Reduction, Revenue Growth, etc.)
   
   COLUMNS:
   1. objectiveName
   2. businessDriver (badge)
   3. progressPercent (progress bar)
   4. targetDate
   5. status (badge)
   6. businessValueUsd (currency)
   7. successCriteria (wrap text)
   8. daysToTarget (calculated: =targetDate - Today())
   
   SUMMARY ROW:
   - Count by status
   - Total business value
```

**Conditional Formatting:**
```
progressPercent:
  - < 30%: Red
  - 30-69%: Yellow
  - 70%+: Green

status:
  - Completed: Green badge
  - In Progress: Blue badge
  - On Hold: Gray badge

targetDate:
  - Overdue: Red text
```

#### Step 4.5: Section 3 - Value Delivered & ROI
```
1. Add heading: ## 💰 Value Delivered - [QuarterYear] Achievements

2. First, add Summary Tiles canvas:
   [Total Investment] [Total Value Realized] [Average ROI] [Initiatives Completed]
   
   Formulas:
   - =SUM(Initiatives.Filter(account=[AccountName] AND status='Completed').investmentUsd)
   - =SUM(Initiatives.Filter(account=[AccountName] AND status='Completed').businessValueRealized)
   - =AVERAGE(Initiatives.Filter(account=[AccountName] AND status='Completed').actualROIPercent)
   - =COUNT(Initiatives.Filter(account=[AccountName] AND status='Completed'))

3. Insert Initiatives table below tiles:
   
   FILTERS:
   - account = [AccountName]
   - status = 'Completed'
   - completedDate >= [Quarter Start Date]
   
   SORT:
   - actualROIPercent: Descending
   - businessValueRealized: Descending
   
   COLUMNS:
   1. initiativeName
   2. businessDriver (badge)
   3. investmentUsd (currency)
   4. expectedBenefitsUsd (currency)
   5. businessValueRealized (currency, large bold)
   6. actualROIPercent (%, large bold)
   7. completedDate
   8. keyOutcomes (wrap text)
```

**Conditional Formatting:**
```
actualROIPercent:
  - > 300%: Dark green bold
  - 200-299%: Green
  - 100-199%: Yellow

businessValueRealized:
  - Green text, currency format
```

#### Step 4.6: Section 4 - Platform Adoption & Health
```
1. Add heading: ## 📊 Platform Health & Adoption Metrics

SUB-SECTION A: Platform Capabilities Maturity
2. Insert PlatformCapabilities table:
   
   FILTERS:
   - account = [AccountName]
   
   SORT:
   - capabilityDomain
   - currentMaturity
   
   GROUP BY:
   - capabilityDomain
   
   COLUMNS:
   1. capabilityName
   2. currentMaturity (badge: L1-L5)
   3. targetMaturity (badge)
   4. maturityGap (calculated)
   5. implementationStatus (badge)
   6. priority (badge)
   7. targetCompletionDate
   
   Conditional Format:
   - maturityGap > 1: Red
   - maturityGap = 1: Yellow
   - maturityGap = 0: Green

SUB-SECTION B: Platform Health Metrics
3. Insert PlatformHealthMetrics table:
   
   FILTERS:
   - account = [AccountName]
   - metricCategory IN ('Performance', 'Reliability', 'Adoption')
   
   SORT:
   - metricCategory
   - healthStatus: Descending (Critical first)
   
   COLUMNS:
   1. metricName
   2. currentValue
   3. targetValue
   4. healthStatus (badge)
   5. trend (arrow)
   6. metricCategory (badge)

4. Add tiles above metrics showing:
   - Count of Critical metrics
   - Count of Healthy metrics
   - Overall platform uptime %
```

#### Step 4.7: Section 5 - Stakeholder Engagement Summary
```
1. Add heading: ## 🤝 Stakeholder Engagement - [QuarterYear] Activity

2. Add Summary Tiles:
   [Total Engagements] [Avg Sentiment Score] [Next QBR Date]

3. Insert EngagementLog table:
   
   FILTERS:
   - account = [AccountName]
   - engagementDate >= [Quarter Start]
   - engagementDate <= [Quarter End]
   
   SORT:
   - engagementDate: Descending
   
   COLUMNS:
   1. engagementDate
   2. engagementType (badge)
   3. attendees
   4. sentiment (colored badge)
   5. keyTopicsDiscussed (wrap text)
   6. actionItems (wrap text)
   7. nextEngagementDate

4. Below table, add StakeholderOutcomes showing outcomes per stakeholder
```

**Conditional Formatting:**
```
sentiment:
  - Very Positive: Dark green badge
  - Positive: Green badge
  - Neutral: Yellow badge
  - Concerned: Orange badge
  - Very Concerned: Red badge

engagementType:
  - QBR: Purple badge
  - Executive Briefing: Gold badge
  - Workshop: Blue badge
```

#### Step 4.8: Section 6 - Risks & Mitigation Status
```
1. Add heading: ## ⚠️ Risks & Mitigation - Active Items
2. Insert RiskRegister table:
   
   FILTERS:
   - account = [AccountName]
   - status IN ('Active - Not Started', 'Active - In Progress', 'Mitigated')
   
   SORT:
   - riskLevel: Descending
   - status: Ascending
   
   GROUP BY:
   - riskCategory
   
   COLUMNS:
   1. riskTitle
   2. riskLevel (badge)
   3. riskCategory (badge)
   4. impactLevel (1-5)
   5. probabilityLevel (1-5)
   6. mitigationStrategy (wrap text)
   7. mitigationOwner
   8. status (badge)
   9. targetResolutionDate
```

**Conditional Formatting:**
```
Entire row:
  - If riskLevel = 'Critical': Red row
  - If riskLevel = 'High': Orange row
  - If riskLevel = 'Medium': Yellow row
```

#### Step 4.9: Section 7 - Next Quarter Success Plan
```
1. Add heading: ## 🎯 Success Plan - [Next Quarter] Priorities
2. Insert SuccessPlanTracker table (displayed as card, not table):
   
   FILTERS:
   - account = [AccountName]
   - planPeriod = [Next Quarter]
   
   DISPLAY FIELDS (as card):
   - planPeriod (heading)
   - objectives (bullet list)
   - keyInitiatives (bullet list)
   - successMetrics (bullet list)
   - renewalRiskLevel (badge)
   - expansionOpportunityUsd (currency, large)
   - expansionStrategy (wrap text)
   - csm

3. Add calculated fields below:
   - Health Score Trend: Last 3 quarters as sparkline
   - Engagement Cadence Status: On track/at risk
   - Recommended Actions: Based on current health and risks
```

#### Step 4.10: Page Footer
```
Add at bottom of page:

Prepared by: [CSM Name from AccountMaster]
Preparation Date: [Today()]
QBR Date: [Input field]
Next QBR: [Next Quarter Date]
Account Team: [CSM, AE, SA from AccountMaster]
```

#### Page 4 Complete! ✅

---

## PAGE 5: RENEWAL PIPELINE

### Setup Overview
- **Page Name:** `💼 Renewal Pipeline - Next 180 Days`
- **Purpose:** Renewal and expansion tracking
- **Time to Build:** 25-30 minutes
- **Sections:** 6 + controls

### Step-by-Step Implementation

#### Step 5.1: Create the Page
```
1. Create new page: "Renewal Pipeline"
2. Add emoji: 💼
```

#### Step 5.2: Executive Summary (One-Line)
```
At very top, add formula:
='Renewal Pipeline: ' +
  AccountMaster.Filter(daysToRenewal <= 180).Count() +
  ' accounts | $' +
  Format(AccountMaster.Filter(daysToRenewal <= 180).Sum(arr)/1000000, '0.0') +
  'M ARR | ' +
  AccountMaster.Filter(daysToRenewal <= 180 AND riskLevel IN ('Critical','At Risk')).Count() +
  ' at risk'

Output example: "Renewal Pipeline: 15 accounts | $8.5M ARR | 3 at risk"
```

#### Step 5.3: Section 0 - Pipeline Summary Tiles
```
1. Insert canvas at top
2. Create 5 tiles in horizontal row:

   [Total Renewal ARR] [At-Risk ARR] [Accounts Renewing] [Expansion Opp] [Avg Health]

3. Formulas:
   
   Tile 1: =AccountMaster.Filter(daysToRenewal <= 180).Sum(arr)
   Tile 2: =AccountMaster.Filter(daysToRenewal <= 180 AND riskLevel IN ('Critical','At Risk')).Sum(arr)
   Tile 3: =AccountMaster.Filter(daysToRenewal <= 180).Count()
   Tile 4: =SuccessPlanTracker.Filter(AccountMaster.Filter(daysToRenewal <= 180).accountName.Contains(account)).Sum(expansionOpportunityUsd)
   Tile 5: =AccountMaster.Filter(daysToRenewal <= 180).Average(healthScore)

4. Format:
   - Large currency/numbers
   - Color based on risk
```

#### Step 5.4: Section 1 - Main Renewal Pipeline Table
```
1. Add heading: ## 📋 Renewal Pipeline - All Accounts
2. Insert AccountMaster table:
   
   FILTERS:
   - daysToRenewal <= 180
   
   SORT:
   - riskLevel: Descending (Critical first)
   - daysToRenewal: Ascending
   
   GROUP BY:
   - riskLevel (collapsible groups)
   
   COLUMNS:
   1. accountName (link)
   2. daysToRenewal (number, bold, large)
   3. renewalDate
   4. arr (currency, large)
   5. healthScore (gauge + number)
   6. riskLevel (badge)
   7. customerSuccessManager
   8. nextQBRDate (lookup from SuccessPlanTracker)
   9. lastEngagementDate
   10. expansionOpportunityUsd (lookup from SuccessPlanTracker)
   11. activeRiskCount (calculated)
   12. renewalQuarter (calculated)
   13. daysSinceLastTouch (calculated)
   
   CALCULATED COLUMNS:
   renewalQuarter = If(daysToRenewal <= 90, 'Q' + Format(Today().AddDays(daysToRenewal).Quarter()), '')
   daysSinceLastTouch = Today() - lastEngagementDate
   activeRiskCount = RiskRegister.Filter(account=thisRow.accountName AND status.Contains('Active')).Count()
   
   SUMMARY ROW PER GROUP:
   - Total ARR in risk group
   - Account count
   - Average health score
```

**Conditional Formatting:**
```
daysToRenewal:
  - < 60: Red background
  - 60-90: Orange
  - 91-180: Yellow

Entire row:
  - If riskLevel = 'Critical' OR 'At Risk': Red highlight

healthScore:
  - < 60: Red text
  - 60-79: Yellow
  - 80+: Green

expansionOpportunityUsd:
  - > $500K: Green bold

daysSinceLastTouch:
  - > 30: Red flag icon
```

#### Step 5.5: Section 2 - At-Risk Renewals Detail (Cards)
```
1. Add heading: ## 🚨 At-Risk Renewals - Action Required
2. Insert AccountMaster table (display as cards):
   
   FILTERS:
   - daysToRenewal <= 180
   - riskLevel IN ('Critical', 'At Risk')
   
   SORT:
   - daysToRenewal: Ascending
   
   DISPLAY: Cards (not table)
   
   EACH CARD SHOWS:
   - Account Name (heading)
   - ARR | Health Score | Days to Renewal (subtitle)
   - Top 3 Risks (from RiskRegister)
   - Mitigation Actions
   - Next Engagement Date
   - CSM Name
   - Action buttons:
     - [Schedule QBR]
     - [Update Health]
     - [Log Engagement]
     - [View Account]
```

#### Step 5.6: Section 3 - Expansion Opportunities
```
1. Add heading: ## 💰 Expansion Opportunities
2. Insert SuccessPlanTracker table:
   
   FILTERS:
   - Filter to accounts with daysToRenewal <= 180
   - expansionOpportunityUsd > 0
   
   SORT:
   - expansionOpportunityUsd: Descending
   
   COLUMNS:
   1. account (link)
   2. expansionOpportunityUsd (currency, large bold)
   3. expansionStrategy (wrap text)
   4. expansionConfidenceLevel (%)
   5. renewalRiskLevel (badge)
   6. healthScore (lookup from AccountMaster)
   
   SUMMARY:
   - Total expansion pipeline value
```

**Conditional Formatting:**
```
expansionOpportunityUsd:
  - > $500K: Green highlight row

expansionConfidenceLevel:
  - > 70%: Green
  - 40-69%: Yellow
  - < 40%: Gray
```

#### Step 5.7: Section 4 - Renewal Timeline Visual
```
1. Add heading: ## 📅 Renewal Timeline - Next 6 Months
2. Insert canvas
3. Create horizontal bar chart:

   Month 1 (0-30d):  ████████ $2.5M (5 accounts)
   Month 2 (31-60d): ███████ $1.8M (3 accounts)
   Month 3 (61-90d): ██████ $1.2M (2 accounts)
   Month 4 (91-120d): ████ $800K (2 accounts)
   Month 5 (121-150d): ███ $600K (1 account)
   Month 6 (151-180d): ██ $400K (2 accounts)

4. Formulas for each bar:
   Month 1: =AccountMaster.Filter(daysToRenewal >= 0 AND daysToRenewal <= 30).Sum(arr)
   Month 2: =AccountMaster.Filter(daysToRenewal >= 31 AND daysToRenewal <= 60).Sum(arr)
   ... continue for 6 months

5. Format:
   - Horizontal bar chart
   - Color code by ARR at risk
   - Hover tooltips with account names
   - Click to filter main table by month
```

#### Step 5.8: Section 5 - Renewal Risk Factors
```
1. Add heading: ## ⚠️ Renewal Risk Factors - Risk Analysis
2. Insert RiskRegister table:
   
   FILTERS:
   - Filter to risks for accounts with renewals in next 180 days
   - status IN ('Active - Not Started', 'Active - In Progress')
   
   SORT:
   - riskLevel: Descending
   - potentialBusinessImpactUsd: Descending
   
   GROUP BY:
   - account
   
   LIMIT: Top 20 by impact
   
   COLUMNS:
   1. account (link)
   2. riskTitle
   3. riskLevel (badge)
   4. riskCategory
   5. impactLevel (1-5)
   6. mitigationStrategy (truncate)
   7. mitigationOwner
   8. targetResolutionDate
   9. status
   10. renewalDate (lookup from AccountMaster)
```

**Conditional Formatting:**
```
targetResolutionDate:
  - If > (renewal date - 30 days): Red flag (may not resolve before renewal)

Entire row:
  - If riskLevel = 'Critical' OR 'High': Red row
```

#### Step 5.9: View Controls (Sidebar or Top-Right)
```
Add sticky controls:

1. Dropdown: Filter by CSM
   Options: [All CSMs], Nirmal John, Prathamesh Pable, ...

2. Dropdown: Filter by Risk Level
   Options: [All], Critical, At Risk, Healthy

3. Dropdown: Time Window
   Options: 30 days, 60 days, 90 days, 180 days

4. Date Range: Renewal Date Range
   Start: [Date picker]
   End: [Date picker]

5. Toggle: Show Only At-Risk
   ON: Filter riskLevel IN ('Critical', 'At Risk')
   OFF: Show all
```

#### Step 5.10: Quick Actions Panel (Sidebar)
```
Add action buttons:

[Schedule All QBRs]
- For accounts without nextQBRDate

[Export to Sales]
- Create CSV for sales handoff

[Send Summary Email]
- Email summary to leadership

[Update All Health Scores]
- Batch update health scores
```

#### Page 5 Complete! ✅

---

## FINAL STEPS

### Step 1: Test All Pages
```
1. Insert sample data if not already present
2. Test each page with different accounts
3. Verify all formulas calculate correctly
4. Check conditional formatting displays properly
5. Test filters and controls
6. Verify cross-page links work
```

### Step 2: Apply Consistent Styling
```
1. Set color palette across all pages:
   - Critical/Red: #E53E3E
   - At Risk/Orange: #EA580C
   - Warning/Yellow: #CA8A04
   - Healthy/Green: #16A34A
   - Excellent/Blue: #2563EB
   - Neutral/Gray: #6B7280

2. Apply consistent:
   - Heading sizes (H1: 24px, H2: 18px)
   - Badge styles (rounded corners, colored backgrounds)
   - Table row heights (40px default)
   - Canvas padding (20px)
   - Section spacing (40px between sections)
```

### Step 3: Set Page Order
```
Recommended page order in left sidebar:
1. 🏠 Home & Quick Start (if you have it)
2. 📊 Executive Summary
3. 🎯 CSM Command Center
4. 🏥 Health Dashboard
5. 📋 QBR Preparation View
6. 💼 Renewal Pipeline
```

### Step 4: Add Navigation
```
Consider adding:
1. Top navigation bar with quick links between pages
2. "Back to Home" buttons on each page
3. Account switcher dropdown (for Executive Summary and QBR pages)
4. Breadcrumb navigation
```

### Step 5: Document & Share
```
1. Create a "Getting Started" page with:
   - Overview of all view pages
   - How to use each page
   - Tips and best practices
   - FAQ section

2. Share with team:
   - Add team members to doc
   - Set appropriate permissions
   - Provide training or walkthrough
```

---

## VERIFICATION CHECKLIST

Before considering view pages "complete," verify:

### Page 1: Executive Summary
- [ ] Account selector working
- [ ] All 6 sections present and populated
- [ ] Health gauges displaying correctly
- [ ] Conditional formatting applied
- [ ] Filters working correctly

### Page 2: CSM Command Center
- [ ] CSM filter working
- [ ] Account portfolio grouped by risk
- [ ] Renewal pipeline showing < 90 days
- [ ] Tasks filtered by assignee
- [ ] Portfolio risks displaying

### Page 3: Health Dashboard
- [ ] Summary tiles showing correct counts
- [ ] At-risk accounts table populated
- [ ] Platform metrics filtered to Critical/Warning
- [ ] Active risks table showing high/critical only
- [ ] Conditional formatting applied

### Page 4: QBR Preparation View
- [ ] Account and quarter filters working
- [ ] All 7 sections present
- [ ] Executive summary card complete
- [ ] Strategic objectives showing progress
- [ ] Value delivered section with ROI
- [ ] Platform health metrics displayed
- [ ] Stakeholder engagement summary
- [ ] Risks and mitigation visible
- [ ] Next quarter success plan present
- [ ] Footer with metadata

### Page 5: Renewal Pipeline
- [ ] Pipeline summary tiles calculated correctly
- [ ] Main renewal table showing all <180 days
- [ ] Grouped by risk level
- [ ] At-risk renewals shown as cards
- [ ] Expansion opportunities listed
- [ ] Renewal timeline visual present
- [ ] Risk factors table populated
- [ ] View controls functional
- [ ] Quick actions panel present

### Global
- [ ] All cross-table lookups working
- [ ] All formulas calculating without errors
- [ ] Consistent styling across pages
- [ ] Mobile responsive
- [ ] Page links functional
- [ ] Sample data present and realistic
- [ ] Documentation complete

---

## TROUBLESHOOTING

### Common Issues

**Issue: Formulas showing #ERROR**
- Solution: Verify table names are correct (case-sensitive)
- Check column names match schema exactly
- Ensure all referenced tables are inserted

**Issue: Filters not working**
- Solution: Check filter variable names match exactly
- Verify data types (text, date, number)
- Test with sample data

**Issue: Conditional formatting not applied**
- Solution: Re-apply rules following guide
- Check column types match rule types
- Verify threshold values are correct

**Issue: Tables empty**
- Solution: Sync tables may need refresh
- Click "Sync now" on each table
- Wait 10-15 seconds for data to load

**Issue: Performance slow**
- Solution: Reduce number of rows displayed
- Use "Show first X rows" limits
- Optimize filters to reduce data loaded

---

## TIMELINE ESTIMATE

- **Page 1 (Executive Summary):** 15-20 minutes
- **Page 2 (CSM Command Center):** 20-25 minutes
- **Page 3 (Health Dashboard):** 20-25 minutes
- **Page 4 (QBR Preparation):** 30-35 minutes
- **Page 5 (Renewal Pipeline):** 25-30 minutes
- **Testing & Refinement:** 30-45 minutes
- **Documentation:** 15-20 minutes

**TOTAL ESTIMATE: 2.5 - 3.5 hours**

---

## NEXT STEPS AFTER COMPLETION

1. **Train Team:**
   - Schedule walkthrough session
   - Create video tutorials
   - Provide written guides

2. **Gather Feedback:**
   - Use for 1-2 weeks
   - Collect user feedback
   - Make iterative improvements

3. **Customize:**
   - Add company-specific fields
   - Modify formulas as needed
   - Create custom views

4. **Scale:**
   - Migrate from sample data to real data
   - Expand to more accounts
   - Add integrations (Phase 2)

---

**You're ready to build! Start with Page 1 and work through systematically.** 🚀

**Questions or issues? Refer back to the VIEW_PAGES_FIGJAM_GUIDE.md for detailed specifications.**
