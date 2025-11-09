import { inspect } from "util";

export type ColumnPrimitive =
  | "text"
  | "person"
  | "date"
  | "datetime"
  | "number"
  | "currency"
  | "select"
  | "textarea"
  | "duration"
  | "slider"
  | "percent"
  | "formula"
  | "relation"
  | "multi-relation"
  | "checkbox";

export interface RelationConfig {
  table: string;
  relationship: "one-to-one" | "one-to-many" | "many-to-many";
  displayColumn?: string;
}

export interface ColumnDefinition {
  name: string;
  type: ColumnPrimitive;
  description: string;
  required?: boolean;
  format?: {
    currencyCode?: string;
    min?: number;
    max?: number;
    step?: number;
  };
  picklist?: string[];
  formula?: string;
  relation?: RelationConfig | RelationConfig[];
  notes?: string;
}

export interface TableDefinition {
  id: string;
  displayName: string;
  description: string;
  primaryKey: string;
  displayColumn: string;
  columns: ColumnDefinition[];
  examples?: string[];
}

export interface ViewFilter {
  column: string;
  operator: "=" | "!=" | ">" | "<" | ">=" | "<=" | "contains" | "in" | "not_in" | "between" | "is_blank" | "is_not_blank" | "less_than_days";
  value?: any;
  values?: any[];
  expression?: string;
}

export interface ViewDefinition {
  id: string;
  displayName: string;
  description: string;
  baseTable: string;
  filters?: ViewFilter[];
  sortOrder?: Array<{ column: string; direction: "asc" | "desc" }>;
  groupBy?: string[];
  layout?: "table" | "board" | "dashboard" | "card";
  sections?: string[];
}

export const STRATEGIC_ACCOUNT_TRACKING_TABLES: TableDefinition[] = [
  {
    id: "Account_Master",
    displayName: "Account Master",
    description: "Primary account registry with health, renewal, and ownership metadata.",
    primaryKey: "Account_ID",
    displayColumn: "Account_Name",
    columns: [
      {
        name: "Account_ID",
        type: "text",
        description: "Unique identifier generated from the row ID.",
        required: true,
        notes: "Format: ACC-{RowID}"
      },
      {
        name: "Account_Name",
        type: "text",
        description: "Official account name.",
        required: true
      },
      {
        name: "Industry_Vertical",
        type: "select",
        description: "Primary industry vertical.",
        required: true,
        picklist: ["Maritime", "Financial Services", "Healthcare", "Retail", "Manufacturing", "Energy", "Public Sector"]
      },
      {
        name: "Industry_Sub_Sector",
        type: "text",
        description: "Specific industry sub-sector (e.g., P&I Insurance, Investment Banking)."
      },
      {
        name: "Contract_Type",
        type: "select",
        description: "MuleSoft success plan tier.",
        picklist: ["Signature Success", "Premier Success", "Standard"]
      },
      {
        name: "Contract_Start",
        type: "date",
        description: "Contract start date."
      },
      {
        name: "Contract_End",
        type: "date",
        description: "Contract end date."
      },
      {
        name: "Renewal_Date",
        type: "date",
        description: "Contract renewal date."
      },
      {
        name: "Days_to_Renewal",
        type: "formula",
        description: "Days remaining until renewal.",
        formula: "[Renewal Date] - Today()"
      },
      {
        name: "ARR",
        type: "currency",
        description: "Annual Recurring Revenue (USD).",
        format: { currencyCode: "USD" }
      },
      {
        name: "ACV",
        type: "currency",
        description: "Annual Contract Value (USD).",
        format: { currencyCode: "USD" }
      },
      {
        name: "Customer_Success_Manager",
        type: "person",
        description: "Assigned customer success manager."
      },
      {
        name: "Account_Executive",
        type: "person",
        description: "Assigned account executive."
      },
      {
        name: "Solutions_Architect",
        type: "person",
        description: "Assigned solutions architect."
      },
      {
        name: "Health_Score",
        type: "formula",
        description: "Composite health score (0-100).",
        formula: "(Platform_Technical_Health*0.35)+(Business_Value_Realization*0.30)+(Stakeholder_Engagement*0.20)+(Strategic_Alignment*0.15)",
        notes: "Platform_Technical_Health sourced from Platform Health Metrics; Business_Value_Realization from Stakeholder Outcomes; Stakeholder_Engagement from Engagement logs; Strategic_Alignment from objective statuses."
      },
      {
        name: "Risk_Level",
        type: "formula",
        description: "Renewal risk classification derived from health score.",
        formula: "IF([Health Score] < 60, \"Critical\", IF([Health Score] < 75, \"At Risk\", \"Healthy\"))"
      },
      {
        name: "S_P_Rating",
        type: "text",
        description: "S&P financial rating (for financial services customers)."
      },
      {
        name: "Revenue_Annual",
        type: "currency",
        description: "Customer annual revenue (USD).",
        format: { currencyCode: "USD" }
      },
      {
        name: "Employee_Count",
        type: "number",
        description: "Number of employees."
      },
      {
        name: "Geography",
        type: "select",
        description: "Primary geography served.",
        picklist: ["EMEA", "Americas", "APAC"]
      },
      {
        name: "Primary_Contact",
        type: "person",
        description: "Primary customer contact."
      }
    ],
    examples: [
      "Gard AS (Maritime, Signature Success)",
      "Acme Bank (Financial Services, Premier Success)"
    ]
  },
  {
    id: "Account_Strategic_Context",
    displayName: "Account Strategic Context",
    description: "Business context, operating environment, and digital maturity.",
    primaryKey: "Context_ID",
    displayColumn: "Account",
    columns: [
      { name: "Context_ID", type: "text", description: "Unique identifier.", required: true, notes: "Format: CTX-{RowID}" },
      {
        name: "Account",
        type: "relation",
        description: "Linked account.",
        required: true,
        relation: { table: "Account_Master", relationship: "one-to-one", displayColumn: "Account_Name" }
      },
      { name: "Business_Model", type: "text", description: "Business model (e.g., SaaS, Mutual Insurance, B2B Marketplace)." },
      {
        name: "Market_Position",
        type: "select",
        description: "Market position classification.",
        picklist: ["Market Leader", "Challenger", "Emerging Player"]
      },
      { name: "Operating_Environment", type: "textarea", description: "Geopolitical, regulatory, and competitive dynamics." },
      { name: "Key_Challenges", type: "textarea", description: "Key challenges (markdown supported)." },
      { name: "Strategic_Priorities_Current_Year", type: "textarea", description: "Current-year priorities (bulleted list)." },
      {
        name: "Digital_Maturity",
        type: "select",
        description: "Digital maturity classification.",
        picklist: ["Digital Native", "Transforming", "Traditional"]
      },
      { name: "IT_Complexity_Score", type: "slider", description: "IT complexity (1-10).", format: { min: 1, max: 10, step: 1 } },
      { name: "Legacy_System_Count", type: "number", description: "Count of legacy systems." },
      {
        name: "Cloud_Strategy",
        type: "select",
        description: "Cloud adoption strategy.",
        picklist: ["Cloud-First", "Hybrid", "On-Premise Preferred"]
      },
      {
        name: "Data_Classification",
        type: "select",
        description: "Data sensitivity classification.",
        picklist: ["Highly Regulated", "Standard", "Open"]
      },
      { name: "Last_Updated", type: "datetime", description: "Timestamp of last update." }
    ]
  },
  {
    id: "Strategic_Objectives",
    displayName: "Strategic Objectives",
    description: "Account-specific strategic objectives with quantified goals.",
    primaryKey: "Objective_ID",
    displayColumn: "Objective_Name",
    columns: [
      { name: "Objective_ID", type: "text", description: "Unique identifier.", required: true, notes: "Format: OBJ-{RowID}" },
      {
        name: "Account",
        type: "relation",
        description: "Parent account.",
        required: true,
        relation: { table: "Account_Master", relationship: "one-to-many", displayColumn: "Account_Name" }
      },
      {
        name: "Strategic_Pillar",
        type: "select",
        description: "Strategic pillar classification.",
        picklist: [
          "Revenue Growth",
          "Cost Optimization",
          "Customer Experience",
          "Operational Resilience",
          "Innovation Velocity",
          "Risk Mitigation",
          "Sustainability/ESG",
          "Market Expansion"
        ]
      },
      { name: "Objective_Name", type: "text", description: "Objective title.", required: true },
      { name: "Description", type: "textarea", description: "Detailed objective description." },
      { name: "Business_Driver", type: "text", description: "Business driver motivating the objective." },
      { name: "Quantified_Goal", type: "text", description: "Quantified goal statement (e.g., Reduce quote-to-policy time by 40%)." },
      { name: "Target_Date", type: "date", description: "Target completion date." },
      { name: "Business_Owner", type: "text", description: "Customer-side owner." },
      { name: "Business_Value", type: "currency", description: "Estimated business value ($).", format: { currencyCode: "USD" } },
      {
        name: "MuleSoft_Relevance",
        type: "select",
        description: "MuleSoft relevance classification.",
        picklist: ["Critical Enabler", "Supporting", "Adjacent"]
      },
      {
        name: "Status",
        type: "select",
        description: "Current status.",
        picklist: ["Not Started", "Planning", "In Progress", "At Risk", "Achieved", "Blocked"]
      },
      { name: "Progress_Percent", type: "slider", description: "Completion percentage.", format: { min: 0, max: 100, step: 1 } },
      { name: "Last_Review", type: "date", description: "Last review date." },
      { name: "Notes", type: "textarea", description: "Additional notes." },
      {
        name: "Linked_Capabilities",
        type: "multi-relation",
        description: "Supporting MuleSoft capabilities.",
        relation: { table: "MuleSoft_Platform_Capabilities", relationship: "many-to-many", displayColumn: "Capability_Name" }
      },
      {
        name: "Linked_Value_Streams",
        type: "multi-relation",
        description: "Value streams impacted by this objective.",
        relation: { table: "Value_Stream_Mapping", relationship: "many-to-many", displayColumn: "Value_Stream_Name" }
      }
    ],
    examples: [
      "Managing Geopolitical Volatility → 24/7 War Risk Portal",
      "Digital Client Experience → Insurance Portal (launched Oct 2023)"
    ]
  },
  {
    id: "MuleSoft_Platform_Capabilities",
    displayName: "MuleSoft Platform Capabilities",
    description: "Capability maturity assessments for each account.",
    primaryKey: "Capability_ID",
    displayColumn: "Capability_Name",
    columns: [
      { name: "Capability_ID", type: "text", description: "Unique identifier.", required: true, notes: "Format: CAP-{RowID}" },
      {
        name: "Account",
        type: "relation",
        description: "Parent account.",
        required: true,
        relation: { table: "Account_Master", relationship: "one-to-many", displayColumn: "Account_Name" }
      },
      {
        name: "Capability_Domain",
        type: "select",
        description: "Capability domain classification.",
        picklist: ["Integration", "API Management", "Automation", "Data Governance", "Security", "DevOps", "Analytics"]
      },
      { name: "Capability_Name", type: "text", description: "Capability name.", required: true },
      { name: "Description", type: "textarea", description: "Capability description." },
      {
        name: "Current_Maturity",
        type: "select",
        description: "Current maturity level.",
        picklist: ["Initial (1)", "Developing (2)", "Defined (3)", "Managed (4)", "Optimizing (5)"]
      },
      {
        name: "Target_Maturity",
        type: "select",
        description: "Target maturity level.",
        picklist: ["Initial (1)", "Developing (2)", "Defined (3)", "Managed (4)", "Optimizing (5)"]
      },
      {
        name: "Maturity_Gap",
        type: "formula",
        description: "Calculated maturity gap.",
        formula: "MaturityLevel([Target Maturity]) - MaturityLevel([Current Maturity])",
        notes: "Helper formula converts select values to numeric scale."
      },
      {
        name: "Linked_Strategic_Objectives",
        type: "multi-relation",
        description: "Objectives supported by this capability.",
        relation: { table: "Strategic_Objectives", relationship: "many-to-many", displayColumn: "Objective_Name" }
      },
      {
        name: "Supporting_Value_Streams",
        type: "multi-relation",
        description: "Value streams enabled by the capability.",
        relation: { table: "Value_Stream_Mapping", relationship: "many-to-many", displayColumn: "Value_Stream_Name" }
      },
      { name: "Investment_Required", type: "currency", description: "Estimated investment required (USD).", format: { currencyCode: "USD" } },
      {
        name: "Priority",
        type: "select",
        description: "Capability improvement priority.",
        picklist: ["P0-Critical", "P1-High", "P2-Medium", "P3-Low"]
      },
      {
        name: "Implementation_Status",
        type: "select",
        description: "Implementation status.",
        picklist: ["Not Started", "Planning", "In Progress", "Operational", "Needs Enhancement"]
      },
      { name: "Business_Impact", type: "textarea", description: "Business impact statement." },
      { name: "Technical_Owner", type: "text", description: "Customer-side technical owner." }
    ],
    examples: [
      "API-Led Connectivity → Current 3/5, Target 4/5",
      "CloudHub Migration → Current 1/5, Target 5/5"
    ]
  },
  {
    id: "Value_Stream_Mapping",
    displayName: "Value Stream Mapping",
    description: "Business value stream metrics and outcomes.",
    primaryKey: "Stream_ID",
    displayColumn: "Value_Stream_Name",
    columns: [
      { name: "Stream_ID", type: "text", description: "Unique identifier.", required: true, notes: "Format: VS-{RowID}" },
      {
        name: "Account",
        type: "relation",
        description: "Parent account.",
        required: true,
        relation: { table: "Account_Master", relationship: "one-to-many", displayColumn: "Account_Name" }
      },
      { name: "Value_Stream_Name", type: "text", description: "Value stream name.", required: true },
      { name: "Business_Process", type: "text", description: "Business process description (e.g., Quote-to-Policy)." },
      { name: "Process_Owner", type: "text", description: "Customer business unit owner." },
      {
        name: "Strategic_Objectives",
        type: "multi-relation",
        description: "Strategic objectives supported.",
        relation: { table: "Strategic_Objectives", relationship: "many-to-many", displayColumn: "Objective_Name" }
      },
      {
        name: "MuleSoft_Capabilities_Enabled",
        type: "multi-relation",
        description: "MuleSoft capabilities enabling the value stream.",
        relation: { table: "MuleSoft_Platform_Capabilities", relationship: "many-to-many", displayColumn: "Capability_Name" }
      },
      { name: "Integration_Endpoints", type: "number", description: "Total systems integrated." },
      { name: "APIs_Consumed", type: "number", description: "Number of APIs consumed." },
      { name: "Annual_Transaction_Volume", type: "number", description: "Annual transaction volume." },
      { name: "Cycle_Time_Baseline", type: "duration", description: "Baseline cycle time (hours/days)." },
      { name: "Cycle_Time_Current", type: "duration", description: "Current cycle time." },
      { name: "Cycle_Time_Target", type: "duration", description: "Target cycle time." },
      {
        name: "Time_Reduction_Percent",
        type: "formula",
        description: "Time reduction percentage.",
        formula: "(([Cycle Time Baseline] - [Cycle Time Current]) / [Cycle Time Baseline]) * 100"
      },
      { name: "Cost_Per_Transaction_Before", type: "currency", description: "Cost per transaction before automation (USD).", format: { currencyCode: "USD" } },
      { name: "Cost_Per_Transaction_After", type: "currency", description: "Cost per transaction after automation (USD).", format: { currencyCode: "USD" } },
      {
        name: "Annual_Cost_Savings",
        type: "formula",
        description: "Annual cost savings (USD).",
        formula: "([Cost Per Transaction Before] - [Cost Per Transaction After]) * [Annual Transaction Volume]",
        notes: "Formula returns 0 when prerequisites are empty."
      },
      { name: "Revenue_Impact", type: "currency", description: "New revenue enabled (USD).", format: { currencyCode: "USD" } },
      { name: "Customer_Satisfaction_Score", type: "slider", description: "Customer satisfaction score (1-10).", format: { min: 1, max: 10, step: 1 } },
      {
        name: "Operational_Risk_Level",
        type: "select",
        description: "Operational risk classification.",
        picklist: ["Critical", "High", "Medium", "Low"]
      }
    ],
    examples: [
      "War Risk Quoting → 80% reduction in quote time",
      "Claims Processing → 30% faster settlement"
    ]
  },
  {
    id: "API_Portfolio_Business_Alignment",
    displayName: "API Portfolio & Business Alignment",
    description: "API catalog aligned with business capabilities and objectives.",
    primaryKey: "API_ID",
    displayColumn: "API_Name",
    columns: [
      { name: "API_ID", type: "text", description: "Identifier from Anypoint Exchange.", required: true },
      {
        name: "Account",
        type: "relation",
        description: "Parent account.",
        required: true,
        relation: { table: "Account_Master", relationship: "one-to-many", displayColumn: "Account_Name" }
      },
      { name: "API_Name", type: "text", description: "API name.", required: true },
      {
        name: "API_Type",
        type: "select",
        description: "Layer within the API-led connectivity model.",
        picklist: ["System", "Process", "Experience"]
      },
      { name: "Business_Capability", type: "text", description: "Business capability supported." },
      {
        name: "Linked_Value_Streams",
        type: "multi-relation",
        description: "Value streams consuming this API.",
        relation: { table: "Value_Stream_Mapping", relationship: "many-to-many", displayColumn: "Value_Stream_Name" }
      },
      {
        name: "Linked_Strategic_Objectives",
        type: "multi-relation",
        description: "Strategic objectives supported.",
        relation: { table: "Strategic_Objectives", relationship: "many-to-many", displayColumn: "Objective_Name" }
      },
      {
        name: "Environment",
        type: "select",
        description: "Deployment environment.",
        picklist: ["Production", "Sandbox", "Development"]
      },
      { name: "Monthly_Transactions", type: "number", description: "Monthly transaction count (from Anypoint Analytics)." },
      {
        name: "Annual_Transaction_Volume",
        type: "formula",
        description: "Annual transactions (calculated).",
        formula: "[Monthly Transactions] * 12"
      },
      { name: "Avg_Response_Time_ms", type: "number", description: "Average response time (ms)." },
      { name: "SLA_Target_ms", type: "number", description: "Target response time (ms)." },
      {
        name: "SLA_Compliance_Percent",
        type: "formula",
        description: "SLA compliance percentage.",
        formula: "IF([Avg Response Time ms] <= [SLA Target ms], 100, 100 - (([Avg Response Time ms] - [SLA Target ms]) / [SLA Target ms] * 100))"
      },
      { name: "Error_Rate_Percent", type: "percent", description: "Error rate percentage (from monitoring)." },
      { name: "Uptime_Percent", type: "percent", description: "Uptime percentage (last 30 days)." },
      { name: "Consuming_Applications", type: "number", description: "Number of consuming applications." },
      { name: "Revenue_Attribution", type: "currency", description: "Revenue attributed to this API (USD).", format: { currencyCode: "USD" } },
      {
        name: "Business_Criticality",
        type: "select",
        description: "Business criticality classification.",
        picklist: ["Mission-Critical", "High", "Medium", "Low"]
      },
      {
        name: "Business_Value_Score",
        type: "formula",
        description: "Business value score.",
        formula: "([Monthly Transactions] / 1000) * [Consuming Applications] * ([SLA Compliance Percent] / 100)"
      },
      {
        name: "Health_Status",
        type: "formula",
        description: "Computed health status.",
        formula: "IF([Uptime Percent] < 99.5 OR [Error Rate Percent] > 1, \"Critical\", IF([SLA Compliance Percent] < 95, \"Degraded\", \"Healthy\"))"
      },
      { name: "Owner_Team", type: "text", description: "Owning team (customer or MuleSoft)." },
      {
        name: "Documentation_Quality",
        type: "select",
        description: "Documentation quality assessment.",
        picklist: ["Excellent", "Good", "Needs Improvement", "Missing"]
      }
    ],
    examples: [
      "War Risk Quote API → Experience layer → 15K monthly transactions",
      "Member Profile API → Process layer → 50K monthly transactions"
    ]
  },
  {
    id: "Platform_Health_Metrics",
    displayName: "Platform Health Metrics",
    description: "Technical, business, and operational metrics with thresholds.",
    primaryKey: "Metric_ID",
    displayColumn: "Metric_Name",
    columns: [
      { name: "Metric_ID", type: "text", description: "Unique identifier.", required: true, notes: "Format: MET-{RowID}" },
      {
        name: "Account",
        type: "relation",
        description: "Parent account.",
        required: true,
        relation: { table: "Account_Master", relationship: "one-to-many", displayColumn: "Account_Name" }
      },
      {
        name: "Metric_Category",
        type: "select",
        description: "Metric category.",
        picklist: ["Performance", "Reliability", "Adoption", "Efficiency", "Quality", "Security", "Governance"]
      },
      { name: "Metric_Name", type: "text", description: "Metric name.", required: true },
      {
        name: "Metric_Type",
        type: "select",
        description: "Metric type classification.",
        picklist: ["Technical", "Business", "Operational"]
      },
      { name: "Current_Value", type: "number", description: "Current metric value.", required: true },
      { name: "Target_Value", type: "number", description: "Target metric value.", required: true },
      { name: "Threshold_Warning", type: "number", description: "Warning threshold (yellow)." },
      { name: "Threshold_Critical", type: "number", description: "Critical threshold (red)." },
      { name: "Unit", type: "text", description: "Measurement unit (%, ms, count, USD, FTE)." },
      {
        name: "Measurement_Frequency",
        type: "select",
        description: "Measurement update frequency.",
        picklist: ["Real-time", "Hourly", "Daily", "Weekly", "Monthly"]
      },
      {
        name: "Health_Status",
        type: "formula",
        description: "Metric health status.",
        formula: "IF([Current Value] >= [Target Value]*0.95, \"On Track\", IF([Current Value] >= [Threshold Warning], \"Needs Attention\", \"Critical\"))"
      },
      { name: "Trend_30d_Change", type: "number", description: "30-day trend delta." },
      {
        name: "Trend_Direction",
        type: "formula",
        description: "Trend direction arrow.",
        formula: "IF([Trend 30d Change] > 0, \"↑\", IF([Trend 30d Change] < 0, \"↓\", \"→\"))"
      },
      { name: "Last_Measured", type: "datetime", description: "Last measurement timestamp." },
      {
        name: "Linked_Capability",
        type: "relation",
        description: "Linked MuleSoft capability.",
        relation: { table: "MuleSoft_Platform_Capabilities", relationship: "many-to-one", displayColumn: "Capability_Name" }
      },
      {
        name: "Linked_Strategic_Objective",
        type: "relation",
        description: "Linked strategic objective.",
        relation: { table: "Strategic_Objectives", relationship: "many-to-one", displayColumn: "Objective_Name" }
      },
      {
        name: "Data_Source",
        type: "select",
        description: "Metric data source.",
        picklist: ["Anypoint Analytics", "Runtime Manager", "Exchange", "Custom", "Manual"]
      },
      { name: "Business_Impact_Statement", type: "textarea", description: "Business impact statement." }
    ],
    examples: [
      "War Risk Portal API Uptime → 99.9% target",
      "API Design Review Cycle Time → 5 days current → target 2 days"
    ]
  },
  {
    id: "Platform_Investment_Initiatives",
    displayName: "Platform Investment & Initiatives",
    description: "Initiative portfolio with investment, ROI, and progress tracking.",
    primaryKey: "Initiative_ID",
    displayColumn: "Initiative_Name",
    columns: [
      { name: "Initiative_ID", type: "text", description: "Unique identifier.", required: true, notes: "Format: INI-{RowID}" },
      {
        name: "Account",
        type: "relation",
        description: "Parent account.",
        required: true,
        relation: { table: "Account_Master", relationship: "one-to-many", displayColumn: "Account_Name" }
      },
      { name: "Initiative_Name", type: "text", description: "Initiative name.", required: true },
      {
        name: "Initiative_Type",
        type: "select",
        description: "Initiative categorization.",
        picklist: [
          "Platform Migration",
          "Capability Development",
          "Governance Enhancement",
          "Monitoring/Observability",
          "Training/Enablement",
          "Technical Debt Remediation"
        ]
      },
      {
        name: "Linked_Strategic_Objectives",
        type: "multi-relation",
        description: "Objectives supported by this initiative.",
        relation: { table: "Strategic_Objectives", relationship: "many-to-many", displayColumn: "Objective_Name" }
      },
      {
        name: "Linked_Capabilities",
        type: "multi-relation",
        description: "Capabilities advanced by this initiative.",
        relation: { table: "MuleSoft_Platform_Capabilities", relationship: "many-to-many", displayColumn: "Capability_Name" }
      },
      { name: "Business_Driver", type: "text", description: "Business driver description." },
      {
        name: "Proposed_By",
        type: "select",
        description: "Initiative proposer.",
        picklist: ["Customer", "CSM", "SE", "Both"]
      },
      {
        name: "Priority",
        type: "select",
        description: "Initiative priority.",
        picklist: ["P0-Critical", "P1-High", "P2-Medium", "P3-Low"]
      },
      {
        name: "Phase",
        type: "select",
        description: "Current phase.",
        picklist: ["Discovery", "Planning", "Design", "Build", "Test", "Deploy", "Monitor"]
      },
      {
        name: "Status",
        type: "select",
        description: "Current status.",
        picklist: ["Proposed", "Approved", "In Progress", "On Hold", "Completed", "Cancelled"]
      },
      { name: "Start_Date", type: "date", description: "Start date." },
      { name: "Target_Completion", type: "date", description: "Target completion date." },
      { name: "Actual_Completion", type: "date", description: "Actual completion date." },
      {
        name: "Days_Overdue",
        type: "formula",
        description: "Days overdue.",
        formula: "IF([Actual Completion] . isBlank() AND Today() > [Target Completion], Today() - [Target Completion], 0)"
      },
      { name: "Investment_Amount", type: "currency", description: "Total investment amount (USD).", format: { currencyCode: "USD" } },
      { name: "MuleSoft_Services", type: "currency", description: "MuleSoft services component (USD).", format: { currencyCode: "USD" } },
      { name: "Customer_Investment", type: "currency", description: "Customer internal investment (USD).", format: { currencyCode: "USD" } },
      { name: "Expected_Annual_Benefit", type: "currency", description: "Expected annual benefit (USD).", format: { currencyCode: "USD" } },
      {
        name: "Expected_Payback_Months",
        type: "formula",
        description: "Expected payback period (months).",
        formula: "IF([Expected Annual Benefit] > 0, [Investment Amount] / ([Expected Annual Benefit] / 12), 0)"
      },
      {
        name: "Three_Year_ROI_Percent",
        type: "formula",
        description: "Three-year ROI percentage.",
        formula: "IF([Investment Amount] > 0, (([Expected Annual Benefit] * 3) - [Investment Amount]) / [Investment Amount] * 100, 0)"
      },
      { name: "Realized_Annual_Benefit", type: "currency", description: "Actual annual benefit (USD).", format: { currencyCode: "USD" } },
      { name: "Success_Criteria", type: "textarea", description: "Success criteria (long form)." },
      { name: "Owner_MuleSoft", type: "person", description: "MuleSoft owner." },
      { name: "Owner_Customer", type: "text", description: "Customer owner." },
      { name: "Next_Milestone", type: "text", description: "Upcoming milestone." },
      { name: "Blockers", type: "textarea", description: "Current blockers." }
    ],
    examples: [
      "CloudHub 1.0 → 2.0 Migration → $120K investment",
      "Automated CI/CD Pipeline → $80K investment"
    ]
  },
  {
    id: "Technical_Debt_Risk_Register",
    displayName: "Technical Debt & Risk Register",
    description: "Risk tracking with impact, probability, and mitigation plans.",
    primaryKey: "Risk_ID",
    displayColumn: "Risk_Title",
    columns: [
      { name: "Risk_ID", type: "text", description: "Unique identifier.", required: true, notes: "Format: RISK-{RowID}" },
      {
        name: "Account",
        type: "relation",
        description: "Associated account.",
        required: true,
        relation: { table: "Account_Master", relationship: "one-to-many", displayColumn: "Account_Name" }
      },
      {
        name: "Risk_Category",
        type: "select",
        description: "Risk classification.",
        picklist: ["Technical Debt", "Platform Risk", "Security", "Compliance", "Performance", "Scalability", "Knowledge Gap", "Vendor Dependency"]
      },
      { name: "Risk_Title", type: "text", description: "Risk title.", required: true },
      { name: "Description", type: "textarea", description: "Risk description." },
      { name: "Root_Cause", type: "text", description: "Root cause analysis." },
      {
        name: "Affected_Capability",
        type: "relation",
        description: "Affected capability.",
        relation: { table: "MuleSoft_Platform_Capabilities", relationship: "many-to-one", displayColumn: "Capability_Name" }
      },
      {
        name: "Affected_APIs",
        type: "multi-relation",
        description: "Affected APIs.",
        relation: { table: "API_Portfolio_Business_Alignment", relationship: "many-to-many", displayColumn: "API_Name" }
      },
      {
        name: "Affected_Value_Streams",
        type: "multi-relation",
        description: "Affected value streams.",
        relation: { table: "Value_Stream_Mapping", relationship: "many-to-many", displayColumn: "Value_Stream_Name" }
      },
      {
        name: "Linked_Strategic_Objectives_Risk",
        type: "multi-relation",
        description: "Strategic objectives at risk.",
        relation: { table: "Strategic_Objectives", relationship: "many-to-many", displayColumn: "Objective_Name" }
      },
      {
        name: "Impact",
        type: "select",
        description: "Impact level.",
        picklist: ["Critical", "High", "Medium", "Low"]
      },
      {
        name: "Impact_Score",
        type: "formula",
        description: "Impact score on a 1-5 scale.",
        formula: "ImpactToScore([Impact])"
      },
      {
        name: "Probability",
        type: "select",
        description: "Probability rating.",
        picklist: ["Very Likely (>75%)", "Likely (50-75%)", "Possible (25-50%)", "Unlikely (<25%)"]
      },
      {
        name: "Probability_Score",
        type: "formula",
        description: "Probability score on a 1-5 scale.",
        formula: "ProbabilityToScore([Probability])"
      },
      {
        name: "Risk_Score",
        type: "formula",
        description: "Overall risk score.",
        formula: "[Impact Score] * [Probability Score]"
      },
      {
        name: "Risk_Level",
        type: "formula",
        description: "Risk level classification.",
        formula: "IF([Risk Score] >= 20, \"Critical\", IF([Risk Score] >= 12, \"High\", IF([Risk Score] >= 6, \"Medium\", \"Low\")))"
      },
      { name: "Potential_Business_Impact", type: "currency", description: "Potential financial impact (USD).", format: { currencyCode: "USD" } },
      { name: "Potential_Business_Impact_Operational", type: "text", description: "Operational impact description." },
      { name: "Mitigation_Strategy", type: "textarea", description: "Mitigation strategy plan." },
      {
        name: "Mitigation_Initiative",
        type: "relation",
        description: "Linked mitigation initiative.",
        relation: { table: "Platform_Investment_Initiatives", relationship: "many-to-one", displayColumn: "Initiative_Name" }
      },
      { name: "Mitigation_Owner", type: "person", description: "Person responsible for mitigation." },
      { name: "Target_Resolution_Date", type: "date", description: "Target resolution date." },
      {
        name: "Status",
        type: "select",
        description: "Risk status.",
        picklist: ["Open", "In Progress", "Mitigated", "Accepted", "Closed"]
      },
      { name: "Date_Identified", type: "date", description: "Date identified." },
      { name: "Date_Closed", type: "date", description: "Date closed." }
    ],
    examples: [
      "CloudHub 1.0 EOL → Critical/Very Likely",
      "Lack of Functional Monitoring → High/Likely"
    ]
  },
  {
    id: "Stakeholder_Outcomes_Success_Metrics",
    displayName: "Stakeholder Outcomes & Success Metrics",
    description: "Stakeholder-specific outcomes, metrics, and measurement progress.",
    primaryKey: "Outcome_ID",
    displayColumn: "Outcome_Statement",
    columns: [
      { name: "Outcome_ID", type: "text", description: "Unique identifier.", required: true, notes: "Format: OUT-{RowID}" },
      {
        name: "Account",
        type: "relation",
        description: "Parent account.",
        required: true,
        relation: { table: "Account_Master", relationship: "one-to-many", displayColumn: "Account_Name" }
      },
      {
        name: "Stakeholder_Type",
        type: "select",
        description: "Stakeholder type.",
        picklist: ["External Customer", "Internal Business Unit", "Partner", "Regulator", "End User", "Executive Leadership"]
      },
      { name: "Stakeholder_Name", type: "text", description: "Stakeholder name.", required: true },
      { name: "Stakeholder_Role", type: "text", description: "Stakeholder role." },
      { name: "Outcome_Statement", type: "text", description: "Outcome statement (As a [stakeholder], I can [action] so that [benefit])." },
      {
        name: "Linked_Strategic_Objectives",
        type: "relation",
        description: "Linked strategic objective.",
        relation: { table: "Strategic_Objectives", relationship: "many-to-one", displayColumn: "Objective_Name" }
      },
      {
        name: "Linked_Value_Streams",
        type: "relation",
        description: "Linked value stream.",
        relation: { table: "Value_Stream_Mapping", relationship: "many-to-one", displayColumn: "Value_Stream_Name" }
      },
      {
        name: "Linked_API_Services",
        type: "multi-relation",
        description: "Supporting APIs.",
        relation: { table: "API_Portfolio_Business_Alignment", relationship: "many-to-many", displayColumn: "API_Name" }
      },
      { name: "Success_Metric_Name", type: "text", description: "Name of the success metric." },
      { name: "Baseline_Value", type: "number", description: "Baseline value before MuleSoft." },
      { name: "Current_Value", type: "number", description: "Current metric value." },
      { name: "Target_Value", type: "number", description: "Target metric value." },
      { name: "Unit", type: "text", description: "Measurement unit." },
      {
        name: "Improvement_Percent",
        type: "formula",
        description: "Improvement percentage.",
        formula: "IF([Baseline Value] = 0, 0, ([Current Value] - [Baseline Value]) / [Baseline Value] * 100)"
      },
      {
        name: "Target_Achievement_Percent",
        type: "formula",
        description: "Target achievement percentage.",
        formula: "IF([Target Value] = [Baseline Value], 100, ([Current Value] - [Baseline Value]) / ([Target Value] - [Baseline Value]) * 100)"
      },
      { name: "Measurement_Method", type: "text", description: "Measurement method (survey, analytics, transaction data)." },
      { name: "Last_Measured", type: "date", description: "Last measured date." },
      {
        name: "Measurement_Frequency",
        type: "select",
        description: "Measurement cadence.",
        picklist: ["Monthly", "Quarterly", "Annual"]
      },
      {
        name: "Status",
        type: "formula",
        description: "Outcome status classification.",
        formula: "IF([Target Achievement Percent] >= 100, \"Achieved\", IF([Target Achievement Percent] >= 75, \"On Track\", \"Needs Attention\"))"
      }
    ],
    examples: [
      "War Risk Customers → Self-service quote < 5 min",
      "CFO → Platform ROI visibility → Target real-time"
    ]
  },
  {
    id: "Engagement_Relationship_Health",
    displayName: "Engagement & Relationship Health",
    description: "Engagement history with relationship scoring.",
    primaryKey: "Engagement_ID",
    displayColumn: "Engagement_Type",
    columns: [
      { name: "Engagement_ID", type: "text", description: "Unique identifier.", required: true, notes: "Format: ENG-{RowID}" },
      {
        name: "Account",
        type: "relation",
        description: "Associated account.",
        required: true,
        relation: { table: "Account_Master", relationship: "one-to-many", displayColumn: "Account_Name" }
      },
      { name: "Engagement_Date", type: "date", description: "Engagement date.", required: true },
      {
        name: "Engagement_Type",
        type: "select",
        description: "Engagement type.",
        picklist: ["QBR", "Executive Sponsor Call", "Technical Review", "Health Check", "Training", "Workshop", "Success Plan Review", "Escalation"]
      },
      { name: "Attendees_MuleSoft", type: "text", description: "MuleSoft attendees (multi-person)." },
      { name: "Attendees_Customer", type: "text", description: "Customer attendees." },
      {
        name: "Customer_Seniority",
        type: "select",
        description: "Highest seniority represented.",
        picklist: ["C-Level", "VP", "Director", "Manager", "IC"]
      },
      { name: "Topics_Discussed", type: "textarea", description: "Topics discussed." },
      { name: "Action_Items", type: "textarea", description: "Action items captured." },
      {
        name: "Sentiment",
        type: "select",
        description: "Overall sentiment.",
        picklist: ["Very Positive", "Positive", "Neutral", "Concerned", "Very Concerned"]
      },
      { name: "Strategic_Alignment_Score", type: "slider", description: "Strategic alignment score (1-10).", format: { min: 1, max: 10, step: 1 } },
      { name: "Technical_Health_Score", type: "slider", description: "Technical health score (1-10).", format: { min: 1, max: 10, step: 1 } },
      { name: "Relationship_Depth_Score", type: "slider", description: "Relationship depth score (1-10).", format: { min: 1, max: 10, step: 1 } },
      { name: "Next_Steps", type: "text", description: "Next steps agreed upon." },
      { name: "Next_Engagement_Date", type: "date", description: "Next scheduled engagement date." },
      { name: "Notes", type: "textarea", description: "Additional notes." }
    ]
  },
  {
    id: "Success_Plan_Tracker",
    displayName: "Success Plan Tracker",
    description: "Quarterly success plans with priorities, risks, and health scoring.",
    primaryKey: "Success_Plan_ID",
    displayColumn: "Plan_Period",
    columns: [
      { name: "Success_Plan_ID", type: "text", description: "Unique identifier.", required: true, notes: "Format: SP-{RowID}" },
      {
        name: "Account",
        type: "relation",
        description: "Associated account.",
        required: true,
        relation: { table: "Account_Master", relationship: "one-to-many", displayColumn: "Account_Name" }
      },
      { name: "Plan_Period", type: "text", description: "Plan time horizon (e.g., FY2025 H1)." },
      {
        name: "Plan_Status",
        type: "select",
        description: "Success plan status.",
        picklist: ["Active", "Completed", "Archived"]
      },
      { name: "Creation_Date", type: "date", description: "Creation date." },
      { name: "Last_Updated", type: "datetime", description: "Last updated timestamp." },
      {
        name: "Strategic_Objectives_Addressed",
        type: "multi-relation",
        description: "Objectives covered in this plan.",
        relation: { table: "Strategic_Objectives", relationship: "many-to-many", displayColumn: "Objective_Name" }
      },
      {
        name: "Key_Initiatives",
        type: "multi-relation",
        description: "Key initiatives in this period.",
        relation: { table: "Platform_Investment_Initiatives", relationship: "many-to-many", displayColumn: "Initiative_Name" }
      },
      { name: "Critical_Success_Factors", type: "textarea", description: "Critical success factors." },
      { name: "Top_3_Priorities", type: "textarea", description: "Top three priorities." },
      {
        name: "Top_3_Risks",
        type: "multi-relation",
        description: "Top three risks.",
        relation: { table: "Technical_Debt_Risk_Register", relationship: "many-to-many", displayColumn: "Risk_Title" }
      },
      {
        name: "Overall_Health_Score",
        type: "formula",
        description: "Composite plan health score.",
        formula: "Average([Strategic Alignment Score], [Technical Health Score], [Relationship Depth Score])",
        notes: "Composite of strategic, technical, and relationship metrics."
      },
      {
        name: "Renewal_Risk_Level",
        type: "formula",
        description: "Renewal risk derived from health score and renewal timeline.",
        formula: "IF([Overall Health Score] >= 80 AND [Days to Renewal] > 180, \"Low\", IF([Overall Health Score] >= 65, \"Medium\", IF([Overall Health Score] >= 50, \"High\", \"Critical\")))"
      },
      { name: "Expansion_Opportunity", type: "currency", description: "Expansion opportunity (USD).", format: { currencyCode: "USD" } },
      { name: "Executive_Sponsor_Customer", type: "text", description: "Customer executive sponsor." },
      { name: "Executive_Sponsor_MuleSoft", type: "person", description: "MuleSoft executive sponsor." },
      { name: "Next_QBR_Date", type: "date", description: "Next scheduled QBR date." }
    ]
  }
];

export const STRATEGIC_ACCOUNT_TRACKING_VIEWS: ViewDefinition[] = [
  {
    id: "CSM_Command_Center",
    displayName: "CSM Command Center",
    description: "Health-focused account dashboard filtered for the current CSM.",
    baseTable: "Account_Master",
    layout: "card",
    filters: [
      { column: "Customer_Success_Manager", operator: "=", expression: "CurrentUser()" },
      { column: "Plan_Status", operator: "!=", value: "Archived" }
    ],
    sortOrder: [
      { column: "Risk_Level", direction: "desc" },
      { column: "Days_to_Renewal", direction: "asc" }
    ],
    sections: ["Account Summary", "Renewal Timeline", "Key Risks", "Next Engagement"]
  },
  {
    id: "Strategic_Alignment_Board",
    displayName: "Strategic Alignment Board",
    description: "Kanban view of strategic objectives by status.",
    baseTable: "Strategic_Objectives",
    layout: "board",
    filters: [
      { column: "Account", operator: "=", expression: "ViewParameter(\"Account\")" },
      { column: "MuleSoft_Relevance", operator: "in", values: ["Critical Enabler", "Supporting"] }
    ],
    sortOrder: [
      { column: "Priority", direction: "asc" },
      { column: "Progress_Percent", direction: "desc" }
    ],
    sections: ["Not Started", "Planning", "In Progress", "At Risk", "Achieved"]
  },
  {
    id: "Platform_Health_Dashboard",
    displayName: "Platform Health Dashboard",
    description: "Performance and reliability dashboard for platform metrics.",
    baseTable: "Platform_Health_Metrics",
    layout: "dashboard",
    filters: [
      { column: "Account", operator: "=", expression: "ViewParameter(\"Account\")" },
      { column: "Metric_Category", operator: "in", values: ["Performance", "Reliability", "Security"] }
    ],
    groupBy: ["Metric_Category"],
    sections: ["Key Metrics", "Trend Analysis", "Alerts"]
  },
  {
    id: "Value_Realization_Report",
    displayName: "Value Realization Report",
    description: "Investment vs benefit analysis for a selected timeframe.",
    baseTable: "Platform_Investment_Initiatives",
    layout: "dashboard",
    filters: [
      { column: "Account", operator: "=", expression: "ViewParameter(\"Account\")" }
    ],
    sections: ["Investment Summary", "Benefit Realization", "ROI Trends", "Success Stories"]
  },
  {
    id: "Renewal_Risk_Dashboard",
    displayName: "Renewal Risk Dashboard",
    description: "Accounts approaching renewal with health considerations.",
    baseTable: "Account_Master",
    layout: "table",
    filters: [
      { column: "Days_to_Renewal", operator: "less_than_days", value: 365 },
      { column: "Health_Score", operator: "<", value: 75 }
    ],
    sortOrder: [
      { column: "ARR", direction: "desc" },
      { column: "Days_to_Renewal", direction: "asc" }
    ]
  },
  {
    id: "QBR_Preparation_Workspace",
    displayName: "QBR Preparation Workspace",
    description: "Cross-table view for preparing quarterly business reviews.",
    baseTable: "Success_Plan_Tracker",
    layout: "dashboard",
    filters: [
      { column: "Account", operator: "=", expression: "ViewParameter(\"Account\")" },
      { column: "Plan_Period", operator: "=", expression: "ViewParameter(\"PlanPeriod\")" }
    ],
    sections: ["Strategic Objectives", "Platform Health", "Completed Initiatives", "Stakeholder Outcomes", "Risk Register"]
  },
  {
    id: "Technical_Debt_Tracker",
    displayName: "Technical Debt Tracker",
    description: "Monitor open technical debt and risk items.",
    baseTable: "Technical_Debt_Risk_Register",
    layout: "table",
    filters: [
      { column: "Status", operator: "in", values: ["Open", "In Progress"] }
    ],
    sortOrder: [
      { column: "Risk_Score", direction: "desc" },
      { column: "Days_Open", direction: "desc" }
    ]
  },
  {
    id: "API_Performance_Monitor",
    displayName: "API Performance Monitor",
    description: "Operational dashboard for API health.",
    baseTable: "API_Portfolio_Business_Alignment",
    layout: "dashboard",
    filters: [
      { column: "Environment", operator: "=", value: "Production" }
    ],
    sections: ["SLA Compliance", "Error Rates", "Business Impact", "Critical Alerts"]
  }
];

export function debugBlueprint(): string {
  return inspect({
    tables: STRATEGIC_ACCOUNT_TRACKING_TABLES.length,
    views: STRATEGIC_ACCOUNT_TRACKING_VIEWS.length,
    columns: STRATEGIC_ACCOUNT_TRACKING_TABLES.reduce((acc, table) => acc + table.columns.length, 0)
  });
}
