# Architecture Diagrams: MuleSoft CSM Intelligence Platform
## Visual Representations for FigJam Import

---

## Diagram 1: Complete Table Relationship Map

```mermaid
erDiagram
    PeopleTeam ||--o{ AccountMaster : "referenced by"
    AccountMaster ||--|| BusinessContext : "1:1"
    AccountMaster ||--o{ StrategicObjectives : "1:Many"
    AccountMaster ||--o{ MuleSoftCapabilities : "1:Many"
    AccountMaster ||--o{ ValueStreams : "1:Many"
    AccountMaster ||--o{ APIPortfolio : "1:Many"
    AccountMaster ||--o{ PlatformHealthMetrics : "1:Many"
    AccountMaster ||--o{ Initiatives : "1:Many"
    AccountMaster ||--o{ RiskRegister : "1:Many"
    AccountMaster ||--o{ StakeholderOutcomes : "1:Many"
    AccountMaster ||--o{ EngagementLog : "1:Many"
    AccountMaster ||--o{ SuccessPlanTracker : "1:Many"
    AccountMaster ||--o{ ActivitiesTasks : "1:Many"
    
    StrategicObjectives }o--o{ MuleSoftCapabilities : "Many:Many"
    StrategicObjectives }o--o{ ValueStreams : "Many:Many"
    StrategicObjectives }o--o{ APIPortfolio : "Many:Many"
    StrategicObjectives }o--o{ Initiatives : "Many:Many"
    StrategicObjectives }o--o{ RiskRegister : "Many:Many"
    StrategicObjectives ||--o{ PlatformHealthMetrics : "Many:1"
    StrategicObjectives ||--o{ StakeholderOutcomes : "Many:1"
    StrategicObjectives }o--o{ SuccessPlanTracker : "Many:Many"
    
    MuleSoftCapabilities }o--o{ ValueStreams : "Many:Many"
    MuleSoftCapabilities }o--o{ Initiatives : "Many:Many"
    MuleSoftCapabilities ||--o{ PlatformHealthMetrics : "Many:1"
    MuleSoftCapabilities ||--o{ RiskRegister : "Many:1"
    
    ValueStreams }o--o{ APIPortfolio : "Many:Many"
    ValueStreams ||--o{ StakeholderOutcomes : "Many:1"
    ValueStreams }o--o{ RiskRegister : "Many:Many"
    
    APIPortfolio }o--o{ StakeholderOutcomes : "Many:Many"
    APIPortfolio }o--o{ RiskRegister : "Many:Many"
    
    Initiatives ||--o{ RiskRegister : "Many:1"
    Initiatives }o--o{ SuccessPlanTracker : "Many:Many"
    Initiatives ||--o{ ActivitiesTasks : "Many:1"
    
    RiskRegister }o--o{ SuccessPlanTracker : "Many:Many"
    RiskRegister ||--o{ ActivitiesTasks : "Many:1"
    
    EngagementLog ||--o{ ActivitiesTasks : "Many:1"
```

---

## Diagram 2: Data Flow - Health Score Calculation

```mermaid
flowchart TD
    A[AccountMaster] --> B[Health Score Calculation]
    
    B --> C[Platform Health 35%]
    B --> D[Business Value 30%]
    B --> E[Engagement 20%]
    B --> F[Strategic Alignment 15%]
    
    C --> C1[PlatformHealthMetrics]
    C1 --> C2[MuleSoftCapabilities]
    C2 --> C3[APIPortfolio]
    
    D --> D1[StakeholderOutcomes]
    D1 --> D2[ValueStreams]
    D2 --> D3[StrategicObjectives]
    
    E --> E1[EngagementLog]
    E1 --> E2[ActivitiesTasks]
    
    F --> F1[StrategicObjectives]
    F1 --> F2[SuccessPlanTracker]
    F2 --> F3[RiskRegister]
    
    style A fill:#e1f5ff
    style B fill:#fff4e1
    style C fill:#e8f5e9
    style D fill:#e8f5e9
    style E fill:#e8f5e9
    style F fill:#e8f5e9
```

---

## Diagram 3: Strategic Alignment Network

```mermaid
graph TB
    SO[StrategicObjectives<br/>Central Node]
    
    SO -->|Many:Many| MC[MuleSoftCapabilities]
    SO -->|Many:Many| VS[ValueStreams]
    SO -->|Many:Many| API[APIPortfolio]
    SO -->|Many:Many| INIT[Initiatives]
    SO -->|Many:1| PHM[PlatformHealthMetrics]
    SO -->|Many:1| OUT[StakeholderOutcomes]
    SO -->|Many:Many| RISK[RiskRegister]
    SO -->|Many:Many| SPT[SuccessPlanTracker]
    
    MC -->|Many:Many| VS
    MC -->|Many:Many| INIT
    MC -->|Many:1| PHM
    MC -->|Many:1| RISK
    
    VS -->|Many:Many| API
    VS -->|Many:1| OUT
    VS -->|Many:Many| RISK
    
    API -->|Many:Many| OUT
    API -->|Many:Many| RISK
    
    INIT -->|Many:1| RISK
    INIT -->|Many:Many| SPT
    INIT -->|Many:1| TASK[ActivitiesTasks]
    
    RISK -->|Many:Many| SPT
    RISK -->|Many:1| TASK
    
    style SO fill:#ff6b6b,color:#fff
    style MC fill:#4ecdc4,color:#fff
    style VS fill:#45b7d1,color:#fff
    style API fill:#96ceb4,color:#fff
    style INIT fill:#ffeaa7,color:#000
    style PHM fill:#dda0dd,color:#fff
    style OUT fill:#98d8c8,color:#fff
    style RISK fill:#f7b731,color:#fff
    style SPT fill:#a29bfe,color:#fff
    style TASK fill:#fd79a8,color:#fff
```

---

## Diagram 4: Risk Mitigation Chain

```mermaid
flowchart LR
    RISK[RiskRegister<br/>Risk Identified] --> ASSESS[Risk Assessment]
    
    ASSESS --> IMPACT[Impact Score 1-5]
    ASSESS --> PROB[Probability Score 1-5]
    
    IMPACT --> SCORE[Risk Score = Impact × Probability]
    PROB --> SCORE
    
    SCORE --> LEVEL{Risk Level}
    
    LEVEL -->|Critical/High| MIT[Mitigation Initiative]
    LEVEL -->|Medium| MON[Monitor]
    LEVEL -->|Low| ACC[Accept]
    
    MIT --> INIT[Initiatives]
    INIT --> TASK[ActivitiesTasks]
    
    RISK --> AFFECT[Affected Entities]
    AFFECT --> CAP[MuleSoftCapabilities]
    AFFECT --> API[APIPortfolio]
    AFFECT --> VS[ValueStreams]
    AFFECT --> OBJ[StrategicObjectives]
    
    style RISK fill:#ff6b6b,color:#fff
    style ASSESS fill:#ffe66d,color:#000
    style SCORE fill:#ff6b6b,color:#fff
    style MIT fill:#4ecdc4,color:#fff
    style INIT fill:#45b7d1,color:#fff
    style TASK fill:#96ceb4,color:#fff
```

---

## Diagram 5: Value Realization Flow

```mermaid
flowchart TD
    OBJ[StrategicObjectives<br/>Business Goals] --> VS[ValueStreams<br/>Business Processes]
    OBJ --> API[APIPortfolio<br/>Technical Assets]
    OBJ --> OUT[StakeholderOutcomes<br/>Success Metrics]
    
    VS --> METRICS1[Cycle Time Reduction]
    VS --> METRICS2[Cost Savings]
    VS --> METRICS3[Revenue Impact]
    
    API --> METRICS4[Transaction Volume]
    API --> METRICS5[Business Value Score]
    API --> METRICS6[Revenue Attribution]
    
    OUT --> METRICS7[Improvement %]
    OUT --> METRICS8[Target Achievement %]
    
    METRICS1 --> VALUE[Total Business Value]
    METRICS2 --> VALUE
    METRICS3 --> VALUE
    METRICS4 --> VALUE
    METRICS5 --> VALUE
    METRICS6 --> VALUE
    METRICS7 --> VALUE
    METRICS8 --> VALUE
    
    VALUE --> ROI[ROI Calculation]
    ROI --> INIT[Initiatives<br/>Investment Tracking]
    
    style OBJ fill:#ff6b6b,color:#fff
    style VS fill:#4ecdc4,color:#fff
    style API fill:#45b7d1,color:#fff
    style OUT fill:#96ceb4,color:#fff
    style VALUE fill:#ffe66d,color:#000
    style ROI fill:#a29bfe,color:#fff
    style INIT fill:#fd79a8,color:#fff
```

---

## Diagram 6: Engagement & Task Management Flow

```mermaid
sequenceDiagram
    participant CSM as CSM Team
    participant ENG as EngagementLog
    participant ACC as AccountMaster
    participant TASK as ActivitiesTasks
    participant INIT as Initiatives
    participant RISK as RiskRegister
    
    CSM->>ENG: Log Engagement
    ENG->>ACC: Update Last Engagement Date
    ENG->>ENG: Calculate Next Engagement Date
    ENG->>ENG: Calculate Cadence Status
    
    ENG->>TASK: Create Action Items
    TASK->>TASK: Set Due Date
    TASK->>TASK: Calculate Days Until Due
    
    TASK->>INIT: Link to Initiative (optional)
    TASK->>RISK: Link to Risk (optional)
    
    TASK->>CSM: Task Reminder (if overdue)
    ENG->>CSM: Engagement Due Alert
```

---

## Diagram 7: Account Hierarchy View

```mermaid
graph TD
    AM[AccountMaster<br/>Central Hub] --> BC[BusinessContext<br/>1:1]
    
    AM --> SO[StrategicObjectives<br/>1:Many]
    AM --> MC[MuleSoftCapabilities<br/>1:Many]
    AM --> VS[ValueStreams<br/>1:Many]
    AM --> API[APIPortfolio<br/>1:Many]
    AM --> PHM[PlatformHealthMetrics<br/>1:Many]
    AM --> INIT[Initiatives<br/>1:Many]
    AM --> RISK[RiskRegister<br/>1:Many]
    AM --> OUT[StakeholderOutcomes<br/>1:Many]
    AM --> ENG[EngagementLog<br/>1:Many]
    AM --> SPT[SuccessPlanTracker<br/>1:Many]
    AM --> TASK[ActivitiesTasks<br/>1:Many]
    
    style AM fill:#ff6b6b,color:#fff,stroke:#000,stroke-width:4px
    style BC fill:#4ecdc4,color:#fff
    style SO fill:#45b7d1,color:#fff
    style MC fill:#96ceb4,color:#fff
    style VS fill:#ffeaa7,color:#000
    style API fill:#dda0dd,color:#fff
    style PHM fill:#98d8c8,color:#fff
    style INIT fill:#f7b731,color:#fff
    style RISK fill:#fd79a8,color:#fff
    style OUT fill:#a29bfe,color:#fff
    style ENG fill:#6c5ce7,color:#fff
    style SPT fill:#00b894,color:#fff
    style TASK fill:#e17055,color:#fff
```

---

## Diagram 8: Cross-Table Many:Many Relationships

```mermaid
graph LR
    subgraph "Strategic Alignment"
        SO[StrategicObjectives]
        MC[MuleSoftCapabilities]
        VS[ValueStreams]
        API[APIPortfolio]
        INIT[Initiatives]
    end
    
    subgraph "Risk & Mitigation"
        RISK[RiskRegister]
        INIT2[Initiatives]
        TASK[ActivitiesTasks]
    end
    
    subgraph "Value & Outcomes"
        VS2[ValueStreams]
        API2[APIPortfolio]
        OUT[StakeholderOutcomes]
    end
    
    SO <-->|Many:Many| MC
    SO <-->|Many:Many| VS
    SO <-->|Many:Many| API
    SO <-->|Many:Many| INIT
    SO <-->|Many:Many| RISK
    
    MC <-->|Many:Many| VS
    MC <-->|Many:Many| INIT
    
    VS <-->|Many:Many| API
    VS <-->|Many:Many| RISK
    
    API <-->|Many:Many| OUT
    API <-->|Many:Many| RISK
    
    INIT <-->|Many:Many| RISK
    
    style SO fill:#ff6b6b,color:#fff
    style MC fill:#4ecdc4,color:#fff
    style VS fill:#45b7d1,color:#fff
    style API fill:#96ceb4,color:#fff
    style INIT fill:#ffeaa7,color:#000
    style RISK fill:#f7b731,color:#fff
    style OUT fill:#98d8c8,color:#fff
    style TASK fill:#fd79a8,color:#fff
```

---

## How to Use These Diagrams

### Option 1: Mermaid Live Editor
1. Copy any diagram code block
2. Go to https://mermaid.live
3. Paste the code
4. Export as PNG, SVG, or PDF

### Option 2: FigJam Import
1. Use Mermaid Live Editor to generate SVG
2. Import SVG into FigJam
3. Enhance with FigJam's visual tools

### Option 3: Documentation
- These diagrams render automatically in:
  - GitHub README files
  - GitLab documentation
  - Many markdown viewers
  - VS Code with Mermaid extension

### Option 4: Presentation Tools
- Export as images and use in:
  - PowerPoint
  - Google Slides
  - Confluence
  - Notion

---

## Diagram Legend

### Relationship Types
- `||--||` = One-to-One (1:1)
- `||--o{` = One-to-Many (1:Many)
- `}o--o{` = Many-to-Many (Many:Many)
- `||--o{` = Many-to-One (Many:1)

### Colors
- **Red (#ff6b6b)**: Central/Important nodes
- **Teal (#4ecdc4)**: Capabilities
- **Blue (#45b7d1)**: Value Streams
- **Green (#96ceb4)**: APIs/Technical
- **Yellow (#ffeaa7)**: Initiatives
- **Purple (#a29bfe)**: Plans/Tracking
- **Pink (#fd79a8)**: Tasks/Actions
- **Orange (#f7b731)**: Risks

---

**Last Updated:** 2024-11-09
**Version:** 1.0

