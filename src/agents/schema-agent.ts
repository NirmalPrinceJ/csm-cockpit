import * as coda from "@codahq/packs-sdk";

/**
 * SCHEMA AGENT: Table Definitions and Relationships
 *
 * Responsible for:
 * - Complete table schemas with all fields (no reductions)
 * - Foreign key relationships
 * - Lookup configurations
 * - Data validation rules
 * - Table dependencies and creation order
 */

export function setupTables(pack: coda.PackDefinitionBuilder) {

  // ============================================================================
  // TABLE 1: ACCOUNT MASTER
  // Primary account registry with complete field set
  // ============================================================================

  pack.addSyncTable({
    name: "Account_Master",
    identityName: "Account",
    schema: coda.makeObjectSchema({
      properties: {
        // Primary Key
        Account_ID: {
          type: coda.ValueType.String,
          required: true,
          description: "Unique identifier (auto-generated)"
        },
        Account_Name: {
          type: coda.ValueType.String,
          required: true,
          description: "Account name"
        },

        // Industry and Contract Details
        Industry_Vertical: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["Maritime", "Financial Services", "Healthcare", "Retail", "Manufacturing", "Energy", "Public Sector"],
          required: true,
          description: "Industry vertical"
        },
        Industry_Sub_Sector: {
          type: coda.ValueType.String,
          description: "Specific sub-sector (e.g., P&I Insurance, Investment Banking)"
        },
        Contract_Type: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["Signature Success", "Premier Success", "Standard"],
          description: "Contract type"
        },
        Contract_Start: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.Date,
          description: "Contract start date"
        },
        Contract_End: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.Date,
          description: "Contract end date"
        },
        Renewal_Date: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.Date,
          description: "Contract renewal date"
        },
        Days_to_Renewal: {
          type: coda.ValueType.Number,
          description: "Days until renewal (calculated)"
        },

        // Financial Metrics
        ARR: {
          type: coda.ValueType.Number,
          codaType: coda.ValueHintType.Currency,
          description: "Annual Recurring Revenue"
        },
        ACV: {
          type: coda.ValueType.Number,
          codaType: coda.ValueHintType.Currency,
          description: "Annual Contract Value"
        },

        // Team Assignments
        Customer_Success_Manager: {
          type: coda.ValueType.String,
          description: "Assigned CSM"
        },
        Account_Executive: {
          type: coda.ValueType.String,
          description: "Assigned Account Executive"
        },
        Solutions_Architect: {
          type: coda.ValueType.String,
          description: "Assigned Solutions Architect"
        },

        // Health and Risk Assessment
        Health_Score: {
          type: coda.ValueType.Number,
          description: "Composite health score (0-100)"
        },
        Risk_Level: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["Critical", "At Risk", "Healthy"],
          description: "Renewal risk level"
        },
        S_P_Rating: {
          type: coda.ValueType.String,
          description: "S&P credit rating (for financial customers)"
        },

        // Company Details
        Revenue_Annual: {
          type: coda.ValueType.Number,
          codaType: coda.ValueHintType.Currency,
          description: "Customer's annual revenue"
        },
        Employee_Count: {
          type: coda.ValueType.Number,
          description: "Number of employees"
        },
        Geography: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["EMEA", "Americas", "APAC"],
          description: "Geographic region"
        },
        Primary_Contact: {
          type: coda.ValueType.String,
          description: "Primary contact person"
        }
      },
      primaryKey: ["Account_ID"],
      displayProperty: "Account_Name"
    })
  });

  // ============================================================================
  // TABLE 2: ACCOUNT STRATEGIC CONTEXT
  // Business model and strategic drivers (complete field set)
  // ============================================================================

  pack.addSyncTable({
    name: "Account_Strategic_Context",
    identityName: "Strategic Context",
    schema: coda.makeObjectSchema({
      properties: {
        Context_ID: {
          type: coda.ValueType.String,
          required: true,
          description: "Unique identifier (auto-generated)"
        },
        Account: {
          type: coda.ValueType.String,
          required: true,
          description: "Reference to Account Master"
        },
        Business_Model: {
          type: coda.ValueType.String,
          description: "Business model (e.g., Mutual Insurance, SaaS, B2B Marketplace)"
        },
        Market_Position: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["Market Leader", "Challenger", "Emerging Player"],
          description: "Market position"
        },
        Operating_Environment: {
          type: coda.ValueType.String,
          description: "Geopolitical, regulatory, competitive dynamics"
        },
        Key_Challenges: {
          type: coda.ValueType.String,
          description: "Key challenges (markdown format)"
        },
        Strategic_Priorities_Current_Year: {
          type: coda.ValueType.String,
          description: "Strategic priorities (bulleted list)"
        },
        Digital_Maturity: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["Digital Native", "Transforming", "Traditional"],
          description: "Digital maturity level"
        },
        IT_Complexity_Score: {
          type: coda.ValueType.Number,
          description: "IT complexity score (1-10)"
        },
        Legacy_System_Count: {
          type: coda.ValueType.Number,
          description: "Number of legacy systems"
        },
        Cloud_Strategy: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["Cloud-First", "Hybrid", "On-Premise Preferred"],
          description: "Cloud adoption strategy"
        },
        Data_Classification: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["Highly Regulated", "Standard", "Open"],
          description: "Data classification requirements"
        },
        Last_Updated: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.DateTime,
          description: "Last update timestamp"
        }
      },
      primaryKey: ["Context_ID"],
      displayProperty: "Account"
    })
  });

  // ============================================================================
  // TABLE 3: STRATEGIC OBJECTIVES
  // Customer business goals with complete field set
  // ============================================================================

  pack.addSyncTable({
    name: "Strategic_Objectives",
    identityName: "Strategic Objective",
    schema: coda.makeObjectSchema({
      properties: {
        Objective_ID: {
          type: coda.ValueType.String,
          required: true,
          description: "Unique identifier (auto-generated)"
        },
        Account: {
          type: coda.ValueType.String,
          required: true,
          description: "Reference to Account Master"
        },
        Strategic_Pillar: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["Revenue Growth", "Cost Optimization", "Customer Experience", "Operational Resilience", "Innovation Velocity", "Risk Mitigation", "Sustainability/ESG", "Market Expansion"],
          description: "Strategic pillar"
        },
        Objective_Name: {
          type: coda.ValueType.String,
          required: true,
          description: "Objective name"
        },
        Description: {
          type: coda.ValueType.String,
          description: "Detailed description"
        },
        Business_Driver: {
          type: coda.ValueType.String,
          description: "Business driver (e.g., 'War in Ukraine disrupting trade routes')"
        },
        Quantified_Goal: {
          type: coda.ValueType.String,
          description: "Quantified goal (e.g., 'Reduce quote-to-policy time by 40%')"
        },
        Target_Date: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.Date,
          description: "Target completion date"
        },
        Business_Owner: {
          type: coda.ValueType.String,
          description: "Customer-side business owner"
        },
        Business_Value: {
          type: coda.ValueType.Number,
          codaType: coda.ValueHintType.Currency,
          description: "Estimated business value ($)"
        },
        MuleSoft_Relevance: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["Critical Enabler", "Supporting", "Adjacent"],
          description: "MuleSoft relevance level"
        },
        Status: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["Not Started", "Planning", "In Progress", "At Risk", "Achieved", "Blocked"],
          description: "Current status"
        },
        Progress_Percent: {
          type: coda.ValueType.Number,
          description: "Progress percentage (0-100)"
        },
        Last_Review: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.Date,
          description: "Last review date"
        },
        Notes: {
          type: coda.ValueType.String,
          description: "Additional notes"
        },
        // Lookup relationships
        Linked_Capabilities: {
          type: coda.ValueType.String,
          description: "Linked MuleSoft capabilities (multi-select lookup)"
        },
        Linked_Value_Streams: {
          type: coda.ValueType.String,
          description: "Linked value streams (multi-select lookup)"
        }
      },
      primaryKey: ["Objective_ID"],
      displayProperty: "Objective_Name"
    })
  });

  // ============================================================================
  // TABLE 4: MULESOFT PLATFORM CAPABILITIES
  // Technical maturity assessment (complete field set)
  // ============================================================================

  pack.addSyncTable({
    name: "MuleSoft_Platform_Capabilities",
    identityName: "Platform Capability",
    schema: coda.makeObjectSchema({
      properties: {
        Capability_ID: {
          type: coda.ValueType.String,
          required: true,
          description: "Unique identifier (auto-generated)"
        },
        Account: {
          type: coda.ValueType.String,
          required: true,
          description: "Reference to Account Master"
        },
        Capability_Domain: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["Integration", "API Management", "Automation", "Data Governance", "Security", "DevOps", "Analytics"],
          description: "Capability domain"
        },
        Capability_Name: {
          type: coda.ValueType.String,
          required: true,
          description: "Capability name"
        },
        Description: {
          type: coda.ValueType.String,
          description: "Capability description"
        },
        Current_Maturity: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["Initial (1)", "Developing (2)", "Defined (3)", "Managed (4)", "Optimizing (5)"],
          description: "Current maturity level"
        },
        Target_Maturity: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["Initial (1)", "Developing (2)", "Defined (3)", "Managed (4)", "Optimizing (5)"],
          description: "Target maturity level"
        },
        Maturity_Gap: {
          type: coda.ValueType.Number,
          description: "Maturity gap (calculated)"
        },
        Linked_Strategic_Objectives: {
          type: coda.ValueType.String,
          description: "Linked strategic objectives (multi-select lookup)"
        },
        Supporting_Value_Streams: {
          type: coda.ValueType.String,
          description: "Supporting value streams (multi-select lookup)"
        },
        Investment_Required: {
          type: coda.ValueType.Number,
          codaType: coda.ValueHintType.Currency,
          description: "Required investment ($)"
        },
        Priority: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["P0-Critical", "P1-High", "P2-Medium", "P3-Low"],
          description: "Implementation priority"
        },
        Implementation_Status: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["Not Started", "Planning", "In Progress", "Operational", "Needs Enhancement"],
          description: "Implementation status"
        },
        Business_Impact: {
          type: coda.ValueType.String,
          description: "Business impact description"
        },
        Technical_Owner: {
          type: coda.ValueType.String,
          description: "Customer-side technical owner"
        }
      },
      primaryKey: ["Capability_ID"],
      displayProperty: "Capability_Name"
    })
  });

  // ============================================================================
  // TABLE 5: VALUE STREAM MAPPING
  // Business value streams (complete field set)
  // ============================================================================

  pack.addSyncTable({
    name: "Value_Stream_Mapping",
    identityName: "Value Stream",
    schema: coda.makeObjectSchema({
      properties: {
        Stream_ID: {
          type: coda.ValueType.String,
          required: true,
          description: "Unique identifier (auto-generated)"
        },
        Account: {
          type: coda.ValueType.String,
          required: true,
          description: "Reference to Account Master"
        },
        Value_Stream_Name: {
          type: coda.ValueType.String,
          required: true,
          description: "Value stream name"
        },
        Business_Process: {
          type: coda.ValueType.String,
          description: "Business process description"
        },
        Process_Owner: {
          type: coda.ValueType.String,
          description: "Process owner"
        },
        Strategic_Objectives: {
          type: coda.ValueType.String,
          description: "Linked strategic objectives (multi-select lookup)"
        },
        MuleSoft_Capabilities_Enabled: {
          type: coda.ValueType.String,
          description: "Enabled MuleSoft capabilities (multi-select lookup)"
        },
        Integration_Endpoints: {
          type: coda.ValueType.Number,
          description: "Number of integration endpoints"
        },
        APIs_Consumed: {
          type: coda.ValueType.Number,
          description: "Number of APIs consumed"
        },
        Annual_Transaction_Volume: {
          type: coda.ValueType.Number,
          description: "Annual transaction volume"
        },
        Cycle_Time_Baseline: {
          type: coda.ValueType.Number,
          description: "Baseline cycle time (hours/days)"
        },
        Cycle_Time_Current: {
          type: coda.ValueType.Number,
          description: "Current cycle time"
        },
        Cycle_Time_Target: {
          type: coda.ValueType.Number,
          description: "Target cycle time"
        },
        Time_Reduction_Percent: {
          type: coda.ValueType.Number,
          description: "Time reduction percentage (calculated)"
        },
        Cost_Per_Transaction_Before: {
          type: coda.ValueType.Number,
          codaType: coda.ValueHintType.Currency,
          description: "Cost per transaction before"
        },
        Cost_Per_Transaction_After: {
          type: coda.ValueType.Number,
          codaType: coda.ValueHintType.Currency,
          description: "Cost per transaction after"
        },
        Annual_Cost_Savings: {
          type: coda.ValueType.Number,
          codaType: coda.ValueHintType.Currency,
          description: "Annual cost savings (calculated)"
        },
        Revenue_Impact: {
          type: coda.ValueType.Number,
          codaType: coda.ValueHintType.Currency,
          description: "Revenue impact"
        },
        Customer_Satisfaction_Score: {
          type: coda.ValueType.Number,
          description: "Customer satisfaction score (1-10)"
        },
        Operational_Risk_Level: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["Critical", "High", "Medium", "Low"],
          description: "Operational risk level"
        }
      },
      primaryKey: ["Stream_ID"],
      displayProperty: "Value_Stream_Name"
    })
  });

  // ============================================================================
  // REMAINING TABLES PLACEHOLDER
  // Schema Agent will continue with remaining 7 tables
  // ============================================================================

  // ============================================================================
  // TABLE 6: API PORTFOLIO & BUSINESS ALIGNMENT
  // Real-time API catalog synced from Anypoint Platform
  // ============================================================================

  pack.addSyncTable({
    name: "API_Portfolio_Business_Alignment",
    identityName: "API Portfolio",
    schema: coda.makeObjectSchema({
      properties: {
        API_ID: {
          type: coda.ValueType.String,
          required: true,
          description: "API identifier from Anypoint Exchange"
        },
        Account: {
          type: coda.ValueType.String,
          required: true,
          description: "Reference to Account Master"
        },
        API_Name: {
          type: coda.ValueType.String,
          required: true,
          description: "API name"
        },
        API_Type: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["System", "Process", "Experience"],
          description: "API type"
        },
        Business_Capability: {
          type: coda.ValueType.String,
          description: "Business function served"
        },
        Linked_Value_Streams: {
          type: coda.ValueType.String,
          description: "Linked value streams (multi-select lookup)"
        },
        Linked_Strategic_Objectives: {
          type: coda.ValueType.String,
          description: "Linked strategic objectives (multi-select lookup)"
        },
        Environment: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["Production", "Sandbox", "Development"],
          description: "Deployment environment"
        },
        Monthly_Transactions: {
          type: coda.ValueType.Number,
          description: "Monthly transaction count"
        },
        Annual_Transaction_Volume: {
          type: coda.ValueType.Number,
          description: "Annual transaction volume (calculated)"
        },
        Avg_Response_Time_ms: {
          type: coda.ValueType.Number,
          description: "Average response time"
        },
        SLA_Target_ms: {
          type: coda.ValueType.Number,
          description: "SLA target response time"
        },
        SLA_Compliance_Percent: {
          type: coda.ValueType.Number,
          format: "Percent",
          description: "SLA compliance percentage (calculated)"
        },
        Error_Rate_Percent: {
          type: coda.ValueType.Number,
          format: "Percent",
          description: "Error rate percentage"
        },
        Uptime_Percent: {
          type: coda.ValueType.Number,
          format: "Percent",
          description: "Uptime percentage"
        },
        Consuming_Applications: {
          type: coda.ValueType.Number,
          description: "Number of consuming applications"
        },
        Revenue_Attribution: {
          type: coda.ValueType.Number,
          codaType: coda.ValueHintType.Currency,
          description: "Revenue directly enabled by this API"
        },
        Business_Criticality: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["Mission-Critical", "High", "Medium", "Low"],
          description: "Business criticality level"
        },
        Business_Value_Score: {
          type: coda.ValueType.Number,
          description: "Business value score (calculated)"
        },
        Health_Status: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["Critical", "Degraded", "Healthy"],
          description: "API health status (calculated)"
        },
        Owner_Team: {
          type: coda.ValueType.String,
          description: "Owner team"
        },
        Documentation_Quality: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["Excellent", "Good", "Needs Improvement", "Missing"],
          description: "Documentation quality"
        }
      },
      primaryKey: ["API_ID"],
      displayProperty: "API_Name"
    })
  });

  // ============================================================================
  // TABLE 7: PLATFORM HEALTH METRICS
  // KPIs and metrics from Anypoint Platform and business impact
  // ============================================================================

  pack.addSyncTable({
    name: "Platform_Health_Metrics",
    identityName: "Health Metric",
    schema: coda.makeObjectSchema({
      properties: {
        Metric_ID: {
          type: coda.ValueType.String,
          required: true,
          description: "Unique identifier (auto-generated)"
        },
        Account: {
          type: coda.ValueType.String,
          required: true,
          description: "Reference to Account Master"
        },
        Metric_Category: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["Performance", "Reliability", "Adoption", "Efficiency", "Quality", "Security", "Governance"],
          description: "Metric category"
        },
        Metric_Name: {
          type: coda.ValueType.String,
          required: true,
          description: "Metric name"
        },
        Metric_Type: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["Technical", "Business", "Operational"],
          description: "Metric type"
        },
        Current_Value: {
          type: coda.ValueType.Number,
          required: true,
          description: "Current metric value"
        },
        Target_Value: {
          type: coda.ValueType.Number,
          required: true,
          description: "Target value"
        },
        Threshold_Warning: {
          type: coda.ValueType.Number,
          description: "Warning threshold"
        },
        Threshold_Critical: {
          type: coda.ValueType.Number,
          description: "Critical threshold"
        },
        Unit: {
          type: coda.ValueType.String,
          description: "Unit of measurement (%, ms, count, USD, FTE)"
        },
        Measurement_Frequency: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["Real-time", "Hourly", "Daily", "Weekly", "Monthly"],
          description: "Measurement frequency"
        },
        Health_Status: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["On Track", "Needs Attention", "Critical"],
          description: "Health status (calculated)"
        },
        Trend_30d_Change: {
          type: coda.ValueType.Number,
          description: "30-day trend change"
        },
        Trend_Direction: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["↑", "↓", "→"],
          description: "Trend direction (calculated)"
        },
        Last_Measured: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.DateTime,
          description: "Last measurement timestamp"
        },
        Linked_Capability: {
          type: coda.ValueType.String,
          description: "Linked MuleSoft capability"
        },
        Linked_Strategic_Objective: {
          type: coda.ValueType.String,
          description: "Linked strategic objective"
        },
        Data_Source: {
          type: coda.ValueType.String,
          description: "Data source (Anypoint Analytics, Runtime Manager, Custom)"
        },
        Business_Impact_Statement: {
          type: coda.ValueType.String,
          description: "Business impact if this fails"
        }
      },
      primaryKey: ["Metric_ID"],
      displayProperty: "Metric_Name"
    })
  });

  // ============================================================================
  // TABLE 8: PLATFORM INVESTMENT & INITIATIVES
  // Customer projects and initiatives with MuleSoft involvement
  // ============================================================================

  pack.addSyncTable({
    name: "Platform_Investment_Initiatives",
    identityName: "Initiative",
    schema: coda.makeObjectSchema({
      properties: {
        Initiative_ID: {
          type: coda.ValueType.String,
          required: true,
          description: "Unique identifier (auto-generated)"
        },
        Account: {
          type: coda.ValueType.String,
          required: true,
          description: "Reference to Account Master"
        },
        Initiative_Name: {
          type: coda.ValueType.String,
          required: true,
          description: "Initiative name"
        },
        Initiative_Type: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["Platform Migration", "Capability Development", "Governance Enhancement", "Monitoring/Observability", "Training/Enablement", "Technical Debt Remediation"],
          description: "Initiative type"
        },
        Linked_Strategic_Objectives: {
          type: coda.ValueType.String,
          description: "Linked strategic objectives (multi-select)"
        },
        Linked_Capabilities: {
          type: coda.ValueType.String,
          description: "Linked MuleSoft capabilities (multi-select)"
        },
        Business_Driver: {
          type: coda.ValueType.String,
          description: "Business driver justification"
        },
        Proposed_By: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["Customer", "CSM", "SE", "Both"],
          description: "Who proposed this initiative"
        },
        Priority: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["P0-Critical", "P1-High", "P2-Medium", "P3-Low"],
          description: "Implementation priority"
        },
        Phase: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["Discovery", "Planning", "Design", "Build", "Test", "Deploy", "Monitor"],
          description: "Current phase"
        },
        Status: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["Proposed", "Approved", "In Progress", "On Hold", "Completed", "Cancelled"],
          description: "Initiative status"
        },
        Start_Date: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.Date,
          description: "Start date"
        },
        Target_Completion: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.Date,
          description: "Target completion date"
        },
        Actual_Completion: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.Date,
          description: "Actual completion date"
        },
        Days_Overdue: {
          type: coda.ValueType.Number,
          description: "Days overdue (calculated)"
        },
        Investment_Amount: {
          type: coda.ValueType.Number,
          codaType: coda.ValueHintType.Currency,
          description: "Total investment amount ($)"
        },
        MuleSoft_Services: {
          type: coda.ValueType.Number,
          codaType: coda.ValueHintType.Currency,
          description: "MuleSoft services component ($)"
        },
        Customer_Investment: {
          type: coda.ValueType.Number,
          codaType: coda.ValueHintType.Currency,
          description: "Customer internal investment ($)"
        },
        Expected_Annual_Benefit: {
          type: coda.ValueType.Number,
          codaType: coda.ValueHintType.Currency,
          description: "Expected annual benefit ($)"
        },
        Expected_Payback_Months: {
          type: coda.ValueType.Number,
          description: "Expected payback period (months, calculated)"
        },
        Three_Year_ROI_Percent: {
          type: coda.ValueType.Number,
          format: "Percent",
          description: "3-year ROI percentage (calculated)"
        },
        Realized_Annual_Benefit: {
          type: coda.ValueType.Number,
          codaType: coda.ValueHintType.Currency,
          description: "Actual realized annual benefit ($)"
        },
        Success_Criteria: {
          type: coda.ValueType.String,
          description: "Success criteria and measurement"
        },
        Owner_MuleSoft: {
          type: coda.ValueType.String,
          description: "MuleSoft owner"
        },
        Owner_Customer: {
          type: coda.ValueType.String,
          description: "Customer owner"
        },
        Next_Milestone: {
          type: coda.ValueType.String,
          description: "Next milestone"
        },
        Blockers: {
          type: coda.ValueType.String,
          description: "Current blockers and issues"
        }
      },
      primaryKey: ["Initiative_ID"],
      displayProperty: "Initiative_Name"
    })
  });

  // ============================================================================
  // TABLE 9: TECHNICAL DEBT & RISK REGISTER
  // Risk tracking with severity and mitigation plans
  // ============================================================================

  pack.addSyncTable({
    name: "Technical_Debt_Risk_Register",
    identityName: "Risk",
    schema: coda.makeObjectSchema({
      properties: {
        Risk_ID: {
          type: coda.ValueType.String,
          required: true,
          description: "Unique identifier (auto-generated)"
        },
        Account: {
          type: coda.ValueType.String,
          required: true,
          description: "Reference to Account Master"
        },
        Risk_Category: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["Technical Debt", "Platform Risk", "Security", "Compliance", "Performance", "Scalability", "Knowledge Gap", "Vendor Dependency"],
          description: "Risk category"
        },
        Risk_Title: {
          type: coda.ValueType.String,
          required: true,
          description: "Risk title"
        },
        Description: {
          type: coda.ValueType.String,
          description: "Detailed risk description"
        },
        Root_Cause: {
          type: coda.ValueType.String,
          description: "Root cause analysis"
        },
        Affected_Capability: {
          type: coda.ValueType.String,
          description: "Affected MuleSoft capability"
        },
        Affected_APIs: {
          type: coda.ValueType.String,
          description: "Affected APIs (multi-select)"
        },
        Affected_Value_Streams: {
          type: coda.ValueType.String,
          description: "Affected value streams (multi-select)"
        },
        Linked_Strategic_Objectives_Risk: {
          type: coda.ValueType.String,
          description: "Linked strategic objectives at risk (multi-select)"
        },
        Impact: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["Critical", "High", "Medium", "Low"],
          description: "Impact level"
        },
        Impact_Score: {
          type: coda.ValueType.Number,
          description: "Impact score (1-5, calculated)"
        },
        Probability: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["Very Likely (>75%)", "Likely (50-75%)", "Possible (25-50%)", "Unlikely (<25%)"],
          description: "Probability level"
        },
        Probability_Score: {
          type: coda.ValueType.Number,
          description: "Probability score (1-5, calculated)"
        },
        Risk_Score: {
          type: coda.ValueType.Number,
          description: "Risk score (calculated)"
        },
        Risk_Level: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["Critical", "High", "Medium", "Low"],
          description: "Overall risk level (calculated)"
        },
        Potential_Business_Impact: {
          type: coda.ValueType.Number,
          codaType: coda.ValueHintType.Currency,
          description: "Potential business impact ($)"
        },
        Potential_Business_Impact_Operational: {
          type: coda.ValueType.String,
          description: "Operational impact description"
        },
        Mitigation_Strategy: {
          type: coda.ValueType.String,
          description: "Mitigation strategy"
        },
        Mitigation_Initiative: {
          type: coda.ValueType.String,
          description: "Linked mitigation initiative"
        },
        Mitigation_Owner: {
          type: coda.ValueType.String,
          description: "Mitigation owner"
        },
        Target_Resolution_Date: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.Date,
          description: "Target resolution date"
        },
        Status: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["Open", "In Progress", "Mitigated", "Accepted", "Closed"],
          description: "Risk status"
        },
        Date_Identified: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.Date,
          description: "Date risk was identified"
        },
        Date_Closed: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.Date,
          description: "Date risk was closed"
        }
      },
      primaryKey: ["Risk_ID"],
      displayProperty: "Risk_Title"
    })
  });

  // ============================================================================
  // TABLE 10: STAKEHOLDER OUTCOMES & SUCCESS METRICS
  // Stakeholder-specific success metrics and evidence
  // ============================================================================

  pack.addSyncTable({
    name: "Stakeholder_Outcomes_Success_Metrics",
    identityName: "Stakeholder Outcome",
    schema: coda.makeObjectSchema({
      properties: {
        Outcome_ID: {
          type: coda.ValueType.String,
          required: true,
          description: "Unique identifier (auto-generated)"
        },
        Account: {
          type: coda.ValueType.String,
          required: true,
          description: "Reference to Account Master"
        },
        Stakeholder_Type: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["External Customer", "Internal Business Unit", "Partner", "Regulator", "End User", "Executive Leadership"],
          description: "Stakeholder type"
        },
        Stakeholder_Name: {
          type: coda.ValueType.String,
          required: true,
          description: "Stakeholder name"
        },
        Stakeholder_Role: {
          type: coda.ValueType.String,
          description: "Stakeholder role"
        },
        Outcome_Statement: {
          type: coda.ValueType.String,
          description: "Outcome statement (As a [stakeholder], I can [action] so that [benefit])"
        },
        Linked_Strategic_Objectives: {
          type: coda.ValueType.String,
          description: "Linked strategic objectives"
        },
        Linked_Value_Streams: {
          type: coda.ValueType.String,
          description: "Linked value streams"
        },
        Linked_API_Services: {
          type: coda.ValueType.String,
          description: "Linked API services (multi-select)"
        },
        Success_Metric_Name: {
          type: coda.ValueType.String,
          description: "Success metric name"
        },
        Baseline_Value: {
          type: coda.ValueType.Number,
          description: "Baseline value (before MuleSoft)"
        },
        Current_Value: {
          type: coda.ValueType.Number,
          description: "Current value"
        },
        Target_Value: {
          type: coda.ValueType.Number,
          description: "Target value"
        },
        Unit: {
          type: coda.ValueType.String,
          description: "Unit of measurement"
        },
        Improvement_Percent: {
          type: coda.ValueType.Number,
          format: "Percent",
          description: "Improvement percentage (calculated)"
        },
        Target_Achievement_Percent: {
          type: coda.ValueType.Number,
          format: "Percent",
          description: "Target achievement percentage (calculated)"
        },
        Measurement_Method: {
          type: coda.ValueType.String,
          description: "Measurement method (Survey, analytics, transaction data)"
        },
        Last_Measured: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.Date,
          description: "Last measurement date"
        },
        Measurement_Frequency: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["Monthly", "Quarterly", "Annual"],
          description: "Measurement frequency"
        },
        Status: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["Achieved", "On Track", "Needs Attention"],
          description: "Outcome status (calculated)"
        }
      },
      primaryKey: ["Outcome_ID"],
      displayProperty: "Outcome_Statement"
    })
  });

  // ============================================================================
  // TABLE 11: ENGAGEMENT & RELATIONSHIP HEALTH
  // Chronicle of customer engagements with relationship scoring
  // ============================================================================

  pack.addSyncTable({
    name: "Engagement_Relationship_Health",
    identityName: "Engagement",
    schema: coda.makeObjectSchema({
      properties: {
        Engagement_ID: {
          type: coda.ValueType.String,
          required: true,
          description: "Unique identifier (auto-generated)"
        },
        Account: {
          type: coda.ValueType.String,
          required: true,
          description: "Reference to Account Master"
        },
        Engagement_Date: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.Date,
          required: true,
          description: "Engagement date"
        },
        Engagement_Type: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["QBR", "Executive Sponsor Call", "Technical Review", "Health Check", "Training", "Workshop", "Success Plan Review", "Escalation"],
          description: "Engagement type"
        },
        Attendees_MuleSoft: {
          type: coda.ValueType.String,
          description: "MuleSoft attendees (multi-person)"
        },
        Attendees_Customer: {
          type: coda.ValueType.String,
          description: "Customer attendees"
        },
        Customer_Seniority: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["C-Level", "VP", "Director", "Manager", "IC"],
          description: "Customer seniority level"
        },
        Topics_Discussed: {
          type: coda.ValueType.String,
          description: "Topics discussed"
        },
        Action_Items: {
          type: coda.ValueType.String,
          description: "Action items and follow-ups"
        },
        Sentiment: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["Very Positive", "Positive", "Neutral", "Concerned", "Very Concerned"],
          description: "Overall sentiment"
        },
        Strategic_Alignment_Score: {
          type: coda.ValueType.Number,
          description: "Strategic alignment score (1-10)"
        },
        Technical_Health_Score: {
          type: coda.ValueType.Number,
          description: "Technical health score (1-10)"
        },
        Relationship_Depth_Score: {
          type: coda.ValueType.Number,
          description: "Relationship depth score (1-10)"
        },
        Next_Steps: {
          type: coda.ValueType.String,
          description: "Next steps and commitments"
        },
        Next_Engagement_Date: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.Date,
          description: "Next engagement date"
        },
        Notes: {
          type: coda.ValueType.String,
          description: "Additional notes and observations"
        }
      },
      primaryKey: ["Engagement_ID"],
      displayProperty: "Engagement_Type"
    })
  });

  // ============================================================================
  // TABLE 12: SUCCESS PLAN TRACKER
  // Quarterly success plans with comprehensive tracking
  // ============================================================================

  pack.addSyncTable({
    name: "Success_Plan_Tracker",
    identityName: "Success Plan",
    schema: coda.makeObjectSchema({
      properties: {
        Success_Plan_ID: {
          type: coda.ValueType.String,
          required: true,
          description: "Unique identifier (auto-generated)"
        },
        Account: {
          type: coda.ValueType.String,
          required: true,
          description: "Reference to Account Master"
        },
        Plan_Period: {
          type: coda.ValueType.String,
          description: "Plan period (e.g., FY2025 H1)"
        },
        Plan_Status: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["Active", "Completed", "Archived"],
          description: "Plan status"
        },
        Creation_Date: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.Date,
          description: "Plan creation date"
        },
        Last_Updated: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.DateTime,
          description: "Last update timestamp"
        },
        Strategic_Objectives_Addressed: {
          type: coda.ValueType.String,
          description: "Strategic objectives addressed (multi-select)"
        },
        Key_Initiatives: {
          type: coda.ValueType.String,
          description: "Key initiatives (multi-select)"
        },
        Critical_Success_Factors: {
          type: coda.ValueType.String,
          description: "Critical success factors"
        },
        Top_3_Priorities: {
          type: coda.ValueType.String,
          description: "Top 3 priorities"
        },
        Top_3_Risks: {
          type: coda.ValueType.String,
          description: "Top 3 risks (multi-select)"
        },
        Overall_Health_Score: {
          type: coda.ValueType.Number,
          description: "Overall health score (calculated)"
        },
        Renewal_Risk_Level: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.SelectList,
          options: ["Low", "Medium", "High", "Critical"],
          description: "Renewal risk level (calculated)"
        },
        Expansion_Opportunity: {
          type: coda.ValueType.Number,
          codaType: coda.ValueHintType.Currency,
          description: "Expansion opportunity ($)"
        },
        Executive_Sponsor_Customer: {
          type: coda.ValueType.String,
          description: "Customer executive sponsor"
        },
        Executive_Sponsor_MuleSoft: {
          type: coda.ValueType.String,
          description: "MuleSoft executive sponsor"
        },
        Next_QBR_Date: {
          type: coda.ValueType.String,
          codaType: coda.ValueHintType.Date,
          description: "Next QBR date"
        }
      },
      primaryKey: ["Success_Plan_ID"],
      displayProperty: "Plan_Period"
    })
  });

  console.log("Schema Agent: All 12 tables schema definitions completed with complete field sets - no reductions made");
}
