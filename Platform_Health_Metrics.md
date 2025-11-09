---
title: Platform_Health_Metrics
tags: [table, coda, cs-platform, phase-1]
aliases: [Platform Health Metrics]
---

# Platform_Health_Metrics

> [!summary] Operational KPI store tracking performance, adoption, and alerting signals across the MuleSoft platform.

## Purpose
- Centralize key metrics from Anypoint Analytics, Runtime Manager, and manual inputs.
- Drive account-level health scoring and alert automations.
- Provide dashboard-ready views for Platform Operations.

## Key Relationships
- Many-to-one relation to `[[Account_Master]]`.
- Optional links to `[[MuleSoft_Capabilities]]` (`Linked_Capability`) and `[[Strategic_Objectives]]` (`Linked_Strategic_Objective`).
- Historical tracking via supporting table `[[Platform_Health_Metrics_History]]`.

## Views
- **All Metrics** — sorted by `Account`, `Metric_Category`.
- **By Health Status** — grouped on `Health_Status`.
- **Critical Metrics** — filtered `Health_Status = "🔴 Critical"`.
- **Alerts** — filtered `Alert_Status` not blank.

## Columns
| # | Column | Type | Requirements | Formula / Logic | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | `Metric_ID` | Text (Row ID) | Required, unique | `"MET-" & Format(thisRow.RowNumber(), "000001")` | Primary identifier |
| 2 | `Account` | Relation (single) | Required | — | Links to `Account_Master` |
| 3 | `Metric_Category` | Select | Required | Options: Performance, Reliability, Adoption, Efficiency, Quality, Security, Governance, Cost | Indexed |
| 4 | `Metric_Name` | Text | Required | — | |
| 5 | `Metric_Type` | Select | Required | Options: Technical, Business, Operational | |
| 6 | `Unit` | Text | Required | — | %, ms, count, USD, etc. |
| 7 | `Measurement_Frequency` | Select | Required | Options: Real-time, Hourly, Daily, Weekly, Monthly | |
| 8 | `Current_Value` | Number | Required | — | |
| 9 | `Target_Value` | Number | Required | — | |
| 10 | `Threshold_Warning` | Number | Required | — | Yellow alert trigger |
| 11 | `Threshold_Critical` | Number | Required | — | Red alert trigger |
| 12 | `Health_Status` | Text | Auto | `If([Current_Value] >= [Target_Value] * 0.95,"🟢 On Track",If([Current_Value] >= [Threshold_Warning],"🟡 Needs Attention","🔴 Critical"))` | Add conditional formatting |
| 13 | `Health_Status_Numeric` | Number | Auto | `Switch([Health_Status],"🟢 On Track",100,"🟡 Needs Attention",70,"🔴 Critical",30)` | Used in `Account_Master` rollup |
| 14 | `Trend_30d_Change` | Number | Auto | `[Current_Value] - Lookup([Platform_Health_Metrics_History], [Metric_ID]=thisRow.[Metric_ID] AND [Date]=Today() - 30).[Current_Value]` | Requires history |
| 15 | `Trend_Direction` | Text | Auto | `If([Trend_30d_Change] > 0,"⬆️ Increasing",If([Trend_30d_Change] < 0,"⬇️ Decreasing","➡️ Stable"))` | |
| 16 | `Trend_Is_Good` | Checkbox | Optional | — | Indicates if upward trend is positive |
| 17 | `Alert_Status` | Text | Auto | `If([Health_Status] = "🔴 Critical" AND [Trend_Direction] = "⬇️ Decreasing" AND Not([Trend_Is_Good]),"🚨 Urgent",If([Health_Status] = "🔴 Critical","⚠️ Alert",""))` | |
| 18 | `Last_Measured` | DateTime | Auto | — | Modified timestamp |
| 19 | `Linked_Capability` | Relation (single) | Optional | — | Links to `MuleSoft_Capabilities` |
| 20 | `Linked_Strategic_Objective` | Relation (single) | Optional | — | Links to `Strategic_Objectives` |
| 21 | `Data_Source` | Select | Required | Options: Anypoint Analytics, Runtime Manager, Exchange, Custom Script, Manual Entry, Webhook | |
| 22 | `Business_Impact_Statement` | Text | Optional | — | Describe consequence of failure |

## Implementation Notes
- Schedule automation to append snapshots into `Platform_Health_Metrics_History` daily (UTC).
- Consider exposing `Trend_30d_Change` as sparkline chart for dashboards.
- Leverage alert column in automations to notify `#platform-health` channel.
