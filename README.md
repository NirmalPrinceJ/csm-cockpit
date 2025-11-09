# MuleSoft CSM Intelligence Platform - Phase 1

Strategic Account Tracking Coda Pack with 14-Table Architecture

## Pack Structure

Following Coda best practices from [integratewise/packs-examples](https://github.com/integratewise/packs-examples):

```
csm-cockpit/
├── src/
│   ├── pack.ts         # Main pack definition with all 14 sync tables
│   ├── schemas.ts      # All table schemas with featured properties
│   ├── helpers.ts      # Sync table execute functions
│   └── formulas.ts     # Phase 1 helper calculations
├── src/.coda-pack.json # Pack configuration (CLI expects this next to the manifest)
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── node_modules/       # Installed dependencies
```

## 14 Tables

### Core Account Management
1. **PeopleTeam** - Team roster with roles and regions
2. **AccountMaster** - Account master data (ARR, health score, CSM, etc.)
3. **BusinessContext** - Business environment and strategic priorities

### Strategic Alignment
4. **StrategicObjectives** - Customer strategic objectives
5. **MuleSoftCapabilities** - Capability maturity tracking
6. **ValueStreams** - Business value streams and metrics

### Technical Portfolio
7. **APIPortfolio** - API catalog with health metrics
8. **PlatformHealthMetrics** - Platform health indicators

### Execution & Risk
9. **Initiatives** - Strategic initiatives with ROI tracking
10. **RiskRegister** - Risk tracking and mitigation

### Outcomes & Engagement
11. **StakeholderOutcomes** - Stakeholder success metrics
12. **EngagementLog** - Engagement history with sentiment
13. **SuccessPlanTracker** - Success plan tracking
14. **ActivitiesTasks** - Activities and task management

## Pack Formulas

Reusable helper formulas matching the Phase 1 specification:
- `Risk_Level(healthScore, daysToRenewal)`
- `Days_To_Renewal(renewalDate, today?)`
- `Maturity_Gap(current, target)` and `Gap_Status(gap)`
- `Cycle_Time_Reduction(baselineHours, currentHours)`
- `Annual_Cost_Savings(beforeCost, afterCost, annualVolume)`
- `Business_Value(totalSavings, revenueImpact)`
- `SLA_Compliance(averageMs, targetMs)`
- `Business_Criticality(uptimePercent, revenueUSD, monthlyTransactions, consumingApps)`
- `Business_Value_Score(monthlyTransactions, consumingApps, slaPercent)`
- `Health_Status(currentValue, targetValue, warningThreshold, criticalThreshold)`
- `Risk_Score(impactScore, probabilityScore)` and `Risk_Level_FromScore(score)`
- `Expected_Payback(investmentUSD, expectedAnnualBenefitUSD)`
- `Three_Year_ROI(investmentUSD, expectedAnnualBenefitUSD)`
- `Actual_ROI(investmentUSD, realizedAnnualBenefitUSD)`
- `Target_Achievement(baselineValue, currentValue, targetValue)`

## Phase 2 Automations & Actions

New helper formulas:
- `Composite_Health(platform, businessValue, engagement, alignment [, custom weights])`
- `Engagement_Score(strategicAlignment, technicalHealth, relationshipDepth)`
- `Cadence_Status(lastEngagementDate, cadenceDays?, today?)`
- `Next_Engagement_Due(lastEngagementDate, cadenceDays?)`
- `Alignment_Percent(alignedObjectives, totalObjectives)`

Pack actions for buttons & automations:
- `Log_Engagement` – create an engagement row and compute cadence follow-up
- `Create_Task` – create a mitigation/follow-up task linked to engagements, initiatives, or risks
- `Generate_QBR_Brief` – produce a Markdown summary for QBR preparation
- `ROI_Snapshot` – calculate payback and ROI metrics for initiatives

## Usage

### Validate Pack
```bash
npm run validate
```

### Build Pack
```bash
npm run build
```

### Upload Pack
```bash
npx coda upload src/pack.ts
```

### Execute Formula (for testing)
```bash
npm run execute SyncAccountMaster
```

### Run Schema Sanity Checks
```bash
npm run test
```

## Phase 1 Implementation

**Current State**: All 14 sync tables return empty arrays for manual data entry.

**Key Features**:
- Complete schema definitions with proper types and hints
- Featured properties for better column visibility
- Email, Date, DateTime, Currency value hints
- Proper identity configuration for table relationships

## Phase 2 Roadmap

- Add Anypoint Platform API integration
- Implement pagination for large datasets
- Add Slack webhook notifications
- Implement button automations for QBR generation
- Add complex calculated formulas
- Enable automated health score calculations

## Development

Built with:
- Coda Packs SDK v1.12.1
- TypeScript 5.9.3
- Node.js 24.10.0

## Structure Improvements

Refactored from multi-agent architecture to standard Coda Pack structure:
- ✅ Schemas extracted to separate file
- ✅ Helper functions separated from definitions
- ✅ Featured properties for better UX
- ✅ Proper file organization at root level
- ✅ Standard naming conventions