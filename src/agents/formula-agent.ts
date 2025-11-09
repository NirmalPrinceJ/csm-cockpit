import * as coda from "@codahq/packs-sdk";

/**
 * FORMULA AGENT: Calculated Fields and Business Logic
 *
 * Responsible for:
 * - All formula implementations (no external calculations)
 * - Business logic calculations
 * - Composite scoring algorithms
 * - Financial calculations (ROI, payback, etc.)
 * - Risk assessment formulas
 * - Performance metrics
 */

export function setupFormulas(pack: coda.PackDefinitionBuilder) {

  // ============================================================================
  // ACCOUNT MASTER FORMULAS
  // ============================================================================

  // Days to Renewal Formula
  pack.addFormula({
    name: "Calculate_Days_to_Renewal",
    description: "Calculate days until contract renewal",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.Date,
        name: "renewalDate",
        description: "Contract renewal date"
      })
    ],
    resultType: coda.ValueType.Number,
    execute: async function ([renewalDate]) {
      if (!renewalDate) return null;
      const today = new Date();
      const renewal = new Date(renewalDate);
      const diffTime = renewal.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
  });

  // Health Score Composite Calculation
  pack.addFormula({
    name: "Calculate_Account_Health_Score",
    description: "Calculate composite account health score (0-100)",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "platformHealth",
        description: "Platform technical health score (0-100)"
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "businessValue",
        description: "Business value realization score (0-100)"
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "engagement",
        description: "Stakeholder engagement score (0-100)"
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "strategicAlignment",
        description: "Strategic alignment score (0-100)"
      })
    ],
    resultType: coda.ValueType.Number,
    execute: async function ([platformHealth, businessValue, engagement, strategicAlignment]) {
      // Health Score = (Platform × 0.35) + (Business Value × 0.30) + (Engagement × 0.20) + (Strategic Alignment × 0.15)
      const weights = { platformHealth: 0.35, businessValue: 0.30, engagement: 0.20, strategicAlignment: 0.15 };
      const score = (platformHealth * weights.platformHealth) +
                   (businessValue * weights.businessValue) +
                   (engagement * weights.engagement) +
                   (strategicAlignment * weights.strategicAlignment);
      return Math.round(Math.max(0, Math.min(100, score)));
    }
  });

  // ============================================================================
  // PLATFORM CAPABILITIES FORMULAS
  // ============================================================================

  // Maturity Gap Calculation
  pack.addFormula({
    name: "Calculate_Maturity_Gap",
    description: "Calculate maturity gap between current and target levels",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "currentMaturity",
        description: "Current maturity level"
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "targetMaturity",
        description: "Target maturity level"
      })
    ],
    resultType: coda.ValueType.Number,
    execute: async function ([currentMaturity, targetMaturity]) {
      const maturityLevels = {
        "Initial (1)": 1,
        "Developing (2)": 2,
        "Defined (3)": 3,
        "Managed (4)": 4,
        "Optimizing (5)": 5
      };

      const current = maturityLevels[currentMaturity] || 1;
      const target = maturityLevels[targetMaturity] || 1;

      return target - current;
    }
  });

  // ============================================================================
  // VALUE STREAM FORMULAS
  // ============================================================================

  // Time Reduction Percentage
  pack.addFormula({
    name: "Calculate_Time_Reduction_Percent",
    description: "Calculate percentage reduction in cycle time",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "baselineTime",
        description: "Baseline cycle time"
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "currentTime",
        description: "Current cycle time"
      })
    ],
    resultType: coda.ValueType.Number,
    execute: async function ([baselineTime, currentTime]) {
      if (!baselineTime || !currentTime || baselineTime === 0) return 0;
      const reduction = ((baselineTime - currentTime) / baselineTime) * 100;
      return Math.round(reduction * 100) / 100; // Round to 2 decimal places
    }
  });

  // Annual Cost Savings
  pack.addFormula({
    name: "Calculate_Annual_Cost_Savings",
    description: "Calculate annual cost savings from process improvements",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "costBefore",
        description: "Cost per transaction before"
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "costAfter",
        description: "Cost per transaction after"
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "annualVolume",
        description: "Annual transaction volume"
      })
    ],
    resultType: coda.ValueType.Number,
    execute: async function ([costBefore, costAfter, annualVolume]) {
      if (!costBefore || !costAfter || !annualVolume) return 0;
      const savings = (costBefore - costAfter) * annualVolume;
      return Math.round(savings * 100) / 100; // Round to 2 decimal places
    }
  });

  // ============================================================================
  // API PORTFOLIO FORMULAS
  // ============================================================================

  // SLA Compliance Percentage
  pack.addFormula({
    name: "Calculate_SLA_Compliance",
    description: "Calculate SLA compliance percentage",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "avgResponseTime",
        description: "Average response time (ms)"
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "slaTarget",
        description: "SLA target (ms)"
      })
    ],
    resultType: coda.ValueType.Number,
    execute: async function ([avgResponseTime, slaTarget]) {
      if (!avgResponseTime || !slaTarget) return 100;
      if (avgResponseTime <= slaTarget) return 100;
      const compliance = 100 - ((avgResponseTime - slaTarget) / slaTarget * 100);
      return Math.max(0, Math.round(compliance * 100) / 100);
    }
  });

  // Annual Transaction Volume
  pack.addFormula({
    name: "Calculate_Annual_Transaction_Volume",
    description: "Calculate annual transaction volume from monthly data",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "monthlyTransactions",
        description: "Monthly transaction count"
      })
    ],
    resultType: coda.ValueType.Number,
    execute: async function ([monthlyTransactions]) {
      if (!monthlyTransactions) return 0;
      return monthlyTransactions * 12;
    }
  });

  // Business Value Score
  pack.addFormula({
    name: "Calculate_Business_Value_Score",
    description: "Calculate business value score for APIs",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "monthlyTransactions",
        description: "Monthly transactions"
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "consumingApplications",
        description: "Number of consuming applications"
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "slaCompliance",
        description: "SLA compliance percentage"
      })
    ],
    resultType: coda.ValueType.Number,
    execute: async function ([monthlyTransactions, consumingApplications, slaCompliance]) {
      if (!monthlyTransactions || !consumingApplications || !slaCompliance) return 0;
      // Formula: (Monthly Transactions / 1000) × Consuming Applications × SLA Compliance
      const normalizedTransactions = monthlyTransactions / 1000;
      const score = normalizedTransactions * consumingApplications * (slaCompliance / 100);
      return Math.round(score * 100) / 100;
    }
  });

  // API Health Status
  pack.addFormula({
    name: "Determine_API_Health_Status",
    description: "Determine API health status based on metrics",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "uptimePercent",
        description: "Uptime percentage"
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "errorRatePercent",
        description: "Error rate percentage"
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "slaCompliancePercent",
        description: "SLA compliance percentage"
      })
    ],
    resultType: coda.ValueType.String,
    execute: async function ([uptimePercent, errorRatePercent, slaCompliancePercent]) {
      if (!uptimePercent || !errorRatePercent || !slaCompliancePercent) return "Unknown";

      if (uptimePercent < 99.5 || errorRatePercent > 1) {
        return "Critical";
      } else if (slaCompliancePercent < 95) {
        return "Degraded";
      } else {
        return "Healthy";
      }
    }
  });

  // ============================================================================
  // PLATFORM HEALTH METRICS FORMULAS
  // ============================================================================

  // Health Status Determination
  pack.addFormula({
    name: "Calculate_Health_Status",
    description: "Calculate health status based on current value vs targets",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "currentValue",
        description: "Current metric value"
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "targetValue",
        description: "Target value"
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "warningThreshold",
        description: "Warning threshold"
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "criticalThreshold",
        description: "Critical threshold"
      })
    ],
    resultType: coda.ValueType.String,
    execute: async function ([currentValue, targetValue, warningThreshold, criticalThreshold]) {
      if (!currentValue || !targetValue) return "Unknown";

      // If we have 95% of target value, consider it "On Track"
      if (currentValue >= targetValue * 0.95) {
        return "On Track";
      } else if (currentValue >= warningThreshold) {
        return "Needs Attention";
      } else {
        return "Critical";
      }
    }
  });

  // Trend Direction
  pack.addFormula({
    name: "Calculate_Trend_Direction",
    description: "Determine trend direction from 30-day change",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "changeValue",
        description: "30-day change value"
      })
    ],
    resultType: coda.ValueType.String,
    execute: async function ([changeValue]) {
      if (changeValue === null || changeValue === undefined) return "→"; // Stable
      if (changeValue > 0) return "↑"; // Increasing
      if (changeValue < 0) return "↓"; // Decreasing
      return "→"; // Stable
    }
  });

  // ============================================================================
  // INITIATIVES FORMULAS
  // ============================================================================

  // Days Overdue
  pack.addFormula({
    name: "Calculate_Days_Overdue",
    description: "Calculate days overdue for initiatives",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.Date,
        name: "actualCompletion",
        description: "Actual completion date"
      }),
      coda.makeParameter({
        type: coda.ParameterType.Date,
        name: "targetCompletion",
        description: "Target completion date"
      })
    ],
    resultType: coda.ValueType.Number,
    execute: async function ([actualCompletion, targetCompletion]) {
      if (!targetCompletion) return 0;
      if (actualCompletion) return 0; // Already completed

      const today = new Date();
      const target = new Date(targetCompletion);
      const diffTime = today.getTime() - target.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      return Math.max(0, diffDays); // Only return positive values (overdue)
    }
  });

  // Expected Payback Period (Months)
  pack.addFormula({
    name: "Calculate_Payback_Period",
    description: "Calculate expected payback period in months",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "investmentAmount",
        description: "Total investment amount"
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "annualBenefit",
        description: "Expected annual benefit"
      })
    ],
    resultType: coda.ValueType.Number,
    execute: async function ([investmentAmount, annualBenefit]) {
      if (!investmentAmount || !annualBenefit || annualBenefit === 0) return 0;
      const monthlyBenefit = annualBenefit / 12;
      const months = investmentAmount / monthlyBenefit;
      return Math.round(months * 100) / 100;
    }
  });

  // 3-Year ROI Percentage
  pack.addFormula({
    name: "Calculate_3_Year_ROI",
    description: "Calculate 3-year ROI percentage",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "investmentAmount",
        description: "Total investment amount"
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "annualBenefit",
        description: "Expected annual benefit"
      })
    ],
    resultType: coda.ValueType.Number,
    execute: async function ([investmentAmount, annualBenefit]) {
      if (!investmentAmount || !annualBenefit) return 0;
      const threeYearBenefit = annualBenefit * 3;
      const roi = ((threeYearBenefit - investmentAmount) / investmentAmount) * 100;
      return Math.round(roi * 100) / 100;
    }
  });

  // ============================================================================
  // RISK REGISTER FORMULAS
  // ============================================================================

  // Risk Score Calculation
  pack.addFormula({
    name: "Calculate_Risk_Score",
    description: "Calculate risk score from impact and probability",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "impactScore",
        description: "Impact score (1-5)"
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "probabilityScore",
        description: "Probability score (1-5)"
      })
    ],
    resultType: coda.ValueType.Number,
    execute: async function ([impactScore, probabilityScore]) {
      if (!impactScore || !probabilityScore) return 0;
      return impactScore * probabilityScore;
    }
  });

  // Risk Level Determination
  pack.addFormula({
    name: "Determine_Risk_Level",
    description: "Determine risk level from risk score",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "riskScore",
        description: "Risk score"
      })
    ],
    resultType: coda.ValueType.String,
    execute: async function ([riskScore]) {
      if (!riskScore) return "Low";
      if (riskScore >= 20) return "Critical";
      if (riskScore >= 12) return "High";
      if (riskScore >= 6) return "Medium";
      return "Low";
    }
  });

  // ============================================================================
  // STAKEHOLDER OUTCOMES FORMULAS
  // ============================================================================

  // Improvement Percentage
  pack.addFormula({
    name: "Calculate_Improvement_Percent",
    description: "Calculate improvement percentage",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "currentValue",
        description: "Current value"
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "baselineValue",
        description: "Baseline value"
      })
    ],
    resultType: coda.ValueType.Number,
    execute: async function ([currentValue, baselineValue]) {
      if (!currentValue || !baselineValue || baselineValue === 0) return 0;
      const improvement = ((currentValue - baselineValue) / baselineValue) * 100;
      return Math.round(improvement * 100) / 100;
    }
  });

  // Target Achievement Percentage
  pack.addFormula({
    name: "Calculate_Target_Achievement",
    description: "Calculate target achievement percentage",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "currentValue",
        description: "Current value"
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "baselineValue",
        description: "Baseline value"
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "targetValue",
        description: "Target value"
      })
    ],
    resultType: coda.ValueType.Number,
    execute: async function ([currentValue, baselineValue, targetValue]) {
      if (!currentValue || !baselineValue || !targetValue) return 0;
      if (targetValue === baselineValue) return 100; // Avoid division by zero

      const achievement = ((currentValue - baselineValue) / (targetValue - baselineValue)) * 100;
      return Math.round(Math.max(0, Math.min(100, achievement)) * 100) / 100;
    }
  });

  // Outcome Status
  pack.addFormula({
    name: "Determine_Outcome_Status",
    description: "Determine outcome status from achievement percentage",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "achievementPercent",
        description: "Target achievement percentage"
      })
    ],
    resultType: coda.ValueType.String,
    execute: async function ([achievementPercent]) {
      if (!achievementPercent) return "Needs Attention";
      if (achievementPercent >= 100) return "Achieved";
      if (achievementPercent >= 75) return "On Track";
      return "Needs Attention";
    }
  });

  console.log("Formula Agent: All business logic formulas implemented with complete calculation logic");
}
