import * as coda from "@codahq/packs-sdk";
import {
  calculateActualRoi,
  calculateEngagementCadenceStatus,
  calculateEngagementScore,
  calculateExpectedPayback,
  calculateNextEngagementDate,
  calculateThreeYearRoi,
} from "./formulas";

/**
 * HELPERS - Phase 1 & 2
 * Sync table seed data and Phase 2 helper actions
 */

// ===========================================================================
// SYNC FUNCTION 1: PEOPLE_TEAM
// ===========================================================================

export async function syncPeopleTeam(
  params: [],
  context: coda.ExecutionContext
): Promise<coda.SyncFormulaResult> {
  // Phase 1: Return sample data
  const samplePeople = [
    {
      personId: "P001",
      fullName: "Sarah Chen",
      email: "sarah.chen@mulesoft.com",
      role: "Customer Success Manager",
      department: "Customer Success",
      region: "EMEA",
      activeStatus: true,
    },
    {
      personId: "P002",
      fullName: "Marcus Johnson",
      email: "marcus.johnson@mulesoft.com",
      role: "Solutions Architect",
      department: "Technical",
      region: "EMEA",
      activeStatus: true,
    },
    {
      personId: "P003",
      fullName: "Lisa Martinez",
      email: "lisa.martinez@mulesoft.com",
      role: "Account Executive",
      department: "Sales",
      region: "EMEA",
      activeStatus: true,
    },
  ];

  return { result: samplePeople };
}

// ===========================================================================
// SYNC FUNCTION 2: ACCOUNT_MASTER
// ===========================================================================

export async function syncAccountMaster(
  params: [],
  context: coda.ExecutionContext
): Promise<coda.SyncFormulaResult> {
  const sampleAccounts = [
    {
      accountId: "ACC-001",
      accountName: "Acme Financial Services",
      industryVertical: "Financial Services",
      industrySubSector: "Investment Banking",
      contractType: "Enterprise",
      contractStartDate: "2022-01-15",
      contractEndDate: "2025-01-14",
      renewalDate: "2025-01-14",
      daysToRenewal: 432,
      arr: 850000,
      acv: 850000,
      customerSuccessManager: "Sarah Chen",
      accountExecutive: "Lisa Martinez",
      solutionsArchitect: "Marcus Johnson",
      executiveSponsorCustomer: "Emily Carter",
      executiveSponsorMuleSoft: "David Nguyen",
      healthScore: 78,
      riskLevel: "Medium",
      spRating: "Platinum",
      customerRevenue: 2500000000,
      employeeCount: 450,
      geography: "United States",
      primaryContactName: "Emily Carter",
      primaryContactEmail: "emily.carter@acme.com",
      primaryContactRole: "CTO",
      lastEngagementDate: "2024-10-28",
      nextEngagementDate: "2024-11-15",
      createdDate: "2022-01-15T10:00:00Z",
      lastModified: "2024-11-09T14:30:00Z",
    },
    {
      accountId: "ACC-002",
      accountName: "Nordic Logistics Group",
      industryVertical: "Transportation & Logistics",
      industrySubSector: "Freight Forwarding",
      contractType: "Enterprise",
      contractStartDate: "2023-06-01",
      contractEndDate: "2026-05-31",
      renewalDate: "2026-05-31",
      daysToRenewal: 568,
      arr: 650000,
      acv: 650000,
      customerSuccessManager: "Sarah Chen",
      accountExecutive: "Lisa Martinez",
      solutionsArchitect: "Marcus Johnson",
      executiveSponsorCustomer: "Anna Bergström",
      executiveSponsorMuleSoft: "David Nguyen",
      healthScore: 85,
      riskLevel: "Low",
      spRating: "Gold",
      customerRevenue: 1200000000,
      employeeCount: 850,
      geography: "Sweden",
      primaryContactName: "Anna Bergström",
      primaryContactEmail: "anna.bergstrom@nordiclog.se",
      primaryContactRole: "VP of Technology",
      lastEngagementDate: "2024-11-02",
      nextEngagementDate: "2024-11-20",
      createdDate: "2023-06-01T09:00:00Z",
      lastModified: "2024-11-09T12:15:00Z",
    },
  ];

  return { result: sampleAccounts };
}

// ===========================================================================
// SYNC FUNCTION 3: BUSINESS_CONTEXT
// ===========================================================================

export async function syncBusinessContext(
  params: [],
  context: coda.ExecutionContext
): Promise<coda.SyncFormulaResult> {
  const sampleContext = [
    {
      contextId: "CTX-001",
      account: "Acme Financial Services",
      businessModel: "Investment Banking and Capital Markets",
      marketPosition: "Top-tier regional investment bank",
      operatingEnvironment: "Highly regulated financial services sector",
      keyChallenges: "Legacy system modernization, Real-time reporting compliance, Data governance",
      strategicPriorities: "Digital transformation, API-led risk management, Client experience enhancements",
      digitalMaturity: "Evolving",
      itComplexityScore: 7,
      legacySystemCount: 12,
      cloudStrategy: "Hybrid Cloud - Azure primary",
      dataClassification: "Highly Sensitive - PII + Financial",
      lastUpdated: "2024-11-09T10:00:00Z",
    },
  ];

  return { result: sampleContext };
}

// ===========================================================================
// SYNC FUNCTION 4: STRATEGIC_OBJECTIVES
// ===========================================================================

export async function syncStrategicObjectives(
  params: [],
  context: coda.ExecutionContext
): Promise<coda.SyncFormulaResult> {
  const sampleObjectives = [
    {
      objectiveId: "OBJ-001",
      account: "Acme Financial Services",
      strategicPillar: "Digital Transformation",
      objectiveName: "Modernize Claims Processing",
      description: "Reduce claims processing time by 50% through API-enabled workflows",
      businessDriver: "Operational Efficiency",
      quantifiedGoal: "Reduce average claims cycle from 14 days to 7 days",
      targetDate: "2025-06-30",
      businessOwner: "Erik Svensson",
      businessValue: 2500000,
      mulesoftRelevance: "High - Core integration platform",
      status: "In Progress",
      progressPercent: 35,
      lastReviewDate: "2024-10-28",
      notes: "On track, Phase 1 API design complete",
      linkedCapabilities: "CAP-001, CAP-002",
      linkedValueStreams: "VS-001",
      linkedInitiatives: "INIT-001",
    },
    {
      objectiveId: "OBJ-002",
      account: "Acme Financial Services",
      strategicPillar: "Customer Experience",
      objectiveName: "Launch Customer Self-Service Portal",
      description: "Enable customers to submit claims and track status online",
      businessDriver: "Customer Satisfaction",
      quantifiedGoal: "70% of claims submitted digitally by Q3 2025",
      targetDate: "2025-09-30",
      businessOwner: "Maria Hansen",
      businessValue: 1800000,
      mulesoftRelevance: "High - Backend API layer",
      status: "Planning",
      progressPercent: 15,
      lastReviewDate: "2024-11-05",
      notes: "Requirements gathering in progress",
      linkedCapabilities: "CAP-003",
      linkedValueStreams: "VS-002",
      linkedInitiatives: "INIT-002",
    },
  ];

  return { result: sampleObjectives };
}

// ===========================================================================
// SYNC FUNCTION 5: MULESOFT_CAPABILITIES
// ===========================================================================

export async function syncMuleSoftCapabilities(
  params: [],
  context: coda.ExecutionContext
): Promise<coda.SyncFormulaResult> {
  const sampleCapabilities = [
    {
      capabilityId: "CAP-001",
      account: "Acme Financial Services",
      capabilityDomain: "Integration",
      capabilityName: "Claims Data Integration",
      description: "Real-time integration between claims system and core policy system",
      currentMaturity: "Initial",
      targetMaturity: "Optimized",
      currentMaturityNumeric: 1,
      targetMaturityNumeric: 4,
      maturityGap: 3,
      gapStatus: "High Priority",
      linkedObjectives: "OBJ-001",
      supportingValueStreams: "VS-001",
      investmentRequired: 450000,
      priority: "P0",
      implementationStatus: "In Progress",
      businessImpact: "High - Critical for digital transformation",
      technicalOwner: "Marcus Johnson",
      lastAssessmentDate: "2024-10-15",
    },
    {
      capabilityId: "CAP-002",
      account: "Acme Financial Services",
      capabilityDomain: "API Management",
      capabilityName: "External Partner API Gateway",
      description: "Secure API gateway for partner integrations (surveyors, repairers)",
      currentMaturity: "Developing",
      targetMaturity: "Managed",
      currentMaturityNumeric: 2,
      targetMaturityNumeric: 3,
      maturityGap: 1,
      gapStatus: "Medium Priority",
      linkedObjectives: "OBJ-001",
      supportingValueStreams: "VS-001",
      investmentRequired: 250000,
      priority: "P1",
      implementationStatus: "Planning",
      businessImpact: "Medium - Enables partner ecosystem",
      technicalOwner: "Marcus Johnson",
      lastAssessmentDate: "2024-10-20",
    },
  ];

  return { result: sampleCapabilities };
}

// ===========================================================================
// SYNC FUNCTION 6: VALUE_STREAMS
// ===========================================================================

export async function syncValueStreams(
  params: [],
  context: coda.ExecutionContext
): Promise<coda.SyncFormulaResult> {
  const sampleStreams = [
    {
      streamId: "VS-001",
      account: "Acme Financial Services",
      valueStreamName: "Claims Processing Workflow",
      businessProcess: "End-to-end claims lifecycle management",
      processOwner: "Claims Operations Director",
      linkedObjectives: "OBJ-001",
      enabledCapabilities: "CAP-001, CAP-002",
      integrationEndpoints: 8,
      apisConsumed: 12,
      annualTransactionVolume: 45000,
      cycleTimeBaselineHours: 336,
      cycleTimeCurrentHours: 264,
      cycleTimeTargetHours: 168,
      cycleTimeReductionPercent: 21.4,
      cycleTimeProgress: "On Track",
      costPerTransactionBefore: 185.50,
      costPerTransactionAfter: 142.30,
      annualCostSavings: 1944000,
      revenueImpact: 0,
      totalBusinessValue: 1944000,
      customerSatisfactionScore: 7.2,
      operationalRiskLevel: "Medium",
    },
  ];

  return { result: sampleStreams };
}

// ===========================================================================
// SYNC FUNCTION 7: API_PORTFOLIO
// ===========================================================================

export async function syncAPIPortfolio(
  params: [],
  context: coda.ExecutionContext
): Promise<coda.SyncFormulaResult> {
  const sampleAPIs = [
    {
      apiId: "API-001",
      account: "Acme Financial Services",
      apiName: "Claims Submission API",
      apiType: "Experience API",
      apiVersion: "v2.1",
      businessCapability: "Claims Management",
      linkedValueStreams: "VS-001",
      linkedObjectives: "OBJ-001",
      environment: "Production",
      monthlyTransactions: 3800,
      annualTransactionVolume: 45600,
      avgResponseTimeMs: 245,
      slaTargetMs: 500,
      slaCompliancePercent: 98.5,
      errorRatePercent: 0.8,
      uptimePercent: 99.7,
      consumingApplications: 3,
      revenueAttribution: 0,
      businessCriticality: "High",
      businessValueScore: 9,
      healthStatus: "Healthy",
      ownerTeam: "Claims IT Team",
      documentationQuality: "Good",
      lastDeployedDate: "2024-10-15",
    },
    {
      apiId: "API-002",
      account: "Acme Financial Services",
      apiName: "Policy Lookup API",
      apiType: "Process API",
      apiVersion: "v1.3",
      businessCapability: "Policy Management",
      linkedValueStreams: "VS-001",
      linkedObjectives: "OBJ-001",
      environment: "Production",
      monthlyTransactions: 12500,
      annualTransactionVolume: 150000,
      avgResponseTimeMs: 180,
      slaTargetMs: 300,
      slaCompliancePercent: 99.2,
      errorRatePercent: 0.3,
      uptimePercent: 99.9,
      consumingApplications: 5,
      revenueAttribution: 0,
      businessCriticality: "Critical",
      businessValueScore: 10,
      healthStatus: "Healthy",
      ownerTeam: "Policy Systems Team",
      documentationQuality: "Excellent",
      lastDeployedDate: "2024-09-22",
    },
  ];

  return { result: sampleAPIs };
}

// ===========================================================================
// SYNC FUNCTION 8: PLATFORM_HEALTH_METRICS
// ===========================================================================

export async function syncPlatformHealthMetrics(
  params: [],
  context: coda.ExecutionContext
): Promise<coda.SyncFormulaResult> {
  const sampleMetrics = [
    {
      metricId: "MET-001",
      account: "Acme Financial Services",
      metricCategory: "Performance",
      metricName: "API Average Response Time",
      metricType: "Latency",
      currentValue: 215,
      targetValue: 200,
      thresholdWarning: 250,
      thresholdCritical: 350,
      unit: "milliseconds",
      measurementFrequency: "Real-time",
      healthStatus: "Good",
      linkedCapability: "CAP-001",
      linkedObjective: "OBJ-001",
      businessImpactStatement: "Impacts customer experience and operational efficiency",
      lastMeasured: "2024-11-09",
    },
    {
      metricId: "MET-002",
      account: "Acme Financial Services",
      metricCategory: "Reliability",
      metricName: "Platform Uptime",
      metricType: "Availability",
      currentValue: 99.7,
      targetValue: 99.9,
      thresholdWarning: 99.5,
      thresholdCritical: 99.0,
      unit: "percent",
      measurementFrequency: "Daily",
      healthStatus: "Acceptable",
      linkedCapability: "CAP-001",
      linkedObjective: "OBJ-001",
      businessImpactStatement: "Critical for 24/7 claims operations",
      lastMeasured: "2024-11-08",
    },
  ];

  return { result: sampleMetrics };
}

// ===========================================================================
// SYNC FUNCTION 9: INITIATIVES
// ===========================================================================

export async function syncInitiatives(
  params: [],
  context: coda.ExecutionContext
): Promise<coda.SyncFormulaResult> {
  const sampleInitiatives = [
    {
      initiativeId: "INIT-001",
      account: "Acme Financial Services",
      initiativeName: "Claims API Modernization - Phase 1",
      initiativeType: "Technical Modernization",
      linkedObjectives: "OBJ-001",
      linkedCapabilities: "CAP-001",
      businessDriver: "Operational Efficiency",
      proposedBy: "Erik Svensson",
      priority: "P0",
      phase: "Execution",
      status: "In Progress",
      startDate: "2024-08-01",
      targetCompletionDate: "2025-02-28",
      actualCompletionDate: "",
      daysOverdue: 0,
      investmentAmount: 450000,
      mulesoftServices: 280000,
      customerInvestment: 170000,
      expectedAnnualBenefit: 1950000,
      expectedPaybackMonths: 2.8,
      threeYearROIPercent: 1200,
      realizedAnnualBenefit: 0,
      actualROIPercent: 0,
      successCriteria: "50% reduction in claims processing time, 99.9% API uptime",
      ownerMuleSoft: "Marcus Johnson",
      ownerCustomer: "Lars Pedersen",
      nextMilestone: "UAT Completion - Nov 30",
      blockers: "None",
    },
  ];

  return { result: sampleInitiatives };
}

// ===========================================================================
// SYNC FUNCTION 10: RISK_REGISTER
// ===========================================================================

export async function syncRiskRegister(
  params: [],
  context: coda.ExecutionContext
): Promise<coda.SyncFormulaResult> {
  const sampleRisks = [
    {
      riskId: "RISK-001",
      account: "Acme Financial Services",
      riskCategory: "Technical",
      riskTitle: "Legacy System Integration Complexity",
      description: "Mainframe system lacks modern API capabilities, requiring custom connectors",
      rootCause: "Technical debt from 20-year-old policy administration system",
      affectedCapability: "CAP-001",
      affectedAPIs: "API-002",
      affectedValueStreams: "VS-001",
      linkedObjectivesAtRisk: "OBJ-001",
      impactScore: 4,
      probabilityScore: 3,
      riskScore: 12,
      riskLevel: "High",
      potentialBusinessImpact: 500000,
      potentialOperationalImpact: "2-3 month project delay",
      mitigationStrategy: "Deploy MuleSoft SAP connector, allocate dedicated mainframe SME",
      mitigationInitiative: "INIT-001",
      mitigationOwner: "Marcus Johnson",
      targetResolutionDate: "2024-12-15",
      status: "Active - Mitigation In Progress",
      dateIdentified: "2024-09-15",
      dateClosed: "",
    },
  ];

  return { result: sampleRisks };
}

// ===========================================================================
// SYNC FUNCTION 11: STAKEHOLDER_OUTCOMES
// ===========================================================================

export async function syncStakeholderOutcomes(
  params: [],
  context: coda.ExecutionContext
): Promise<coda.SyncFormulaResult> {
  const sampleOutcomes = [
    {
      outcomeId: "OUT-001",
      account: "Acme Financial Services",
      stakeholderType: "Business Executive",
      stakeholderName: "Erik Svensson",
      stakeholderRole: "CTO",
      outcomeStatement: "Reduce IT operational costs by 30% through automation",
      linkedObjective: "OBJ-001",
      linkedValueStream: "VS-001",
      linkedAPIServices: "API-001, API-002",
      successMetricName: "IT Operations Cost per Transaction",
      baselineValue: 185.50,
      currentValue: 142.30,
      targetValue: 129.85,
      unit: "USD",
      improvementPercent: 23.3,
      targetAchievementPercent: 77.5,
      measurementMethod: "Monthly cost center analysis",
      lastMeasured: "2024-10-31",
      measurementFrequency: "Monthly",
      status: "On Track",
    },
  ];

  return { result: sampleOutcomes };
}

// ===========================================================================
// SYNC FUNCTION 12: ENGAGEMENT_LOG
// ===========================================================================

export async function syncEngagementLog(
  params: [],
  context: coda.ExecutionContext
): Promise<coda.SyncFormulaResult> {
  const sampleEngagements = [
    {
      engagementId: "ENG-001",
      account: "Acme Financial Services",
      engagementDate: "2024-10-28",
      engagementType: "QBR - Quarterly Business Review",
      attendeesMuleSoft: "Sarah Chen (CSM), Marcus Johnson (SA)",
      attendeesCustomer: "Erik Svensson (CTO), Lars Pedersen (Integration Lead), Maria Hansen (Head of Claims)",
      customerSeniority: "C-Level + VP",
      topicsDiscussed: "Q3 progress review, Phase 2 roadmap, API performance metrics, ROI tracking",
      actionItems: "1) Schedule architecture review for Phase 2, 2) Provide API analytics dashboard access, 3) Plan training for Claims team",
      sentiment: "Positive",
      strategicAlignmentScore: 9,
      technicalHealthScore: 8,
      relationshipDepthScore: 9,
      nextSteps: "Follow up on training schedule, review Phase 2 proposal by Nov 15",
      nextEngagementDate: "2024-11-15",
      notes: "Customer very pleased with Phase 1 progress. Interested in expanding to vessel tracking APIs in 2025.",
    },
    {
      engagementId: "ENG-002",
      account: "Acme Financial Services",
      engagementDate: "2024-11-05",
      engagementType: "Technical Workshop",
      attendeesMuleSoft: "Marcus Johnson (SA)",
      attendeesCustomer: "Lars Pedersen (Integration Lead), Development Team (4 people)",
      customerSeniority: "Technical Team",
      topicsDiscussed: "API error handling patterns, retry logic, circuit breaker implementation",
      actionItems: "1) Share best practices documentation, 2) Review error handling code",
      sentiment: "Neutral",
      strategicAlignmentScore: 7,
      technicalHealthScore: 7,
      relationshipDepthScore: 8,
      nextSteps: "Code review session scheduled for Nov 12",
      nextEngagementDate: "2024-11-12",
      notes: "Good technical depth. Team needs more guidance on production readiness.",
    },
  ];

  return { result: sampleEngagements };
}

// ===========================================================================
// SYNC FUNCTION 13: SUCCESS_PLAN_TRACKER
// ===========================================================================

export async function syncSuccessPlanTracker(
  params: [],
  context: coda.ExecutionContext
): Promise<coda.SyncFormulaResult> {
  const samplePlans = [
    {
      successPlanId: "SP-Q4-2024",
      account: "Acme Financial Services",
      planPeriod: "Q4 2024",
      planStatus: "Active",
      creationDate: "2024-10-01",
      lastUpdated: "2024-11-09T14:00:00Z",
      objectivesAddressed: "OBJ-001, OBJ-002",
      keyInitiatives: "INIT-001 - Claims API Phase 1",
      criticalSuccessFactors: "1) Complete Phase 1 UAT by Nov 30, 2) Achieve 99.5% API uptime, 3) Train 20 business users",
      top3Priorities: "1) Phase 1 delivery, 2) API performance optimization, 3) Phase 2 planning",
      top3Risks: "1) RISK-001 - Legacy system complexity, 2) Resource availability, 3) Year-end freeze window",
      overallHealthScore: 78,
      renewalRiskLevel: "Low",
      expansionOpportunity: 450000,
      executiveSponsorCustomer: "Erik Svensson",
      executiveSponsorMuleSoft: "Sarah Chen",
      nextQBRDate: "2025-01-28",
    },
  ];

  return { result: samplePlans };
}

// ===========================================================================
// SYNC FUNCTION 14: ACTIVITIES_TASKS
// ===========================================================================

export async function syncActivitiesTasks(
  params: [],
  context: coda.ExecutionContext
): Promise<coda.SyncFormulaResult> {
  const sampleTasks = [
    {
      taskId: "TASK-001",
      account: "Acme Financial Services",
      taskTitle: "Schedule Phase 2 Architecture Review",
      taskDescription: "Coordinate calendar availability for technical deep-dive on Phase 2 requirements",
      taskType: "Meeting Coordination",
      priority: "High",
      status: "In Progress",
      assignedTo: "Sarah Chen",
      createdBy: "Sarah Chen",
      createdDate: "2024-10-28T15:30:00Z",
      dueDate: "2024-11-15",
      daysUntilDue: 6,
      completedDate: "",
      linkedEngagement: "ENG-001",
      linkedInitiative: "INIT-001",
      linkedRisk: "",
      notes: "Need to coordinate with Erik and Marcus. Aim for late November.",
    },
    {
      taskId: "TASK-002",
      account: "Acme Financial Services",
      taskTitle: "Provide API Analytics Dashboard Access",
      taskDescription: "Set up Anypoint Monitoring dashboard access for Acme technical team",
      taskType: "System Access",
      priority: "Medium",
      status: "Pending",
      assignedTo: "Marcus Johnson",
      createdBy: "Sarah Chen",
      createdDate: "2024-10-28T15:35:00Z",
      dueDate: "2024-11-12",
      daysUntilDue: 3,
      completedDate: "",
      linkedEngagement: "ENG-001",
      linkedInitiative: "INIT-001",
      linkedRisk: "",
      notes: "Lars requested read-only dashboard access for his team",
    },
    {
      taskId: "TASK-003",
      account: "Acme Financial Services",
      taskTitle: "Review Error Handling Code",
      taskDescription: "Code review session with Acme dev team on retry patterns and circuit breaker implementation",
      taskType: "Technical Review",
      priority: "High",
      status: "Scheduled",
      assignedTo: "Marcus Johnson",
      createdBy: "Marcus Johnson",
      createdDate: "2024-11-05T16:00:00Z",
      dueDate: "2024-11-12",
      daysUntilDue: 3,
      completedDate: "",
      linkedEngagement: "ENG-002",
      linkedInitiative: "INIT-001",
      linkedRisk: "RISK-001",
      notes: "Meeting scheduled for Nov 12 at 14:00 CET",
    },
  ];

  return { result: sampleTasks };
}

// ===========================================================================
// ACTION HELPERS - PHASE 2
// ===========================================================================

const MS_PER_DAY = 1000 * 60 * 60 * 24;

function parseDateInput(value?: string | Date): Date | undefined {
  if (!value) {
    return undefined;
  }
  if (value instanceof Date) {
    return value;
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return undefined;
  }
  return parsed;
}

function formatDate(date?: Date): string | undefined {
  if (!date) {
    return undefined;
  }
  return date.toISOString().split("T")[0];
}

function generateIdentifier(prefix: string): string {
  const random = Math.floor(Math.random() * 10_000)
    .toString()
    .padStart(4, "0");
  return `${prefix}-${Date.now().toString(36)}-${random}`;
}

function calculateDaysUntilDue(dueDate?: Date, reference: Date = new Date()): number {
  if (!dueDate) {
    return 0;
  }
  return Math.round((dueDate.getTime() - reference.getTime()) / MS_PER_DAY);
}

export async function logEngagementAction(
  account: string,
  engagementDate: string | Date,
  engagementType?: string,
  sentiment?: string,
  customerSeniority?: string,
  cadenceDays?: number,
  attendeesMuleSoft?: string,
  attendeesCustomer?: string,
  topicsDiscussed?: string,
  actionItems?: string,
  nextSteps?: string,
  strategicAlignmentScore?: number,
  technicalHealthScore?: number,
  relationshipDepthScore?: number,
  notes?: string,
): Promise<Record<string, unknown>> {
  const engagementDateObj = parseDateInput(engagementDate) ?? new Date();
  const nextEngagementObj = calculateNextEngagementDate(engagementDateObj, cadenceDays ?? 30);
  const cadenceStatus = calculateEngagementCadenceStatus(
    engagementDateObj,
    cadenceDays ?? 30,
    new Date(),
  );
  const engagementScore = calculateEngagementScore(
    strategicAlignmentScore,
    technicalHealthScore,
    relationshipDepthScore,
  );

  const noteFragments: string[] = [];
  if (notes) {
    noteFragments.push(notes);
  }
  if (engagementScore > 0) {
    noteFragments.push(`Engagement Score: ${engagementScore.toFixed(1)}`);
  }
  noteFragments.push(`Cadence Status: ${cadenceStatus}`);

  return {
    engagementId: generateIdentifier("ENG"),
    account,
    engagementDate: formatDate(engagementDateObj),
    engagementType,
    attendeesMuleSoft,
    attendeesCustomer,
    customerSeniority,
    topicsDiscussed,
    actionItems,
    sentiment,
    strategicAlignmentScore,
    technicalHealthScore,
    relationshipDepthScore,
    nextSteps,
    nextEngagementDate: formatDate(nextEngagementObj),
    notes: noteFragments.filter(Boolean).join(" | "),
  };
}

export async function createTaskAction(
  account: string,
  taskTitle: string,
  dueDate?: string | Date,
  assignedTo?: string,
  priority?: string,
  taskType?: string,
  status?: string,
  linkedEngagement?: string,
  linkedInitiative?: string,
  linkedRisk?: string,
  notes?: string,
  createdBy?: string,
): Promise<Record<string, unknown>> {
  const createdDate = new Date();
  const dueDateObj = parseDateInput(dueDate);
  return {
    taskId: generateIdentifier("TASK"),
    account,
    taskTitle,
    taskDescription: notes,
    taskType,
    priority: priority ?? "Medium",
    status: status ?? "Open",
    assignedTo,
    createdBy,
    createdDate: createdDate.toISOString(),
    dueDate: formatDate(dueDateObj),
    daysUntilDue: calculateDaysUntilDue(dueDateObj, createdDate),
    completedDate: undefined,
    linkedEngagement,
    linkedInitiative,
    linkedRisk,
    notes,
  };
}

export async function generateQbrBriefAction(
  accountName: string,
  planPeriod?: string,
  highlights: string[] = [],
  keyMetrics: string[] = [],
  openRisks: string[] = [],
  nextSteps?: string,
  preparedBy?: string,
): Promise<string> {
  const timestamp = new Date();
  const formatList = (items: string[]): string =>
    items.length > 0 ? items.map((item) => `- ${item}`).join("\n") : "- None";

  return [
    `# QBR Brief: ${accountName}${planPeriod ? ` (${planPeriod})` : ""}`,
    `Generated: ${timestamp.toISOString()}${preparedBy ? ` by ${preparedBy}` : ""}`,
    "",
    "## Highlights",
    formatList(highlights),
    "",
    "## Key Metrics",
    formatList(keyMetrics),
    "",
    "## Open Risks",
    formatList(openRisks),
    "",
    "## Next Steps",
    nextSteps ? `- ${nextSteps}` : "- Confirm next check-in and update success plan",
  ].join("\n");
}

export async function generateRoiSnapshotAction(
  investmentUSD: number,
  expectedAnnualBenefitUSD: number,
  realizedAnnualBenefitUSD?: number,
): Promise<Record<string, unknown>> {
  const expectedPaybackMonths = calculateExpectedPayback(investmentUSD, expectedAnnualBenefitUSD);
  const threeYearRoiPercent = calculateThreeYearRoi(investmentUSD, expectedAnnualBenefitUSD);
  const actualRoiPercent = realizedAnnualBenefitUSD
    ? calculateActualRoi(investmentUSD, realizedAnnualBenefitUSD)
    : 0;

  const summary = `Payback: ${expectedPaybackMonths.toFixed(1)} months | 3-Yr ROI: ${threeYearRoiPercent.toFixed(
    1,
  )}% | Actual ROI: ${actualRoiPercent.toFixed(1)}%`;

  return {
    summary,
    expectedPaybackMonths,
    threeYearRoiPercent,
    actualRoiPercent,
    generatedAt: new Date().toISOString(),
  };
}
