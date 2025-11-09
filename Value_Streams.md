---
title: Value_Streams
tags: [table, coda, cs-platform, phase-1]
aliases: [Value Streams]
---

# Value_Streams

> [!summary] Business process view quantifying efficiency gains, cost savings, and revenue impact enabled by MuleSoft.

## Purpose
- Document key value streams per account with operational metrics and financial outcomes.
- Provide linkage to strategic objectives and supporting capabilities.
- Feed ROI calculations, QBR storytelling, and automation triggers.

## Key Relationships
- Many-to-one relation to `[[Account_Master]]`.
- Many-to-many relations with `[[Strategic_Objectives]]` (`Linked_Strategic_Objectives`) and `[[MuleSoft_Capabilities]]` (`Enabled_MuleSoft_Capabilities`).
- Referenced by `[[API_Portfolio]]` (`Linked_Value_Streams`) and `[[Stakeholder_Outcomes]]`.

## Views
- **All Value Streams** — default, sorted by `Account`.
- **By Business Value** — sorted by `Total_Business_Value_USD` descending.
- **High Impact** — filtered `Total_Business_Value_USD > 1000000`.

## Columns
| # | Column | Type | Requirements | Formula / Logic | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | `Stream_ID` | Text (Row ID) | Required, unique | `"VS-" & Format(thisRow.RowNumber(), "00000")` | Primary identifier |
| 2 | `Account` | Relation (single) | Required | — | Links to `Account_Master` |
| 3 | `Value_Stream_Name` | Text | Required | — | |
| 4 | `Business_Process` | Text | Required | — | e.g., Quote-to-Policy |
| 5 | `Process_Owner` | Text | Optional | — | Customer business unit |
| 6 | `Linked_Strategic_Objectives` | Relation (multi) | Optional | — | |
| 7 | `Enabled_MuleSoft_Capabilities` | Relation (multi) | Optional | — | |
| 8 | `Integration_Endpoints` | Number | Optional | — | Count of integrated systems |
| 9 | `APIs_Consumed` | Number | Optional | — | |
| 10 | `Annual_Transaction_Volume` | Number | Optional | — | |
| 11 | `Cycle_Time_Baseline_Hours` | Number | Optional | — | Pre-MuleSoft |
| 12 | `Cycle_Time_Current_Hours` | Number | Optional | — | Current performance |
| 13 | `Cycle_Time_Target_Hours` | Number | Optional | — | Desired goal |
| 14 | `Cycle_Time_Reduction_Percent` | Number (1 decimal, %) | Auto | `If([Cycle_Time_Baseline_Hours] > 0, (([Cycle_Time_Baseline_Hours] - [Cycle_Time_Current_Hours]) / [Cycle_Time_Baseline_Hours]) * 100, 0)` | |
| 15 | `Cycle_Time_Progress_Indicator` | Text | Auto | `If([Cycle_Time_Current_Hours] <= [Cycle_Time_Target_Hours], "🟢 Target Met", If([Cycle_Time_Reduction_Percent] >= 50, "🟡 Progressing", "🔴 Needs Improvement"))` | |
| 16 | `Cost_Per_Transaction_Before_USD` | Currency | Optional | — | |
| 17 | `Cost_Per_Transaction_After_USD` | Currency | Optional | — | |
| 18 | `Annual_Cost_Savings_USD` | Currency | Auto | `If([Cost_Per_Transaction_Before_USD] > 0 AND [Annual_Transaction_Volume] > 0, ([Cost_Per_Transaction_Before_USD] - [Cost_Per_Transaction_After_USD]) * [Annual_Transaction_Volume], 0)` | |
| 19 | `Revenue_Impact_USD` | Currency | Optional | — | Incremental revenue |
| 20 | `Total_Business_Value_USD` | Currency | Auto | `[Annual_Cost_Savings_USD] + [Revenue_Impact_USD]` | |
| 21 | `Customer_Satisfaction_Score` | Slider (1–10) | Optional | — | |
| 22 | `Operational_Risk_Level` | Select | Optional | Options: Critical, High, Medium, Low | |

## Implementation Notes
- Add conditional formatting to highlight `Operational_Risk_Level` escalation.
- Use grouped views by `Operational_Risk_Level` for risk review meetings.
- Provide button or template to calculate payback using `Total_Business_Value_USD` vs initiative investment.
