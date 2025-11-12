# View Pages Quick Checklist
## Account Success Intelligence Platform

Use this as a quick reference while building your view pages.

---

## 📊 PAGE 1: EXECUTIVE SUMMARY

### Quick Setup Steps
1. ✅ Create page "Executive Summary" with emoji 📊
2. ✅ Add control: AccountName (select list)
3. ✅ Add 6 sections:

**Section 1: Account Overview Card (Canvas)**
- [ ] Left column: Account details (name, industry, ARR, etc.)
- [ ] Right column: 5 health gauges
- [ ] Apply conditional formatting to Risk Level and Days to Renewal

**Section 2: Strategic Objectives Table**
- [ ] Filter: account = [AccountName], status != 'Completed'
- [ ] Sort: businessValueUsd DESC
- [ ] Show first 5 rows
- [ ] Columns: name, pillar, progress%, value, status, date
- [ ] Format: Progress bar colors (red<30, yellow 30-69, green 70+)

**Section 3: Health Metrics Tiles (Canvas)**
- [ ] 2x2 grid of health gauges
- [ ] Platform Health, Business Value, Stakeholder, Strategic
- [ ] Color coding: red<60, yellow 60-79, green 80+

**Section 4: Active Initiatives Table**
- [ ] Filter: account = [AccountName], status IN ('In Progress','Planning','At Risk')
- [ ] Sort: threeYearROIPercent DESC
- [ ] Show first 3
- [ ] Format: ROI >300% green bold

**Section 5: Top Risks Table**
- [ ] Filter: account = [AccountName], status = 'Active'
- [ ] Sort: riskScore DESC
- [ ] Show first 3
- [ ] Format: High/Critical = red row

**Section 6: Recent Engagements Table**
- [ ] Filter: account = [AccountName]
- [ ] Sort: engagementDate DESC
- [ ] Show first 3
- [ ] Format: Sentiment badges (green, yellow, red)

---

## 🎯 PAGE 2: CSM COMMAND CENTER

### Quick Setup Steps
1. ✅ Create page "My Command Center" with emoji 🎯
2. ✅ Add control: YourName (person)
3. ✅ Add 4 sections:

**Section 1: Account Portfolio**
- [ ] Filter: customerSuccessManager = [YourName]
- [ ] Sort: healthScore ASC, daysToRenewal ASC
- [ ] Group by: riskLevel
- [ ] Columns: name, health, ARR, days, risk, renewal, engagement dates
- [ ] Summary row: Total ARR, Avg Health, Count

**Section 2: Renewal Pipeline (90 days)**
- [ ] Filter: CSM = [YourName] AND daysToRenewal <= 90
- [ ] Sort: daysToRenewal ASC
- [ ] Columns: name, ARR, renewal, days, health, risk, expansion
- [ ] Summary: Total renewal value, expansion opportunity

**Section 3: My Tasks**
- [ ] Filter: assignedTo = [YourName], status IN ('Open','In Progress','Blocked')
- [ ] Sort: priority DESC, dueDate ASC
- [ ] Group by: priority
- [ ] Add calculated column: daysUntilDue
- [ ] Format: Overdue = red background

**Section 4: Portfolio Risks**
- [ ] Filter: Risks for my accounts, status = Active
- [ ] Sort: riskScore DESC
- [ ] Columns: title, account, level, score, status, owner, date
- [ ] Count badge at top

---

## 🏥 PAGE 3: HEALTH DASHBOARD

### Quick Setup Steps
1. ✅ Create page "Health Dashboard" with emoji 🏥
2. ✅ No page filters (team-wide view)
3. ✅ Add 4 sections + header tiles:

**Section 0: Health Summary Tiles**
- [ ] Tile 1: Count(healthScore < 60)
- [ ] Tile 2: Count(healthScore 60-80)
- [ ] Tile 3: Count(active high risks)
- [ ] Tile 4: Count(critical platform metrics)

**Section 1: At-Risk Accounts**
- [ ] Filter: healthScore < 80 OR riskLevel IN ('Critical','At Risk')
- [ ] Sort: healthScore ASC, daysToRenewal ASC
- [ ] Group by: riskLevel
- [ ] Add column: daysSinceLastTouch (calculated)
- [ ] Format: Red row if health < 60

**Section 2: Platform Health Metrics**
- [ ] Filter: healthStatus IN ('Critical','Warning')
- [ ] Sort: healthStatus DESC
- [ ] Group by: metricCategory
- [ ] Add column: gapPercent (calculated)

**Section 3: Active High/Critical Risks**
- [ ] Filter: status = Active, riskLevel IN ('High','Critical')
- [ ] Sort: riskLevel DESC, riskScore DESC
- [ ] Group by: riskLevel
- [ ] Limit: Top 10
- [ ] Format: Red/orange row highlights

---

## 📋 PAGE 4: QBR PREPARATION VIEW

### Quick Setup Steps
1. ✅ Create page "QBR Preparation View" with emoji 📋
2. ✅ Add 2 controls: AccountName, QuarterYear
3. ✅ Add 7 sections + footer:

**Section 1: Executive Summary Card**
- [ ] Canvas with 2 columns: Account info + Health gauges
- [ ] Bottom: Business Context summary

**Section 2: Strategic Objectives**
- [ ] Filter: account = [AccountName], status != 'Cancelled'
- [ ] Group by: strategicPillar
- [ ] Summary row: Count by status, Total value

**Section 3: Value Delivered & ROI**
- [ ] Summary tiles: Investment, Value, ROI, Count
- [ ] Table: Completed initiatives only
- [ ] Filter by quarter completed date

**Section 4: Platform Adoption & Health**
- [ ] Sub-section A: Capabilities maturity
- [ ] Sub-section B: Health metrics
- [ ] Tiles: Critical count, Healthy count, Uptime

**Section 5: Stakeholder Engagement**
- [ ] Summary tiles: Count, Sentiment, Next QBR
- [ ] Table: Engagements in quarter
- [ ] Below: Stakeholder outcomes

**Section 6: Risks & Mitigation**
- [ ] Filter: Active + Mitigated risks
- [ ] Group by: riskCategory

**Section 7: Next Quarter Success Plan**
- [ ] Display as card (not table)
- [ ] Add calculated trend fields

**Footer:**
- [ ] Prepared by, Date, QBR date, Team

---

## 💼 PAGE 5: RENEWAL PIPELINE

### Quick Setup Steps
1. ✅ Create page "Renewal Pipeline" with emoji 💼
2. ✅ Add executive summary one-liner at top
3. ✅ Add 6 sections + controls:

**Section 0: Pipeline Summary Tiles**
- [ ] 5 tiles: Total ARR, At-Risk ARR, Account Count, Expansion, Avg Health

**Section 1: Main Renewal Pipeline Table**
- [ ] Filter: daysToRenewal <= 180
- [ ] Sort: riskLevel DESC, daysToRenewal ASC
- [ ] Group by: riskLevel (collapsible)
- [ ] 13 columns including calculated ones
- [ ] Summary per group: ARR, Count, Avg Health

**Section 2: At-Risk Renewals (Cards)**
- [ ] Filter: daysToRenewal <= 180, riskLevel IN ('Critical','At Risk')
- [ ] Display as cards
- [ ] Show: Overview, Top 3 risks, Actions, Buttons

**Section 3: Expansion Opportunities**
- [ ] Filter: daysToRenewal <= 180, expansionOpportunityUsd > 0
- [ ] Sort: expansionOpportunityUsd DESC
- [ ] Summary: Total expansion value

**Section 4: Renewal Timeline Visual**
- [ ] Canvas with 6 horizontal bars
- [ ] One bar per month (0-30, 31-60, etc.)
- [ ] Show ARR and account count per month

**Section 5: Renewal Risk Factors**
- [ ] Filter: Risks for accounts renewing in 180 days
- [ ] Group by: account
- [ ] Limit: Top 20 by impact

**View Controls (Sidebar):**
- [ ] Filter by CSM (dropdown)
- [ ] Filter by Risk Level (dropdown)
- [ ] Time Window (dropdown: 30/60/90/180)
- [ ] Date range picker
- [ ] Toggle: Show Only At-Risk

**Quick Actions Panel:**
- [ ] Schedule All QBRs button
- [ ] Export to Sales button
- [ ] Send Summary Email button
- [ ] Update Health Scores button

---

## 🎨 STYLING CHECKLIST

Apply across all pages:

### Color Palette
- [ ] Critical/Red: #E53E3E
- [ ] At Risk/Orange: #EA580C
- [ ] Warning/Yellow: #CA8A04
- [ ] Healthy/Green: #16A34A
- [ ] Excellent/Blue: #2563EB
- [ ] Neutral/Gray: #6B7280

### Typography
- [ ] H1: 24px bold
- [ ] H2: 18px bold
- [ ] Body: 12-14px regular
- [ ] Large numbers: 24-32px bold

### Components
- [ ] Canvas background: #F7FAFC
- [ ] Canvas border radius: 8px
- [ ] Canvas padding: 20px
- [ ] Section spacing: 40px
- [ ] Table row height: 40px
- [ ] Badge: Rounded corners, colored backgrounds

---

## ✅ TESTING CHECKLIST

Before marking complete:

### Functionality Tests
- [ ] All page filters work (account selectors, CSM filters, etc.)
- [ ] All formulas calculate without errors
- [ ] All conditional formatting displays correctly
- [ ] All cross-table lookups work
- [ ] All calculated columns compute correctly
- [ ] All group-by sections expand/collapse
- [ ] All summary rows calculate correctly

### Data Tests
- [ ] Test with at least 3 different accounts
- [ ] Test with accounts at different health levels
- [ ] Test with accounts at different renewal stages
- [ ] Verify all tables populate with data
- [ ] Verify empty states handle gracefully

### Visual Tests
- [ ] All colors match palette
- [ ] All badges display correctly
- [ ] All gauges show proper colors
- [ ] All tables are readable
- [ ] Mobile view works
- [ ] Print view works (for QBR page)

### Performance Tests
- [ ] Pages load in < 5 seconds
- [ ] Filters respond quickly
- [ ] No formula timeout errors
- [ ] Data syncs properly

### Documentation Tests
- [ ] All page names clear
- [ ] All section headers present
- [ ] Instructions provided where needed
- [ ] Footer metadata complete (QBR page)

---

## 🚀 COMPLETION CRITERIA

Mark view pages as "finished" when:

✅ All 5 pages created
✅ All sections implemented per spec
✅ All formulas working
✅ All conditional formatting applied
✅ All styling consistent
✅ All tests passing
✅ Sample data works correctly
✅ Team can use without training
✅ Documentation complete
✅ Ready for production use

---

## ⏱️ TIME TRACKING

Track your progress:

- Page 1: _____ minutes (target: 15-20)
- Page 2: _____ minutes (target: 20-25)
- Page 3: _____ minutes (target: 20-25)
- Page 4: _____ minutes (target: 30-35)
- Page 5: _____ minutes (target: 25-30)
- Testing: _____ minutes (target: 30-45)
- Styling: _____ minutes (target: 15-20)
- Documentation: _____ minutes (target: 15-20)

**Total: _____ minutes (target: 150-210 minutes)**

---

## 📞 HELP & RESOURCES

If stuck:

1. **Check VIEW_PAGES_IMPLEMENTATION_GUIDE.md** - Detailed step-by-step
2. **Check VIEW_PAGES_FIGJAM_GUIDE.md** - Original specifications
3. **Check CODA_TEMPLATE_SPECIFICATION.md** - Template structure
4. **Check formula reference** - VIEW_PAGES_FORMULA_REFERENCE.md

---

**Print this checklist and check off items as you go!** ✅
