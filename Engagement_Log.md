---
title: Engagement_Log
tags: [table, coda, cs-platform, phase-1]
aliases: [Engagement Log]
---

# Engagement_Log

> [!summary] Interaction history capturing meeting details, sentiment, and relationship depth for each account.

## Purpose
- Track all customer touchpoints for visibility across success, sales, and leadership teams.
- Provide recent engagement data feeding `[[Account_Master]]` cadence formulas.
- Support automation triggers (e.g., renewal follow-up, sentiment monitoring).

## Key Relationships
- Many-to-one relation to `[[Account_Master]]`.
- Person lookup to `[[People_Team]]` via `Attendees_MuleSoft`.
- Influences `Stakeholder_Engagement` component of account health.

## Views
- **All Engagements** — default, sorted by `Engagement_Date` descending.
- **By Account** — grouped on `Account`.
- **Recent** — filtered `Engagement_Date >= Today() - 90`.
- **QBRs** — filtered `Engagement_Type = "QBR"`.

## Columns
| # | Column | Type | Requirements | Formula / Logic | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | `Engagement_ID` | Text (Row ID) | Required, unique | `"ENG-" & Format(thisRow.RowNumber(), "00000")` | Primary identifier |
| 2 | `Account` | Relation (single) | Required | — | Links to `Account_Master` |
| 3 | `Engagement_Date` | Date | Required | — | |
| 4 | `Engagement_Type` | Select | Required | Options: QBR, Executive Sponsor Call, Technical Review, Health Check, Training, Workshop, Success Plan Review, Escalation | |
| 5 | `Attendees_MuleSoft` | Person (multi) | Optional | — | Lookup to `People_Team` |
| 6 | `Attendees_Customer` | Text | Optional | — | Comma-separated names |
| 7 | `Customer_Seniority` | Select | Optional | Options: C-Level, VP, Director, Manager, IC | |
| 8 | `Topics_Discussed` | Canvas | Optional | — | Meeting notes |
| 9 | `Action_Items` | Canvas | Optional | — | Follow-up tasks |
| 10 | `Next_Steps` | Canvas | Optional | — | Planned actions |
| 11 | `Notes` | Canvas | Optional | — | Additional commentary |
| 12 | `Sentiment` | Select | Required | Options: Very Positive, Positive, Neutral, Concerned, Very Concerned | |
| 13 | `Strategic_Alignment_Score` | Slider (1–10) | Optional | — | Alignment perception |
| 14 | `Technical_Health_Score` | Slider (1–10) | Optional | — | Customer view of platform health |
| 15 | `Relationship_Depth_Score` | Slider (1–10) | Optional | — | Used in `Stakeholder_Engagement` rollup |
| 16 | `Next_Engagement_Date` | Date | Optional | — | Schedule follow-up |

## Implementation Notes
- Implement button to log new engagement from `Account_Master` view using form or prefilled template.
- Use automations to remind team if `Next_Engagement_Date` is within 7 days and follow-up not logged.
- Consider additional derived column for `Engagement_Age` to identify stale relationships.
