## MuleSoft Customer Success Intelligence Platform v3.0

This document captures the end-to-end implementation blueprint for building the MuleSoft Customer Success Intelligence Platform (CSIP) inside a Coda workspace. It translates the functional specification into an execution-ready plan covering schema design, automations, integrations, testing, and deployment guidance.

The platform is split into two phases:
- **Phase 1 (Priority 1)** – Stand up the Coda database foundation with 12 linked tables, views, and sample data.
- **Phase 2 (Priority 2)** – Layer on external integrations, webhooks, automations, and advanced button workflows.

---

## Phase 1 – Database Foundation

### Table 1 – `Account_Master` (Hub)
Primary record for every customer account. All other tables link back here. Create default view “All Accounts” sorted by `Account_Name`, plus three additional views:
- `By CSM` – grouped by `Customer_Success_Manager`.
- `Renewal Risk` – filtered where `Renewal_Risk_Level` ∈ {Critical, At Risk}, sorted by `Days_To_Renewal`.
- `Health Score` – sorted by `Health_Score` ascending.

| # | Column | Type | Required? | Formula / Config | Notes |
|---|--------|------|-----------|------------------|-------|
|1|`Account_ID`|Text (Row ID)|Yes|`"ACC-" & Format(thisRow.RowNumber(), "00000")`|Set as row identifier.|
|2|`Account_Name`|Text|Yes|Unique constraint|Customer name.|
|3|`Industry_Vertical`|Select|Yes|Options: Maritime, Financial Services, Healthcare, Retail, Manufacturing, Energy, Public Sector, Technology, Telecommunications| |
|4|`Industry_Sub_Sector`|Text| | | |
|5|`Contract_Type`|Select|Yes|Options: Signature Success, Premier Success, Standard| |
|6|`Contract_Start_Date`|Date|Yes| | |
|7|`Contract_End_Date`|Date|Yes| | |
|8|`Renewal_Date`|Date|Yes| | |
|9|`Days_To_Renewal`|Number| |`[Renewal_Date] - Today()`|Displays negative when past due.|
|10|`ARR`|Currency|Yes| |Annual Recurring Revenue.|
|11|`ACV`|Currency| | |Annual Contract Value.|
|12|`Customer_Success_Manager`|People (lookup `People_Team`)|Yes| |Single relation.|
|13|`Account_Executive`|People (lookup `People_Team`)| | | |
|14|`Solutions_Architect`|People (lookup `People_Team`)| | | |
|15|`Executive_Sponsor_MuleSoft`|People (lookup `People_Team`)| | | |
|16|`Health_Score`|Number (1 decimal)| |`([Platform_Technical_Health] * 0.35) + ([Business_Value_Realization] * 0.30) + ([Stakeholder_Engagement] * 0.20) + ([Strategic_Alignment] * 0.15)`|Composite 0–100.|
|17|`Platform_Technical_Health`|Number| |`Average(Filter([Platform_Health_Metrics], [Account].[Account_ID] = thisRow.[Account_ID] AND [Metric_Category].HasAny("Performance", "Reliability", "Security")).[Health_Status_Numeric])`|Returns blank if no metrics; optionally wrap with `IfError`.|
|18|`Business_Value_Realization`|Number| |`Average(Filter([Stakeholder_Outcomes], [Account].[Account_ID] = thisRow.[Account_ID] AND [Status] != "Not Started").[Target_Achievement_Percent])`| |
|19|`Stakeholder_Engagement`|Number| |`Average(Filter([Engagement_Log], [Account].[Account_ID] = thisRow.[Account_ID] AND [Engagement_Date] >= Today() - 90).[Relationship_Depth_Score])`| |
|20|`Strategic_Alignment`|Number| |`(CountIf([Strategic_Objectives], [Account].[Account_ID] = thisRow.[Account_ID] AND [Status].HasAny("On Track", "Achieved")) / CountIf([Strategic_Objectives], [Account].[Account_ID] = thisRow.[Account_ID])) * 100`|Use `If()` guard for divide-by-zero.|
|21|`Health_Score_Trend_30d`|Number| |`[Health_Score] - Lookup([Account_Master_History], [Account_ID] = thisRow.[Account_ID] AND [Date] = Today() - 30).[Health_Score]`|Requires history table.|
|22|`Health_Score_Change_Flag`|Text| |`If([Health_Score_Trend_30d] < -5, "🔴 Declining", If([Health_Score_Trend_30d] > 5, "🟢 Improving", "→ Stable"))`| |
|23|`Renewal_Risk_Level`|Text| |`If([Health_Score] < 60 AND [Days_To_Renewal] < 180, "Critical", If([Health_Score] < 70 AND [Days_To_Renewal] < 365, "At Risk", If([Health_Score] < 80, "Attention Needed", "Healthy")))`|Add conditional formatting per spec.|
|24|`Account_Status`|Select| |Options: Active, Renewal Pending, At Risk, Churned, Expired. Default = Active.| |
|25|`S&P_Rating`|Text| | | |
|26|`Customer_Annual_Revenue`|Currency| | | |
|27|`Employee_Count`|Number| | | |
|28|`Geography`|Select| |Options: EMEA, Americas, APAC| |
|29|`Country`|Text| | | |
|30|`Primary_Contact_Name`|Text| | | |
|31|`Primary_Contact_Email`|Email| | | |
|32|`Primary_Contact_Role`|Text| | | |
|33|`Last_Engagement_Date`|Date| |`Max(Filter([Engagement_Log], [Account].[Account_ID] = thisRow.[Account_ID]).[Engagement_Date])`| |
|34|`Next_Engagement_Due`|Date| |`[Last_Engagement_Date] + [Engagement_Cadence_Days]`| |
|35|`Engagement_Cadence_Days`|Number| |`Switch([Contract_Type], "Signature Success", 14, "Premier Success", 30, 60)`|Default logic.|
|36|`Created_Date`|DateTime| |Auto-created| |
|37|`Last_Modified`|DateTime| |Auto-modified| |
|38|`Data_Source`|Select| |Options: Salesforce Sync, Manual Entry, Slack Import, Webhook, Email Import| |

### Table 2 – `People_Team`
Team directory with roll-up metrics. Create default “All Team Members” view sorted by `Full_Name`, plus:
- `By Role` – grouped on `Role`.
- `By Portfolio Size` – sorted by `Total_ARR_Managed` descending.

| Column | Type | Details |
|--------|------|---------|
|`Person_ID`|Text (Row ID)|Formula: `"PER-" & Format(thisRow.RowNumber(), "00000")`.|
|`Full_Name`|Text|Required.|
|`Email`|Email|Required & unique.|
|`Role`|Select|Options: CSM, AE, SE, Executive Sponsor, Product Manager, Customer Contact, Support Engineer.|
|`Department`|Select|Options: Customer Success, Sales, Solutions Engineering, Product, Support, Executive, Customer External.|
|`Region`|Select|Options: EMEA, Americas, APAC.|
|`Slack_User_ID`|Text|Slack member identifier.|
|`Active_Status`|Checkbox|Default true.|
|`Accounts_Assigned`|Lookup (multi)|Relates to `Account_Master`. Reverse lookups show in account table people columns.|
|`Account_Count`|Number|Formula: `[Accounts_Assigned].Count()`.|
|`Total_ARR_Managed`|Currency|Formula: `[Accounts_Assigned].[ARR].Sum()`.|
|`Avg_Health_Score`|Number|Formula: `[Accounts_Assigned].[Health_Score].Average()`.|

### Table 3 – `Business_Context`
1:1 strategic context per account. Create “All Contexts” (default) and “By Digital Maturity” grouped view.

Columns:
- `Context_ID`: Row ID, `"CTX-" & Format(thisRow.RowNumber(), "00000")`.
- `Account`: Relation to `Account_Master` (single, required).
- `Last_Updated`: Auto modified time.
- `Updated_By`: Auto current user.
- `Business_Model`: Text.
- `Market_Position`: Select {Market Leader, Challenger, Emerging Player, Niche Specialist}.
- `Operating_Environment`, `Key_Business_Challenges`, `Strategic_Priorities_Current_Year`: Canvas fields.
- `Digital_Maturity`: Select {Digital Native, Transforming, Traditional, Legacy}.
- `IT_Complexity_Score`: Slider 1–10 (default 5).
- `Legacy_System_Count`: Number.
- `Cloud_Strategy`: Select {Cloud-First, Hybrid, On-Premise Preferred, Multi-Cloud}.
- `Data_Classification`: Select {Highly Regulated (GDPR/HIPAA), Standard, Open}.

### Table 4 – `Strategic_Objectives`
Track customer outcomes. Provide default, `By Status`, `By Strategic Pillar`, `At Risk`, and `High Impact` views (per filters). Key columns:

- `Objective_ID`: Row ID `"OBJ-" & Format(thisRow.RowNumber(), "00000")`.
- `Account`: Relation (`Account_Master`, single, required).
- `Strategic_Pillar`: Select list (indexed).
- `Objective_Name`: Text, required.
- `Description`: Canvas.
- `Business_Driver`: Text.
- `Quantified_Goal`: Text, required.
- `Target_Date`: Date.
- `Business_Owner`: Text.
- `Business_Value_USD`: Currency.
- `MuleSoft_Relevance`: Select {Critical Enabler, Supporting, Adjacent, Not Applicable}.
- `Status`: Select with default `Not Started`.
- `Progress_Percent`: Slider 0–100.
- `Health_Indicator`: `If([Status] = "At Risk", "🔴 Risk", If([Status] = "Achieved", "🟢 Complete", If([Status] = "In Progress", "🟡 Active", "⚪ Pending")))`.
- `Last_Review_Date`: Date.
- `Notes`: Canvas.
- `Linked_Capabilities`: Relation (multi) to `MuleSoft_Capabilities`.
- `Linked_Value_Streams`: Relation (multi) to `Value_Streams`.
- `Linked_Initiatives`: Relation (multi) to `Initiatives`.
- `MuleSoft_Impact_Score`: Number formula `([Linked_Capabilities].Count()) * ([Linked_Value_Streams].[Supporting_APIs].Count()) * ([Business_Value_USD] / 1,000,000)`. Adjust relation column names as needed.

### Table 5 – `MuleSoft_Capabilities`
Capability maturity with gap tracking. Views: `All Capabilities`, `By Gap Status`, `Critical Gaps`, `By Priority`.

Key columns include Row ID (`"CAP-"`), `Account`, `Capability_Domain`, `Capability_Name`, `Description`, `Current_Maturity`, `Current_Maturity_Numeric`, `Target_Maturity`, `Target_Maturity_Numeric`, `Maturity_Gap`, `Gap_Status` (emoji logic provided), linked relations, `Investment_Required_USD`, `Priority`, `Implementation_Status`, `Business_Impact_Statement`, `Technical_Owner_Customer`, and `Last_Assessment_Date`.

Numeric translation formula example:
```
Switch(
  [Current_Maturity],
  "1-Initial", 1,
  "2-Developing", 2,
  "3-Defined", 3,
  "4-Managed", 4,
  "5-Optimizing", 5
)
```

### Table 6 – `Value_Streams`
Business process instrumentation. Views: `All Value Streams`, `By Business Value`, `High Impact`.

Include columns for Row ID (`"VS-"...`), `Account`, `Value_Stream_Name`, `Business_Process`, `Process_Owner`, relations to objectives and capabilities, and KPI calculations:
- `Cycle_Time_Reduction_Percent`: `If([Cycle_Time_Baseline_Hours] > 0, (([Cycle_Time_Baseline_Hours] - [Cycle_Time_Current_Hours]) / [Cycle_Time_Baseline_Hours]) * 100, 0)`.
- `Cycle_Time_Progress_Indicator`: emoji logic.
- `Annual_Cost_Savings_USD`: multiply difference by volume.
- `Total_Business_Value_USD`: `[Annual_Cost_Savings_USD] + [Revenue_Impact_USD]`.

### Table 7 – `API_Portfolio`
API catalog with operational metrics. Views: `All APIs`, `By Health Status`, `Critical APIs`, `Unhealthy APIs`, `By Business Value`.

Important configuration:
- Row ID = `API_ID` (text, unique).
- `Account` relation.
- Columns covering metadata, environment, relations to `Value_Streams` and `Strategic_Objectives`.
- SLA formula: `If([Avg_Response_Time_ms] <= [SLA_Target_ms], 100, Max(0, 100 - (([Avg_Response_Time_ms] - [SLA_Target_ms]) / [SLA_Target_ms]) * 100))`.
- `Annual_Transaction_Volume` = `[Monthly_Transactions] * 12`.
- `Business_Criticality` conditional formula per specification.
- `Business_Value_Score`, `Health_Status`, `Owner_Team`, `Documentation_Quality`, `Last_Deployed_Date`, `Last_Sync_From_Anypoint`.

### Table 8 – `Platform_Health_Metrics`
Operational KPI store. Views: `All Metrics`, `By Health Status`, `Critical Metrics`, `Alerts`.

Use Row ID formula `"MET-" & Format(thisRow.RowNumber(), "000001")`. Configure relation fields (`Account`, `Linked_Capability`, `Linked_Strategic_Objective`) and formulas for health status, numeric conversions, trends (needing history table), alert logic, and data source select list.

### Table 9 – `Initiatives`
Investment & project tracker. Required views: `All Initiatives`, `By Status`, `By Priority`, `In Progress`, `Overdue`, `High ROI`.

Columns include Row ID (`"INI-"`...), relations, select fields for type/priority/phase/status, status color emoji, date tracking, calculations for overdue, ROI formulas, financial fields, owner lookups, narrative canvases, and last update fields.

### Table 10 – `Risk_Register`
Central risk log. Views: `All Risks`, `By Risk Level`, `Critical & High`, `Open Risks`.

Include Row ID (`"RISK-"...`), relations to accounts/capabilities/APIs/value streams/objectives, impact & probability select lists with numeric translations, risk scoring, risk level conditional formatting, business impact fields (currency & text), mitigation relations, owner lookups, and lifecycle dates.

### Table 11 – `Stakeholder_Outcomes`
Persona success metrics. Views: `All Outcomes`, `By Status`, `Achieved`.

Columns: Row ID (`"OUT-"...`), account relation, stakeholder classification fields, narrative statement, links to objectives/value streams/APIs, success metric fields (`Baseline_Value`, `Current_Value`, `Target_Value`, `Unit`), improvement calculations, achievement status, measurement meta, and measurement frequency (select {Monthly, Quarterly, Annual}).

### Table 12 – `Engagement_Log`
Relationship insights with sentiment scoring. Views: `All Engagements`, `By Account`, `Recent`, `QBRs`.

Columns: Row ID (`"ENG-"...`), `Account` relation, `Engagement_Date`, `Engagement_Type` select, attendees (Coda people & text), seniority, canvas note fields, sentiment select, slider scores for alignment/technical health/relationship depth, and `Next_Engagement_Date`.

### Supporting History Tables
Create supporting tables (not part of initial 12) to enable historical lookups:
- `Account_Master_History` – captures `Account_ID`, snapshot `Date`, `Health_Score`, `Health_Score_Trend_30d` reference.
- `Platform_Health_Metrics_History` – stores `Metric_ID`, `Date`, `Current_Value`.
Automate daily snapshotting via time-based automation so formulas leveraging `Lookup()` resolve successfully.

### Sample Data – Gard AS (Pilot Account)
After schema setup, seed data for Gard AS:
- Create Gard AS row in `Account_Master` with provided attributes. Assign `Customer_Success_Manager` to a corresponding `People_Team` member (create sample team records first).
- Insert two `Strategic_Objectives` tied to Gard AS using the provided details.
- Add one `Value_Stream` entry for War Risk Quoting with the specified metrics, linking to relevant strategic objectives and capabilities after those exist.

---

## Phase 2 – Integrations & Automation

### Slack Bot Integration

1. **Slack App Setup**
   - Create “MuleSoft CS Bot” (from scratch) in Slack.
   - Add bot scopes: `chat:write`, `commands`, `users:read`.
   - Install to workspace and store Bot User OAuth token securely (Coda doc `Secrets` table or Pack credential).

2. **Slash Commands**
   - Commands: `/mulesoft-update`, `/mulesoft-health`, `/mulesoft-sync`.
   - Set each Request URL to the Coda webhook endpoint (`https://coda.io/apis/v1/docs/{docId}/hooks/automation/{automationId}`).
   - Provide usage hints in Slack command descriptions.

3. **Coda Webhook Automation**
   - Create automation “Slack Command Handler” triggered by webhook.
   - Pseudocode flow:
     1. Parse incoming payload (command text, user info).
     2. Extract `account_name`, `metric_name`, `value` (enforce validation & data type conversion).
     3. Lookup `Account_Master` by `Account_Name`. If missing, respond with error via Slack API `chat.postMessage`.
     4. If account found, lookup corresponding row in `Platform_Health_Metrics` filtered by account + metric name. Create row if not present (initialize thresholds, units as needed).
     5. Update `Current_Value`, optionally set `Last_Measured = Now()`.
     6. Recompute health score automatically via formulas; fetch updated `Health_Score`.
     7. Post confirmation message back to Slack using response URL or `chat.postMessage`.

### Anypoint Platform Sync

1. **Connected App**
   - In Anypoint Platform create `Coda CS Platform` connected app, grant scopes: View Assets, View API Manager, View Cloudhub Applications.
   - Capture Client ID/Secret for secure storage in Coda (e.g., via Packs → “Stored Credentials”).

2. **Coda Button – `Sync from Anypoint`**
   - Add button column to `Account_Master`.
   - Parameters:
     - `Account` (row).
     - `Anypoint_Org_ID` (text input).
     - `Sync_Scope` (select: APIs Only, APIs + Metrics, Full Sync).
   - Button steps:
     1. **Authenticate** – POST to `https://anypoint.mulesoft.com/accounts/oauth2/token` with client credentials. Store `access_token`.
     2. **Pull API Catalog** – GET `https://anypoint.mulesoft.com/exchange/api/v2/assets` with headers (`Authorization`, `x-organization-id`). Filter `type = rest-api`.
        - For each asset, upsert into `API_Portfolio` (match on `API_ID`). Mark new entries with `Needs Manual Mapping` flag (additional column) for follow-up linking.
     3. **Pull Performance Metrics** (conditional on scope): For each API in portfolio for the account, call Analytics endpoint (`https://anypoint.mulesoft.com/analytics/1.0/{org}/events`) with 30-day range. Aggregate totals, average response time, error rate. Update the corresponding columns.
     4. **Summary Modal** – Show counts of APIs synced, new APIs, metrics updated.

3. **Daily Automation**
   - Automation “Daily Anypoint Sync” scheduled 01:00 UTC.
   - Iterates over active accounts and programmatically triggers the `Sync from Anypoint` button with scope `Full Sync`.

### Email Parser (Tableau Reports)

Using Zapier:
1. Trigger: Gmail “New Email Matching Search” with `from:tableau-reports@company.com subject:"Anypoint Daily Metrics"`.
2. Action: Gmail “Download Attachment” (CSV).
3. Action: Code by Zapier (Python) to parse CSV into JSON payload.
4. Action: Webhooks by Zapier → POST to Coda webhook with JSON body.

**Coda Webhook “Process Tableau Metrics”**
- Parse request, iterate metrics.
- Upsert corresponding rows in `Platform_Health_Metrics` (lookups on account + metric name).
- Update `Current_Value`, `Last_Measured`.
- Post Slack notification (`@channel Daily metrics updated. {count} metrics processed.`) using Slack Pack or webhook.

---

## Automations

### Auto-Alert 1 – Renewal Risk Detector
Scheduled 08:00 local time for each CSM (use automation rule grouped by `Customer_Success_Manager.Region` or replicate per timezone).
- Filter `Account_Master` where `Health_Score < 70` AND `Days_To_Renewal < 180`.
- Actions:
  1. Set `Renewal_Risk_Level = "At Risk"` (leave “Critical” unaffected if already set by formulas).
  2. Send Slack message to `#customer-success-alerts` with formatted payload referencing CSM/AE Slack IDs (store Slack IDs in `People_Team.Slack_User_ID`).
  3. Insert task row in `Tasks` table (create table if not present) assigned to CSM with due date `Today() + 2`.

### Auto-Alert 2 – API Health Critical
Trigger: `API_Portfolio.Health_Status` change to `🔴 Critical` or `🟡 Degraded`.
- If `Business_Criticality = "Mission-Critical"`:
  1. Send alert to `#platform-health` referencing owners from `People_Team`.
  2. Create `Risk_Register` entry pre-filled (Impact = Critical, Status = Open).

### Auto-Update 1 – Daily Health Score Refresh
Scheduled 02:00 UTC.
- Iterate active accounts, force formula recalculation (Coda recalculates automatically; automation ensures snapshots).
- For accounts with `Health_Score` drop > 10 vs 30 days, trigger critical alert (Slack or email).
- If `Health_Score < 60`, send urgent message to assigned CSM.
- Append to `Account_Master_History` for trending.

---

## Views & Dashboards

### CSM Command Center (Card View)
- Base table: `Account_Master`.
- Filters: `Customer_Success_Manager = CurrentUser()` and `Account_Status = "Active"`.
- Group cards by `Renewal_Risk_Level` ordered Critical → At Risk → Attention Needed → Healthy.
- Card fields: `Account_Name`, `Health_Score` (gauge), `Renewal_Risk_Level`, `Days_To_Renewal`, `ARR`, `Last_Engagement_Date`.
- Card buttons: `View Details`, `Log Engagement`, `Generate QBR`.
- Styling: conditional borders + animation for Critical group.

### Strategic Alignment Board (Kanban)
- Table: `Strategic_Objectives`.
- Filters: account selection control, `MuleSoft_Relevance` ∈ {Critical Enabler, Supporting}.
- Kanban columns follow `Status`. Red highlight for `At Risk`, green for `Achieved`.
- Card info: `Objective_Name`, `Strategic_Pillar`, `Progress_Percent`, `Business_Value_USD`, `Target_Date`, `Health_Indicator`, counts of linked capabilities/value streams.
- Sidebar summary metrics (calculate via formulas or top table rows).

### Platform Health Dashboard (Grid + Tiles)
- Data source: `Platform_Health_Metrics`.
- Section 1: KPI tiles (use canvas layout or Coda chart blocks) for overall health, APIs in production, critical alerts, average SLA.
- Section 2: Detailed table with conditional row coloring by `Health_Status`.
- Section 3: Heatmap (table with color rules) for API metrics across `API_Portfolio`.

---

## Button Automations

### Generate QBR Deck
- Location: `Account_Master` (QBR Preparation view).
- Parameters: `Account`, `Date_Range_Start`, `Date_Range_End`, `Include_Appendix`, `Export_Format`.
- Steps:
  1. Gather data from `Strategic_Objectives`, `Platform_Health_Metrics`, `Initiatives`, `Stakeholder_Outcomes`, `Value_Streams`, `Risk_Register`.
  2. Perform aggregations (progress distribution, ROI, top metrics).
  3. Use Coda Packs (e.g., Google Slides / PowerPoint Pack) or export API to assemble slide deck following defined outline.
  4. Upload generated file to attachments column.
  5. Show confirmation modal with preview/download/email options.

### Calculate Platform ROI
- Location: `Account_Master` (Value Realization view).
- Parameters: `Account`, `Time_Period`, `Include_In_Progress`.
- Steps:
  1. Resolve date range via `Switch()` logic for selected period.
  2. Summarize investments and benefits from `Initiatives`.
  3. Include in-progress initiatives conditionally.
  4. Compute ROI metrics (simple ROI, payback, 3-year ROI, NPV at 10% discount).
  5. Generate charts (bar/line/pie) using Coda charts or Pack.
  6. Assemble PDF report (e.g., via Coda → Google Docs/Slides pack).
  7. Display modal summarizing key figures with download/email actions.

---

## Testing & Validation Checklist

### Database Integrity
- [ ] All 12 core tables exist with specified schema, data types, formulas, and relations.
- [ ] History tables support trend lookups without formula errors.
- [ ] Sample Gard AS data loaded and rollups (health score, cycle times) compute correctly.
- [ ] Views reflect expected filters/groupings (spot-check `Renewal Risk`, `Critical APIs`, `CSM Command Center`).

### Integrations
- [ ] Slack commands respond within 3 seconds, updating metrics or returning helpful errors.
- [ ] Slack webhook automation records updates in `Platform_Health_Metrics` and posts confirmations.
- [ ] `Sync from Anypoint` button authenticates, upserts API catalog entries, and updates metrics.
- [ ] Daily Anypoint automation completes (log success state).
- [ ] Zapier pipeline processes Tableau CSV, upserts metrics, and triggers Slack notification.

### Automations
- [ ] Renewal Risk Detector runs daily, sets `Renewal_Risk_Level`, creates task, posts Slack alert.
- [ ] API Health Monitor generates Slack alert and risk record for mission-critical APIs.
- [ ] Daily Health Score Refresh logs history snapshots and sends critical drop alerts.

### Buttons
- [ ] Generate QBR Deck produces PowerPoint/PDF with accurate data and attaches to account.
- [ ] Calculate Platform ROI outputs summary modal, charts, and downloadable PDF.
- [ ] Sync button handles retriable failures (add user feedback on API errors).

### Performance
- [ ] `Health_Score` recalculates in <2 seconds after metric updates.
- [ ] Dashboard loads within 3 seconds under typical data volume.
- [ ] Button automations complete within 30 seconds or provide progress indicators.

---

## Deployment Notes & Next Steps
- **Prerequisites:** Coda Team/Enterprise workspace, Slack admin access, Anypoint credentials, Zapier account.
- **Implementation Timeline:** Phase 1 (8–12h), Phase 2 (12–16h), Testing (4–6h); total 24–34h.
- **Post-Deployment Actions:**
  1. Conduct CSM enablement on data entry and automation usage.
  2. Populate 3 pilot accounts to validate rollups and dashboards.
  3. Run a pilot QBR using generated deck to validate narrative.
  4. Collect feedback, adjust tables/automations, then scale rollout.

---

## Appendix – Recommended Data Governance
- Maintain `Reference` tables (e.g., industry options, contract types) for easier updates.
- Use Coda Packs “Secrets” vault for credentials (Slack, Anypoint).
- Implement access control: restrict edit permissions on financial fields and automations.
- Schedule weekly audit automation to export key metrics for backup (CSV to cloud storage).
- Instrument automation error logs (Table `Automation_Logs`) for observability.

This blueprint is ready to execute within Coda, ensuring consistency with MuleSoft Customer Success Intelligence Platform v3.0 requirements.
