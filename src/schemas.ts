import * as coda from "@codahq/packs-sdk";

/**
 * SCHEMAS - Phase 1
 * All 14 table schemas with featured properties for better UX
 */

// ===========================================================================
// TABLE 1: PEOPLE_TEAM
// ===========================================================================

export const PersonSchema = coda.makeObjectSchema({
  properties: {
    personId: { type: coda.ValueType.String, required: true },
    fullName: { type: coda.ValueType.String, required: true },
    email: { type: coda.ValueType.String, codaType: coda.ValueHintType.Email },
    role: { type: coda.ValueType.String },
    department: { type: coda.ValueType.String },
    region: { type: coda.ValueType.String },
    activeStatus: { type: coda.ValueType.Boolean },
  },
  idProperty: "personId",
  displayProperty: "fullName",
  featuredProperties: ["fullName", "email", "role", "department"],
});

// ===========================================================================
// TABLE 2: ACCOUNT_MASTER
// ===========================================================================

export const AccountSchema = coda.makeObjectSchema({
  properties: {
    accountId: { type: coda.ValueType.String, required: true },
    accountName: { type: coda.ValueType.String, required: true },
    industryVertical: { type: coda.ValueType.String },
    industrySubSector: { type: coda.ValueType.String },
    contractType: { type: coda.ValueType.String },
    contractStartDate: { type: coda.ValueType.String, codaType: coda.ValueHintType.Date },
    contractEndDate: { type: coda.ValueType.String, codaType: coda.ValueHintType.Date },
    renewalDate: { type: coda.ValueType.String, codaType: coda.ValueHintType.Date },
    daysToRenewal: { type: coda.ValueType.Number },
    arr: { type: coda.ValueType.Number, codaType: coda.ValueHintType.Currency },
    acv: { type: coda.ValueType.Number, codaType: coda.ValueHintType.Currency },
    customerSuccessManager: { type: coda.ValueType.String },
    accountExecutive: { type: coda.ValueType.String },
    solutionsArchitect: { type: coda.ValueType.String },
    executiveSponsorCustomer: { type: coda.ValueType.String },
    executiveSponsorMuleSoft: { type: coda.ValueType.String },
    healthScore: { type: coda.ValueType.Number },
    riskLevel: { type: coda.ValueType.String },
    spRating: { type: coda.ValueType.String },
    customerRevenue: { type: coda.ValueType.Number, codaType: coda.ValueHintType.Currency },
    employeeCount: { type: coda.ValueType.Number },
    geography: { type: coda.ValueType.String },
    primaryContactName: { type: coda.ValueType.String },
    primaryContactEmail: { type: coda.ValueType.String, codaType: coda.ValueHintType.Email },
    primaryContactRole: { type: coda.ValueType.String },
    lastEngagementDate: { type: coda.ValueType.String, codaType: coda.ValueHintType.Date },
    nextEngagementDate: { type: coda.ValueType.String, codaType: coda.ValueHintType.Date },
    createdDate: { type: coda.ValueType.String, codaType: coda.ValueHintType.DateTime },
    lastModified: { type: coda.ValueType.String, codaType: coda.ValueHintType.DateTime },
  },
  idProperty: "accountId",
  displayProperty: "accountName",
  featuredProperties: [
    "accountName",
    "healthScore",
    "arr",
    "customerSuccessManager",
    "accountExecutive",
    "renewalDate",
    "riskLevel",
  ],
});

// ===========================================================================
// TABLE 3: BUSINESS_CONTEXT
// ===========================================================================

export const BusinessContextSchema = coda.makeObjectSchema({
  properties: {
    contextId: { type: coda.ValueType.String, required: true },
    account: { type: coda.ValueType.String, required: true },
    businessModel: { type: coda.ValueType.String },
    marketPosition: { type: coda.ValueType.String },
    operatingEnvironment: { type: coda.ValueType.String },
    keyChallenges: { type: coda.ValueType.String },
    strategicPriorities: { type: coda.ValueType.String },
    digitalMaturity: { type: coda.ValueType.String },
    itComplexityScore: { type: coda.ValueType.Number },
    legacySystemCount: { type: coda.ValueType.Number },
    cloudStrategy: { type: coda.ValueType.String },
    dataClassification: { type: coda.ValueType.String },
    lastUpdated: { type: coda.ValueType.String, codaType: coda.ValueHintType.DateTime },
  },
  idProperty: "contextId",
  displayProperty: "account",
  featuredProperties: ["account", "digitalMaturity", "strategicPriorities", "keyChallenges"],
});

// ===========================================================================
// TABLE 4: STRATEGIC_OBJECTIVES
// ===========================================================================

export const StrategicObjectiveSchema = coda.makeObjectSchema({
  properties: {
    objectiveId: { type: coda.ValueType.String, required: true },
    account: { type: coda.ValueType.String, required: true },
    strategicPillar: { type: coda.ValueType.String },
    objectiveName: { type: coda.ValueType.String, required: true },
    description: { type: coda.ValueType.String },
    businessDriver: { type: coda.ValueType.String },
    quantifiedGoal: { type: coda.ValueType.String },
    targetDate: { type: coda.ValueType.String, codaType: coda.ValueHintType.Date },
    businessOwner: { type: coda.ValueType.String },
    businessValue: { type: coda.ValueType.Number, codaType: coda.ValueHintType.Currency },
    mulesoftRelevance: { type: coda.ValueType.String },
    status: { type: coda.ValueType.String },
    progressPercent: { type: coda.ValueType.Number },
    lastReviewDate: { type: coda.ValueType.String, codaType: coda.ValueHintType.Date },
    notes: { type: coda.ValueType.String },
    linkedCapabilities: { type: coda.ValueType.String },
    linkedValueStreams: { type: coda.ValueType.String },
    linkedInitiatives: { type: coda.ValueType.String },
  },
  idProperty: "objectiveId",
  displayProperty: "objectiveName",
  featuredProperties: ["objectiveName", "status", "progressPercent", "businessValue", "targetDate"],
});

// ===========================================================================
// TABLE 5: MULESOFT_CAPABILITIES
// ===========================================================================

export const CapabilitySchema = coda.makeObjectSchema({
  properties: {
    capabilityId: { type: coda.ValueType.String, required: true },
    account: { type: coda.ValueType.String, required: true },
    capabilityDomain: { type: coda.ValueType.String },
    capabilityName: { type: coda.ValueType.String, required: true },
    description: { type: coda.ValueType.String },
    currentMaturity: { type: coda.ValueType.String },
    targetMaturity: { type: coda.ValueType.String },
    currentMaturityNumeric: { type: coda.ValueType.Number },
    targetMaturityNumeric: { type: coda.ValueType.Number },
    maturityGap: { type: coda.ValueType.Number },
    gapStatus: { type: coda.ValueType.String },
    linkedObjectives: { type: coda.ValueType.String },
    supportingValueStreams: { type: coda.ValueType.String },
    investmentRequired: { type: coda.ValueType.Number, codaType: coda.ValueHintType.Currency },
    priority: { type: coda.ValueType.String },
    implementationStatus: { type: coda.ValueType.String },
    businessImpact: { type: coda.ValueType.String },
    technicalOwner: { type: coda.ValueType.String },
    lastAssessmentDate: { type: coda.ValueType.String, codaType: coda.ValueHintType.Date },
  },
  idProperty: "capabilityId",
  displayProperty: "capabilityName",
  featuredProperties: ["capabilityName", "maturityGap", "priority", "implementationStatus"],
});

// ===========================================================================
// TABLE 6: VALUE_STREAMS
// ===========================================================================

export const ValueStreamSchema = coda.makeObjectSchema({
  properties: {
    streamId: { type: coda.ValueType.String, required: true },
    account: { type: coda.ValueType.String, required: true },
    valueStreamName: { type: coda.ValueType.String, required: true },
    businessProcess: { type: coda.ValueType.String },
    processOwner: { type: coda.ValueType.String },
    linkedObjectives: { type: coda.ValueType.String },
    enabledCapabilities: { type: coda.ValueType.String },
    integrationEndpoints: { type: coda.ValueType.Number },
    apisConsumed: { type: coda.ValueType.Number },
    annualTransactionVolume: { type: coda.ValueType.Number },
    cycleTimeBaselineHours: { type: coda.ValueType.Number },
    cycleTimeCurrentHours: { type: coda.ValueType.Number },
    cycleTimeTargetHours: { type: coda.ValueType.Number },
    cycleTimeReductionPercent: { type: coda.ValueType.Number },
    cycleTimeProgress: { type: coda.ValueType.String },
    costPerTransactionBefore: { type: coda.ValueType.Number, codaType: coda.ValueHintType.Currency },
    costPerTransactionAfter: { type: coda.ValueType.Number, codaType: coda.ValueHintType.Currency },
    annualCostSavings: { type: coda.ValueType.Number, codaType: coda.ValueHintType.Currency },
    revenueImpact: { type: coda.ValueType.Number, codaType: coda.ValueHintType.Currency },
    totalBusinessValue: { type: coda.ValueType.Number, codaType: coda.ValueHintType.Currency },
    customerSatisfactionScore: { type: coda.ValueType.Number },
    operationalRiskLevel: { type: coda.ValueType.String },
  },
  idProperty: "streamId",
  displayProperty: "valueStreamName",
  featuredProperties: ["valueStreamName", "totalBusinessValue", "cycleTimeReductionPercent", "annualCostSavings"],
});

// ===========================================================================
// TABLE 7: API_PORTFOLIO
// ===========================================================================

export const APISchema = coda.makeObjectSchema({
  properties: {
    apiId: { type: coda.ValueType.String, required: true },
    account: { type: coda.ValueType.String, required: true },
    apiName: { type: coda.ValueType.String, required: true },
    apiType: { type: coda.ValueType.String },
    apiVersion: { type: coda.ValueType.String },
    businessCapability: { type: coda.ValueType.String },
    linkedValueStreams: { type: coda.ValueType.String },
    linkedObjectives: { type: coda.ValueType.String },
    environment: { type: coda.ValueType.String },
    monthlyTransactions: { type: coda.ValueType.Number },
    annualTransactionVolume: { type: coda.ValueType.Number },
    avgResponseTimeMs: { type: coda.ValueType.Number },
    slaTargetMs: { type: coda.ValueType.Number },
    slaCompliancePercent: { type: coda.ValueType.Number },
    errorRatePercent: { type: coda.ValueType.Number },
    uptimePercent: { type: coda.ValueType.Number },
    consumingApplications: { type: coda.ValueType.Number },
    revenueAttribution: { type: coda.ValueType.Number, codaType: coda.ValueHintType.Currency },
    businessCriticality: { type: coda.ValueType.String },
    businessValueScore: { type: coda.ValueType.Number },
    healthStatus: { type: coda.ValueType.String },
    ownerTeam: { type: coda.ValueType.String },
    documentationQuality: { type: coda.ValueType.String },
    lastDeployedDate: { type: coda.ValueType.String, codaType: coda.ValueHintType.Date },
  },
  idProperty: "apiId",
  displayProperty: "apiName",
  featuredProperties: ["apiName", "healthStatus", "slaCompliancePercent", "businessCriticality"],
});

// ===========================================================================
// TABLE 8: PLATFORM_HEALTH_METRICS
// ===========================================================================

export const MetricSchema = coda.makeObjectSchema({
  properties: {
    metricId: { type: coda.ValueType.String, required: true },
    account: { type: coda.ValueType.String, required: true },
    metricCategory: { type: coda.ValueType.String },
    metricName: { type: coda.ValueType.String, required: true },
    metricType: { type: coda.ValueType.String },
    currentValue: { type: coda.ValueType.Number },
    targetValue: { type: coda.ValueType.Number },
    thresholdWarning: { type: coda.ValueType.Number },
    thresholdCritical: { type: coda.ValueType.Number },
    unit: { type: coda.ValueType.String },
    measurementFrequency: { type: coda.ValueType.String },
    healthStatus: { type: coda.ValueType.String },
    linkedCapability: { type: coda.ValueType.String },
    linkedObjective: { type: coda.ValueType.String },
    businessImpactStatement: { type: coda.ValueType.String },
    lastMeasured: { type: coda.ValueType.String, codaType: coda.ValueHintType.Date },
  },
  idProperty: "metricId",
  displayProperty: "metricName",
  featuredProperties: ["metricName", "currentValue", "targetValue", "healthStatus"],
});

// ===========================================================================
// TABLE 9: INITIATIVES
// ===========================================================================

export const InitiativeSchema = coda.makeObjectSchema({
  properties: {
    initiativeId: { type: coda.ValueType.String, required: true },
    account: { type: coda.ValueType.String, required: true },
    initiativeName: { type: coda.ValueType.String, required: true },
    initiativeType: { type: coda.ValueType.String },
    linkedObjectives: { type: coda.ValueType.String },
    linkedCapabilities: { type: coda.ValueType.String },
    businessDriver: { type: coda.ValueType.String },
    proposedBy: { type: coda.ValueType.String },
    priority: { type: coda.ValueType.String },
    phase: { type: coda.ValueType.String },
    status: { type: coda.ValueType.String },
    startDate: { type: coda.ValueType.String, codaType: coda.ValueHintType.Date },
    targetCompletionDate: { type: coda.ValueType.String, codaType: coda.ValueHintType.Date },
    actualCompletionDate: { type: coda.ValueType.String, codaType: coda.ValueHintType.Date },
    daysOverdue: { type: coda.ValueType.Number },
    investmentAmount: { type: coda.ValueType.Number, codaType: coda.ValueHintType.Currency },
    mulesoftServices: { type: coda.ValueType.Number, codaType: coda.ValueHintType.Currency },
    customerInvestment: { type: coda.ValueType.Number, codaType: coda.ValueHintType.Currency },
    expectedAnnualBenefit: { type: coda.ValueType.Number, codaType: coda.ValueHintType.Currency },
    expectedPaybackMonths: { type: coda.ValueType.Number },
    threeYearROIPercent: { type: coda.ValueType.Number },
    realizedAnnualBenefit: { type: coda.ValueType.Number, codaType: coda.ValueHintType.Currency },
    actualROIPercent: { type: coda.ValueType.Number },
    successCriteria: { type: coda.ValueType.String },
    ownerMuleSoft: { type: coda.ValueType.String },
    ownerCustomer: { type: coda.ValueType.String },
    nextMilestone: { type: coda.ValueType.String },
    blockers: { type: coda.ValueType.String },
  },
  idProperty: "initiativeId",
  displayProperty: "initiativeName",
  featuredProperties: ["initiativeName", "status", "priority", "threeYearROIPercent", "targetCompletionDate"],
});

// ===========================================================================
// TABLE 10: RISK_REGISTER
// ===========================================================================

export const RiskSchema = coda.makeObjectSchema({
  properties: {
    riskId: { type: coda.ValueType.String, required: true },
    account: { type: coda.ValueType.String, required: true },
    riskCategory: { type: coda.ValueType.String },
    riskTitle: { type: coda.ValueType.String, required: true },
    description: { type: coda.ValueType.String },
    rootCause: { type: coda.ValueType.String },
    affectedCapability: { type: coda.ValueType.String },
    affectedAPIs: { type: coda.ValueType.String },
    affectedValueStreams: { type: coda.ValueType.String },
    linkedObjectivesAtRisk: { type: coda.ValueType.String },
    impactScore: { type: coda.ValueType.Number },
    probabilityScore: { type: coda.ValueType.Number },
    riskScore: { type: coda.ValueType.Number },
    riskLevel: { type: coda.ValueType.String },
    potentialBusinessImpact: { type: coda.ValueType.Number, codaType: coda.ValueHintType.Currency },
    potentialOperationalImpact: { type: coda.ValueType.String },
    mitigationStrategy: { type: coda.ValueType.String },
    mitigationInitiative: { type: coda.ValueType.String },
    mitigationOwner: { type: coda.ValueType.String },
    targetResolutionDate: { type: coda.ValueType.String, codaType: coda.ValueHintType.Date },
    status: { type: coda.ValueType.String },
    dateIdentified: { type: coda.ValueType.String, codaType: coda.ValueHintType.Date },
    dateClosed: { type: coda.ValueType.String, codaType: coda.ValueHintType.Date },
  },
  idProperty: "riskId",
  displayProperty: "riskTitle",
  featuredProperties: ["riskTitle", "riskLevel", "riskScore", "status", "mitigationStrategy"],
});

// ===========================================================================
// TABLE 11: STAKEHOLDER_OUTCOMES
// ===========================================================================

export const OutcomeSchema = coda.makeObjectSchema({
  properties: {
    outcomeId: { type: coda.ValueType.String, required: true },
    account: { type: coda.ValueType.String, required: true },
    stakeholderType: { type: coda.ValueType.String },
    stakeholderName: { type: coda.ValueType.String, required: true },
    stakeholderRole: { type: coda.ValueType.String },
    outcomeStatement: { type: coda.ValueType.String },
    linkedObjective: { type: coda.ValueType.String },
    linkedValueStream: { type: coda.ValueType.String },
    linkedAPIServices: { type: coda.ValueType.String },
    successMetricName: { type: coda.ValueType.String },
    baselineValue: { type: coda.ValueType.Number },
    currentValue: { type: coda.ValueType.Number },
    targetValue: { type: coda.ValueType.Number },
    unit: { type: coda.ValueType.String },
    improvementPercent: { type: coda.ValueType.Number },
    targetAchievementPercent: { type: coda.ValueType.Number },
    measurementMethod: { type: coda.ValueType.String },
    lastMeasured: { type: coda.ValueType.String, codaType: coda.ValueHintType.Date },
    measurementFrequency: { type: coda.ValueType.String },
    status: { type: coda.ValueType.String },
  },
  idProperty: "outcomeId",
  displayProperty: "outcomeStatement",
  featuredProperties: ["stakeholderName", "outcomeStatement", "improvementPercent", "status"],
});

// ===========================================================================
// TABLE 12: ENGAGEMENT_LOG
// ===========================================================================

export const EngagementSchema = coda.makeObjectSchema({
  properties: {
    engagementId: { type: coda.ValueType.String, required: true },
    account: { type: coda.ValueType.String, required: true },
    engagementDate: { type: coda.ValueType.String, codaType: coda.ValueHintType.Date, required: true },
    engagementType: { type: coda.ValueType.String },
    attendeesMuleSoft: { type: coda.ValueType.String },
    attendeesCustomer: { type: coda.ValueType.String },
    customerSeniority: { type: coda.ValueType.String },
    topicsDiscussed: { type: coda.ValueType.String },
    actionItems: { type: coda.ValueType.String },
    sentiment: { type: coda.ValueType.String },
    strategicAlignmentScore: { type: coda.ValueType.Number },
    technicalHealthScore: { type: coda.ValueType.Number },
    relationshipDepthScore: { type: coda.ValueType.Number },
    nextSteps: { type: coda.ValueType.String },
    nextEngagementDate: { type: coda.ValueType.String, codaType: coda.ValueHintType.Date },
    notes: { type: coda.ValueType.String },
  },
  idProperty: "engagementId",
  displayProperty: "engagementType",
  featuredProperties: ["engagementDate", "engagementType", "sentiment", "attendeesCustomer"],
});

// ===========================================================================
// TABLE 13: SUCCESS_PLAN_TRACKER
// ===========================================================================

export const SuccessPlanSchema = coda.makeObjectSchema({
  properties: {
    successPlanId: { type: coda.ValueType.String, required: true },
    account: { type: coda.ValueType.String, required: true },
    planPeriod: { type: coda.ValueType.String },
    planStatus: { type: coda.ValueType.String },
    creationDate: { type: coda.ValueType.String, codaType: coda.ValueHintType.Date },
    lastUpdated: { type: coda.ValueType.String, codaType: coda.ValueHintType.DateTime },
    objectivesAddressed: { type: coda.ValueType.String },
    keyInitiatives: { type: coda.ValueType.String },
    criticalSuccessFactors: { type: coda.ValueType.String },
    top3Priorities: { type: coda.ValueType.String },
    top3Risks: { type: coda.ValueType.String },
    overallHealthScore: { type: coda.ValueType.Number },
    renewalRiskLevel: { type: coda.ValueType.String },
    expansionOpportunity: { type: coda.ValueType.Number, codaType: coda.ValueHintType.Currency },
    executiveSponsorCustomer: { type: coda.ValueType.String },
    executiveSponsorMuleSoft: { type: coda.ValueType.String },
    nextQBRDate: { type: coda.ValueType.String, codaType: coda.ValueHintType.Date },
  },
  idProperty: "successPlanId",
  displayProperty: "planPeriod",
  featuredProperties: ["planPeriod", "overallHealthScore", "renewalRiskLevel", "nextQBRDate"],
});

// ===========================================================================
// TABLE 14: ACTIVITIES_TASKS
// ===========================================================================

export const TaskSchema = coda.makeObjectSchema({
  properties: {
    taskId: { type: coda.ValueType.String, required: true },
    account: { type: coda.ValueType.String, required: true },
    taskTitle: { type: coda.ValueType.String, required: true },
    taskDescription: { type: coda.ValueType.String },
    taskType: { type: coda.ValueType.String },
    priority: { type: coda.ValueType.String },
    status: { type: coda.ValueType.String },
    assignedTo: { type: coda.ValueType.String },
    createdBy: { type: coda.ValueType.String },
    createdDate: { type: coda.ValueType.String, codaType: coda.ValueHintType.DateTime },
    dueDate: { type: coda.ValueType.String, codaType: coda.ValueHintType.Date },
    daysUntilDue: { type: coda.ValueType.Number },
    completedDate: { type: coda.ValueType.String, codaType: coda.ValueHintType.Date },
    linkedEngagement: { type: coda.ValueType.String },
    linkedInitiative: { type: coda.ValueType.String },
    linkedRisk: { type: coda.ValueType.String },
    notes: { type: coda.ValueType.String },
  },
  idProperty: "taskId",
  displayProperty: "taskTitle",
  featuredProperties: ["taskTitle", "status", "priority", "assignedTo", "dueDate"],
});

// ===========================================================================
// ROI SNAPSHOT (ACTION RESULT)
// ===========================================================================

export const RoiSnapshotSchema = coda.makeObjectSchema({
  properties: {
    summary: { type: coda.ValueType.String },
    expectedPaybackMonths: { type: coda.ValueType.Number },
    threeYearRoiPercent: { type: coda.ValueType.Number },
    actualRoiPercent: { type: coda.ValueType.Number },
    generatedAt: { type: coda.ValueType.String, codaType: coda.ValueHintType.DateTime },
  },
  idProperty: "generatedAt",
  displayProperty: "summary",
  featuredProperties: [
    "summary",
    "expectedPaybackMonths",
    "threeYearRoiPercent",
    "actualRoiPercent",
  ],
});
