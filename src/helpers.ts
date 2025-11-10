import * as coda from "@codahq/packs-sdk";
import {
  calculateActualRoi,
  calculateCompositeHealth,
  calculateDaysToRenewal,
  calculateEngagementCadenceStatus,
  calculateEngagementScore,
  calculateExpectedPayback,
  calculateNextEngagementDate,
  calculateRiskLevel,
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
  const referenceDate = new Date();

  const accountSeed = [
    {
      accountId: "ACC-001",
      accountName: "Acme Financial Services",
      industryVertical: "Financial Services",
      industrySubSector: "Investment Banking",
      contractType: "Premier Success",
      contractStartDate: "2023-06-01",
      contractEndDate: "2026-05-31",
      renewalDate: "2026-05-31",
      arr: 1200000,
      acv: 1200000,
      customerSuccessManager: "Sarah Chen",
      accountExecutive: "Lisa Martinez",
      solutionsArchitect: "Marcus Johnson",
      executiveSponsorCustomer: "Emily Carter",
      executiveSponsorVendor: "David Nguyen",
      spRating: "AA-",
      customerAnnualRevenue: 3500000000,
      employeeCount: 7800,
      geography: "United States",
      primaryContactName: "Emily Carter",
      primaryContactEmail: "emily.carter@acmefinancial.com",
      primaryContactRole: "Chief Technology Officer",
      lastEngagementDate: "2024-10-28",
      engagementCadenceTargetDays: 30,
      platformHealthScore: 82,
      businessValueRealizationScore: 76,
      stakeholderEngagementScore: 88,
      strategicAlignmentScore: 83,
      createdDate: "2023-06-01T09:00:00Z",
    },
    {
      accountId: "ACC-002",
      accountName: "Nordic Logistics Group",
      industryVertical: "Transportation & Logistics",
      industrySubSector: "Freight Forwarding",
      contractType: "Signature Success",
      contractStartDate: "2022-01-15",
      contractEndDate: "2025-01-14",
      renewalDate: "2025-01-14",
      arr: 850000,
      acv: 850000,
      customerSuccessManager: "Sarah Chen",
      accountExecutive: "Lisa Martinez",
      solutionsArchitect: "Marcus Johnson",
      executiveSponsorCustomer: "Anna Bergström",
      executiveSponsorVendor: "David Nguyen",
      spRating: "A+",
      customerAnnualRevenue: 1800000000,
      employeeCount: 2100,
      geography: "Sweden",
      primaryContactName: "Anna Bergström",
      primaryContactEmail: "anna.bergstrom@nordiclogistics.se",
      primaryContactRole: "VP of Technology",
      lastEngagementDate: "2024-11-02",
      engagementCadenceTargetDays: 45,
      platformHealthScore: 88,
      businessValueRealizationScore: 81,
      stakeholderEngagementScore: 79,
      strategicAlignmentScore: 85,
      createdDate: "2022-01-15T10:00:00Z",
    },
    {
      accountId: "ACC-003",
      accountName: "HealthTech Solutions",
      industryVertical: "Healthcare",
      industrySubSector: "Hospital Networks",
      contractType: "Standard",
      contractStartDate: "2024-01-01",
      contractEndDate: "2025-12-31",
      renewalDate: "2025-12-31",
      arr: 350000,
      acv: 350000,
      customerSuccessManager: "Sarah Chen",
      accountExecutive: "Lisa Martinez",
      solutionsArchitect: "Marcus Johnson",
      executiveSponsorCustomer: "Dr. Priya Patel",
      executiveSponsorVendor: "David Nguyen",
      spRating: "BBB+",
      customerAnnualRevenue: 950000000,
      employeeCount: 1200,
      geography: "United States",
      primaryContactName: "Dr. Priya Patel",
      primaryContactEmail: "priya.patel@healthtechsolutions.com",
      primaryContactRole: "Chief Digital Officer",
      lastEngagementDate: "2024-10-20",
      engagementCadenceTargetDays: 60,
      platformHealthScore: 76,
      businessValueRealizationScore: 68,
      stakeholderEngagementScore: 74,
      strategicAlignmentScore: 72,
      createdDate: "2024-01-01T08:30:00Z",
    },
  ];

  const sampleAccounts = accountSeed.map((account) => {
    const daysToRenewal = calculateDaysToRenewal(account.renewalDate, referenceDate);
    const compositeHealthScore = Number(
      calculateCompositeHealth(
        account.platformHealthScore,
        account.businessValueRealizationScore,
        account.stakeholderEngagementScore,
        account.strategicAlignmentScore,
      ).toFixed(1),
    );
    const healthScore = Math.round(compositeHealthScore);
    const nextEngagementDateObj = calculateNextEngagementDate(
      account.lastEngagementDate,
      account.engagementCadenceTargetDays,
    );
    const engagementCadenceStatus = calculateEngagementCadenceStatus(
      account.lastEngagementDate,
      account.engagementCadenceTargetDays,
      referenceDate,
    );
    const riskLevel = calculateRiskLevel(healthScore, daysToRenewal);

    return {
      ...account,
      daysToRenewal,
      healthScore,
      compositeHealthScore,
      riskLevel,
      engagementCadenceStatus,
      nextEngagementDate: formatDate(nextEngagementDateObj),
      lastModified: referenceDate.toISOString(),
    };
  });

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
      contextId: "CTX-002",
      account: "Nordic Logistics Group",
      businessModel: "Global freight forwarding and supply chain orchestration",
      marketPosition: "Market leader in multimodal logistics across Nordics",
      operatingEnvironment: "High competition, rising fuel costs, sustainability regulations",
      keyBusinessChallenges:
        "Real-time shipment visibility, sustainability reporting, integrating acquired subsidiaries",
      strategicPrioritiesCurrentYear:
        "Unified customer portal, predictive ETA services, carbon footprint tracking",
      digitalMaturity: "Transforming",
      itComplexityScore: 8,
      legacySystemCount: 18,
      cloudStrategy: "Hybrid Cloud - AWS + On-prem TMS",
      dataClassification: "Standard (logistics & supply chain)",
      lastUpdated: "2024-11-01T08:30:00Z",
    },
    {
      contextId: "CTX-003",
      account: "HealthTech Solutions",
      businessModel: "Integrated care network with value-based care contracts",
      marketPosition: "Emerging innovator in patient experience technology",
      operatingEnvironment: "HIPAA-regulated healthcare with focus on interoperability",
      keyBusinessChallenges: "FHIR integration, clinician adoption, reducing readmission rates",
      strategicPrioritiesCurrentYear:
        "Patient 360 rollout, virtual care expansion, unified analytics for quality metrics",
      digitalMaturity: "Developing",
      itComplexityScore: 6,
      legacySystemCount: 9,
      cloudStrategy: "Hybrid Cloud - Azure + Private Cloud EHR",
      dataClassification: "Highly Regulated (HIPAA)",
      lastUpdated: "2024-10-26T12:45:00Z",
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
      objectiveId: "OBJ-003",
      account: "Acme Financial Services",
      strategicPillar: "Compliance/Regulatory",
      objectiveName: "Strengthen SEC Reporting Automation",
      description: "Automate regulatory reporting workflows and reduce manual reconciliation effort",
      businessDriver: "Regulatory compliance",
      quantifiedGoal: "Cut quarterly reporting cycle from 15 to 7 days",
      targetDate: "2025-03-31",
      businessOwner: "Olivia Grant",
      businessValueUsd: 950000,
      muleSoftRelevance: "Critical - Integration backbone",
      status: "At Risk",
      progressPercent: 48,
      lastReviewDate: "2024-11-06",
      notes: "Dependencies on data warehouse team, escalate resource constraints",
      linkedCapabilities: "CAP-003",
      linkedValueStreams: "VS-002",
      linkedInitiatives: "INIT-003",
    },
    {
      objectiveId: "OBJ-004",
      account: "Nordic Logistics Group",
      strategicPillar: "Operational Resilience",
      objectiveName: "Unified Shipment Visibility",
      description: "Provide real-time multimodal shipment tracking to customers",
      businessDriver: "Customer retention and premium services",
      quantifiedGoal: "Real-time visibility for 95% of shipments by Q2 2025",
      targetDate: "2025-06-30",
      businessOwner: "Anna Bergström",
      businessValueUsd: 2100000,
      muleSoftRelevance: "Critical Enabler",
      status: "In Progress",
      progressPercent: 55,
      lastReviewDate: "2024-10-30",
      notes: "Integration testing with rail partners underway",
      linkedCapabilities: "CAP-101",
      linkedValueStreams: "VS-101",
      linkedInitiatives: "INIT-101",
    },
    {
      objectiveId: "OBJ-005",
      account: "Nordic Logistics Group",
      strategicPillar: "Sustainability/ESG",
      objectiveName: "Carbon Footprint Reporting Automation",
      description: "Automate emissions calculations across all logistics modes",
      businessDriver: "Meet EU CSRD requirements; unlock green incentives",
      quantifiedGoal: "Automate 90% of emissions reporting by FY2025",
      targetDate: "2025-09-30",
      businessOwner: "Jonas Nilsson",
      businessValueUsd: 1250000,
      muleSoftRelevance: "Supporting",
      status: "Planning",
      progressPercent: 22,
      lastReviewDate: "2024-10-18",
      notes: "Awaiting carbon accounting vendor API credentials",
      linkedCapabilities: "CAP-102",
      linkedValueStreams: "VS-102",
      linkedInitiatives: "INIT-102",
    },
    {
      objectiveId: "OBJ-006",
      account: "HealthTech Solutions",
      strategicPillar: "Customer Experience",
      objectiveName: "Launch Patient 360 Portal",
      description: "Seamless patient onboarding, appointment scheduling, and care plan visibility",
      businessDriver: "Patient satisfaction and retention",
      quantifiedGoal: "Achieve 65% patient portal adoption by Q4 2025",
      targetDate: "2025-10-31",
      businessOwner: "Dr. Priya Patel",
      businessValueUsd: 1750000,
      muleSoftRelevance: "Critical Enabler",
      status: "In Progress",
      progressPercent: 42,
      lastReviewDate: "2024-11-02",
      notes: "FHIR mapping complete, EHR integration in QA",
      linkedCapabilities: "CAP-201",
      linkedValueStreams: "VS-201",
      linkedInitiatives: "INIT-201",
    },
    {
      objectiveId: "OBJ-007",
      account: "HealthTech Solutions",
      strategicPillar: "Operational Resilience",
      objectiveName: "Reduce Readmission Rates",
      description: "Integrate predictive analytics for 30-day readmission risk scoring",
      businessDriver: "Value-based care incentives",
      quantifiedGoal: "Lower 30-day readmissions by 12% by FY2026",
      targetDate: "2026-01-31",
      businessOwner: "Michael Rivera",
      businessValueUsd: 2100000,
      muleSoftRelevance: "Supporting",
      status: "Planning",
      progressPercent: 30,
      lastReviewDate: "2024-10-25",
      notes: "Pilot with cardiac unit scheduled for January 2025",
      linkedCapabilities: "CAP-202",
      linkedValueStreams: "VS-202",
      linkedInitiatives: "INIT-202",
    },
  ];

  return { result: sampleObjectives };
}

// ===========================================================================
// SYNC FUNCTION 5: MULESOFT_CAPABILITIES
// ===========================================================================

export async function syncPlatformCapabilities(
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
      currentMaturity: "2-Developing",
      targetMaturity: "4-Managed",
      currentMaturityNumeric: 2,
      targetMaturityNumeric: 4,
      maturityGap: 2,
      gapStatus: "🟡 Moderate Gap",
      linkedObjectives: "OBJ-001",
      supportingValueStreams: "VS-001",
      investmentRequiredUsd: 450000,
      priority: "P0-Critical",
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
      currentMaturity: "2-Developing",
      targetMaturity: "3-Defined",
      currentMaturityNumeric: 2,
      targetMaturityNumeric: 3,
      maturityGap: 1,
      gapStatus: "🟢 Small Gap",
      linkedObjectives: "OBJ-001",
      supportingValueStreams: "VS-001",
      investmentRequiredUsd: 250000,
      priority: "P1-High",
      implementationStatus: "Planning",
      businessImpact: "Medium - Enables partner ecosystem",
      technicalOwner: "Marcus Johnson",
      lastAssessmentDate: "2024-10-20",
    },
    {
      capabilityId: "CAP-003",
      account: "Acme Financial Services",
      capabilityDomain: "Data Governance",
      capabilityName: "Regulatory Reporting Data Hub",
      description: "Centralized data services for SEC and regulatory filings",
      currentMaturity: "1-Initial",
      targetMaturity: "4-Managed",
      currentMaturityNumeric: 1,
      targetMaturityNumeric: 4,
      maturityGap: 3,
      gapStatus: "🟡 Moderate Gap",
      linkedObjectives: "OBJ-003",
      supportingValueStreams: "VS-002",
      investmentRequiredUsd: 380000,
      priority: "P0-Critical",
      implementationStatus: "At Risk",
      businessImpact: "High - Compliance exposure",
      technicalOwner: "Emily Carter",
      lastAssessmentDate: "2024-11-01",
    },
    {
      capabilityId: "CAP-101",
      account: "Nordic Logistics Group",
      capabilityDomain: "Integration",
      capabilityName: "Multimodal Shipment Orchestration",
      description: "Connects road, rail, air, and sea systems for unified tracking",
      currentMaturity: "2-Developing",
      targetMaturity: "4-Managed",
      currentMaturityNumeric: 2,
      targetMaturityNumeric: 4,
      maturityGap: 2,
      gapStatus: "🟡 Moderate Gap",
      linkedObjectives: "OBJ-004",
      supportingValueStreams: "VS-101",
      investmentRequiredUsd: 520000,
      priority: "P0-Critical",
      implementationStatus: "In Progress",
      businessImpact: "Critical for premium customers",
      technicalOwner: "Jonas Nilsson",
      lastAssessmentDate: "2024-10-22",
    },
    {
      capabilityId: "CAP-102",
      account: "Nordic Logistics Group",
      capabilityDomain: "Analytics",
      capabilityName: "Sustainability Metrics Hub",
      description: "Carbon footprint calculation service across transport modes",
      currentMaturity: "1-Initial",
      targetMaturity: "3-Defined",
      currentMaturityNumeric: 1,
      targetMaturityNumeric: 3,
      maturityGap: 2,
      gapStatus: "🟡 Moderate Gap",
      linkedObjectives: "OBJ-005",
      supportingValueStreams: "VS-102",
      investmentRequiredUsd: 260000,
      priority: "P1-High",
      implementationStatus: "Planning",
      businessImpact: "High - ESG compliance risk",
      technicalOwner: "Anna Bergström",
      lastAssessmentDate: "2024-10-12",
    },
    {
      capabilityId: "CAP-201",
      account: "HealthTech Solutions",
      capabilityDomain: "Integration",
      capabilityName: "FHIR API Gateway",
      description: "Unified FHIR-based integration layer across EHR and care platforms",
      currentMaturity: "2-Developing",
      targetMaturity: "4-Managed",
      currentMaturityNumeric: 2,
      targetMaturityNumeric: 4,
      maturityGap: 2,
      gapStatus: "🟡 Moderate Gap",
      linkedObjectives: "OBJ-006",
      supportingValueStreams: "VS-201",
      investmentRequiredUsd: 310000,
      priority: "P1-High",
      implementationStatus: "In Progress",
      businessImpact: "High patient experience impact",
      technicalOwner: "Dr. Priya Patel",
      lastAssessmentDate: "2024-10-28",
    },
    {
      capabilityId: "CAP-202",
      account: "HealthTech Solutions",
      capabilityDomain: "Analytics",
      capabilityName: "Predictive Care Insights",
      description: "AI-driven risk scoring for readmissions and chronic care management",
      currentMaturity: "1-Initial",
      targetMaturity: "3-Defined",
      currentMaturityNumeric: 1,
      targetMaturityNumeric: 3,
      maturityGap: 2,
      gapStatus: "🟡 Moderate Gap",
      linkedObjectives: "OBJ-007",
      supportingValueStreams: "VS-202",
      investmentRequiredUsd: 410000,
      priority: "P0-Critical",
      implementationStatus: "Planning",
      businessImpact: "Critical for value-based care incentives",
      technicalOwner: "Michael Rivera",
      lastAssessmentDate: "2024-10-19",
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
      cycleTimeProgress: "🟡 Progressing",
      costPerTransactionBeforeUsd: 185.5,
      costPerTransactionAfterUsd: 142.3,
      annualCostSavingsUsd: 1944000,
      revenueImpactUsd: 0,
      totalBusinessValueUsd: 1944000,
      customerSatisfactionScore: 7.2,
      operationalRiskLevel: "Medium",
    },
    {
      streamId: "VS-002",
      account: "Acme Financial Services",
      valueStreamName: "Regulatory Reporting",
      businessProcess: "Quarterly and annual SEC filings",
      processOwner: "Regulatory Reporting Director",
      linkedObjectives: "OBJ-003",
      enabledCapabilities: "CAP-003",
      integrationEndpoints: 11,
      apisConsumed: 9,
      annualTransactionVolume: 1200,
      cycleTimeBaselineHours: 360,
      cycleTimeCurrentHours: 240,
      cycleTimeTargetHours: 168,
      cycleTimeReductionPercent: 33.3,
      cycleTimeProgress: "🟡 Progressing",
      costPerTransactionBeforeUsd: 980.0,
      costPerTransactionAfterUsd: 620.0,
      annualCostSavingsUsd: 432000,
      revenueImpactUsd: 0,
      totalBusinessValueUsd: 432000,
      customerSatisfactionScore: 6.5,
      operationalRiskLevel: "High",
    },
    {
      streamId: "VS-101",
      account: "Nordic Logistics Group",
      valueStreamName: "Shipment Visibility Hub",
      businessProcess: "Cross-modal tracking and predictive ETA",
      processOwner: "Director of Customer Operations",
      linkedObjectives: "OBJ-004",
      enabledCapabilities: "CAP-101",
      integrationEndpoints: 14,
      apisConsumed: 18,
      annualTransactionVolume: 98000,
      cycleTimeBaselineHours: 12,
      cycleTimeCurrentHours: 3,
      cycleTimeTargetHours: 2,
      cycleTimeReductionPercent: 75,
      cycleTimeProgress: "🟢 Target Met",
      costPerTransactionBeforeUsd: 42.0,
      costPerTransactionAfterUsd: 21.0,
      annualCostSavingsUsd: 2058000,
      revenueImpactUsd: 950000,
      totalBusinessValueUsd: 3008000,
      customerSatisfactionScore: 8.6,
      operationalRiskLevel: "Medium",
    },
    {
      streamId: "VS-102",
      account: "Nordic Logistics Group",
      valueStreamName: "Carbon Reporting Workflow",
      businessProcess: "Automated ESG emissions calculation",
      processOwner: "Head of Sustainability",
      linkedObjectives: "OBJ-005",
      enabledCapabilities: "CAP-102",
      integrationEndpoints: 9,
      apisConsumed: 7,
      annualTransactionVolume: 5200,
      cycleTimeBaselineHours: 96,
      cycleTimeCurrentHours: 36,
      cycleTimeTargetHours: 24,
      cycleTimeReductionPercent: 62.5,
      cycleTimeProgress: "🟡 Progressing",
      costPerTransactionBeforeUsd: 310.0,
      costPerTransactionAfterUsd: 170.0,
      annualCostSavingsUsd: 728000,
      revenueImpactUsd: 420000,
      totalBusinessValueUsd: 1148000,
      customerSatisfactionScore: 7.8,
      operationalRiskLevel: "Low",
    },
    {
      streamId: "VS-201",
      account: "HealthTech Solutions",
      valueStreamName: "Patient 360 Experience",
      businessProcess: "Patient onboarding and engagement",
      processOwner: "Director of Patient Experience",
      linkedObjectives: "OBJ-006",
      enabledCapabilities: "CAP-201",
      integrationEndpoints: 10,
      apisConsumed: 14,
      annualTransactionVolume: 68000,
      cycleTimeBaselineHours: 48,
      cycleTimeCurrentHours: 18,
      cycleTimeTargetHours: 16,
      cycleTimeReductionPercent: 62.5,
      cycleTimeProgress: "🟡 Progressing",
      costPerTransactionBeforeUsd: 72.0,
      costPerTransactionAfterUsd: 44.0,
      annualCostSavingsUsd: 1904000,
      revenueImpactUsd: 520000,
      totalBusinessValueUsd: 2424000,
      customerSatisfactionScore: 8.2,
      operationalRiskLevel: "Medium",
    },
    {
      streamId: "VS-202",
      account: "HealthTech Solutions",
      valueStreamName: "Readmission Prevention",
      businessProcess: "Predictive care coordination",
      processOwner: "Chief Nursing Officer",
      linkedObjectives: "OBJ-007",
      enabledCapabilities: "CAP-202",
      integrationEndpoints: 7,
      apisConsumed: 9,
      annualTransactionVolume: 24000,
      cycleTimeBaselineHours: 72,
      cycleTimeCurrentHours: 30,
      cycleTimeTargetHours: 24,
      cycleTimeReductionPercent: 58.3,
      cycleTimeProgress: "🟡 Progressing",
      costPerTransactionBeforeUsd: 145.0,
      costPerTransactionAfterUsd: 92.0,
      annualCostSavingsUsd: 1272000,
      revenueImpactUsd: 380000,
      totalBusinessValueUsd: 1652000,
      customerSatisfactionScore: 7.9,
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
      apiId: "API-003",
      account: "Acme Financial Services",
      apiName: "Regulatory Data Service",
      apiType: "System API",
      apiVersion: "v1.0",
      businessCapability: "Regulatory Reporting",
      linkedValueStreams: "VS-002",
      linkedObjectives: "OBJ-003",
      environment: "Production",
      monthlyTransactions: 6800,
      annualTransactionVolume: 81600,
      avgResponseTimeMs: 480,
      slaTargetMs: 600,
      slaCompliancePercent: 97.5,
      errorRatePercent: 0.4,
      uptimePercent: 99.4,
      consumingApplications: 6,
      revenueAttributionUsd: 0,
      businessCriticality: "High",
      businessValueScore: 7.9,
      healthStatus: "🟡 Degraded",
      ownerTeam: "RegTech IT",
      documentationQuality: "Good",
      lastDeployedDate: "2024-10-30",
    },
    {
      apiId: "API-101",
      account: "Nordic Logistics Group",
      apiName: "Shipment Tracking API",
      apiType: "Experience API",
      apiVersion: "v3.2",
      businessCapability: "Customer Visibility",
      linkedValueStreams: "VS-101",
      linkedObjectives: "OBJ-004",
      environment: "Production",
      monthlyTransactions: 215000,
      annualTransactionVolume: 2580000,
      avgResponseTimeMs: 210,
      slaTargetMs: 400,
      slaCompliancePercent: 99.1,
      errorRatePercent: 0.25,
      uptimePercent: 99.87,
      consumingApplications: 9,
      revenueAttributionUsd: 2800000,
      businessCriticality: "Mission-Critical",
      businessValueScore: 19.2,
      healthStatus: "🟢 Healthy",
      ownerTeam: "Digital Logistics",
      documentationQuality: "Excellent",
      lastDeployedDate: "2024-11-01",
    },
    {
      apiId: "API-102",
      account: "Nordic Logistics Group",
      apiName: "Carbon Metrics API",
      apiType: "Process API",
      apiVersion: "v1.4",
      businessCapability: "Sustainability Reporting",
      linkedValueStreams: "VS-102",
      linkedObjectives: "OBJ-005",
      environment: "Sandbox",
      monthlyTransactions: 18500,
      annualTransactionVolume: 222000,
      avgResponseTimeMs: 560,
      slaTargetMs: 500,
      slaCompliancePercent: 92.0,
      errorRatePercent: 0.9,
      uptimePercent: 99.2,
      consumingApplications: 4,
      revenueAttributionUsd: 450000,
      businessCriticality: "High",
      businessValueScore: 6.8,
      healthStatus: "🟡 Degraded",
      ownerTeam: "Sustainability IT",
      documentationQuality: "Needs Improvement",
      lastDeployedDate: "2024-10-05",
    },
    {
      apiId: "API-201",
      account: "HealthTech Solutions",
      apiName: "Patient 360 API",
      apiType: "Experience API",
      apiVersion: "v2.0",
      businessCapability: "Patient Engagement",
      linkedValueStreams: "VS-201",
      linkedObjectives: "OBJ-006",
      environment: "Production",
      monthlyTransactions: 98000,
      annualTransactionVolume: 1176000,
      avgResponseTimeMs: 280,
      slaTargetMs: 450,
      slaCompliancePercent: 98.8,
      errorRatePercent: 0.35,
      uptimePercent: 99.8,
      consumingApplications: 7,
      revenueAttributionUsd: 1250000,
      businessCriticality: "Mission-Critical",
      businessValueScore: 13.4,
      healthStatus: "🟢 Healthy",
      ownerTeam: "Digital Care Team",
      documentationQuality: "Excellent",
      lastDeployedDate: "2024-10-18",
    },
    {
      apiId: "API-202",
      account: "HealthTech Solutions",
      apiName: "Care Plan Orchestration API",
      apiType: "Process API",
      apiVersion: "v1.5",
      businessCapability: "Care Coordination",
      linkedValueStreams: "VS-202",
      linkedObjectives: "OBJ-007",
      environment: "Production",
      monthlyTransactions: 42000,
      annualTransactionVolume: 504000,
      avgResponseTimeMs: 390,
      slaTargetMs: 500,
      slaCompliancePercent: 96.4,
      errorRatePercent: 0.6,
      uptimePercent: 99.6,
      consumingApplications: 5,
      revenueAttributionUsd: 820000,
      businessCriticality: "High",
      businessValueScore: 10.1,
      healthStatus: "🟢 Healthy",
      ownerTeam: "Clinical Operations IT",
      documentationQuality: "Good",
      lastDeployedDate: "2024-10-10",
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
      healthStatus: "🟡 Needs Attention",
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
      healthStatus: "🟡 Needs Attention",
      linkedCapability: "CAP-001",
      linkedObjective: "OBJ-001",
      businessImpactStatement: "Critical for 24/7 claims operations",
      lastMeasured: "2024-11-08",
    },
    {
      metricId: "MET-003",
      account: "Acme Financial Services",
      metricCategory: "Adoption",
      metricName: "Digital Claims Submission Rate",
      metricType: "Business",
      currentValue: 58,
      targetValue: 70,
      thresholdWarning: 55,
      thresholdCritical: 45,
      unit: "percent",
      measurementFrequency: "Weekly",
      healthStatus: "🟡 Needs Attention",
      linkedCapability: "CAP-001",
      linkedObjective: "OBJ-001",
      businessImpactStatement: "Lagging adoption impacts cost savings realization",
      lastMeasured: "2024-11-07",
    },
    {
      metricId: "MET-101",
      account: "Nordic Logistics Group",
      metricCategory: "Performance",
      metricName: "Predictive ETA Accuracy",
      metricType: "Operational",
      currentValue: 93,
      targetValue: 95,
      thresholdWarning: 90,
      thresholdCritical: 85,
      unit: "percent",
      measurementFrequency: "Weekly",
      healthStatus: "🟡 Needs Attention",
      linkedCapability: "CAP-101",
      linkedObjective: "OBJ-004",
      businessImpactStatement: "Accuracy drives premium customer retention",
      lastMeasured: "2024-11-08",
    },
    {
      metricId: "MET-102",
      account: "Nordic Logistics Group",
      metricCategory: "Reliability",
      metricName: "Tracking API Uptime",
      metricType: "Technical",
      currentValue: 99.87,
      targetValue: 99.9,
      thresholdWarning: 99.5,
      thresholdCritical: 99.0,
      unit: "percent",
      measurementFrequency: "Daily",
      healthStatus: "🟢 On Track",
      linkedCapability: "CAP-101",
      linkedObjective: "OBJ-004",
      businessImpactStatement: "Downtime drives immediate SLA penalties",
      lastMeasured: "2024-11-09",
    },
    {
      metricId: "MET-103",
      account: "Nordic Logistics Group",
      metricCategory: "Cost",
      metricName: "Cost per Shipment - Premium Service",
      metricType: "Business",
      currentValue: 28.5,
      targetValue: 25.0,
      thresholdWarning: 30.0,
      thresholdCritical: 32.0,
      unit: "USD",
      measurementFrequency: "Monthly",
      healthStatus: "🟡 Needs Attention",
      linkedCapability: "CAP-102",
      linkedObjective: "OBJ-005",
      businessImpactStatement: "Cost overruns erode premium margins",
      lastMeasured: "2024-10-31",
    },
    {
      metricId: "MET-201",
      account: "HealthTech Solutions",
      metricCategory: "Adoption",
      metricName: "Patient Portal Adoption",
      metricType: "Business",
      currentValue: 44,
      targetValue: 65,
      thresholdWarning: 50,
      thresholdCritical: 40,
      unit: "percent",
      measurementFrequency: "Monthly",
      healthStatus: "🔴 Critical",
      linkedCapability: "CAP-201",
      linkedObjective: "OBJ-006",
      businessImpactStatement: "Adoption drives patient satisfaction and retention",
      lastMeasured: "2024-10-30",
    },
    {
      metricId: "MET-202",
      account: "HealthTech Solutions",
      metricCategory: "Quality",
      metricName: "Readmission Risk Score Accuracy",
      metricType: "Operational",
      currentValue: 0.78,
      targetValue: 0.85,
      thresholdWarning: 0.75,
      thresholdCritical: 0.70,
      unit: "AUC",
      measurementFrequency: "Monthly",
      healthStatus: "🟡 Needs Attention",
      linkedCapability: "CAP-202",
      linkedObjective: "OBJ-007",
      businessImpactStatement: "Accuracy correlates directly with readmission penalties",
      lastMeasured: "2024-10-29",
    },
    {
      metricId: "MET-203",
      account: "HealthTech Solutions",
      metricCategory: "Security",
      metricName: "FHIR API Compliance Score",
      metricType: "Technical",
      currentValue: 96,
      targetValue: 98,
      thresholdWarning: 94,
      thresholdCritical: 90,
      unit: "percent",
      measurementFrequency: "Monthly",
      healthStatus: "🟢 On Track",
      linkedCapability: "CAP-201",
      linkedObjective: "OBJ-006",
      businessImpactStatement: "Non-compliance risks HIPAA penalties",
      lastMeasured: "2024-11-04",
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
      priority: "P0-Critical",
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
      ownerVendor: "Marcus Johnson",
      ownerCustomer: "Lars Pedersen",
      nextMilestone: "UAT Completion - Nov 30",
      blockers: "None",
    },
    {
      initiativeId: "INIT-002",
      account: "Acme Financial Services",
      initiativeName: "Customer Portal Enablement",
      initiativeType: "API Development",
      linkedObjectives: "OBJ-002",
      linkedCapabilities: "CAP-002",
      businessDriver: "Customer Experience",
      proposedBy: "Sarah Chen",
      priority: "P1-High",
      phase: "Design",
      status: "Planning",
      startDate: "2024-09-15",
      targetCompletionDate: "2025-06-30",
      actualCompletionDate: "",
      daysOverdue: 0,
      investmentAmountUsd: 310000,
      muleSoftServicesUsd: 180000,
      customerInvestmentUsd: 130000,
      expectedAnnualBenefitUsd: 890000,
      expectedPaybackMonths: 4.2,
      threeYearROIPercent: 761,
      realizedAnnualBenefitUsd: 0,
      actualROIPercent: 0,
      successCriteria: "70% digital adoption, NPS +15, 30% reduction in inbound calls",
      ownerVendor: "Sarah Chen",
      ownerCustomer: "Emily Carter",
      nextMilestone: "Finalize UX prototypes - Dec 05",
      blockers: "Pending compliance review",
    },
    {
      initiativeId: "INIT-003",
      account: "Acme Financial Services",
      initiativeName: "Regulatory Data Hub Automation",
      initiativeType: "Governance Enhancement",
      linkedObjectives: "OBJ-003",
      linkedCapabilities: "CAP-003",
      businessDriver: "Regulatory Compliance",
      proposedBy: "Olivia Grant",
      priority: "P0-Critical",
      phase: "Planning",
      status: "At Risk",
      startDate: "2024-10-01",
      targetCompletionDate: "2025-03-31",
      actualCompletionDate: "",
      daysOverdue: 0,
      investmentAmountUsd: 380000,
      muleSoftServicesUsd: 210000,
      customerInvestmentUsd: 170000,
      expectedAnnualBenefitUsd: 950000,
      expectedPaybackMonths: 4.8,
      threeYearROIPercent: 650,
      realizedAnnualBenefitUsd: 0,
      actualROIPercent: 0,
      successCriteria: "Automated filings with zero critical defects",
      ownerVendor: "Marcus Johnson",
      ownerCustomer: "Olivia Grant",
      nextMilestone: "Data model sign-off - Dec 12",
      blockers: "Need data ownership decision",
    },
    {
      initiativeId: "INIT-101",
      account: "Nordic Logistics Group",
      initiativeName: "Shipment Visibility Platform Expansion",
      initiativeType: "Platform Migration",
      linkedObjectives: "OBJ-004",
      linkedCapabilities: "CAP-101",
      businessDriver: "Customer Retention",
      proposedBy: "Anna Bergström",
      priority: "P0-Critical",
      phase: "Build",
      status: "In Progress",
      startDate: "2024-07-10",
      targetCompletionDate: "2025-04-30",
      actualCompletionDate: "",
      daysOverdue: 0,
      investmentAmountUsd: 520000,
      muleSoftServicesUsd: 260000,
      customerInvestmentUsd: 260000,
      expectedAnnualBenefitUsd: 1300000,
      expectedPaybackMonths: 4.8,
      threeYearROIPercent: 650,
      realizedAnnualBenefitUsd: 0,
      actualROIPercent: 0,
      successCriteria: "95% predictive ETA accuracy, premium NPS +10",
      ownerVendor: "Marcus Johnson",
      ownerCustomer: "Jonas Nilsson",
      nextMilestone: "Rail partner onboarding - Jan 15",
      blockers: "Waiting on API credentials from rail partner",
    },
    {
      initiativeId: "INIT-102",
      account: "Nordic Logistics Group",
      initiativeName: "ESG Automation Program",
      initiativeType: "Analytics Enablement",
      linkedObjectives: "OBJ-005",
      linkedCapabilities: "CAP-102",
      businessDriver: "Compliance",
      proposedBy: "Jonas Nilsson",
      priority: "P1-High",
      phase: "Planning",
      status: "Planning",
      startDate: "2024-09-05",
      targetCompletionDate: "2025-09-30",
      actualCompletionDate: "",
      daysOverdue: 0,
      investmentAmountUsd: 260000,
      muleSoftServicesUsd: 140000,
      customerInvestmentUsd: 120000,
      expectedAnnualBenefitUsd: 780000,
      expectedPaybackMonths: 4.0,
      threeYearROIPercent: 800,
      realizedAnnualBenefitUsd: 0,
      actualROIPercent: 0,
      successCriteria: "Automated CSRD reporting with <1% variance",
      ownerVendor: "Sarah Chen",
      ownerCustomer: "Jonas Nilsson",
      nextMilestone: "Finalize vendor connectivity - Jan 22",
      blockers: "Vendor API sandbox delayed",
    },
    {
      initiativeId: "INIT-201",
      account: "HealthTech Solutions",
      initiativeName: "Patient 360 Rollout",
      initiativeType: "API Development",
      linkedObjectives: "OBJ-006",
      linkedCapabilities: "CAP-201",
      businessDriver: "Patient Experience",
      proposedBy: "Dr. Priya Patel",
      priority: "P1-High",
      phase: "Build",
      status: "In Progress",
      startDate: "2024-05-01",
      targetCompletionDate: "2025-07-31",
      actualCompletionDate: "",
      daysOverdue: 0,
      investmentAmountUsd: 310000,
      muleSoftServicesUsd: 180000,
      customerInvestmentUsd: 130000,
      expectedAnnualBenefitUsd: 960000,
      expectedPaybackMonths: 3.9,
      threeYearROIPercent: 830,
      realizedAnnualBenefitUsd: 0,
      actualROIPercent: 0,
      successCriteria: "65% portal adoption, patient satisfaction +12",
      ownerVendor: "Sarah Chen",
      ownerCustomer: "Dr. Priya Patel",
      nextMilestone: "Pilot go-live - Feb 10",
      blockers: "Clinician training schedule",
    },
    {
      initiativeId: "INIT-202",
      account: "HealthTech Solutions",
      initiativeName: "Readmission Prediction Engine",
      initiativeType: "Analytics Enablement",
      linkedObjectives: "OBJ-007",
      linkedCapabilities: "CAP-202",
      businessDriver: "Value-Based Care",
      proposedBy: "Michael Rivera",
      priority: "P0-Critical",
      phase: "Design",
      status: "Planning",
      startDate: "2024-08-20",
      targetCompletionDate: "2025-11-30",
      actualCompletionDate: "",
      daysOverdue: 0,
      investmentAmountUsd: 410000,
      muleSoftServicesUsd: 210000,
      customerInvestmentUsd: 200000,
      expectedAnnualBenefitUsd: 1180000,
      expectedPaybackMonths: 4.2,
      threeYearROIPercent: 765,
      realizedAnnualBenefitUsd: 0,
      actualROIPercent: 0,
      successCriteria: "Readmission rate -12%, risk scoring AUC ≥0.85",
      ownerVendor: "Marcus Johnson",
      ownerCustomer: "Michael Rivera",
      nextMilestone: "Data science model selection - Jan 30",
      blockers: "Awaiting data privacy approval",
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
      riskId: "RISK-002",
      account: "Acme Financial Services",
      riskCategory: "Compliance",
      riskTitle: "Regulatory Data Quality Gaps",
      description: "Incomplete reconciliation between regulatory data hub and finance systems",
      rootCause: "Manual CSV uploads and mismatched data definitions",
      affectedCapability: "CAP-003",
      affectedAPIs: "API-003",
      affectedValueStreams: "VS-002",
      linkedObjectivesAtRisk: "OBJ-003",
      impactScore: 5,
      probabilityScore: 3,
      riskScore: 15,
      riskLevel: "High",
      potentialBusinessImpactUsd: 950000,
      potentialOperationalImpact: "Delayed SEC filings, potential fines",
      mitigationStrategy: "Add automated data validations, enforce data stewardship",
      mitigationInitiative: "INIT-003",
      mitigationOwner: "Emily Carter",
      targetResolutionDate: "2025-02-15",
      status: "Open",
      dateIdentified: "2024-10-12",
      dateClosed: "",
    },
    {
      riskId: "RISK-101",
      account: "Nordic Logistics Group",
      riskCategory: "Platform Risk",
      riskTitle: "Carrier API Rate Limiting",
      description: "Rail partner imposes strict rate thresholds causing throttling during peak hours",
      rootCause: "Carrier legacy API limitations",
      affectedCapability: "CAP-101",
      affectedAPIs: "API-101",
      affectedValueStreams: "VS-101",
      linkedObjectivesAtRisk: "OBJ-004",
      impactScore: 4,
      probabilityScore: 4,
      riskScore: 16,
      riskLevel: "High",
      potentialBusinessImpactUsd: 1250000,
      potentialOperationalImpact: "Delayed ETA calculations, SLA penalties",
      mitigationStrategy: "Implement caching layer, negotiate higher limits",
      mitigationInitiative: "INIT-101",
      mitigationOwner: "Jonas Nilsson",
      targetResolutionDate: "2025-01-31",
      status: "In Progress",
      dateIdentified: "2024-09-22",
      dateClosed: "",
    },
    {
      riskId: "RISK-102",
      account: "Nordic Logistics Group",
      riskCategory: "Compliance",
      riskTitle: "Incomplete Emissions Data",
      description: "Ocean carriers missing CO2 data feeds for CSRD reporting",
      rootCause: "Partner manual processes and inconsistent standards",
      affectedCapability: "CAP-102",
      affectedAPIs: "API-102",
      affectedValueStreams: "VS-102",
      linkedObjectivesAtRisk: "OBJ-005",
      impactScore: 3,
      probabilityScore: 4,
      riskScore: 12,
      riskLevel: "High",
      potentialBusinessImpactUsd: 620000,
      potentialOperationalImpact: "Non-compliance penalties, reputational damage",
      mitigationStrategy: "Provide integration accelerators, escalate via executive sponsor",
      mitigationInitiative: "INIT-102",
      mitigationOwner: "Anna Bergström",
      targetResolutionDate: "2025-03-15",
      status: "Open",
      dateIdentified: "2024-10-05",
      dateClosed: "",
    },
    {
      riskId: "RISK-201",
      account: "HealthTech Solutions",
      riskCategory: "Security",
      riskTitle: "FHIR API Security Gaps",
      description: "Pen test identified inconsistent OAuth scopes across FHIR resources",
      rootCause: "Legacy gateway policies and manual configuration drift",
      affectedCapability: "CAP-201",
      affectedAPIs: "API-201",
      affectedValueStreams: "VS-201",
      linkedObjectivesAtRisk: "OBJ-006",
      impactScore: 5,
      probabilityScore: 2,
      riskScore: 10,
      riskLevel: "Medium",
      potentialBusinessImpactUsd: 1500000,
      potentialOperationalImpact: "HIPAA compliance violations, potential breach",
      mitigationStrategy: "Automate policy deployment, implement continuous scanning",
      mitigationInitiative: "INIT-201",
      mitigationOwner: "Dr. Priya Patel",
      targetResolutionDate: "2025-01-15",
      status: "In Progress",
      dateIdentified: "2024-10-18",
      dateClosed: "",
    },
    {
      riskId: "RISK-202",
      account: "HealthTech Solutions",
      riskCategory: "Operational",
      riskTitle: "Clinician Adoption Lag",
      description: "Care teams slow to adopt predictive risk dashboards",
      rootCause: "Limited training and change management",
      affectedCapability: "CAP-202",
      affectedAPIs: "API-202",
      affectedValueStreams: "VS-202",
      linkedObjectivesAtRisk: "OBJ-007",
      impactScore: 3,
      probabilityScore: 4,
      riskScore: 12,
      riskLevel: "High",
      potentialBusinessImpactUsd: 480000,
      potentialOperationalImpact: "Delayed benefit realization and readmission reduction",
      mitigationStrategy: "Launch structured enablement program, add in-product nudges",
      mitigationInitiative: "INIT-202",
      mitigationOwner: "Michael Rivera",
      targetResolutionDate: "2025-04-30",
      status: "Open",
      dateIdentified: "2024-10-09",
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
      outcomeId: "OUT-002",
      account: "Acme Financial Services",
      stakeholderType: "Executive Leadership",
      stakeholderName: "Emily Carter",
      stakeholderRole: "CFO",
      outcomeStatement: "Shorten regulatory reporting cycle while maintaining accuracy",
      linkedObjective: "OBJ-003",
      linkedValueStream: "VS-002",
      linkedAPIServices: "API-003",
      successMetricName: "Regulatory Reporting Cycle Time (days)",
      baselineValue: 15,
      currentValue: 11,
      targetValue: 7,
      unit: "days",
      improvementPercent: 26.7,
      targetAchievementPercent: 57.1,
      measurementMethod: "Quarterly financial close tracking",
      lastMeasured: "2024-11-01",
      measurementFrequency: "Quarterly",
      status: "Needs Attention",
    },
    {
      outcomeId: "OUT-101",
      account: "Nordic Logistics Group",
      stakeholderType: "External Customer",
      stakeholderName: "Premium Logistics Customers",
      stakeholderRole: "Enterprise clients",
      outcomeStatement: "Gain real-time visibility into multimodal shipments",
      linkedObjective: "OBJ-004",
      linkedValueStream: "VS-101",
      linkedAPIServices: "API-101",
      successMetricName: "Customer Satisfaction (NPS)",
      baselineValue: 34,
      currentValue: 52,
      targetValue: 60,
      unit: "NPS",
      improvementPercent: 52.9,
      targetAchievementPercent: 60.0,
      measurementMethod: "Quarterly NPS survey",
      lastMeasured: "2024-10-15",
      measurementFrequency: "Quarterly",
      status: "On Track",
    },
    {
      outcomeId: "OUT-102",
      account: "Nordic Logistics Group",
      stakeholderType: "Executive Leadership",
      stakeholderName: "Jonas Nilsson",
      stakeholderRole: "Chief Sustainability Officer",
      outcomeStatement: "Deliver accurate emissions reporting for CSRD compliance",
      linkedObjective: "OBJ-005",
      linkedValueStream: "VS-102",
      linkedAPIServices: "API-102",
      successMetricName: "Emissions Data Coverage",
      baselineValue: 55,
      currentValue: 68,
      targetValue: 90,
      unit: "percent",
      improvementPercent: 23.6,
      targetAchievementPercent: 48.3,
      measurementMethod: "Monthly ESG data quality audit",
      lastMeasured: "2024-10-31",
      measurementFrequency: "Monthly",
      status: "Needs Attention",
    },
    {
      outcomeId: "OUT-201",
      account: "HealthTech Solutions",
      stakeholderType: "External Customer",
      stakeholderName: "Patients",
      stakeholderRole: "Primary care patients",
      outcomeStatement: "Access personalized care plans through a unified portal",
      linkedObjective: "OBJ-006",
      linkedValueStream: "VS-201",
      linkedAPIServices: "API-201",
      successMetricName: "Portal Satisfaction Score",
      baselineValue: 6.2,
      currentValue: 7.6,
      targetValue: 8.5,
      unit: "score (1-10)",
      improvementPercent: 22.6,
      targetAchievementPercent: 64.0,
      measurementMethod: "Patient satisfaction survey",
      lastMeasured: "2024-10-28",
      measurementFrequency: "Quarterly",
      status: "On Track",
    },
    {
      outcomeId: "OUT-202",
      account: "HealthTech Solutions",
      stakeholderType: "Internal Business Unit",
      stakeholderName: "Clinical Operations",
      stakeholderRole: "Care Coordinators",
      outcomeStatement: "Reduce manual effort to identify high-risk patients",
      linkedObjective: "OBJ-007",
      linkedValueStream: "VS-202",
      linkedAPIServices: "API-202",
      successMetricName: "Time to Assemble Care Plan (hrs)",
      baselineValue: 10,
      currentValue: 6,
      targetValue: 4,
      unit: "hours",
      improvementPercent: 40.0,
      targetAchievementPercent: 66.7,
      measurementMethod: "Weekly operations dashboard",
      lastMeasured: "2024-10-20",
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
  const referenceDate = new Date();

  const engagementSeed = [
    {
      engagementId: "ENG-001",
      account: "Acme Financial Services",
      engagementDate: "2024-10-28",
      engagementType: "QBR - Quarterly Business Review",
      attendeesVendor: "Sarah Chen (CSM), Marcus Johnson (SA)",
      attendeesCustomer:
        "Emily Carter (CFO), Erik Svensson (CTO), Lars Pedersen (Integration Lead), Maria Hansen (Head of Claims)",
      customerSeniority: "C-Level + VP",
      topicsDiscussed: "Q3 progress review, Phase 2 roadmap, API performance metrics, ROI tracking",
      actionItems:
        "1) Schedule architecture review for Phase 2\n2) Provide API analytics dashboard access\n3) Plan training for claims team",
      sentiment: "Positive",
      strategicAlignmentScore: 9,
      technicalHealthScore: 8,
      relationshipDepthScore: 9,
      nextSteps: "Follow up on training schedule, review Phase 2 proposal by Nov 15",
      cadenceDays: 30,
      notes: "Customer pleased with Phase 1 progress; exploring regulatory automation acceleration.",
    },
    {
      engagementId: "ENG-002",
      account: "Acme Financial Services",
      engagementDate: "2024-11-05",
      engagementType: "Technical Workshop",
      attendeesVendor: "Marcus Johnson (SA)",
      attendeesCustomer: "Lars Pedersen (Integration Lead), Development Team (4 people)",
      customerSeniority: "Technical Team",
      topicsDiscussed: "API error handling patterns, retry logic, circuit breaker implementation",
      actionItems: "1) Share best practices documentation\n2) Review error handling code",
      sentiment: "Neutral",
      strategicAlignmentScore: 7,
      technicalHealthScore: 7,
      relationshipDepthScore: 8,
      nextSteps: "Code review session scheduled for Nov 12",
      cadenceDays: 30,
      notes: "Team needs guidance on production readiness and monitoring strategy.",
    },
    {
      engagementId: "ENG-101",
      account: "Nordic Logistics Group",
      engagementDate: "2024-10-22",
      engagementType: "Executive Sponsor Call",
      attendeesVendor: "Sarah Chen (CSM), David Nguyen (Exec Sponsor)",
      attendeesCustomer: "Anna Bergström (VP Technology), Jonas Nilsson (CSO)",
      customerSeniority: "Executive Leadership",
      topicsDiscussed: "Visibility roadmap, carbon reporting acceleration, partner API delays",
      actionItems: "1) Escalate carrier API limits\n2) Kick off carbon data remediation plan",
      sentiment: "Positive",
      strategicAlignmentScore: 8,
      technicalHealthScore: 7,
      relationshipDepthScore: 8,
      nextSteps: "Follow up with carrier API vendor by Nov 05",
      cadenceDays: 45,
      notes: "Exec team engaged; sustainability reporting is board-level priority.",
    },
    {
      engagementId: "ENG-102",
      account: "Nordic Logistics Group",
      engagementDate: "2024-11-04",
      engagementType: "Health Check",
      attendeesVendor: "Marcus Johnson (SA)",
      attendeesCustomer: "Operations leadership (5)",
      customerSeniority: "Director / Manager",
      topicsDiscussed: "Tracking API performance, caching rollout, winter peak readiness",
      actionItems: "1) Deploy caching PoC\n2) Share winter readiness checklist",
      sentiment: "Positive",
      strategicAlignmentScore: 8,
      technicalHealthScore: 8,
      relationshipDepthScore: 7,
      nextSteps: "Validate caching results by Nov 25",
      cadenceDays: 45,
      notes: "Operations team confident, seeking real-time visibility scorecards.",
    },
    {
      engagementId: "ENG-201",
      account: "HealthTech Solutions",
      engagementDate: "2024-10-18",
      engagementType: "Success Plan Review",
      attendeesVendor: "Sarah Chen (CSM), Marcus Johnson (SA)",
      attendeesCustomer: "Dr. Priya Patel (CDO), Clinical ops leads (3)",
      customerSeniority: "VP / Director",
      topicsDiscussed: "Patient portal adoption, clinician training plan, security remediation",
      actionItems: "1) Finalize training curriculum\n2) Schedule security policy refresh workshop",
      sentiment: "Concerned",
      strategicAlignmentScore: 7,
      technicalHealthScore: 6,
      relationshipDepthScore: 7,
      nextSteps: "Deliver training playbook by Nov 10",
      cadenceDays: 60,
      notes: "Adoption risk flagged; leadership expects tangible progress by year-end.",
    },
    {
      engagementId: "ENG-202",
      account: "HealthTech Solutions",
      engagementDate: "2024-11-03",
      engagementType: "Technical Review",
      attendeesVendor: "Marcus Johnson (SA)",
      attendeesCustomer: "Michael Rivera (VP Clinical Ops), Data Science team",
      customerSeniority: "VP / Technical",
      topicsDiscussed: "Predictive model calibration, integration timelines, data privacy checklist",
      actionItems: "1) Provide model accuracy benchmarks\n2) Align data privacy review",
      sentiment: "Positive",
      strategicAlignmentScore: 8,
      technicalHealthScore: 7,
      relationshipDepthScore: 8,
      nextSteps: "Share benchmarks by Nov 14",
      cadenceDays: 60,
      notes: "Momentum building; privacy review is the remaining gate.",
    },
  ];

  const sampleEngagements = engagementSeed.map((entry) => {
    const { cadenceDays, ...rest } = entry;
    const engagementScore = calculateEngagementScore(
      entry.strategicAlignmentScore,
      entry.technicalHealthScore,
      entry.relationshipDepthScore,
    );
    const cadenceStatus = calculateEngagementCadenceStatus(
      entry.engagementDate,
      cadenceDays,
      referenceDate,
    );
    const nextEngagementDate = calculateNextEngagementDate(entry.engagementDate, cadenceDays);

    return {
      ...rest,
      engagementScore: Number(engagementScore.toFixed(1)),
      cadenceStatus,
      nextEngagementDate: formatDate(nextEngagementDate),
    };
  });

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
      objectivesAddressed: "OBJ-001, OBJ-002, OBJ-003",
      keyInitiatives: "INIT-001 - Claims API Phase 1, INIT-002 - Customer Portal, INIT-003 - Regulatory Data Hub",
      criticalSuccessFactors: "1) Complete Phase 1 UAT by Nov 30\n2) Achieve 99.5% API uptime\n3) Automate regulatory data validation",
      top3Priorities: "1) Phase 1 delivery\n2) API performance optimization\n3) Regulatory data automation",
      top3Risks: "1) RISK-001 - Legacy integration\n2) RISK-002 - Data quality gaps\n3) Resource availability",
      overallHealthScore: 82,
      renewalRiskLevel: "Medium",
      expansionOpportunityUsd: 450000,
      executiveSponsorCustomer: "Emily Carter",
      executiveSponsorVendor: "Sarah Chen",
      nextQBRDate: "2025-01-28",
    },
    {
      successPlanId: "SP-Q1-2025",
      account: "Nordic Logistics Group",
      planPeriod: "Q1 2025",
      planStatus: "Active",
      creationDate: "2024-09-20",
      lastUpdated: "2024-11-07T11:30:00Z",
      objectivesAddressed: "OBJ-004, OBJ-005",
      keyInitiatives: "INIT-101 - Visibility Platform, INIT-102 - ESG Automation",
      criticalSuccessFactors: "1) Carrier API scaling\n2) Carbon data onboarding\n3) Customer adoption of visibility portal",
      top3Priorities: "1) Resolve carrier throttling\n2) Launch carbon dashboards\n3) Prepare winter readiness plan",
      top3Risks: "1) RISK-101 - Carrier rate limits\n2) RISK-102 - Incomplete emissions data\n3) Integration resource constraints",
      overallHealthScore: 88,
      renewalRiskLevel: "Low",
      expansionOpportunityUsd: 610000,
      executiveSponsorCustomer: "Anna Bergström",
      executiveSponsorVendor: "David Nguyen",
      nextQBRDate: "2025-02-11",
    },
    {
      successPlanId: "SP-H1-2025",
      account: "HealthTech Solutions",
      planPeriod: "FY2025 H1",
      planStatus: "Active",
      creationDate: "2024-10-05",
      lastUpdated: "2024-11-05T16:20:00Z",
      objectivesAddressed: "OBJ-006, OBJ-007",
      keyInitiatives: "INIT-201 - Patient 360 Rollout, INIT-202 - Readmission Prediction",
      criticalSuccessFactors: "1) Clinician enablement complete\n2) Security remediation closed\n3) Data privacy approvals",
      top3Priorities: "1) Improve portal adoption\n2) Finalize predictive model\n3) Launch clinician training program",
      top3Risks: "1) RISK-201 - FHIR security gaps\n2) RISK-202 - Adoption lag\n3) Change management bandwidth",
      overallHealthScore: 74,
      renewalRiskLevel: "Medium",
      expansionOpportunityUsd: 380000,
      executiveSponsorCustomer: "Dr. Priya Patel",
      executiveSponsorVendor: "Sarah Chen",
      nextQBRDate: "2025-04-18",
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
      taskType: "QBR Preparation",
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
      taskType: "Documentation",
      priority: "Medium",
      status: "Open",
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
      taskType: "Health Check",
      priority: "High",
      status: "Open",
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
      taskId: "TASK-101",
      account: "Nordic Logistics Group",
      taskTitle: "Implement API Caching Layer",
      taskDescription: "Deploy caching solution to mitigate carrier rate limiting during peak hours",
      taskType: "Health Check",
      priority: "Critical",
      status: "In Progress",
      assignedTo: "Marcus Johnson",
      createdBy: "Sarah Chen",
      createdDate: "2024-10-26T11:45:00Z",
      dueDate: "2024-11-25",
      daysUntilDue: 16,
      completedDate: "",
      linkedEngagement: "ENG-102",
      linkedInitiative: "INIT-101",
      linkedRisk: "RISK-101",
      notes: "Coordinate with caching vendor and carrier technical team.",
    },
    {
      taskId: "TASK-102",
      account: "Nordic Logistics Group",
      taskTitle: "Finalize Carbon Data Vendor Integration",
      taskDescription: "Align connectivity requirements and testing plan with carbon accounting vendor",
      taskType: "Initiative Planning",
      priority: "High",
      status: "Open",
      assignedTo: "Sarah Chen",
      createdBy: "Anna Bergström",
      createdDate: "2024-11-01T10:10:00Z",
      dueDate: "2024-12-08",
      daysUntilDue: 29,
      completedDate: "",
      linkedEngagement: "ENG-101",
      linkedInitiative: "INIT-102",
      linkedRisk: "RISK-102",
      notes: "Await vendor security review; schedule integration kickoff.",
    },
    {
      taskId: "TASK-201",
      account: "HealthTech Solutions",
      taskTitle: "Deliver Clinician Training Playbook",
      taskDescription: "Create enablement materials to drive adoption of patient portal and predictive dashboards",
      taskType: "Training",
      priority: "High",
      status: "In Progress",
      assignedTo: "Sarah Chen",
      createdBy: "Sarah Chen",
      createdDate: "2024-10-20T13:20:00Z",
      dueDate: "2024-11-10",
      daysUntilDue: 1,
      completedDate: "",
      linkedEngagement: "ENG-201",
      linkedInitiative: "INIT-201",
      linkedRisk: "RISK-202",
      notes: "Co-develop with clinical ops team, incorporate change management guidance.",
    },
    {
      taskId: "TASK-202",
      account: "HealthTech Solutions",
      taskTitle: "Run Security Policy Refresh Workshop",
      taskDescription: "Review FHIR security gaps and agree on automated enforcement approach",
      taskType: "Risk Mitigation",
      priority: "Critical",
      status: "Open",
      assignedTo: "Marcus Johnson",
      createdBy: "Sarah Chen",
      createdDate: "2024-10-24T09:05:00Z",
      dueDate: "2024-11-22",
      daysUntilDue: 13,
      completedDate: "",
      linkedEngagement: "ENG-201",
      linkedInitiative: "INIT-201",
      linkedRisk: "RISK-201",
      notes: "Include security architect and compliance lead.",
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
  attendeesVendor?: string,
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
    attendeesVendor,
    attendeesCustomer,
    customerSeniority,
    topicsDiscussed,
    actionItems,
    sentiment,
    strategicAlignmentScore,
    technicalHealthScore,
    relationshipDepthScore,
    engagementScore: Number(engagementScore.toFixed(1)),
    cadenceStatus,
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

// ===========================================================================
// SYNC FUNCTION 15: VIEW_TEMPLATES
// ===========================================================================

export async function syncViewTemplates(
  params: [],
  context: coda.ExecutionContext
): Promise<coda.SyncFormulaResult> {
  const viewTemplates = [
    {
      viewId: "VIEW-001",
      viewName: "CSM Command Center",
      description: "Executive dashboard showing all accounts with health scores, renewal dates, and engagement status",
      targetTable: "AccountMaster",
      viewType: "Dashboard",
      filterCriteria: "All accounts",
      sortBy: "Health Score (ascending), Days to Renewal (ascending)",
      groupBy: "CSM",
      columnsToShow: "Account Name, Health Score, Risk Level, ARR, Days to Renewal, Renewal Date, Last Engagement Date, Next Engagement Date",
      hiddenColumns: "Contract Start Date, Contract End Date, Industry Sub-Sector, SP Rating, Customer Revenue, Employee Count, Geography, Primary Contact Role, Created Date, Last Modified",
      colorRules: "Health Score: <60 Red, 60-79 Yellow, 80+ Green | Risk Level: High=Red, Medium=Yellow, Low=Green | Days to Renewal: <90 Orange",
      useCase: "Daily CSM view for account oversight and prioritization",
      setupInstructions: "1. Insert AccountMaster table\n2. Group by 'CSM' column\n3. Sort by Health Score ascending, then Days to Renewal ascending\n4. Hide non-essential columns\n5. Add conditional formatting: Health Score (<60 red, 60-79 yellow, 80+ green)",
      refreshFrequency: "Real-time (manual updates)",
      targetAudience: "CSMs, CS Leadership",
    },
    {
      viewId: "VIEW-002",
      viewName: "Strategic Objectives Board",
      description: "Kanban-style view of strategic objectives grouped by status with progress tracking",
      targetTable: "StrategicObjectives",
      viewType: "Kanban Board",
      filterCriteria: "All objectives",
      sortBy: "Progress Percent (descending), Target Date (ascending)",
      groupBy: "Status",
      columnsToShow: "Account, Objective Name, Strategic Pillar, Progress %, Business Value, Target Date, Business Owner, Status",
      hiddenColumns: "Description, Quantified Goal, MuleSoft Relevance, Last Review Date, Notes, Linked Capabilities, Linked Value Streams, Linked Initiatives",
      colorRules: "Status: Planning=Gray, In Progress=Blue, On Hold=Orange, Completed=Green | Progress %: <30 Red, 30-69 Yellow, 70+ Green",
      useCase: "Strategic alignment meetings and QBR preparation",
      setupInstructions: "1. Insert StrategicObjectives table\n2. Group by 'Status' column (creates Kanban lanes)\n3. Sort by Progress % descending, then Target Date ascending\n4. Show card-style layout with Account, Objective Name, Progress %, Business Value\n5. Color code by status and progress",
      refreshFrequency: "Weekly update during 1:1s",
      targetAudience: "CSMs, Customer Executives, MuleSoft Leadership",
    },
    {
      viewId: "VIEW-003",
      viewName: "Health Dashboard",
      description: "Multi-table health monitoring view combining account health, platform metrics, and risks",
      targetTable: "Multiple (AccountMaster + PlatformHealthMetrics + RiskRegister)",
      viewType: "Dashboard (Multi-table)",
      filterCriteria: "Health Score < 80 OR Risk Level = High OR Platform Health Status = Critical",
      sortBy: "Health Score ascending",
      groupBy: "Risk Level",
      columnsToShow: "Account Name, Health Score, Risk Level, Platform Uptime %, API Response Time, Active Risks, Mitigation Status",
      hiddenColumns: "Most non-critical fields",
      colorRules: "Health Score: <60 Red, 60-79 Yellow, 80+ Green | Risk Level: High=Red, Medium=Yellow, Low=Green | Platform metrics below threshold=Red",
      useCase: "Weekly health reviews and escalation identification",
      setupInstructions: "1. Create a new page/section\n2. Insert AccountMaster table (filtered: Health Score < 80)\n3. Below it, insert PlatformHealthMetrics table (same accounts, Status=Critical or Acceptable)\n4. Below that, insert RiskRegister table (same accounts, Status=Active)\n5. Use cross-table lookups to show aggregated health indicators",
      refreshFrequency: "Weekly during team sync",
      targetAudience: "CSMs, Solutions Architects, Support Engineers",
    },
    {
      viewId: "VIEW-004",
      viewName: "QBR Preparation View",
      description: "Quarterly Business Review prep showing objectives, initiatives, ROI, and engagement summary for a single account",
      targetTable: "Multiple (per account filter)",
      viewType: "Report (Single Account)",
      filterCriteria: "Filter all tables by Account = [Selected Account]",
      sortBy: "Various per table",
      groupBy: "None (single account view)",
      columnsToShow: "Account Context, Strategic Objectives (with progress), Initiatives (with ROI), Value Streams (business value), Recent Engagements, Top 3 Risks, Success Plan Summary",
      hiddenColumns: "Technical details, internal notes",
      colorRules: "Progress indicators: On Track=Green, At Risk=Yellow, Delayed=Red",
      useCase: "30 days before QBR - assemble all account context for presentation",
      setupInstructions: "1. Create a new page titled '[Account Name] QBR - [Quarter]'\n2. Add filter: Account = [Account Name] (applies to all tables on page)\n3. Section 1: Business Context (1 row from BusinessContext)\n4. Section 2: Strategic Objectives (StrategicObjectives table, sort by Business Value desc)\n5. Section 3: Initiatives & ROI (Initiatives table, show ROI columns)\n6. Section 4: Value Delivered (ValueStreams table, show business value metrics)\n7. Section 5: Recent Engagements (EngagementLog, last 90 days)\n8. Section 6: Risks & Mitigation (RiskRegister, active risks only)\n9. Section 7: Success Plan Summary (SuccessPlanTracker, current quarter)",
      refreshFrequency: "Updated 2 weeks before QBR, finalized 3 days before",
      targetAudience: "CSMs (primary), Account Executives, Solutions Architects",
    },
    {
      viewId: "VIEW-005",
      viewName: "Renewal Risk Pipeline",
      description: "Focused view of accounts with renewals in next 180 days, sorted by risk level and days to renewal",
      targetTable: "AccountMaster + SuccessPlanTracker + RiskRegister",
      viewType: "Pipeline",
      filterCriteria: "Days to Renewal <= 180",
      sortBy: "Risk Level (High first), Days to Renewal (ascending)",
      groupBy: "Risk Level",
      columnsToShow: "Account Name, Days to Renewal, Renewal Date, ARR, Health Score, Risk Level, Renewal Risk Level, Expansion Opportunity, Top 3 Risks, Next QBR Date, CSM",
      hiddenColumns: "Most historical and metadata fields",
      colorRules: "Days to Renewal: <60 Red, 60-90 Orange, 91-180 Yellow | Risk Level: High=Red, Medium=Yellow, Low=Green",
      useCase: "Weekly renewal pipeline reviews and executive reporting",
      setupInstructions: "1. Insert AccountMaster table\n2. Filter: Days to Renewal <= 180\n3. Group by 'Risk Level' (creates High/Medium/Low sections)\n4. Sort within groups: Days to Renewal ascending (most urgent first)\n5. Join SuccessPlanTracker data (Renewal Risk Level, Expansion Opportunity)\n6. Join RiskRegister data (count of active risks, display top 3)\n7. Color code: Days to Renewal (<60 red, 60-90 orange, 91-180 yellow)\n8. Add calculated column: 'Renewal Quarter' using formula",
      refreshFrequency: "Daily during renewal season, weekly otherwise",
      targetAudience: "CSMs, CS Leadership, Sales Leadership",
    },
  ];

  return { result: viewTemplates };
}

// ===========================================================================
// SYNC FUNCTION 16: QUICK_START_GUIDE
// ===========================================================================

export async function syncQuickStartGuide(
  params: [],
  context: coda.ExecutionContext
): Promise<coda.SyncFormulaResult> {
  const quickStartSteps = [
    {
      stepNumber: 1,
      stepTitle: "🚀 Initial Setup - Add Quick Start Guide",
      pageToCreate: "Getting Started",
      tablesToAdd: "QuickStartGuide (this table)",
      tableSettings: "No configuration needed",
      detailedInstructions:
        "1. You're already here! This is Step 1.\n" +
        "2. Read through all steps to understand the full setup\n" +
        "3. Follow steps 2-6 in order to build your workspace\n" +
        "4. Each step adds a new page with pre-configured tables\n" +
        "5. Estimated total setup time: 15-20 minutes",
      expectedOutcome: "You'll have a complete CSM Intelligence Platform workspace with 5 pages and 15 tables",
      proTips:
        "💡 Keep this guide page for reference\n" +
        "💡 You can work through setup over multiple sessions\n" +
        "💡 Sample data is included - you can clear it later",
      estimatedTime: "5 min (reading)",
      difficulty: "Easy",
      videoLink: "",
    },
    {
      stepNumber: 2,
      stepTitle: "📊 Create Command Center Page",
      pageToCreate: "🎯 Command Center",
      tablesToAdd: "AccountMaster, ActivitiesTasks",
      tableSettings:
        "AccountMaster:\n" +
        "- Group by: customerSuccessManager\n" +
        "- Sort: healthScore (↑), daysToRenewal (↑)\n" +
        "- Hide: contractStartDate, contractEndDate, createdDate, lastModified\n" +
        "- Color: healthScore <60=Red, 60-79=Yellow, 80+=Green\n\n" +
        "ActivitiesTasks:\n" +
        "- Filter: status = 'Pending' OR 'In Progress'\n" +
        "- Sort: dueDate (↑)\n" +
        "- Group by: assignedTo",
      detailedInstructions:
        "1. Create a new page: '🎯 Command Center'\n" +
        "2. Add section header: 'Account Overview'\n" +
        "3. Insert → Table → CSM Intelligence Platform → AccountMaster\n" +
        "4. Click table options (⋮) → Group → Select 'customerSuccessManager'\n" +
        "5. Click Sort → Add sort → healthScore ascending, then daysToRenewal ascending\n" +
        "6. Right-click column headers → Hide unwanted columns (see table settings)\n" +
        "7. Click table → Conditional formatting → Add rules for health scores\n" +
        "8. Add section header below: 'My Tasks'\n" +
        "9. Insert → Table → CSM Intelligence Platform → ActivitiesTasks\n" +
        "10. Apply filters and grouping (see table settings)",
      expectedOutcome: "Daily dashboard showing all accounts grouped by CSM with color-coded health scores and active tasks",
      proTips:
        "💡 Pin this page for daily access\n" +
        "💡 Add a 'My Accounts' filter to see only your accounts\n" +
        "💡 Use table settings icon to save this as a view",
      estimatedTime: "5 min",
      difficulty: "Easy",
      videoLink: "",
    },
    {
      stepNumber: 3,
      stepTitle: "🎯 Create Strategic Objectives Board",
      pageToCreate: "📊 Strategic Board",
      tablesToAdd: "StrategicObjectives, Initiatives",
      tableSettings:
        "StrategicObjectives:\n" +
        "- Layout: Kanban board view\n" +
        "- Group by: status (creates swim lanes)\n" +
        "- Sort: progressPercent (↓), targetDate (↑)\n" +
        "- Card display: objectiveName, account, progressPercent, businessValue\n" +
        "- Color: status (Planning=Gray, In Progress=Blue, Completed=Green)\n\n" +
        "Initiatives:\n" +
        "- Filter: status != 'Completed'\n" +
        "- Sort: priority, threeYearROIPercent (↓)\n" +
        "- Highlight: ROI > 500%",
      detailedInstructions:
        "1. Create a new page: '📊 Strategic Board'\n" +
        "2. Insert → Table → StrategicObjectives\n" +
        "3. Change layout: Click Layout button → Board view\n" +
        "4. Group by 'status' - this creates Kanban lanes\n" +
        "5. Customize cards: Click ... → Customize → Select fields to show\n" +
        "6. Add conditional formatting for status colors\n" +
        "7. Below board, add section: 'Active Initiatives'\n" +
        "8. Insert → Table → Initiatives\n" +
        "9. Filter out completed initiatives\n" +
        "10. Add conditional formatting to highlight high-ROI initiatives",
      expectedOutcome: "Kanban board of strategic objectives across all accounts with linked initiatives",
      proTips:
        "💡 Drag cards between lanes to update status\n" +
        "💡 Click card to see full details\n" +
        "💡 Use 'Filter by selection' to focus on one account",
      estimatedTime: "4 min",
      difficulty: "Medium",
      videoLink: "",
    },
    {
      stepNumber: 4,
      stepTitle: "🏥 Create Health Dashboard",
      pageToCreate: "🏥 Health Dashboard",
      tablesToAdd: "AccountMaster, PlatformHealthMetrics, RiskRegister",
      tableSettings:
        "AccountMaster (At-Risk):\n" +
        "- Filter: healthScore < 80 OR riskLevel = 'High'\n" +
        "- Sort: healthScore (↑)\n" +
        "- Show: accountName, healthScore, riskLevel, arr, customerSuccessManager, lastEngagementDate\n\n" +
        "PlatformHealthMetrics:\n" +
        "- Filter: healthStatus = 'Critical' OR 'Acceptable'\n" +
        "- Group by: account\n\n" +
        "RiskRegister:\n" +
        "- Filter: status contains 'Active'\n" +
        "- Sort: riskScore (↓)",
      detailedInstructions:
        "1. Create a new page: '🏥 Health Dashboard'\n" +
        "2. Add section: 'At-Risk Accounts'\n" +
        "3. Insert → AccountMaster table\n" +
        "4. Filter: healthScore < 80 OR riskLevel = 'High'\n" +
        "5. Add section: 'Platform Metrics Needing Attention'\n" +
        "6. Insert → PlatformHealthMetrics table\n" +
        "7. Filter for Critical/Acceptable status\n" +
        "8. Add section: 'Active Risks'\n" +
        "9. Insert → RiskRegister table\n" +
        "10. Filter for active risks, sort by risk score",
      expectedOutcome: "Multi-section health monitoring dashboard showing accounts, metrics, and risks needing attention",
      proTips:
        "💡 Review this weekly in team sync\n" +
        "💡 Add formula at top: AccountMaster.Filter(healthScore<60).Count()\n" +
        "💡 Set up weekly email automation for at-risk accounts",
      estimatedTime: "4 min",
      difficulty: "Medium",
      videoLink: "",
    },
    {
      stepNumber: 5,
      stepTitle: "📈 Create QBR Preparation Page",
      pageToCreate: "📈 QBR Prep - [Account Name]",
      tablesToAdd: "All tables (filtered by selected account)",
      tableSettings:
        "Page-level filter:\n" +
        "- Add control: Dropdown with all account names\n" +
        "- Filter ALL tables by: account = [Selected Account]\n\n" +
        "Add these tables in order:\n" +
        "1. AccountMaster (1 row)\n" +
        "2. BusinessContext (1 row)\n" +
        "3. StrategicObjectives (sorted by businessValue)\n" +
        "4. Initiatives (show ROI columns)\n" +
        "5. ValueStreams (show business value)\n" +
        "6. EngagementLog (last 90 days)\n" +
        "7. RiskRegister (active only)\n" +
        "8. SuccessPlanTracker (current quarter)",
      detailedInstructions:
        "1. Create a new page: '📈 QBR Prep - Template'\n" +
        "2. At top, add a Control: Insert → Control → Dropdown\n" +
        "3. Name it: 'Select Account'\n" +
        "4. Options: Select from 'AccountMaster.accountName'\n" +
        "5. Apply page filter: Filter → Add page filter → account = [Select Account control]\n" +
        "6. Add section headers and tables as listed in Table Settings\n" +
        "7. Each table will automatically filter to show only the selected account\n" +
        "8. Customize which columns to show for each table\n" +
        "9. Add text sections between tables for QBR notes",
      expectedOutcome: "Single-account deep-dive page that shows all data for the selected account - perfect for QBR prep",
      proTips:
        "💡 Duplicate this page for each upcoming QBR\n" +
        "💡 Update 2 weeks before QBR, finalize 3 days before\n" +
        "💡 Export as PDF to share with customer",
      estimatedTime: "6 min",
      difficulty: "Advanced",
      videoLink: "",
    },
    {
      stepNumber: 6,
      stepTitle: "🔄 Create Renewal Pipeline",
      pageToCreate: "🔄 Renewal Pipeline",
      tablesToAdd: "AccountMaster, SuccessPlanTracker",
      tableSettings:
        "AccountMaster:\n" +
        "- Filter: daysToRenewal <= 180\n" +
        "- Group by: riskLevel (High → Medium → Low)\n" +
        "- Sort within groups: daysToRenewal (↑)\n" +
        "- Show: accountName, daysToRenewal, renewalDate, arr, healthScore, riskLevel, customerSuccessManager\n" +
        "- Color: daysToRenewal <60=Red, 60-90=Orange, 91-180=Yellow\n\n" +
        "Add calculated column:\n" +
        "- Name: 'Renewal Quarter'\n" +
        "- Formula: If(daysToRenewal<=90, 'This Q', If(daysToRenewal<=180, 'Next Q', 'Future'))",
      detailedInstructions:
        "1. Create a new page: '🔄 Renewal Pipeline'\n" +
        "2. Add metrics section at top with these formulas:\n" +
        "   - Total ARR at Risk: AccountMaster.Filter(riskLevel='High').Sum(arr)\n" +
        "   - Accounts renewing this quarter: AccountMaster.Filter(daysToRenewal<=90).Count()\n" +
        "3. Insert → AccountMaster table\n" +
        "4. Filter: daysToRenewal <= 180\n" +
        "5. Group by: riskLevel\n" +
        "6. Sort: daysToRenewal ascending (most urgent first)\n" +
        "7. Add column: Click + → Formula → Create 'Renewal Quarter' column\n" +
        "8. Add conditional formatting for days to renewal\n" +
        "9. Insert SuccessPlanTracker below to show expansion opportunities",
      expectedOutcome: "Renewal pipeline view showing next 180 days of renewals, grouped by risk, with expansion tracking",
      proTips:
        "💡 Review daily during renewal season\n" +
        "💡 Share with Sales leadership weekly\n" +
        "💡 Set up alerts for renewals < 60 days",
      estimatedTime: "5 min",
      difficulty: "Medium",
      videoLink: "",
    },
    {
      stepNumber: 7,
      stepTitle: "✅ Final Setup - Add Remaining Tables",
      pageToCreate: "📚 Data Tables (optional reference page)",
      tablesToAdd: "PeopleTeam, PlatformCapabilities, APIPortfolio, StakeholderOutcomes, ViewTemplates",
      tableSettings: "Add these tables to a reference page for data management:\n" +
        "- PeopleTeam: Team roster\n" +
        "- PlatformCapabilities: Capability tracking\n" +
        "- APIPortfolio: API catalog\n" +
        "- StakeholderOutcomes: Outcome tracking\n" +
        "- ViewTemplates: View configuration guide",
      detailedInstructions:
        "1. Create a new page: '📚 Data Tables'\n" +
        "2. This is your reference/admin page\n" +
        "3. Add each table listed with minimal configuration\n" +
        "4. Use this page to manage:\n" +
        "   - Team roster updates\n" +
        "   - Capability assessments\n" +
        "   - API health tracking\n" +
        "   - Stakeholder outcome metrics\n" +
        "5. ViewTemplates table provides additional view setup guidance\n" +
        "6. You can hide this page from main navigation if desired",
      expectedOutcome: "Reference page with all remaining data tables for ongoing data management",
      proTips:
        "💡 Only CS Ops needs access to this page\n" +
        "💡 Hide from main navigation: Page options → Hide\n" +
        "💡 Use ViewTemplates for additional view ideas",
      estimatedTime: "3 min",
      difficulty: "Easy",
      videoLink: "",
    },
    {
      stepNumber: 8,
      stepTitle: "🎉 Setup Complete! Next Steps",
      pageToCreate: "N/A - You're done!",
      tablesToAdd: "All 15 tables are now in your workspace",
      tableSettings: "Your workspace is complete!",
      detailedInstructions:
        "🎉 Congratulations! Your CSM Intelligence Platform is ready.\n\n" +
        "Next Steps:\n" +
        "1. ✅ Clear sample data or edit it to match your accounts\n" +
        "2. ✅ Import your real account data\n" +
        "3. ✅ Invite your CS team members\n" +
        "4. ✅ Set up automations (email reports, task reminders)\n" +
        "5. ✅ Customize health score thresholds for your business\n" +
        "6. ✅ Create team-specific views (by region, product, etc.)\n" +
        "7. ✅ Set up weekly review cadence\n\n" +
        "Training Resources:\n" +
        "- Command Center: Daily CSM workflow\n" +
        "- Strategic Board: Monthly objective reviews\n" +
        "- Health Dashboard: Weekly team sync\n" +
        "- QBR Prep: Quarterly business reviews\n" +
        "- Renewal Pipeline: Weekly renewal standup",
      expectedOutcome: "Fully functional CSM Intelligence Platform workspace with all 5 core pages and 15 data tables",
      proTips:
        "🏆 You've built a professional CSM workspace!\n" +
        "📊 Start with Command Center for daily use\n" +
        "📈 Schedule your first QBR in 2 weeks\n" +
        "🔄 Review renewal pipeline weekly\n" +
        "💡 Customize and iterate based on team feedback",
      estimatedTime: "Ongoing",
      difficulty: "N/A",
      videoLink: "",
    },
  ];

  return { result: quickStartSteps };
}
