import * as coda from "@codahq/packs-sdk";

/**
 * IMPORT ACTIONS - Text/JSON Data Loading
 *
 * These actions allow you to populate tables by pasting JSON/text data.
 * Perfect for:
 * - AI-assisted data entry (Gemini/Claude parsing)
 * - Bulk data imports
 * - Daily updates from external systems
 */

// ===========================================================================
// IMPORT ACTION: ACCOUNT MASTER
// ===========================================================================

export async function importAccountMaster(
  [jsonData]: [string],
  context: coda.ExecutionContext
): Promise<any[]> {
  try {
    // Parse JSON input
    const accounts = JSON.parse(jsonData);
    const accountArray = Array.isArray(accounts) ? accounts : [accounts];

    // Validate and return formatted accounts
    return accountArray.map(account => ({
      accountId: account.accountId || `ACC-${Date.now()}`,
      accountName: account.accountName,
      industryVertical: account.industryVertical || "",
      industrySubSector: account.industrySubSector || "",
      contractType: account.contractType || "",
      contractStartDate: account.contractStartDate || "",
      contractEndDate: account.contractEndDate || "",
      renewalDate: account.renewalDate || "",
      daysToRenewal: account.daysToRenewal || 0,
      arr: account.arr || 0,
      acv: account.acv || 0,
      customerSuccessManager: account.customerSuccessManager || "",
      accountExecutive: account.accountExecutive || "",
      solutionsArchitect: account.solutionsArchitect || "",
      executiveSponsorCustomer: account.executiveSponsorCustomer || "",
      executiveSponsorMuleSoft: account.executiveSponsorMuleSoft || "",
      healthScore: account.healthScore || 75,
      riskLevel: account.riskLevel || "Medium",
      spRating: account.spRating || "",
      customerAnnualRevenue: account.customerAnnualRevenue || 0,
      employeeCount: account.employeeCount || 0,
      geography: account.geography || "",
      primaryContactName: account.primaryContactName || "",
      primaryContactEmail: account.primaryContactEmail || "",
      primaryContactRole: account.primaryContactRole || "",
      platformHealthScore: account.platformHealthScore || 75,
      businessValueRealizationScore: account.businessValueRealizationScore || 75,
      stakeholderEngagementScore: account.stakeholderEngagementScore || 75,
      strategicAlignmentScore: account.strategicAlignmentScore || 75,
      compositeHealthScore: account.compositeHealthScore || 75,
      engagementCadenceTargetDays: account.engagementCadenceTargetDays || 30,
      engagementCadenceStatus: account.engagementCadenceStatus || "On Track",
      lastEngagementDate: account.lastEngagementDate || new Date().toISOString().split('T')[0],
      nextEngagementDate: account.nextEngagementDate || "",
      createdDate: new Date().toISOString(),
      lastModified: new Date().toISOString(),
    }));
  } catch (error) {
    throw new Error(`Failed to parse account data: ${error.message}`);
  }
}

// ===========================================================================
// IMPORT ACTION: PEOPLE TEAM
// ===========================================================================

export async function importPeopleTeam(
  [jsonData]: [string],
  context: coda.ExecutionContext
): Promise<any[]> {
  try {
    const people = JSON.parse(jsonData);
    const peopleArray = Array.isArray(people) ? people : [people];

    return peopleArray.map(person => ({
      personId: person.personId || `P-${Date.now()}`,
      fullName: person.fullName,
      email: person.email || "",
      role: person.role || "CSM",
      department: person.department || "Customer Success",
      region: person.region || "EMEA",
      account: person.account || "",
      activeStatus: person.activeStatus !== undefined ? person.activeStatus : true,
    }));
  } catch (error) {
    throw new Error(`Failed to parse people data: ${error.message}`);
  }
}

// ===========================================================================
// IMPORT ACTION: BUSINESS CONTEXT
// ===========================================================================

export async function importBusinessContext(
  [jsonData]: [string],
  context: coda.ExecutionContext
): Promise<any[]> {
  try {
    const contexts = JSON.parse(jsonData);
    const contextArray = Array.isArray(contexts) ? contexts : [contexts];

    return contextArray.map(ctx => ({
      contextId: ctx.contextId || `CTX-${Date.now()}`,
      account: ctx.account,
      businessModel: ctx.businessModel || "",
      marketPosition: ctx.marketPosition || "",
      operatingEnvironment: ctx.operatingEnvironment || "",
      keyBusinessChallenges: ctx.keyBusinessChallenges || "",
      strategicPrioritiesCurrentYear: ctx.strategicPrioritiesCurrentYear || "",
      digitalMaturity: ctx.digitalMaturity || "Developing",
      itComplexityScore: ctx.itComplexityScore || 5,
      legacySystemCount: ctx.legacySystemCount || 0,
      cloudStrategy: ctx.cloudStrategy || "",
      dataClassification: ctx.dataClassification || "",
      lastUpdated: new Date().toISOString(),
    }));
  } catch (error) {
    throw new Error(`Failed to parse business context data: ${error.message}`);
  }
}

// ===========================================================================
// IMPORT ACTION: STRATEGIC OBJECTIVES
// ===========================================================================

export async function importStrategicObjectives(
  [jsonData]: [string],
  context: coda.ExecutionContext
): Promise<any[]> {
  try {
    const objectives = JSON.parse(jsonData);
    const objectiveArray = Array.isArray(objectives) ? objectives : [objectives];

    return objectiveArray.map(obj => ({
      objectiveId: obj.objectiveId || `OBJ-${Date.now()}`,
      account: obj.account,
      strategicPillar: obj.strategicPillar || "",
      objectiveName: obj.objectiveName,
      description: obj.description || "",
      businessDriver: obj.businessDriver || "",
      quantifiedGoal: obj.quantifiedGoal || "",
      targetDate: obj.targetDate || "",
      businessOwner: obj.businessOwner || "",
      businessValueUsd: obj.businessValueUsd || 0,
      muleSoftRelevance: obj.muleSoftRelevance || "",
      status: obj.status || "Planning",
      progressPercent: obj.progressPercent || 0,
      lastReviewDate: obj.lastReviewDate || new Date().toISOString().split('T')[0],
      notes: obj.notes || "",
      linkedCapabilities: obj.linkedCapabilities || "",
      linkedValueStreams: obj.linkedValueStreams || "",
      linkedInitiatives: obj.linkedInitiatives || "",
    }));
  } catch (error) {
    throw new Error(`Failed to parse strategic objectives data: ${error.message}`);
  }
}

// ===========================================================================
// IMPORT ACTION: INITIATIVES
// ===========================================================================

export async function importInitiatives(
  [jsonData]: [string],
  context: coda.ExecutionContext
): Promise<any[]> {
  try {
    const initiatives = JSON.parse(jsonData);
    const initiativeArray = Array.isArray(initiatives) ? initiatives : [initiatives];

    return initiativeArray.map(init => ({
      initiativeId: init.initiativeId || `INIT-${Date.now()}`,
      account: init.account,
      initiativeName: init.initiativeName,
      description: init.description || "",
      businessDriver: init.businessDriver || "",
      linkedObjectives: init.linkedObjectives || "",
      linkedValueStreams: init.linkedValueStreams || "",
      priority: init.priority || "Medium",
      status: init.status || "Planning",
      startDate: init.startDate || "",
      targetCompletionDate: init.targetCompletionDate || "",
      completedDate: init.completedDate || "",
      investmentUsd: init.investmentUsd || 0,
      expectedBenefitsUsd: init.expectedBenefitsUsd || 0,
      businessValueRealized: init.businessValueRealized || 0,
      threeYearROIPercent: init.threeYearROIPercent || 0,
      actualRoiPercent: init.actualRoiPercent || 0,
      paybackMonths: init.paybackMonths || 0,
      owner: init.owner || "",
      keyOutcomes: init.keyOutcomes || "",
      successCriteria: init.successCriteria || "",
    }));
  } catch (error) {
    throw new Error(`Failed to parse initiatives data: ${error.message}`);
  }
}

// ===========================================================================
// IMPORT ACTION: RISKS
// ===========================================================================

export async function importRisks(
  [jsonData]: [string],
  context: coda.ExecutionContext
): Promise<any[]> {
  try {
    const risks = JSON.parse(jsonData);
    const riskArray = Array.isArray(risks) ? risks : [risks];

    return riskArray.map(risk => ({
      riskId: risk.riskId || `RISK-${Date.now()}`,
      account: risk.account,
      riskTitle: risk.riskTitle,
      riskDescription: risk.riskDescription || "",
      riskCategory: risk.riskCategory || "Technical",
      impactLevel: risk.impactLevel || 3,
      probabilityLevel: risk.probabilityLevel || 3,
      riskScore: risk.riskScore || 9,
      riskLevel: risk.riskLevel || "Medium",
      identifiedDate: risk.identifiedDate || new Date().toISOString().split('T')[0],
      status: risk.status || "Active - Not Started",
      mitigationStrategy: risk.mitigationStrategy || "",
      mitigationOwner: risk.mitigationOwner || "",
      targetResolutionDate: risk.targetResolutionDate || "",
      actualResolutionDate: risk.actualResolutionDate || "",
      notes: risk.notes || "",
    }));
  } catch (error) {
    throw new Error(`Failed to parse risks data: ${error.message}`);
  }
}

// ===========================================================================
// IMPORT ACTION: ENGAGEMENT LOG
// ===========================================================================

export async function importEngagements(
  [jsonData]: [string],
  context: coda.ExecutionContext
): Promise<any[]> {
  try {
    const engagements = JSON.parse(jsonData);
    const engagementArray = Array.isArray(engagements) ? engagements : [engagements];

    return engagementArray.map(eng => ({
      engagementId: eng.engagementId || `ENG-${Date.now()}`,
      account: eng.account,
      engagementDate: eng.engagementDate || new Date().toISOString().split('T')[0],
      engagementType: eng.engagementType || "Check-in",
      sentiment: eng.sentiment || "Positive",
      customerSeniority: eng.customerSeniority || "Manager",
      attendeesMuleSoft: eng.attendeesMuleSoft || "",
      attendeesCustomer: eng.attendeesCustomer || "",
      keyTopicsDiscussed: eng.keyTopicsDiscussed || "",
      actionItems: eng.actionItems || "",
      nextEngagementDate: eng.nextEngagementDate || "",
      nextSteps: eng.nextSteps || "",
      strategicAlignmentScore: eng.strategicAlignmentScore || 7,
      technicalHealthScore: eng.technicalHealthScore || 7,
      relationshipDepthScore: eng.relationshipDepthScore || 7,
      engagementScore: eng.engagementScore || 7,
      notes: eng.notes || "",
    }));
  } catch (error) {
    throw new Error(`Failed to parse engagement data: ${error.message}`);
  }
}

// ===========================================================================
// IMPORT ACTION: CAPABILITIES
// ===========================================================================

export async function importCapabilities(
  [jsonData]: [string],
  context: coda.ExecutionContext
): Promise<any[]> {
  try {
    const capabilities = JSON.parse(jsonData);
    const capArray = Array.isArray(capabilities) ? capabilities : [capabilities];

    return capArray.map(cap => ({
      capabilityId: cap.capabilityId || `CAP-${Date.now()}`,
      account: cap.account,
      capabilityDomain: cap.capabilityDomain || "",
      capabilityName: cap.capabilityName,
      description: cap.description || "",
      currentMaturity: cap.currentMaturity || "Developing",
      targetMaturity: cap.targetMaturity || "Managed",
      currentMaturityNumeric: cap.currentMaturityNumeric || 2,
      targetMaturityNumeric: cap.targetMaturityNumeric || 3,
      maturityGap: cap.maturityGap || 1,
      gapStatus: cap.gapStatus || "Gap",
      linkedObjectives: cap.linkedObjectives || "",
      supportingValueStreams: cap.supportingValueStreams || "",
      investmentRequiredUsd: cap.investmentRequiredUsd || 0,
      priority: cap.priority || "Medium",
      implementationStatus: cap.implementationStatus || "Planning",
      businessImpact: cap.businessImpact || "",
      technicalOwner: cap.technicalOwner || "",
      lastAssessmentDate: cap.lastAssessmentDate || new Date().toISOString().split('T')[0],
    }));
  } catch (error) {
    throw new Error(`Failed to parse capabilities data: ${error.message}`);
  }
}

// ===========================================================================
// IMPORT ACTION: VALUE STREAMS
// ===========================================================================

export async function importValueStreams(
  [jsonData]: [string],
  context: coda.ExecutionContext
): Promise<any[]> {
  try {
    const streams = JSON.parse(jsonData);
    const streamArray = Array.isArray(streams) ? streams : [streams];

    return streamArray.map(stream => ({
      streamId: stream.streamId || `STR-${Date.now()}`,
      account: stream.account,
      valueStreamName: stream.valueStreamName,
      businessProcess: stream.businessProcess,
      processOwner: stream.processOwner || "",
      linkedObjectives: stream.linkedObjectives || "",
      enabledCapabilities: stream.enabledCapabilities || "",
      integrationEndpoints: stream.integrationEndpoints || 0,
      apisConsumed: stream.apisConsumed || 0,
      annualTransactionVolume: stream.annualTransactionVolume || 0,
      cycleTimeBaselineHours: stream.cycleTimeBaselineHours || 0,
      cycleTimeCurrentHours: stream.cycleTimeCurrentHours || 0,
      cycleTimeTargetHours: stream.cycleTimeTargetHours || 0,
      cycleTimeReductionPercent: stream.cycleTimeReductionPercent || 0,
      cycleTimeProgress: stream.cycleTimeProgress || "On Track",
      costPerTransactionBeforeUsd: stream.costPerTransactionBeforeUsd || 0,
      costPerTransactionAfterUsd: stream.costPerTransactionAfterUsd || 0,
      annualCostSavingsUsd: stream.annualCostSavingsUsd || 0,
      revenueImpactUsd: stream.revenueImpactUsd || 0,
      totalBusinessValueUsd: stream.totalBusinessValueUsd || 0,
      customerSatisfactionScore: stream.customerSatisfactionScore || 7,
      operationalRiskLevel: stream.operationalRiskLevel || "Medium",
    }));
  } catch (error) {
    throw new Error(`Failed to parse value streams data: ${error.message}`);
  }
}

// ===========================================================================
// IMPORT ACTION: APIs
// ===========================================================================

export async function importAPIs(
  [jsonData]: [string],
  context: coda.ExecutionContext
): Promise<any[]> {
  try {
    const apis = JSON.parse(jsonData);
    const apiArray = Array.isArray(apis) ? apis : [apis];

    return apiArray.map(api => ({
      apiId: api.apiId || `API-${Date.now()}`,
      account: api.account,
      apiName: api.apiName,
      apiCategory: api.apiCategory || "Process API",
      environment: api.environment || "Production",
      version: api.version || "1.0",
      linkedValueStreams: api.linkedValueStreams || "",
      consumingApplications: api.consumingApplications || 0,
      monthlyTransactions: api.monthlyTransactions || 0,
      averageResponseTimeMs: api.averageResponseTimeMs || 200,
      p95ResponseTimeMs: api.p95ResponseTimeMs || 500,
      slaTargetMs: api.slaTargetMs || 1000,
      slaCompliancePercent: api.slaCompliancePercent || 99,
      uptimePercent: api.uptimePercent || 99.9,
      errorRatePercent: api.errorRatePercent || 0.1,
      businessCriticality: api.businessCriticality || "Medium",
      revenueAttributionUsd: api.revenueAttributionUsd || 0,
      businessValueScore: api.businessValueScore || 7,
      technicalOwner: api.technicalOwner || "",
      businessOwner: api.businessOwner || "",
    }));
  } catch (error) {
    throw new Error(`Failed to parse APIs data: ${error.message}`);
  }
}

// ===========================================================================
// IMPORT ACTION: METRICS
// ===========================================================================

export async function importMetrics(
  [jsonData]: [string],
  context: coda.ExecutionContext
): Promise<any[]> {
  try {
    const metrics = JSON.parse(jsonData);
    const metricArray = Array.isArray(metrics) ? metrics : [metrics];

    return metricArray.map(metric => ({
      metricId: metric.metricId || `MET-${Date.now()}`,
      account: metric.account,
      metricCategory: metric.metricCategory || "Performance",
      metricName: metric.metricName,
      currentValue: metric.currentValue || 0,
      targetValue: metric.targetValue || 0,
      warningThreshold: metric.warningThreshold || 0,
      criticalThreshold: metric.criticalThreshold || 0,
      healthStatus: metric.healthStatus || "Acceptable",
      trend: metric.trend || "Stable",
      lastMeasured: metric.lastMeasured || new Date().toISOString(),
      linkedValueStreams: metric.linkedValueStreams || "",
      linkedAPIs: metric.linkedAPIs || "",
    }));
  } catch (error) {
    throw new Error(`Failed to parse metrics data: ${error.message}`);
  }
}

// ===========================================================================
// IMPORT ACTION: STAKEHOLDER OUTCOMES
// ===========================================================================

export async function importOutcomes(
  [jsonData]: [string],
  context: coda.ExecutionContext
): Promise<any[]> {
  try {
    const outcomes = JSON.parse(jsonData);
    const outcomeArray = Array.isArray(outcomes) ? outcomes : [outcomes];

    return outcomeArray.map(outcome => ({
      outcomeId: outcome.outcomeId || `OUT-${Date.now()}`,
      account: outcome.account,
      outcomeName: outcome.outcomeName,
      stakeholder: outcome.stakeholder || "",
      stakeholderRole: outcome.stakeholderRole || "",
      targetedBusinessOutcome: outcome.targetedBusinessOutcome || "",
      successCriteria: outcome.successCriteria || "",
      baselineValue: outcome.baselineValue || 0,
      currentValue: outcome.currentValue || 0,
      targetValue: outcome.targetValue || 0,
      measurementUnit: outcome.measurementUnit || "",
      targetAchievementPercent: outcome.targetAchievementPercent || 0,
      status: outcome.status || "In Progress",
      linkedObjectives: outcome.linkedObjectives || "",
      linkedInitiatives: outcome.linkedInitiatives || "",
      lastUpdated: new Date().toISOString().split('T')[0],
    }));
  } catch (error) {
    throw new Error(`Failed to parse outcomes data: ${error.message}`);
  }
}

// ===========================================================================
// IMPORT ACTION: SUCCESS PLANS
// ===========================================================================

export async function importSuccessPlans(
  [jsonData]: [string],
  context: coda.ExecutionContext
): Promise<any[]> {
  try {
    const plans = JSON.parse(jsonData);
    const planArray = Array.isArray(plans) ? plans : [plans];

    return planArray.map(plan => ({
      planId: plan.planId || `PLAN-${Date.now()}`,
      account: plan.account,
      planPeriod: plan.planPeriod || "Q1 2025",
      objectives: plan.objectives || "",
      keyInitiatives: plan.keyInitiatives || "",
      successMetrics: plan.successMetrics || "",
      renewalRiskLevel: plan.renewalRiskLevel || "Low",
      expansionOpportunityUsd: plan.expansionOpportunityUsd || 0,
      expansionStrategy: plan.expansionStrategy || "",
      csm: plan.csm || "",
      nextQbrDate: plan.nextQbrDate || "",
      lastReviewDate: plan.lastReviewDate || new Date().toISOString().split('T')[0],
    }));
  } catch (error) {
    throw new Error(`Failed to parse success plans data: ${error.message}`);
  }
}

// ===========================================================================
// IMPORT ACTION: TASKS
// ===========================================================================

export async function importTasks(
  [jsonData]: [string],
  context: coda.ExecutionContext
): Promise<any[]> {
  try {
    const tasks = JSON.parse(jsonData);
    const taskArray = Array.isArray(tasks) ? tasks : [tasks];

    return taskArray.map(task => ({
      taskId: task.taskId || `TASK-${Date.now()}`,
      account: task.account,
      taskTitle: task.taskTitle,
      taskType: task.taskType || "Follow-up",
      priority: task.priority || "Medium",
      status: task.status || "Open",
      assignedTo: task.assignedTo || "",
      dueDate: task.dueDate || "",
      createdDate: task.createdDate || new Date().toISOString().split('T')[0],
      completedDate: task.completedDate || "",
      linkedEngagement: task.linkedEngagement || "",
      linkedInitiative: task.linkedInitiative || "",
      linkedRisk: task.linkedRisk || "",
      notes: task.notes || "",
      createdBy: task.createdBy || "",
    }));
  } catch (error) {
    throw new Error(`Failed to parse tasks data: ${error.message}`);
  }
}

// ===========================================================================
// BATCH IMPORT ACTION - ALL TABLES
// ===========================================================================

export async function batchImportAllTables(
  [jsonData]: [string],
  context: coda.ExecutionContext
): Promise<string> {
  try {
    const data = JSON.parse(jsonData);

    let summary = "📊 Batch Import Summary:\n\n";
    let totalRecords = 0;

    const tables = [
      { key: 'accounts', label: 'Accounts' },
      { key: 'people', label: 'People' },
      { key: 'businessContext', label: 'Business Context' },
      { key: 'objectives', label: 'Strategic Objectives' },
      { key: 'capabilities', label: 'Capabilities' },
      { key: 'valueStreams', label: 'Value Streams' },
      { key: 'apis', label: 'APIs' },
      { key: 'metrics', label: 'Platform Metrics' },
      { key: 'initiatives', label: 'Initiatives' },
      { key: 'risks', label: 'Risks' },
      { key: 'outcomes', label: 'Stakeholder Outcomes' },
      { key: 'engagements', label: 'Engagements' },
      { key: 'successPlans', label: 'Success Plans' },
      { key: 'tasks', label: 'Tasks' },
    ];

    tables.forEach(table => {
      if (data[table.key]) {
        const count = Array.isArray(data[table.key]) ? data[table.key].length : 1;
        summary += `✅ ${table.label}: ${count} record(s)\n`;
        totalRecords += count;
      }
    });

    if (totalRecords === 0) {
      summary += "⚠️ No data found to import\n";
      summary += "\nExpected JSON format:\n";
      summary += "{\n";
      summary += '  "accounts": [...],\n';
      summary += '  "people": [...],\n';
      summary += '  "objectives": [...],\n';
      summary += "  etc.\n";
      summary += "}\n";
    } else {
      summary += `\n📈 Total: ${totalRecords} records ready for import\n`;
    }

    summary += `⏰ Processed at: ${new Date().toISOString()}`;

    return summary;
  } catch (error) {
    throw new Error(`Batch import failed: ${error.message}`);
  }
}
