# Schema Enhancements Plan - Adding References & Picklists

## Current Issues
1. No reference fields linking tables together
2. No picklist/select list values for dropdown fields
3. Fields are generic strings instead of typed references

## Solution: Add ValueHintTypes and Options

### Reference Fields (Link to other tables)

**Account References** - Link to AccountMaster:
```typescript
account: {
  type: coda.ValueType.String,
  codaType: coda.ValueHintType.Reference,
  fixedId: "Account", // References AccountMaster identity
  required: true
}
```

**Person References** - Link to PeopleTeam:
```typescript
customerSuccessManager: {
  type: coda.ValueType.String,
  codaType: coda.ValueHintType.Reference,
  fixedId: "Person" // References PeopleTeam identity
}
```

### Select List Fields (Dropdown with options)

**Status Fields**:
```typescript
status: {
  type: coda.ValueType.String,
  codaType: coda.ValueHintType.SelectList,
  options: ["Planning", "In Progress", "On Hold", "Completed"]
}
```

**Priority Fields**:
```typescript
priority: {
  type: coda.ValueType.String,
  codaType: coda.ValueHintType.SelectList,
  options: ["P0", "P1", "P2"]
}
```

**Risk Level**:
```typescript
riskLevel: {
  type: coda.ValueType.String,
  codaType: coda.ValueHintType.SelectList,
  options: ["Low", "Medium", "High"]
}
```

## Fields to Update

### AccountMaster Schema
- `customerSuccessManager` → Reference to PeopleTeam
- `accountExecutive` → Reference to PeopleTeam
- `solutionsArchitect` → Reference to PeopleTeam
- `riskLevel` → SelectList ["Low", "Medium", "High"]
- `industryVertical` → SelectList (common industries)
- `contractType` → SelectList ["Annual", "Multi-Year", "Monthly"]
- `engagementCadenceStatus` → SelectList ["On Track", "Overdue", "At Risk"]

### BusinessContext Schema
- `account` → Reference to AccountMaster
- `digitalMaturity` → SelectList ["Initial", "Developing", "Defined", "Managed", "Optimized"]
- `cloudStrategy` → SelectList ["Cloud First", "Hybrid", "On-Premise", "Multi-Cloud"]

### StrategicObjectives Schema
- `account` → Reference to AccountMaster
- `status` → SelectList ["Planning", "In Progress", "On Hold", "Completed"]
- `strategicPillar` → SelectList ["Cost Reduction", "Revenue Growth", "Time to Market", "Risk Mitigation", "Innovation"]
- `businessDriver` → SelectList ["Efficiency", "Scalability", "Compliance", "Customer Experience", "Innovation"]

### PlatformCapabilities Schema
- `account` → Reference to AccountMaster
- `currentMaturity` → SelectList ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"]
- `targetMaturity` → SelectList ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"]
- `priority` → SelectList ["P0", "P1", "P2"]
- `implementationStatus` → SelectList ["Not Started", "In Progress", "Completed", "On Hold"]
- `gapStatus` → SelectList ["Critical", "High", "Medium", "Low", "None"]

### ValueStreams Schema
- `account` → Reference to AccountMaster
- `processOwner` → Reference to PeopleTeam
- `operationalRiskLevel` → SelectList ["Low", "Medium", "High", "Critical"]
- `cycleTimeProgress` → SelectList ["Behind", "On Track", "Ahead"]

### APIPortfolio Schema
- `account` → Reference to AccountMaster
- `apiType` → SelectList ["REST", "SOAP", "GraphQL", "Webhook", "gRPC"]
- `lifecycleStage` → SelectList ["Design", "Development", "Active", "Deprecated", "Retired"]
- `healthStatus` → SelectList ["Healthy", "Warning", "Critical"]
- `criticalityLevel` → SelectList ["Low", "Medium", "High", "Mission Critical"]

### PlatformHealthMetrics Schema
- `account` → Reference to AccountMaster
- `metricCategory` → SelectList ["Performance", "Reliability", "Security", "Adoption", "Scalability"]
- `healthStatus` → SelectList ["Healthy", "Acceptable", "Warning", "Critical"]
- `trend` → SelectList ["Improving", "Stable", "Degrading"]

### Initiatives Schema
- `account` → Reference to AccountMaster
- `ownerCustomer` → Reference to PeopleTeam
- `ownerVendor` → Reference to PeopleTeam
- `priority` → SelectList ["P0", "P1", "P2"]
- `status` → SelectList ["Planning", "In Progress", "At Risk", "Completed", "On Hold"]
- `businessValueCategory` → SelectList ["Cost Reduction", "Revenue Growth", "Time to Market", "Risk Mitigation"]

### RiskRegister Schema
- `account` → Reference to AccountMaster
- `mitigationOwner` → Reference to PeopleTeam
- `riskLevel` → SelectList ["Low", "Medium", "High"]
- `riskCategory` → SelectList ["Technical", "Business", "Security", "Compliance", "Resource"]
- `status` → SelectList ["Active - Not Started", "Active - In Progress", "Mitigated", "Closed", "Accepted"]

### StakeholderOutcomes Schema
- `account` → Reference to AccountMaster
- `stakeholderRole` → SelectList ["Executive", "Director", "Manager", "Individual Contributor"]
- `outcomeType` → SelectList ["Efficiency", "Cost Savings", "Revenue Growth", "User Experience", "Compliance"]

### EngagementLog Schema
- `account` → Reference to AccountMaster
- `engagementType` → SelectList ["QBR", "Check-in", "Workshop", "Executive Briefing", "Technical Review", "Training"]
- `sentiment` → SelectList ["Very Positive", "Positive", "Neutral", "Negative", "Very Negative"]
- `leadCSM` → Reference to PeopleTeam

### SuccessPlanTracker Schema
- `account` → Reference to AccountMaster
- `renewalRiskLevel` → SelectList ["Low", "Medium", "High"]
- `planPeriod` → SelectList ["Q1", "Q2", "Q3", "Q4"]

### ActivitiesTasks Schema
- `account` → Reference to AccountMaster
- `assignedTo` → Reference to PeopleTeam
- `createdBy` → Reference to PeopleTeam
- `priority` → SelectList ["Low", "Medium", "High"]
- `status` → SelectList ["Pending", "In Progress", "Completed", "Cancelled"]
- `taskType` → SelectList ["Follow-up", "Mitigation", "Enablement", "Planning", "Review"]

## Implementation Strategy

1. Update `src/schemas.ts` with all reference and select list configurations
2. Update `src/helpers.ts` to ensure sample data matches allowed values
3. Build and validate
4. Upload as Version 7
5. Test in Coda doc to verify dropdowns and references work

## Benefits After Implementation

✅ **Table Relationships**: Click account name → jump to AccountMaster row
✅ **Dropdowns**: Select values from predefined lists (no typos)
✅ **Data Validation**: Only valid values can be entered
✅ **Better UX**: Users see related data inline
✅ **Consistency**: Standardized values across all tables
✅ **Formulas**: Can filter/count by exact values

