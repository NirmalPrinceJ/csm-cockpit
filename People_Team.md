---
title: People_Team
tags: [table, coda, cs-platform, phase-1]
aliases: [People Team]
---

# People_Team

> [!summary] Directory of MuleSoft team members with portfolio analytics and Slack identifiers.

## Purpose
- Capture contact information, role, region, and Slack ID for each internal stakeholder.
- Provide reverse lookup relationships for accounts and initiatives.
- Aggregate ARR and health metrics per owner to support workload balancing.

## Key Relationships
- One-to-many reverse links from `[[Account_Master]]` via `Customer_Success_Manager`, `Account_Executive`, `Solutions_Architect`, `Executive_Sponsor_MuleSoft`.
- Person lookups used in `[[Initiatives]]`, `[[Risk_Register]]`, `[[Engagement_Log]]`, and automations (Slack alerts).
- Multi-relation `Accounts_Assigned` mirrors all accounts where the person is referenced.

## Views
- **All Team Members** — default, sorted by `Full_Name`.
- **By Role** — grouped on `Role`.
- **By Portfolio Size** — sorted by `Total_ARR_Managed` descending.

## Columns
| # | Column | Type | Requirements | Formula / Logic | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | `Person_ID` | Text (Row ID) | Required, unique | `"PER-" & Format(thisRow.RowNumber(), "00000")` | Primary identifier |
| 2 | `Full_Name` | Text | Required | — | |
| 3 | `Email` | Email | Required, unique | — | |
| 4 | `Role` | Select | Required | Options: CSM, AE, SE, Executive Sponsor, Product Manager, Customer Contact, Support Engineer | |
| 5 | `Department` | Select | Optional | Options: Customer Success, Sales, Solutions Engineering, Product, Support, Executive, Customer External | |
| 6 | `Region` | Select | Optional | Options: EMEA, Americas, APAC | |
| 7 | `Slack_User_ID` | Text | Optional | — | Slack member ID for automations |
| 8 | `Active_Status` | Checkbox | Default: true | — | Indicates active roster |
| 9 | `Accounts_Assigned` | Relation (multi) | Auto | — | Links to all `Account_Master` rows referencing this person |
| 10 | `Account_Count` | Number | Auto | `[Accounts_Assigned].Count()` | |
| 11 | `Total_ARR_Managed` | Currency | Auto | `[Accounts_Assigned].[ARR].Sum()` | |
| 12 | `Avg_Health_Score` | Number | Auto | `[Accounts_Assigned].[Health_Score].Average()` | Wrap with `If()` for no accounts |

## Implementation Notes
- Populate `Slack_User_ID` to enable alert automations (Renewal Risk, API Health).
- Use conditional formatting to highlight high `Total_ARR_Managed` loads for staffing decisions.
- Consider a filtered view for inactive records to keep primary views lean.
