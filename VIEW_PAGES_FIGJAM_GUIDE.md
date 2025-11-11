# CSM Intelligence Platform - Complete View Pages Guide
## For Figjam / Design Handoff

---

# PAGE 1: EXECUTIVE SUMMARY

## Page Setup
- **Page Name:** `[Account Name] - Executive Summary`
- **Purpose:** Single-page executive dashboard
- **Audience:** Executives, CS Leadership, Account Teams
- **Page Filter:** Account = [Selected Account]

## Layout Structure (6 Sections)

### SECTION 1: Account Overview Card (Canvas)
**Position:** Top of page, full width

**Content:**
```
┌─────────────────────────────────────────────────────────┐
│  [ACCOUNT NAME - Large Heading]                         │
│                                                          │
│  Left Column:                    Right Column:          │
│  • Industry Vertical            • Health Score (Gauge)  │
│  • Industry Sub-Sector          • Platform Health       │
│  • ARR (Large $)                • Business Value        │
│  • Contract Type                • Stakeholder Engage    │
│  • Renewal Date                 • Strategic Alignment   │
│  • Days to Renewal (color)      [All as gauges 0-100]  │
│  • Geography                                            │
│  • Risk Level (Badge)                                   │
│  • CSM Name                                             │
└─────────────────────────────────────────────────────────┘
```

**Coda Formula:**
```
=AccountMaster.Filter(accountName=[Selected]).First()
```

**Conditional Formatting:**
- Days to Renewal: <90 red, 90-180 yellow, >180 green
- Risk Level: Critical/High=red badge, Medium=yellow, Low=green
- Health Score: <60=red, 60-79=yellow, 80+=green

---

### SECTION 2: Strategic Objectives (Table)
**Position:** Below account card

**Heading:** `🎯 Strategic Objectives - Top 5`

**Table:** StrategicObjectives

**Configuration:**
```
Filter: account=[Selected] AND status!='Completed'
Sort: businessValueUsd DESC, progressPercent ASC
Limit: Top 5 rows
Group: No grouping
```

**Columns to Show:**
1. objectiveName
2. strategicPillar (badge)
3. progressPercent (progress bar visual)
4. businessValueUsd (currency)
5. status (badge)
6. targetDate

**Hidden Columns:**
- account (filtered already)
- createdDate, lastModified
- Internal IDs

**Conditional Formatting:**
- progressPercent: <30% red background, 30-69% yellow, 70%+ green
- status: Completed=green, In Progress=blue, On Hold=gray
- targetDate: Overdue=red text

---

### SECTION 3: Health Metrics Tiles (Canvas)
**Position:** Below objectives, 2x2 grid

**Layout:**
```
┌──────────────┬──────────────┐
│   Platform   │   Business   │
│    Health    │     Value    │
│   [Gauge]    │   [Gauge]    │
│      80      │      75      │
└──────────────┴──────────────┘
┌──────────────┬──────────────┐
│ Stakeholder  │  Strategic   │
│  Engagement  │  Alignment   │
│   [Gauge]    │   [Gauge]    │
│      78      │      79      │
└──────────────┴──────────────┘
```

**Formulas:**
```
Tile 1: =AccountMaster.Filter(accountName=[Selected]).First().platformHealthScore
Tile 2: =AccountMaster.Filter(accountName=[Selected]).First().businessValueRealizationScore
Tile 3: =AccountMaster.Filter(accountName=[Selected]).First().stakeholderEngagementScore
Tile 4: =AccountMaster.Filter(accountName=[Selected]).First().strategicAlignmentScore
```

**Visual:** Large gauge charts with color coding (same as health score rules)

---

### SECTION 4: Key Initiatives (Table)
**Position:** Below health tiles

**Heading:** `💰 Active Initiatives - Top 3`

**Table:** Initiatives

**Configuration:**
```
Filter: account=[Selected] AND status IN ('In Progress','Planning','At Risk')
Sort: threeYearROIPercent DESC, priority ASC
Limit: Top 3 rows
```

**Columns to Show:**
1. initiativeName
2. status (badge)
3. threeYearROIPercent (%, bold)
4. investmentAmountUsd (currency)
5. expectedAnnualBenefitUsd (currency)
6. targetCompletionDate

**Conditional Formatting:**
- threeYearROIPercent: >300% green bold text
- status: At Risk=red badge
- targetCompletionDate: <30 days=orange

---

### SECTION 5: Top Risks (Table)
**Position:** Below initiatives

**Heading:** `⚠️ Top Risks`

**Table:** RiskRegister

**Configuration:**
```
Filter: account=[Selected] AND status='Active'
Sort: riskScore DESC, potentialBusinessImpactUsd DESC
Limit: Top 3 rows
```

**Columns to Show:**
1. riskTitle
2. riskLevel (badge with color)
3. riskScore (number)
4. potentialBusinessImpactUsd (currency)
5. mitigationStrategy (truncate to 100 chars)
6. mitigationOwner

**Conditional Formatting:**
- riskLevel: High/Critical = red row highlight
- riskScore: >7 = red text

---

### SECTION 6: Recent Engagements (Table)
**Position:** Bottom of page

**Heading:** `🤝 Recent Engagements - Last 3`

**Table:** EngagementLog

**Configuration:**
```
Filter: account=[Selected]
Sort: engagementDate DESC
Limit: Top 3 rows
```

**Columns to Show:**
1. engagementDate (date format)
2. engagementType (badge)
3. sentiment (emoji/badge)
4. attendeesCustomer (truncate)
5. nextSteps (truncate to 150 chars)

**Conditional Formatting:**
- sentiment: Very Positive=dark green, Positive=green, Neutral=gray, Negative=orange, Very Negative=red
- engagementType: QBR=purple, Executive Briefing=gold, Workshop=blue

---

## Page Color Scheme
- **Headers:** Dark blue background (#2C5282)
- **Risk indicators:** Red (#E53E3E), Yellow (#D69E2E), Green (#38A169)
- **Badges:** Rounded corners, colored backgrounds
- **Cards:** Light gray background (#F7FAFC), subtle shadow

---

# PAGE 2: CSM COMMAND CENTER

## Page Setup
- **Page Name:** `🎯 My Command Center`
- **Purpose:** Daily CSM portfolio dashboard
- **Audience:** Individual CSMs
- **Page Filter:** customerSuccessManager = [Your Name]

## Layout Structure (4 Sections)

### SECTION 1: Account Portfolio (Table)
**Position:** Top of page

**Heading:** `📊 My Account Portfolio`

**Table:** AccountMaster

**Configuration:**
```
Filter: customerSuccessManager=[Your Name]
Sort: healthScore ASC (at-risk first), daysToRenewal ASC
Group by: riskLevel (High/Medium/Low groups)
```

**Columns to Show:**
1. accountName (with link)
2. healthScore (gauge + number)
3. arr (currency, large format)
4. daysToRenewal (number, bold)
5. riskLevel (badge with color)
6. renewalDate
7. lastEngagementDate (date)
8. nextEngagementDate (date)

**Conditional Formatting:**
- healthScore: <60 red background, 60-79 yellow, 80+ green background
- daysToRenewal: <90 orange text
- riskLevel: High=red badge, Medium=yellow, Low=green

**Summary Row:**
- Total ARR
- Average Health Score
- Count of accounts

---

### SECTION 2: Renewal Pipeline - Next 90 Days (Table)
**Position:** Below portfolio

**Heading:** `💼 Renewal Pipeline - Next 90 Days`

**Table:** AccountMaster (filtered view)

**Configuration:**
```
Filter: customerSuccessManager=[Your Name] AND daysToRenewal <= 90
Sort: daysToRenewal ASC (most urgent first)
Group: No grouping
```

**Columns to Show:**
1. accountName
2. arr (currency)
3. renewalDate
4. daysToRenewal (bold, large)
5. healthScore (gauge)
6. riskLevel (badge)
7. expansionOpportunityUsd (via lookup to SuccessPlanTracker)

**Conditional Formatting:**
- daysToRenewal: <30 red, 30-60 orange, 61-90 yellow
- arr: Show as large currency for visual impact

**Summary Row:**
- Total renewal value at risk
- Total expansion opportunity

---

### SECTION 3: My Tasks (Table)
**Position:** Below renewal pipeline

**Heading:** `✅ My Action Items`

**Table:** ActivitiesTasks

**Configuration:**
```
Filter: assignedTo=[Your Name] AND status IN ('Open','In Progress','Blocked')
Sort: priority (Critical→Low), dueDate ASC
Group by: priority
```

**Columns to Show:**
1. taskTitle
2. account (lookup to AccountMaster with link)
3. priority (badge)
4. status (badge)
5. dueDate
6. daysUntilDue (calculated column)
7. linkedInitiative

**Calculated Column:**
```
daysUntilDue = dueDate - Today()
```

**Conditional Formatting:**
- daysUntilDue: <0 (overdue) red background, 0-7 orange, 7-14 yellow
- priority: Critical=red badge, High=orange, Medium=yellow
- status: Blocked=red badge with icon

**Quick Action Buttons:**
- Mark Complete
- Reschedule
- Escalate

---

### SECTION 4: Portfolio Risks (Table)
**Position:** Bottom of page

**Heading:** `⚠️ Active Risks Across My Portfolio`

**Table:** RiskRegister

**Configuration:**
```
Filter: Get all accounts where customerSuccessManager=[Your Name],
        then show risks where status='Active'
Formula: =RiskRegister.Filter(
  AccountMaster.Filter(customerSuccessManager=[Your Name])
    .accountName.Contains(account)
  AND status IN ('Active - Not Started','Active - In Progress')
)
Sort: riskScore DESC, potentialBusinessImpactUsd DESC
```

**Columns to Show:**
1. riskTitle
2. account (with link)
3. riskLevel (badge)
4. riskScore (number, bold)
5. status (badge)
6. mitigationOwner
7. targetResolutionDate

**Conditional Formatting:**
- riskLevel: High/Critical = red row highlight
- targetResolutionDate: <14 days = orange text

**Count Badge:** Show total active risks in portfolio

---

## Page Refresh Cadence
- Check **multiple times daily**
- Sort by urgency each morning
- Update after customer interactions

---

# PAGE 3: HEALTH DASHBOARD

## Page Setup
- **Page Name:** `🏥 Health Dashboard`
- **Purpose:** Team-wide health monitoring - at-risk accounts
- **Audience:** CSMs, CS Leadership, Solutions Architects, Support Engineers
- **Page Filter:** None (show all at-risk accounts)

## Layout Structure (4 Sections + Header Tiles)

### SECTION 0: Health Summary Tiles (Canvas - Top)
**Position:** Very top of page, horizontal row

**Layout:**
```
┌────────┬────────┬────────┬────────┐
│Critical│At Risk │ Active │Platform│
│Accounts│Accounts│  High  │ Alerts │
│   2    │   5    │ Risks  │   3    │
│        │        │   8    │        │
└────────┴────────┴────────┴────────┘
```

**Formulas:**
```
Tile 1: =AccountMaster.Filter(healthScore < 60).Count()
Tile 2: =AccountMaster.Filter(healthScore >= 60 AND healthScore < 80).Count()
Tile 3: =RiskRegister.Filter(status.Contains('Active') AND riskLevel='High').Count()
Tile 4: =PlatformHealthMetrics.Filter(healthStatus='Critical').Count()
```

**Visual:** Large numbers with icons, color-coded (red, yellow, orange, red)

---

### SECTION 1: At-Risk Accounts Overview (Table)
**Position:** Below tiles

**Heading:** `🚨 At-Risk Accounts Requiring Attention`

**Table:** AccountMaster

**Configuration:**
```
Filter: healthScore < 80 OR riskLevel IN ('Critical', 'At Risk')
Sort: healthScore ASC (worst first), daysToRenewal ASC
Group by: riskLevel (Critical → At Risk → Healthy)
```

**Columns to Show:**
1. accountName (link)
2. healthScore (gauge + number)
3. riskLevel (badge)
4. daysToRenewal
5. arr (currency)
6. customerSuccessManager
7. lastEngagementDate
8. Days Since Last Touch (calculated)

**Calculated Column:**
```
Days Since Last Touch = Today() - lastEngagementDate
```

**Conditional Formatting:**
- healthScore: <60 red background, 60-79 yellow background
- Days Since Last Touch: >30 red, 15-30 yellow, <15 green

**Layout:** Table view with option to switch to cards for executives

---

### SECTION 2: Platform Health Metrics - Critical/Warning Only (Table)
**Position:** Below at-risk accounts

**Heading:** `📊 Platform Health Metrics (Critical & Warning)`

**Table:** PlatformHealthMetrics

**Configuration:**
```
Filter: healthStatus IN ('Critical', 'Warning')
Sort: healthStatus DESC (Critical first), metricCategory
Group by: metricCategory (Performance, Reliability, Security, etc.)
```

**Columns to Show:**
1. metricName
2. currentValue
3. targetValue
4. healthStatus (badge)
5. trend (arrow icon: ↑↓→)
6. lastMeasured
7. accountName (lookup)
8. Gap % (calculated)

**Calculated Column:**
```
Gap % = ((targetValue - currentValue) / targetValue * 100)
```

**Conditional Formatting:**
- healthStatus: Critical=red row, Warning=orange row
- trend: Degrading=red, Stable=yellow, Improving=green

---

### SECTION 3: Active Risks Requiring Attention (Table)
**Position:** Below platform metrics

**Heading:** `⚠️ Active High/Critical Risks`

**Table:** RiskRegister

**Configuration:**
```
Filter: status IN ('Active - Not Started', 'Active - In Progress')
        AND riskLevel IN ('High', 'Critical')
Sort: riskLevel DESC (Critical first), impactLevel DESC, dueDate ASC
Group by: riskLevel
Limit: Top 10 by risk score
```

**Columns to Show:**
1. accountName (lookup with link)
2. riskTitle
3. riskCategory (badge)
4. riskLevel (badge with color)
5. impactLevel (1-5 scale)
6. probabilityLevel (1-5 scale)
7. mitigationStrategy (truncate)
8. mitigationOwner
9. dueDate
10. status
11. Risk Score (calculated)

**Calculated Column:**
```
Risk Score = impactLevel * probabilityLevel
```

**Conditional Formatting:**
- dueDate: <7 days red, 7-14 days yellow, overdue dark red
- Risk Score: >20 dark red, 15-20 red, 10-14 orange

---

## Page Refresh Cadence
- **Daily:** Check critical accounts and platform alerts
- **Weekly:** Full team review during health sync meeting
- **Monthly:** Trend analysis and escalation review

---

# PAGE 4: QBR PREPARATION VIEW

## Page Setup
- **Page Name:** `[Account Name] - QBR [Quarter] [Year]`
- **Example:** `Gard AS - QBR Q4 2024`
- **Purpose:** Comprehensive quarterly business review prep
- **Audience:** CSMs (owner), Account Executives, Solutions Architects, CS Leadership
- **Page Filter:** Account = [Account Name]

## Layout Structure (7 Sections + Footer)

### SECTION 1: Account Executive Summary (Canvas Card)
**Position:** Top of page, full width

**Layout:**
```
┌────────────────────────────────────────────────────────────┐
│  Left Column:                Right Column:                 │
│  [ACCOUNT NAME]              [Health Metrics - 5 Gauges]   │
│  Industry: Maritime           Overall Health: 80           │
│  ARR: $850K                   Platform Health: 80          │
│  Contract: Signature          Business Value: 75           │
│  Renewal: 2025-12-31          Stakeholder Eng: 78          │
│  Days to Renewal: 245         Strategic Align: 79          │
│  Geography: EMEA                                            │
│                                                             │
│  Business Context Summary (from BusinessContext):          │
│  • Digital Maturity: Defined                               │
│  • Cloud Strategy: Hybrid                                  │
│  • Key Drivers: API Management, Integration Modernization  │
│  • Current Challenges: Legacy system migration             │
└────────────────────────────────────────────────────────────┘
```

**Formula:**
```
=AccountMaster.Filter(accountName=[Selected]).First()
=BusinessContext.Filter(account=[Selected]).First()
```

---

### SECTION 2: Strategic Objectives Progress (Table)
**Position:** Below summary card

**Heading:** `🎯 Strategic Objectives - [Quarter] Progress`

**Table:** StrategicObjectives

**Configuration:**
```
Filter: account=[Selected] AND status != 'Cancelled'
Sort: strategicPillar, progressPercent DESC
Group by: strategicPillar (Cost Reduction, Revenue Growth, Time to Market, etc.)
```

**Columns to Show:**
1. objectiveName
2. businessDriver (badge)
3. progressPercent (progress bar)
4. targetDate
5. status (badge)
6. businessValueUsd (currency)
7. successCriteria (wrap text)
8. Days to Target (calculated)

**Conditional Formatting:**
- progressPercent: <30% red, 30-69% yellow, 70%+ green
- status: Completed=green, In Progress=blue, On Hold=gray
- targetDate: Overdue=red text

**Summary Row:**
- Count by status
- Total business value

**Display:** Show top 5 for executive slide, full list in appendix

---

### SECTION 3: Value Delivered & ROI (Table + Tiles)
**Position:** Below objectives

**Heading:** `💰 Value Delivered - [Quarter] Achievements`

**Summary Tiles (Above Table):**
```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│Total         │Total Value   │Average ROI   │Initiatives   │
│Investment    │Realized      │              │Completed     │
│$500K         │$2.5M         │480%          │8             │
└──────────────┴──────────────┴──────────────┴──────────────┘
```

**Formulas:**
```
=SUM(Initiatives.Filter(account=[Selected] AND status='Completed').investmentUsd)
=SUM(Initiatives.Filter(account=[Selected] AND status='Completed').businessValueRealized)
=AVERAGE(Initiatives.Filter(account=[Selected] AND status='Completed').actualRoiPercent)
=COUNT(Initiatives.Filter(account=[Selected] AND status='Completed'))
```

**Table:** Initiatives

**Configuration:**
```
Filter: account=[Selected] AND status='Completed' AND completedDate >= [Quarter Start]
Sort: actualRoiPercent DESC, businessValueRealized DESC
```

**Columns to Show:**
1. initiativeName
2. businessDriver (badge)
3. investmentUsd (currency)
4. expectedBenefitsUsd (currency)
5. businessValueRealized (currency, large bold)
6. actualRoiPercent (%, large bold)
7. completedDate
8. keyOutcomes (wrap text)

**Conditional Formatting:**
- actualRoiPercent: >300% dark green, 200-299% green, 100-199% yellow
- businessValueRealized: Green text, currency format

**Below Table:** ValueStreams showing cycle time improvements and cost savings

---

### SECTION 4: Platform Adoption & Health (2 Sub-sections)
**Position:** Below value delivered

**Heading:** `📊 Platform Health & Adoption Metrics`

**Sub-section A: Platform Capabilities Maturity**

**Table:** PlatformCapabilities

**Configuration:**
```
Filter: account=[Selected]
Sort: capabilityDomain, currentMaturity
Group by: capabilityDomain
```

**Columns to Show:**
1. capabilityName
2. currentMaturity (badge with level: L1-L5)
3. targetMaturity (badge)
4. maturityGap (calculated)
5. implementationStatus (badge)
6. priority (badge)
7. targetCompletionDate

**Conditional Formatting:**
- maturityGap: >1 red, =1 yellow, =0 green

**Sub-section B: Platform Health Metrics**

**Table:** PlatformHealthMetrics

**Configuration:**
```
Filter: account=[Selected] AND metricCategory IN ('Performance','Reliability','Adoption')
Sort: metricCategory, healthStatus DESC (Critical first)
```

**Columns to Show:**
1. metricName
2. currentValue
3. targetValue
4. healthStatus (badge)
5. trend (arrow)
6. metricCategory (badge)

**Conditional Formatting:**
- healthStatus: Critical=red, Warning=orange, Acceptable=yellow, Healthy=green

**Tiles Above:**
- Count of Critical metrics
- Count of Healthy metrics
- Overall platform uptime %

---

### SECTION 5: Stakeholder Engagement Summary (Table + Tiles)
**Position:** Below platform section

**Heading:** `🤝 Stakeholder Engagement - [Quarter] Activity`

**Summary Tiles:**
```
┌──────────────┬──────────────┬──────────────┐
│Total         │Avg Sentiment │Next QBR      │
│Engagements   │Score         │Date          │
│12            │Positive      │2025-02-15    │
└──────────────┴──────────────┴──────────────┘
```

**Table:** EngagementLog

**Configuration:**
```
Filter: account=[Selected] AND
        engagementDate >= [Quarter Start] AND
        engagementDate <= [Quarter End]
Sort: engagementDate DESC (most recent first)
```

**Columns to Show:**
1. engagementDate (date format)
2. engagementType (badge)
3. attendees
4. sentiment (colored badge)
5. keyTopicsDiscussed (wrap text)
6. actionItems (wrap text)
7. nextEngagementDate

**Conditional Formatting:**
- sentiment: Very Positive=dark green, Positive=green, Neutral=yellow, Negative=orange, Very Negative=red
- engagementType: QBR=purple, Executive Briefing=gold, Workshop=blue

**Below Table:** StakeholderOutcomes showing outcomes achieved per stakeholder

---

### SECTION 6: Risks & Mitigation Status (Table)
**Position:** Below engagement

**Heading:** `⚠️ Risks & Mitigation - Active Items`

**Table:** RiskRegister

**Configuration:**
```
Filter: account=[Selected] AND
        status IN ('Active - Not Started','Active - In Progress','Mitigated')
Sort: riskLevel DESC, status ASC
Group by: riskCategory
```

**Columns to Show:**
1. riskTitle
2. riskLevel (badge)
3. riskCategory (badge)
4. impactLevel (1-5)
5. probabilityLevel (1-5)
6. mitigationStrategy (wrap text)
7. mitigationOwner
8. status (badge)
9. targetResolutionDate

**Conditional Formatting:**
- riskLevel: Critical/High=red row, Medium=yellow row

**Note:** Show only active + recently mitigated risks. Closed risks archived.

---

### SECTION 7: Next Quarter Success Plan (Card/Document Format)
**Position:** Bottom of page

**Heading:** `🎯 Success Plan - [Next Quarter] Priorities`

**Table:** SuccessPlanTracker (displayed as card, not table)

**Configuration:**
```
Filter: account=[Selected] AND planPeriod=[Next Quarter]
```

**Display Fields:**
- planPeriod (heading)
- objectives (bullet list)
- keyInitiatives (bullet list)
- successMetrics (bullet list)
- renewalRiskLevel (badge)
- expansionOpportunityUsd (currency, large)
- expansionStrategy (wrap text)
- csm

**Calculated Fields:**
- Health Score Trend: Show last 3 quarters as sparkline
- Engagement Cadence Status: On track/at risk
- Recommended Actions: Based on current health and risks

---

### PAGE FOOTER
**Position:** Very bottom

**Content:**
```
Prepared by: [CSM Name]
Preparation Date: [Today]
QBR Date: [Scheduled Date]
Next QBR: [Next Quarter Date]
Account Team: [CSM, AE, SA names from AccountMaster]
```

---

## Presentation Tips
- **Section 1-3:** Use for executive slides (5-10 min)
- **Section 4-5:** Technical deep-dive if requested (10-15 min)
- **Section 6-7:** Forward-looking discussion (10-15 min)
- Keep full page for reference, create simplified slide deck for presentation

## Refresh Timeline
- **T-30 days:** Create page skeleton
- **T-14 days:** Populate all sections with data
- **T-7 days:** Review with internal team
- **T-3 days:** Finalize and send pre-read to customer
- **T-1 day:** Final updates

---

# PAGE 5: RENEWAL PIPELINE

## Page Setup
- **Page Name:** `💼 Renewal Pipeline - Next 180 Days`
- **Purpose:** Renewal and expansion tracking for all accounts
- **Audience:** CSMs, CS Leadership, Sales Leadership, RevOps, Executives
- **Page Filter:** None (show all renewals)

## Layout Structure (6 Sections + Controls + Summary)

### SECTION 0: Executive Summary (One-Line Formula)
**Position:** Page subtitle

**Formula:**
```
='Renewal Pipeline: ' +
  AccountMaster.Filter(daysToRenewal <= 180).Count() +
  ' accounts | $' +
  Format(AccountMaster.Filter(daysToRenewal <= 180).Sum(arr)/1000000, '0.0') +
  'M ARR | ' +
  AccountMaster.Filter(daysToRenewal <= 180 AND riskLevel IN ('Critical','At Risk')).Count() +
  ' at risk'
```

**Example Output:** "Renewal Pipeline: 15 accounts | $8.5M ARR | 3 at risk"

---

### SECTION 1: Pipeline Summary Tiles (Canvas - Top)
**Position:** Top of page, horizontal row

**Layout:**
```
┌────────────┬────────────┬────────────┬────────────┬────────────┐
│Total       │At-Risk     │Accounts    │Expansion   │Avg Health  │
│Renewal ARR │ARR         │Renewing    │Opportunity │Score       │
│$8.5M       │$1.2M       │15          │$2.3M       │74          │
└────────────┴────────────┴────────────┴────────────┴────────────┘
```

**Formulas:**
```
Tile 1: =AccountMaster.Filter(daysToRenewal <= 180).Sum(arr)
Tile 2: =AccountMaster.Filter(daysToRenewal <= 180 AND riskLevel IN ('Critical','At Risk')).Sum(arr)
Tile 3: =AccountMaster.Filter(daysToRenewal <= 180).Count()
Tile 4: =SuccessPlanTracker.Filter(AccountMaster.Filter(daysToRenewal <= 180).accountName.Contains(account)).Sum(expansionOpportunityUsd)
Tile 5: =AccountMaster.Filter(daysToRenewal <= 180).Average(healthScore)
```

**Visual:** Large numbers with currency format, color coding based on risk

---

### SECTION 2: Main Renewal Pipeline Table
**Position:** Below tiles

**Heading:** `📋 Renewal Pipeline - All Accounts`

**Table:** AccountMaster

**Configuration:**
```
Filter: daysToRenewal <= 180
Sort: riskLevel DESC (Critical/At Risk first), daysToRenewal ASC
Group by: riskLevel (collapsible groups)
```

**Columns to Show:**
1. accountName (link)
2. daysToRenewal (number, bold, large)
3. renewalDate (date format)
4. arr (currency, large)
5. healthScore (gauge + number)
6. riskLevel (badge with color)
7. customerSuccessManager
8. nextQbrDate (from SuccessPlanTracker, lookup)
9. lastEngagementDate (date)
10. expansionOpportunityUsd (from SuccessPlanTracker, currency, lookup)
11. Active Risk Count (calculated)
12. Renewal Quarter (calculated)
13. Days Since Last Touch (calculated)

**Calculated Columns:**
```
Renewal Quarter = If(daysToRenewal <= 90, 'Q' + Format(Today().AddDays(daysToRenewal).Quarter()), '')
Days Since Last Touch = Today() - lastEngagementDate
Active Risk Count = RiskRegister.Filter(account=thisRow.accountName AND status.Contains('Active')).Count()
```

**Conditional Formatting:**
- daysToRenewal: <60 red background, 60-90 orange, 91-180 yellow
- riskLevel: Critical/At Risk = red row highlight
- healthScore: <60 red text, 60-79 yellow, 80+ green
- expansionOpportunityUsd: >$500K green bold
- Days Since Last Touch: >30 red flag icon

**Summary Row Per Group:**
- Total ARR in this risk group
- Count of accounts
- Average health score

---

### SECTION 3: At-Risk Renewals Detail (Card View)
**Position:** Side panel or below main table

**Heading:** `🚨 At-Risk Renewals - Action Required`

**Table:** AccountMaster (displayed as cards)

**Configuration:**
```
Filter: daysToRenewal <= 180 AND riskLevel IN ('Critical','At Risk')
Sort: daysToRenewal ASC
Display: Cards (not table)
```

**Each Card Shows:**
```
┌─────────────────────────────────┐
│ [ACCOUNT NAME - Heading]        │
│ ARR: $850K | Health: 35 | 45d   │
│                                  │
│ Top 3 Risks:                     │
│ • Risk 1 title                   │
│ • Risk 2 title                   │
│ • Risk 3 title                   │
│                                  │
│ Mitigation Actions:              │
│ • Action 1                       │
│ • Action 2                       │
│                                  │
│ Next Engagement: 2024-12-15     │
│ CSM: Nirmal John                 │
│                                  │
│ [Schedule QBR] [Update Health]  │
│ [Log Engagement] [View Account] │
└─────────────────────────────────┘
```

**Action Buttons on Each Card:**
- Schedule QBR
- Update Health Score
- Log Engagement
- View Full Account

---

### SECTION 4: Expansion Opportunities (Table)
**Position:** Below at-risk cards

**Heading:** `💰 Expansion Opportunities`

**Table:** SuccessPlanTracker

**Configuration:**
```
Filter: Get accounts with daysToRenewal <= 180 AND expansionOpportunityUsd > 0
Formula: =SuccessPlanTracker.Filter(
  AccountMaster.Filter(daysToRenewal <= 180).accountName.Contains(account)
  AND expansionOpportunityUsd > 0
)
Sort: expansionOpportunityUsd DESC
```

**Columns to Show:**
1. account (link)
2. expansionOpportunityUsd (currency, large bold)
3. expansionStrategy (wrap text)
4. expansionConfidenceLevel (%)
5. renewalRiskLevel (badge)
6. healthScore (from AccountMaster, lookup)

**Conditional Formatting:**
- expansionOpportunityUsd: >$500K green highlight row
- expansionConfidenceLevel: >70% green, 40-69% yellow, <40% gray

**Summary:** Total expansion pipeline value

---

### SECTION 5: Renewal Timeline (Visual Calendar - Canvas)
**Position:** Below expansion opportunities

**Heading:** `📅 Renewal Timeline - Next 6 Months`

**Layout:**
```
Month 1 (0-30d):  ████████ $2.5M (5 accounts)
Month 2 (31-60d): ███████ $1.8M (3 accounts)
Month 3 (61-90d): ██████ $1.2M (2 accounts)
Month 4 (91-120d): ████ $800K (2 accounts)
Month 5 (121-150d): ███ $600K (1 account)
Month 6 (151-180d): ██ $400K (2 accounts)
```

**Formulas Per Month Bar:**
```
Month 1: =AccountMaster.Filter(daysToRenewal >= 0 AND daysToRenewal <= 30).Sum(arr)
Month 2: =AccountMaster.Filter(daysToRenewal >= 31 AND daysToRenewal <= 60).Sum(arr)
... continue for 6 months
```

**Visual:**
- Horizontal bar chart
- Color code bars by total ARR at risk
- Hover tooltips showing account names in each month
- Click to filter main table by month

---

### SECTION 6: Renewal Risk Factors (Table)
**Position:** Bottom of page

**Heading:** `⚠️ Renewal Risk Factors - Risk Analysis`

**Table:** RiskRegister

**Configuration:**
```
Filter: Get risks for accounts with renewals in next 180 days, status = Active
Formula: =RiskRegister.Filter(
  AccountMaster.Filter(daysToRenewal <= 180).accountName.Contains(account)
  AND status IN ('Active - Not Started','Active - In Progress')
)
Sort: riskLevel DESC, potentialBusinessImpactUsd DESC
Group by: account
Limit: Top 20 by impact
```

**Columns to Show:**
1. account (link)
2. riskTitle
3. riskLevel (badge)
4. riskCategory
5. impactLevel (1-5)
6. mitigationStrategy (truncate)
7. mitigationOwner
8. targetResolutionDate
9. status
10. Renewal Date (from AccountMaster, lookup)

**Conditional Formatting:**
- targetResolutionDate > (renewal date - 30 days): Red flag (risk may not be resolved before renewal)
- riskLevel: High/Critical=red row

**Display:** Show only top 20 risks by impact

---

### VIEW CONTROLS (Top-Right or Sidebar)
**Position:** Sticky header or right sidebar

**Controls:**
```
Dropdown: Filter by CSM
   Options: [All CSMs], Nirmal John, Prathamesh Pable

Dropdown: Filter by Risk Level
   Options: [All], Critical, At Risk, Healthy

Dropdown: Time Window
   Options: 30 days, 60 days, 90 days, 180 days

Date Range: Renewal Date Range
   Start: [Date picker]
   End: [Date picker]

Toggle: Show Only At-Risk
   ON: Filter riskLevel IN ('Critical','At Risk')
   OFF: Show all
```

---

### QUICK ACTIONS PANEL (Sidebar or Top-Right)
**Position:** Sticky right sidebar

**Buttons:**
```
[Schedule All QBRs]
   For accounts without nextQbrDate

[Export to Sales]
   Create CSV for sales handoff

[Send Summary Email]
   Email summary to leadership

[Update All Health Scores]
   Batch update health scores
```

---

## Page Refresh Cadence
- **Daily:** During renewal season (any renewals <90 days)
- **2x per week:** Normal operations
- **Real-time:** During exec reviews
- **Monthly:** Long-term pipeline planning

---

## Use Cases
1. **Daily:** CSMs check renewal pipeline, prioritize outreach
2. **Weekly:** CS Leadership reviews at-risk renewals in pipeline meeting
3. **Monthly:** Executive team reviews renewal forecast and expansion pipeline
4. **Quarterly:** Sales leadership reviews expansion opportunities

---

# GENERAL DESIGN GUIDELINES

## Color Palette

### Status Colors
- **Critical/High Risk:** #E53E3E (Red)
- **At Risk/Warning:** #ED8936 (Orange)
- **Medium/Caution:** #D69E2E (Yellow)
- **Healthy/Low:** #38A169 (Green)
- **Excellent:** #2F855A (Dark Green)

### UI Colors
- **Headers:** #2C5282 (Dark Blue)
- **Badges:** Colored with white text, rounded corners
- **Cards:** #F7FAFC (Light Gray) background, subtle shadow
- **Borders:** #E2E8F0 (Light Gray)

## Typography
- **Headings:** Bold, 18-24px
- **Subheadings:** Semi-bold, 14-16px
- **Body:** Regular, 12-14px
- **Numbers:** Bold, larger for emphasis

## Icons
- 🎯 Strategic/Objectives
- 💰 Financial/ROI
- 📊 Metrics/Analytics
- 🏥 Health
- ⚠️ Risks
- 🤝 Engagement
- 💼 Renewals
- ✅ Tasks/Actions

## Table Styling
- **Alternating rows:** Light gray (#F7FAFC)
- **Hover:** Slight highlight (#EDF2F7)
- **Selected:** Blue tint (#BEE3F8)
- **Headers:** Bold, colored background
- **Summary rows:** Bold, light background

## Badge Styling
```
Status Badges:
• Completed: Green background, white text
• In Progress: Blue background, white text
• At Risk: Red background, white text
• On Hold: Gray background, white text

Priority Badges:
• Critical: Red, white text, icon
• High: Orange, white text
• Medium: Yellow, dark text
• Low: Gray, dark text

Risk Level Badges:
• Critical: Dark red, white text, icon
• High: Red, white text
• Medium: Yellow, dark text
• Low: Green, white text
```

## Conditional Formatting Rules

### Health Scores (0-100)
- **<60:** Red background (#FED7D7), dark red text
- **60-79:** Yellow background (#FEFCBF), dark yellow text
- **80+:** Green background (#C6F6D5), dark green text

### Days to Renewal
- **<30:** Red background
- **30-60:** Orange background
- **61-90:** Yellow background
- **91-180:** Light yellow background
- **>180:** No color

### Progress Percentage
- **<30%:** Red background, white text
- **30-69%:** Yellow background, dark text
- **70%+:** Green background, white text

### ROI Percentage
- **>300%:** Green text, bold
- **200-299%:** Green text
- **100-199%:** Yellow text
- **<100%:** Red text

---

# LAYOUT SPECIFICATIONS

## Page Margins
- **Top:** 40px
- **Left/Right:** 60px
- **Bottom:** 60px
- **Between sections:** 40px

## Table Settings
- **Row height:** 40px (default), 60px (with wrapped text)
- **Column widths:** Auto-size, but set minimums
  - Account Name: Min 200px
  - Currency fields: Min 120px
  - Dates: Min 100px
  - Status badges: Min 100px

## Canvas Sections
- **Padding:** 20px
- **Border radius:** 8px
- **Shadow:** Subtle (2px, 10% opacity)

## Grid System
- **Tiles:** 2-5 columns depending on content
- **Cards:** 3-4 per row on desktop, 1 on mobile

---

# FORMULA REFERENCE

## Common Lookups
```
Get Account Data:
=AccountMaster.Filter(accountName=[Selected]).First()

Get Health Score:
=AccountMaster.Filter(accountName=[Selected]).First().healthScore

Count Active Risks:
=RiskRegister.Filter(account=[Selected] AND status.Contains('Active')).Count()

Sum Renewal ARR:
=AccountMaster.Filter(daysToRenewal <= 90).Sum(arr)

Average Progress:
=StrategicObjectives.Filter(account=[Selected]).Average(progressPercent)
```

## Calculated Columns
```
Days Until Due:
=dueDate - Today()

Days Since Last Touch:
=Today() - lastEngagementDate

Risk Score:
=impactLevel * probabilityLevel

Maturity Gap:
=targetMaturity - currentMaturity

Gap Percentage:
=((targetValue - currentValue) / targetValue) * 100
```

---

**This guide provides complete specifications for all 5 view pages. Use it for Figjam design handoff!**

**Pack Version:** 12
**Last Updated:** November 2024
