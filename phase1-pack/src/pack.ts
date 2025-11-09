import * as coda from "@codahq/packs-sdk";
import * as schemas from "./schemas";
import * as helpers from "./helpers";
import { formulaExecutors } from "./formulas";

/**
 * MuleSoft Customer Success Intelligence Platform
 * Phase 1 Pack: Foundation tables, formulas, and manual workflows
 */

export const pack = coda.newPack();

pack.setUserAuthentication({
  type: coda.AuthenticationType.None,
});

pack.addNetworkDomain("coda.io");

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

pack.addSyncTable({
  name: "MuleSoftCapabilities",
  identityName: "Capability",
  schema: schemas.CapabilitySchema,
  formula: {
    name: "SyncMuleSoftCapabilities",
    description: "Sync MuleSoft Capabilities",
    parameters: [],
    execute: helpers.syncMuleSoftCapabilities,
  },
});

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

pack.addFormula({
  name: "Risk_Level",
  description: "Calculate renewal risk level based on health score and days to renewal.",
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
  description: "Calculate days between today (or specific date) and the renewal date.",
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
  description: "Calculate the numeric gap between target and current maturity levels.",
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
  description: "Calculate the cycle time reduction percentage between baseline and current values.",
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
  description: "Calculate annual cost savings based on before/after costs and annual volume.",
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
  description: "Add total cost savings and revenue impact to get overall business value.",
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
  description: "Calculate SLA compliance percentage given average response time and SLA target.",
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
  description: "Determine business criticality based on uptime, revenue, transactions, and consumers.",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "uptimePercent",
      description: "API uptime percentage (0-100).",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "revenueUsd",
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
    formulaExecutors.calculateBusinessCriticality(uptime, revenue, transactions, apps),
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
  description: "Multiply impact and probability scores to calculate overall risk score.",
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
      name: "investmentUsd",
      description: "Total investment amount in USD.",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "expectedAnnualBenefitUsd",
      description: "Expected annual benefit in USD.",
    }),
  ],
  resultType: coda.ValueType.Number,
  execute: ([investment, expected]) =>
    formulaExecutors.calculateExpectedPayback(investment, expected),
});

pack.addFormula({
  name: "Three_Year_ROI",
  description: "Calculate the 3-year ROI percentage using investment and expected annual benefit.",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "investmentUsd",
      description: "Total investment amount in USD.",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "expectedAnnualBenefitUsd",
      description: "Expected annual benefit in USD.",
    }),
  ],
  resultType: coda.ValueType.Number,
  execute: ([investment, expected]) =>
    formulaExecutors.calculateThreeYearRoi(investment, expected),
});

pack.addFormula({
  name: "Actual_ROI",
  description: "Calculate the realized ROI percentage using investment and realized annual benefit.",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "investmentUsd",
      description: "Total investment amount in USD.",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "realizedAnnualBenefitUsd",
      description: "Realized annual benefit in USD.",
      optional: true,
    }),
  ],
  resultType: coda.ValueType.Number,
  execute: ([investment, realized]) =>
    formulaExecutors.calculateActualRoi(investment, realized),
});

pack.addFormula({
  name: "Target_Achievement",
  description: "Calculate the target achievement percentage based on baseline, current, and target values.",
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
