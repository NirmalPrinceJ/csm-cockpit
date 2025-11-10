# Version 7 Update Summary - Select Lists Only

## What We're Adding

Adding **SelectList** fields with predefined options for dropdown menus. This provides:
- ✅ Consistent data entry
- ✅ No typos
- ✅ Dropdown selections in Coda
- ✅ Proper filtering and grouping

## What We're NOT Adding (Yet)

❌ Reference fields (not supported in current SDK)
- Users will create relationships via **Lookup Columns** in Coda UI
- Our RELATIONSHIPS_GUIDE.md explains how

## Fields Being Updated

### AccountMaster
- `riskLevel`: ["Low", "Medium", "High"]
- `industryVertical`: [10 common industries]
- `contractType`: ["Annual", "Multi-Year", "Monthly", "Enterprise Agreement"]
- `geography`: ["North America", "EMEA", "APAC", "Latin America", "Global"]
- `engagementCadenceStatus`: ["On Track", "Overdue", "At Risk", "Paused"]

### StrategicObjectives
- `status`: ["Planning", "In Progress", "On Hold", "Completed", "Cancelled"]
- `strategicPillar`: ["Cost Reduction", "Revenue Growth", "Time to Market", "Risk Mitigation", "Innovation", "Customer Experience"]
- `businessDriver`: ["Efficiency", "Scalability", "Compliance", "Customer Experience", "Innovation", "Security"]

### BusinessContext
- `digitalMaturity`: ["Initial", "Developing", "Defined", "Managed", "Optimized"]
- `cloudStrategy`: ["Cloud First", "Hybrid", "On-Premise", "Multi-Cloud"]
- `marketPosition`: ["Market Leader", "Strong Competitor", "Challenger", "Niche Player", "Emerging"]
- `dataClassification`: ["Public", "Internal", "Confidential", "Restricted"]

### Initiatives
- `priority`: ["P0", "P1", "P2"]
- `status`: ["Planning", "In Progress", "At Risk", "Completed", "On Hold", "Cancelled"]
- `phase`: ["Discovery", "Design", "Build", "Deploy", "Optimize"]
- `businessDriver`: ["Cost Reduction", "Revenue Growth", "Time to Market", "Risk Mitigation", "Innovation"]

### RiskRegister
- `riskLevel`: ["Low", "Medium", "High"]
- `riskCategory`: ["Technical", "Business", "Security", "Compliance", "Resource", "Operational"]
- `status`: ["Active - Not Started", "Active - In Progress", "Mitigated", "Closed", "Accepted"]

### ActivitiesTasks
- `taskType`: ["Follow-up", "Mitigation", "Enablement", "Planning", "Review", "Admin"]
- `priority`: ["Low", "Medium", "High"]
- `status`: ["Pending", "In Progress", "Completed", "Cancelled"]

## Benefits

1. **Data Quality**: Standardized values across all tables
2. **User Experience**: Dropdown menus instead of free text
3. **Filtering**: Easy to filter by exact values
4. **Reporting**: Consistent categories for dashboards
5. **No Typos**: Users can't misspell "In Progress"

## How It Works in Coda

When users insert a table:
1. Fields with SelectList show as dropdowns
2. Click dropdown → select from predefined list
3. Values are consistent across all rows
4. Filters work perfectly with exact matches

## Relationships (Via Lookup Columns)

Users create cross-table links in Coda:
1. Add new column to table
2. Set type: Lookup
3. Source table: AccountMaster
4. Match on: account name
5. Return: any field from AccountMaster

This gives them clickable links between tables!

