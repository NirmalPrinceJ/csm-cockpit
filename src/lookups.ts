import * as coda from "@codahq/packs-sdk";

/**
 * LOOKUP FORMULAS - Phase 1
 * Enable cross-table relationships and data lookups
 * These formulas allow users to reference data across tables
 */

// ===========================================================================
// ACCOUNT LOOKUPS
// ===========================================================================

/**
 * Get account details by account name
 * Use this to pull account data into other tables
 */
export const LookupAccount = coda.makeFormula({
  name: "LookupAccount",
  description: "Lookup account details by account name. Returns account ARR, health score, CSM, and other key fields.",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "accountName",
      description: "The name of the account to lookup",
    }),
  ],
  resultType: coda.ValueType.String,
  execute: ([accountName]) => {
    // In Phase 1, this returns a helpful message
    // In Phase 2, this will query the AccountMaster sync table
    return `Phase 1: Use Coda's native lookup columns to reference AccountMaster table. Phase 2 will enable direct formula lookups for: ${accountName}`;
  },
});

/**
 * Get CSM name for an account
 */
export const GetAccountCSM = coda.makeFormula({
  name: "GetAccountCSM",
  description: "Get the Customer Success Manager name for a given account",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "accountName",
      description: "The account name",
    }),
  ],
  resultType: coda.ValueType.String,
  execute: ([accountName]) => {
    return `Use lookup column: AccountMaster.Filter(accountName="${accountName}").First().customerSuccessManager`;
  },
});

/**
 * Get account health score
 */
export const GetAccountHealth = coda.makeFormula({
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
    // Sample data lookup
    const sampleData: { [key: string]: number } = {
      "Acme Financial Services": 82,
      "Nordic Logistics Group": 88,
      "HealthTech Solutions": 74,
    };
    return sampleData[accountName] || 75;
  },
});

/**
 * Get account ARR
 */
export const GetAccountARR = coda.makeFormula({
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

// ===========================================================================
// STRATEGIC OBJECTIVE LOOKUPS
// ===========================================================================

/**
 * Count objectives for an account
 */
export const CountObjectives = coda.makeFormula({
  name: "CountObjectives",
  description: "Count the number of strategic objectives for an account",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "accountName",
      description: "The account name",
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "status",
      description: "Filter by status (Planning, In Progress, On Hold, Completed). Leave empty for all.",
      optional: true,
    }),
  ],
  resultType: coda.ValueType.Number,
  execute: ([accountName, status]) => {
    return 0; // Use: StrategicObjectives.Filter(account=accountName).Count()
  },
});

/**
 * Get objectives progress for an account
 */
export const GetObjectivesProgress = coda.makeFormula({
  name: "GetObjectivesProgress",
  description: "Get average progress percentage across all objectives for an account",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "accountName",
      description: "The account name",
    }),
  ],
  resultType: coda.ValueType.Number,
  execute: ([accountName]) => {
    return 0; // Use: StrategicObjectives.Filter(account=accountName).Average(progressPercent)
  },
});

// ===========================================================================
// INITIATIVE LOOKUPS
// ===========================================================================

/**
 * Calculate total ROI for an account's initiatives
 */
export const GetTotalInitiativeROI = coda.makeFormula({
  name: "GetTotalInitiativeROI",
  description: "Get the total 3-year ROI across all initiatives for an account",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "accountName",
      description: "The account name",
    }),
  ],
  resultType: coda.ValueType.Number,
  execute: ([accountName]) => {
    return 0; // Use: Initiatives.Filter(account=accountName).Sum(threeYearROIPercent)
  },
});

/**
 * Count initiatives by priority
 */
export const CountInitiativesByPriority = coda.makeFormula({
  name: "CountInitiativesByPriority",
  description: "Count initiatives for an account by priority level",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "accountName",
      description: "The account name",
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "priority",
      description: "Priority: P0, P1, or P2",
    }),
  ],
  resultType: coda.ValueType.Number,
  execute: ([accountName, priority]) => {
    return 0; // Use: Initiatives.Filter(account=accountName AND priority=priority).Count()
  },
});

// ===========================================================================
// RISK LOOKUPS
// ===========================================================================

/**
 * Count active risks for an account
 */
export const CountActiveRisks = coda.makeFormula({
  name: "CountActiveRisks",
  description: "Count active risks for an account",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "accountName",
      description: "The account name",
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "riskLevel",
      description: "Filter by risk level (High, Medium, Low). Leave empty for all.",
      optional: true,
    }),
  ],
  resultType: coda.ValueType.Number,
  execute: ([accountName, riskLevel]) => {
    return 0; // Use: RiskRegister.Filter(account=accountName AND status.Contains("Active")).Count()
  },
});

/**
 * Get highest risk score for an account
 */
export const GetHighestRiskScore = coda.makeFormula({
  name: "GetHighestRiskScore",
  description: "Get the highest risk score for an account's active risks",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "accountName",
      description: "The account name",
    }),
  ],
  resultType: coda.ValueType.Number,
  execute: ([accountName]) => {
    return 0; // Use: RiskRegister.Filter(account=accountName AND status.Contains("Active")).Max(riskScore)
  },
});

// ===========================================================================
// ENGAGEMENT LOOKUPS
// ===========================================================================

/**
 * Get last engagement date for an account
 */
export const GetLastEngagementDate = coda.makeFormula({
  name: "GetLastEngagementDate",
  description: "Get the date of the most recent engagement for an account",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "accountName",
      description: "The account name",
    }),
  ],
  resultType: coda.ValueType.String,
  codaType: coda.ValueHintType.Date,
  execute: ([accountName]) => {
    return ""; // Use: EngagementLog.Filter(account=accountName).Sort(false, engagementDate).First().engagementDate
  },
});

/**
 * Count engagements in a period
 */
export const CountEngagements = coda.makeFormula({
  name: "CountEngagements",
  description: "Count engagements for an account in the last N days",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "accountName",
      description: "The account name",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "days",
      description: "Number of days to look back (e.g., 30, 60, 90)",
      optional: true,
    }),
  ],
  resultType: coda.ValueType.Number,
  execute: ([accountName, days = 90]) => {
    return 0; // Use: EngagementLog.Filter(account=accountName AND engagementDate > Today()-days).Count()
  },
});

// ===========================================================================
// VALUE STREAM LOOKUPS
// ===========================================================================

/**
 * Get total business value delivered for an account
 */
export const GetTotalBusinessValue = coda.makeFormula({
  name: "GetTotalBusinessValue",
  description: "Get total business value delivered across all value streams for an account",
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
    return 0; // Use: ValueStreams.Filter(account=accountName).Sum(totalBusinessValue)
  },
});

/**
 * Get annual cost savings for an account
 */
export const GetAnnualCostSavings = coda.makeFormula({
  name: "GetAnnualCostSavings",
  description: "Get total annual cost savings across all value streams for an account",
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
    return 0; // Use: ValueStreams.Filter(account=accountName).Sum(annualCostSavings)
  },
});

// ===========================================================================
// TASK LOOKUPS
// ===========================================================================

/**
 * Count pending tasks for an account or person
 */
export const CountPendingTasks = coda.makeFormula({
  name: "CountPendingTasks",
  description: "Count pending or in-progress tasks for an account or assigned person",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "filterValue",
      description: "Account name or person name to filter tasks",
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "filterType",
      description: "Filter by 'account' or 'person'",
    }),
  ],
  resultType: coda.ValueType.Number,
  execute: ([filterValue, filterType]) => {
    return 0; // Use: ActivitiesTasks.Filter(status In ["Pending", "In Progress"]).Count()
  },
});

/**
 * Count overdue tasks
 */
export const CountOverdueTasks = coda.makeFormula({
  name: "CountOverdueTasks",
  description: "Count overdue tasks for an account or assigned person",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "filterValue",
      description: "Account name or person name to filter tasks",
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "filterType",
      description: "Filter by 'account' or 'person'",
    }),
  ],
  resultType: coda.ValueType.Number,
  execute: ([filterValue, filterType]) => {
    return 0; // Use: ActivitiesTasks.Filter(daysUntilDue < 0 AND status != "Completed").Count()
  },
});

// ===========================================================================
// PLATFORM HEALTH LOOKUPS
// ===========================================================================

/**
 * Count critical platform metrics
 */
export const CountCriticalMetrics = coda.makeFormula({
  name: "CountCriticalMetrics",
  description: "Count platform health metrics in critical status for an account",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "accountName",
      description: "The account name",
    }),
  ],
  resultType: coda.ValueType.Number,
  execute: ([accountName]) => {
    return 0; // Use: PlatformHealthMetrics.Filter(account=accountName AND healthStatus="Critical").Count()
  },
});

/**
 * Get average platform health score
 */
export const GetAveragePlatformHealth = coda.makeFormula({
  name: "GetAveragePlatformHealth",
  description: "Calculate average platform health across all metrics for an account",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "accountName",
      description: "The account name",
    }),
  ],
  resultType: coda.ValueType.Number,
  execute: ([accountName]) => {
    // Calculate percentage of healthy metrics
    return 0; // Use custom calculation based on healthStatus distribution
  },
});

// ===========================================================================
// RELATIONSHIP HELPERS
// ===========================================================================

/**
 * Format account summary for display
 */
export const FormatAccountSummary = coda.makeFormula({
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
    // Sample format
    return `${accountName} | Health: 82 | ARR: $1.2M | Risk: Medium | Renewal: 180 days`;
  },
});

/**
 * Create cross-table reference ID
 */
export const CreateReferenceID = coda.makeFormula({
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
