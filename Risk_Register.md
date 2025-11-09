---
title: Risk_Register
tags: [table, coda, cs-platform, phase-1]
aliases: [Risk Register]
---

# Risk_Register

> [!summary] Comprehensive log of technical debt and operational risks impacting MuleSoft success, with quantified impact and mitigation plans.

## Purpose
- Capture and rank risks associated with MuleSoft implementations.
- Link risks to affected capabilities, APIs, value streams, and strategic objectives.
- Provide action tracking via mitigation initiatives and owners.

## Key Relationships
- Many-to-one relation to `[[Account_Master]]`.
- Links to `[[MuleSoft_Capabilities]]` (`Affected_Capability`), `[[API_Portfolio]]` (`Affected_APIs`), `[[Value_Streams]]` (`Affected_Value_Streams`), and `[[Strategic_Objectives]]` (`Linked_Strategic_Objective_at_Risk`).
- Optionally associates with `[[Initiatives]]` (`Mitigation_Initiative`) and `[[People_Team]]` (`Mitigation_Owner`).

## Views
- **All Risks** — default; sorted by `Risk_Score` descending.
- **By Risk Level** — grouped on `Risk_Level`.
- **Critical & High** — filtered `Risk_Level` ∈ {Critical, High}.
- **Open Risks** — filtered `Status = "Open"`.

## Columns
| # | Column | Type | Requirements | Formula / Logic | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | `Risk_ID` | Text (Row ID) | Required, unique | `"RISK-" & Format(thisRow.RowNumber(), "00000")` | Primary identifier |
| 2 | `Account` | Relation (single) | Required | — | Links to `Account_Master` |
| 3 | `Risk_Category` | Select | Required | Options: Technical Debt, Platform Risk, Security, Compliance, Performance, Scalability, Knowledge Gap, Vendor Dependency | |
| 4 | `Risk_Title` | Text | Required | — | Short summary |
| 5 | `Description` | Canvas | Optional | — | Detailed narrative |
| 6 | `Root_Cause` | Canvas | Optional | — | Underlying issues |
| 7 | `Affected_Capability` | Relation (single) | Optional | — | Links to `MuleSoft_Capabilities` |
| 8 | `Affected_APIs` | Relation (multi) | Optional | — | Links to `API_Portfolio` |
| 9 | `Affected_Value_Streams` | Relation (multi) | Optional | — | Links to `Value_Streams` |
| 10 | `Linked_Strategic_Objective_at_Risk` | Relation (multi) | Optional | — | Links to `Strategic_Objectives` |
| 11 | `Impact` | Select | Required | Options: Critical, High, Medium, Low | |
| 12 | `Impact_Score_1_5` | Number | Auto | `Switch([Impact],"Critical",5,"High",4,"Medium",3,"Low",2)` | |
| 13 | `Probability` | Select | Required | Options: Very Likely (>75%), Likely (50-75%), Possible (25-50%), Unlikely (<25%) | |
| 14 | `Probability_Score_1_5` | Number | Auto | `Switch([Probability], "Very Likely (>75%)",5, "Likely (50-75%)",4, "Possible (25-50%)",3, "Unlikely (<25%)",2)` | |
| 15 | `Risk_Score` | Number | Auto | `[Impact_Score_1_5] * [Probability_Score_1_5]` | Range 4–25 |
| 16 | `Risk_Level` | Text | Auto | `If([Risk_Score] >= 20,"Critical",If([Risk_Score] >= 12,"High",If([Risk_Score] >= 6,"Medium","Low")))` | Conditional formatting by color |
| 17 | `Potential_Business_Impact_USD` | Currency | Optional | — | |
| 18 | `Potential_Business_Impact_Operational` | Text | Optional | — | Qualitative impact |
| 19 | `Mitigation_Strategy` | Canvas | Optional | — | Planned actions |
| 20 | `Mitigation_Initiative` | Relation (single) | Optional | — | Links to `Initiatives` |
| 21 | `Mitigation_Owner` | Person (lookup) | Optional | — | From `People_Team` |
| 22 | `Target_Resolution_Date` | Date | Optional | — | |
| 23 | `Status` | Select | Required | Options: Open, In Progress, Mitigated, Accepted, Closed | |
| 24 | `Date_Identified` | Date | Optional | — | |
| 25 | `Date_Closed` | Date | Optional | — | |

## Implementation Notes
- Configure conditional formatting for `Risk_Level` and SLA-driven alerts to insert new rows automatically for mission-critical API degradations.
- Use grouped view by `Mitigation_Owner` to track outstanding actions.
- Consider automation to notify owners when `Target_Resolution_Date` is within 7 days and status not `Mitigated`/`Closed`.
