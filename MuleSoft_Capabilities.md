---
title: MuleSoft_Capabilities
tags: [table, coda, cs-platform, phase-1]
aliases: [MuleSoft Capabilities]
---

# MuleSoft_Capabilities

> [!summary] Capability maturity assessment table tracking current and target states, gaps, and linked value realization.

## Purpose
- Evaluate MuleSoft capability domains for each account.
- Highlight maturity gaps, required investments, and business impact.
- Feed health scoring, risk assessment, and prioritization dashboards.

## Key Relationships
- Many-to-one relation to `[[Account_Master]]`.
- Many-to-many relations with `[[Strategic_Objectives]]` (`Linked_Strategic_Objectives`) and `[[Value_Streams]]` (`Supporting_Value_Streams`).
- Referenced by `[[Platform_Health_Metrics]]`, `[[Risk_Register]]`, and `[[Initiatives]]`.

## Views
- **All Capabilities** — sorted by `Account`, `Capability_Domain`.
- **By Gap Status** — grouped on `Gap_Status`.
- **Critical Gaps** — filtered `Gap_Status` contains “Critical”.
- **By Priority** — grouped on `Priority`.

## Columns
| # | Column | Type | Requirements | Formula / Logic | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | `Capability_ID` | Text (Row ID) | Required, unique | `"CAP-" & Format(thisRow.RowNumber(), "00000")` | Primary identifier |
| 2 | `Account` | Relation (single) | Required | — | Links to `Account_Master` |
| 3 | `Capability_Domain` | Select | Required | Options: Integration, API Management, Automation, Data Governance, Security, DevOps, Analytics, Event-Driven Architecture | Indexed |
| 4 | `Capability_Name` | Text | Required | — | e.g., API-Led Connectivity |
| 5 | `Description` | Canvas | Optional | — | Narrative details |
| 6 | `Current_Maturity` | Select | Required | Options: 1-Initial, 2-Developing, 3-Defined, 4-Managed, 5-Optimizing | |
| 7 | `Current_Maturity_Numeric` | Number | Auto | `Switch([Current_Maturity],"1-Initial",1,"2-Developing",2,"3-Defined",3,"4-Managed",4,"5-Optimizing",5)` | |
| 8 | `Target_Maturity` | Select | Required | Same options as current | |
| 9 | `Target_Maturity_Numeric` | Number | Auto | `Switch([Target_Maturity], ... )` | Mirror logic |
| 10 | `Maturity_Gap` | Number | Auto | `[Target_Maturity_Numeric] - [Current_Maturity_Numeric]` | |
| 11 | `Gap_Status` | Text | Auto | `If([Maturity_Gap] >= 3,"🔴 Critical Gap",If([Maturity_Gap] = 2,"🟡 Moderate Gap",If([Maturity_Gap] = 1,"🟢 Small Gap","✅ At Target")))` | Apply conditional formatting |
| 12 | `Linked_Strategic_Objectives` | Relation (multi) | Optional | — | |
| 13 | `Supporting_Value_Streams` | Relation (multi) | Optional | — | |
| 14 | `Investment_Required_USD` | Currency | Optional | — | Cost to close gap |
| 15 | `Priority` | Select | Required | Options: P0-Critical, P1-High, P2-Medium, P3-Low | |
| 16 | `Implementation_Status` | Select | Default: Not Started | Options: Not Started, Planning, In Progress, Operational, Needs Enhancement, Blocked | |
| 17 | `Business_Impact_Statement` | Text | Optional | — | |
| 18 | `Technical_Owner_Customer` | Text | Optional | — | Customer lead |
| 19 | `Last_Assessment_Date` | Date | Optional | — | |

## Implementation Notes
- Use summary charts to visualize distribution of `Maturity_Gap` per domain.
- Automate reminders when `Last_Assessment_Date` exceeds 180 days.
- Consider calculated column for ROI by combining `Investment_Required_USD` with linked initiative benefits.
