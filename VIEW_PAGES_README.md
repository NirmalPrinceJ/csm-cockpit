# View Pages Implementation - README
## Account Success Intelligence Platform

This directory contains everything you need to finish implementing the 5 view pages in your Coda document.

---

## 📚 What's Included

### 1. **VIEW_PAGES_IMPLEMENTATION_GUIDE.md** ⭐ START HERE
   - **Purpose:** Complete step-by-step implementation guide
   - **Length:** Comprehensive (detailed instructions for all 5 pages)
   - **Time to read:** 10-15 minutes
   - **Time to implement:** 2.5-3.5 hours total
   - **Use when:** Building the pages from scratch

### 2. **VIEW_PAGES_QUICK_CHECKLIST.md** 📋 USE WHILE BUILDING
   - **Purpose:** Quick reference checklist
   - **Length:** Short (one-page per view)
   - **Time to scan:** 2-3 minutes
   - **Use when:** Building pages (print and check off items)

### 3. **VIEW_PAGES_FORMULA_REFERENCE.md** 🔧 USE FOR FORMULAS
   - **Purpose:** Copy-paste formulas
   - **Length:** Reference document (organized by page and formula type)
   - **Time to find formula:** < 30 seconds
   - **Use when:** Adding formulas to your Coda tables

### 4. **VIEW_PAGES_FIGJAM_GUIDE.md** 📐 DESIGN SPEC
   - **Purpose:** Original detailed specifications
   - **Length:** Very detailed (complete design handoff)
   - **Use when:** Need to understand design intent or missing details

---

## 🚀 Quick Start (3 Steps)

### Step 1: Read the Implementation Guide (10 min)
```bash
Open: VIEW_PAGES_IMPLEMENTATION_GUIDE.md
Read: Overview and prerequisites section
Skim: All 5 page sections to understand scope
```

### Step 2: Print the Checklist
```bash
Open: VIEW_PAGES_QUICK_CHECKLIST.md
Print or keep open on second monitor
Use to track progress as you build
```

### Step 3: Start Building
```bash
Go to: https://coda.io/d/_dCN5m3nEzNl/Account-Success-Intelligence_sufmyQTQ
Follow: Implementation Guide step-by-step
Reference: Formula Reference as needed
Check off: Items on checklist as you complete them
```

---

## 📊 The 5 View Pages

### Page 1: 📊 Executive Summary
- **Time to build:** 15-20 minutes
- **Sections:** 6
- **Complexity:** ⭐⭐ Medium
- **Purpose:** Single-account executive dashboard
- **Best for:** Executive presentations, QBR prep

### Page 2: 🎯 CSM Command Center  
- **Time to build:** 20-25 minutes
- **Sections:** 4
- **Complexity:** ⭐⭐ Medium
- **Purpose:** Daily CSM portfolio dashboard
- **Best for:** Daily CSM work, portfolio management

### Page 3: 🏥 Health Dashboard
- **Time to build:** 20-25 minutes
- **Sections:** 4 + header tiles
- **Complexity:** ⭐⭐⭐ Medium-High
- **Purpose:** Team-wide health monitoring
- **Best for:** Weekly health reviews, CS leadership

### Page 4: 📋 QBR Preparation View
- **Time to build:** 30-35 minutes
- **Sections:** 7 + footer
- **Complexity:** ⭐⭐⭐⭐ High
- **Purpose:** Comprehensive quarterly review prep
- **Best for:** QBRs, EBRs, account deep dives

### Page 5: 💼 Renewal Pipeline
- **Time to build:** 25-30 minutes
- **Sections:** 6 + controls
- **Complexity:** ⭐⭐⭐⭐ High
- **Purpose:** 180-day renewal tracking
- **Best for:** Renewal planning, forecasting, CS leadership

**Total Time: 2.5-3.5 hours**

---

## 🎯 Recommended Implementation Order

### Phase 1: Core Pages (Start Here)
1. **Page 1: Executive Summary** ← Start with this!
   - Simplest page, good warmup
   - Tests basic filtering and formulas
   - 15-20 minutes

2. **Page 2: CSM Command Center** ← Second
   - Builds on Page 1 concepts
   - Introduces grouping and summary rows
   - 20-25 minutes

### Phase 2: Team Pages
3. **Page 3: Health Dashboard** ← Third
   - Team-wide view (no account filter)
   - Introduces summary tiles
   - 20-25 minutes

### Phase 3: Advanced Pages
4. **Page 5: Renewal Pipeline** ← Fourth
   - Complex formulas and controls
   - But very useful, high ROI
   - 25-30 minutes

5. **Page 4: QBR Preparation View** ← Last
   - Most complex page
   - Save for when you're comfortable
   - 30-35 minutes

**Why this order?**
- Builds complexity gradually
- Tests core concepts early
- High-value pages first (Exec Summary, Command Center)
- Most complex page saved for last

---

## 💡 Pro Tips

### Before You Start
1. **Ensure all tables exist** - Check you have all 12 tables in Coda
2. **Load sample data** - Have at least 1-3 accounts with data
3. **Block time** - Set aside 3-4 hours uninterrupted
4. **Two monitors** - Have guide on one screen, Coda on other
5. **Test account** - Identify one account to use for testing

### While Building
1. **One section at a time** - Don't try to do entire page at once
2. **Test immediately** - Check each section works before moving on
3. **Copy formulas** - Use Formula Reference document (Ctrl+F to find)
4. **Save frequently** - Coda auto-saves, but refresh periodically
5. **Use keyboard shortcuts** - `/table`, `/canvas`, `/control`

### Troubleshooting
1. **Formula errors** - Check table/column names (case-sensitive!)
2. **Empty tables** - Verify filters aren't too restrictive
3. **Slow performance** - Add `.Limit(N)` to large tables
4. **Colors not working** - Re-apply conditional formatting rules
5. **Data not showing** - Click "Sync now" on sync tables

---

## 📋 Verification Checklist

Use this to verify each page is complete:

### ✅ Page 1: Executive Summary
- [ ] Account selector working
- [ ] All 6 sections present
- [ ] Health gauges colored correctly
- [ ] Tables filtering by account
- [ ] Conditional formatting applied

### ✅ Page 2: CSM Command Center
- [ ] CSM filter working
- [ ] Portfolio grouped by risk level
- [ ] Summary rows calculating
- [ ] Tasks showing for CSM
- [ ] Risks showing for CSM's accounts

### ✅ Page 3: Health Dashboard
- [ ] Summary tiles showing counts
- [ ] At-risk table populated
- [ ] Platform metrics filtered
- [ ] Active risks showing
- [ ] No page filters (team-wide)

### ✅ Page 4: QBR Preparation View
- [ ] Account and quarter filters working
- [ ] All 7 sections present
- [ ] Value tiles calculating
- [ ] Engagement table filtered by quarter
- [ ] Footer with metadata

### ✅ Page 5: Renewal Pipeline
- [ ] Executive summary one-liner working
- [ ] Pipeline tiles calculating
- [ ] Main table showing all renewals
- [ ] At-risk cards displaying
- [ ] Timeline visual present
- [ ] View controls functional

---

## 🎨 Design Standards

All pages should follow these standards:

### Colors (RGB)
```
Critical:    #E53E3E (Red)
At Risk:     #EA580C (Orange)
Warning:     #CA8A04 (Yellow)
Healthy:     #16A34A (Green)
Excellent:   #2563EB (Blue)
Neutral:     #6B7280 (Gray)
```

### Typography
```
H1 (Page title):    24px, Bold
H2 (Section):       18px, Bold
Body text:          12-14px, Regular
Large numbers:      24-32px, Bold
```

### Spacing
```
Page margins:       60px left/right
Section spacing:    40px between sections
Canvas padding:     20px
Table row height:   40px
```

### Components
```
Canvas background:  #F7FAFC (light gray)
Border radius:      8px (rounded)
Shadows:            Subtle, 2px
Badges:             Rounded corners, colored backgrounds
```

---

## 🔧 Common Formulas

### Get Account Data
```javascript
=AccountMaster.Filter(accountName=[AccountName]).First()
```

### Count Records
```javascript
=AccountMaster.Filter(condition).Count()
```

### Sum Values
```javascript
=AccountMaster.Filter(condition).Sum(arr)
```

### Calculate Percentage
```javascript
=(current - baseline) / baseline * 100
```

### Days Between Dates
```javascript
=endDate - startDate
```

### Check if Empty
```javascript
=If(IsBlank(value), "Empty", "Has value")
```

**See VIEW_PAGES_FORMULA_REFERENCE.md for complete list**

---

## 📞 Getting Help

### If stuck on implementation:
1. Check **VIEW_PAGES_IMPLEMENTATION_GUIDE.md** - Step-by-step details
2. Check **VIEW_PAGES_FORMULA_REFERENCE.md** - Copy-paste formulas
3. Check **VIEW_PAGES_FIGJAM_GUIDE.md** - Original design specs
4. Check **TROUBLESHOOTING_GUIDE.md** - Common issues

### If formulas aren't working:
1. Verify table names match exactly (case-sensitive)
2. Verify column names match exactly (case-sensitive)
3. Check filter conditions are correct
4. Test with sample data
5. Use Coda formula bar to debug

### If design doesn't match:
1. Check color values in design standards
2. Re-apply conditional formatting rules
3. Verify badge settings
4. Check table display settings

---

## 🎯 Success Criteria

Your view pages are "finished" when:

✅ **Functionality**
- All 5 pages created
- All sections implemented
- All formulas working without errors
- All filters/controls functional
- All cross-page links working

✅ **Data**
- Sample data displays correctly
- All tables populated
- Calculated columns computing
- Summary rows calculating

✅ **Design**
- Consistent colors across pages
- Proper conditional formatting
- Clean, readable layouts
- Mobile responsive

✅ **Usability**
- Team can use without training
- Navigation is clear
- Page purpose is obvious
- Help text provided where needed

✅ **Performance**
- Pages load in < 5 seconds
- No formula timeouts
- Filters respond quickly
- No errors in console

---

## 📈 After Implementation

### Week 1: Test & Refine
- [ ] Use pages daily with real data
- [ ] Gather feedback from team
- [ ] Fix any issues discovered
- [ ] Adjust filters if needed

### Week 2: Train & Roll Out
- [ ] Create training video or guide
- [ ] Hold team walkthrough session
- [ ] Share best practices
- [ ] Document any customizations

### Week 3: Optimize
- [ ] Review performance
- [ ] Optimize slow formulas
- [ ] Add requested features
- [ ] Clean up unused views

### Ongoing: Maintain
- [ ] Keep data up to date
- [ ] Update as pack evolves
- [ ] Share feedback with pack maintainer
- [ ] Iterate based on usage

---

## 📚 Additional Resources

### In This Repo
- `CODA_TEMPLATE_SPECIFICATION.md` - Full template spec (7 pages)
- `TEMPLATE_CREATION_GUIDE.md` - How to create templates
- `RELATIONSHIPS_GUIDE.md` - Cross-table relationships
- `TROUBLESHOOTING_GUIDE.md` - Common issues and fixes
- `README.md` - Pack overview and features

### Coda Documentation
- [Coda Formula Reference](https://help.coda.io/en/articles/3271711)
- [Conditional Formatting](https://help.coda.io/en/articles/1241844)
- [Table Views](https://help.coda.io/en/articles/1272823)
- [Creating Templates](https://help.coda.io/en/articles/5120723)

### Pack Information
- **Pack ID:** 46088
- **Pack Name:** CSM Intelligence Platform
- **Current Version:** 6
- **Install URL:** coda.io/packs/46088

---

## ✨ You Got This!

Building these view pages is straightforward if you:

1. **Follow the guide** - Don't skip steps
2. **Test as you go** - Verify each section works
3. **Use the formulas** - Copy-paste from reference doc
4. **Check off items** - Use the checklist to track progress
5. **Take breaks** - 3+ hours is a marathon, not a sprint

**Estimated time: 2.5-3.5 hours**

**Value delivered: Months of productivity gains** 🚀

---

## 🙋 Questions?

- **Technical issues?** → Check TROUBLESHOOTING_GUIDE.md
- **Design questions?** → See VIEW_PAGES_FIGJAM_GUIDE.md
- **Formula help?** → See VIEW_PAGES_FORMULA_REFERENCE.md
- **Implementation help?** → See VIEW_PAGES_IMPLEMENTATION_GUIDE.md

---

**Ready to start? Open VIEW_PAGES_IMPLEMENTATION_GUIDE.md and let's build!** 🎯

**Last Updated:** November 2024  
**Pack Version:** 6  
**Branch:** csm-cockpit/finish-account-success-view-pages-0c9c
