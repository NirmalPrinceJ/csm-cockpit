# Figjam Field Mapping - Complete Field Reference

## How to Use This Guide

When creating your Figjam wireframes, use this as your reference for **exact field names** that will populate from the Coda tables.

---

## Table 1: AccountMaster

### Display Name: Account Master / Portfolio Overview

### Fields Available:

| Field Name | Type | Description | Use in Figjam |
|------------|------|-------------|---------------|
| **accountId** | Text | ACC-1234567890 | Hidden (system field) |
| **accountName** | Text | "Gard AS" | ✅ Account name/title |
| **industryVertical** | Select | Maritime, Healthcare, etc. | ✅ Industry tag |
| **industrySubSector** | Text | "P&I Insurance" | ✅ Sub-sector detail |
| **arr** | Number | 850000 | ✅ Display as $850K |
| **acv** | Number | 850000 | ✅ Display as $850K |
| **customerSuccessManager** | Text | "Nirmal John" | ✅ CSM name |
| **accountExecutive** | Text | "Emilie Moen" | ✅ AE name |
| **solutionsArchitect** | Text | "Solutions Architect" | Optional |
| **executiveSponsorCustomer** | Text | "Christian Tome" | ✅ Customer exec |
| **healthScore** | Number | 80 (0-100) | ✅ Large metric tile |
| **platformHealthScore** | Number | 85 | Optional breakdown |
| **businessValueScore** | Number | 80 | Optional breakdown |
| **stakeholderScore** | Number | 75 | Optional breakdown |
| **strategicAlignmentScore** | Number | 78 | Optional breakdown |
| **riskLevel** | Select | Low/Medium/High/Critical | ✅ Status badge |
| **renewalDate** | Date | 2025-06-30 | ✅ Renewal info |
| **daysToRenewal** | Number | 245 | ✅ Days countdown |
| **contractStartDate** | Date | 2024-07-01 | Optional |
| **contractTerm** | Number | 12 (months) | Optional |
| **region** | Select | EMEA/Americas/APAC | ✅ Region filter |
| **accountTier** | Select | Enterprise/Mid-Market/SMB | ✅ Tier badge |
| **createdDate** | Date | Auto | Hidden |
| **lastModified** | Date | Auto | Hidden |

### Recommended Figjam Usage:
```
┌─────────────────────────────────────────┐
│ [accountName]                           │
│ [industryVertical] • [region]           │
│                                         │
│ ARR: $[arr] • Health: [healthScore]    │
│ CSM: [customerSuccessManager]          │
│ Renewal: [renewalDate] ([daysToRenewal] days) │
│                                         │
│ Status: [riskLevel badge]               │
└─────────────────────────────────────────┘
```

---

## Table 2: PeopleTeam

### Display Name: Team Members / People

### Fields Available:

| Field Name | Type | Description | Use in Figjam |
|------------|------|-------------|---------------|
| **personId** | Text | PER-1234567890 | Hidden |
| **fullName** | Text | "Nirmal John" | ✅ Person name |
| **email** | Email | nirmal@company.com | ✅ Contact info |
| **role** | Select | CSM/AE/SE/Executive | ✅ Role badge |
| **department** | Select | Customer Success/Sales | ✅ Department |
| **region** | Select | EMEA/Americas/APAC | ✅ Region |
| **account** | Text | "Gard AS" | ✅ Account link |
| **activeStatus** | Boolean | true/false | ✅ Active indicator |
| **phoneNumber** | Text | +1234567890 | Optional |

### Recommended Figjam Usage:
```
👤 [fullName]
   [role] • [department]
   📧 [email]
   🏢 Account: [account]
```

---

## Table 3: StrategicObjectives

### Display Name: Strategic Objectives / Customer Goals

### Fields Available:

| Field Name | Type | Description | Use in Figjam |
|------------|------|-------------|---------------|
| **objectiveId** | Text | OBJ-1234567890 | Hidden |
| **account** | Text | "Gard AS" | ✅ Account link |
| **objectiveName** | Text | "Reduce API latency" | ✅ Objective title |
| **strategicPillar** | Select | Cost Reduction/Revenue Growth | ✅ Category |
| **businessDrivers** | Multi-select | Operational Efficiency, etc. | ✅ Tags |
| **businessValueUsd** | Number | 250000 | ✅ Display as $250K |
| **status** | Select | Planning/In Progress/Completed | ✅ Status badge |
| **progressPercent** | Number | 60 (0-100) | ✅ Progress bar |
| **targetDate** | Date | 2025-03-31 | ✅ Target date |
| **actualCompletionDate** | Date | 2025-04-15 | Optional |
| **ownerCustomer** | Text | "Project Manager" | Optional |
| **muleSoftRelevance** | Select | High/Medium/Low | Optional |

### Recommended Figjam Usage:
```
🎯 [objectiveName]
   [strategicPillar]

   Progress: [progressPercent]% ████░░░░░░
   Value: $[businessValueUsd]
   Status: [status badge]
   Target: [targetDate]
```

---

## Table 4: Initiatives

### Display Name: Initiatives / Projects

### Fields Available:

| Field Name | Type | Description | Use in Figjam |
|------------|------|-------------|---------------|
| **initiativeId** | Text | INI-1234567890 | Hidden |
| **account** | Text | "Gard AS" | ✅ Account link |
| **initiativeName** | Text | "Platform Migration" | ✅ Initiative title |
| **status** | Select | Planning/In Progress/At Risk | ✅ Status badge |
| **priority** | Select | Critical/High/Medium/Low | ✅ Priority badge |
| **investmentUsd** | Number | 100000 | ✅ Display as $100K |
| **expectedBenefitsUsd** | Number | 300000 | ✅ Display as $300K |
| **businessValueRealizedUsd** | Number | 150000 | ✅ Display as $150K |
| **threeYearROIPercent** | Number | 350 | ✅ Display as 350% |
| **actualROIPercent** | Number | 200 | ✅ Display as 200% |
| **paybackMonths** | Number | 18 | ✅ Payback period |
| **startDate** | Date | 2024-01-01 | ✅ Start date |
| **targetCompletionDate** | Date | 2025-06-30 | ✅ Target date |
| **actualCompletionDate** | Date | 2025-07-15 | Optional |
| **owner** | Text | "Project Lead" | ✅ Owner name |

### Recommended Figjam Usage:
```
💼 [initiativeName]
   [status badge] [priority badge]

   Investment: $[investmentUsd]
   Expected: $[expectedBenefitsUsd]
   ROI: [threeYearROIPercent]%
   Payback: [paybackMonths] months

   Timeline: [startDate] → [targetCompletionDate]
```

---

## Table 5: RiskRegister

### Display Name: Risk Register / Risks

### Fields Available:

| Field Name | Type | Description | Use in Figjam |
|------------|------|-------------|---------------|
| **riskId** | Text | RSK-1234567890 | Hidden |
| **account** | Text | "Gard AS" | ✅ Account link |
| **riskTitle** | Text | "Budget constraints" | ✅ Risk title |
| **riskCategory** | Select | Technical/Financial/Resource | ✅ Category tag |
| **riskLevel** | Select | Low/Medium/High/Critical | ✅ Severity badge |
| **impactLevel** | Number | 4 (1-5) | ✅ Impact score |
| **probabilityLevel** | Number | 3 (1-5) | ✅ Probability score |
| **riskScore** | Number | 12 (Impact × Probability) | ✅ Calculated score |
| **status** | Select | Active/Mitigated/Closed | ✅ Status badge |
| **mitigationStrategy** | Text | "Schedule CFO meeting" | ✅ Mitigation plan |
| **mitigationOwner** | Text | "Account Executive" | ✅ Owner name |
| **targetResolutionDate** | Date | 2024-12-31 | ✅ Target date |
| **actualResolutionDate** | Date | 2025-01-15 | Optional |

### Recommended Figjam Usage:
```
⚠️ [riskTitle]
   [riskLevel badge] • [riskCategory]

   Impact: [impactLevel]/5
   Probability: [probabilityLevel]/5
   Risk Score: [riskScore]

   Mitigation: [mitigationStrategy]
   Owner: [mitigationOwner]
   Target: [targetResolutionDate]
```

---

## Table 6: EngagementLog

### Display Name: Engagement Log / Customer Interactions

### Fields Available:

| Field Name | Type | Description | Use in Figjam |
|------------|------|-------------|---------------|
| **engagementId** | Text | ENG-1234567890 | Hidden |
| **account** | Text | "Gard AS" | ✅ Account link |
| **engagementDate** | Date | 2024-11-15 | ✅ Engagement date |
| **engagementType** | Select | QBR/Check-in/Executive Briefing | ✅ Type badge |
| **attendeesCustomer** | Text | "Christian Tome (CEO)" | ✅ Customer attendees |
| **attendeesMuleSoft** | Text | "Nirmal John (CSM)" | ✅ Our attendees |
| **sentiment** | Select | Very Positive/Positive/Neutral | ✅ Sentiment indicator |
| **strategicAlignmentScore** | Number | 9 (0-10) | Optional |
| **technicalHealthScore** | Number | 8 (0-10) | Optional |
| **relationshipDepthScore** | Number | 7 (0-10) | Optional |
| **keyTopicsDiscussed** | Text | "Q4 planning, Platform health" | ✅ Summary |
| **actionItemsAgreed** | Text | "Schedule tech workshop" | ✅ Action items |
| **nextEngagementDate** | Date | 2025-02-15 | ✅ Next meeting |
| **nextEngagementType** | Select | QBR/Check-in | Optional |

### Recommended Figjam Usage:
```
🤝 [engagementDate] • [engagementType]
   [sentiment indicator 😊/😐/🙁]

   Customer: [attendeesCustomer]
   MuleSoft: [attendeesMuleSoft]

   Topics: [keyTopicsDiscussed]
   Actions: [actionItemsAgreed]

   Next: [nextEngagementDate] ([nextEngagementType])
```

---

## Table 7: Tasks

### Display Name: Tasks / Action Items

### Fields Available:

| Field Name | Type | Description | Use in Figjam |
|------------|------|-------------|---------------|
| **taskId** | Text | TSK-1234567890 | Hidden |
| **account** | Text | "Gard AS" | ✅ Account link |
| **taskTitle** | Text | "Schedule workshop" | ✅ Task title |
| **priority** | Select | Critical/High/Medium/Low | ✅ Priority badge |
| **status** | Select | Open/In Progress/Completed | ✅ Status badge |
| **assignedTo** | Text | "Nirmal John" | ✅ Assignee |
| **dueDate** | Date | 2024-11-30 | ✅ Due date |
| **linkedEngagementId** | Text | ENG-1234567890 | Optional link |
| **linkedInitiativeId** | Text | INI-1234567890 | Optional link |
| **linkedRiskId** | Text | RSK-1234567890 | Optional link |

### Recommended Figjam Usage:
```
☐ [taskTitle]
  [priority badge] [status badge]

  Assigned: [assignedTo]
  Due: [dueDate]
  Account: [account]
```

---

## Supporting Tables (Optional Fields)

### Table 8: BusinessContext

| Field | Type | Use |
|-------|------|-----|
| **contextId** | Text | Hidden |
| **account** | Text | ✅ Account link |
| **contextName** | Text | ✅ Context title |
| **businessDriver** | Select | ✅ Driver category |
| **currentStateChallenges** | Text | ✅ Current challenges |
| **desiredFutureState** | Text | ✅ Desired outcome |
| **businessImpact** | Text | ✅ Business impact |

### Table 9: Capabilities

| Field | Type | Use |
|-------|------|-----|
| **capabilityId** | Text | Hidden |
| **account** | Text | ✅ Account link |
| **capabilityName** | Text | ✅ Capability name |
| **capabilityType** | Select | ✅ Type |
| **currentMaturity** | Number | ✅ Current level (1-5) |
| **targetMaturity** | Number | ✅ Target level (1-5) |
| **maturityGap** | Number | ✅ Gap (calculated) |
| **gapStatus** | Text | ✅ Status |

### Table 10: ValueStreams

| Field | Type | Use |
|-------|------|-----|
| **valueStreamId** | Text | Hidden |
| **account** | Text | ✅ Account link |
| **valueStreamName** | Text | ✅ Stream name |
| **baselineCycleTimeHours** | Number | ✅ Baseline time |
| **currentCycleTimeHours** | Number | ✅ Current time |
| **cycleTimeReductionPercent** | Number | ✅ Improvement % |

### Table 11: APIs

| Field | Type | Use |
|-------|------|-----|
| **apiId** | Text | Hidden |
| **account** | Text | ✅ Account link |
| **apiName** | Text | ✅ API name |
| **apiType** | Select | ✅ Type (REST/SOAP/GraphQL) |
| **businessCriticality** | Select | ✅ Criticality |
| **monthlyTransactions** | Number | ✅ Volume |
| **consumingApplications** | Number | ✅ Consumers |

### Table 12: PlatformHealthMetrics

| Field | Type | Use |
|-------|------|-----|
| **metricId** | Text | Hidden |
| **account** | Text | ✅ Account link |
| **metricName** | Text | ✅ Metric name |
| **metricValue** | Number | ✅ Current value |
| **targetValue** | Number | ✅ Target value |
| **healthStatus** | Text | ✅ Status (🟢/🟡/🔴) |

### Table 13: StakeholderOutcomes

| Field | Type | Use |
|-------|------|-----|
| **outcomeId** | Text | Hidden |
| **account** | Text | ✅ Account link |
| **stakeholder** | Text | ✅ Stakeholder name |
| **stakeholderRole** | Text | ✅ Role |
| **outcomeName** | Text | ✅ Outcome title |
| **progressPercent** | Number | ✅ Progress |

### Table 14: SuccessPlans

| Field | Type | Use |
|-------|------|-----|
| **planId** | Text | Hidden |
| **account** | Text | ✅ Account link |
| **planName** | Text | ✅ Plan name |
| **planType** | Select | ✅ Type (Onboarding/QBR) |
| **status** | Select | ✅ Status |
| **targetDate** | Date | ✅ Target date |

---

## Common Figjam Page Templates

### Executive Summary Page

**Key Metrics Section:**
```
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│  Total ARR   │ │ Avg Health   │ │  At Risk     │ │  Renewals    │
│              │ │              │ │              │ │   90 Days    │
│  $[SUM(arr)] │ │ [AVG(health)]│ │ [COUNT(risk)]│ │  $[SUM(...)] │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
```

**Account List:**
```
Account Name        | ARR      | Health | CSM           | Renewal
──────────────────────────────────────────────────────────────────
[accountName]       | $[arr]   | [healthScore] | [customerSuccessManager] | [renewalDate]
[accountName]       | $[arr]   | [healthScore] | [customerSuccessManager] | [renewalDate]
```

---

### Account Deep Dive Page

**Header:**
```
═══════════════════════════════════════════════════════════
  [accountName]
  [industryVertical] • [region] • [accountTier]
═══════════════════════════════════════════════════════════

ARR: $[arr]                    Health Score: [healthScore]
CSM: [customerSuccessManager]  Risk Level: [riskLevel badge]
Renewal: [renewalDate]         Days: [daysToRenewal]
```

**Objectives Section:**
```
STRATEGIC OBJECTIVES
────────────────────
🎯 [objectiveName]
   Progress: [progressPercent]% ████████░░
   Value: $[businessValueUsd]
   Status: [status]
```

**Risks Section:**
```
ACTIVE RISKS
────────────
⚠️ [riskTitle]
   [riskLevel badge] • Score: [riskScore]
   Mitigation: [mitigationStrategy]
```

**Engagement History:**
```
RECENT ENGAGEMENTS
──────────────────
[engagementDate] • [engagementType] • [sentiment indicator]
Topics: [keyTopicsDiscussed]
```

---

### QBR Preparation Page

**Account Overview:**
```
[accountName] - Quarterly Business Review
Prepared for: [executiveSponsorCustomer]
Date: [Today]
```

**Key Sections:**
- Health Score: `[healthScore]` with breakdown
- Objectives Progress: List of `[objectiveName]` with `[progressPercent]%`
- Value Delivered: Sum of `[businessValueRealizedUsd]`
- Initiatives: List with status
- Risks: Active risks only
- Engagement Summary: Count and sentiment analysis

---

## Field Mapping for Formulas

### Health Score Breakdown
```
Composite Health =
  ([platformHealthScore] × 35%) +
  ([businessValueScore] × 30%) +
  ([stakeholderScore] × 20%) +
  ([strategicAlignmentScore] × 15%)
```

### Risk Score
```
Risk Score = [impactLevel] × [probabilityLevel]
```

### Days to Renewal
```
Days to Renewal = [renewalDate] - TODAY()
```

### ROI Calculation
```
ROI % = (([expectedBenefitsUsd] - [investmentUsd]) / [investmentUsd]) × 100
```

---

## Color Coding Recommendations

### Health Score
- 🟢 Green: 80-100
- 🟡 Yellow: 60-79
- 🔴 Red: 0-59

### Risk Level
- 🔴 Critical
- 🟠 High
- 🟡 Medium
- 🟢 Low

### Status
- 🔵 Planning
- 🟢 In Progress / Active
- 🟡 At Risk / On Hold
- ✅ Completed
- ⚫ Closed

### Sentiment
- 😊 Very Positive (Green)
- 🙂 Positive (Light Green)
- 😐 Neutral (Yellow)
- 🙁 Negative (Orange)
- 😞 Very Negative (Red)

---

## Quick Reference: Most Used Fields

For each page type, here are the **must-have** fields:

### Executive Summary
- `accountName`, `arr`, `healthScore`, `riskLevel`, `customerSuccessManager`, `renewalDate`, `daysToRenewal`

### Account Deep Dive
- All from Executive Summary, plus:
- `objectiveName`, `progressPercent`, `businessValueUsd`
- `riskTitle`, `riskLevel`, `riskScore`
- `engagementDate`, `engagementType`, `sentiment`

### QBR Preparation
- All from Account Deep Dive, plus:
- `initiativeName`, `actualROIPercent`, `businessValueRealizedUsd`
- `platformHealthScore`, `businessValueScore`, `stakeholderScore`

### Risk Dashboard
- `accountName`, `riskTitle`, `riskLevel`, `riskScore`, `mitigationStrategy`, `mitigationOwner`, `targetResolutionDate`

### Engagement Tracker
- `accountName`, `engagementDate`, `engagementType`, `sentiment`, `attendeesCustomer`, `keyTopicsDiscussed`, `nextEngagementDate`

---

## Notes for Figjam Design

1. **Use exact field names** from this guide
2. **Bracket syntax** `[fieldName]` to indicate dynamic data
3. **Add formatting hints** like "$" for currency, "%" for percentages
4. **Include status badges** for select fields
5. **Show calculated fields** where relevant (e.g., risk score = impact × probability)
6. **Add filters/grouping** indicators where tables will be grouped by account

---

Ready to wire up your Figjam! 🎨

Just reference this guide for exact field names and data types.
