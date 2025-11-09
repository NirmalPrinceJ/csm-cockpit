---
title: MuleSoft CS Intelligence Platform v3.0
tags: [mulesoft, customer-success, coda, implementation]
created: 2025-11-09
---

# MuleSoft Customer Success Intelligence Platform v3.0

> [!abstract] Summary
> Two-phase implementation blueprint for building the MuleSoft Customer Success Intelligence Platform (CSIP) on Coda, including schema design, integrations, automations, dashboards, sample data, and rollout guardrails.

## Phase Snapshot
| Phase | Focus | Priority | Estimated Effort |
| --- | --- | --- | --- |
| Phase 1 | Database foundation (12 tables + views + sample data) | P1 | 8–12 hours |
| Phase 2 | Integrations, automations, advanced buttons | P2 | 12–16 hours |
| Testing & Refinement | Validation, performance, polish | — | 4–6 hours |

> [!todo] Launch Sequence
> - [ ] Stand up Phase 1 tables and supporting history sets.
> - [ ] Seed Gard AS pilot data and verify rollups.
> - [ ] Configure credentials (Slack, Anypoint, Zapier) for Phase 2.
> - [ ] Activate automations and validate alerts.
> - [ ] Execute testing checklist before enabling for wider team.

## Phase 1 – Database Foundation
> [!info]
> Build twelve interlinked Coda tables. Each section lists purpose, views, and column-level configuration optimized for Obsidian reference.

### [[Account_Master]]
> [!summary] Central hub record for every managed customer account.

**Views**
- `All Accounts` (default) sorted by `Account_Name`.
- `By CSM` grouped by `Customer_Success_Manager`.
- `Renewal Risk` filtered where `Renewal_Risk_Level` ∈ {Critical, At Risk}, sorted by `Days_To_Renewal`.
- `Health Score` sorted by `Health_Score` ascending.

#### Identity & Contract
- **Account_ID** — Text *(Row ID)*  
  - Formula:: `"ACC-" & Format(thisRow.RowNumber(), "00000")`
- **Account_Name** — Text *(required, unique)*
- **Industry_Vertical** — Select *(required)*  
  - Options:: Maritime, Financial Services, Healthcare, Retail, Manufacturing, Energy, Public Sector, Technology, Telecommunications
- **Industry_Sub_Sector** — Text
- **Contract_Type** — Select *(required)*; options as specified.
- **Contract_Start_Date**, **Contract_End_Date**, **Renewal_Date** — Date *(all required)*
- **Days_To_Renewal** — Number  
  - Formula:: `[Renewal_Date] - Today()`

#### Financials
- **ARR** — Currency *(required)*
- **ACV** — Currency
- **Customer_Annual_Revenue** — Currency
- **Employee_Count** — Number
- **S&P_Rating** — Text

#### Success Team
- **Customer_Success_Manager**, **Account_Executive**, **Solutions_Architect**, **Executive_Sponsor_MuleSoft** — Person lookups to `People_Team`.

#### Health Calculations
- **Health_Score** — Number *(1 decimal)*  
  - Formula:: `([Platform_Technical_Health] * 0.35) + ([Business_Value_Realization] * 0.30) + ([Stakeholder_Engagement] * 0.20) + ([Strategic_Alignment] * 0.15)`
- **Platform_Technical_Health** — Number  
  - Formula:: `Average(Filter([Platform_Health_Metrics], [Account].[Account_ID] = thisRow.[Account_ID] AND [Metric_Category].HasAny("Performance", "Reliability", "Security")).[Health_Status_Numeric])`
- **Business_Value_Realization** — Number  
  - Formula:: `Average(Filter([Stakeholder_Outcomes], [Account].[Account_ID] = thisRow.[Account_ID] AND [Status] != "Not Started").[Target_Achievement_Percent])`
- **Stakeholder_Engagement** — Number  
  - Formula:: `Average(Filter([Engagement_Log], [Account].[Account_ID] = thisRow.[Account_ID] AND [Engagement_Date] >= Today() - 90).[Relationship_Depth_Score])`
- **Strategic_Alignment** — Number  
  - Formula:: `(CountIf([Strategic_Objectives], [Account].[Account_ID] = thisRow.[Account_ID] AND [Status].HasAny("On Track", "Achieved")) / CountIf([Strategic_Objectives], [Account].[Account_ID] = thisRow.[Account_ID])) * 100` *(guard with `If(CountIf(...) = 0, 0, ...)` to avoid divide-by-zero)*
- **Health_Score_Trend_30d** — Number  
  - Formula:: `[Health_Score] - Lookup([Account_Master_History], [Account_ID] = thisRow.[Account_ID] AND [Date] = Today() - 30).[Health_Score]`
- **Health_Score_Change_Flag** — Text  
  - Formula:: `If([Health_Score_Trend_30d] < -5, "🔴 Declining", If([Health_Score_Trend_30d] > 5, "🟢 Improving", "→ Stable"))`
- **Renewal_Risk_Level** — Text  
  - Formula:: `If([Health_Score] < 60 AND [Days_To_Renewal] < 180, "Critical", If([Health_Score] < 70 AND [Days_To_Renewal] < 365, "At Risk", If([Health_Score] < 80, "Attention Needed", "Healthy")))`  
  - Conditional Formatting:: Critical=Red/Bold, At Risk=Yellow, Attention Needed=Light Blue, Healthy=Green.
- **Account_Status** — Select *(default: Active)*; options: Active, Renewal Pending, At Risk, Churned, Expired.
- **Health_Score_Trend_30d** and **Health_Score_Change_Flag** rely on `Account_Master_History`.

#### Geography & Contacts
- **Geography** — Select *(EMEA, Americas, APAC)*
- **Country**, **Primary_Contact_Name**, **Primary_Contact_Email** *(Email)*, **Primary_Contact_Role**
- **Last_Engagement_Date** — Date  
  - Formula:: `Max(Filter([Engagement_Log], [Account].[Account_ID] = thisRow.[Account_ID]).[Engagement_Date])`
- **Engagement_Cadence_Days** — Number  
  - Formula:: `Switch([Contract_Type], "Signature Success", 14, "Premier Success", 30, 60)`
- **Next_Engagement_Due** — Date  
  - Formula:: `[Last_Engagement_Date] + [Engagement_Cadence_Days]`

#### System Metadata
- **Created_Date** — DateTime *(auto created)*
- **Last_Modified** — DateTime *(auto modified)*
- **Data_Source** — Select *(Salesforce Sync, Manual Entry, Slack Import, Webhook, Email Import)*

### [[People_Team]]
> [!summary] Directory of MuleSoft team members with portfolio rollups.

**Views**
- `All Team Members` sorted by `Full_Name`.
- `By Role` grouped by `Role`.
- `By Portfolio Size` sorted by `Total_ARR_Managed` descending.

**Columns**
- **Person_ID** — Text *(Row ID)*; Formula:: `"PER-" & Format(thisRow.RowNumber(), "00000")`
- **Full_Name** — Text *(required)*
- **Email** — Email *(required, unique)*
- **Role** — Select *(CSM, AE, SE, Executive Sponsor, Product Manager, Customer Contact, Support Engineer)*
- **Department** — Select *(Customer Success, Sales, Solutions Engineering, Product, Support, Executive, Customer External)*
- **Region** — Select *(EMEA, Americas, APAC)*
- **Slack_User_ID** — Text *(for mentions)*
- **Active_Status** — Checkbox *(default true)*
- **Accounts_Assigned** — Relation *(multi)* to `Account_Master`
- **Account_Count** — Number; Formula:: `[Accounts_Assigned].Count()`
- **Total_ARR_Managed** — Currency; Formula:: `[Accounts_Assigned].[ARR].Sum()`
- **Avg_Health_Score** — Number; Formula:: `[Accounts_Assigned].[Health_Score].Average()`

### [[Business_Context]]
> [!summary] Strategic situational analysis linked 1:1 with each account.

**Views**: `All Contexts`, `By Digital Maturity`.

**Columns**
- **Context_ID** — Text *(Row ID)*; Formula:: `"CTX-" & Format(thisRow.RowNumber(), "00000")`
- **Account** — Relation *(single, required)* to `Account_Master`
- **Last_Updated** — DateTime *(auto modified)*
- **Updated_By** — Person *(auto current user)*
- **Business_Model** — Text
- **Market_Position** — Select *(Market Leader, Challenger, Emerging Player, Niche Specialist)*
- **Operating_Environment**, **Key_Business_Challenges**, **Strategic_Priorities_Current_Year** — Canvas fields
- **Digital_Maturity** — Select *(Digital Native, Transforming, Traditional, Legacy)*
- **IT_Complexity_Score** — Slider *(1–10, default 5)*
- **Legacy_System_Count** — Number
- **Cloud_Strategy** — Select *(Cloud-First, Hybrid, On-Premise Preferred, Multi-Cloud)*
- **Data_Classification** — Select *(Highly Regulated (GDPR/HIPAA), Standard, Open)*

### [[Strategic_Objectives]]
> [!summary] Quantified customer objectives showing MuleSoft influence.

**Views**: `All Objectives`, `By Status`, `By Strategic Pillar`, `At Risk`, `High Impact`.

**Columns**
- **Objective_ID** — Text *(Row ID)*; `"OBJ-" & Format(thisRow.RowNumber(), "00000")`
- **Account** — Relation *(single, required)* to `Account_Master`
- **Strategic_Pillar** — Select *(Revenue Growth, Cost Optimization, Customer Experience, Operational Resilience, Innovation Velocity, Risk Mitigation, Sustainability/ESG, Market Expansion, Compliance/Regulatory)* *(indexed)*
- **Objective_Name** — Text *(required)*
- **Description** — Canvas
- **Business_Driver** — Text
- **Quantified_Goal** — Text *(required)*
- **Target_Date** — Date
- **Business_Owner** — Text
- **Business_Value_USD** — Currency
- **MuleSoft_Relevance** — Select *(Critical Enabler, Supporting, Adjacent, Not Applicable)* *(required)*
- **Status** — Select *(default `Not Started`)*; options: Not Started, Planning, In Progress, At Risk, Achieved, Blocked, Cancelled
- **Progress_Percent** — Slider *(0–100)*
- **Health_Indicator** — Text; Formula:: `If([Status] = "At Risk", "🔴 Risk", If([Status] = "Achieved", "🟢 Complete", If([Status] = "In Progress", "🟡 Active", "⚪ Pending")))`
- **Last_Review_Date** — Date
- **Notes** — Canvas
- **Linked_Capabilities** — Relation *(multi)* to `MuleSoft_Capabilities`
- **Linked_Value_Streams** — Relation *(multi)* to `Value_Streams`
- **Linked_Initiatives** — Relation *(multi)* to `Initiatives`
- **MuleSoft_Impact_Score** — Number  
  - Formula:: `[Linked_Capabilities].Count() * [Linked_Value_Streams].[Supporting_APIs].Count() * ([Business_Value_USD] / 1,000,000)`

### [[MuleSoft_Capabilities]]
> [!summary] Capability maturity and gap analysis per account.

**Views**: `All Capabilities`, `By Gap Status`, `Critical Gaps`, `By Priority`.

**Columns**
- **Capability_ID** — Text *(Row ID)*; `"CAP-" & Format(thisRow.RowNumber(), "00000")`
- **Account** — Relation *(single, required)* to `Account_Master`
- **Capability_Domain** — Select *(Integration, API Management, Automation, Data Governance, Security, DevOps, Analytics, Event-Driven Architecture)* *(required, indexed)*
- **Capability_Name** — Text *(required)*
- **Description** — Canvas
- **Current_Maturity** — Select *(1-Initial … 5-Optimizing)* *(required)*
- **Current_Maturity_Numeric** — Number; `Switch([Current_Maturity], "1-Initial", 1, ... , "5-Optimizing", 5)`
- **Target_Maturity** — Select *(same options)*
- **Target_Maturity_Numeric** — Number; same switch formula referencing `Target_Maturity`
- **Maturity_Gap** — Number; `[Target_Maturity_Numeric] - [Current_Maturity_Numeric]`
- **Gap_Status** — Text; emoji logic:
  - `If([Maturity_Gap] >= 3, "🔴 Critical Gap", If([Maturity_Gap] = 2, "🟡 Moderate Gap", If([Maturity_Gap] = 1, "🟢 Small Gap", "✅ At Target")))`
  - Apply color formatting (red/yellow/light green/green).
- **Linked_Strategic_Objectives** — Relation *(multi)* to `Strategic_Objectives`
- **Supporting_Value_Streams** — Relation *(multi)* to `Value_Streams`
- **Investment_Required_USD** — Currency
- **Priority** — Select *(P0-Critical, P1-High, P2-Medium, P3-Low)* *(required)*
- **Implementation_Status** — Select *(Not Started, Planning, In Progress, Operational, Needs Enhancement, Blocked)* *(default Not Started)*
- **Business_Impact_Statement** — Text
- **Technical_Owner_Customer** — Text
- **Last_Assessment_Date** — Date

### [[Value_Streams]]
> [!summary] Business process value streams with quantified improvements.

**Views**: `All Value Streams`, `By Business Value`, `High Impact`.

**Columns**
- **Stream_ID** — Text *(Row ID)*; `"VS-" & Format(thisRow.RowNumber(), "00000")`
- **Account** — Relation *(single, required)* to `Account_Master`
- **Value_Stream_Name** — Text *(required)*
- **Business_Process** — Text *(required)*
- **Process_Owner** — Text
- **Linked_Strategic_Objectives** — Relation *(multi)*
- **Enabled_MuleSoft_Capabilities** — Relation *(multi)*
- **Integration_Endpoints**, **APIs_Consumed**, **Annual_Transaction_Volume** — Number
- **Cycle_Time_Baseline_Hours**, **Cycle_Time_Current_Hours**, **Cycle_Time_Target_Hours** — Number
- **Cycle_Time_Reduction_Percent** — Number *(1 decimal, suffix %)*  
  - Formula:: `If([Cycle_Time_Baseline_Hours] > 0, (([Cycle_Time_Baseline_Hours] - [Cycle_Time_Current_Hours]) / [Cycle_Time_Baseline_Hours]) * 100, 0)`
- **Cycle_Time_Progress_Indicator** — Text; `If([Cycle_Time_Current_Hours] <= [Cycle_Time_Target_Hours], "🟢 Target Met", If([Cycle_Time_Reduction_Percent] >= 50, "🟡 Progressing", "🔴 Needs Improvement"))`
- **Cost_Per_Transaction_Before_USD**, **Cost_Per_Transaction_After_USD** — Currency
- **Annual_Cost_Savings_USD** — Currency; `If([Cost_Per_Transaction_Before_USD] > 0 AND [Annual_Transaction_Volume] > 0, ([Cost_Per_Transaction_Before_USD] - [Cost_Per_Transaction_After_USD]) * [Annual_Transaction_Volume], 0)`
- **Revenue_Impact_USD** — Currency
- **Total_Business_Value_USD** — Currency; `[Annual_Cost_Savings_USD] + [Revenue_Impact_USD]`
- **Customer_Satisfaction_Score** — Slider *(1–10)*
- **Operational_Risk_Level** — Select *(Critical, High, Medium, Low)*

### [[API_Portfolio]]
> [!summary] Technical asset inventory with business criticality indicators.

**Views**: `All APIs`, `By Health Status`, `Critical APIs`, `Unhealthy APIs`, `By Business Value`.

**Columns**
- **API_ID** — Text *(Row ID, required, unique)*; value from Anypoint Exchange.
- **Account** — Relation *(single, required)* to `Account_Master`
- **API_Name** — Text *(required)*
- **API_Type** — Select *(System, Process, Experience)* *(required)*
- **API_Version** — Text
- **Business_Capability** — Text
- **Environment** — Select *(Production, Sandbox, Development)* *(required)*
- **Linked_Value_Streams** — Relation *(multi)*
- **Linked_Strategic_Objectives** — Relation *(multi)*
- **Monthly_Transactions** — Number
- **Annual_Transaction_Volume** — Number; `[Monthly_Transactions] * 12`
- **Consuming_Applications** — Number
- **Avg_Response_Time_ms** — Number
- **SLA_Target_ms** — Number
- **SLA_Compliance_Percent** — Number *(1 decimal, %)*  
  - Formula:: `If([Avg_Response_Time_ms] <= [SLA_Target_ms], 100, Max(0, 100 - (([Avg_Response_Time_ms] - [SLA_Target_ms]) / [SLA_Target_ms]) * 100))`
- **Error_Rate_Percent** — Number *(2 decimals, %)*; `(failed / total) * 100`
- **Uptime_Percent** — Number *(2 decimals, %)*; last 30 days.
- **Revenue_Attribution_USD** — Currency
- **Business_Criticality** — Text; multi-criteria formula distinguishing Mission-Critical/High/Medium/Low with badge formatting.
- **Business_Value_Score** — Number  
  - Formula:: `([Monthly_Transactions] / 1000) * [Consuming_Applications] * ([SLA_Compliance_Percent] / 100)`
- **Health_Status** — Text; `If([Uptime_Percent] < 99.5 OR [Error_Rate_Percent] > 1, "🔴 Critical", If([SLA_Compliance_Percent] < 95, "🟡 Degraded", "🟢 Healthy"))`
- **Owner_Team** — Text
- **Documentation_Quality** — Select *(Excellent, Good, Needs Improvement, Missing)*
- **Last_Deployed_Date** — Date
- **Last_Sync_From_Anypoint** — DateTime *(auto modified)*

### [[Platform_Health_Metrics]]
> [!summary] Operational KPI repository with automated alerting.

**Views**: `All Metrics`, `By Health Status`, `Critical Metrics`, `Alerts`.

**Columns**
- **Metric_ID** — Text *(Row ID)*; `"MET-" & Format(thisRow.RowNumber(), "000001")`
- **Account** — Relation *(single, required)* to `Account_Master`
- **Metric_Category** — Select *(Performance, Reliability, Adoption, Efficiency, Quality, Security, Governance, Cost)* *(required, indexed)*
- **Metric_Name** — Text *(required, indexed)*
- **Metric_Type** — Select *(Technical, Business, Operational)* *(required)*
- **Unit** — Text *(required)*
- **Measurement_Frequency** — Select *(Real-time, Hourly, Daily, Weekly, Monthly)* *(required)*
- **Current_Value**, **Target_Value**, **Threshold_Warning**, **Threshold_Critical** — Number *(all required)*
- **Health_Status** — Text; `If([Current_Value] >= [Target_Value] * 0.95, "🟢 On Track", If([Current_Value] >= [Threshold_Warning], "🟡 Needs Attention", "🔴 Critical"))` with color formatting.
- **Health_Status_Numeric** — Number; `Switch([Health_Status], "🟢 On Track", 100, "🟡 Needs Attention", 70, "🔴 Critical", 30)`
- **Trend_30d_Change** — Number; `[Current_Value] - Lookup([Platform_Health_Metrics_History], [Metric_ID] = thisRow.[Metric_ID] AND [Date] = Today() - 30).[Current_Value]`
- **Trend_Direction** — Text; arrow logic based on Trend change.
- **Trend_Is_Good** — Checkbox *(manual input to express whether increasing value is desirable)*
- **Alert_Status** — Text; `If([Health_Status] = "🔴 Critical" AND [Trend_Direction] = "⬇️ Decreasing" AND [Trend_Is_Good] = False, "🚨 Urgent", If([Health_Status] = "🔴 Critical", "⚠️ Alert", ""))`
- **Last_Measured** — DateTime *(auto modified)*
- **Linked_Capability** — Relation *(single)* to `MuleSoft_Capabilities`
- **Linked_Strategic_Objective** — Relation *(single)* to `Strategic_Objectives`
- **Data_Source** — Select *(Anypoint Analytics, Runtime Manager, Exchange, Custom Script, Manual Entry, Webhook)* *(required)*
- **Business_Impact_Statement** — Text

### [[Initiatives]]
> [!summary] Tracks investments, phases, ROI, and owners.

**Views**: `All Initiatives`, `By Status`, `By Priority`, `In Progress`, `Overdue`, `High ROI`.

**Columns**
- **Initiative_ID** — Text *(Row ID)*; `"INI-" & Format(thisRow.RowNumber(), "00000")`
- **Account** — Relation *(single, required)*
- **Initiative_Name** — Text *(required)*
- **Initiative_Type** — Select *(Platform Migration, Capability Development, Governance Enhancement, Monitoring/Observability, Training/Enablement, Technical Debt Remediation, API Development, Integration Project)* *(required)*
- **Proposed_By** — Select *(Customer, CSM, SE, AE, Both)* *(required)*
- **Linked_Strategic_Objectives**, **Linked_Capabilities** — Relation *(multi)*
- **Business_Driver** — Text
- **Priority** — Select *(P0-Critical … P3-Low)* *(required)*
- **Phase** — Select *(Discovery, Planning, Design, Build, Test, Deploy, Monitor, Closed)* *(default Discovery)*
- **Status** — Select *(Proposed, Approved, In Progress, On Hold, Completed, Cancelled)* *(default Proposed)*
- **Status_Color** — Text; `Switch([Status], "Completed", "🟢", "In Progress", "🟡", "On Hold", "🟠", "Cancelled", "⚫", "🔵")`
- **Start_Date**, **Target_Completion_Date**, **Actual_Completion_Date** — Date
- **Days_Overdue** — Number; `If(IsBlank([Actual_Completion_Date]) AND Today() > [Target_Completion_Date], Today() - [Target_Completion_Date], 0)`
- **On_Time_Flag** — Text; `If([Days_Overdue] > 30, "🔴 Severely Delayed", If([Days_Overdue] > 7, "🟡 Delayed", If([Status] = "Completed", "🟢 On Time", "")))`
- **Investment_Amount_USD**, **MuleSoft_Services_USD**, **Customer_Investment_USD**, **Expected_Annual_Benefit_USD**, **Realized_Annual_Benefit_USD** — Currency
- **Expected_Payback_Months** — Number *(1 decimal)*; `If([Expected_Annual_Benefit_USD] > 0, [Investment_Amount_USD] / ([Expected_Annual_Benefit_USD] / 12), 0)`
- **Three_Year_ROI_Percent** — Number *(0 decimals, %)*; `If([Investment_Amount_USD] > 0, ((([Expected_Annual_Benefit_USD] * 3) - [Investment_Amount_USD]) / [Investment_Amount_USD]) * 100, 0)`
- **Success_Criteria**, **Blockers**, **Notes**, **Next_Milestone** — Canvas/Text combination
- **Owner_MuleSoft** — Person lookup to `People_Team`
- **Owner_Customer** — Text
- **Last_Update_Date** — Date

### [[Risk_Register]]
> [!summary] Catalog of technical and operational risks.

**Views**: `All Risks`, `By Risk Level`, `Critical & High`, `Open Risks`.

**Columns**
- **Risk_ID** — Text *(Row ID)*; `"RISK-" & Format(thisRow.RowNumber(), "00000")`
- **Account** — Relation *(single, required)*
- **Risk_Category** — Select *(Technical Debt, Platform Risk, Security, Compliance, Performance, Scalability, Knowledge Gap, Vendor Dependency)* *(required)*
- **Risk_Title** — Text *(required)*
- **Description**, **Root_Cause**, **Mitigation_Strategy** — Canvas
- **Affected_Capability** — Relation *(single)* to `MuleSoft_Capabilities`
- **Affected_APIs** — Relation *(multi)* to `API_Portfolio`
- **Affected_Value_Streams** — Relation *(multi)* to `Value_Streams`
- **Linked_Strategic_Objective_at_Risk** — Relation *(multi)* to `Strategic_Objectives`
- **Impact** — Select *(Critical, High, Medium, Low)* *(required)*
- **Impact_Score_1_5** — Number; `Switch([Impact], "Critical", 5, "High", 4, "Medium", 3, "Low", 2)`
- **Probability** — Select *(Very Likely (>75%), Likely (50-75%), Possible (25-50%), Unlikely (<25%))* *(required)*
- **Probability_Score_1_5** — Number; similar switch
- **Risk_Score** — Number; `[Impact_Score_1_5] * [Probability_Score_1_5]`
- **Risk_Level** — Text; `If([Risk_Score] >= 20, "Critical", If([Risk_Score] >= 12, "High", If([Risk_Score] >= 6, "Medium", "Low")))` with conditional formatting.
- **Potential_Business_Impact_USD** — Currency
- **Potential_Business_Impact_Operational** — Text
- **Mitigation_Initiative** — Relation *(single)* to `Initiatives`
- **Mitigation_Owner** — Person lookup (`People_Team`)
- **Target_Resolution_Date**, **Date_Identified**, **Date_Closed** — Date
- **Status** — Select *(Open, In Progress, Mitigated, Accepted, Closed)* *(required)*

### [[Stakeholder_Outcomes]]
> [!summary] Persona-based success metrics and progress.

**Views**: `All Outcomes`, `By Status`, `Achieved`.

**Columns**
- **Outcome_ID** — Text *(Row ID)*; `"OUT-" & Format(thisRow.RowNumber(), "00000")`
- **Account** — Relation *(single, required)*
- **Stakeholder_Type** — Select *(External Customer, Internal Business Unit, Partner, Regulator, End User, Executive Leadership)* *(required)*
- **Stakeholder_Name**, **Stakeholder_Role** — Text
- **Outcome_Statement** — Text *(required; format “As a...”)*
- **Linked_Strategic_Objective** — Relation *(single)*
- **Linked_Value_Stream** — Relation *(single)*
- **Linked_API_Services** — Relation *(multi)* to `API_Portfolio`
- **Success_Metric_Name** — Text
- **Baseline_Value**, **Current_Value**, **Target_Value** — Number
- **Unit** — Text
- **Improvement_Percent** — Number *(1 decimal, %)*; `(([Current_Value] - [Baseline_Value]) / [Baseline_Value]) * 100`
- **Target_Achievement_Percent** — Number *(0 decimals, %)*; `(([Current_Value] - [Baseline_Value]) / ([Target_Value] - [Baseline_Value])) * 100`
- **Status** — Text; `If([Target_Achievement_Percent] >= 100, "Achieved", If([Target_Achievement_Percent] >= 75, "On Track", "Needs Attention"))` with conditional colors.
- **Measurement_Method** — Text
- **Last_Measured** — Date
- **Measurement_Frequency** — Select *(Monthly, Quarterly, Annual)*

### [[Engagement_Log]]
> [!summary] Interaction history with sentiment and depth scoring.

**Views**: `All Engagements`, `By Account`, `Recent` (≥ Today() - 90), `QBRs`.

**Columns**
- **Engagement_ID** — Text *(Row ID)*; `"ENG-" & Format(thisRow.RowNumber(), "00000")`
- **Account** — Relation *(single, required)*
- **Engagement_Date** — Date *(required)*
- **Engagement_Type** — Select *(QBR, Executive Sponsor Call, Technical Review, Health Check, Training, Workshop, Success Plan Review, Escalation)* *(required)*
- **Attendees_MuleSoft** — Person *(multi)* lookup to `People_Team`
- **Attendees_Customer** — Text *(comma-separated)*
- **Customer_Seniority** — Select *(C-Level, VP, Director, Manager, IC)*
- **Topics_Discussed**, **Action_Items**, **Next_Steps**, **Notes** — Canvas
- **Sentiment** — Select *(Very Positive, Positive, Neutral, Concerned, Very Concerned)* *(required)*
- **Strategic_Alignment_Score**, **Technical_Health_Score**, **Relationship_Depth_Score** — Slider *(1–10)*
- **Next_Engagement_Date** — Date

### Supporting History & Reference Tables
> [!tip]
> Create auxiliary tables to support trend formulas and governance.
- `Account_Master_History` — Stores `Account_ID`, snapshot `Date`, `Health_Score`, `Health_Score_Trend_30d`.
- `Platform_Health_Metrics_History` — Stores `Metric_ID`, `Date`, `Current_Value`.
- Optional reference tables for picklist values to simplify updates.

### Sample Data – Gard AS Pilot
1. Add `Gard AS` to `Account_Master` with provided metadata (industry, contract dates, ARR, geography, etc.). Assign `Customer_Success_Manager` from `People_Team`.
2. Insert two `Strategic_Objectives` tied to Gard AS:
   - **Manage Geopolitical Volatility** (Risk Mitigation) – goal, target date, $50M value, Critical Enabler, In Progress (75%).
   - **Lead Green Transition** (Innovation Velocity) – goal, $25M value, Supporting, On Track (88%).
3. Populate `Value_Streams` with **War Risk Quoting** metrics (integration endpoints, cycle times, costs, revenue impact, satisfaction, risk level).
4. Expand with sample entries for `MuleSoft_Capabilities`, `Platform_Health_Metrics`, `Stakeholder_Outcomes`, and `Engagement_Log` to validate formulas.

---

## Phase 2 – Integrations & Automation
> [!warning] Securely store all third-party credentials (Slack, Anypoint, Zapier) using Coda Packs “Secrets” or a locked reference table before enabling automations.

### Slack Bot Integration
1. **Create Slack App**
   - App Name: *MuleSoft CS Bot*.
   - Scopes: `chat:write`, `commands`, `users:read`.
   - Install to workspace; store Bot User OAuth token.
2. **Slash Commands**
   - `/mulesoft-update`, `/mulesoft-health`, `/mulesoft-sync`.
   - Request URL → `https://coda.io/apis/v1/docs/{docId}/hooks/automation/{automationId}`.
3. **Coda Webhook “Slack Command Handler”**
   - Parse payload → extract `account_name`, `metric_name`, `value`.
   - Lookup `Account_Master` by `Account_Name`; return error if missing.
   - Upsert `Platform_Health_Metrics` row (account + metric name); create defaults if new.
   - Update `Current_Value`, stamp `Last_Measured`.
   - Fetch updated `Health_Score`; respond via Slack (response URL or `chat.postMessage`).
   - Log activity in optional `Automation_Logs` table for auditing.

### Anypoint Platform Sync
1. **Connected App**
   - Create *Coda CS Platform* with scopes: View Assets, View API Manager, View Cloudhub Applications.
   - Grant type: Client Credentials → store Client ID/Secret.
2. **Button `Sync from Anypoint`** (on `Account_Master`)
   - Parameters: `Account`, `Anypoint_Org_ID`, `Sync_Scope` (APIs Only, APIs + Metrics, Full Sync).
   - Steps:
     1. Authenticate via OAuth token endpoint → save `access_token`.
     2. GET Exchange assets → upsert `API_Portfolio`; flag new APIs as `Needs Manual Mapping`.
     3. If scope includes metrics: iterate account APIs → query Analytics events (30 days) → compute transactions, avg response time, error rate → update portfolio row.
     4. Display summary modal with counts (synced, new, metrics updated).
3. **Automation “Daily Anypoint Sync”**
   - Trigger: daily 01:00 UTC.
   - Action: iterate `Account_Master` where `Account_Status = "Active"` → invoke button with `Full Sync`.

### Email Parser (Tableau Reports)
1. **Zapier Flow**
   - Trigger: Gmail new email where `from:tableau-reports@company.com subject:"Anypoint Daily Metrics"`.
   - Action: Gmail download CSV attachment.
   - Action: Code by Zapier (Python) → parse CSV to JSON payload `{ account, metric_name, value, timestamp }`.
   - Action: Webhooks by Zapier → POST to Coda webhook.
2. **Coda Webhook “Process Tableau Metrics”**
   - Parse JSON; iterate metrics.
   - Upsert `Platform_Health_Metrics` row (account + metric name).
   - Update `Current_Value`, `Last_Measured`.
   - Post Slack notification: `@channel Daily metrics updated. {count} metrics processed.`

---

## Automations & Alerts

### Renewal Risk Detector
- Schedule: daily 08:00 local time per CSM region.
- Condition: `Health_Score < 70` AND `Days_To_Renewal < 180`.
- Actions:
  1. Set `Renewal_Risk_Level = "At Risk"` (preserve Critical overrides).
  2. Slack message to `#customer-success-alerts` referencing `CSM`/`AE` Slack IDs from `People_Team`.
  3. Create task row (“Address renewal risk for {Account_Name}”) due `Today()+2`, priority High.

### API Health Monitor
- Trigger: `API_Portfolio.Health_Status` changes to `🔴 Critical` or `🟡 Degraded`.
- Conditional: `Business_Criticality = "Mission-Critical"`.
- Actions:
  1. Slack alert to `#platform-health` with uptime, error rate, revenue at risk.
  2. Insert `Risk_Register` entry (Category Performance, Impact Critical, Status Open).

### Daily Health Score Refresh
- Trigger: daily 02:00 UTC.
- Loop through active accounts:
  - Ensure formulas recalc (Coda auto).
  - Append snapshot to `Account_Master_History`.
  - If `Health_Score` drop >10 vs 30-day prior → send critical alert.
  - If `Health_Score < 60` → send urgent notification to assigned CSM.

---

## Dashboards & Power Views

### CSM Command Center (Card View on `Account_Master`)
- Filters: `Customer_Success_Manager = CurrentUser()` AND `Account_Status = "Active"`.
- Group by `Renewal_Risk_Level` (Critical → Healthy).
- Card fields: `Account_Name`, `Health_Score` (gauge), `Renewal_Risk_Level`, `Days_To_Renewal`, `ARR`, `Last_Engagement_Date`.
- Card actions: `View Details`, `Log Engagement`, `Generate QBR`.
- Styling: red border + pulse for Critical, yellow for At Risk, blue for Attention, green for Healthy.

### Strategic Alignment Board (Kanban on `Strategic_Objectives`)
- Filters: account selection control; `MuleSoft_Relevance` ∈ {Critical Enabler, Supporting}.
- Columns: Not Started → Planning → In Progress → At Risk (red header) → Achieved (green header).
- Card metadata: `Objective_Name`, `Strategic_Pillar`, `Progress_Percent`, `Business_Value_USD`, `Target_Date`, `Health_Indicator`, `Linked_Capabilities.Count()`, `Linked_Value_Streams.Count()`.
- Sidebar (canvas formula) summarizing totals, % achieved, total business value, value at risk.

### Platform Health Dashboard (`Platform_Health_Metrics`)
- **Section 1 – KPI Tiles**: overall health score, APIs in production, critical alerts, avg SLA compliance.
- **Section 2 – Metrics Table**: columns `Metric_Name`, `Current_Value`, `Target_Value`, `Health_Status`, `Trend_Direction`, `Last_Measured` with row coloring.
- **Section 3 – API Heatmap**: join to `API_Portfolio`; columns `Uptime`, `SLA Compliance`, `Error Rate`, `Business Criticality`; cell color rules for quick scan.

---

## Button Automations

### Generate QBR Deck
1. Parameters: `Account`, `Date_Range_Start` (default Today-180), `Date_Range_End` (default Today), `Include_Appendix` (true), `Export_Format` (PowerPoint/PDF default PowerPoint).
2. Data collection:
   - `Strategic_Objectives` (non-cancelled) → progress distribution & achievement %.
   - `Platform_Health_Metrics` → top 5 by `Business_Impact_Statement`.
   - `Initiatives` completed within date range → totals for investment/benefit/ROI.
   - `Stakeholder_Outcomes` with high achievement.
   - `Value_Streams` top 3 by `Total_Business_Value_USD`.
   - `Risk_Register` open Critical/High.
3. Generate deck using preferred Coda Pack template (Slides/PowerPoint) following 12-slide outline.
4. Upload to account attachments → filename `{Account_Name}_QBR_{Today()}.pptx`.
5. Present modal with preview, download, email actions.

### Calculate Platform ROI
1. Parameters: `Account`, `Time_Period` (Last 6M/12M/3Y/All Time), `Include_In_Progress` (default false).
2. Determine date range via `Switch`.
3. Aggregate investments:
   - Completed initiatives within range.
   - Include in-progress if toggle selected (pro-rated by `Progress_Percent`).
4. Compute benefits (realized + expected).
5. Derive ROI metrics: Simple ROI, Payback Months, 3-Year ROI, NPV @10%.
6. Render charts: investment vs benefit (bar), cumulative ROI (line), benefit share by initiative type (pie).
7. Compose PDF report (Docs/Slides Pack) and show summary modal with download/email options.

---

## Testing & Validation Checklist
- [ ] **Tables**: All 12 core tables plus history sets exist with correct schema, formulas, relations.
- [ ] **Sample Data**: Gard AS scenario populates successfully; derived metrics (health score, cycle time reduction) compute correctly.
- [ ] **Views**: Risk, health, and dashboard views show accurate filtered content.
- [ ] **Slack Commands**: `/mulesoft-update`, `/mulesoft-health`, `/mulesoft-sync` respond within 3s and update Coda.
- [ ] **Anypoint Sync**: Button and daily automation authenticate, upsert APIs, refresh metrics.
- [ ] **Email Parser**: Zapier flow parses CSV, updates metrics, posts Slack notification.
- [ ] **Renewal Risk Detector**: Daily run updates risk level, posts alert, creates task.
- [ ] **API Health Monitor**: Mission-critical degradation triggers Slack alert + risk record.
- [ ] **Health Score Refresh**: Snapshots appended, drop thresholds trigger notifications.
- [ ] **Buttons**: QBR deck attaches correctly; ROI calculator outputs charts + PDF.
- [ ] **Performance**: Health score recalcs <2s; dashboards render <3s; buttons finish <30s or show progress.

---

## Deployment & Enablement
> [!check] Prerequisites
> - Coda Team/Enterprise workspace with Packs + Automations.
> - Slack workspace with admin rights.
> - Anypoint Platform credentials (Connected App).
> - Zapier account for email parsing.

**Timeline**: Phase 1 (8–12h) → Phase 2 (12–16h) → Testing (4–6h). Total 24–34h.

**Rollout Steps**
1. Train CSMs on data entry, automations, dashboards.
2. Populate three pilot accounts; shadow usage for two weeks.
3. Run a pilot QBR using generated deck; gather feedback.
4. Iterate on schema/automations; extend to full portfolio.

---

## Governance & Maintenance
- Maintain reference tables for select options to simplify updates.
- Store API tokens & Slack secrets using secure Coda Packs.
- Restrict edit rights on financial/automation sections; leverage doc locking.
- Create weekly export automation (CSV to cloud storage) for backup.
- Log automation executions in `Automation_Logs` table for observability.
- Review automations quarterly to align with evolving business logic.
