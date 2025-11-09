---
title: Business_Context
tags: [table, coda, cs-platform, phase-1]
aliases: [Business Context]
---

# Business_Context

> [!summary] Strategic situational analysis capturing business environment, challenges, and digital posture per account.

## Purpose
- Maintain contextual intelligence for each account to inform success plans, QBRs, and initiative prioritization.
- Enforces a 1:1 relationship with `[[Account_Master]]`.
- Stores rich narrative content leveraging canvas columns for qualitative insights.

## Key Relationships
- Single relation to `[[Account_Master]]` (`Account` column).
- Updated metadata referenced by `[[Strategic_Objectives]]` narratives and QBR generation workflow.

## Views
- **All Contexts** — default list.
- **By Digital Maturity** — grouped on `Digital_Maturity`.

## Columns
| # | Column | Type | Requirements | Formula / Logic | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | `Context_ID` | Text (Row ID) | Required, unique | `"CTX-" & Format(thisRow.RowNumber(), "00000")` | Primary identifier |
| 2 | `Account` | Relation (single) | Required | — | Links to `Account_Master` |
| 3 | `Last_Updated` | DateTime | Auto | — | Modified timestamp |
| 4 | `Updated_By` | Person | Auto | — | Current user |
| 5 | `Business_Model` | Text | Optional | — | Example: Mutual Insurance |
| 6 | `Market_Position` | Select | Optional | Options: Market Leader, Challenger, Emerging Player, Niche Specialist | |
| 7 | `Operating_Environment` | Canvas | Optional | — | Rich text for geopolitical, regulatory context |
| 8 | `Key_Business_Challenges` | Canvas | Optional | — | Top challenges |
| 9 | `Strategic_Priorities_Current_Year` | Canvas | Optional | — | Bullet list of priorities |
| 10 | `Digital_Maturity` | Select | Optional | Options: Digital Native, Transforming, Traditional, Legacy | |
| 11 | `IT_Complexity_Score` | Slider (1–10) | Default 5 | — | 1=Simple, 10=Highly Complex |
| 12 | `Legacy_System_Count` | Number | Optional | — | |
| 13 | `Cloud_Strategy` | Select | Optional | Options: Cloud-First, Hybrid, On-Premise Preferred, Multi-Cloud | |
| 14 | `Data_Classification` | Select | Optional | Options: Highly Regulated (GDPR/HIPAA), Standard, Open | |

## Implementation Notes
- Configure canvas columns to encourage structured templates (e.g., bullet list prompts).
- Use automation or manual review cadence to ensure `Last_Updated` remains recent (e.g., within 90 days).
