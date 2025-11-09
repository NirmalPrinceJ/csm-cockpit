---
title: API_Portfolio
tags: [table, coda, cs-platform, phase-1]
aliases: [API Portfolio]
---

# API_Portfolio

> [!summary] Inventory of APIs with operational metrics, business criticality, and links to value streams and objectives.

## Purpose
- Track API metadata sourced from Anypoint Exchange and runtime analytics.
- Measure usage, performance, and SLA adherence to drive health monitoring.
- Connect APIs to strategic objectives and value streams for business context.

## Key Relationships
- Many-to-one relation to `[[Account_Master]]`.
- Many-to-many relations with `[[Value_Streams]]` (`Linked_Value_Streams`) and `[[Strategic_Objectives]]`.
- Referenced by `[[Risk_Register]]` (`Affected_APIs`) and `[[Stakeholder_Outcomes]]`.
- Feeds `Platform_Health_Dashboard` heatmap and API health automations.

## Views
- **All APIs** — default, sorted by `Account`, `API_Name`.
- **By Health Status** — grouped on `Health_Status`.
- **Critical APIs** — filtered `Business_Criticality = "Mission-Critical"`.
- **Unhealthy APIs** — filtered `Health_Status` contains “Critical” or “Degraded”.
- **By Business Value** — sorted by `Business_Value_Score` descending.

## Columns
| # | Column | Type | Requirements | Formula / Logic | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | `API_ID` | Text (Row ID) | Required, unique | — | Use Exchange identifier (e.g., `war-risk-quote-api-v1`) |
| 2 | `Account` | Relation (single) | Required | — | Links to `Account_Master` |
| 3 | `API_Name` | Text | Required | — | |
| 4 | `API_Type` | Select | Required | Options: System, Process, Experience | |
| 5 | `API_Version` | Text | Optional | — | |
| 6 | `Business_Capability` | Text | Optional | — | |
| 7 | `Environment` | Select | Required | Options: Production, Sandbox, Development | |
| 8 | `Linked_Value_Streams` | Relation (multi) | Optional | — | |
| 9 | `Linked_Strategic_Objectives` | Relation (multi) | Optional | — | |
| 10 | `Monthly_Transactions` | Number | Optional | — | Last 30-day calls |
| 11 | `Annual_Transaction_Volume` | Number | Auto | `[Monthly_Transactions] * 12` | |
| 12 | `Consuming_Applications` | Number | Optional | — | Unique client IDs |
| 13 | `Avg_Response_Time_ms` | Number | Optional | — | |
| 14 | `SLA_Target_ms` | Number | Optional | — | |
| 15 | `SLA_Compliance_Percent` | Number (1 decimal, %) | Auto | `If([Avg_Response_Time_ms] <= [SLA_Target_ms], 100, Max(0, 100 - (([Avg_Response_Time_ms] - [SLA_Target_ms]) / [SLA_Target_ms]) * 100))` | |
| 16 | `Error_Rate_Percent` | Number (2 decimals, %) | Optional | — | `(failed_requests / total_requests) * 100` |
| 17 | `Uptime_Percent` | Number (2 decimals, %) | Optional | — | Last 30 days |
| 18 | `Revenue_Attribution_USD` | Currency | Optional | — | Revenue enabled |
| 19 | `Business_Criticality` | Text | Auto | If mission-critical conditions met, set to `"Mission-Critical"`, else evaluate High/Medium/Low based on usage | Apply badge formatting |
| 20 | `Business_Value_Score` | Number | Auto | `([Monthly_Transactions] / 1000) * [Consuming_Applications] * ([SLA_Compliance_Percent] / 100)` | |
| 21 | `Health_Status` | Text | Auto | `If([Uptime_Percent] < 99.5 OR [Error_Rate_Percent] > 1,"🔴 Critical",If([SLA_Compliance_Percent] < 95,"🟡 Degraded","🟢 Healthy"))` | |
| 22 | `Owner_Team` | Text | Optional | — | Source from Exchange metadata |
| 23 | `Documentation_Quality` | Select | Optional | Options: Excellent, Good, Needs Improvement, Missing | |
| 24 | `Last_Deployed_Date` | Date | Optional | — | From Runtime Manager |
| 25 | `Last_Sync_From_Anypoint` | DateTime | Auto | — | Modified timestamp |

## Implementation Notes
- Include boolean helper (optional) `Needs Manual Mapping` flag when new APIs are created via sync.
- Configure conditional formatting for `Health_Status` and `Business_Criticality` to surface risks.
- Use automation to recalc metrics post Anypoint sync; ensure rate limits respected.
