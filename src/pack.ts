import * as coda from "@codahq/packs-sdk";
import * as schemas from "./schemas";
import * as helpers from "./helpers";
import * as lookups from "./lookups";
import { formulaExecutors } from "./formulas";

/**
 * Customer Success Intelligence Platform
 * Complete CSM solution for strategic account tracking, health monitoring,
 * and business value realization
 */

export const pack = coda.newPack();

// ============================================================================
// PACK METADATA
// ============================================================================

pack.setUserAuthentication({
  type: coda.AuthenticationType.None,
});

pack.addNetworkDomain("coda.io");

// ============================================================================
// SYNC TABLE 1: PEOPLE_TEAM
// ============================================================================

pack.addSyncTable({
  name: "PeopleTeam",
  identityName: "Person",
  schema: schemas.PersonSchema,
  formula: {
    name: "SyncPeopleTeam",
    description: "Sync People Team roster",
    parameters: [],
    execute: helpers.syncPeopleTeam,
  },
});

// ============================================================================
// SYNC TABLE 2: ACCOUNT_MASTER
// ============================================================================

pack.addSyncTable({
  name: "AccountMaster",
  identityName: "Account",
  schema: schemas.AccountSchema,
  formula: {
    name: "SyncAccountMaster",
    description: "Sync Account Master data",
    parameters: [],
    execute: helpers.syncAccountMaster,
  },
});

// ============================================================================
// SYNC TABLE 3: BUSINESS_CONTEXT
// ============================================================================

pack.addSyncTable({
  name: "BusinessContext",
  identityName: "Context",
  schema: schemas.BusinessContextSchema,
  formula: {
    name: "SyncBusinessContext",
    description: "Sync Business Context",
    parameters: [],
    execute: helpers.syncBusinessContext,
  },
});

// ============================================================================
// SYNC TABLE 4: STRATEGIC_OBJECTIVES
// ============================================================================

pack.addSyncTable({
  name: "StrategicObjectives",
  identityName: "Objective",
  schema: schemas.StrategicObjectiveSchema,
  formula: {
    name: "SyncStrategicObjectives",
    description: "Sync Strategic Objectives",
    parameters: [],
    execute: helpers.syncStrategicObjectives,
  },
});

// ============================================================================
// SYNC TABLE 5: MULESOFT_CAPABILITIES
// ============================================================================

pack.addSyncTable({
  name: "PlatformCapabilities",
  identityName: "Capability",
  schema: schemas.CapabilitySchema,
  formula: {
    name: "SyncPlatformCapabilities",
    description: "Sync Platform Capabilities and maturity tracking",
    parameters: [],
    execute: helpers.syncPlatformCapabilities,
  },
});

// ============================================================================
// SYNC TABLE 6: VALUE_STREAMS
// ============================================================================

pack.addSyncTable({
  name: "ValueStreams",
  identityName: "ValueStream",
  schema: schemas.ValueStreamSchema,
  formula: {
    name: "SyncValueStreams",
    description: "Sync Value Streams",
    parameters: [],
    execute: helpers.syncValueStreams,
  },
});

// ============================================================================
// SYNC TABLE 7: API_PORTFOLIO
// ============================================================================

pack.addSyncTable({
  name: "APIPortfolio",
  identityName: "API",
  schema: schemas.APISchema,
  formula: {
    name: "SyncAPIPortfolio",
    description: "Sync API Portfolio",
    parameters: [],
    execute: helpers.syncAPIPortfolio,
  },
});

// ============================================================================
// SYNC TABLE 8: PLATFORM_HEALTH_METRICS
// ============================================================================

pack.addSyncTable({
  name: "PlatformHealthMetrics",
  identityName: "Metric",
  schema: schemas.MetricSchema,
  formula: {
    name: "SyncPlatformHealthMetrics",
    description: "Sync Platform Health Metrics",
    parameters: [],
    execute: helpers.syncPlatformHealthMetrics,
  },
});

// ============================================================================
// SYNC TABLE 9: INITIATIVES
// ============================================================================

pack.addSyncTable({
  name: "Initiatives",
  identityName: "Initiative",
  schema: schemas.InitiativeSchema,
  formula: {
    name: "SyncInitiatives",
    description: "Sync Initiatives",
    parameters: [],
    execute: helpers.syncInitiatives,
  },
});

// ============================================================================
// SYNC TABLE 10: RISK_REGISTER
// ============================================================================

pack.addSyncTable({
  name: "RiskRegister",
  identityName: "Risk",
  schema: schemas.RiskSchema,
  formula: {
    name: "SyncRiskRegister",
    description: "Sync Risk Register",
    parameters: [],
    execute: helpers.syncRiskRegister,
  },
});

// ============================================================================
// SYNC TABLE 11: STAKEHOLDER_OUTCOMES
// ============================================================================

pack.addSyncTable({
  name: "StakeholderOutcomes",
  identityName: "Outcome",
  schema: schemas.OutcomeSchema,
  formula: {
    name: "SyncStakeholderOutcomes",
    description: "Sync Stakeholder Outcomes",
    parameters: [],
    execute: helpers.syncStakeholderOutcomes,
  },
});

// ============================================================================
// SYNC TABLE 12: ENGAGEMENT_LOG
// ============================================================================

pack.addSyncTable({
  name: "EngagementLog",
  identityName: "Engagement",
  schema: schemas.EngagementSchema,
  formula: {
    name: "SyncEngagementLog",
    description: "Sync Engagement Log",
    parameters: [],
    execute: helpers.syncEngagementLog,
  },
});

// ============================================================================
// SYNC TABLE 13: SUCCESS_PLAN_TRACKER
// ============================================================================

pack.addSyncTable({
  name: "SuccessPlanTracker",
  identityName: "SuccessPlan",
  schema: schemas.SuccessPlanSchema,
  formula: {
    name: "SyncSuccessPlanTracker",
    description: "Sync Success Plan Tracker",
    parameters: [],
    execute: helpers.syncSuccessPlanTracker,
  },
});

// ============================================================================
// SYNC TABLE 14: ACTIVITIES_TASKS
// ============================================================================

pack.addSyncTable({
  name: "ActivitiesTasks",
  identityName: "Task",
  schema: schemas.TaskSchema,
  formula: {
    name: "SyncActivitiesTasks",
    description: "Sync Activities & Tasks",
    parameters: [],
    execute: helpers.syncActivitiesTasks,
  },
});

// ============================================================================
// FORMULAS: PHASE 1 HELPER CALCULATIONS
// ============================================================================

pack.addFormula({
  name: "Risk_Level",
  description:
    "Calculate renewal risk level based on health score and days to renewal.",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "healthScore",
      description: "Account health score (0-100).",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "daysToRenewal",
      description: "Days remaining until renewal.",
      optional: true,
    }),
  ],
  resultType: coda.ValueType.String,
  execute: ([healthScore, daysToRenewal]) =>
    formulaExecutors.calculateRiskLevel(healthScore, daysToRenewal),
});

pack.addFormula({
  name: "Days_To_Renewal",
  description:
    "Calculate days between today (or specific date) and the renewal date.",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Date,
      name: "renewalDate",
      description: "Renewal date.",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Date,
      name: "today",
      description: "Reference date, defaults to the current date.",
      optional: true,
    }),
  ],
  resultType: coda.ValueType.Number,
  execute: ([renewalDate, today]) =>
    formulaExecutors.calculateDaysToRenewal(renewalDate, today),
});

pack.addFormula({
  name: "Maturity_Gap",
  description:
    "Calculate the numeric gap between target and current maturity levels.",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "currentMaturity",
      description: "Current maturity level (numeric).",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "targetMaturity",
      description: "Target maturity level (numeric).",
    }),
  ],
  resultType: coda.ValueType.Number,
  execute: ([current, target]) =>
    formulaExecutors.calculateMaturityGap(current, target),
});

pack.addFormula({
  name: "Gap_Status",
  description: "Return the status string for a maturity gap value.",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "maturityGap",
      description: "Maturity gap value.",
    }),
  ],
  resultType: coda.ValueType.String,
  execute: ([gap]) => formulaExecutors.calculateGapStatus(gap),
});

pack.addFormula({
  name: "Cycle_Time_Reduction",
  description:
    "Calculate the cycle time reduction percentage between baseline and current values.",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "baselineHours",
      description: "Baseline cycle time in hours.",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "currentHours",
      description: "Current cycle time in hours.",
    }),
  ],
  resultType: coda.ValueType.Number,
  execute: ([baseline, current]) =>
    formulaExecutors.calculateCycleTimeReduction(baseline, current),
});

pack.addFormula({
  name: "Annual_Cost_Savings",
  description:
    "Calculate annual cost savings based on before/after costs and annual volume.",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "beforeCost",
      description: "Cost per transaction before improvement.",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "afterCost",
      description: "Cost per transaction after improvement.",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "annualVolume",
      description: "Annual transaction volume.",
    }),
  ],
  resultType: coda.ValueType.Number,
  execute: ([before, after, volume]) =>
    formulaExecutors.calculateAnnualCostSavings(before, after, volume),
});

pack.addFormula({
  name: "Business_Value",
  description:
    "Add total cost savings and revenue impact to get overall business value.",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "totalSavings",
      description: "Total cost savings value.",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "revenueImpact",
      description: "Revenue impact value.",
    }),
  ],
  resultType: coda.ValueType.Number,
  execute: ([savings, revenue]) =>
    formulaExecutors.calculateBusinessValue(savings, revenue),
});

pack.addFormula({
  name: "SLA_Compliance",
  description:
    "Calculate SLA compliance percentage given average response time and SLA target.",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "averageMs",
      description: "Average response time in milliseconds.",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "targetMs",
      description: "Target response time in milliseconds.",
    }),
  ],
  resultType: coda.ValueType.Number,
  execute: ([avg, target]) =>
    formulaExecutors.calculateSlaCompliance(avg, target),
});

pack.addFormula({
  name: "Business_Criticality",
  description:
    "Determine business criticality based on uptime, revenue, transactions, and consumers.",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "uptimePercent",
      description: "API uptime percentage (0-100).",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "revenueUSD",
      description: "Revenue attributed to the API in USD.",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "monthlyTransactions",
      description: "Average monthly transactions.",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "consumingApps",
      description: "Number of consuming applications.",
    }),
  ],
  resultType: coda.ValueType.String,
  execute: ([uptime, revenue, transactions, apps]) =>
    formulaExecutors.calculateBusinessCriticality(
      uptime,
      revenue,
      transactions,
      apps,
    ),
});

pack.addFormula({
  name: "Business_Value_Score",
  description: "Calculate the business value score for an API.",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "monthlyTransactions",
      description: "Average monthly transactions.",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "consumingApps",
      description: "Number of consuming applications.",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "slaPercent",
      description: "SLA compliance percentage (0-100).",
    }),
  ],
  resultType: coda.ValueType.Number,
  execute: ([transactions, apps, sla]) =>
    formulaExecutors.calculateBusinessValueScore(transactions, apps, sla),
});

pack.addFormula({
  name: "Health_Status",
  description: "Return the health status indicator (emoji) based on thresholds.",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "currentValue",
      description: "Current measurement value.",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "targetValue",
      description: "Target threshold value.",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "warningThreshold",
      description: "Warning threshold value.",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "criticalThreshold",
      description: "Critical threshold value.",
    }),
  ],
  resultType: coda.ValueType.String,
  execute: ([current, target, warn, critical]) =>
    formulaExecutors.calculateHealthStatus(current, target, warn, critical),
});

pack.addFormula({
  name: "Risk_Score",
  description:
    "Multiply impact and probability scores to calculate overall risk score.",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "impactScore",
      description: "Impact score (1-5).",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "probabilityScore",
      description: "Probability score (1-5).",
    }),
  ],
  resultType: coda.ValueType.Number,
  execute: ([impact, probability]) =>
    formulaExecutors.calculateRiskScore(impact, probability),
});

pack.addFormula({
  name: "Risk_Level_FromScore",
  description: "Convert a numeric risk score into a risk level string.",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "riskScore",
      description: "Risk score value.",
    }),
  ],
  resultType: coda.ValueType.String,
  execute: ([score]) => formulaExecutors.calculateRiskLevelFromScore(score),
});

pack.addFormula({
  name: "Expected_Payback",
  description: "Calculate the expected payback period in months.",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "investmentUSD",
      description: "Total investment amount in USD.",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "expectedAnnualBenefitUSD",
      description: "Expected annual benefit in USD.",
    }),
  ],
  resultType: coda.ValueType.Number,
  execute: ([investment, expected]) =>
    formulaExecutors.calculateExpectedPayback(investment, expected),
});

pack.addFormula({
  name: "Three_Year_ROI",
  description:
    "Calculate the 3-year ROI percentage using investment and expected annual benefit.",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "investmentUSD",
      description: "Total investment amount in USD.",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "expectedAnnualBenefitUSD",
      description: "Expected annual benefit in USD.",
    }),
  ],
  resultType: coda.ValueType.Number,
  execute: ([investment, expected]) =>
    formulaExecutors.calculateThreeYearRoi(investment, expected),
});

pack.addFormula({
  name: "Actual_ROI",
  description:
    "Calculate the realized ROI percentage using investment and realized annual benefit.",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "investmentUSD",
      description: "Total investment amount in USD.",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "realizedAnnualBenefitUSD",
      description: "Realized annual benefit in USD.",
    }),
  ],
  resultType: coda.ValueType.Number,
  execute: ([investment, realized]) =>
    formulaExecutors.calculateActualRoi(investment, realized),
});

pack.addFormula({
  name: "Target_Achievement",
  description:
    "Calculate the target achievement percentage based on baseline, current, and target values.",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "baselineValue",
      description: "Baseline value.",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "currentValue",
      description: "Current value.",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "targetValue",
      description: "Target value.",
    }),
  ],
  resultType: coda.ValueType.Number,
  execute: ([baseline, current, target]) =>
    formulaExecutors.calculateTargetAchievement(baseline, current, target),
});

pack.addFormula({
  name: "Composite_Health",
  description:
    "Weighted composite health score (default weights: 35% platform, 30% value, 20% engagement, 15% alignment).",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "platformHealth",
      description: "Platform technical health score (0-100).",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "businessValueRealization",
      description: "Business value realization score (0-100).",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "stakeholderEngagement",
      description: "Stakeholder engagement score (0-100).",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "strategicAlignment",
      description: "Strategic alignment score (0-100).",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "platformWeight",
      description: "Override weight for platform health.",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "businessWeight",
      description: "Override weight for business value realization.",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "stakeholderWeight",
      description: "Override weight for stakeholder engagement.",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "alignmentWeight",
      description: "Override weight for strategic alignment.",
      optional: true,
    }),
  ],
  resultType: coda.ValueType.Number,
  execute: ([
    platformHealth,
    businessValueRealization,
    stakeholderEngagement,
    strategicAlignment,
    platformWeight,
    businessWeight,
    stakeholderWeight,
    alignmentWeight,
  ]) =>
    formulaExecutors.calculateCompositeHealth(
      platformHealth,
      businessValueRealization,
      stakeholderEngagement,
      strategicAlignment,
      platformWeight,
      businessWeight,
      stakeholderWeight,
      alignmentWeight,
    ),
});

pack.addFormula({
  name: "Engagement_Score",
  description:
    "Average the strategic alignment, technical health, and relationship depth scores to a single engagement score.",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "strategicAlignmentScore",
      description: "Strategic alignment score (0-10).",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "technicalHealthScore",
      description: "Technical health score (0-10).",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "relationshipDepthScore",
      description: "Relationship depth score (0-10).",
      optional: true,
    }),
  ],
  resultType: coda.ValueType.Number,
  execute: ([alignment, technical, relationship]) =>
    formulaExecutors.calculateEngagementScore(alignment, technical, relationship),
});

pack.addFormula({
  name: "Cadence_Status",
  description:
    "Determine engagement cadence status (On Track, Due Soon, Overdue) based on the last engagement date and cadence interval.",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Date,
      name: "lastEngagementDate",
      description: "Date of the last engagement.",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "cadenceDays",
      description: "Number of days for the desired engagement cadence (default 30).",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.Date,
      name: "today",
      description: "Reference date, defaults to current date.",
      optional: true,
    }),
  ],
  resultType: coda.ValueType.String,
  execute: ([lastEngagementDate, cadenceDays, today]) =>
    formulaExecutors.calculateEngagementCadenceStatus(lastEngagementDate, cadenceDays, today),
});

pack.addFormula({
  name: "Next_Engagement_Due",
  description: "Calculate the next engagement date based on the last engagement and cadence interval.",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Date,
      name: "lastEngagementDate",
      description: "Date of the last engagement.",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "cadenceDays",
      description: "Cadence interval in days (default 30).",
      optional: true,
    }),
  ],
  resultType: coda.ValueType.String,
  codaType: coda.ValueHintType.Date,
  execute: ([lastEngagementDate, cadenceDays]) => {
    const next = formulaExecutors.calculateNextEngagementDate(lastEngagementDate, cadenceDays);
    return next ? next.toISOString() : null;
  },
});

pack.addFormula({
  name: "Alignment_Percent",
  description: "Calculate the percentage of objectives that are aligned or on track.",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "alignedObjectives",
      description: "Number of aligned/on-track objectives.",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "totalObjectives",
      description: "Total number of objectives.",
    }),
  ],
  resultType: coda.ValueType.Number,
  execute: ([aligned, total]) =>
    formulaExecutors.calculateAlignmentPercent(aligned, total),
});

// ============================================================================
// ACTIONS: PHASE 2 WORKFLOWS
// ============================================================================

pack.addFormula({
  name: "Log_Engagement",
  description: "Create a new engagement entry and compute cadence follow-up dates.",
  isAction: true,
  resultType: coda.ValueType.Object,
  schema: schemas.EngagementSchema,
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "account",
      description: "Account name.",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Date,
      name: "engagementDate",
      description: "Engagement date.",
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "engagementType",
      description: "Type of engagement (QBR, Workshop, etc.).",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "sentiment",
      description: "Overall sentiment.",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "customerSeniority",
      description: "Customer seniority level.",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "cadenceDays",
      description: "Desired cadence in days (default 30).",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "attendeesMuleSoft",
      description: "MuleSoft attendees.",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "attendeesCustomer",
      description: "Customer attendees.",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "topicsDiscussed",
      description: "Topics discussed during the engagement.",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "actionItems",
      description: "Action items captured in the session.",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "nextSteps",
      description: "Next steps coming out of the engagement.",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "strategicAlignmentScore",
      description: "Strategic alignment score (0-10).",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "technicalHealthScore",
      description: "Technical health score (0-10).",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "relationshipDepthScore",
      description: "Relationship depth score (0-10).",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "notes",
      description: "Additional notes.",
      optional: true,
    }),
  ],
  execute: ([
    account,
    engagementDate,
    engagementType,
    sentiment,
    customerSeniority,
    cadenceDays,
    attendeesMuleSoft,
    attendeesCustomer,
    topicsDiscussed,
    actionItems,
    nextSteps,
    strategicAlignmentScore,
    technicalHealthScore,
    relationshipDepthScore,
    notes,
  ]) =>
    helpers.logEngagementAction(
      account,
      engagementDate,
      engagementType,
      sentiment,
      customerSeniority,
      cadenceDays,
      attendeesMuleSoft,
      attendeesCustomer,
      topicsDiscussed,
      actionItems,
      nextSteps,
      strategicAlignmentScore,
      technicalHealthScore,
      relationshipDepthScore,
      notes,
    ),
});

pack.addFormula({
  name: "Create_Task",
  description: "Create a follow-up task tied to an account, engagement, initiative, or risk.",
  isAction: true,
  resultType: coda.ValueType.Object,
  schema: schemas.TaskSchema,
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "account",
      description: "Account name.",
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "taskTitle",
      description: "Task title.",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Date,
      name: "dueDate",
      description: "Task due date.",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "assignedTo",
      description: "Task owner.",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "priority",
      description: "Task priority.",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "taskType",
      description: "Task type/classification.",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "status",
      description: "Task status (defaults to Open).",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "linkedEngagement",
      description: "Related engagement ID.",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "linkedInitiative",
      description: "Related initiative ID.",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "linkedRisk",
      description: "Related risk ID.",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "notes",
      description: "Task description or notes.",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "createdBy",
      description: "Creator name.",
      optional: true,
    }),
  ],
  execute: ([
    account,
    taskTitle,
    dueDate,
    assignedTo,
    priority,
    taskType,
    status,
    linkedEngagement,
    linkedInitiative,
    linkedRisk,
    notes,
    createdBy,
  ]) =>
    helpers.createTaskAction(
      account,
      taskTitle,
      dueDate,
      assignedTo,
      priority,
      taskType,
      status,
      linkedEngagement,
      linkedInitiative,
      linkedRisk,
      notes,
      createdBy,
    ),
});

pack.addFormula({
  name: "Generate_QBR_Brief",
  description: "Produce a Markdown QBR summary for an account and plan period.",
  isAction: true,
  resultType: coda.ValueType.String,
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "accountName",
      description: "Account name.",
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "planPeriod",
      description: "Plan period (FY2025 H1, Q4 2024, etc.).",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.StringArray,
      name: "highlights",
      description: "Key highlights for the period.",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.StringArray,
      name: "keyMetrics",
      description: "Key metrics to showcase.",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.StringArray,
      name: "openRisks",
      description: "Top risks to highlight.",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "nextSteps",
      description: "Next steps to call out.",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "preparedBy",
      description: "Author of the brief.",
      optional: true,
    }),
  ],
  execute: ([accountName, planPeriod, highlights = [], keyMetrics = [], openRisks = [], nextSteps, preparedBy]) =>
    helpers.generateQbrBriefAction(
      accountName,
      planPeriod,
      highlights,
      keyMetrics,
      openRisks,
      nextSteps,
      preparedBy,
    ),
});

pack.addFormula({
  name: "ROI_Snapshot",
  description: "Calculate expected payback and ROI metrics for an initiative.",
  isAction: true,
  resultType: coda.ValueType.Object,
  schema: schemas.RoiSnapshotSchema,
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "investmentUSD",
      description: "Total investment in USD.",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "expectedAnnualBenefitUSD",
      description: "Expected annual benefit in USD.",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "realizedAnnualBenefitUSD",
      description: "Realized annual benefit in USD.",
      optional: true,
    }),
  ],
  execute: ([investmentUSD, expectedAnnualBenefitUSD, realizedAnnualBenefitUSD]) =>
    helpers.generateRoiSnapshotAction(
      investmentUSD,
      expectedAnnualBenefitUSD,
      realizedAnnualBenefitUSD,
    ),
});

// ============================================================================
// SYNC TABLE 15: VIEW_TEMPLATES
// ============================================================================

pack.addSyncTable({
  name: "ViewTemplates",
  identityName: "ViewTemplate",
  schema: schemas.ViewTemplateSchema,
  formula: {
    name: "SyncViewTemplates",
    description: "Sync the 5 core view templates (CSM Command Center, Strategic Board, Health Dashboard, QBR Prep, Renewal Risk)",
    parameters: [],
    execute: helpers.syncViewTemplates,
  },
});

// ============================================================================
// SYNC TABLE 16: QUICK_START_GUIDE
// ============================================================================

pack.addSyncTable({
  name: "QuickStartGuide",
  identityName: "QuickStartStep",
  schema: schemas.QuickStartSchema,
  formula: {
    name: "SyncQuickStartGuide",
    description: "8-step guided setup to build your complete CSM Intelligence workspace (15-20 min total). Includes page creation, table setup, and configuration for all 5 core views.",
    parameters: [],
    execute: helpers.syncQuickStartGuide,
  },
});

// ============================================================================
// LOOKUP FORMULAS - CROSS-TABLE RELATIONSHIPS
// ============================================================================
// Note: These formulas help users create relationships between tables in Phase 1.
// Full cross-table queries will be available in Phase 2.

pack.addFormula({
  name: "GetAccountHealth",
  description: "Get the health score for a given account",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "accountName",
      description: "The account name",
    }),
  ],
  resultType: coda.ValueType.Number,
  execute: ([accountName]) => {
    const sampleData: { [key: string]: number } = {
      "Acme Financial Services": 82,
      "Nordic Logistics Group": 88,
      "HealthTech Solutions": 74,
    };
    return sampleData[accountName] || 75;
  },
});

pack.addFormula({
  name: "GetAccountARR",
  description: "Get the ARR (Annual Recurring Revenue) for a given account",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "accountName",
      description: "The account name",
    }),
  ],
  resultType: coda.ValueType.Number,
  codaType: coda.ValueHintType.Currency,
  execute: ([accountName]) => {
    const sampleData: { [key: string]: number } = {
      "Acme Financial Services": 1200000,
      "Nordic Logistics Group": 850000,
      "HealthTech Solutions": 350000,
    };
    return sampleData[accountName] || 500000;
  },
});

pack.addFormula({
  name: "FormatAccountSummary",
  description: "Create a formatted summary of account health, ARR, and key metrics",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "accountName",
      description: "The account name",
    }),
  ],
  resultType: coda.ValueType.String,
  execute: ([accountName]) => {
    return `${accountName} | Use lookup columns to display: Health Score, ARR, Risk Level, Days to Renewal from AccountMaster table`;
  },
});

pack.addFormula({
  name: "CreateReferenceID",
  description: "Create a unique reference ID linking tables (e.g., ACME-OBJ-001)",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "accountName",
      description: "The account name",
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "entityType",
      description: "Entity type: OBJ (objective), INIT (initiative), RISK, TASK, etc.",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "sequence",
      description: "Sequence number",
    }),
  ],
  resultType: coda.ValueType.String,
  execute: ([accountName, entityType, sequence]) => {
    const prefix = accountName.substring(0, 4).toUpperCase();
    const seqStr = sequence.toString().padStart(3, "0");
    return `${prefix}-${entityType}-${seqStr}`;
  },
});
