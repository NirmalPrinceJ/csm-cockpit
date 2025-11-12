# View Pages Formula Reference
## Account Success Intelligence Platform

Quick reference for all formulas used across the 5 view pages.

---

## COMMON PATTERNS

### Get Account Data
```
=AccountMaster.Filter(accountName=[AccountName]).First()
```

### Get Specific Account Field
```
=AccountMaster.Filter(accountName=[AccountName]).First().healthScore
=AccountMaster.Filter(accountName=[AccountName]).First().arr
=AccountMaster.Filter(accountName=[AccountName]).First().daysToRenewal
```

### Count Records
```
=AccountMaster.Filter(condition).Count()
=RiskRegister.Filter(status='Active').Count()
```

### Sum Values
```
=AccountMaster.Filter(condition).Sum(arr)
=Initiatives.Filter(condition).Sum(investmentAmountUsd)
```

### Average Values
```
=AccountMaster.Filter(condition).Average(healthScore)
```

---

## PAGE 1: EXECUTIVE SUMMARY

### Account Overview Card

**Account Name:**
```
=AccountMaster.Filter(accountName=[AccountName]).First().accountName
```

**Health Score:**
```
=AccountMaster.Filter(accountName=[AccountName]).First().healthScore
```

**Platform Health Score:**
```
=AccountMaster.Filter(accountName=[AccountName]).First().platformHealthScore
```

**Business Value Score:**
```
=AccountMaster.Filter(accountName=[AccountName]).First().businessValueRealizationScore
```

**Stakeholder Engagement Score:**
```
=AccountMaster.Filter(accountName=[AccountName]).First().stakeholderEngagementScore
```

**Strategic Alignment Score:**
```
=AccountMaster.Filter(accountName=[AccountName]).First().strategicAlignmentScore
```

**ARR:**
```
=AccountMaster.Filter(accountName=[AccountName]).First().arr
```

**Days to Renewal:**
```
=AccountMaster.Filter(accountName=[AccountName]).First().daysToRenewal
```

**Risk Level:**
```
=AccountMaster.Filter(accountName=[AccountName]).First().riskLevel
```

### Strategic Objectives Table
**Filter:**
```
account=[AccountName] AND status!='Completed'
```

**Sort:**
```
businessValueUsd: Descending
progressPercent: Ascending
```

---

## PAGE 2: CSM COMMAND CENTER

### Account Portfolio Summary Row

**Total ARR:**
```
=AccountMaster.Filter(customerSuccessManager=[YourName]).Sum(arr)
```

**Average Health Score:**
```
=AccountMaster.Filter(customerSuccessManager=[YourName]).Average(healthScore)
```

**Account Count:**
```
=AccountMaster.Filter(customerSuccessManager=[YourName]).Count()
```

### Renewal Pipeline Summary

**Total Renewal Value (90 days):**
```
=AccountMaster.Filter(customerSuccessManager=[YourName] AND daysToRenewal<=90).Sum(arr)
```

**Total Expansion Opportunity:**
```
=SuccessPlanTracker.Filter(
  account.In(AccountMaster.Filter(customerSuccessManager=[YourName]).accountName)
).Sum(expansionOpportunityUsd)
```

### My Tasks - Calculated Column

**Days Until Due:**
```
=dueDate - Today()
```

### Portfolio Risks - Calculated Column

**Risk Score:**
```
=impactScore * probabilityScore
```

---

## PAGE 3: HEALTH DASHBOARD

### Health Summary Tiles

**Critical Accounts Count:**
```
=AccountMaster.Filter(healthScore < 60).Count()
```

**At Risk Accounts Count:**
```
=AccountMaster.Filter(healthScore >= 60 AND healthScore < 80).Count()
```

**Active High Risks Count:**
```
=RiskRegister.Filter(
  status.Contains('Active') AND 
  riskLevel.In(['High', 'Critical'])
).Count()
```

**Platform Alerts Count:**
```
=PlatformHealthMetrics.Filter(healthStatus = 'Critical').Count()
```

### At-Risk Accounts - Calculated Column

**Days Since Last Touch:**
```
=Today() - lastEngagementDate
```

### Platform Health Metrics - Calculated Column

**Gap Percent:**
```
=If(targetValue > 0,
  ((targetValue - currentValue) / targetValue) * 100,
  0
)
```

---

## PAGE 4: QBR PREPARATION VIEW

### Value Delivered Summary Tiles

**Total Investment:**
```
=Initiatives.Filter(
  account=[AccountName] AND 
  status='Completed' AND
  completedDate >= [QuarterStartDate]
).Sum(investmentAmountUsd)
```

**Total Value Realized:**
```
=Initiatives.Filter(
  account=[AccountName] AND 
  status='Completed' AND
  completedDate >= [QuarterStartDate]
).Sum(realizedAnnualBenefitUsd)
```

**Average ROI:**
```
=Initiatives.Filter(
  account=[AccountName] AND 
  status='Completed' AND
  completedDate >= [QuarterStartDate]
).Average(actualROIPercent)
```

**Initiatives Completed:**
```
=Initiatives.Filter(
  account=[AccountName] AND 
  status='Completed' AND
  completedDate >= [QuarterStartDate]
).Count()
```

### Strategic Objectives - Calculated Column

**Days to Target:**
```
=targetDate - Today()
```

### Platform Capabilities - Calculated Column

**Maturity Gap:**
```
=targetMaturityNumeric - currentMaturityNumeric
```

### Stakeholder Engagement Summary

**Total Engagements (Quarter):**
```
=EngagementLog.Filter(
  account=[AccountName] AND
  engagementDate >= [QuarterStart] AND
  engagementDate <= [QuarterEnd]
).Count()
```

**Average Sentiment Score:**
```
=EngagementLog.Filter(
  account=[AccountName] AND
  engagementDate >= [QuarterStart] AND
  engagementDate <= [QuarterEnd]
).Average(engagementScore)
```

---

## PAGE 5: RENEWAL PIPELINE

### Executive Summary One-Liner

**Complete Formula:**
```
='Renewal Pipeline: ' +
  AccountMaster.Filter(daysToRenewal <= 180).Count().ToString() +
  ' accounts | $' +
  Format(AccountMaster.Filter(daysToRenewal <= 180).Sum(arr)/1000000, '0.0') +
  'M ARR | ' +
  AccountMaster.Filter(
    daysToRenewal <= 180 AND 
    riskLevel.In(['Critical','At Risk'])
  ).Count().ToString() +
  ' at risk'
```

### Pipeline Summary Tiles

**Total Renewal ARR:**
```
=AccountMaster.Filter(daysToRenewal <= 180).Sum(arr)
```

**At-Risk ARR:**
```
=AccountMaster.Filter(
  daysToRenewal <= 180 AND 
  riskLevel.In(['Critical','At Risk'])
).Sum(arr)
```

**Accounts Renewing:**
```
=AccountMaster.Filter(daysToRenewal <= 180).Count()
```

**Expansion Opportunity:**
```
=SuccessPlanTracker.Filter(
  account.In(
    AccountMaster.Filter(daysToRenewal <= 180).accountName
  )
).Sum(expansionOpportunityUsd)
```

**Average Health Score:**
```
=AccountMaster.Filter(daysToRenewal <= 180).Average(healthScore)
```

### Main Renewal Pipeline - Calculated Columns

**Renewal Quarter:**
```
=If(daysToRenewal <= 90,
  'Q' + Format(Today().AddDays(daysToRenewal).Quarter()),
  ''
)
```

**Days Since Last Touch:**
```
=Today() - lastEngagementDate
```

**Active Risk Count:**
```
=RiskRegister.Filter(
  account=thisRow.accountName AND 
  status.Contains('Active')
).Count()
```

### Renewal Timeline - Monthly Bars

**Month 1 (0-30 days):**
```
=AccountMaster.Filter(
  daysToRenewal >= 0 AND 
  daysToRenewal <= 30
).Sum(arr)
```

**Month 2 (31-60 days):**
```
=AccountMaster.Filter(
  daysToRenewal >= 31 AND 
  daysToRenewal <= 60
).Sum(arr)
```

**Month 3 (61-90 days):**
```
=AccountMaster.Filter(
  daysToRenewal >= 61 AND 
  daysToRenewal <= 90
).Sum(arr)
```

**Month 4 (91-120 days):**
```
=AccountMaster.Filter(
  daysToRenewal >= 91 AND 
  daysToRenewal <= 120
).Sum(arr)
```

**Month 5 (121-150 days):**
```
=AccountMaster.Filter(
  daysToRenewal >= 121 AND 
  daysToRenewal <= 150
).Sum(arr)
```

**Month 6 (151-180 days):**
```
=AccountMaster.Filter(
  daysToRenewal >= 151 AND 
  daysToRenewal <= 180
).Sum(arr)
```

---

## CONDITIONAL FORMATTING FORMULAS

### Health Score Colors

**Critical (Red):**
```
If(healthScore < 60, "Red", ...)
```

**At Risk (Yellow):**
```
If(healthScore >= 60 AND healthScore < 80, "Yellow", ...)
```

**Healthy (Green):**
```
If(healthScore >= 80, "Green", ...)
```

### Days to Renewal Colors

**Urgent (Red):**
```
If(daysToRenewal < 60, "Red", ...)
```

**Soon (Orange):**
```
If(daysToRenewal >= 60 AND daysToRenewal < 90, "Orange", ...)
```

**Approaching (Yellow):**
```
If(daysToRenewal >= 90 AND daysToRenewal < 180, "Yellow", ...)
```

### Progress Percent Colors

**Behind (Red):**
```
If(progressPercent < 30, "Red", ...)
```

**On Track (Yellow):**
```
If(progressPercent >= 30 AND progressPercent < 70, "Yellow", ...)
```

**Ahead (Green):**
```
If(progressPercent >= 70, "Green", ...)
```

### ROI Percent Colors

**Excellent (Dark Green):**
```
If(threeYearROIPercent > 300, "DarkGreen", ...)
```

**Good (Green):**
```
If(threeYearROIPercent >= 200 AND threeYearROIPercent <= 300, "Green", ...)
```

**Acceptable (Yellow):**
```
If(threeYearROIPercent >= 100 AND threeYearROIPercent < 200, "Yellow", ...)
```

**Poor (Red):**
```
If(threeYearROIPercent < 100, "Red", ...)
```

---

## LOOKUP FORMULAS

### Get Account Field from Related Table

**Get ARR from Account (from any table with account relation):**
```
=AccountMaster.Filter(accountName=thisRow.account).First().arr
```

**Get Health Score from Account:**
```
=AccountMaster.Filter(accountName=thisRow.account).First().healthScore
```

**Get CSM Name from Account:**
```
=AccountMaster.Filter(accountName=thisRow.account).First().customerSuccessManager
```

### Get Related Records Count

**Count Risks for Account:**
```
=RiskRegister.Filter(account=thisRow.accountName).Count()
```

**Count Active Initiatives for Account:**
```
=Initiatives.Filter(
  account=thisRow.accountName AND 
  status.In(['In Progress', 'Planning'])
).Count()
```

**Count Objectives for Account:**
```
=StrategicObjectives.Filter(account=thisRow.accountName).Count()
```

---

## DATE FORMULAS

### Current Date
```
=Today()
```

### Calculate Days Between
```
=endDate - startDate
=renewalDate - Today()
```

### Quarter Calculation
```
=Today().Quarter()
=renewalDate.Quarter()
```

### Format Date
```
=Format(Today(), 'YYYY-MM-DD')
=Format(Today(), 'MMM DD, YYYY')
```

### Add Days to Date
```
=Today().AddDays(30)
=Today().AddDays(90)
```

---

## TEXT FORMULAS

### Concatenation
```
='Text ' + variableName + ' more text'
='Q' + quarterNumber.ToString() + ' ' + year.ToString()
```

### Format Number
```
=Format(number, '0.0')  // One decimal
=Format(number, '0.00')  // Two decimals
=Format(number, '#,##0')  // Thousands separator
```

### Format Currency
```
=Format(amount/1000000, '0.0') + 'M'  // $2.5M
='$' + Format(amount, '#,##0')  // $2,500,000
```

### Truncate Text
```
=Left(longText, 100)  // First 100 characters
=Left(longText, 100) + '...'  // With ellipsis
```

---

## AGGREGATE FORMULAS

### Sum
```
=Sum(column)
=TableName.Filter(condition).Sum(column)
```

### Average
```
=Average(column)
=TableName.Filter(condition).Average(column)
```

### Count
```
=Count()
=TableName.Filter(condition).Count()
```

### Min/Max
```
=Min(column)
=Max(column)
```

---

## FILTER FORMULAS

### Single Condition
```
TableName.Filter(column = value)
TableName.Filter(column != value)
TableName.Filter(column > value)
TableName.Filter(column < value)
```

### Multiple Conditions (AND)
```
TableName.Filter(condition1 AND condition2)
TableName.Filter(column1 = value1 AND column2 > value2)
```

### Multiple Conditions (OR)
```
TableName.Filter(condition1 OR condition2)
TableName.Filter(column1 = value1 OR column1 = value2)
```

### In List
```
TableName.Filter(column.In([value1, value2, value3]))
```

### Contains
```
TableName.Filter(column.Contains('text'))
TableName.Filter(status.Contains('Active'))
```

---

## SORTING

### Single Column
```
TableName.Sort(column)  // Ascending
TableName.Sort(-column)  // Descending
```

### Multiple Columns
```
TableName.Sort(column1, column2)
TableName.Sort(-column1, column2)  // First desc, second asc
```

---

## TIPS & TRICKS

### Check for Empty/Null
```
=If(IsBlank(value), "Empty", "Has value")
=If(IsNotBlank(value), "Has value", "Empty")
```

### Nested If Statements
```
=If(condition1, result1,
  If(condition2, result2,
    If(condition3, result3,
      defaultResult)))
```

### Switch Statement
```
=Switch(value,
  option1, result1,
  option2, result2,
  option3, result3,
  defaultResult)
```

### Handle Division by Zero
```
=If(denominator = 0, 0, numerator / denominator)
=If(denominator > 0, numerator / denominator, 0)
```

### Percentage Calculation
```
=(value / total) * 100
=((current - baseline) / baseline) * 100
```

---

## DEBUGGING FORMULAS

### Check Formula Result
```
Use Coda's formula bar to see calculated result
Click column header → Edit formula
```

### Common Errors

**#ERROR:**
- Check table name spelling (case-sensitive)
- Check column name spelling (case-sensitive)
- Verify filter returns at least one record
- Check .First() is used when expecting single record

**#CIRCULAR:**
- Formula refers to itself
- Break circular dependency
- Use helper column if needed

**#VALUE:**
- Wrong data type
- Check number vs text vs date
- Use conversion functions if needed

**Empty Result:**
- Filter may be too restrictive
- No matching records
- Add fallback: .First(defaultValue)

---

## PERFORMANCE TIPS

1. **Filter early:** Apply filters before calculations
2. **Avoid nested lookups:** Use one lookup, store in column
3. **Limit results:** Use .Limit(n) for large tables
4. **Cache calculations:** Store in column vs recalculating
5. **Use featured properties:** Faster than custom formulas

---

## RESOURCES

- **Coda Formula Reference:** https://help.coda.io/en/articles/3271711
- **Pack Schema Reference:** See schemas.ts in this repo
- **View Specifications:** See VIEW_PAGES_FIGJAM_GUIDE.md
- **Implementation Guide:** See VIEW_PAGES_IMPLEMENTATION_GUIDE.md

---

**Copy and paste these formulas directly into your Coda doc!** 📋
