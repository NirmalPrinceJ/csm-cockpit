# MuleSoft CSM Intelligence Platform - Phase 1 Implementation Guide

## Overview

This document provides the complete implementation specification for the Phase 1 foundation of the MuleSoft Customer Success Intelligence Platform built on Coda.

**Timeline:** 4 weeks to full CSM adoption
**Approach:** All tables with simplified formulas, manual data entry, no external integrations
**Goal:** Validate data model and establish CSM workflows before investing in automation

---

## Architecture Summary

### 14 Core Tables

| # | Table Name | Purpose | Primary Key | Relationships |
|---|------------|---------|-------------|---------------|
| 1 | **People_Team** | Team roster (CSM/AE/SE) | Person_ID | Referenced by Account_Master |
| 2 | **Account_Master** | Primary account registry | Account_ID | Parent to all account-specific tables |
| 3 | **Business_Context** | Strategic business context | Context_ID | 1:1 with Account_Master |
| 4 | **Strategic_Objectives** | Business goals | Objective_ID | Many:1 with Account_Master |
| 5 | **MuleSoft_Capabilities** | Platform maturity | Capability_ID | Many:1 with Account_Master |
| 6 | **Value_Streams** | Business processes & ROI | Stream_ID | Many:1 with Account_Master |
| 7 | **API_Portfolio** | API catalog & health | API_ID | Many:1 with Account_Master |
| 8 | **Platform_Health_Metrics** | KPIs & thresholds | Metric_ID | Many:1 with Account_Master |
| 9 | **Initiatives** | Investment projects | Initiative_ID | Many:1 with Account_Master |
| 10 | **Risk_Register** | Technical debt & risks | Risk_ID | Many:1 with Account_Master |
| 11 | **Stakeholder_Outcomes** | Success metrics | Outcome_ID | Many:1 with Account_Master |
| 12 | **Engagement_Log** | CSM touchpoints | Engagement_ID | Many:1 with Account_Master |
| 13 | **Success_Plan_Tracker** | Quarterly plans | Success_Plan_ID | Many:1 with Account_Master |
| 14 | **Activities_Tasks** | Action items | Task_ID | Many:1 with Account_Master |

---

## Phase 1 Simplified Approach

###  What's Included

✅ **All 14 tables with complete field sets** (no field reductions)
✅ **Simple calculated formulas** (arithmetic, conditionals, SWITCH statements)
✅ **Manual data entry workflows** (forms, templates, CSV imports)
✅ **Basic automations** (field calculations, simple notifications)
✅ **5 core views** (CSM Command Center, Strategic Board, Health Dashboard, QBR Prep, Renewal Risk)
✅ **Sample data for 3 pilot accounts** (Gard AS, Acme Financial, HealthTech)

### ⏸️ Deferred to Phase 2

⏸️ **External API integrations** (Anypoint Platform sync, Slack webhooks, Salesforce sync)
⏸️ **Complex composite calculations** requiring historical data
⏸️ **Advanced button automations** (QBR deck generation, ROI report export)
⏸️ **Real-time dashboards** with embedded charts
⏸️ **AI/ML-based predictions** and anomaly detection

---

## Key Phase 1 Simplifications

### Account_Master
- **Health_Score**: Manual slider input (0-100) instead of composite calculation
- **Last_Engagement_Date**: Manual date input instead of auto-populated from Engagement_Log
- **Next_Engagement_Date**: Manual date input instead of cadence-based automation

### API_Portfolio
- **Monthly_Transactions**: Manual number input instead of Anypoint Analytics sync
- **Avg_Response_Time_ms**: Manual input instead of Runtime Manager sync
- **Error_Rate_Percent**: Manual input instead of real-time monitoring
- **Uptime_Percent**: Manual input instead of automated tracking

### Platform_Health_Metrics
- **Trend_30d_Change**: Removed (requires historical tracking table)
- **Trend_Direction**: Removed (depends on trend data)
- **Last_Measured**: Manual date instead of auto-timestamp

### Risk_Register
- **Impact_Score**: Manual slider (1-5) instead of select-to-formula conversion
- **Probability_Score**: Manual slider (1-5) instead of select-to-formula conversion

### Success_Plan_Tracker
- **Overall_Health_Score**: Manual slider instead of composite rollup
- **Renewal_Risk_Level**: Manual select instead of calculated classification

---

## Formula Catalog (Phase 1)

### Simple Arithmetic Formulas

```javascript
// Account_Master
Days_To_Renewal = [Renewal_Date] - Today()

// Value_Streams
Cycle_Time_Reduction_Percent =
  (([Cycle_Time_Baseline_Hours] - [Cycle_Time_Current_Hours]) / [Cycle_Time_Baseline_Hours]) * 100

Annual_Cost_Savings_USD =
  ([Cost_Per_Transaction_Before_USD] - [Cost_Per_Transaction_After_USD]) * [Annual_Transaction_Volume]

Total_Business_Value_USD = [Annual_Cost_Savings_USD] + [Revenue_Impact_USD]

// API_Portfolio
Annual_Transaction_Volume = [Monthly_Transactions] * 12

// Initiatives
Days_Overdue =
  IF([Actual_Completion_Date] IS BLANK AND Today() > [Target_Completion_Date],
    Today() - [Target_Completion_Date],
    0)

Expected_Payback_Months = [Investment_Amount_USD] / ([Expected_Annual_Benefit_USD] / 12)

3_Year_ROI_Percent =
  ((([Expected_Annual_Benefit_USD] * 3) - [Investment_Amount_USD]) / [Investment_Amount_USD]) * 100

// Risk_Register
Risk_Score = [Impact_Score] * [Probability_Score]

// Stakeholder_Outcomes
Improvement_Percent =
  (([Current_Value] - [Baseline_Value]) / [Baseline_Value]) * 100

Target_Achievement_Percent =
  (([Current_Value] - [Baseline_Value]) / ([Target_Value] - [Baseline_Value])) * 100

// Activities_Tasks
Days_Until_Due = [Due_Date] - Today()
```

### Conditional Formulas (IF statements)

```javascript
// Account_Master
Risk_Level =
  IF([Health_Score] < 60, "Critical",
    IF([Health_Score] < 75 AND [Days_To_Renewal] < 180, "At Risk",
      IF([Days_To_Renewal] < 90, "At Risk",
        IF([Health_Score] >= 85, "Excellent", "Healthy"))))

// Value_Streams
Cycle_Time_Progress =
  IF([Cycle_Time_Current_Hours] <= [Cycle_Time_Target_Hours], "🟢 Target Met",
    IF([Cycle_Time_Reduction_Percent] >= 50, "🟡 Progressing", "🔴 Needs Improvement"))

// API_Portfolio
SLA_Compliance_Percent =
  IF([Avg_Response_Time_ms] <= [SLA_Target_ms], 100,
    MAX(0, 100 - (([Avg_Response_Time_ms] - [SLA_Target_ms]) / [SLA_Target_ms]) * 100))

Business_Criticality =
  IF([Uptime_Percent] >= 99.9 OR [Revenue_Attribution_USD] > 1000000, "Mission-Critical",
    IF([Monthly_Transactions] > 100000 OR [Consuming_Applications] > 5, "High",
      IF([Monthly_Transactions] > 10000, "Medium", "Low")))

Health_Status =
  IF([Uptime_Percent] < 99.5 OR [Error_Rate_Percent] > 1, "🔴 Critical",
    IF([SLA_Compliance_Percent] < 95 OR [Error_Rate_Percent] > 0.5, "🟡 Degraded", "🟢 Healthy"))

// Platform_Health_Metrics
Health_Status =
  IF([Current_Value] >= [Target_Value] * 0.95, "🟢 On Track",
    IF([Current_Value] >= [Threshold_Warning], "🟡 Needs Attention", "🔴 Critical"))

// Risk_Register
Risk_Level =
  IF([Risk_Score] >= 20, "Critical",
    IF([Risk_Score] >= 12, "High",
      IF([Risk_Score] >= 6, "Medium", "Low")))

// Stakeholder_Outcomes
Status =
  IF([Target_Achievement_Percent] >= 100, "Achieved",
    IF([Target_Achievement_Percent] >= 75, "On Track", "Needs Attention"))
```

### SWITCH Formulas (Enum to Numeric)

```javascript
// MuleSoft_Capabilities
Current_Maturity_Numeric =
  SWITCH([Current_Maturity],
    "1-Initial", 1,
    "2-Developing", 2,
    "3-Defined", 3,
    "4-Managed", 4,
    "5-Optimizing", 5,
    0)

Target_Maturity_Numeric =
  SWITCH([Target_Maturity],
    "1-Initial", 1,
    "2-Developing", 2,
    "3-Defined", 3,
    "4-Managed", 4,
    "5-Optimizing", 5,
    0)

Maturity_Gap = [Target_Maturity_Numeric] - [Current_Maturity_Numeric]

Gap_Status =
  IF([Maturity_Gap] >= 3, "🔴 Critical Gap",
    IF([Maturity_Gap] = 2, "🟡 Moderate Gap",
      IF([Maturity_Gap] = 1, "🟢 Small Gap", "✅ At Target")))
```

---

## Phase 1 Automations (Simple Only)

### Automation 1: Calculate Days to Renewal
```yaml
Table: Account_Master
Trigger: Row created OR Renewal_Date modified
Action: Update Days_To_Renewal = [Renewal_Date] - Today()
```

### Automation 2: Update Risk Level
```yaml
Table: Account_Master
Trigger: Health_Score OR Days_To_Renewal changes
Action: Recalculate Risk_Level formula
```

### Automation 3: Maturity Gap Calculation
```yaml
Table: MuleSoft_Capabilities
Trigger: Current_Maturity OR Target_Maturity changes
Actions:
  1. Update Current_Maturity_Numeric
  2. Update Target_Maturity_Numeric
  3. Update Maturity_Gap
  4. Update Gap_Status
```

### Automation 4: Value Stream ROI Calculation
```yaml
Table: Value_Streams
Trigger: Any cost/cycle time field changes
Actions:
  1. Recalculate Cycle_Time_Reduction_Percent
  2. Recalculate Annual_Cost_Savings_USD
  3. Recalculate Total_Business_Value_USD
  4. Update Cycle_Time_Progress indicator
```

### Automation 5: Risk Score Calculation
```yaml
Table: Risk_Register
Trigger: Impact_Score OR Probability_Score changes
Actions:
  1. Update Risk_Score = Impact_Score * Probability_Score
  2. Update Risk_Level based on formula
```

### Automation 6: New Account Notification (Optional)
```yaml
Table: Account_Master
Trigger: New row created
Condition: Customer_Success_Manager is not blank
Action: Send email to CSM
  Subject: "New Account Assigned: [Account_Name]"
  Body: "You have been assigned as CSM for [Account_Name]. ARR: $[ARR]. Renewal: [Renewal_Date]."
```

---

## Sample Data: Gard AS (Pilot Account)

### Account_Master
```yaml
Account_ID: ACC-00001
Account_Name: Gard AS
Industry_Vertical: Maritime
Industry_Sub_Sector: P&I Insurance
Contract_Type: Signature Success
Contract_Start_Date: 2022-01-15
Contract_End_Date: 2025-01-14
Renewal_Date: 2025-01-14
Days_To_Renewal: [Calculated: ~60 days as of Nov 2024]
ARR: $850,000
ACV: $850,000
Customer_Success_Manager: [Person from People_Team]
Health_Score: 78 (manual input for Phase 1)
Risk_Level: [Calculated: "Healthy"]
Geography: EMEA
Primary_Contact_Name: Lars Hansen
Primary_Contact_Email: lars.hansen@gard.no
Primary_Contact_Role: Head of IT
```

### Strategic_Objectives (5 objectives)
```yaml
OBJ-00001:
  Account: ACC-00001
  Strategic_Pillar: Risk Mitigation
  Objective_Name: Manage Geopolitical Volatility
  Description: Enable 24/7 war risk quoting via self-service portal
  Quantified_Goal: 100% uptime on war risk portal, 5min quote turnaround
  MuleSoft_Relevance: Critical Enabler
  Status: In Progress
  Progress_Percent: 75
  Business_Value_USD: $5,000,000

OBJ-00002:
  Strategic_Pillar: Sustainability/ESG
  Objective_Name: Lead Green Transition
  Quantified_Goal: Capture 50% of alternative fuel coverage market
  Status: On Track
  Progress_Percent: 88

OBJ-00003:
  Strategic_Pillar: Customer Experience
  Objective_Name: Digital Client Experience
  Quantified_Goal: Launch member self-service portal (Oct 2023)
  Status: Achieved
  Progress_Percent: 100

OBJ-00004:
  Strategic_Pillar: Operational Resilience
  Objective_Name: Operational Resilience
  Quantified_Goal: 99.95% uptime on mission-critical services
  Status: At Risk
  Progress_Percent: 60

OBJ-00005:
  Strategic_Pillar: Cost Optimization
  Objective_Name: Cost Optimization
  Quantified_Goal: 20% reduction in manual processing costs
  Status: In Progress
  Progress_Percent: 55
```

### MuleSoft_Capabilities (7 capabilities)
```yaml
CAP-00001:
  Account: ACC-00001
  Capability_Domain: Integration
  Capability_Name: API-Led Connectivity
  Current_Maturity: 3-Defined
  Target_Maturity: 4-Managed
  Maturity_Gap: [Calculated: 1]
  Gap_Status: [Calculated: "🟢 Small Gap"]
  Priority: P1-High
  Implementation_Status: In Progress

CAP-00002:
  Capability_Domain: DevOps
  Capability_Name: CI/CD Automation
  Current_Maturity: 2-Developing
  Target_Maturity: 4-Managed
  Maturity_Gap: [Calculated: 2]
  Gap_Status: [Calculated: "🟡 Moderate Gap"]
  Priority: P1-High

CAP-00003:
  Capability_Domain: Analytics
  Capability_Name: Functional Monitoring
  Current_Maturity: 2-Developing
  Target_Maturity: 5-Optimizing
  Maturity_Gap: [Calculated: 3]
  Gap_Status: [Calculated: "🔴 Critical Gap"]
  Priority: P0-Critical

CAP-00004:
  Capability_Domain: Integration
  Capability_Name: CloudHub Modernization
  Current_Maturity: 1-Initial
  Target_Maturity: 5-Optimizing
  Maturity_Gap: [Calculated: 4]
  Gap_Status: [Calculated: "🔴 Critical Gap"]
  Priority: P0-Critical
```

### Value_Streams (3 streams)
```yaml
VS-00001:
  Account: ACC-00001
  Value_Stream_Name: War Risk Quoting
  Business_Process: Quote-to-Policy
  Cycle_Time_Baseline_Hours: 0.75 (45 minutes)
  Cycle_Time_Current_Hours: 0.067 (4 minutes)
  Cycle_Time_Target_Hours: 0.083 (5 minutes)
  Cycle_Time_Reduction_Percent: [Calculated: 91%]
  Cycle_Time_Progress: [Calculated: "🟢 Target Met"]
  Annual_Transaction_Volume: 180,000
  Cost_Per_Transaction_Before_USD: $15
  Cost_Per_Transaction_After_USD: $3
  Annual_Cost_Savings_USD: [Calculated: $2,160,000]
  Total_Business_Value_USD: [Calculated: $2,160,000]

VS-00002:
  Value_Stream_Name: Claims Processing
  Cycle_Time_Baseline_Hours: 336 (14 days)
  Cycle_Time_Current_Hours: 240 (10 days)
  Cycle_Time_Target_Hours: 168 (7 days)
  Cycle_Time_Reduction_Percent: [Calculated: 29%]
  Cycle_Time_Progress: [Calculated: "🔴 Needs Improvement"]
```

### API_Portfolio (5 APIs)
```yaml
API-00001:
  Account: ACC-00001
  API_Name: War Risk Quote API
  API_Type: Experience
  Environment: Production
  Monthly_Transactions: 15,000
  Annual_Transaction_Volume: [Calculated: 180,000]
  Avg_Response_Time_ms: 320
  SLA_Target_ms: 500
  SLA_Compliance_Percent: [Calculated: 100]
  Error_Rate_Percent: 0.2
  Uptime_Percent: 99.94
  Consuming_Applications: 3
  Revenue_Attribution_USD: $8,000,000
  Business_Criticality: [Calculated: "Mission-Critical"]
  Health_Status: [Calculated: "🟢 Healthy"]
  Documentation_Quality: Excellent
```

### Platform_Health_Metrics (4 metrics)
```yaml
MET-000001:
  Account: ACC-00001
  Metric_Category: Reliability
  Metric_Name: War Risk Portal Uptime
  Metric_Type: Technical
  Current_Value: 99.94
  Target_Value: 99.95
  Threshold_Warning: 99.90
  Threshold_Critical: 99.50
  Unit: %
  Measurement_Frequency: Real-time
  Health_Status: [Calculated: "🟢 On Track"]
  Business_Impact_Statement: "War risk customers cannot get 24/7 quotes during geopolitical crisis"
```

### Initiatives (3 initiatives)
```yaml
INI-00001:
  Account: ACC-00001
  Initiative_Name: CloudHub 2.0 Migration
  Initiative_Type: Platform Migration
  Priority: P0-Critical
  Status: Planning
  Investment_Amount_USD: $120,000
  Expected_Annual_Benefit_USD: $180,000
  Expected_Payback_Months: [Calculated: 8]
  3_Year_ROI_Percent: [Calculated: 350%]
```

### Risk_Register (2 risks)
```yaml
RISK-00001:
  Account: ACC-00001
  Risk_Category: Platform Risk
  Risk_Title: CloudHub 1.0 EOL
  Impact_Score: 5 (manual slider)
  Probability_Score: 5 (manual slider)
  Risk_Score: [Calculated: 25]
  Risk_Level: [Calculated: "Critical"]
  Potential_Business_Impact_USD: $2,000,000
  Status: In Progress
```

### Stakeholder_Outcomes (2 outcomes)
```yaml
OUT-00001:
  Account: ACC-00001
  Stakeholder_Name: War Risk Customers
  Stakeholder_Type: External Customer
  Outcome_Statement: "As a ship owner, I can get a war risk quote in <5 minutes so I can respond to crisis situations"
  Success_Metric_Name: Quote Turnaround Time
  Baseline_Value: 45 (minutes)
  Current_Value: 4
  Target_Value: 5
  Unit: minutes
  Improvement_Percent: [Calculated: -91%]
  Target_Achievement_Percent: [Calculated: 102%]
  Status: [Calculated: "Achieved"]
```

---

## File Structure

```
csm-cockpit/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts                          # Main entry point
│   ├── pack.ts                           # Pack metadata & coordination
│   ├── agents/
│   │   ├── schema-agent-phase1.ts        # Tables 1-14 definitions
│   │   ├── formula-agent.ts              # Calculated field formulas
│   │   ├── automation-agent.ts           # Phase 1 simple automations
│   │   ├── view-agent.ts                 # 5 core views
│   │   └── testing-agent.ts              # Validation & QA
│   └── blueprints/
│       └── strategic-account-tracking.ts # Metadata & documentation
├── data/
│   ├── sample-data-gard.csv              # Gard AS pilot data
│   ├── sample-data-acme.csv              # Acme Financial pilot data
│   └── sample-data-healthtech.csv        # HealthTech pilot data
└── docs/
    ├── PHASE1_IMPLEMENTATION.md          # This file
    ├── USER_GUIDE.md                     # CSM end-user documentation
    ├── PHASE2_ROADMAP.md                 # Future enhancements
    └── TRAINING_DECK.pdf                 # Team walkthrough slides
```

---

## Implementation Timeline (4 Weeks)

### Week 1: Foundation Setup
- **Day 1-2**: Coda Doc setup + People_Team table + 10-15 team members
- **Day 3-4**: Account_Master + Business_Context + 3 test accounts
- **Day 5**: Strategic_Objectives + 5 objectives for Gard AS

### Week 2: Platform & Operational Tables
- **Day 6-7**: MuleSoft_Capabilities + Value_Streams + sample data
- **Day 8-9**: API_Portfolio + Platform_Health_Metrics + sample data
- **Day 10**: Initiatives + Risk_Register + sample data

### Week 3: Engagement & Final Tables
- **Day 11-12**: Engagement_Log + Stakeholder_Outcomes + Activities_Tasks + Success_Plan_Tracker
- **Day 13-14**: Cross-table relationships + test all lookups

### Week 4: Views, Testing & Training
- **Day 15-16**: Build 5 core views
- **Day 17-18**: Complete Gard AS (100%), Acme (80%), HealthTech (60%)
- **Day 19**: Documentation (user guide, templates, Phase 2 roadmap)
- **Day 20**: CSM team walkthrough + Q&A + pilot assignment

---

## Next Steps

1. **Review this specification** with stakeholders
2. **Run `npm install`** to ensure dependencies are ready
3. **Build the Coda Pack** using `npx coda upload`
4. **Begin Week 1 implementation** starting with People_Team

**Questions or Issues?**
See `docs/USER_GUIDE.md` or contact the development team.

---

**Last Updated:** November 2024
**Version:** Phase 1.0
**Status:** Ready for Implementation ✅
