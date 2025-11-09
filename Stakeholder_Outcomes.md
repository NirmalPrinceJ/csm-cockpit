---
title: Stakeholder_Outcomes
tags: [table, coda, cs-platform, phase-1]
aliases: [Stakeholder Outcomes]
---

# Stakeholder_Outcomes

> [!summary] Persona-specific success metrics capturing baseline, current performance, and target achievement levels.

## Purpose
- Measure value delivered to different stakeholder groups tied to MuleSoft initiatives.
- Feed `Business_Value_Realization` rollup in `[[Account_Master]]`.
- Provide content for QBR storytelling and ROI reporting.

## Key Relationships
- Many-to-one relation to `[[Account_Master]]`.
- Optional links to `[[Strategic_Objectives]]`, `[[Value_Streams]]`, and `[[API_Portfolio]]`.
- Referenced by account health calculations and stakeholder cadence planning.

## Views
- **All Outcomes** — default, sorted by `Account`.
- **By Status** — grouped on `Status`.
- **Achieved** — filtered `Status = "Achieved"`.

## Columns
| # | Column | Type | Requirements | Formula / Logic | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | `Outcome_ID` | Text (Row ID) | Required, unique | `"OUT-" & Format(thisRow.RowNumber(), "00000")` | Primary identifier |
| 2 | `Account` | Relation (single) | Required | — | Links to `Account_Master` |
| 3 | `Stakeholder_Type` | Select | Required | Options: External Customer, Internal Business Unit, Partner, Regulator, End User, Executive Leadership | |
| 4 | `Stakeholder_Name` | Text | Optional | — | |
| 5 | `Stakeholder_Role` | Text | Optional | — | |
| 6 | `Outcome_Statement` | Text | Required | — | Format: “As a [stakeholder], I can [action] so that [benefit]” |
| 7 | `Linked_Strategic_Objective` | Relation (single) | Optional | — | |
| 8 | `Linked_Value_Stream` | Relation (single) | Optional | — | |
| 9 | `Linked_API_Services` | Relation (multi) | Optional | — | Links to `API_Portfolio` |
| 10 | `Success_Metric_Name` | Text | Optional | — | |
| 11 | `Baseline_Value` | Number | Optional | — | Pre-MuleSoft metric |
| 12 | `Current_Value` | Number | Optional | — | Latest measurement |
| 13 | `Target_Value` | Number | Optional | — | Desired future state |
| 14 | `Unit` | Text | Optional | — | e.g., %, hours, $ |
| 15 | `Improvement_Percent` | Number (1 decimal, %) | Auto | `(([Current_Value] - [Baseline_Value]) / [Baseline_Value]) * 100` | Add guard for zero baseline |
| 16 | `Target_Achievement_Percent` | Number (0 decimals, %) | Auto | `(([Current_Value] - [Baseline_Value]) / ([Target_Value] - [Baseline_Value])) * 100` | Guard for divide-by-zero |
| 17 | `Status` | Text | Auto | `If([Target_Achievement_Percent] >= 100,"Achieved",If([Target_Achievement_Percent] >= 75,"On Track","Needs Attention"))` | Apply conditional colors |
| 18 | `Measurement_Method` | Text | Optional | — | Surveys, analytics, etc. |
| 19 | `Last_Measured` | Date | Optional | — | |
| 20 | `Measurement_Frequency` | Select | Optional | Options: Monthly, Quarterly, Annual | |

## Implementation Notes
- Ensure formulas handle cases where `Baseline_Value` equals `Target_Value` to avoid division errors.
- Create chart view summarizing average achievement by `Stakeholder_Type`.
- Use automation to remind owners to update metrics when `Last_Measured` exceeds desired cadence.
