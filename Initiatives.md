---
title: Initiatives
tags: [table, coda, cs-platform, phase-1]
aliases: [Initiatives Table]
---

# Initiatives

> [!summary] Portfolio of customer-facing projects with financial investment, ROI, and delivery status tracking.

## Purpose
- Capture planned and active initiatives contributing to MuleSoft value realization.
- Track lifecycle phases, owners, financials, and risks.
- Provide data for ROI calculations and QBR reporting.

## Key Relationships
- Many-to-one relation to `[[Account_Master]]`.
- Many-to-many relations with `[[Strategic_Objectives]]` (`Linked_Strategic_Objectives`) and `[[MuleSoft_Capabilities]]` (`Linked_Capabilities`).
- Referenced by `[[Risk_Register]]` (`Mitigation_Initiative`) and ROI automation buttons.
- Person lookups to `[[People_Team]]` (`Owner_MuleSoft`).

## Views
- **All Initiatives** — default; sorted by `Account`, `Priority`.
- **By Status** — grouped on `Status`.
- **By Priority** — grouped on `Priority`.
- **In Progress** — filtered `Status = "In Progress"`.
- **Overdue** — filtered `Days_Overdue > 0`.
- **High ROI** — filtered `Three_Year_ROI_Percent > 300`, sorted descending.

## Columns
| # | Column | Type | Requirements | Formula / Logic | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | `Initiative_ID` | Text (Row ID) | Required, unique | `"INI-" & Format(thisRow.RowNumber(), "00000")` | Primary identifier |
| 2 | `Account` | Relation (single) | Required | — | Links to `Account_Master` |
| 3 | `Initiative_Name` | Text | Required | — | |
| 4 | `Initiative_Type` | Select | Required | Options: Platform Migration, Capability Development, Governance Enhancement, Monitoring/Observability, Training/Enablement, Technical Debt Remediation, API Development, Integration Project | |
| 5 | `Proposed_By` | Select | Required | Options: Customer, CSM, SE, AE, Both | |
| 6 | `Linked_Strategic_Objectives` | Relation (multi) | Optional | — | |
| 7 | `Linked_Capabilities` | Relation (multi) | Optional | — | |
| 8 | `Business_Driver` | Text | Optional | — | |
| 9 | `Priority` | Select | Required | Options: P0-Critical, P1-High, P2-Medium, P3-Low | |
| 10 | `Phase` | Select | Default: Discovery | Options: Discovery, Planning, Design, Build, Test, Deploy, Monitor, Closed | |
| 11 | `Status` | Select | Default: Proposed | Options: Proposed, Approved, In Progress, On Hold, Completed, Cancelled | |
| 12 | `Status_Color` | Text | Auto | `Switch([Status], "Completed","🟢","In Progress","🟡","On Hold","🟠","Cancelled","⚫","🔵")` | Emoji indicator |
| 13 | `Start_Date` | Date | Optional | — | |
| 14 | `Target_Completion_Date` | Date | Optional | — | |
| 15 | `Actual_Completion_Date` | Date | Optional | — | |
| 16 | `Days_Overdue` | Number | Auto | `If(IsBlank([Actual_Completion_Date]) AND Today() > [Target_Completion_Date], Today() - [Target_Completion_Date], 0)` | |
| 17 | `On_Time_Flag` | Text | Auto | `If([Days_Overdue] > 30,"🔴 Severely Delayed",If([Days_Overdue] > 7,"🟡 Delayed",If([Status] = "Completed","🟢 On Time","")))` | |
| 18 | `Investment_Amount_USD` | Currency | Optional | — | Total cost |
| 19 | `MuleSoft_Services_USD` | Currency | Optional | — | Sub-component |
| 20 | `Customer_Investment_USD` | Currency | Optional | — | Sub-component |
| 21 | `Expected_Annual_Benefit_USD` | Currency | Optional | — | Benefits assumption |
| 22 | `Expected_Payback_Months` | Number (1 decimal) | Auto | `If([Expected_Annual_Benefit_USD] > 0, [Investment_Amount_USD] / ([Expected_Annual_Benefit_USD] / 12), 0)` | |
| 23 | `Three_Year_ROI_Percent` | Number (0 decimals, %) | Auto | `If([Investment_Amount_USD] > 0, ((([Expected_Annual_Benefit_USD] * 3) - [Investment_Amount_USD]) / [Investment_Amount_USD]) * 100, 0)` | |
| 24 | `Realized_Annual_Benefit_USD` | Currency | Optional | — | Actuals |
| 25 | `Success_Criteria` | Canvas | Optional | — | |
| 26 | `Owner_MuleSoft` | Person (lookup) | Optional | — | From `People_Team` |
| 27 | `Owner_Customer` | Text | Optional | — | |
| 28 | `Next_Milestone` | Text | Optional | — | |
| 29 | `Blockers` | Text | Optional | — | |
| 30 | `Last_Update_Date` | Date | Optional | — | Manual field for reporting |

## Implementation Notes
- Encourage consistent update cadence by automating reminders when `Last_Update_Date` older than 14 days.
- Use `Phase` progression to drive Kanban board for initiative management.
- Connect to ROI button automation to feed investment and benefit aggregations.
