# Coda Setup Guide: Wiring Table Relationships
## MuleSoft CSM Intelligence Platform - Integration Instructions

---

## Overview

This guide provides step-by-step instructions for setting up the 14-table architecture in Coda and wiring all relationships between tables.

---

## Prerequisites

1. ✅ Coda Pack installed and synced
2. ✅ All 14 sync tables created in your Coda doc
3. ✅ Sample data loaded (optional but recommended)

---

## Step 1: Core Account Management Setup

### 1.1 PeopleTeam Table
**Location:** Sync table from pack

**Required Columns:**
- `personId` (Text) - Primary Key
- `fullName` (Text) - Display Column
- `email` (Email)
- `role` (Text)
- `department` (Text)
- `region` (Text)
- `activeStatus` (Checkbox)

**No relationships to configure** - This table is referenced by others.

---

### 1.2 AccountMaster Table
**Location:** Sync table from pack

**Required Columns:**
- `accountId` (Text) - Primary Key
- `accountName` (Text) - Display Column
- `healthScore` (Number, Slider 0-100)
- `arr` (Currency)
- `customerSuccessManager` (Text) - **Will link to PeopleTeam**
- `accountExecutive` (Text) - **Will link to PeopleTeam**
- `solutionsArchitect` (Text) - **Will link to PeopleTeam**

**Relationship Setup:**

1. **Link to PeopleTeam (for Customer Success Manager):**
   - Select `customerSuccessManager` column
   - Change column type to **Relation**
   - Select **PeopleTeam** table
   - Map `customerSuccessManager` → `fullName` in PeopleTeam
   - Display column: `fullName`

2. **Link to PeopleTeam (for Account Executive):**
   - Select `accountExecutive` column
   - Change column type to **Relation**
   - Select **PeopleTeam** table
   - Map `accountExecutive` → `fullName` in PeopleTeam
   - Display column: `fullName`

3. **Link to PeopleTeam (for Solutions Architect):**
   - Select `solutionsArchitect` column
   - Change column type to **Relation**
   - Select **PeopleTeam** table
   - Map `solutionsArchitect` → `fullName` in PeopleTeam
   - Display column: `fullName`

---

### 1.3 BusinessContext Table
**Location:** Sync table from pack

**Required Columns:**
- `contextId` (Text) - Primary Key
- `account` (Text) - **Will link to AccountMaster**

**Relationship Setup:**

1. **Link to AccountMaster (1:1):**
   - Select `account` column
   - Change column type to **Relation**
   - Select **AccountMaster** table
   - Map `account` → `accountId` in AccountMaster
   - Display column: `accountName`
   - **Important:** Set as **One-to-One** relationship
   - Add constraint: Each AccountMaster can only have one BusinessContext

---

## Step 2: Strategic Alignment Tables

### 2.1 StrategicObjectives Table
**Location:** Sync table from pack

**Required Columns:**
- `objectiveId` (Text) - Primary Key
- `objectiveName` (Text) - Display Column
- `account` (Text) - **Will link to AccountMaster**
- `linkedCapabilities` (Text) - **Will link to MuleSoftCapabilities (Many:Many)**
- `linkedValueStreams` (Text) - **Will link to ValueStreams (Many:Many)**
- `linkedInitiatives` (Text) - **Will link to Initiatives (Many:Many)**

**Relationship Setup:**

1. **Link to AccountMaster (Many:1):**
   - Select `account` column
   - Change column type to **Relation**
   - Select **AccountMaster** table
   - Map `account` → `accountId`
   - Display column: `accountName`

2. **Link to MuleSoftCapabilities (Many:Many):**
   - Select `linkedCapabilities` column
   - Change column type to **Multi-Select Relation**
   - Select **MuleSoftCapabilities** table
   - **Note:** Since sync table uses comma-separated strings, you'll need to:
     - Create a formula column: `Split([linkedCapabilities], ", ")`
     - Then create relation from the split values
   - Display column: `capabilityName`

3. **Link to ValueStreams (Many:Many):**
   - Similar process as above for `linkedValueStreams`
   - Display column: `valueStreamName`

4. **Link to Initiatives (Many:Many):**
   - Similar process as above for `linkedInitiatives`
   - Display column: `initiativeName`

---

### 2.2 MuleSoftCapabilities Table
**Location:** Sync table from pack

**Required Columns:**
- `capabilityId` (Text) - Primary Key
- `capabilityName` (Text) - Display Column
- `account` (Text) - **Will link to AccountMaster**
- `linkedObjectives` (Text) - **Will link to StrategicObjectives (Many:Many)**
- `supportingValueStreams` (Text) - **Will link to ValueStreams (Many:Many)**

**Relationship Setup:**

1. **Link to AccountMaster (Many:1):**
   - Same as StrategicObjectives above

2. **Link to StrategicObjectives (Many:Many):**
   - Use `linkedObjectives` field
   - Create Multi-Select Relation to StrategicObjectives
   - Display column: `objectiveName`

3. **Link to ValueStreams (Many:Many):**
   - Use `supportingValueStreams` field
   - Create Multi-Select Relation to ValueStreams
   - Display column: `valueStreamName`

---

### 2.3 ValueStreams Table
**Location:** Sync table from pack

**Required Columns:**
- `streamId` (Text) - Primary Key
- `valueStreamName` (Text) - Display Column
- `account` (Text) - **Will link to AccountMaster**
- `linkedObjectives` (Text) - **Will link to StrategicObjectives (Many:Many)**
- `enabledCapabilities` (Text) - **Will link to MuleSoftCapabilities (Many:Many)**

**Relationship Setup:**

1. **Link to AccountMaster (Many:1):**
   - Same as above

2. **Link to StrategicObjectives (Many:Many):**
   - Use `linkedObjectives` field
   - Create Multi-Select Relation
   - Display column: `objectiveName`

3. **Link to MuleSoftCapabilities (Many:Many):**
   - Use `enabledCapabilities` field
   - Create Multi-Select Relation
   - Display column: `capabilityName`

---

## Step 3: Technical Portfolio Tables

### 3.1 APIPortfolio Table
**Location:** Sync table from pack

**Required Columns:**
- `apiId` (Text) - Primary Key
- `apiName` (Text) - Display Column
- `account` (Text) - **Will link to AccountMaster**
- `linkedValueStreams` (Text) - **Will link to ValueStreams (Many:Many)**
- `linkedObjectives` (Text) - **Will link to StrategicObjectives (Many:Many)**

**Relationship Setup:**

1. **Link to AccountMaster (Many:1):**
   - Same as above

2. **Link to ValueStreams (Many:Many):**
   - Use `linkedValueStreams` field
   - Create Multi-Select Relation
   - Display column: `valueStreamName`

3. **Link to StrategicObjectives (Many:Many):**
   - Use `linkedObjectives` field
   - Create Multi-Select Relation
   - Display column: `objectiveName`

---

### 3.2 PlatformHealthMetrics Table
**Location:** Sync table from pack

**Required Columns:**
- `metricId` (Text) - Primary Key
- `metricName` (Text) - Display Column
- `account` (Text) - **Will link to AccountMaster**
- `linkedCapability` (Text) - **Will link to MuleSoftCapabilities (Many:1)**
- `linkedObjective` (Text) - **Will link to StrategicObjectives (Many:1)**

**Relationship Setup:**

1. **Link to AccountMaster (Many:1):**
   - Same as above

2. **Link to MuleSoftCapabilities (Many:1):**
   - Select `linkedCapability` column
   - Change to **Relation** (single, not multi-select)
   - Select **MuleSoftCapabilities** table
   - Map `linkedCapability` → `capabilityId`
   - Display column: `capabilityName`

3. **Link to StrategicObjectives (Many:1):**
   - Select `linkedObjective` column
   - Change to **Relation** (single)
   - Select **StrategicObjectives** table
   - Map `linkedObjective` → `objectiveId`
   - Display column: `objectiveName`

---

## Step 4: Execution & Risk Tables

### 4.1 Initiatives Table
**Location:** Sync table from pack

**Required Columns:**
- `initiativeId` (Text) - Primary Key
- `initiativeName` (Text) - Display Column
- `account` (Text) - **Will link to AccountMaster**
- `linkedObjectives` (Text) - **Will link to StrategicObjectives (Many:Many)**
- `linkedCapabilities` (Text) - **Will link to MuleSoftCapabilities (Many:Many)**

**Relationship Setup:**

1. **Link to AccountMaster (Many:1):**
   - Same as above

2. **Link to StrategicObjectives (Many:Many):**
   - Use `linkedObjectives` field
   - Create Multi-Select Relation
   - Display column: `objectiveName`

3. **Link to MuleSoftCapabilities (Many:Many):**
   - Use `linkedCapabilities` field
   - Create Multi-Select Relation
   - Display column: `capabilityName`

---

### 4.2 RiskRegister Table
**Location:** Sync table from pack

**Required Columns:**
- `riskId` (Text) - Primary Key
- `riskTitle` (Text) - Display Column
- `account` (Text) - **Will link to AccountMaster**
- `affectedCapability` (Text) - **Will link to MuleSoftCapabilities (Many:1)**
- `affectedAPIs` (Text) - **Will link to APIPortfolio (Many:Many)**
- `affectedValueStreams` (Text) - **Will link to ValueStreams (Many:Many)**
- `linkedObjectivesAtRisk` (Text) - **Will link to StrategicObjectives (Many:Many)**
- `mitigationInitiative` (Text) - **Will link to Initiatives (Many:1)**

**Relationship Setup:**

1. **Link to AccountMaster (Many:1):**
   - Same as above

2. **Link to MuleSoftCapabilities (Many:1):**
   - Select `affectedCapability` column
   - Change to **Relation** (single)
   - Select **MuleSoftCapabilities** table
   - Map `affectedCapability` → `capabilityId`
   - Display column: `capabilityName`

3. **Link to APIPortfolio (Many:Many):**
   - Use `affectedAPIs` field
   - Create Multi-Select Relation
   - Display column: `apiName`

4. **Link to ValueStreams (Many:Many):**
   - Use `affectedValueStreams` field
   - Create Multi-Select Relation
   - Display column: `valueStreamName`

5. **Link to StrategicObjectives (Many:Many):**
   - Use `linkedObjectivesAtRisk` field
   - Create Multi-Select Relation
   - Display column: `objectiveName`

6. **Link to Initiatives (Many:1):**
   - Select `mitigationInitiative` column
   - Change to **Relation** (single)
   - Select **Initiatives** table
   - Map `mitigationInitiative` → `initiativeId`
   - Display column: `initiativeName`

---

## Step 5: Outcomes & Engagement Tables

### 5.1 StakeholderOutcomes Table
**Location:** Sync table from pack

**Required Columns:**
- `outcomeId` (Text) - Primary Key
- `outcomeStatement` (Text) - Display Column
- `account` (Text) - **Will link to AccountMaster**
- `linkedObjective` (Text) - **Will link to StrategicObjectives (Many:1)**
- `linkedValueStream` (Text) - **Will link to ValueStreams (Many:1)**
- `linkedAPIServices` (Text) - **Will link to APIPortfolio (Many:Many)**

**Relationship Setup:**

1. **Link to AccountMaster (Many:1):**
   - Same as above

2. **Link to StrategicObjectives (Many:1):**
   - Select `linkedObjective` column
   - Change to **Relation** (single)
   - Select **StrategicObjectives** table
   - Map `linkedObjective` → `objectiveId`
   - Display column: `objectiveName`

3. **Link to ValueStreams (Many:1):**
   - Select `linkedValueStream` column
   - Change to **Relation** (single)
   - Select **ValueStreams** table
   - Map `linkedValueStream` → `streamId`
   - Display column: `valueStreamName`

4. **Link to APIPortfolio (Many:Many):**
   - Use `linkedAPIServices` field
   - Create Multi-Select Relation
   - Display column: `apiName`

---

### 5.2 EngagementLog Table
**Location:** Sync table from pack

**Required Columns:**
- `engagementId` (Text) - Primary Key
- `engagementType` (Text) - Display Column
- `account` (Text) - **Will link to AccountMaster**

**Relationship Setup:**

1. **Link to AccountMaster (Many:1):**
   - Select `account` column
   - Change to **Relation**
   - Select **AccountMaster** table
   - Map `account` → `accountId`
   - Display column: `accountName`

**Note:** EngagementLog is referenced by ActivitiesTasks (see below).

---

### 5.3 SuccessPlanTracker Table
**Location:** Sync table from pack

**Required Columns:**
- `successPlanId` (Text) - Primary Key
- `planPeriod` (Text) - Display Column
- `account` (Text) - **Will link to AccountMaster**
- `objectivesAddressed` (Text) - **Will link to StrategicObjectives (Many:Many)**
- `keyInitiatives` (Text) - **Will link to Initiatives (Many:Many)**
- `top3Risks` (Text) - **Will link to RiskRegister (Many:Many)**

**Relationship Setup:**

1. **Link to AccountMaster (Many:1):**
   - Same as above

2. **Link to StrategicObjectives (Many:Many):**
   - Use `objectivesAddressed` field
   - Create Multi-Select Relation
   - Display column: `objectiveName`

3. **Link to Initiatives (Many:Many):**
   - Use `keyInitiatives` field
   - Create Multi-Select Relation
   - Display column: `initiativeName`

4. **Link to RiskRegister (Many:Many):**
   - Use `top3Risks` field
   - Create Multi-Select Relation
   - Display column: `riskTitle`

---

### 5.4 ActivitiesTasks Table
**Location:** Sync table from pack

**Required Columns:**
- `taskId` (Text) - Primary Key
- `taskTitle` (Text) - Display Column
- `account` (Text) - **Will link to AccountMaster**
- `linkedEngagement` (Text) - **Will link to EngagementLog (Many:1)**
- `linkedInitiative` (Text) - **Will link to Initiatives (Many:1)**
- `linkedRisk` (Text) - **Will link to RiskRegister (Many:1)**

**Relationship Setup:**

1. **Link to AccountMaster (Many:1):**
   - Same as above

2. **Link to EngagementLog (Many:1):**
   - Select `linkedEngagement` column
   - Change to **Relation** (single)
   - Select **EngagementLog** table
   - Map `linkedEngagement` → `engagementId`
   - Display column: `engagementType`

3. **Link to Initiatives (Many:1):**
   - Select `linkedInitiative` column
   - Change to **Relation** (single)
   - Select **Initiatives** table
   - Map `linkedInitiative` → `initiativeId`
   - Display column: `initiativeName`

4. **Link to RiskRegister (Many:1):**
   - Select `linkedRisk` column
   - Change to **Relation** (single)
   - Select **RiskRegister** table
   - Map `linkedRisk` → `riskId`
   - Display column: `riskTitle`

---

## Step 6: Formula Column Setup

### 6.1 AccountMaster Formulas

**Days_To_Renewal:**
```
Days_To_Renewal([Renewal Date], Today())
```

**Risk_Level:**
```
Risk_Level([Health Score], [Days To Renewal])
```

### 6.2 MuleSoftCapabilities Formulas

**Maturity_Gap:**
```
Maturity_Gap([Current Maturity Numeric], [Target Maturity Numeric])
```

**Gap_Status:**
```
Gap_Status([Maturity Gap])
```

### 6.3 ValueStreams Formulas

**Cycle_Time_Reduction_Percent:**
```
Cycle_Time_Reduction([Cycle Time Baseline Hours], [Cycle Time Current Hours])
```

**Annual_Cost_Savings_USD:**
```
Annual_Cost_Savings([Cost Per Transaction Before USD], [Cost Per Transaction After USD], [Annual Transaction Volume])
```

**Total_Business_Value_USD:**
```
Business_Value([Annual Cost Savings USD], [Revenue Impact USD])
```

### 6.4 APIPortfolio Formulas

**Annual_Transaction_Volume:**
```
[Monthly Transactions] * 12
```

**SLA_Compliance_Percent:**
```
SLA_Compliance([Avg Response Time ms], [SLA Target ms])
```

**Business_Criticality:**
```
Business_Criticality([Uptime Percent], [Revenue Attribution USD], [Monthly Transactions], [Consuming Applications])
```

**Business_Value_Score:**
```
Business_Value_Score([Monthly Transactions], [Consuming Applications], [SLA Compliance Percent])
```

### 6.5 PlatformHealthMetrics Formulas

**Health_Status:**
```
Health_Status([Current Value], [Target Value], [Threshold Warning], [Threshold Critical])
```

### 6.6 RiskRegister Formulas

**Risk_Score:**
```
Risk_Score([Impact Score], [Probability Score])
```

**Risk_Level:**
```
Risk_Level_FromScore([Risk Score])
```

### 6.7 Initiatives Formulas

**Expected_Payback_Months:**
```
Expected_Payback([Investment Amount USD], [Expected Annual Benefit USD])
```

**Three_Year_ROI_Percent:**
```
Three_Year_ROI([Investment Amount USD], [Expected Annual Benefit USD])
```

**Actual_ROI_Percent:**
```
Actual_ROI([Investment Amount USD], [Realized Annual Benefit USD])
```

### 6.8 StakeholderOutcomes Formulas

**Improvement_Percent:**
```
([Current Value] - [Baseline Value]) / [Baseline Value] * 100
```

**Target_Achievement_Percent:**
```
Target_Achievement([Baseline Value], [Current Value], [Target Value])
```

### 6.9 EngagementLog Formulas

**Engagement_Score:**
```
Engagement_Score([Strategic Alignment Score], [Technical Health Score], [Relationship Depth Score])
```

**Next_Engagement_Due:**
```
Next_Engagement_Due([Engagement Date], 30)
```

**Cadence_Status:**
```
Cadence_Status([Engagement Date], 30, Today())
```

### 6.10 ActivitiesTasks Formulas

**Days_Until_Due:**
```
[Due Date] - Today()
```

---

## Step 7: Validation & Testing

### 7.1 Test Relationships

For each relationship configured:

1. **Create a test record** in the source table
2. **Verify the relation** appears correctly in the target table
3. **Check reverse lookup** (if applicable)
4. **Validate data integrity** - ensure IDs match

### 7.2 Test Formulas

1. **Create test data** with known values
2. **Verify formula results** match expected calculations
3. **Test edge cases** (null values, zero values, etc.)

### 7.3 Test Data Flow

1. **Create an Account** in AccountMaster
2. **Create related records** in child tables
3. **Verify relationships** are properly linked
4. **Test cascading updates** (if applicable)

---

## Troubleshooting

### Issue: Relation column not showing linked records

**Solution:**
- Verify the ID field matches exactly (case-sensitive)
- Check that the display column is set correctly
- Ensure the relation type matches (single vs. multi-select)

### Issue: Formula returning errors

**Solution:**
- Check that all required parameters are provided
- Verify field names match exactly (case-sensitive)
- Test with sample data to isolate the issue

### Issue: Many:Many relationships not working

**Solution:**
- For sync tables, Many:Many uses comma-separated strings
- Create a formula to split the string: `Split([Field], ", ")`
- Then create relation from the split values

---

## Next Steps

1. ✅ Complete all relationship configurations
2. ✅ Add formula columns as needed
3. ✅ Create views that join related tables
4. ✅ Set up automations for data updates
5. ✅ Test with real data

---

**Last Updated:** 2024-11-09
**Version:** 1.0

