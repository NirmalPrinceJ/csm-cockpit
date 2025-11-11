# Google Apps Script - Quick Reference Card

## 🚀 5-Minute Setup

```
1. Create Google Sheet
2. Extensions → Apps Script
3. Paste CodaTemplateCreator.gs
4. Update line 20: CODA_API_TOKEN = 'your-token'
5. Run setupMenu → Grant permissions
6. Refresh sheet → See 🎯 Coda Templates menu
```

---

## 📋 Menu Commands

| Command | What It Does | Time |
|---------|--------------|------|
| 📋 Create Full Workspace Template | Copy master template (all 6 pages) | 5 sec |
| 📄 Create Single Account Template | Create lightweight 1-page template | 10 sec |
| **📝 Create Template with Backfill Data** | Create + pre-fill account data | **10 sec** ⭐ |
| 📋 Setup Backfill Sheet | Create data entry sheet | 1 min |
| 📊 List My Coda Docs | View all your Coda documents | 2 sec |
| 🔧 Test API Connection | Verify API token works | 2 sec |
| ⚙️ Settings | View configuration | 2 sec |

---

## 🆕 Backfill Workflow (FASTEST!)

### Setup Once (5 min):
```
1. Click: 📋 Setup Backfill Sheet
2. Fill in account data:

   Account Name | Industry | ARR | CSM | Health Score
   -------------|----------|-----|-----|-------------
   Gard AS | Maritime | 850000 | Nirmal John | 80
   Wates Group | Construction | 99000 | Nirmal John | 35
   CSL Seqirus | Healthcare | 4600000 | Prathamesh | 68
   Birkenstock | Retail | 750000 | Nirmal John | 75

3. Done! Now create instant templates...
```

### Create Templates (10 sec each):
```
1. Click: 📝 Create Template with Backfill Data
2. Enter: 1 (or "Gard AS")
3. Done! Template created with data pre-filled ✅
```

---

## 📊 Backfill Data Sheet Columns

| Column | Example | Required |
|--------|---------|----------|
| Account Name | Gard AS | ✅ YES |
| Industry Vertical | Maritime | Recommended |
| Industry Sub-Sector | P&I Insurance | Optional |
| Contract Type | Signature Success | Recommended |
| ARR | 850000 | Recommended |
| CSM Name | Nirmal John | Recommended |
| Account Executive | Emilie Moen | Optional |
| Executive Sponsor | Christian Tome | Optional |
| Primary Contact Name | Christian Tome | Optional |
| Primary Contact Email | christian.tome@gard.no | Optional |
| Geography | EMEA | Recommended |
| Health Score | 80 | Recommended |
| Business Value Score | 75 | Optional |
| Stakeholder Engagement Score | 78 | Optional |
| Strategic Alignment Score | 79 | Optional |
| Contract Start Date | 2024-01-01 | Optional |
| Contract End Date | 2025-12-31 | Optional |
| Renewal Date | 2025-12-31 | Recommended |
| Risk Level | Healthy | Recommended |
| Notes | Any notes | Optional |

**Tip:** Leave blank if you don't have the data (backfill partial data).

---

## ⚙️ Configuration (Script Line 19-28)

```javascript
const CONFIG = {
  CODA_API_TOKEN: 'abc123...',              // Get from coda.io/account
  MASTER_TEMPLATE_DOC_ID: 'xyz789',         // After creating master doc
  PACK_ID: '46088',                         // CSM Intelligence Platform
  WORKSPACE_ID: ''                          // Optional
};
```

---

## 🎯 Common Tasks

### Task 1: Create QBR Templates for 4 Accounts

```
Time: 40 seconds (vs 2+ hours manual)

1. Ensure 4 accounts in Backfill Data sheet
2. Click 📝 Create Template with Backfill Data
3. Select account 1 → Done (10 sec)
4. Repeat for accounts 2, 3, 4
5. Total: 40 seconds ✅
```

### Task 2: Onboard New Account

```
Time: 3 minutes (vs 65 minutes manual)

1. Add account to Backfill Data sheet (2 min)
2. Click 📝 Create Template with Backfill Data (10 sec)
3. Open in Coda, publish to workspace (30 sec)
4. Total: 3 minutes ✅
```

### Task 3: Create Master Template (One-Time)

```
Time: 60 minutes (one-time investment)

1. Click: Create Master Template Doc
2. Copy Doc ID
3. Open doc in Coda
4. Install CSM Intelligence Platform pack
5. Add tables to 6 pages (follow VIEW-001 to VIEW-005 instructions)
6. Configure views, filters, formatting
7. Copy Doc ID to script (line 26)
8. Done! Now create infinite copies in 5 seconds each ✅
```

---

## 💡 Pro Tips

✅ **Use backfill** - Saves 30 minutes per template
✅ **Create master once** - 60 min investment, infinite 5-second copies
✅ **Maintain Backfill Data** - Keep health scores current
✅ **Batch create** - Create 10 templates in 100 seconds
✅ **Log everything** - Script auto-logs to sheet for tracking

---

## 🐛 Troubleshooting Quick Fixes

| Problem | Quick Fix |
|---------|-----------|
| "API Connection Failed" | Check API token (line 20), get new one from coda.io/account |
| "Backfill Data sheet not found" | Run "Setup Backfill Sheet" first |
| "No data found" | Add at least 1 account to Backfill Data sheet |
| "Template empty" | Use "Copy Master Template" method (not "from scratch") |
| Menu not showing | Run setupMenu function, grant permissions, refresh |
| "Failed to add row" | Wait 5 seconds, try again (rate limit) |

---

## 📈 Time Savings Calculator

| Templates Created | Manual Time | With Script | Time Saved |
|-------------------|-------------|-------------|------------|
| 1 | 65 min | 10 sec | **64 min 50 sec** |
| 5 | 5.4 hours | 50 sec | **5.3 hours** |
| 10 | 10.8 hours | 100 sec | **10.6 hours** |
| 50 | 54 hours | 500 sec (8 min) | **53.9 hours** 🚀 |

**Average savings: 99.7% per template**

---

## 🔗 Quick Links

- Get API Token: https://coda.io/account
- Pack Management: https://coda.io/p/46088
- Coda API Docs: https://coda.io/developers/apis/v1
- Apps Script Docs: https://developers.google.com/apps-script

---

## 📖 Documentation Files

| File | What's Inside | Read Time |
|------|---------------|-----------|
| **README.md** | Quick start guide | 5 min |
| **SETUP_GUIDE.md** | Detailed setup & troubleshooting | 15 min |
| **BACKFILL_GUIDE.md** | Complete backfill documentation | 10 min |
| **SUMMARY.md** | Big picture overview | 8 min |
| **QUICK_REFERENCE.md** | This cheat sheet | 3 min |

**Start here:** README.md → SETUP_GUIDE.md → Test with 1 template → Read rest

---

## ✅ Checklist: First Template Creation

```
□ Script installed in Google Apps Script
□ API token added (line 20)
□ setupMenu run successfully
□ Menu appears in Google Sheet
□ "Test API Connection" succeeds
□ Master template doc created and configured
□ Master Doc ID added to script (line 26)
□ Backfill Data sheet setup
□ At least 1 account added to Backfill Data
□ Click "Create Template with Backfill Data"
□ Select account
□ Template created successfully! 🎉
□ Open in Coda to verify data
□ Publish as Coda template (optional)
```

---

## 🎓 Support Resources

**Questions about:**
- Script setup → Read SETUP_GUIDE.md
- Backfill feature → Read BACKFILL_GUIDE.md
- Big picture → Read SUMMARY.md
- Errors → Check troubleshooting sections
- Coda API → Read https://coda.io/developers/apis/v1

---

## 🚀 Next Steps

1. ✅ **Right now (5 min):** Install script, add API token
2. ✅ **Today (60 min):** Create master template doc
3. ✅ **This week:** Add 4-10 accounts to Backfill Data
4. ✅ **This week:** Create 5+ templates, test workflow
5. ✅ **This month:** Roll out to team (if applicable)

---

**Print this page** and keep it next to your desk for quick reference! 📄

**Pack Version:** 11 | **Script Version:** 1.1 | **Updated:** Nov 2024
