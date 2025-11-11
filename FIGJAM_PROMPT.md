# Figjam Prompt - CSM Intelligence Platform View Pages

Copy this entire prompt and paste into Figjam AI or share with designer:

---

## PROMPT FOR FIGJAM AI:

```
Create 5 wireframe pages for a Customer Success Management (CSM) Intelligence Platform in Coda. Use clean, modern design with cards, tables, and data visualizations.

DESIGN STYLE:
- Clean, professional B2B SaaS aesthetic
- Color scheme: Blues (#2C5282 for headers), status colors (Red #E53E3E, Yellow #D69E2E, Green #38A169)
- Use rounded corners on cards and badges
- Include gauge charts for health scores
- Show tables with alternating row colors
- Use icons: 🎯 📊 💰 🏥 ⚠️ 🤝 💼 ✅

---

PAGE 1: EXECUTIVE SUMMARY
Purpose: Single-account dashboard for executives

Layout (top to bottom):
1. Header: "[Account Name] - Executive Summary"
2. Account Overview Card (full width, 2 columns):
   - Left: Account Name (large), Industry, ARR ($850K), Contract Type, Renewal Date, Days to Renewal, Geography, Risk Level badge, CSM Name
   - Right: 5 circular gauge charts (Overall Health 80, Platform Health 80, Business Value 75, Stakeholder 78, Strategic 79)
3. Strategic Objectives Table (top 5 rows):
   - Columns: Objective Name, Strategic Pillar (badge), Progress % (progress bar), Business Value ($), Status (badge), Target Date
   - Group rows by pillar
   - Color code progress: <30% red, 30-69% yellow, 70%+ green
4. Health Metrics Tiles (2x2 grid):
   - 4 large tiles with gauge charts and numbers
5. Key Initiatives Table (top 3 rows):
   - Columns: Initiative Name, Status (badge), ROI %, Investment ($), Expected Benefits ($), Target Date
   - Highlight ROI >300% in green
6. Top Risks Table (3 rows):
   - Columns: Risk Title, Risk Level (red/yellow/green badge), Risk Score, Impact ($), Mitigation Strategy, Owner
7. Recent Engagements Table (3 rows):
   - Columns: Date, Type (badge), Sentiment (emoji/color), Attendees, Next Steps

---

PAGE 2: CSM COMMAND CENTER
Purpose: Daily dashboard for individual CSMs

Layout (top to bottom):
1. Header: "🎯 My Command Center"
2. Account Portfolio Table:
   - Group by Risk Level (High/Medium/Low collapsible sections)
   - Columns: Account Name, Health Score (gauge), ARR ($), Days to Renewal, Risk Level (badge), Renewal Date, Last Contact, Next Contact
   - Sort by health score (worst first)
   - Color code health scores: <60 red background, 60-79 yellow, 80+ green
3. Renewal Pipeline Table (accounts with <90 days):
   - Columns: Account, ARR, Renewal Date, Days Left (bold), Health (gauge), Risk (badge), Expansion Opportunity ($)
   - Color code days: <30 red, 30-60 orange, 61-90 yellow
4. My Tasks Table:
   - Group by Priority (Critical/High/Medium/Low)
   - Columns: Task Title, Account, Priority (badge), Status (badge), Due Date, Days Until Due, Linked Initiative
   - Color overdue items red
5. Portfolio Risks Table:
   - Columns: Risk Title, Account, Risk Level (badge), Risk Score, Status, Owner, Target Date
   - Show only high/critical risks

---

PAGE 3: HEALTH DASHBOARD
Purpose: Team-wide view of at-risk accounts

Layout (top to bottom):
1. Header: "🏥 Health Dashboard"
2. Summary Tiles Row (4 tiles horizontal):
   - Tile 1: Critical Accounts (2) - red background
   - Tile 2: At Risk Accounts (5) - yellow background
   - Tile 3: Active High Risks (8) - orange background
   - Tile 4: Platform Alerts (3) - red background
3. At-Risk Accounts Table:
   - Group by Risk Level
   - Columns: Account Name, Health Score (gauge), Risk Level (badge), Days to Renewal, ARR, CSM, Last Contact, Days Since Last Touch
   - Color code by health score
4. Platform Health Metrics Table (Critical/Warning only):
   - Group by Category (Performance, Reliability, Security)
   - Columns: Metric Name, Current Value, Target Value, Status (badge), Trend (arrow), Last Measured, Account
   - Highlight critical items in red
5. Active Risks Table (High/Critical only):
   - Group by Risk Level
   - Columns: Account, Risk Title, Category (badge), Risk Level (badge), Impact, Probability, Mitigation Strategy, Owner, Due Date, Status
   - Show top 10 by risk score

---

PAGE 4: QBR PREPARATION VIEW
Purpose: Quarterly Business Review prep for one account

Layout (top to bottom):
1. Header: "[Account Name] - QBR Q4 2024"
2. Account Executive Summary Card (full width, 2 columns):
   - Left: Account details (Name, Industry, ARR, Contract, Renewal, Geography)
   - Right: 5 health gauge charts in vertical stack
   - Below: Business Context box (Digital Maturity, Cloud Strategy, Key Drivers, Current Challenges)
3. Strategic Objectives Progress Table:
   - Group by Strategic Pillar
   - Columns: Objective Name, Business Driver (badge), Progress % (bar), Target Date, Status (badge), Business Value ($), Success Criteria
   - Show top 5, indicate full list available
4. Value Delivered Section:
   - Summary Tiles Row (4 tiles): Total Investment ($500K), Total Value ($2.5M), Avg ROI (480%), Initiatives Completed (8)
   - Table: Initiative Name, Business Driver (badge), Investment, Expected Benefits, Value Realized (bold green), ROI % (bold), Completed Date, Key Outcomes
5. Platform Adoption Section (2 sub-tables side by side):
   - Left: Capabilities Maturity (Current Level, Target Level, Gap, Status)
   - Right: Health Metrics (Metric, Current, Target, Status, Trend)
6. Stakeholder Engagement Section:
   - Tiles: Total Engagements (12), Avg Sentiment (Positive), Next QBR Date
   - Table: Date, Type (badge), Attendees, Sentiment (colored badge), Topics, Action Items, Next Engagement
7. Risks & Mitigation Table:
   - Group by Category
   - Show active + recently mitigated risks
8. Next Quarter Success Plan Card:
   - Display as document/card format (not table)
   - Show: Objectives (bullets), Key Initiatives (bullets), Success Metrics (bullets), Renewal Risk (badge), Expansion Opportunity ($), Strategy

---

PAGE 5: RENEWAL PIPELINE
Purpose: 180-day renewal forecast and expansion tracking

Layout (top to bottom):
1. Header: "💼 Renewal Pipeline - Next 180 Days"
2. Subtitle: "Renewal Pipeline: 15 accounts | $8.5M ARR | 3 at risk"
3. Summary Tiles Row (5 tiles horizontal):
   - Total Renewal ARR ($8.5M)
   - At-Risk ARR ($1.2M)
   - Accounts Renewing (15)
   - Expansion Opportunity ($2.3M)
   - Avg Health Score (74)
4. View Controls (sticky top-right):
   - Dropdown: Filter by CSM
   - Dropdown: Filter by Risk Level
   - Dropdown: Time Window (30/60/90/180 days)
   - Toggle: Show Only At-Risk
5. Main Renewal Pipeline Table:
   - Group by Risk Level (collapsible sections)
   - Columns: Account Name, Days to Renewal (bold, large), Renewal Date, ARR ($), Health (gauge), Risk (badge), CSM, Next QBR, Last Contact, Expansion ($), Active Risks (#), Renewal Quarter
   - Color code days to renewal: <60 red bg, 60-90 orange, 91-180 yellow
   - Show summary per group (total ARR, count, avg health)
6. At-Risk Renewals Cards (side panel or below):
   - Display as cards instead of table rows
   - Each card shows: Account Name, ARR/Health/Days, Top 3 Risks (bullets), Mitigation Actions (bullets), Next Engagement, CSM, Action Buttons (Schedule QBR, Update Health, Log Engagement, View Account)
7. Expansion Opportunities Table:
   - Columns: Account, Expansion Opportunity ($, bold), Strategy, Confidence %, Renewal Risk (badge), Health Score
   - Highlight opportunities >$500K in green
8. Renewal Timeline Visual (horizontal bar chart):
   - 6 monthly bars showing ARR by month
   - Month 1 (0-30d): $2.5M (5 accounts)
   - Month 2 (31-60d): $1.8M (3 accounts)
   - ... continuing for 6 months
   - Color code by risk level
9. Renewal Risk Factors Table:
   - Group by Account
   - Columns: Account, Risk Title, Risk Level (badge), Category, Impact, Mitigation, Owner, Target Date, Status
   - Show top 20 by impact
   - Flag risks where target date > renewal date - 30 days

---

GENERAL DESIGN GUIDELINES:
- Use consistent badge styling (rounded, colored background, white text)
- Tables should have alternating light gray rows (#F7FAFC)
- Headers use dark blue background (#2C5282) with white text
- Show gauge charts as circular/semi-circular with colored segments
- Progress bars should be horizontal with color coding
- Use subtle shadows on cards (2px, 10% opacity)
- Include icons in section headers
- Make numbers large and bold where emphasis needed
- Use color coding consistently:
  * Red (#E53E3E): Critical, High Risk, <60 health, <30 days
  * Orange (#ED8936): At Risk, Warning, 30-60 days
  * Yellow (#D69E2E): Medium, Caution, 60-90 days, 60-79 health
  * Green (#38A169): Healthy, Low Risk, 80+ health, >90 days
- Add subtle borders between sections
- Use white/light backgrounds, avoid dark mode
- Include filter/control elements where specified
- Show sample data in wireframes with realistic values

RESPONSIVE NOTES:
- Desktop: Full layout as described
- Mobile: Stack sections vertically, cards become full width, tables become scrollable

OUTPUT:
Create clean, professional wireframes for all 5 pages that can be used as design specs for Coda implementation.
```

---

## ALTERNATIVE SHORT PROMPT:

```
Design 5 CSM dashboard pages in Figjam:

1. EXECUTIVE SUMMARY: Account card + 6 tables (objectives, initiatives, risks, engagements) + health gauge tiles
2. COMMAND CENTER: CSM portfolio table + renewal pipeline + tasks + risks, grouped by priority/risk
3. HEALTH DASHBOARD: 4 metric tiles + at-risk accounts + platform metrics + active risks tables
4. QBR PREP: Account card + 7 sections (objectives, value/ROI, platform health, engagement, risks, success plan)
5. RENEWAL PIPELINE: 5 metric tiles + main renewals table + at-risk cards + expansion + timeline chart + risk table

Style: Clean B2B SaaS, blue/red/yellow/green color scheme, gauge charts, badges, progress bars, data tables with conditional formatting. Include realistic sample data.
```

---

## HOW TO USE:

### Option 1: Figjam AI (if available)
1. Open Figjam
2. Click AI assistant
3. Paste the full prompt
4. Let AI generate wireframes
5. Review and refine

### Option 2: Manual Design
1. Share prompt with designer
2. Designer creates wireframes based on specs
3. Review together

### Option 3: Excalidraw
1. Use the Excalidraw JSON file I'm creating next
2. Import directly into Excalidraw
3. Pre-made wireframes ready!

---

**Ready to generate your view pages!** 🎨
