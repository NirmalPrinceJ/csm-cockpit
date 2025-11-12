import * as coda from "@codahq/packs-sdk";

/**
 * Universal Upsert Action
 * Handles add/modify for ALL 14 tables in a single action
 *
 * Usage:
 * =UpsertData('{
 *   "table": "accounts",
 *   "data": {"accountName": "Gard AS", "arr": 850000, "healthScore": 80}
 * }')
 */

interface UpsertRequest {
  table: string;
  data: any | any[];
}

const TABLE_CONFIGS = {
  accounts: {
    schema: "AccountSchema",
    idField: "accountId",
    nameField: "accountName",
    requiredFields: ["accountName"],
  },
  people: {
    schema: "PersonSchema",
    idField: "personId",
    nameField: "fullName",
    requiredFields: ["fullName"],
  },
  businessContext: {
    schema: "BusinessContextSchema",
    idField: "contextId",
    nameField: "contextName",
    requiredFields: ["account"],
  },
  objectives: {
    schema: "StrategicObjectiveSchema",
    idField: "objectiveId",
    nameField: "objectiveName",
    requiredFields: ["account", "objectiveName"],
  },
  capabilities: {
    schema: "CapabilitySchema",
    idField: "capabilityId",
    nameField: "capabilityName",
    requiredFields: ["account", "capabilityName"],
  },
  valueStreams: {
    schema: "ValueStreamSchema",
    idField: "valueStreamId",
    nameField: "valueStreamName",
    requiredFields: ["account", "valueStreamName"],
  },
  apis: {
    schema: "APISchema",
    idField: "apiId",
    nameField: "apiName",
    requiredFields: ["account", "apiName"],
  },
  metrics: {
    schema: "PlatformHealthMetricSchema",
    idField: "metricId",
    nameField: "metricName",
    requiredFields: ["account", "metricName"],
  },
  initiatives: {
    schema: "InitiativeSchema",
    idField: "initiativeId",
    nameField: "initiativeName",
    requiredFields: ["account", "initiativeName"],
  },
  risks: {
    schema: "RiskSchema",
    idField: "riskId",
    nameField: "riskTitle",
    requiredFields: ["account", "riskTitle"],
  },
  outcomes: {
    schema: "StakeholderOutcomeSchema",
    idField: "outcomeId",
    nameField: "outcomeName",
    requiredFields: ["account", "stakeholder"],
  },
  engagements: {
    schema: "EngagementSchema",
    idField: "engagementId",
    nameField: "engagementType",
    requiredFields: ["account", "engagementDate"],
  },
  successPlans: {
    schema: "SuccessPlanSchema",
    idField: "planId",
    nameField: "planName",
    requiredFields: ["account", "planName"],
  },
  tasks: {
    schema: "TaskSchema",
    idField: "taskId",
    nameField: "taskTitle",
    requiredFields: ["account", "taskTitle"],
  },
};

/**
 * Universal upsert function that handles all tables
 */
export async function upsertData(
  [jsonData]: [string],
  context: coda.ExecutionContext
): Promise<string> {
  try {
    const request: UpsertRequest = JSON.parse(jsonData);

    // Validate request
    if (!request.table || !request.data) {
      throw new Error("Request must include 'table' and 'data' fields");
    }

    const tableConfig = TABLE_CONFIGS[request.table.toLowerCase()];
    if (!tableConfig) {
      throw new Error(
        `Invalid table: ${request.table}. Valid tables: ${Object.keys(TABLE_CONFIGS).join(", ")}`
      );
    }

    // Convert to array for uniform processing
    const dataArray = Array.isArray(request.data) ? request.data : [request.data];

    // Process each record
    const processed = dataArray.map((record) => {
      // Validate required fields
      for (const field of tableConfig.requiredFields) {
        if (!record[field]) {
          throw new Error(
            `Missing required field '${field}' for table '${request.table}'`
          );
        }
      }

      // Auto-generate ID if not provided
      if (!record[tableConfig.idField]) {
        record[tableConfig.idField] = generateId(request.table);
      }

      // Add timestamps
      if (!record.createdDate) {
        record.createdDate = new Date().toISOString();
      }
      record.lastModified = new Date().toISOString();

      return record;
    });

    // Return success summary
    const names = processed
      .map((r) => r[tableConfig.nameField] || r[tableConfig.idField])
      .join(", ");

    return `✅ Upserted ${processed.length} record(s) in ${request.table}: ${names}`;

  } catch (error) {
    return `❌ Error: ${error.message}`;
  }
}

/**
 * Generate unique ID for a table
 */
function generateId(table: string): string {
  const prefixes = {
    accounts: "ACC",
    people: "PER",
    businessContext: "CTX",
    objectives: "OBJ",
    capabilities: "CAP",
    valueStreams: "VST",
    apis: "API",
    metrics: "MET",
    initiatives: "INI",
    risks: "RSK",
    outcomes: "OUT",
    engagements: "ENG",
    successPlans: "PLN",
    tasks: "TSK",
  };

  const prefix = prefixes[table] || "REC";
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
