---
title: Account_Master
tags: [table, coda, cs-platform, phase-1]
aliases: [Account Master]
---

# Account_Master

> [!summary] Master account record linking every downstream table within the Customer Success Intelligence Platform.

## Purpose
- Central source of truth for contract metadata, financials, ownership, health scoring, and engagement cadence.
- Drives dashboards (`CSM Command Center`, `Platform Health Dashboard`) and automations (`Renewal Risk Detector`, health score refresh).

## Key Relationships
- One-to-many with `[[Strategic_Objectives]]`, `[[MuleSoft_Capabilities]]`, `[[Value_Streams]]`, `[[API_Portfolio]]`, `[[Platform_Health_Metrics]]`, `[[Initiatives]]`, `[[Risk_Register]]`, `[[Stakeholder_Outcomes]]`, `[[Engagement_Log]]`.
- Many-to-one lookups to `[[People_Team]]` for `Customer_Success_Manager`, `Account_Executive`, `Solutions_Architect`, `Executive_Sponsor_MuleSoft`.
- Historical rollups rely on `[[Account_Master_History]]` (supporting table) for trend calculations.

## Views
- **All Accounts** — default list sorted by `Account_Name`.
- **By CSM** — grouped by `Customer_Success_Manager`.
- **Renewal Risk** — filtered `Renewal_Risk_Level` ∈ {Critical, At Risk}, sorted by `Days_To_Renewal`.
- **Health Score** — sorted by `Health_Score` ascending.

## Columns
| # | Column | Type | Requirements | Formula / Logic | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | `Account_ID` | Text (Row ID) | Required, unique | `"ACC-" & Format(thisRow.RowNumber(), "00000")` | Primary identifier |
| 2 | `Account_Name` | Text | Required, unique | — | Customer company name |
| 3 | `Industry_Vertical` | Select | Required | Options: Maritime, Financial Services, Healthcare, Retail, Manufacturing, Energy, Public Sector, Technology, Telecommunications | |
| 4 | `Industry_Sub_Sector` | Text | Optional | — | Specific segment |
| 5 | `Contract_Type` | Select | Required | Options: Signature Success, Premier Success, Standard | |
| 6 | `Contract_Start_Date` | Date | Required | — | |
| 7 | `Contract_End_Date` | Date | Required | — | |
| 8 | `Renewal_Date` | Date | Required | — | |
| 9 | `Days_To_Renewal` | Number | Auto | `[Renewal_Date] - Today()` | Negative when overdue |
| 10 | `ARR` | Currency | Required | — | Annual recurring revenue |
| 11 | `ACV` | Currency | Optional | — | Annual contract value |
| 12 | `Customer_Success_Manager` | Person (lookup) | Required | — | Lookup to `People_Team` |
| 13 | `Account_Executive` | Person (lookup) | Optional | — | Lookup to `People_Team` |
| 14 | `Solutions_Architect` | Person (lookup) | Optional | — | Lookup to `People_Team` |
| 15 | `Executive_Sponsor_MuleSoft` | Person (lookup) | Optional | — | Lookup to `People_Team` |
| 16 | `Health_Score` | Number (1 decimal) | Auto | `([Platform_Technical_Health]*0.35)+([Business_Value_Realization]*0.30)+([Stakeholder_Engagement]*0.20)+([Strategic_Alignment]*0.15)` | 0–100 composite |
| 17 | `Platform_Technical_Health` | Number | Auto | `Average(Filter([Platform_Health_Metrics], [Account].[Account_ID]=thisRow.[Account_ID] AND [Metric_Category].HasAny("Performance","Reliability","Security")).[Health_Status_Numeric])` | Guard with `IfError()` for no metrics |
| 18 | `Business_Value_Realization` | Number | Auto | `Average(Filter([Stakeholder_Outcomes], [Account].[Account_ID]=thisRow.[Account_ID] AND [Status] != "Not Started").[Target_Achievement_Percent])` | |
| 19 | `Stakeholder_Engagement` | Number | Auto | `Average(Filter([Engagement_Log], [Account].[Account_ID]=thisRow.[Account_ID] AND [Engagement_Date] >= Today() - 90).[Relationship_Depth_Score])` | 90-day window |
| 20 | `Strategic_Alignment` | Number | Auto | `(CountIf([Strategic_Objectives], [Account].[Account_ID]=thisRow.[Account_ID] AND [Status].HasAny("On Track","Achieved")) / CountIf([Strategic_Objectives], [Account].[Account_ID]=thisRow.[Account_ID])) * 100` | Wrap with `If()` to avoid divide-by-zero |
| 21 | `Health_Score_Trend_30d` | Number | Auto | `[Health_Score] - Lookup([Account_Master_History], [Account_ID]=thisRow.[Account_ID] AND [Date]=Today() - 30).[Health_Score]` | Requires history |
| 22 | `Health_Score_Change_Flag` | Text | Auto | `If([Health_Score_Trend_30d] < -5,"🔴 Declining",If([Health_Score_Trend_30d] > 5,"🟢 Improving","→ Stable"))` | |
| 23 | `Renewal_Risk_Level` | Text | Auto | `If([Health_Score] < 60 AND [Days_To_Renewal] < 180,"Critical",If([Health_Score] < 70 AND [Days_To_Renewal] < 365,"At Risk",If([Health_Score] < 80,"Attention Needed","Healthy")))` | Apply conditional formatting |
| 24 | `Account_Status` | Select | Default: Active | Options: Active, Renewal Pending, At Risk, Churned, Expired | |
| 25 | `S&P_Rating` | Text | Optional | — | Credit rating |
| 26 | `Customer_Annual_Revenue` | Currency | Optional | — | Customer company revenue |
| 27 | `Employee_Count` | Number | Optional | — | Total employees |
| 28 | `Geography` | Select | Optional | Options: EMEA, Americas, APAC | |
| 29 | `Country` | Text | Optional | — | |
| 30 | `Primary_Contact_Name` | Text | Optional | — | |
| 31 | `Primary_Contact_Email` | Email | Optional | — | |
| 32 | `Primary_Contact_Role` | Text | Optional | — | |
| 33 | `Last_Engagement_Date` | Date | Auto | `Max(Filter([Engagement_Log], [Account].[Account_ID]=thisRow.[Account_ID]).[Engagement_Date])` | |
| 34 | `Next_Engagement_Due` | Date | Auto | `[Last_Engagement_Date] + [Engagement_Cadence_Days]` | |
| 35 | `Engagement_Cadence_Days` | Number | Auto/default | `Switch([Contract_Type],"Signature Success",14,"Premier Success",30,60)` | |
| 36 | `Created_Date` | DateTime | Auto | — | Created timestamp |
| 37 | `Last_Modified` | DateTime | Auto | — | Modified timestamp |
| 38 | `Data_Source` | Select | Optional | Options: Salesforce Sync, Manual Entry, Slack Import, Webhook, Email Import | Provenance tracking |

## Sample Data (Gard AS)
Populate initial row with:
- `Account_Name`: Gard AS
- `Industry_Vertical`: Maritime
- `Industry_Sub_Sector`: P&I Insurance
- `Contract_Type`: Signature Success
- `Contract_Start_Date`: 2023-12-04
- `Contract_End_Date`: 2026-12-04
- `Renewal_Date`: 2026-12-19
- `ARR` & `ACV`: 450000
- `Customer_Annual_Revenue`: 1183000000
- `Employee_Count`: 683
- `Geography`: EMEA
- `Country`: Norway
- Assign `Customer_Success_Manager` from `[[People_Team]]`.

## Implementation Notes
- Ensure automation to append daily records into `Account_Master_History` to support trend formulas.
- Use conditional formatting to highlight `Renewal_Risk_Level` states.
- For blank averages, wrap formulas with `If(Count(...) = 0, Blank(), Average(...))` to avoid errors.
