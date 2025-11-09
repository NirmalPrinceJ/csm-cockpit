import * as coda from "@codahq/packs-sdk";

function normalizeNumber(value: number | undefined | null): number {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return 0;
  }
  return value;
}

function toDate(value: string | Date | undefined | null): Date | undefined {
  if (!value) {
    return undefined;
  }
  if (value instanceof Date) {
    return value;
  }
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

export function calculateRiskLevel(healthScore?: number, daysToRenewal?: number): string {
  const score = normalizeNumber(healthScore);
  const days = daysToRenewal ?? Number.POSITIVE_INFINITY;

  if (score < 60) {
    return "Critical";
  }
  if (score < 75 && days < 180) {
    return "At Risk";
  }
  if (days < 90) {
    return "At Risk";
  }
  if (score >= 85) {
    return "Excellent";
  }
  return "Healthy";
}

export function calculateDaysToRenewal(renewalDate?: string | Date, today: string | Date | undefined = new Date()): number {
  const renewal = toDate(renewalDate);
  const reference = toDate(today) ?? new Date();
  if (!renewal) {
    return 0;
  }
  const diff = renewal.getTime() - reference.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function calculateMaturityGap(current?: number, target?: number): number {
  return normalizeNumber(target) - normalizeNumber(current);
}

export function calculateGapStatus(gap?: number): string {
  const value = normalizeNumber(gap);
  if (value >= 3) {
    return "🔴 Critical Gap";
  }
  if (value === 2) {
    return "🟡 Moderate Gap";
  }
  if (value === 1) {
    return "🟢 Small Gap";
  }
  return "✅ At Target";
}

export function calculateCycleTimeReduction(baseline?: number, current?: number): number {
  const baselineVal = normalizeNumber(baseline);
  const currentVal = normalizeNumber(current);
  if (baselineVal <= 0) {
    return 0;
  }
  return ((baselineVal - currentVal) / baselineVal) * 100;
}

export function calculateAnnualCostSavings(
  beforeCost?: number,
  afterCost?: number,
  annualVolume?: number,
): number {
  const before = normalizeNumber(beforeCost);
  const after = normalizeNumber(afterCost);
  const volume = normalizeNumber(annualVolume);
  if (before <= 0 || volume <= 0) {
    return 0;
  }
  return (before - after) * volume;
}

export function calculateBusinessValue(totalSavings?: number, revenueImpact?: number): number {
  return normalizeNumber(totalSavings) + normalizeNumber(revenueImpact);
}

export function calculateSlaCompliance(avgMs?: number, targetMs?: number): number {
  const avg = normalizeNumber(avgMs);
  const target = normalizeNumber(targetMs);
  if (avg <= 0 || target <= 0) {
    return 0;
  }
  if (avg <= target) {
    return 100;
  }
  const penalty = ((avg - target) / target) * 100;
  return Math.max(0, 100 - penalty);
}

export function calculateBusinessCriticality(
  uptimePercent?: number,
  revenueUSD?: number,
  monthlyTx?: number,
  consumingApps?: number,
): string {
  const uptime = normalizeNumber(uptimePercent);
  const revenue = normalizeNumber(revenueUSD);
  const transactions = normalizeNumber(monthlyTx);
  const consumers = normalizeNumber(consumingApps);
  if (uptime >= 99.9 || revenue > 1_000_000) {
    return "Mission-Critical";
  }
  if (transactions > 100_000 || consumers > 5) {
    return "High";
  }
  if (transactions > 10_000) {
    return "Medium";
  }
  return "Low";
}

export function calculateBusinessValueScore(
  monthlyTx?: number,
  consumingApps?: number,
  slaPercent?: number,
): number {
  return (
    (normalizeNumber(monthlyTx) / 1_000) *
    normalizeNumber(consumingApps) *
    (normalizeNumber(slaPercent) / 100)
  );
}

export function calculateHealthStatus(
  current?: number,
  target?: number,
  warning?: number,
  critical?: number,
): string {
  const currentVal = normalizeNumber(current);
  const targetVal = normalizeNumber(target);
  const warningVal = normalizeNumber(warning);
  const criticalVal = normalizeNumber(critical);
  if (currentVal >= targetVal * 0.95) {
    return "🟢 On Track";
  }
  if (currentVal >= warningVal) {
    return "🟡 Needs Attention";
  }
  if (currentVal >= criticalVal) {
    return "🔴 Critical";
  }
  return "🔴 Critical";
}

export function calculateRiskScore(impact?: number, probability?: number): number {
  return normalizeNumber(impact) * normalizeNumber(probability);
}

export function calculateRiskLevelFromScore(score?: number): string {
  const value = normalizeNumber(score);
  if (value >= 20) {
    return "Critical";
  }
  if (value >= 12) {
    return "High";
  }
  if (value >= 6) {
    return "Medium";
  }
  return "Low";
}

export function calculateExpectedPayback(investmentUSD?: number, expectedAnnualUSD?: number): number {
  const investment = normalizeNumber(investmentUSD);
  const expected = normalizeNumber(expectedAnnualUSD);
  if (investment <= 0 || expected <= 0) {
    return 0;
  }
  return investment / (expected / 12);
}

export function calculateThreeYearRoi(investmentUSD?: number, expectedAnnualUSD?: number): number {
  const investment = normalizeNumber(investmentUSD);
  const expected = normalizeNumber(expectedAnnualUSD);
  if (investment <= 0 || expected <= 0) {
    return 0;
  }
  return (((expected * 3) - investment) / investment) * 100;
}

export function calculateActualRoi(investmentUSD?: number, realizedAnnualUSD?: number): number {
  const investment = normalizeNumber(investmentUSD);
  const realized = normalizeNumber(realizedAnnualUSD);
  if (investment <= 0 || realized <= 0) {
    return 0;
  }
  return (((realized * 3) - investment) / investment) * 100;
}

export function calculateTargetAchievement(baseline?: number, current?: number, target?: number): number {
  const baselineVal = normalizeNumber(baseline);
  const currentVal = normalizeNumber(current);
  const targetVal = normalizeNumber(target);
  if (targetVal === baselineVal) {
    return 100;
  }
  if (targetVal === 0 && baselineVal === 0) {
    return 0;
  }
  return ((currentVal - baselineVal) / (targetVal - baselineVal)) * 100;
}

export const formulaExecutors = {
  calculateRiskLevel,
  calculateDaysToRenewal,
  calculateMaturityGap,
  calculateGapStatus,
  calculateCycleTimeReduction,
  calculateAnnualCostSavings,
  calculateBusinessValue,
  calculateSlaCompliance,
  calculateBusinessCriticality,
  calculateBusinessValueScore,
  calculateHealthStatus,
  calculateRiskScore,
  calculateRiskLevelFromScore,
  calculateExpectedPayback,
  calculateThreeYearRoi,
  calculateActualRoi,
  calculateTargetAchievement,
};
