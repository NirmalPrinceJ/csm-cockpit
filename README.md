# Customer Success Intelligence Platform - Coda Pack

A complete Customer Success Management solution for strategic account tracking, health monitoring, and business value realization. Built as a Coda Pack with 16 sync tables, helper guides, and pre-configured view templates.

---

## 🎯 What This Pack Does

Transform Coda into a complete CSM command center with:

- **Account Health Tracking** - Monitor health scores, risk levels, and renewal timelines
- **Strategic Objective Management** - Track customer goals and linked initiatives
- **Business Value Realization** - Measure ROI, cost savings, and outcome delivery
- **Platform Health Monitoring** - Track adoption metrics and platform performance
- **Engagement & Activity Tracking** - Log customer touchpoints and manage tasks
- **Risk & Mitigation Management** - Identify risks early and track resolution
- **QBR Preparation** - Single-account deep dives with complete context
- **Renewal Pipeline** - Monitor upcoming renewals and expansion opportunities

---

## 📦 What's Included

### 16 Sync Tables

**Core Account Data**:
1. **AccountMaster** - Complete account profiles with health scores and renewal tracking
2. **PeopleTeam** - Customer Success team roster and account assignments
3. **BusinessContext** - Strategic business context for each account

**Strategic Tracking**:
4. **StrategicObjectives** - Customer strategic goals and progress tracking
5. **Initiatives** - Linked initiatives with ROI and business value metrics
6. **ValueStreams** - Value delivery and business outcome tracking
7. **StakeholderOutcomes** - Stakeholder-level outcome measurements

**Platform & Technical**:
8. **PlatformCapabilities** - Platform maturity and capability adoption
9. **APIPortfolio** - API catalog and health monitoring
10. **PlatformHealthMetrics** - Platform performance and health metrics

**Risk & Engagement**:
11. **RiskRegister** - Risk identification and mitigation tracking
12. **EngagementLog** - Customer engagement and touchpoint history
13. **SuccessPlanTracker** - Quarterly success plans and health snapshots
14. **ActivitiesTasks** - CSM tasks and action items

**Helper Tables**:
15. **ViewTemplates** - 5 pre-configured view templates with setup instructions
16. **QuickStartGuide** - 8-step guided setup for building your workspace

### Sample Data

All tables include realistic sample data featuring 3 companies across different industries:
- **Acme Financial Services** - High-value enterprise customer ($1.2M ARR)
- **Nordic Logistics Group** - Mid-market with strong adoption ($850K ARR)
- **HealthTech Solutions** - Growth customer needing attention ($350K ARR)

Sample data is fully interconnected and can be cleared/replaced with your real accounts.

---

## 🚀 Quick Start

### 1. Install the Pack
```
1. Create a new Coda doc
2. Insert → Packs → Search "CSM Intelligence Platform"
3. Add to doc (Pack ID: 46088)
```

### 2. Insert Tables
Start with these core tables:
- AccountMaster
- ActivitiesTasks
- QuickStartGuide

### 3. Follow the Guide
The **QuickStartGuide** table provides 8 steps to build your complete workspace (45-60 min total setup).

### 4. Explore Sample Data
Browse the 3 sample accounts to understand the data model, then clear and add your real accounts.

---

## 📖 Documentation

| Guide | Purpose | Time Required |
|-------|---------|---------------|
| **QUICK_IMPORT_GUIDE.md** | Fastest path to get started | 5 min read |
| **TEMPLATE_DOC_GUIDE.md** | Build 5-page workspace yourself | 20-30 min setup |
| **CODA_TEMPLATE_BUILDER.md** | Build complete 7-page template for team | 45-60 min setup |
| **RELATIONSHIPS_GUIDE.md** | Create cross-table lookups and relationships | 10 min read |

**In-Doc Guides** (sync tables you can insert):
- **QuickStartGuide** - 8-step setup process with instructions
- **ViewTemplates** - 5 view configurations (Command Center, Strategic Board, Health Dashboard, QBR, Renewals)

**Pack Formulas**:
- **GetAccountHealth(accountName)** - Lookup account health score
- **GetAccountARR(accountName)** - Lookup account ARR
- **FormatAccountSummary(accountName)** - Format one-line account summary
- **CreateReferenceID(account, type, seq)** - Generate cross-table reference IDs

---

## 🎨 Pre-Configured Views

The **ViewTemplates** table includes setup instructions for:

1. **CSM Command Center** - Daily dashboard with all accounts grouped by CSM
2. **Strategic Objectives Board** - Kanban view of customer goals
3. **Health Dashboard** - At-risk accounts and platform metrics needing attention
4. **QBR Preparation View** - Single-account deep dive with all context
5. **Renewal Risk Pipeline** - Next 180 days of renewals grouped by risk

Each template includes exact filter, sort, group, and conditional formatting specifications.

---

## 💼 Who Is This For?

### Individual CSMs
- Track your account portfolio
- Monitor health scores and renewal risk
- Log engagements and manage tasks
- Prepare for QBRs with complete context

### CS Leaders
- Team-wide account overview
- Health and risk dashboards
- Renewal pipeline tracking
- Strategic initiative monitoring

### CS Operations
- Centralized data management
- Team performance tracking
- Metrics and reporting
- Success plan orchestration

---

## 📊 Key Features

### Health Score Calculation
Composite health score based on:
- Platform adoption and usage
- Business value realization
- Stakeholder engagement quality
- Risk level and mitigation status

### Renewal Risk Tracking
Automatic risk level calculation using:
- Days to renewal
- Current health score
- Engagement cadence status
- Open risk items

### Business Value Metrics
Track and measure:
- 3-year ROI percentage
- Expected payback period
- Annual cost savings
- Cycle time reduction
- Total business value delivered

### Engagement Tracking
Monitor customer touchpoints:
- Engagement type and attendees
- MEDDICC/MEDDPICC scoring
- Next steps and action items
- Engagement cadence compliance

---

## 🏗️ Architecture

### Phase 1: Manual Entry (Current - Version 5)
- 16 sync tables with sample data
- Manual data entry and updates
- No external API integrations
- Perfect for: Teams getting started, small portfolios, evaluation

### Phase 2: API Integration (Future)
- Salesforce integration for account data
- CRM sync for engagement tracking
- Platform API integration for health metrics
- Automated data refresh

---

## 🔧 Technical Details

**Built With**:
- Coda Packs SDK v1.12.1
- TypeScript 5.9.3
- Node.js 24.10.0

**Pack Information**:
- Pack ID: 46088
- Current Version: 6
- Authentication: None (Phase 1)
- Network Domains: coda.io
- Lookup Formulas: 4 cross-table relationship helpers

**Project Structure**:
```
csm-cockpit/
├── src/
│   ├── pack.ts           # Main pack definition (16 sync tables)
│   ├── schemas.ts        # All table schemas with featured properties
│   └── helpers.ts        # Sync functions with sample data
├── QUICK_IMPORT_GUIDE.md       # 5-minute quick start
├── TEMPLATE_DOC_GUIDE.md       # 5-page workspace guide
├── CODA_TEMPLATE_BUILDER.md    # 7-page template blueprint
├── RELATIONSHIPS_GUIDE.md      # Cross-table lookups and relationships
├── package.json                # NPM package config
└── README.md                   # This file
```

---

## 🛠️ Development

### Build Commands
```bash
npm run build      # Build pack
npm run validate   # Validate pack structure
npm run test       # Run test suite
npm run upload     # Upload new version to Coda
```

### Local Testing
```bash
npm run test       # Test sync functions with sample data
```

### Publishing
```bash
npm run upload     # Uploads to Pack ID 46088
```

---

## 📝 Customization

### Add Custom Fields
1. Edit `src/schemas.ts` - Add properties to relevant schema
2. Edit `src/helpers.ts` - Add field to sample data
3. Run `npm run build && npm run upload`

### Modify Sample Data
1. Edit `src/helpers.ts` - Update seed data arrays
2. Run `npm run upload`

### Create Custom Views
1. Follow ViewTemplates table instructions
2. Create your own filters, sorts, groups
3. Share configuration with team

---

## 🎯 Use Cases

### Quarterly Business Reviews
1. Select account in QBR Preparation page
2. View complete account context automatically filtered
3. Review strategic objectives, initiatives, value delivered
4. Analyze risks and engagement history
5. Update success plan for next quarter

### Weekly Health Reviews
1. Open Health Dashboard
2. Review at-risk accounts (health score < 80)
3. Check platform metrics needing attention
4. Review active risks and mitigation status
5. Assign follow-up tasks to CSMs

### Renewal Planning
1. Open Renewal Pipeline (180-day view)
2. Group by risk level (High/Medium/Low)
3. Prioritize high-risk renewals
4. Review expansion opportunities in healthy accounts
5. Schedule renewal discussions

### Strategic Account Management
1. Track customer strategic objectives
2. Link initiatives to objectives
3. Monitor progress and ROI
4. Measure value delivered
5. Identify expansion opportunities

---

## 🤝 Contributing

This pack is designed to be:
- **Generic** - Works for any B2B SaaS CSM team
- **Extensible** - Easy to add custom fields and tables
- **Scalable** - Grows from individual CSMs to enterprise CS teams

Feedback and feature requests welcome!

---

## 📞 Support

**Pack Details**:
- Pack ID: 46088
- Version: 6
- Last Updated: November 2024

**Documentation**:
- QuickStartGuide (in-doc sync table)
- ViewTemplates (in-doc sync table)
- QUICK_IMPORT_GUIDE.md
- TEMPLATE_DOC_GUIDE.md
- CODA_TEMPLATE_BUILDER.md
- RELATIONSHIPS_GUIDE.md

**Getting Help**:
1. Check QuickStartGuide table in your Coda doc
2. Review documentation files
3. Consult ViewTemplates for view configurations
4. Contact your Coda administrator

---

## 📜 License

ISC License

---

## ✨ What Makes This Pack Special

1. **Complete Solution** - Not just tables, but a full CSM workspace
2. **Pre-Configured Views** - 5 ready-to-use view templates with exact specifications
3. **Guided Setup** - QuickStartGuide walks you through 8 steps
4. **Realistic Sample Data** - 3 fully-populated accounts to explore
5. **Generic & Flexible** - Works for any B2B SaaS company
6. **Phase 1 Ready** - Use immediately with manual entry
7. **Phase 2 Ready** - Architecture supports future API integrations

---

**Ready to transform your Customer Success operations?**

Install the pack, insert QuickStartGuide, and build your CSM command center in under an hour! 🚀