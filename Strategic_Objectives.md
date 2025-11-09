---
title: Strategic_Objectives
tags: [table, coda, cs-platform, phase-1]
aliases: [Strategic Objectives]
---

# Strategic_Objectives

> [!summary] Catalog of quantified customer objectives with MuleSoft alignment, value, and progress tracking.

## Purpose
- Map customer strategic goals to MuleSoft capabilities and value streams.
- Track progress, status, and health signals for executive reporting and QBR decks.
- Feed health score calculations in `[[Account_Master]]` and impact scoring in multiple dashboards.

## Key Relationships
- Many-to-one relation to `[[Account_Master]]` (`Account` column).
- Many-to-many relations with `[[MuleSoft_Capabilities]]`, `[[Value_Streams]]`, and `[[Initiatives]]`.
- Provides references for `[[Stakeholder_Outcomes]]`, `[[Platform_Health_Metrics]]`, and `[[API_Portfolio]]`.

## Views
- **All Objectives** — default; sorted by `Account`, `Strategic_Pillar`.
- **By Status** — grouped on `Status`.
- **By Strategic Pillar** — grouped on `Strategic_Pillar`.
- **At Risk** — filtered `Status = "At Risk"`.
- **High Impact** — filtered `MuleSoft_Impact_Score > 10`.

## Columns
| # | Column | Type | Requirements | Formula / Logic | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | `Objective_ID` | Text (Row ID) | Required, unique | `"OBJ-" & Format(thisRow.RowNumber(), "00000")` | Primary identifier |
| 2 | `Account` | Relation (single) | Required | — | Links to `Account_Master` |
| 3 | `Strategic_Pillar` | Select | Required | Options: Revenue Growth, Cost Optimization, Customer Experience, Operational Resilience, Innovation Velocity, Risk Mitigation, Sustainability/ESG, Market Expansion, Compliance/Regulatory | Indexed |
| 4 | `Objective_Name` | Text | Required | — | Short title |
| 5 | `Description` | Canvas | Optional | — | Detailed narrative |
| 6 | `Business_Driver` | Text | Optional | — | Triggering event |
| 7 | `Quantified_Goal` | Text | Required | — | SMART statement |
| 8 | `Target_Date` | Date | Optional | — | |
| 9 | `Business_Owner` | Text | Optional | — | Customer-side owner |
| 10 | `Business_Value_USD` | Currency | Optional | — | Estimated impact |
| 11 | `MuleSoft_Relevance` | Select | Required | Options: Critical Enabler, Supporting, Adjacent, Not Applicable | |
| 12 | `Status` | Select | Required, default `Not Started` | Options: Not Started, Planning, In Progress, At Risk, Achieved, Blocked, Cancelled | |
| 13 | `Progress_Percent` | Slider (0–100) | Default 0 | — | |
| 14 | `Health_Indicator` | Text | Auto | `If([Status] = "At Risk","🔴 Risk",If([Status] = "Achieved","🟢 Complete",If([Status] = "In Progress","🟡 Active","⚪ Pending")))` | |
| 15 | `Last_Review_Date` | Date | Optional | — | |
| 16 | `Notes` | Canvas | Optional | — | |
| 17 | `Linked_Capabilities` | Relation (multi) | Optional | — | To `MuleSoft_Capabilities` |
| 18 | `Linked_Value_Streams` | Relation (multi) | Optional | — | To `Value_Streams` |
| 19 | `Linked_Initiatives` | Relation (multi) | Optional | — | To `Initiatives` |
| 20 | `MuleSoft_Impact_Score` | Number | Auto | `[Linked_Capabilities].Count() * [Linked_Value_Streams].[Supporting_APIs].Count() * ([Business_Value_USD] / 1,000,000)` | Adjust `Supporting_APIs` name if different |

## Implementation Notes
- Use conditional color formatting on `Status` and `Health_Indicator` for quick prioritization.
- Ensure `Linked_Value_Streams` relation exposes supporting API count via lookup column (`Supporting_APIs`).
- Include `Strategic_Pillar` filter control in dashboards for pivoting objectives by theme.
