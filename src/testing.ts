import assert from "assert";
import {
  syncAccountMaster,
  syncBusinessContext,
  syncStrategicObjectives,
  syncMuleSoftCapabilities,
  syncValueStreams,
  syncAPIPortfolio,
  syncPlatformHealthMetrics,
  syncInitiatives,
  syncRiskRegister,
  syncStakeholderOutcomes,
  syncEngagementLog,
  syncSuccessPlanTracker,
  syncActivitiesTasks,
} from "./helpers";

async function runSync<T>(fn: (...args: any[]) => Promise<T>): Promise<T> {
  return fn([], {} as any);
}

async function main(): Promise<void> {
  const accountResult = await runSync(syncAccountMaster);
  const accounts = (accountResult as any).result as Record<string, unknown>[];
  assert.ok(accounts.length > 0, "Account_Master should return sample rows");
  const account = accounts[0];
  [
    "customerSuccessManager",
    "accountExecutive",
    "solutionsArchitect",
    "executiveSponsorCustomer",
    "executiveSponsorMuleSoft",
    "customerAnnualRevenue",
    "compositeHealthScore",
    "engagementCadenceStatus",
  ].forEach((field) =>
    assert.ok(field in account, `Account_Master missing field ${field}`),
  );

  const objectives = (await runSync(syncStrategicObjectives) as any).result as Record<string, unknown>[];
  assert.ok(objectives[0].hasOwnProperty("businessValueUsd"), "Strategic_Objectives businessValueUsd missing");
  assert.ok(objectives[0].hasOwnProperty("muleSoftRelevance"), "Strategic_Objectives muleSoftRelevance missing");

  const capabilities = (await runSync(syncMuleSoftCapabilities) as any).result as Record<string, unknown>[];
  assert.ok(capabilities[0].hasOwnProperty("investmentRequiredUsd"), "MuleSoft_Capabilities investmentRequiredUsd missing");

  const valueStreams = (await runSync(syncValueStreams) as any).result as Record<string, unknown>[];
  [
    "annualCostSavingsUsd",
    "revenueImpactUsd",
    "totalBusinessValueUsd",
    "costPerTransactionBeforeUsd",
    "costPerTransactionAfterUsd",
  ].forEach((field) =>
    assert.ok(valueStreams[0].hasOwnProperty(field), `Value_Streams missing field ${field}`),
  );

  const apis = (await runSync(syncAPIPortfolio) as any).result as Record<string, unknown>[];
  assert.ok(apis[0].hasOwnProperty("revenueAttributionUsd"), "API_Portfolio revenueAttributionUsd missing");

  const initiatives = (await runSync(syncInitiatives) as any).result as Record<string, unknown>[];
  [
    "investmentAmountUsd",
    "muleSoftServicesUsd",
    "customerInvestmentUsd",
    "expectedAnnualBenefitUsd",
    "realizedAnnualBenefitUsd",
  ].forEach((field) =>
    assert.ok(initiatives[0].hasOwnProperty(field), `Initiatives missing field ${field}`),
  );

  const risks = (await runSync(syncRiskRegister) as any).result as Record<string, unknown>[];
  assert.ok(risks[0].hasOwnProperty("potentialBusinessImpactUsd"), "Risk_Register potentialBusinessImpactUsd missing");

  const engagements = (await runSync(syncEngagementLog) as any).result as Record<string, unknown>[];
  [
    "engagementScore",
    "cadenceStatus",
    "nextEngagementDate",
  ].forEach((field) =>
    assert.ok(engagements[0].hasOwnProperty(field), `Engagement_Log missing field ${field}`),
  );

  const successPlans = (await runSync(syncSuccessPlanTracker) as any).result as Record<string, unknown>[];
  assert.ok(successPlans[0].hasOwnProperty("expansionOpportunityUsd"), "Success_Plan_Tracker expansionOpportunityUsd missing");

  console.log("All schema sanity checks passed.");
}

main().catch((error) => {
  console.error("Schema sanity checks failed:", error);
  process.exitCode = 1;
});
