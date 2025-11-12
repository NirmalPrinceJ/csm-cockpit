# FigJam Design: MuleSoft CSM Intelligence Platform
## Coda Table Architecture & Relationship Mapping

---

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Table Relationship Diagram](#table-relationship-diagram)
3. [Field Mappings](#field-mappings)
4. [Integration Points](#integration-points)
5. [Data Flow Diagrams](#data-flow-diagrams)

---

## Architecture Overview

### 14-Table Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                    CORE ACCOUNT MANAGEMENT                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │ PeopleTeam   │  │AccountMaster │  │BusinessContext│        │
│  │ (Person_ID)  │  │ (Account_ID) │  │ (Context_ID)  │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│         ↑                ↑                    ↑                │
│         └────────────────┴────────────────────┘                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ (1:Many)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    STRATEGIC ALIGNMENT                          │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐ │
│  │StrategicObjectives│  │MuleSoftCapabilities│ │ValueStreams │ │
│  │  (Objective_ID)   │  │  (Capability_ID)  │ │ (Stream_ID) │ │
│  └──────────────────┘  └──────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ (Many:Many)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    TECHNICAL PORTFOLIO                         │
│  ┌──────────────┐  ┌──────────────────────────┐              │
│  │APIPortfolio  │  │PlatformHealthMetrics     │              │
│  │  (API_ID)    │  │    (Metric_ID)          │              │
│  └──────────────┘  └──────────────────────────┘              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ (Many:Many)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    EXECUTION & RISK                            │
│  ┌──────────────┐  ┌──────────────┐                          │
│  │ Initiatives  │  │ RiskRegister │                          │
│  │(Initiative_ID)│  │  (Risk_ID)   │                          │
│  └──────────────┘  └──────────────┘                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ (Many:Many)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                  OUTCOMES & ENGAGEMENT                         │
│  ┌──────────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │StakeholderOutcomes│  │EngagementLog │  │SuccessPlanTracker│ │
│  │  (Outcome_ID)    │  │(Engagement_ID)│  │(SuccessPlan_ID) │ │
│  └──────────────────┘  └──────────────┘  └──────────────────┘ │
│                                                               │
│  ┌──────────────┐                                            │
│  │ActivitiesTasks│                                            │
│  │  (Task_ID)   │                                            │
│  └──────────────┘                                            │
└─────────────────────────────────────────────────────────────────┘
```

---

## Table Relationship Diagram

### Central Hub: Account_Master

```
                    ┌─────────────────────┐
                    │   Account_Master    │
                    │   (Account_ID)      │
                    │   Primary Key       │
                    └─────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        │ (1:1)              │ (1:Many)            │ (1:Many)
        ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────────┐  ┌──────────────────┐
│BusinessContext│    │StrategicObjectives│  │MuleSoftCapabilities│
│ (Context_ID)  │    │ (Objective_ID)    │  │ (Capability_ID)  │
└──────────────┘    └──────────────────┘  └──────────────────┘
                              │                     │
                              │ (Many:Many)         │ (Many:Many)
                              └──────────┬──────────┘
                                         │
                                         ▼
                              ┌──────────────────┐
                              │  ValueStreams    │
                              │  (Stream_ID)     │
                              └──────────────────┘
                                         │
                    ┌───────────────────┼───────────────────┐
                    │                   │                   │
                    │ (Many:Many)       │ (Many:Many)       │ (Many:Many)
                    ▼                   ▼                   ▼
            ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
            │APIPortfolio  │    │  Initiatives │    │RiskRegister │
            │  (API_ID)    │    │(Initiative_ID)│    │  (Risk_ID)  │
            └──────────────┘    └──────────────┘    └──────────────┘
                    │                   │                   │
                    │ (Many:Many)       │ (Many:Many)       │ (Many:Many)
                    └───────────────────┼───────────────────┘
                                        │
                                        ▼
                            ┌──────────────────┐
                            │StakeholderOutcomes│
                            │  (Outcome_ID)    │
                            └──────────────────┘
                                        │
                    ┌───────────────────┼───────────────────┐
                    │                   │                   │
                    │ (Many:Many)       │ (Many:Many)       │ (Many:Many)
                    ▼                   ▼                   ▼
            ┌──────────────┐    ┌──────────────┐    ┌──────────────────┐
            │EngagementLog │    │ActivitiesTasks│    │SuccessPlanTracker│
            │(Engagement_ID)│    │  (Task_ID)   │    │(SuccessPlan_ID)  │
            └──────────────┘    └──────────────┘    └──────────────────┘
```

### PeopleTeam Integration

```
┌──────────────┐
│  PeopleTeam  │
│  (Person_ID) │
└──────────────┘
       │
       │ (Referenced by)
       │
       ▼
┌─────────────────────┐
│   Account_Master     │
│                     │
│ Fields:             │
│ - Customer_Success_ │
│   Manager           │
│ - Account_Executive │
│ - Solutions_Architect│
└─────────────────────┘
```

---

## Field Mappings

### 1. Account_Master ↔ Business_Context
**Relationship:** 1:1 (One-to-One)

| Account_Master Field | Business_Context Field | Mapping Type |
|---------------------|----------------------|--------------|
| `accountId` | `account` | Direct Reference |
| `accountName` | `account` | Display Value |

**Integration Logic:**
- Each Account has exactly one Business_Context record
- Business_Context.account references Account_Master.accountId

---

### 2. Account_Master ↔ Strategic_Objectives
**Relationship:** 1:Many (One-to-Many)

| Account_Master Field | Strategic_Objectives Field | Mapping Type |
|---------------------|---------------------------|--------------|
| `accountId` | `account` | Foreign Key |
| `accountName` | `account` | Display Value |

**Integration Logic:**
- One Account can have multiple Strategic_Objectives
- Strategic_Objectives.account references Account_Master.accountId

---

### 3. Account_Master ↔ MuleSoft_Capabilities
**Relationship:** 1:Many (One-to-Many)

| Account_Master Field | MuleSoft_Capabilities Field | Mapping Type |
|---------------------|---------------------------|--------------|
| `accountId` | `account` | Foreign Key |
| `accountName` | `account` | Display Value |

**Integration Logic:**
- One Account can have multiple Capabilities
- MuleSoft_Capabilities.account references Account_Master.accountId

---

### 4. Strategic_Objectives ↔ MuleSoft_Capabilities
**Relationship:** Many:Many (Many-to-Many)

| Strategic_Objectives Field | MuleSoft_Capabilities Field | Mapping Type |
|---------------------------|---------------------------|--------------|
| `objectiveId` | `capabilityId` | Junction Table (via linkedCapabilities) |
| `linkedCapabilities` | `linkedObjectives` | Multi-Select String |

**Integration Logic:**
- Multiple Objectives can link to multiple Capabilities
- Stored as comma-separated IDs in `linkedCapabilities` field
- Example: "CAP-001, CAP-002"

---

### 5. Strategic_Objectives ↔ Value_Streams
**Relationship:** Many:Many (Many-to-Many)

| Strategic_Objectives Field | Value_Streams Field | Mapping Type |
|---------------------------|-------------------|--------------|
| `objectiveId` | `streamId` | Junction Table (via linkedValueStreams) |
| `linkedValueStreams` | `linkedObjectives` | Multi-Select String |

**Integration Logic:**
- Multiple Objectives can link to multiple Value Streams
- Stored as comma-separated IDs in `linkedValueStreams` field

---

### 6. MuleSoft_Capabilities ↔ Value_Streams
**Relationship:** Many:Many (Many-to-Many)

| MuleSoft_Capabilities Field | Value_Streams Field | Mapping Type |
|---------------------------|-------------------|--------------|
| `capabilityId` | `streamId` | Junction Table (via supportingValueStreams) |
| `supportingValueStreams` | `enabledCapabilities` | Multi-Select String |

**Integration Logic:**
- Multiple Capabilities can enable multiple Value Streams
- Stored as comma-separated IDs

---

### 7. Value_Streams ↔ API_Portfolio
**Relationship:** Many:Many (Many-to-Many)

| Value_Streams Field | API_Portfolio Field | Mapping Type |
|-------------------|-------------------|--------------|
| `streamId` | `apiId` | Junction Table (via linkedValueStreams) |
| `apisConsumed` | `linkedValueStreams` | Multi-Select String |

**Integration Logic:**
- Multiple Value Streams can consume multiple APIs
- API_Portfolio.linkedValueStreams contains comma-separated Stream IDs

---

### 8. Strategic_Objectives ↔ API_Portfolio
**Relationship:** Many:Many (Many-to-Many)

| Strategic_Objectives Field | API_Portfolio Field | Mapping Type |
|---------------------------|-------------------|--------------|
| `objectiveId` | `apiId` | Junction Table (via linkedObjectives) |
| `linkedInitiatives` | `linkedObjectives` | Multi-Select String |

**Integration Logic:**
- Multiple Objectives can be supported by multiple APIs
- API_Portfolio.linkedObjectives contains comma-separated Objective IDs

---

### 9. MuleSoft_Capabilities ↔ Platform_Health_Metrics
**Relationship:** Many:1 (Many-to-One)

| MuleSoft_Capabilities Field | Platform_Health_Metrics Field | Mapping Type |
|---------------------------|----------------------------|--------------|
| `capabilityId` | `linkedCapability` | Foreign Key |
| `capabilityName` | `linkedCapability` | Display Value |

**Integration Logic:**
- Multiple Metrics can link to one Capability
- Platform_Health_Metrics.linkedCapability references MuleSoft_Capabilities.capabilityId

---

### 10. Strategic_Objectives ↔ Platform_Health_Metrics
**Relationship:** Many:1 (Many-to-One)

| Strategic_Objectives Field | Platform_Health_Metrics Field | Mapping Type |
|---------------------------|----------------------------|--------------|
| `objectiveId` | `linkedObjective` | Foreign Key |
| `objectiveName` | `linkedObjective` | Display Value |

**Integration Logic:**
- Multiple Metrics can link to one Objective
- Platform_Health_Metrics.linkedObjective references Strategic_Objectives.objectiveId

---

### 11. Strategic_Objectives ↔ Initiatives
**Relationship:** Many:Many (Many-to-Many)

| Strategic_Objectives Field | Initiatives Field | Mapping Type |
|---------------------------|------------------|--------------|
| `objectiveId` | `initiativeId` | Junction Table (via linkedObjectives) |
| `linkedInitiatives` | `linkedObjectives` | Multi-Select String |

**Integration Logic:**
- Multiple Objectives can be supported by multiple Initiatives
- Initiatives.linkedObjectives contains comma-separated Objective IDs

---

### 12. MuleSoft_Capabilities ↔ Initiatives
**Relationship:** Many:Many (Many-to-Many)

| MuleSoft_Capabilities Field | Initiatives Field | Mapping Type |
|---------------------------|------------------|--------------|
| `capabilityId` | `initiativeId` | Junction Table (via linkedCapabilities) |
| `linkedInitiatives` | `linkedCapabilities` | Multi-Select String |

**Integration Logic:**
- Multiple Capabilities can be advanced by multiple Initiatives
- Initiatives.linkedCapabilities contains comma-separated Capability IDs

---

### 13. Risk_Register ↔ MuleSoft_Capabilities
**Relationship:** Many:1 (Many-to-One)

| Risk_Register Field | MuleSoft_Capabilities Field | Mapping Type |
|-------------------|---------------------------|--------------|
| `riskId` | `capabilityId` | Foreign Key |
| `affectedCapability` | `capabilityName` | Display Value |

**Integration Logic:**
- Multiple Risks can affect one Capability
- Risk_Register.affectedCapability references MuleSoft_Capabilities.capabilityId

---

### 14. Risk_Register ↔ API_Portfolio
**Relationship:** Many:Many (Many-to-Many)

| Risk_Register Field | API_Portfolio Field | Mapping Type |
|-------------------|-------------------|--------------|
| `riskId` | `apiId` | Junction Table (via affectedAPIs) |
| `affectedAPIs` | `apiName` | Multi-Select String |

**Integration Logic:**
- Multiple Risks can affect multiple APIs
- Risk_Register.affectedAPIs contains comma-separated API IDs

---

### 15. Risk_Register ↔ Value_Streams
**Relationship:** Many:Many (Many-to-Many)

| Risk_Register Field | Value_Streams Field | Mapping Type |
|-------------------|-------------------|--------------|
| `riskId` | `streamId` | Junction Table (via affectedValueStreams) |
| `affectedValueStreams` | `valueStreamName` | Multi-Select String |

**Integration Logic:**
- Multiple Risks can affect multiple Value Streams
- Risk_Register.affectedValueStreams contains comma-separated Stream IDs

---

### 16. Risk_Register ↔ Strategic_Objectives
**Relationship:** Many:Many (Many-to-Many)

| Risk_Register Field | Strategic_Objectives Field | Mapping Type |
|-------------------|---------------------------|--------------|
| `riskId` | `objectiveId` | Junction Table (via linkedObjectivesAtRisk) |
| `linkedObjectivesAtRisk` | `objectiveName` | Multi-Select String |

**Integration Logic:**
- Multiple Risks can threaten multiple Objectives
- Risk_Register.linkedObjectivesAtRisk contains comma-separated Objective IDs

---

### 17. Risk_Register ↔ Initiatives
**Relationship:** Many:1 (Many-to-One)

| Risk_Register Field | Initiatives Field | Mapping Type |
|-------------------|------------------|--------------|
| `riskId` | `initiativeId` | Foreign Key |
| `mitigationInitiative` | `initiativeName` | Display Value |

**Integration Logic:**
- Multiple Risks can be mitigated by one Initiative
- Risk_Register.mitigationInitiative references Initiatives.initiativeId

---

### 18. Stakeholder_Outcomes ↔ Strategic_Objectives
**Relationship:** Many:1 (Many-to-One)

| Stakeholder_Outcomes Field | Strategic_Objectives Field | Mapping Type |
|--------------------------|---------------------------|--------------|
| `outcomeId` | `objectiveId` | Foreign Key |
| `linkedObjective` | `objectiveName` | Display Value |

**Integration Logic:**
- Multiple Outcomes can link to one Objective
- Stakeholder_Outcomes.linkedObjective references Strategic_Objectives.objectiveId

---

### 19. Stakeholder_Outcomes ↔ Value_Streams
**Relationship:** Many:1 (Many-to-One)

| Stakeholder_Outcomes Field | Value_Streams Field | Mapping Type |
|--------------------------|-------------------|--------------|
| `outcomeId` | `streamId` | Foreign Key |
| `linkedValueStream` | `valueStreamName` | Display Value |

**Integration Logic:**
- Multiple Outcomes can link to one Value Stream
- Stakeholder_Outcomes.linkedValueStream references Value_Streams.streamId

---

### 20. Stakeholder_Outcomes ↔ API_Portfolio
**Relationship:** Many:Many (Many-to-Many)

| Stakeholder_Outcomes Field | API_Portfolio Field | Mapping Type |
|--------------------------|-------------------|--------------|
| `outcomeId` | `apiId` | Junction Table (via linkedAPIServices) |
| `linkedAPIServices` | `apiName` | Multi-Select String |

**Integration Logic:**
- Multiple Outcomes can be supported by multiple APIs
- Stakeholder_Outcomes.linkedAPIServices contains comma-separated API IDs

---

### 21. Engagement_Log ↔ Account_Master
**Relationship:** Many:1 (Many-to-One)

| Engagement_Log Field | Account_Master Field | Mapping Type |
|---------------------|-------------------|--------------|
| `engagementId` | `accountId` | Foreign Key |
| `account` | `accountName` | Display Value |

**Integration Logic:**
- Multiple Engagements can belong to one Account
- Engagement_Log.account references Account_Master.accountId

---

### 22. Activities_Tasks ↔ Account_Master
**Relationship:** Many:1 (Many-to-One)

| Activities_Tasks Field | Account_Master Field | Mapping Type |
|----------------------|-------------------|--------------|
| `taskId` | `accountId` | Foreign Key |
| `account` | `accountName` | Display Value |

**Integration Logic:**
- Multiple Tasks can belong to one Account
- Activities_Tasks.account references Account_Master.accountId

---

### 23. Activities_Tasks ↔ Engagement_Log
**Relationship:** Many:1 (Many-to-One)

| Activities_Tasks Field | Engagement_Log Field | Mapping Type |
|----------------------|-------------------|--------------|
| `taskId` | `engagementId` | Foreign Key |
| `linkedEngagement` | `engagementId` | Display Value |

**Integration Logic:**
- Multiple Tasks can link to one Engagement
- Activities_Tasks.linkedEngagement references Engagement_Log.engagementId

---

### 24. Activities_Tasks ↔ Initiatives
**Relationship:** Many:1 (Many-to-One)

| Activities_Tasks Field | Initiatives Field | Mapping Type |
|----------------------|-----------------|--------------|
| `taskId` | `initiativeId` | Foreign Key |
| `linkedInitiative` | `initiativeName` | Display Value |

**Integration Logic:**
- Multiple Tasks can link to one Initiative
- Activities_Tasks.linkedInitiative references Initiatives.initiativeId

---

### 25. Activities_Tasks ↔ Risk_Register
**Relationship:** Many:1 (Many-to-One)

| Activities_Tasks Field | Risk_Register Field | Mapping Type |
|----------------------|-------------------|--------------|
| `taskId` | `riskId` | Foreign Key |
| `linkedRisk` | `riskTitle` | Display Value |

**Integration Logic:**
- Multiple Tasks can link to one Risk
- Activities_Tasks.linkedRisk references Risk_Register.riskId

---

### 26. Success_Plan_Tracker ↔ Account_Master
**Relationship:** Many:1 (Many-to-One)

| Success_Plan_Tracker Field | Account_Master Field | Mapping Type |
|--------------------------|-------------------|--------------|
| `successPlanId` | `accountId` | Foreign Key |
| `account` | `accountName` | Display Value |

**Integration Logic:**
- Multiple Success Plans can belong to one Account
- Success_Plan_Tracker.account references Account_Master.accountId

---

### 27. Success_Plan_Tracker ↔ Strategic_Objectives
**Relationship:** Many:Many (Many-to-Many)

| Success_Plan_Tracker Field | Strategic_Objectives Field | Mapping Type |
|--------------------------|---------------------------|--------------|
| `successPlanId` | `objectiveId` | Junction Table (via objectivesAddressed) |
| `objectivesAddressed` | `objectiveName` | Multi-Select String |

**Integration Logic:**
- Multiple Success Plans can address multiple Objectives
- Success_Plan_Tracker.objectivesAddressed contains comma-separated Objective IDs

---

### 28. Success_Plan_Tracker ↔ Initiatives
**Relationship:** Many:Many (Many-to-Many)

| Success_Plan_Tracker Field | Initiatives Field | Mapping Type |
|--------------------------|------------------|--------------|
| `successPlanId` | `initiativeId` | Junction Table (via keyInitiatives) |
| `keyInitiatives` | `initiativeName` | Multi-Select String |

**Integration Logic:**
- Multiple Success Plans can include multiple Initiatives
- Success_Plan_Tracker.keyInitiatives contains comma-separated Initiative IDs

---

### 29. Success_Plan_Tracker ↔ Risk_Register
**Relationship:** Many:Many (Many-to-Many)

| Success_Plan_Tracker Field | Risk_Register Field | Mapping Type |
|--------------------------|-------------------|--------------|
| `successPlanId` | `riskId` | Junction Table (via top3Risks) |
| `top3Risks` | `riskTitle` | Multi-Select String |

**Integration Logic:**
- Multiple Success Plans can track multiple Risks
- Success_Plan_Tracker.top3Risks contains comma-separated Risk IDs

---

## Integration Points

### Primary Integration Hub: Account_Master

**All tables connect through Account_Master as the central entity:**

1. **Direct 1:1 Relationship:**
   - Business_Context → Account_Master

2. **Direct 1:Many Relationships:**
   - Account_Master → Strategic_Objectives
   - Account_Master → MuleSoft_Capabilities
   - Account_Master → Value_Streams
   - Account_Master → API_Portfolio
   - Account_Master → Platform_Health_Metrics
   - Account_Master → Initiatives
   - Account_Master → Risk_Register
   - Account_Master → Stakeholder_Outcomes
   - Account_Master → Engagement_Log
   - Account_Master → Success_Plan_Tracker
   - Account_Master → Activities_Tasks

3. **Cross-Table Many:Many Relationships:**
   - Strategic_Objectives ↔ MuleSoft_Capabilities
   - Strategic_Objectives ↔ Value_Streams
   - Strategic_Objectives ↔ API_Portfolio
   - Strategic_Objectives ↔ Initiatives
   - Strategic_Objectives ↔ Risk_Register
   - MuleSoft_Capabilities ↔ Value_Streams
   - MuleSoft_Capabilities ↔ Initiatives
   - Value_Streams ↔ API_Portfolio
   - Risk_Register ↔ API_Portfolio
   - Risk_Register ↔ Value_Streams
   - Risk_Register ↔ Initiatives
   - Stakeholder_Outcomes ↔ API_Portfolio

---

## Data Flow Diagrams

### Health Score Calculation Flow

```
Account_Master
    │
    ├─→ Platform_Health_Metrics (35% weight)
    │       │
    │       └─→ MuleSoft_Capabilities
    │               │
    │               └─→ API_Portfolio
    │
    ├─→ Stakeholder_Outcomes (30% weight)
    │       │
    │       └─→ Value_Streams
    │               │
    │               └─→ Strategic_Objectives
    │
    ├─→ Engagement_Log (20% weight)
    │       │
    │       └─→ Activities_Tasks
    │
    └─→ Strategic_Objectives (15% weight)
            │
            └─→ Success_Plan_Tracker
                    │
                    └─→ Risk_Register
                            │
                            └─→ Initiatives
```

### Value Realization Flow

```
Strategic_Objectives
    │
    ├─→ Value_Streams
    │       │
    │       ├─→ Cycle_Time_Reduction
    │       ├─→ Annual_Cost_Savings
    │       └─→ Total_Business_Value
    │
    ├─→ API_Portfolio
    │       │
    │       ├─→ Business_Value_Score
    │       └─→ Revenue_Attribution
    │
    └─→ Stakeholder_Outcomes
            │
            ├─→ Improvement_Percent
            └─→ Target_Achievement_Percent
```

### Risk Assessment Flow

```
Risk_Register
    │
    ├─→ Impact_Score (1-5)
    ├─→ Probability_Score (1-5)
    │
    └─→ Risk_Score = Impact × Probability
            │
            ├─→ Risk_Level (Critical/High/Medium/Low)
            │
            └─→ Mitigation_Initiative
                    │
                    └─→ Initiatives
                            │
                            ├─→ Expected_Payback
                            ├─→ Three_Year_ROI
                            └─→ Actual_ROI
```

### Engagement Cadence Flow

```
Engagement_Log
    │
    ├─→ Engagement_Date
    ├─→ Cadence_Days (default: 30)
    │
    └─→ Next_Engagement_Date = Engagement_Date + Cadence_Days
            │
            ├─→ Cadence_Status (On Track/Due Soon/Overdue)
            │
            └─→ Activities_Tasks
                    │
                    └─→ Due_Date
                            │
                            └─→ Days_Until_Due
```

---

## Key Integration Patterns

### Pattern 1: Account-Centric Hierarchy
```
Account_Master (Root)
    │
    ├─→ Business_Context (1:1)
    │
    └─→ [All Other Tables] (1:Many)
```

### Pattern 2: Strategic Alignment Network
```
Strategic_Objectives (Central)
    │
    ├─→ MuleSoft_Capabilities (Many:Many)
    ├─→ Value_Streams (Many:Many)
    ├─→ API_Portfolio (Many:Many)
    ├─→ Initiatives (Many:Many)
    └─→ Stakeholder_Outcomes (Many:1)
```

### Pattern 3: Risk Mitigation Chain
```
Risk_Register
    │
    ├─→ Affected_Capability (Many:1)
    ├─→ Affected_APIs (Many:Many)
    ├─→ Affected_Value_Streams (Many:Many)
    ├─→ Linked_Objectives_At_Risk (Many:Many)
    └─→ Mitigation_Initiative (Many:1)
            │
            └─→ Initiatives
                    │
                    └─→ Expected_ROI
```

### Pattern 4: Task Linkage Network
```
Activities_Tasks
    │
    ├─→ Linked_Engagement (Many:1) → Engagement_Log
    ├─→ Linked_Initiative (Many:1) → Initiatives
    └─→ Linked_Risk (Many:1) → Risk_Register
```

---

## Field Mapping Summary Table

| Source Table | Source Field | Target Table | Target Field | Relationship Type |
|------------|-------------|-------------|-------------|------------------|
| Account_Master | accountId | Business_Context | account | 1:1 |
| Account_Master | accountId | Strategic_Objectives | account | 1:Many |
| Account_Master | accountId | MuleSoft_Capabilities | account | 1:Many |
| Account_Master | accountId | Value_Streams | account | 1:Many |
| Account_Master | accountId | API_Portfolio | account | 1:Many |
| Account_Master | accountId | Platform_Health_Metrics | account | 1:Many |
| Account_Master | accountId | Initiatives | account | 1:Many |
| Account_Master | accountId | Risk_Register | account | 1:Many |
| Account_Master | accountId | Stakeholder_Outcomes | account | 1:Many |
| Account_Master | accountId | Engagement_Log | account | 1:Many |
| Account_Master | accountId | Success_Plan_Tracker | account | 1:Many |
| Account_Master | accountId | Activities_Tasks | account | 1:Many |
| Strategic_Objectives | objectiveId | MuleSoft_Capabilities | linkedObjectives | Many:Many |
| Strategic_Objectives | objectiveId | Value_Streams | linkedObjectives | Many:Many |
| Strategic_Objectives | objectiveId | API_Portfolio | linkedObjectives | Many:Many |
| Strategic_Objectives | objectiveId | Initiatives | linkedObjectives | Many:Many |
| Strategic_Objectives | objectiveId | Risk_Register | linkedObjectivesAtRisk | Many:Many |
| Strategic_Objectives | objectiveId | Platform_Health_Metrics | linkedObjective | Many:1 |
| Strategic_Objectives | objectiveId | Stakeholder_Outcomes | linkedObjective | Many:1 |
| Strategic_Objectives | objectiveId | Success_Plan_Tracker | objectivesAddressed | Many:Many |
| MuleSoft_Capabilities | capabilityId | Value_Streams | enabledCapabilities | Many:Many |
| MuleSoft_Capabilities | capabilityId | Platform_Health_Metrics | linkedCapability | Many:1 |
| MuleSoft_Capabilities | capabilityId | Initiatives | linkedCapabilities | Many:Many |
| MuleSoft_Capabilities | capabilityId | Risk_Register | affectedCapability | Many:1 |
| Value_Streams | streamId | API_Portfolio | linkedValueStreams | Many:Many |
| Value_Streams | streamId | Stakeholder_Outcomes | linkedValueStream | Many:1 |
| Value_Streams | streamId | Risk_Register | affectedValueStreams | Many:Many |
| API_Portfolio | apiId | Stakeholder_Outcomes | linkedAPIServices | Many:Many |
| API_Portfolio | apiId | Risk_Register | affectedAPIs | Many:Many |
| Initiatives | initiativeId | Risk_Register | mitigationInitiative | Many:1 |
| Initiatives | initiativeId | Success_Plan_Tracker | keyInitiatives | Many:Many |
| Initiatives | initiativeId | Activities_Tasks | linkedInitiative | Many:1 |
| Risk_Register | riskId | Success_Plan_Tracker | top3Risks | Many:Many |
| Risk_Register | riskId | Activities_Tasks | linkedRisk | Many:1 |
| Engagement_Log | engagementId | Activities_Tasks | linkedEngagement | Many:1 |

---

## Implementation Notes

### Multi-Select String Pattern
For Many:Many relationships, Coda uses comma-separated ID strings:
- Format: "ID1, ID2, ID3"
- Example: `linkedCapabilities: "CAP-001, CAP-002, CAP-003"`
- Parsing: Split by comma and trim whitespace

### Foreign Key Pattern
For 1:Many and Many:1 relationships:
- Store the ID of the referenced record
- Use Coda's relation column type for automatic lookups
- Display property shows the human-readable name

### Formula Dependencies
Formulas that depend on related tables:
- `Health_Score` → Aggregates from Platform_Health_Metrics, Stakeholder_Outcomes, Engagement_Log, Strategic_Objectives
- `Risk_Level` → Calculated from Health_Score and Days_To_Renewal
- `Maturity_Gap` → Calculated from Current_Maturity and Target_Maturity
- `Business_Value` → Sums from Value_Streams and API_Portfolio

---

## Next Steps for Integration

1. **Validate Relationships:** Ensure all foreign key references are valid
2. **Test Data Flow:** Verify formulas work with related table data
3. **Create Views:** Build Coda views that join related tables
4. **Implement Sync:** Ensure sync tables maintain referential integrity
5. **Add Validation:** Create validation rules for relationship fields

---

**Last Updated:** 2024-11-09
**Version:** 1.0
**Status:** Ready for Implementation ✅

