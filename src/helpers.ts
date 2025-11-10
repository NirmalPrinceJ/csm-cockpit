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
      {
        personId: "P004",
        fullName: "David Nguyen",
        email: "david.nguyen@mulesoft.com",
        role: "Regional Vice President",
        department: "Customer Success",
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
      customerAnnualRevenue: 2500000000,
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
        customerAnnualRevenue: 1200000000,
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
      {
        accountId: "ACC-00001",
        accountName: "Gard AS",
        industryVertical: "Maritime",
        industrySubSector: "P&I Insurance",
        contractType: "Signature Success",
        contractStartDate: "2022-01-15",
        contractEndDate: "2025-01-14",
        renewalDate: "2025-01-14",
        daysToRenewal: 65,
        arr: 850000,
        acv: 850000,
        customerSuccessManager: "Sarah Chen",
        accountExecutive: "Lisa Martinez",
        solutionsArchitect: "Marcus Johnson",
        executiveSponsorCustomer: "Ingrid Johansen",
        executiveSponsorMuleSoft: "David Nguyen",
        healthScore: 78,
        riskLevel: "Healthy",
        spRating: "Signature",
        customerAnnualRevenue: 3200000000,
        employeeCount: 1550,
        geography: "EMEA",
        primaryContactName: "Lars Hansen",
        primaryContactEmail: "lars.hansen@gard.no",
        primaryContactRole: "Head of IT",
        lastEngagementDate: "2024-10-30",
        nextEngagementDate: "2024-11-21",
        createdDate: "2021-11-15T09:45:00Z",
        lastModified: "2024-11-08T18:20:00Z",
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
        keyBusinessChallenges: "Legacy system modernization, Real-time reporting compliance, Data governance",
        strategicPrioritiesCurrentYear: "Digital transformation, API-led risk management, Client experience enhancements",
        digitalMaturity: "Evolving",
        itComplexityScore: 7,
        legacySystemCount: 12,
        cloudStrategy: "Hybrid Cloud - Azure primary",
        dataClassification: "Highly Sensitive - PII + Financial",
        lastUpdated: "2024-11-09T10:00:00Z",
      },
      {
        contextId: "CTX-00001",
        account: "Gard AS",
        businessModel: "Mutual marine insurance and risk management",
        marketPosition: "Global leader in marine insurance for shipowners",
        operatingEnvironment:
          "Geopolitical volatility in maritime corridors and increasing sustainability mandates from regulators",
        keyBusinessChallenges:
          "Maintain 24/7 war risk quoting, expand alternative fuel coverage, modernize aging on-prem systems",
        strategicPrioritiesCurrentYear:
          "War risk portal reliability, sustainability coverage expansion, digital client experience uplift",
        digitalMaturity: "Transforming",
        itComplexityScore: 6,
        legacySystemCount: 9,
        cloudStrategy: "Hybrid Cloud - Azure + Private Data Centers",
        dataClassification: "Highly Sensitive - Policy & Maritime Operations",
        lastUpdated: "2024-11-08T09:30:00Z",
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
      businessDriver: "Operational efficiency",
      quantifiedGoal: "Reduce average claims cycle from 14 days to 7 days",
      targetDate: "2025-06-30",
      businessOwner: "Emily Carter",
      businessValueUsd: 2500000,
      muleSoftRelevance: "High - Core integration platform",
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
      businessDriver: "Customer satisfaction",
      quantifiedGoal: "70% of claims submitted digitally by Q3 2025",
      targetDate: "2025-09-30",
      businessOwner: "Olivia Grant",
      businessValueUsd: 1800000,
      muleSoftRelevance: "High - Backend API layer",
      status: "Planning",
      progressPercent: 15,
      lastReviewDate: "2024-11-05",
      notes: "Requirements gathering in progress",
      linkedCapabilities: "CAP-003",
      linkedValueStreams: "VS-002",
      linkedInitiatives: "INIT-002",
    },
      {
        objectiveId: "OBJ-00001",
        account: "Gard AS",
        strategicPillar: "Risk Mitigation",
        objectiveName: "Manage Geopolitical Volatility",
        description: "Enable 24/7 war risk quoting via self-service portal",
        businessDriver: "Operational resilience",
        quantifiedGoal: "100% uptime on war risk portal, 5 minute quote turnaround",
        targetDate: "2025-03-31",
        businessOwner: "Lars Hansen",
        businessValueUsd: 5000000,
        muleSoftRelevance: "Critical Enabler",
        status: "In Progress",
        progressPercent: 75,
        lastReviewDate: "2024-10-25",
        notes: "Portal reliability trending upward after CloudHub optimizations.",
        linkedCapabilities: "CAP-00001, CAP-00003, CAP-00004",
        linkedValueStreams: "VS-00001",
        linkedInitiatives: "INI-00001",
      },
      {
        objectiveId: "OBJ-00002",
        account: "Gard AS",
        strategicPillar: "Sustainability/ESG",
        objectiveName: "Lead Green Transition",
        description: "Capture emerging alternative fuel coverage opportunities with data-rich APIs",
        businessDriver: "Market expansion",
        quantifiedGoal: "Capture 50% of alternative fuel coverage market",
        targetDate: "2025-09-30",
        businessOwner: "Ingrid Johansen",
        businessValueUsd: 4200000,
        muleSoftRelevance: "Critical Enabler",
        status: "On Track",
        progressPercent: 88,
        lastReviewDate: "2024-11-04",
        notes: "Awaiting launch of sustainability scorecard dashboard.",
        linkedCapabilities: "CAP-00001, CAP-00002",
        linkedValueStreams: "VS-00001",
        linkedInitiatives: "INI-00002",
      },
      {
        objectiveId: "OBJ-00003",
        account: "Gard AS",
        strategicPillar: "Customer Experience",
        objectiveName: "Digital Client Experience",
        description: "Deliver frictionless member self-service for policy management and quoting",
        businessDriver: "Customer satisfaction",
        quantifiedGoal: "Launch member self-service portal (Oct 2023)",
        targetDate: "2023-10-31",
        businessOwner: "Katarina Olsen",
        businessValueUsd: 3000000,
        muleSoftRelevance: "Critical Enabler",
        status: "Achieved",
        progressPercent: 100,
        lastReviewDate: "2024-09-30",
        notes: "Success metrics in steady-state monitoring.",
        linkedCapabilities: "CAP-00001",
        linkedValueStreams: "VS-00001",
        linkedInitiatives: "INI-00001",
      },
      {
        objectiveId: "OBJ-00004",
        account: "Gard AS",
        strategicPillar: "Operational Resilience",
        objectiveName: "Operational Resilience",
        description: "Maintain resilient platform operations across mission-critical services",
        businessDriver: "Risk mitigation",
        quantifiedGoal: "99.95% uptime on mission-critical services",
        targetDate: "2024-12-31",
        businessOwner: "Lars Hansen",
        businessValueUsd: 2750000,
        muleSoftRelevance: "Critical Enabler",
        status: "At Risk",
        progressPercent: 60,
        lastReviewDate: "2024-10-18",
        notes: "Dependent on CloudHub migration timeline.",
        linkedCapabilities: "CAP-00004",
        linkedValueStreams: "VS-00001, VS-00002",
        linkedInitiatives: "INI-00001",
      },
      {
        objectiveId: "OBJ-00005",
        account: "Gard AS",
        strategicPillar: "Cost Optimization",
        objectiveName: "Cost Optimization",
        description: "Drive efficiencies in underwriting and claims operations",
        businessDriver: "Cost optimization",
        quantifiedGoal: "20% reduction in manual processing costs",
        targetDate: "2025-06-30",
        businessOwner: "Ingrid Johansen",
        businessValueUsd: 2100000,
        muleSoftRelevance: "Supporting",
        status: "In Progress",
        progressPercent: 55,
        lastReviewDate: "2024-11-06",
        notes: "Automation backlog prioritized for Q1 2025 delivery.",
        linkedCapabilities: "CAP-00002, CAP-00003",
        linkedValueStreams: "VS-00002",
        linkedInitiatives: "INI-00003",
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
      investmentRequiredUsd: 450000,
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
      investmentRequiredUsd: 250000,
      priority: "P1",
      implementationStatus: "Planning",
      businessImpact: "Medium - Enables partner ecosystem",
      technicalOwner: "Marcus Johnson",
      lastAssessmentDate: "2024-10-20",
    },
      {
        capabilityId: "CAP-00001",
        account: "Gard AS",
        capabilityDomain: "Integration",
        capabilityName: "API-Led Connectivity",
        description: "Reusable API-led connectivity patterns covering war risk quoting and policy servicing",
        currentMaturity: "3-Defined",
        targetMaturity: "4-Managed",
        currentMaturityNumeric: 3,
        targetMaturityNumeric: 4,
        maturityGap: 1,
        gapStatus: "🟢 Small Gap",
        linkedObjectives: "OBJ-00001, OBJ-00003",
        supportingValueStreams: "VS-00001",
        investmentRequiredUsd: 180000,
        priority: "P1-High",
        implementationStatus: "In Progress",
        businessImpact: "Supports 24/7 quoting reliability and digital client experience",
        technicalOwner: "Lars Pedersen",
        lastAssessmentDate: "2024-10-20",
      },
      {
        capabilityId: "CAP-00002",
        account: "Gard AS",
        capabilityDomain: "DevOps",
        capabilityName: "CI/CD Automation",
        description: "Automated CloudHub pipelines with quality gates and automated testing",
        currentMaturity: "2-Developing",
        targetMaturity: "4-Managed",
        currentMaturityNumeric: 2,
        targetMaturityNumeric: 4,
        maturityGap: 2,
        gapStatus: "🟡 Moderate Gap",
        linkedObjectives: "OBJ-00002, OBJ-00005",
        supportingValueStreams: "VS-00002",
        investmentRequiredUsd: 240000,
        priority: "P1-High",
        implementationStatus: "In Progress",
        businessImpact: "Reduces manual release effort and accelerates sustainability launches",
        technicalOwner: "Anika Berg",
        lastAssessmentDate: "2024-10-12",
      },
      {
        capabilityId: "CAP-00003",
        account: "Gard AS",
        capabilityDomain: "Analytics",
        capabilityName: "Functional Monitoring",
        description: "Functional monitoring and alerting for mission-critical quoting journeys",
        currentMaturity: "2-Developing",
        targetMaturity: "5-Optimizing",
        currentMaturityNumeric: 2,
        targetMaturityNumeric: 5,
        maturityGap: 3,
        gapStatus: "🔴 Critical Gap",
        linkedObjectives: "OBJ-00001, OBJ-00004",
        supportingValueStreams: "VS-00001, VS-00002",
        investmentRequiredUsd: 310000,
        priority: "P0-Critical",
        implementationStatus: "Planning",
        businessImpact: "Unlocks proactive incident response during geopolitical events",
        technicalOwner: "Marcus Johnson",
        lastAssessmentDate: "2024-10-05",
      },
      {
        capabilityId: "CAP-00004",
        account: "Gard AS",
        capabilityDomain: "Integration",
        capabilityName: "CloudHub Modernization",
        description: "Lift-and-shift of legacy integrations to CloudHub 2.0 with resiliency patterns",
        currentMaturity: "1-Initial",
        targetMaturity: "5-Optimizing",
        currentMaturityNumeric: 1,
        targetMaturityNumeric: 5,
        maturityGap: 4,
        gapStatus: "🔴 Critical Gap",
        linkedObjectives: "OBJ-00001, OBJ-00004",
        supportingValueStreams: "VS-00001",
        investmentRequiredUsd: 520000,
        priority: "P0-Critical",
        implementationStatus: "Planning",
        businessImpact: "Critical path for maintaining 99.95% uptime and supporting growth",
        technicalOwner: "Ingrid Johansen",
        lastAssessmentDate: "2024-10-01",
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
      costPerTransactionBeforeUsd: 185.5,
      costPerTransactionAfterUsd: 142.3,
      annualCostSavingsUsd: 1944000,
      revenueImpactUsd: 0,
      totalBusinessValueUsd: 1944000,
      customerSatisfactionScore: 7.2,
      operationalRiskLevel: "Medium",
    },
      {
        streamId: "VS-00001",
        account: "Gard AS",
        valueStreamName: "War Risk Quoting",
        businessProcess: "Quote-to-Policy",
        processOwner: "War Risk Operations Lead",
        linkedObjectives: "OBJ-00001, OBJ-00003",
        enabledCapabilities: "CAP-00001, CAP-00003, CAP-00004",
        integrationEndpoints: 14,
        apisConsumed: 9,
        annualTransactionVolume: 180000,
        cycleTimeBaselineHours: 0.75,
        cycleTimeCurrentHours: 0.067,
        cycleTimeTargetHours: 0.083,
        cycleTimeReductionPercent: 91,
        cycleTimeProgress: "🟢 Target Met",
        costPerTransactionBeforeUsd: 15,
        costPerTransactionAfterUsd: 3,
        annualCostSavingsUsd: 2160000,
        revenueImpactUsd: 5000000,
        totalBusinessValueUsd: 7160000,
        customerSatisfactionScore: 9.2,
        operationalRiskLevel: "Low",
      },
      {
        streamId: "VS-00002",
        account: "Gard AS",
        valueStreamName: "Claims Processing",
        businessProcess: "Claims settlement lifecycle",
        processOwner: "Head of Claims Operations",
        linkedObjectives: "OBJ-00005",
        enabledCapabilities: "CAP-00002, CAP-00003",
        integrationEndpoints: 11,
        apisConsumed: 14,
        annualTransactionVolume: 24000,
        cycleTimeBaselineHours: 336,
        cycleTimeCurrentHours: 240,
        cycleTimeTargetHours: 168,
        cycleTimeReductionPercent: 29,
        cycleTimeProgress: "🔴 Needs Improvement",
        costPerTransactionBeforeUsd: 280,
        costPerTransactionAfterUsd: 210,
        annualCostSavingsUsd: 1680000,
        revenueImpactUsd: 0,
        totalBusinessValueUsd: 1680000,
        customerSatisfactionScore: 6.5,
        operationalRiskLevel: "High",
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
      revenueAttributionUsd: 0,
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
      revenueAttributionUsd: 0,
      businessCriticality: "Critical",
      businessValueScore: 10,
      healthStatus: "Healthy",
      ownerTeam: "Policy Systems Team",
      documentationQuality: "Excellent",
      lastDeployedDate: "2024-09-22",
    },
      {
        apiId: "API-00001",
        account: "Gard AS",
        apiName: "War Risk Quote API",
        apiType: "Experience",
        apiVersion: "v1.8",
        businessCapability: "War Risk Quoting",
        linkedValueStreams: "VS-00001",
        linkedObjectives: "OBJ-00001",
        environment: "Production",
        monthlyTransactions: 15000,
        annualTransactionVolume: 180000,
        avgResponseTimeMs: 320,
        slaTargetMs: 500,
        slaCompliancePercent: 100,
        errorRatePercent: 0.2,
        uptimePercent: 99.94,
        consumingApplications: 3,
        revenueAttributionUsd: 8000000,
        businessCriticality: "Mission-Critical",
        businessValueScore: 45,
        healthStatus: "🟢 Healthy",
        ownerTeam: "Digital Insurance",
        documentationQuality: "Excellent",
        lastDeployedDate: "2024-09-18",
      },
      {
        apiId: "API-00002",
        account: "Gard AS",
        apiName: "Alternative Fuel Coverage API",
        apiType: "Experience",
        apiVersion: "v1.2",
        businessCapability: "Sustainability Underwriting",
        linkedValueStreams: "VS-00001, VS-00002",
        linkedObjectives: "OBJ-00002, OBJ-00005",
        environment: "Production",
        monthlyTransactions: 6200,
        annualTransactionVolume: 74400,
        avgResponseTimeMs: 410,
        slaTargetMs: 600,
        slaCompliancePercent: 97,
        errorRatePercent: 0.4,
        uptimePercent: 99.87,
        consumingApplications: 4,
        revenueAttributionUsd: 3200000,
        businessCriticality: "High",
        businessValueScore: 24.1,
        healthStatus: "🟡 Degraded",
        ownerTeam: "Underwriting Technology",
        documentationQuality: "Good",
        lastDeployedDate: "2024-10-05",
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
      {
        metricId: "MET-000001",
        account: "Gard AS",
        metricCategory: "Reliability",
        metricName: "War Risk Portal Uptime",
        metricType: "Technical",
        currentValue: 99.94,
        targetValue: 99.95,
        thresholdWarning: 99.9,
        thresholdCritical: 99.5,
        unit: "%",
        measurementFrequency: "Real-time",
        healthStatus: "🟢 On Track",
        linkedCapability: "CAP-00003",
        linkedObjective: "OBJ-00001",
        businessImpactStatement: "War risk customers cannot get 24/7 quotes during geopolitical crisis",
        lastMeasured: "2024-11-08",
      },
      {
        metricId: "MET-000002",
        account: "Gard AS",
        metricCategory: "Performance",
        metricName: "Claims Cycle Time",
        metricType: "Business",
        currentValue: 240,
        targetValue: 168,
        thresholdWarning: 220,
        thresholdCritical: 260,
        unit: "hours",
        measurementFrequency: "Weekly",
        healthStatus: "🟡 Needs Attention",
        linkedCapability: "CAP-00002",
        linkedObjective: "OBJ-00005",
        businessImpactStatement: "Claims backlog increases operational cost and delays indemnity decisions",
        lastMeasured: "2024-11-07",
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
      investmentAmountUsd: 450000,
      muleSoftServicesUsd: 280000,
      customerInvestmentUsd: 170000,
      expectedAnnualBenefitUsd: 1950000,
      expectedPaybackMonths: 2.8,
      threeYearROIPercent: 1200,
      realizedAnnualBenefitUsd: 0,
      actualROIPercent: 0,
      successCriteria: "50% reduction in claims processing time, 99.9% API uptime",
      ownerMuleSoft: "Marcus Johnson",
      ownerCustomer: "Lars Pedersen",
      nextMilestone: "UAT Completion - Nov 30",
      blockers: "None",
    },
      {
        initiativeId: "INI-00001",
        account: "Gard AS",
        initiativeName: "CloudHub 2.0 Migration",
        initiativeType: "Platform Migration",
        linkedObjectives: "OBJ-00001, OBJ-00004",
        linkedCapabilities: "CAP-00004",
        businessDriver: "Platform resiliency",
        proposedBy: "Sarah Chen",
        priority: "P0-Critical",
        phase: "Planning",
        status: "Planning",
        startDate: "2024-09-01",
        targetCompletionDate: "2025-02-28",
        actualCompletionDate: "",
        daysOverdue: 0,
        investmentAmountUsd: 120000,
        muleSoftServicesUsd: 75000,
        customerInvestmentUsd: 45000,
        expectedAnnualBenefitUsd: 180000,
        expectedPaybackMonths: 8,
        threeYearROIPercent: 350,
        realizedAnnualBenefitUsd: 0,
        actualROIPercent: 0,
        successCriteria: "War risk portal uptime ≥ 99.95%, failover in under 5 minutes",
        ownerMuleSoft: "Marcus Johnson",
        ownerCustomer: "Lars Hansen",
        nextMilestone: "Migration rehearsal complete - Dec 20",
        blockers: "Awaiting production maintenance window approval",
      },
      {
        initiativeId: "INI-00002",
        account: "Gard AS",
        initiativeName: "Sustainability Insights API Rollout",
        initiativeType: "Capability Development",
        linkedObjectives: "OBJ-00002",
        linkedCapabilities: "CAP-00002, CAP-00003",
        businessDriver: "Market expansion",
        proposedBy: "Ingrid Johansen",
        priority: "P1",
        phase: "Design",
        status: "In Progress",
        startDate: "2024-07-15",
        targetCompletionDate: "2025-01-31",
        actualCompletionDate: "",
        daysOverdue: 0,
        investmentAmountUsd: 210000,
        muleSoftServicesUsd: 90000,
        customerInvestmentUsd: 120000,
        expectedAnnualBenefitUsd: 540000,
        expectedPaybackMonths: 4.7,
        threeYearROIPercent: 671,
        realizedAnnualBenefitUsd: 0,
        actualROIPercent: 0,
        successCriteria: "50% of alternative fuel quotes generated via API with sustainability scorecards",
        ownerMuleSoft: "Sarah Chen",
        ownerCustomer: "Ingrid Johansen",
        nextMilestone: "Pilot customer launch - Jan 10",
        blockers: "Awaiting integration test data set",
      },
      {
        initiativeId: "INI-00003",
        account: "Gard AS",
        initiativeName: "Claims Automation Wave 2",
        initiativeType: "Process Automation",
        linkedObjectives: "OBJ-00005",
        linkedCapabilities: "CAP-00002, CAP-00003",
        businessDriver: "Cost optimization",
        proposedBy: "Katarina Olsen",
        priority: "P1",
        phase: "Discovery",
        status: "In Progress",
        startDate: "2024-10-10",
        targetCompletionDate: "2025-04-30",
        actualCompletionDate: "",
        daysOverdue: 0,
        investmentAmountUsd: 185000,
        muleSoftServicesUsd: 110000,
        customerInvestmentUsd: 75000,
        expectedAnnualBenefitUsd: 420000,
        expectedPaybackMonths: 5.3,
        threeYearROIPercent: 581,
        realizedAnnualBenefitUsd: 0,
        actualROIPercent: 0,
        successCriteria: "Reduce manual claim touches by 20% and lower cycle time to 7 days",
        ownerMuleSoft: "Marcus Johnson",
        ownerCustomer: "Maria Hansen",
        nextMilestone: "Automation blueprint sign-off - Dec 12",
        blockers: "Resource constraints in claims IT",
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
      potentialBusinessImpactUsd: 500000,
      potentialOperationalImpact: "2-3 month project delay",
      mitigationStrategy: "Deploy MuleSoft SAP connector, allocate dedicated mainframe SME",
      mitigationInitiative: "INIT-001",
      mitigationOwner: "Marcus Johnson",
      targetResolutionDate: "2024-12-15",
      status: "Active - Mitigation In Progress",
      dateIdentified: "2024-09-15",
      dateClosed: "",
    },
      {
        riskId: "RISK-00001",
        account: "Gard AS",
        riskCategory: "Platform Risk",
        riskTitle: "CloudHub 1.0 EOL",
        description: "Mission-critical integrations still operating on CloudHub 1.0 as end-of-life approaches",
        rootCause: "Pending migration backlog and limited non-production environments",
        affectedCapability: "CAP-00004",
        affectedAPIs: "API-00001",
        affectedValueStreams: "VS-00001",
        linkedObjectivesAtRisk: "OBJ-00001, OBJ-00004",
        impactScore: 5,
        probabilityScore: 5,
        riskScore: 25,
        riskLevel: "Critical",
        potentialBusinessImpactUsd: 2000000,
        potentialOperationalImpact: "Loss of 24/7 quoting and breach of war risk SLAs",
        mitigationStrategy: "Accelerate CloudHub 2.0 migration with resiliency playbook",
        mitigationInitiative: "INI-00001",
        mitigationOwner: "Marcus Johnson",
        targetResolutionDate: "2024-12-31",
        status: "Active - Mitigation In Progress",
        dateIdentified: "2024-09-20",
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
      {
        outcomeId: "OUT-00001",
        account: "Gard AS",
        stakeholderType: "External Customer",
        stakeholderName: "War Risk Customers",
        stakeholderRole: "Fleet Managers",
        outcomeStatement:
          "As a ship owner, I can get a war risk quote in <5 minutes so I can respond to crisis situations",
        linkedObjective: "OBJ-00001",
        linkedValueStream: "VS-00001",
        linkedAPIServices: "API-00001",
        successMetricName: "Quote Turnaround Time",
        baselineValue: 45,
        currentValue: 4,
        targetValue: 5,
        unit: "minutes",
        improvementPercent: -91,
        targetAchievementPercent: 102,
        measurementMethod: "Portal telemetry",
        lastMeasured: "2024-10-31",
        measurementFrequency: "Monthly",
        status: "Achieved",
      },
      {
        outcomeId: "OUT-00002",
        account: "Gard AS",
        stakeholderType: "Internal Business Unit",
        stakeholderName: "Underwriting Leadership",
        stakeholderRole: "VP, Marine Underwriting",
        outcomeStatement: "Gain real-time visibility into alternative fuel coverage pipeline to steer growth",
        linkedObjective: "OBJ-00002",
        linkedValueStream: "VS-00002",
        linkedAPIServices: "API-00002",
        successMetricName: "Alternative fuel quote conversion rate",
        baselineValue: 12,
        currentValue: 21,
        targetValue: 24,
        unit: "percent",
        improvementPercent: 75,
        targetAchievementPercent: 90,
        measurementMethod: "Salesforce pipeline analytics",
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
      {
        engagementId: "ENG-00003",
        account: "Gard AS",
        engagementDate: "2024-10-22",
        engagementType: "QBR - Quarterly Business Review",
        attendeesMuleSoft: "Sarah Chen (CSM), Marcus Johnson (SA)",
        attendeesCustomer: "Lars Hansen (Head of IT), Ingrid Johansen (Executive Sponsor)",
        customerSeniority: "C-Level + VP",
        topicsDiscussed: "War risk uptime, CloudHub migration readiness, sustainability roadmap",
        actionItems: "1) Finalize CloudHub migration runbook 2) Share sustainability KPI dashboard mockups",
        sentiment: "Very Positive",
        strategicAlignmentScore: 9,
        technicalHealthScore: 8,
        relationshipDepthScore: 9,
        nextSteps: "Schedule migration rehearsal and ESG reporting deep dive",
        nextEngagementDate: "2024-11-20",
        notes: "Customer highlighted need for proactive alerting during geopolitical events.",
      },
      {
        engagementId: "ENG-00004",
        account: "Gard AS",
        engagementDate: "2024-11-07",
        engagementType: "Executive Sponsor Call",
        attendeesMuleSoft: "Sarah Chen (CSM)",
        attendeesCustomer: "Ingrid Johansen (Executive Sponsor)",
        customerSeniority: "Executive",
        topicsDiscussed: "Sustainability insights rollout status and renewal planning",
        actionItems: "1) Deliver ROI snapshot for sustainability program by Nov 15",
        sentiment: "Positive",
        strategicAlignmentScore: 8,
        technicalHealthScore: 7,
        relationshipDepthScore: 9,
        nextSteps: "Provide ROI snapshot and confirm Q1 enablement workshops",
        nextEngagementDate: "2024-12-05",
        notes: "Executive sponsor wants early preview of ESG dashboards for board review.",
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
      expansionOpportunityUsd: 450000,
      executiveSponsorCustomer: "Erik Svensson",
      executiveSponsorMuleSoft: "Sarah Chen",
      nextQBRDate: "2025-01-28",
    },
      {
        successPlanId: "SP-FY2024-H2-GARD",
        account: "Gard AS",
        planPeriod: "FY2024 H2",
        planStatus: "Active",
        creationDate: "2024-07-01",
        lastUpdated: "2024-11-08T16:30:00Z",
        objectivesAddressed: "OBJ-00001, OBJ-00002, OBJ-00004",
        keyInitiatives: "INI-00001, INI-00002",
        criticalSuccessFactors:
          "1) Complete CloudHub migration rehearsal 2) Launch sustainability insights pilot 3) Maintain 99.95% uptime",
        top3Priorities: "1) CloudHub 2.0 migration 2) ESG analytics rollout 3) Claims automation blueprint",
        top3Risks: "RISK-00001",
        overallHealthScore: 82,
        renewalRiskLevel: "Low",
        expansionOpportunityUsd: 600000,
        executiveSponsorCustomer: "Ingrid Johansen",
        executiveSponsorMuleSoft: "Sarah Chen",
        nextQBRDate: "2025-01-14",
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
      {
        taskId: "TASK-010",
        account: "Gard AS",
        taskTitle: "Finalize CloudHub Migration Runbook",
        taskDescription: "Document final production cutover steps and rollback plan",
        taskType: "Technical Planning",
        priority: "High",
        status: "In Progress",
        assignedTo: "Marcus Johnson",
        createdBy: "Sarah Chen",
        createdDate: "2024-10-23T11:45:00Z",
        dueDate: "2024-11-25",
        daysUntilDue: 18,
        completedDate: "",
        linkedEngagement: "ENG-00003",
        linkedInitiative: "INI-00001",
        linkedRisk: "RISK-00001",
        notes: "Runbook review scheduled with operations on Nov 18.",
      },
      {
        taskId: "TASK-011",
        account: "Gard AS",
        taskTitle: "Deliver Sustainability ROI Snapshot",
        taskDescription: "Compile ROI analysis for alternative fuel program",
        taskType: "Executive Update",
        priority: "Medium",
        status: "Pending",
        assignedTo: "Sarah Chen",
        createdBy: "Sarah Chen",
        createdDate: "2024-11-07T14:10:00Z",
        dueDate: "2024-11-15",
        daysUntilDue: 8,
        completedDate: "",
        linkedEngagement: "ENG-00004",
        linkedInitiative: "INI-00002",
        linkedRisk: "",
        notes: "Include three-year ROI scenario modeling for executive sponsor review.",
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
