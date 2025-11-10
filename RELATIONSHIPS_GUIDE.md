# CSM Intelligence Platform - Relationships & Lookups Guide

This guide explains how to create relationships between tables and use lookup formulas to build a connected workspace.

---

## 🔗 How Table Relationships Work

The CSM Intelligence Platform includes **16 sync tables** that are designed to work together. In Phase 1, you create relationships using:

1. **Lookup Columns** (Native Coda feature)
2. **Pack Lookup Formulas** (18 cross-table formulas)
3. **Filter Formulas** (Using Coda's built-in table filtering)

---

## 📊 Table Relationship Map

```
AccountMaster (Central Hub)
├── PeopleTeam (via customerSuccessManager, accountExecutive, solutionsArchitect)
├── BusinessContext (via account field)
├── StrategicObjectives (via account field)
│   └── Initiatives (via linkedInitiatives)
├── PlatformCapabilities (via account field)
├── ValueStreams (via account field)
├── APIPortfolio (via account field)
├── PlatformHealthMetrics (via account field)
├── RiskRegister (via account field)
├── StakeholderOutcomes (via account field)
├── EngagementLog (via account field)
├── SuccessPlanTracker (via account field)
└── ActivitiesTasks (via account field)
```

**Key Relationships**:
- **account** field = Links to AccountMaster.accountName
- **assignedTo** field = Links to PeopleTeam.fullName
- **linkedInitiatives** = Links to Initiatives.initiativeId
- **linkedObjective** = Links to StrategicObjectives.objectiveId

---

## 🛠️ Method 1: Using Lookup Columns (Recommended)

### Example 1: Add CSM Name to StrategicObjectives

1. Open **StrategicObjectives** table
2. Add a new column: "CSM Name"
3. Set column type: **Lookup**
4. Configure lookup:
   - Source table: **AccountMaster**
   - Match column: `AccountMaster.accountName` = `StrategicObjectives.account`
   - Return column: `AccountMaster.customerSuccessManager`

**Result**: Each objective now shows the assigned CSM automatically.

### Example 2: Show Account ARR in RiskRegister

1. Open **RiskRegister** table
2. Add column: "Account ARR"
3. Type: **Lookup**
4. Configure:
   - Source: **AccountMaster**
   - Match: `AccountMaster.accountName` = `RiskRegister.account`
   - Return: `AccountMaster.arr`
5. Format as currency

**Result**: Each risk now displays the ARR of the affected account.

### Example 3: Link Initiatives to Objectives

1. Open **Initiatives** table
2. Add column: "Objective Name"
3. Type: **Lookup**
4. Configure:
   - Source: **StrategicObjectives**
   - Match: `StrategicObjectives.objectiveId` = `Initiatives.linkedObjective`
   - Return: `StrategicObjectives.objectiveName`

**Result**: Each initiative shows its parent objective name.

---

## 📐 Method 2: Using Pack Lookup Formulas

The pack includes **18 lookup formulas** for quick cross-table references.

### Account Lookups

#### GetAccountHealth(accountName)
Returns the health score for an account.

**Example**:
```
GetAccountHealth("Acme Financial Services")
→ Returns: 82
```

**Use Case**: Display account health in Engagement Log or Tasks

#### GetAccountARR(accountName)
Returns the ARR for an account.

**Example**:
```
GetAccountARR("Nordic Logistics Group")
→ Returns: $850,000
```

#### GetAccountCSM(accountName)
Returns the CSM name for an account.

**Example**:
```
GetAccountCSM("HealthTech Solutions")
→ Returns: "Sarah Chen"
```

---

### Strategic Objective Lookups

#### CountObjectives(accountName, [status])
Count objectives for an account, optionally filtered by status.

**Examples**:
```
CountObjectives("Acme Financial Services")
→ Count all objectives

CountObjectives("Acme Financial Services", "In Progress")
→ Count only active objectives
```

#### GetObjectivesProgress(accountName)
Get average progress across all objectives.

**Example**:
```
GetObjectivesProgress("Nordic Logistics Group")
→ Returns: 65 (average %)
```

---

### Initiative Lookups

#### GetTotalInitiativeROI(accountName)
Sum of 3-year ROI across all initiatives.

**Example**:
```
GetTotalInitiativeROI("Acme Financial Services")
→ Returns: 2400 (total % ROI)
```

#### CountInitiativesByPriority(accountName, priority)
Count initiatives by priority level.

**Example**:
```
CountInitiativesByPriority("HealthTech Solutions", "P0")
→ Returns: 2 (P0 initiatives)
```

---

### Risk Lookups

#### CountActiveRisks(accountName, [riskLevel])
Count active risks, optionally filtered by level.

**Examples**:
```
CountActiveRisks("Acme Financial Services")
→ Count all active risks

CountActiveRisks("Acme Financial Services", "High")
→ Count only high-severity risks
```

#### GetHighestRiskScore(accountName)
Get the highest risk score for an account.

**Example**:
```
GetHighestRiskScore("HealthTech Solutions")
→ Returns: 20 (highest score among active risks)
```

---

### Engagement Lookups

#### GetLastEngagementDate(accountName)
Get the most recent engagement date.

**Example**:
```
GetLastEngagementDate("Nordic Logistics Group")
→ Returns: "2024-11-05"
```

#### CountEngagements(accountName, [days])
Count engagements in the last N days (default: 90).

**Examples**:
```
CountEngagements("Acme Financial Services")
→ Engagements in last 90 days

CountEngagements("Acme Financial Services", 30)
→ Engagements in last 30 days
```

---

### Value Stream Lookups

#### GetTotalBusinessValue(accountName)
Sum of total business value delivered.

**Example**:
```
GetTotalBusinessValue("Nordic Logistics Group")
→ Returns: $3,200,000
```

#### GetAnnualCostSavings(accountName)
Sum of annual cost savings across value streams.

**Example**:
```
GetAnnualCostSavings("Acme Financial Services")
→ Returns: $850,000/year
```

---

### Task Lookups

#### CountPendingTasks(filterValue, filterType)
Count pending/in-progress tasks for an account or person.

**Examples**:
```
CountPendingTasks("Acme Financial Services", "account")
→ Tasks for this account

CountPendingTasks("Sarah Chen", "person")
→ Tasks assigned to Sarah
```

#### CountOverdueTasks(filterValue, filterType)
Count overdue tasks.

**Example**:
```
CountOverdueTasks("HealthTech Solutions", "account")
→ Overdue tasks for this account
```

---

### Platform Health Lookups

#### CountCriticalMetrics(accountName)
Count platform metrics in critical status.

**Example**:
```
CountCriticalMetrics("HealthTech Solutions")
→ Returns: 3 (critical metrics needing attention)
```

#### GetAveragePlatformHealth(accountName)
Calculate average platform health score.

**Example**:
```
GetAveragePlatformHealth("Nordic Logistics Group")
→ Returns: 92 (average health %)
```

---

### Relationship Helpers

#### FormatAccountSummary(accountName)
Create a formatted one-line account summary.

**Example**:
```
FormatAccountSummary("Acme Financial Services")
→ "Acme Financial Services | Health: 82 | ARR: $1.2M | Risk: Medium | Renewal: 180 days"
```

**Use Case**: Display in task descriptions, engagement notes

#### CreateReferenceID(accountName, entityType, sequence)
Generate unique cross-table reference IDs.

**Examples**:
```
CreateReferenceID("Acme Financial Services", "OBJ", 1)
→ "ACME-OBJ-001"

CreateReferenceID("Nordic Logistics Group", "INIT", 5)
→ "NORD-INIT-005"

CreateReferenceID("HealthTech Solutions", "RISK", 12)
→ "HEAL-RISK-012"
```

**Use Case**: Track objectives, initiatives, risks across systems

---

## 🎯 Method 3: Using Coda Filter Formulas

Use Coda's native formulas to filter and aggregate data across tables.

### Example 1: Count Objectives for Current Row's Account

In **AccountMaster** table, add column "Active Objectives":
```
StrategicObjectives.Filter(account = thisRow.accountName AND status = "In Progress").Count()
```

### Example 2: Show Recent Engagements

In **AccountMaster** table, add column "Last 30 Days Engagements":
```
EngagementLog.Filter(account = thisRow.accountName AND engagementDate > Today()-30).Count()
```

### Example 3: Calculate Total Business Value

In **AccountMaster** table, add column "Total Value Delivered":
```
ValueStreams.Filter(account = thisRow.accountName).Sum(totalBusinessValue)
```

### Example 4: Identify High-Risk Accounts

In **AccountMaster** table, add column "High Risk Count":
```
RiskRegister.Filter(account = thisRow.accountName AND riskLevel = "High" AND status.Contains("Active")).Count()
```

### Example 5: CSM Task Load

In **PeopleTeam** table, add column "Open Tasks":
```
ActivitiesTasks.Filter(assignedTo = thisRow.fullName AND status.In(["Pending", "In Progress"])).Count()
```

---

## 💡 Practical Use Cases

### Use Case 1: Enhanced QBR Preparation Page

Add these lookup columns to your QBR view:

1. **In StrategicObjectives**:
   - CSM Name (lookup from AccountMaster)
   - Account ARR (lookup from AccountMaster)
   - Linked Initiative Count (formula: count matching initiatives)

2. **In Initiatives**:
   - Objective Name (lookup from StrategicObjectives)
   - Business Value Category (lookup from StrategicObjectives)

3. **In RiskRegister**:
   - Account Health Score (lookup from AccountMaster)
   - CSM Owner (lookup from AccountMaster)

**Result**: Complete context for QBR discussions

---

### Use Case 2: CSM Dashboard with KPIs

Create a dashboard page with formula columns:

**For each account**:
- Total Objectives: `CountObjectives(accountName)`
- Active Risks: `CountActiveRisks(accountName, "High")`
- Last Engagement: `GetLastEngagementDate(accountName)`
- Total Value: `GetTotalBusinessValue(accountName)`
- Pending Tasks: `CountPendingTasks(accountName, "account")`

**Result**: At-a-glance account health metrics

---

### Use Case 3: Risk-Weighted Renewal Pipeline

In **AccountMaster** or **SuccessPlanTracker**:

Add calculated column "Risk-Weighted ARR":
```
thisRow.arr * If(thisRow.riskLevel = "High", 0.5, If(thisRow.riskLevel = "Medium", 0.8, 1.0))
```

Add "Active High Risks":
```
CountActiveRisks(thisRow.accountName, "High")
```

**Result**: Prioritize renewals by risk exposure

---

### Use Case 4: Engagement Compliance Tracking

In **AccountMaster**:

Add "Days Since Last Engagement":
```
Today() - Date_Parse(GetLastEngagementDate(thisRow.accountName))
```

Add "Engagement Status":
```
If(DaysSinceLastEngagement > thisRow.engagementCadenceTargetDays, "⚠️ Overdue", "✅ On Track")
```

**Result**: Ensure consistent customer touchpoints

---

### Use Case 5: Initiative Portfolio Value

In **AccountMaster**:

Add "Total Initiative ROI":
```
GetTotalInitiativeROI(thisRow.accountName)
```

Add "P0 Initiatives":
```
CountInitiativesByPriority(thisRow.accountName, "P0")
```

**Result**: Track strategic initiative pipeline

---

## 🔧 Best Practices

### 1. Use Lookup Columns for Display
- ✅ Show CSM names, ARR, health scores in related tables
- ✅ Display parent objective names in initiatives
- ✅ Show account context in tasks and risks

### 2. Use Pack Formulas for Calculations
- ✅ Count related records (objectives, risks, tasks)
- ✅ Sum financial metrics (ARR, business value, ROI)
- ✅ Calculate aggregates (average health, total savings)

### 3. Use Filter Formulas for Dynamic Views
- ✅ Create conditional formatting rules
- ✅ Build calculated columns with complex logic
- ✅ Generate status indicators

### 4. Naming Conventions
- Use consistent field names across tables (`account`, not `accountName` in one table and `customer` in another)
- Already implemented: `account` links to `AccountMaster.accountName` everywhere

### 5. Reference IDs for External Systems
- Use `CreateReferenceID()` to generate unique IDs
- Track objectives, initiatives, risks across Salesforce, Jira, etc.

---

## 📚 Quick Reference

| What You Want | How To Do It |
|---------------|--------------|
| Show CSM in another table | Lookup column → AccountMaster.customerSuccessManager |
| Count objectives for account | `CountObjectives(accountName)` |
| Sum business value | `GetTotalBusinessValue(accountName)` |
| Count high risks | `CountActiveRisks(accountName, "High")` |
| Show recent engagements | `CountEngagements(accountName, 30)` |
| Track overdue tasks | `CountOverdueTasks(accountName, "account")` |
| Format account summary | `FormatAccountSummary(accountName)` |
| Generate reference ID | `CreateReferenceID(accountName, "OBJ", 1)` |

---

## 🆘 Troubleshooting

**Q: Lookup column shows empty**
- A: Check that the account names match exactly (case-sensitive)
- Verify source table has data synced

**Q: Formula returns 0 when it shouldn't**
- A: In Phase 1, some formulas return placeholders
- Use Coda's native Filter/Count formulas instead
- Example: `TableName.Filter(account=value).Count()`

**Q: Can't find pack formula**
- A: Type `=` in a cell, then search for formula name
- All lookup formulas start with Get, Count, or Format

**Q: Want to filter by multiple criteria**
- A: Use Coda's Filter formula with AND/OR
- Example: `Table.Filter(field1=value AND field2=value).Count()`

---

## 🎓 Next Steps

1. **Start Simple**: Add 2-3 lookup columns to StrategicObjectives
2. **Build Dashboards**: Use pack formulas in AccountMaster calculated columns
3. **Create Views**: Filter tables using relationship data
4. **Advanced**: Combine lookups with conditional formatting

---

**Phase 2 Preview**: Future versions will support direct table querying in formulas, making cross-table relationships even more powerful!
