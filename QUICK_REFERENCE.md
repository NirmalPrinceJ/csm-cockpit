# Quick Reference Guide: Table Relationships
## MuleSoft CSM Intelligence Platform

---

## Table Index

| # | Table Name | Identity | Primary Key | Display Property |
|---|------------|----------|-------------|-----------------|
| 1 | PeopleTeam | Person | personId | fullName |
| 2 | AccountMaster | Account | accountId | accountName |
| 3 | BusinessContext | Context | contextId | account |
| 4 | StrategicObjectives | Objective | objectiveId | objectiveName |
| 5 | MuleSoftCapabilities | Capability | capabilityId | capabilityName |
| 6 | ValueStreams | ValueStream | streamId | valueStreamName |
| 7 | APIPortfolio | API | apiId | apiName |
| 8 | PlatformHealthMetrics | Metric | metricId | metricName |
| 9 | Initiatives | Initiative | initiativeId | initiativeName |
| 10 | RiskRegister | Risk | riskId | riskTitle |
| 11 | StakeholderOutcomes | Outcome | outcomeId | outcomeStatement |
| 12 | EngagementLog | Engagement | engagementId | engagementType |
| 13 | SuccessPlanTracker | SuccessPlan | successPlanId | planPeriod |
| 14 | ActivitiesTasks | Task | taskId | taskTitle |

---

## Relationship Quick Lookup

### AccountMaster Relationships

| Relationship Type | Target Table | Field Mapping |
|------------------|-------------|---------------|
| 1:1 | BusinessContext | accountId → account |
| 1:Many | StrategicObjectives | accountId → account |
| 1:Many | MuleSoftCapabilities | accountId → account |
| 1:Many | ValueStreams | accountId → account |
| 1:Many | APIPortfolio | accountId → account |
| 1:Many | PlatformHealthMetrics | accountId → account |
| 1:Many | Initiatives | accountId → account |
| 1:Many | RiskRegister | accountId → account |
| 1:Many | StakeholderOutcomes | accountId → account |
| 1:Many | EngagementLog | accountId → account |
| 1:Many | SuccessPlanTracker | accountId → account |
| 1:Many | ActivitiesTasks | accountId → account |

### StrategicObjectives Relationships

| Relationship Type | Target Table | Field Mapping |
|------------------|-------------|---------------|
| Many:1 | AccountMaster | account → accountId |
| Many:Many | MuleSoftCapabilities | linkedCapabilities ↔ linkedObjectives |
| Many:Many | ValueStreams | linkedValueStreams ↔ linkedObjectives |
| Many:Many | APIPortfolio | linkedObjectives ↔ linkedObjectives |
| Many:Many | Initiatives | linkedInitiatives ↔ linkedObjectives |
| Many:Many | RiskRegister | linkedObjectivesAtRisk ↔ objectiveId |
| Many:1 | PlatformHealthMetrics | linkedObjective → objectiveId |
| Many:1 | StakeholderOutcomes | linkedObjective → objectiveId |
| Many:Many | SuccessPlanTracker | objectivesAddressed ↔ objectiveId |

### MuleSoftCapabilities Relationships

| Relationship Type | Target Table | Field Mapping |
|------------------|-------------|---------------|
| Many:1 | AccountMaster | account → accountId |
| Many:Many | StrategicObjectives | linkedObjectives ↔ linkedCapabilities |
| Many:Many | ValueStreams | supportingValueStreams ↔ enabledCapabilities |
| Many:Many | Initiatives | linkedCapabilities ↔ linkedCapabilities |
| Many:1 | PlatformHealthMetrics | linkedCapability → capabilityId |
| Many:1 | RiskRegister | affectedCapability → capabilityId |

### ValueStreams Relationships

| Relationship Type | Target Table | Field Mapping |
|------------------|-------------|---------------|
| Many:1 | AccountMaster | account → accountId |
| Many:Many | StrategicObjectives | linkedObjectives ↔ linkedValueStreams |
| Many:Many | MuleSoftCapabilities | enabledCapabilities ↔ supportingValueStreams |
| Many:Many | APIPortfolio | linkedValueStreams ↔ linkedValueStreams |
| Many:1 | StakeholderOutcomes | linkedValueStream → streamId |
| Many:Many | RiskRegister | affectedValueStreams ↔ streamId |

### APIPortfolio Relationships

| Relationship Type | Target Table | Field Mapping |
|------------------|-------------|---------------|
| Many:1 | AccountMaster | account → accountId |
| Many:Many | ValueStreams | linkedValueStreams ↔ linkedValueStreams |
| Many:Many | StrategicObjectives | linkedObjectives ↔ linkedObjectives |
| Many:Many | StakeholderOutcomes | linkedAPIServices ↔ apiId |
| Many:Many | RiskRegister | affectedAPIs ↔ apiId |

### PlatformHealthMetrics Relationships

| Relationship Type | Target Table | Field Mapping |
|------------------|-------------|---------------|
| Many:1 | AccountMaster | account → accountId |
| Many:1 | MuleSoftCapabilities | linkedCapability → capabilityId |
| Many:1 | StrategicObjectives | linkedObjective → objectiveId |

### Initiatives Relationships

| Relationship Type | Target Table | Field Mapping |
|------------------|-------------|---------------|
| Many:1 | AccountMaster | account → accountId |
| Many:Many | StrategicObjectives | linkedObjectives ↔ linkedInitiatives |
| Many:Many | MuleSoftCapabilities | linkedCapabilities ↔ linkedInitiatives |
| Many:1 | RiskRegister | mitigationInitiative → initiativeId |
| Many:Many | SuccessPlanTracker | keyInitiatives ↔ initiativeId |
| Many:1 | ActivitiesTasks | linkedInitiative → initiativeId |

### RiskRegister Relationships

| Relationship Type | Target Table | Field Mapping |
|------------------|-------------|---------------|
| Many:1 | AccountMaster | account → accountId |
| Many:1 | MuleSoftCapabilities | affectedCapability → capabilityId |
| Many:Many | APIPortfolio | affectedAPIs ↔ apiId |
| Many:Many | ValueStreams | affectedValueStreams ↔ streamId |
| Many:Many | StrategicObjectives | linkedObjectivesAtRisk ↔ objectiveId |
| Many:1 | Initiatives | mitigationInitiative → initiativeId |
| Many:Many | SuccessPlanTracker | top3Risks ↔ riskId |
| Many:1 | ActivitiesTasks | linkedRisk → riskId |

### StakeholderOutcomes Relationships

| Relationship Type | Target Table | Field Mapping |
|------------------|-------------|---------------|
| Many:1 | AccountMaster | account → accountId |
| Many:1 | StrategicObjectives | linkedObjective → objectiveId |
| Many:1 | ValueStreams | linkedValueStream → streamId |
| Many:Many | APIPortfolio | linkedAPIServices ↔ apiId |

### EngagementLog Relationships

| Relationship Type | Target Table | Field Mapping |
|------------------|-------------|---------------|
| Many:1 | AccountMaster | account → accountId |
| Many:1 | ActivitiesTasks | engagementId → linkedEngagement |

### SuccessPlanTracker Relationships

| Relationship Type | Target Table | Field Mapping |
|------------------|-------------|---------------|
| Many:1 | AccountMaster | account → accountId |
| Many:Many | StrategicObjectives | objectivesAddressed ↔ objectiveId |
| Many:Many | Initiatives | keyInitiatives ↔ initiativeId |
| Many:Many | RiskRegister | top3Risks ↔ riskId |

### ActivitiesTasks Relationships

| Relationship Type | Target Table | Field Mapping |
|------------------|-------------|---------------|
| Many:1 | AccountMaster | account → accountId |
| Many:1 | EngagementLog | linkedEngagement → engagementId |
| Many:1 | Initiatives | linkedInitiative → initiativeId |
| Many:1 | RiskRegister | linkedRisk → riskId |

---

## Common Formula Patterns

### Health Score Calculation
```
Composite_Health(
  Platform_Health_Metrics (35%),
  Stakeholder_Outcomes (30%),
  Engagement_Log (20%),
  Strategic_Objectives (15%)
)
```

### Risk Score Calculation
```
Risk_Score = Impact_Score × Probability_Score
Risk_Level = Risk_Level_FromScore(Risk_Score)
```

### Value Calculation
```
Total_Business_Value = Annual_Cost_Savings + Revenue_Impact
```

### Engagement Cadence
```
Next_Engagement_Due = Engagement_Date + Cadence_Days (default: 30)
Cadence_Status = Check if overdue/on track/due soon
```

---

## Integration Points

### 1. Health Score Flow
```
AccountMaster
  → PlatformHealthMetrics (35%)
  → StakeholderOutcomes (30%)
  → EngagementLog (20%)
  → StrategicObjectives (15%)
```

### 2. Risk Mitigation Flow
```
RiskRegister
  → Affected Entities (Capabilities, APIs, Value Streams)
  → Mitigation Initiative
  → Activities Tasks
```

### 3. Value Realization Flow
```
StrategicObjectives
  → ValueStreams (Cost Savings, Revenue Impact)
  → APIPortfolio (Business Value Score)
  → StakeholderOutcomes (Improvement Metrics)
```

### 4. Engagement Flow
```
EngagementLog
  → Next Engagement Date
  → Cadence Status
  → Activities Tasks (Action Items)
```

---

## Field Naming Conventions

### Primary Keys
- Format: `{tablePrefix}Id`
- Examples: `accountId`, `objectiveId`, `capabilityId`

### Foreign Keys (1:Many, Many:1)
- Format: `{referencedTableName}` (singular)
- Examples: `account`, `objective`, `capability`

### Many:Many Junction Fields
- Format: `linked{PluralTableName}` or `{action}{PluralTableName}`
- Examples: `linkedCapabilities`, `linkedObjectives`, `affectedAPIs`

### Display Properties
- Usually: `{tablePrefix}Name` or descriptive field
- Examples: `accountName`, `objectiveName`, `outcomeStatement`

---

## Validation Checklist

When setting up relationships in Coda:

- [ ] All 14 tables are created
- [ ] Primary keys are set correctly
- [ ] Display properties are configured
- [ ] 1:1 relationships are set (AccountMaster ↔ BusinessContext)
- [ ] 1:Many relationships are set (AccountMaster → all child tables)
- [ ] Many:1 relationships are set (child tables → AccountMaster)
- [ ] Many:Many relationships are configured (using multi-select or junction tables)
- [ ] Formula columns are added
- [ ] Test data is loaded
- [ ] Relationships are validated
- [ ] Views are created for common queries

---

## Troubleshooting Quick Tips

| Issue | Solution |
|-------|----------|
| Relation not showing | Check ID field matches exactly (case-sensitive) |
| Formula error | Verify all required parameters are provided |
| Many:Many not working | Use comma-separated strings or create junction table |
| Circular reference warning | Normal for bidirectional relationships |
| Missing data | Check sync table is running and data is loaded |

---

## File Reference

| File | Purpose |
|------|---------|
| `FIGJAM_DESIGN.md` | Complete architecture documentation |
| `TABLE_MAPPINGS.json` | Machine-readable relationship definitions |
| `CODA_SETUP_GUIDE.md` | Step-by-step setup instructions |
| `ARCHITECTURE_DIAGRAM.md` | Visual Mermaid diagrams |
| `QUICK_REFERENCE.md` | This file - quick lookup guide |
| `INTEGRATION_SUMMARY.md` | Overview and summary |

---

**Last Updated:** 2024-11-09
**Version:** 1.0

