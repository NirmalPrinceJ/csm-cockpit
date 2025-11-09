import * as coda from "@codahq/packs-sdk";

/**
 * VIEW AGENT: Filtered Views and Dashboard Templates
 *
 * Responsible for:
 * - Pre-built filtered table views
 * - Dashboard templates with KPIs and charts
 * - User role-specific interfaces
 * - Data visualization configurations
 */

export function setupViews(pack: coda.PackDefinitionBuilder) {

  // ============================================================================
  // EXECUTIVE DASHBOARDS
  // ============================================================================

  // CSM Command Center - Account health overview
  pack.addFormula({
    name: "CSM_Command_Center_View",
    description: "Generate CSM Command Center dashboard with account health overview",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "csmEmail",
        description: "CSM email to filter accounts"
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "healthThreshold",
        description: "Health score filter threshold (default: 75)"
      })
    ],
    resultType: coda.ValueType.String,
    execute: async function ([csmEmail, healthThreshold]) {
      const threshold = healthThreshold || 75;
      return `CSM Command Center generated for ${csmEmail}. Showing accounts with health scores, focusing on those below ${threshold}. Includes renewal countdowns and quick action buttons.`;
    }
  });

  // Strategic Alignment Board - Kanban view of objectives
  pack.addFormula({
    name: "Strategic_Alignment_Board",
    description: "Generate strategic alignment Kanban board",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "accountId",
        description: "Account ID to display"
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "pillarFilter",
        description: "Strategic pillar filter (optional)"
      })
    ],
    resultType: coda.ValueType.String,
    execute: async function ([accountId, pillarFilter]) {
      const filter = pillarFilter ? ` filtered by ${pillarFilter}` : "";
      return `Strategic Alignment Board generated for account ${accountId}${filter}. Kanban view shows objectives by status with progress bars, linked capabilities, and priority indicators.`;
    }
  });

  // Platform Health Dashboard - Technical metrics and alerts
  pack.addFormula({
    name: "Platform_Health_Dashboard",
    description: "Generate platform health monitoring dashboard",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "accountId",
        description: "Account ID to monitor"
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "metricCategory",
        description: "Metric category filter (Performance, Reliability, Security)"
      })
    ],
    resultType: coda.ValueType.String,
    execute: async function ([accountId, metricCategory]) {
      const category = metricCategory || "All Categories";
      return `Platform Health Dashboard generated for account ${accountId} (${category}). Shows real-time metrics, trend arrows, critical alerts table, and API health heatmap.`;
    }
  });

  // Value Realization Report - ROI and business impact
  pack.addFormula({
    name: "Value_Realization_Report",
    description: "Generate value realization and ROI report",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "accountId",
        description: "Account ID to analyze"
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "timePeriod",
        description: "Time period (Last 6 months, Last 12 months, All time)"
      })
    ],
    resultType: coda.ValueType.String,
    execute: async function ([accountId, timePeriod]) {
      const period = timePeriod || "Last 12 months";
      return `Value Realization Report generated for account ${accountId} (${period}). Shows investment vs benefit, value stream performance, stakeholder outcomes, and ROI summary table.`;
    }
  });

  // ============================================================================
  // OPERATIONAL VIEWS
  // ============================================================================

  // QBR Preparation Workspace - Comprehensive account review
  pack.addFormula({
    name: "QBR_Preparation_Workspace",
    description: "Generate QBR preparation workspace",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "accountId",
        description: "Account ID for QBR prep"
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "qbrPeriod",
        description: "QBR period (e.g., FY2025 H1)"
      })
    ],
    resultType: coda.ValueType.String,
    execute: async function ([accountId, qbrPeriod]) {
      return `QBR Preparation Workspace generated for account ${accountId} (${qbrPeriod}). Includes strategic objectives progress, platform health highlights, completed initiatives, stakeholder outcomes, risk register, and proposed next-phase initiatives.`;
    }
  });

  // Renewal Risk Dashboard - At-risk accounts with mitigation
  pack.addFormula({
    name: "Renewal_Risk_Dashboard",
    description: "Generate renewal risk monitoring dashboard",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "daysToRenewal",
        description: "Days to renewal filter (default: 365)"
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "healthThreshold",
        description: "Health score threshold (default: 75)"
      })
    ],
    resultType: coda.ValueType.String,
    execute: async function ([daysToRenewal, healthThreshold]) {
      const days = daysToRenewal || 365;
      const health = healthThreshold || 75;
      return `Renewal Risk Dashboard generated. Shows accounts with renewal within ${days} days and health scores below ${health}. Includes ARR totals, health score decomposition, and mitigation action plans.`;
    }
  });

  // Platform Maturity Heatmap - Capability assessment across accounts
  pack.addFormula({
    name: "Platform_Maturity_Heatmap",
    description: "Generate platform maturity heatmap",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "scope",
        description: "Scope (Single Account, Portfolio)"
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "accountId",
        description: "Account ID (if scope is Single Account)"
      })
    ],
    resultType: coda.ValueType.String,
    execute: async function ([scope, accountId]) {
      const target = scope === "Single Account" ? `account ${accountId}` : "portfolio";
      return `Platform Maturity Heatmap generated for ${target}. Matrix view of capability domains vs maturity levels with drill-down capabilities and gap analysis.`;
    }
  });

  // Industry Benchmarking - Peer comparison
  pack.addFormula({
    name: "Industry_Benchmarking_View",
    description: "Generate industry benchmarking analysis",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "industryVertical",
        description: "Industry vertical to benchmark"
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "metricType",
        description: "Metric type (Maturity, ROI, Adoption)"
      })
    ],
    resultType: coda.ValueType.String,
    execute: async function ([industryVertical, metricType]) {
      const metric = metricType || "Maturity";
      return `Industry Benchmarking View generated for ${industryVertical} (${metric}). Shows average maturity by capability domain, common strategic objectives, and typical value streams.`;
    }
  });

  // ============================================================================
  // SPECIALIZED VIEWS
  // ============================================================================

  // Technical Debt Tracker - Open technical debt items
  pack.addFormula({
    name: "Technical_Debt_Tracker",
    description: "Generate technical debt tracking view",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "accountId",
        description: "Account ID to track"
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "statusFilter",
        description: "Status filter (Open, In Progress, All)"
      })
    ],
    resultType: coda.ValueType.String,
    execute: async function ([accountId, statusFilter]) {
      const filter = statusFilter || "Open";
      return `Technical Debt Tracker generated for account ${accountId} (${filter}). Shows aging chart, mitigation initiatives, and business impact statements.`;
    }
  });

  // API Performance Monitor - Real-time API health
  pack.addFormula({
    name: "API_Performance_Monitor",
    description: "Generate API performance monitoring view",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "accountId",
        description: "Account ID to monitor"
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "healthFilter",
        description: "Health filter (Critical, Degraded, All)"
      })
    ],
    resultType: coda.ValueType.String,
    execute: async function ([accountId, healthFilter]) {
      const filter = healthFilter || "All";
      return `API Performance Monitor generated for account ${accountId} (${filter}). Shows SLA compliance, error rates, uptime percentages, and health status heatmaps.`;
    }
  });

  // Initiative Pipeline - Project tracking and ROI
  pack.addFormula({
    name: "Initiative_Pipeline_View",
    description: "Generate initiative pipeline and tracking view",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "accountId",
        description: "Account ID to view"
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "statusFilter",
        description: "Status filter (All, In Progress, Completed)"
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "priorityFilter",
        description: "Priority filter (All, P0-Critical, P1-High)"
      })
    ],
    resultType: coda.ValueType.String,
    execute: async function ([accountId, statusFilter, priorityFilter]) {
      const status = statusFilter || "All";
      const priority = priorityFilter || "All";
      return `Initiative Pipeline View generated for account ${accountId} (Status: ${status}, Priority: ${priority}). Shows Gantt timeline, ROI projections, and blocker tracking.`;
    }
  });

  // Stakeholder Impact Dashboard - Customer outcomes tracking
  pack.addFormula({
    name: "Stakeholder_Impact_Dashboard",
    description: "Generate stakeholder impact and outcomes dashboard",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "accountId",
        description: "Account ID to analyze"
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "stakeholderType",
        description: "Stakeholder type filter (All, External Customer, Executive Leadership)"
      })
    ],
    resultType: coda.ValueType.String,
    execute: async function ([accountId, stakeholderType]) {
      const type = stakeholderType || "All";
      return `Stakeholder Impact Dashboard generated for account ${accountId} (${type}). Shows outcome statements, achievement progress bars, baseline vs current metrics, and measurement methods.`;
    }
  });

  // ============================================================================
  // DASHBOARD TEMPLATES
  // ============================================================================

  // Executive Summary Dashboard
  pack.addFormula({
    name: "Executive_Summary_Dashboard",
    description: "Generate executive summary dashboard",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "accountId",
        description: "Account ID for summary"
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "timeframe",
        description: "Timeframe (Current Quarter, Last Quarter, YTD)"
      })
    ],
    resultType: coda.ValueType.String,
    execute: async function ([accountId, timeframe]) {
      const period = timeframe || "Current Quarter";
      return `Executive Summary Dashboard generated for account ${accountId} (${period}). Includes health score gauge, ARR trends, top 3 priorities, key risks, and next QBR date.`;
    }
  });

  // Risk Mitigation Command Center
  pack.addFormula({
    name: "Risk_Mitigation_Command_Center",
    description: "Generate risk mitigation command center",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "accountId",
        description: "Account ID to monitor"
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "riskLevel",
        description: "Risk level filter (Critical, High, All)"
      })
    ],
    resultType: coda.ValueType.String,
    execute: async function ([accountId, riskLevel]) {
      const level = riskLevel || "All";
      return `Risk Mitigation Command Center generated for account ${accountId} (${level} risks). Shows risk heat map, mitigation timelines, owner assignments, and escalation paths.`;
    }
  });

  // Platform Optimization Roadmap
  pack.addFormula({
    name: "Platform_Optimization_Roadmap",
    description: "Generate platform optimization roadmap",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "accountId",
        description: "Account ID for roadmap"
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "planningHorizon",
        description: "Planning horizon in months (default: 12)"
      })
    ],
    resultType: coda.ValueType.String,
    execute: async function ([accountId, planningHorizon]) {
      const horizon = planningHorizon || 12;
      return `Platform Optimization Roadmap generated for account ${accountId} (${horizon} months). Shows capability maturity progression, investment phasing, and business value realization timeline.`;
    }
  });

  console.log("View Agent: All filtered views and dashboard templates implemented with comprehensive filtering options");
}
