---
tags:
  - template
  - obsidian
  - mulesoft
  - customer-success
cssclass: implementation-template
---

# MuleSoft CS Intelligence Platform v3.0

> [!tip] How to use this template
> 1. Duplicate this note for your implementation project.
> 2. Convert checkboxes to ✅ as tasks are delivered.
> 3. Link out to build notes, automations, and external credentials from each section.
> 4. Embed Coda doc links, Slack channels, or dashboards with Obsidian canvas/cards if helpful.

---

## Phase Tracker
- [ ] **Phase 1 · Database Foundation**
- [ ] **Phase 2 · Integrations & Automation**
- [ ] **Testing & QA Complete**
- [ ] **Production Launch**

> [!abstract] Project Overview
> - Platform: Coda (database + app), Slack, Anypoint Platform, Zapier, Gmail
> - Outcomes: Strategic account health, platform maturity, API performance, business value
> - Key Dependencies: Enterprise Coda workspace, Slack admin access, Anypoint credentials, Zapier Pro

---

## Phase 1 · Database Foundation

### Table Build Checklist (12 / 12)
- [ ] Account_Master
- [ ] People_Team
- [ ] Business_Context
- [ ] Strategic_Objectives
- [ ] MuleSoft_Capabilities
- [ ] Value_Streams
- [ ] API_Portfolio
- [ ] Platform_Health_Metrics
- [ ] Initiatives
- [ ] Risk_Register
- [ ] Stakeholder_Outcomes
- [ ] Engagement_Log

> [!info] Column Definitions & Formulas
> Embed or link to each table specification as you implement. Capture any deviations from the standard definitions directly under the relevant table heading.

---

### Account_Master · View Configuration
- [ ] **All Accounts**
  - Sort: `Account_Name` ascending
  - Default layout: table
- [ ] **By CSM**
  - Group by: `Customer_Success_Manager`
  - Show rollups for `ARR`, `Health_Score`
- [ ] **Renewal Risk**
  - Filter: `Renewal_Risk_Level` is `Critical` or `At Risk`
  - Sort: `Days_To_Renewal` ascending
- [ ] **Health Score**
  - Sort: `Health_Score` ascending
  - Conditional color scale: 0-100 (red→green)

> [!todo] Sample Data · Gard AS
> - [ ] Account row created with supplied contract + company metadata
> - [ ] Date fields verified (start/end/renewal)
> - [ ] Contact + ownership lookups populated from `People_Team`

---

### People_Team · View Configuration
- [ ] **All Team Members** · Sort `Full_Name` ascending
- [ ] **By Role** · Group by `Role`, display `Account_Count`, `Total_ARR_Managed`
- [ ] **By Portfolio Size** · Sort `Total_ARR_Managed` descending, highlight top 10

---

### Business_Context · View Configuration
- [ ] **All Contexts** · Default table view
- [ ] **By Digital Maturity** · Group by `Digital_Maturity`, surface `IT_Complexity_Score`

---

### Strategic_Objectives · View Configuration
- [ ] **All Objectives** · Sort by `Account`, then `Strategic_Pillar`
- [ ] **By Status** · Kanban or grouped view by `Status`
- [ ] **By Strategic Pillar** · Group by `Strategic_Pillar`
- [ ] **At Risk** · Filter `Status = "At Risk"`, emphasize `Health_Indicator`
- [ ] **High Impact** · Filter `MuleSoft_Impact_Score > 10`

> [!example] Gard AS Objectives
> - [ ] `Manage Geopolitical Volatility`
> - [ ] `Lead Green Transition`

---

### MuleSoft_Capabilities · View Configuration
- [ ] **All Capabilities** · Sort by `Account`, `Capability_Domain`
- [ ] **By Gap Status** · Group by `Gap_Status`, apply emoji badges
- [ ] **Critical Gaps** · Filter where `Gap_Status` contains "Critical"
- [ ] **By Priority** · Group by `Priority`

---

### Value_Streams · View Configuration
- [ ] **All Value Streams** · Sort by `Account`
- [ ] **By Business Value** · Sort `Total_Business_Value_USD` descending
- [ ] **High Impact** · Filter `Total_Business_Value_USD > 1,000,000`

> [!example] Gard AS Value Stream
> - [ ] `War Risk Quoting`

---

### API_Portfolio · View Configuration
- [ ] **All APIs** · Sort by `Account`, `API_Name`
- [ ] **By Health Status** · Group by `Health_Status`, add conditional icons
- [ ] **Critical APIs** · Filter `Business_Criticality = "Mission-Critical"`
- [ ] **Unhealthy APIs** · Filter `Health_Status` contains "Critical" or "Degraded"`
- [ ] **By Business Value** · Sort `Business_Value_Score` descending

---

### Platform_Health_Metrics · View Configuration
- [ ] **All Metrics** · Sort `Account`, `Metric_Category`
- [ ] **By Health Status** · Group by `Health_Status`
- [ ] **Critical Metrics** · Filter `Health_Status = "🔴 Critical"`
- [ ] **Alerts** · Filter `Alert_Status` not empty

---

### Initiatives · View Configuration
- [ ] **All Initiatives** · Sort `Account`, `Priority`
- [ ] **By Status** · Group by `Status`
- [ ] **By Priority** · Group by `Priority`
- [ ] **In Progress** · Filter `Status = "In Progress"`
- [ ] **Overdue** · Filter `Days_Overdue > 0`
- [ ] **High ROI** · Filter `Three_Year_ROI_Percent > 300`, sort descending

---

### Risk_Register · View Configuration
- [ ] **All Risks** · Sort `Risk_Score` descending
- [ ] **By Risk Level** · Group by `Risk_Level`
- [ ] **Critical & High** · Filter `Risk_Level` in (`Critical`, `High`)
- [ ] **Open Risks** · Filter `Status = "Open"`

---

### Stakeholder_Outcomes · View Configuration
- [ ] **All Outcomes** · Sort by `Account`
- [ ] **By Status** · Group by `Status`
- [ ] **Achieved** · Filter `Status = "Achieved"`

---

### Engagement_Log · View Configuration
- [ ] **All Engagements** · Sort `Engagement_Date` descending
- [ ] **By Account** · Group by `Account`
- [ ] **Recent** · Filter `Engagement_Date >= Today() - 90`
- [ ] **QBRs** · Filter `Engagement_Type = "QBR"`

---

## Phase 2 · Integrations & Automation

### Integration 1 · Slack Bot
- [ ] Slack app `MuleSoft CS Bot` created with required scopes
- [ ] Slash commands (`/mulesoft-update`, `/mulesoft-health`, `/mulesoft-sync`) mapped to Coda webhook
- [ ] Coda webhook automation parses payload, updates `Platform_Health_Metrics`, responds to Slack
- [ ] Error handling + Slack confirmations tested

### Integration 2 · Anypoint Platform Sync
- [ ] Connected App `Coda CS Platform` with client credentials
- [ ] Stored OAuth credentials in Coda (secure)
- [ ] `Sync from Anypoint` button configured with HTTP steps + summary modal
- [ ] Daily automation triggers full sync for active accounts

### Integration 3 · Email Parser (Tableau Reports)
- [ ] Zapier Gmail trigger for Tableau report emails
- [ ] Python parsing step emits JSON metrics payload
- [ ] Webhook to Coda updates `Platform_Health_Metrics` and timestamps
- [ ] Slack notification broadcast on completion

---

## Automation Rules

### Renewal Risk Detector
- [ ] Scheduled daily at 08:00 (per CSM timezone)
- [ ] Updates `Renewal_Risk_Level` when conditions met
- [ ] Slack alert to `#customer-success-alerts` with dynamic mentions
- [ ] Creates follow-up task row (link reference)

### API Health Monitor
- [ ] Trigger: `API_Portfolio.Health_Status` changes
- [ ] Alerts for mission-critical APIs posted to `#platform-health`
- [ ] Auto-creates `Risk_Register` entry for degraded mission-critical APIs

### Daily Health Score Refresh
- [ ] Scheduled daily at 02:00 UTC
- [ ] Validates formula recalculations, triggers escalation rules
- [ ] Flags `Health_Score` drops > 10 points

---

## Button Automations

### Generate QBR Deck
- [ ] Button configured with parameters (account, dates, appendix toggle, export format)
- [ ] Data queries for objectives, metrics, initiatives, outcomes, value streams, risks
- [ ] PowerPoint generation + upload tested
- [ ] Completion modal with download + email actions

### Calculate Platform ROI
- [ ] Parameters (account, time period, include in-progress)
- [ ] Investment + benefit aggregation logic validated
- [ ] Charts rendered (bar, line, pie)
- [ ] PDF report generated + surfaced via modal actions

---

## Views & Dashboards

### CSM Command Center
- [ ] Card view filtered to `Customer_Success_Manager = CurrentUser()` & active accounts
- [ ] Grouping by `Renewal_Risk_Level` (Critical → Healthy)
- [ ] Card display: `Account_Name`, `Health_Score`, `Renewal_Risk_Level`, `Days_To_Renewal`, `ARR`, `Last_Engagement_Date`
- [ ] Card actions wired (`View Details`, `Log Engagement`, `Generate QBR`)
- [ ] Conditional styling for risk bands

### Strategic Alignment Board
- [ ] Kanban view filtered by selected account & relevance (Critical Enabler, Supporting)
- [ ] Columns mapped to status stages (`Not Started` → `Achieved`)
- [ ] Cards include pillar badges, progress bar, objective metrics
- [ ] Sidebar rollups: total objectives, % achieved, total business value, value at risk

### Platform Health Dashboard
- [ ] KPI tiles (overall health, APIs in prod, critical alerts, avg SLA compliance)
- [ ] Metrics detail table with conditional row colors
- [ ] API health heatmap (uptime, SLA, error rate, business criticality)
- [ ] Drill-through navigation to API detail pages

---

## Visual Presentation Views

> [!tip] Use this storyboard when previewing the Coda doc with executives or during enablement sessions. Duplicate the callouts you need into meeting notes for quick reference.

### Account_Master Views
> [!success] **All Accounts**
> - Layout: table with zebra striping
> - Columns: `Account_Name`, `Contract_Type`, `Health_Score`, `Renewal_Risk_Level`, `ARR`
> - Visual cues: apply color scale to `Health_Score`, badge styling on `Renewal_Risk_Level`
>
> [!example] **By CSM**
> - Layout: grouped table
> - Group header chips show `Account_Count`, `Total_ARR`
> - Suggested presenter flow: drill into any red/yellow risk group during reviews
>
> [!warning] **Renewal Risk**
> - Layout: filtered table with countdown column (`Days_To_Renewal`)
> - Add conditional row highlight (critical = red, at risk = amber)
> - Optional sparkline column tracking `Health_Score_Trend_30d`
>
> [!info] **Health Score**
> - Layout: table sorted ascending
> - Add gauge column type for `Health_Score`
> - Pair with quick filter toggles for `Contract_Type`

### Strategic_Objectives Views
> [!success] **All Objectives**
> - Layout: table with section headers per `Strategic_Pillar`
> - Include `Progress_Percent` as progress bar column
>
> [!warning] **At Risk**
> - Layout: red-themed gallery cards emphasizing `Health_Indicator`
> - Presenter note: talk through mitigation actions, link to `Initiatives`
>
> [!example] **By Strategic Pillar**
> - Layout: grouped cards, colored pillar badges
> - Section footer rollups: `Business_Value_USD` totals
>
> [!quote] **High Impact**
> - Layout: table sorted by `MuleSoft_Impact_Score` desc
> - Add KPI chip summarizing total impact at top of view

### Platform Health & APIs
> [!danger] **Critical Metrics**
> - Layout: card grid with red border
> - Display: `Metric_Name`, `Current_Value`, `Health_Status`, `Alert_Status`
> - Encourage real-time updates during incident calls
>
> [!tip] **API Health Heatmap**
> - Layout: grid with color-coded cells
> - Include quick filter toggles for `Environment` and `Business_Criticality`
>
> [!summary] **Critical APIs**
> - Layout: table with icon column for `Health_Status`
> - Add stacked bar for `Monthly_Transactions` vs `Error_Rate_Percent`

### Value & Initiatives
> [!success] **High Impact Value Streams**
> - Layout: gallery cards sorted by `Total_Business_Value_USD`
> - Include metric chips (`Cycle_Time_Reduction_Percent`, `Annual_Cost_Savings_USD`)
>
> [!example] **Initiatives · High ROI**
> - Layout: table sorted by `Three_Year_ROI_Percent`
> - Add status badge (`Status`, `Phase`) and timeline column (`Start_Date` → `Target_Completion_Date`)
>
> [!warning] **Risk Register · Critical & High**
> - Layout: stacked table grouped by `Risk_Level`
> - Presenter prompt: highlight `Mitigation_Initiative` link for each item

### Stakeholder & Engagement
> [!success] **Stakeholder Outcomes · Achieved**
> - Layout: gallery with success callouts
> - Include before/after metrics using mini progress bars
>
> [!tip] **Engagement Log · Recent 90 Days**
> - Layout: timeline view (calendar or timeline block)
> - Highlight `Sentiment` and `Relationship_Depth_Score`

---

## Testing & QA Checklist

### Database Integrity
- [ ] Table schemas match spec (types, formulas, relationships)
- [ ] Formula calculations verified across sample accounts
- [ ] Lookup + relation columns resolve without errors
- [ ] Gard AS sample data loaded end-to-end
- [ ] View filters/groupings validated

### Integrations
- [ ] Slack slash commands end-to-end test (success + account not found)
- [ ] Slack webhook updates metrics & returns health score
- [ ] Anypoint sync fetches catalog + metrics with correct mapping
- [ ] Email parser ingests Tableau CSV and updates metrics

### Automations
- [ ] Renewal Risk Detector runs (include negative control)
- [ ] API Health Monitor posts + risk entry created
- [ ] Daily Health Score refresh recalculates & escalates

### Button Functions
- [ ] QBR deck output reviewed (content + template fidelity)
- [ ] Platform ROI report metrics double-checked against raw data
- [ ] Sync button completes < 30s for active accounts

### Performance
- [ ] `Health_Score` evaluation under 2 seconds per account
- [ ] Dashboards load in < 3 seconds with live data
- [ ] Automations complete within SLA (Slack alerts, syncs)

---

## Deployment Notes & Runbook
- [ ] Confirm prerequisite accounts + credentials available
- [ ] Train CSM team on data entry + dashboard usage
- [ ] Populate 3 pilot accounts before general rollout
- [ ] Execute pilot QBR, capture feedback
- [ ] Iterate + finalize documentation
- [ ] Roll out to remaining accounts, monitor automations

> [!quote] Estimated Effort
> - Phase 1: 8-12 hours
> - Phase 2: 12-16 hours
> - Testing & Refinement: 4-6 hours
> - Total: 24-34 hours

---

## Decision Log
- [ ] Record schema deviations
- [ ] Capture integration credential storage approach
- [ ] Note custom automations or alerts beyond core scope

## Open Questions
- [ ] Slack channel architecture (per region? global?)
- [ ] Data retention policies for historical metrics
- [ ] Additional dashboards requested by exec stakeholders

---

## Reference Links
- [ ] Coda Doc URL
- [ ] Slack App Dashboard
- [ ] Anypoint Connected App
- [ ] Zapier Zap Link
- [ ] Repo / Automation Scripts

---

_Template prepared for Obsidian · Generated via Cursor AI_
