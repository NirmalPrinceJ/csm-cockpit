# CSM Intelligence Platform - CLI Management Guide

Complete guide for managing the pack using Coda CLI commands.

---

## 📋 Current Pack Configuration

- **Pack ID**: 46088
- **Current Version**: 6
- **Pack File**: `src/pack.ts`
- **Configuration**: `src/.coda-pack.json`

---

## 🚀 Common CLI Commands

### Development Workflow

**1. Validate Pack**
```bash
npm run validate
# or
npx coda validate src/pack.ts
```
Validates pack structure, schemas, and formulas without building.

**2. Build Pack Locally**
```bash
npm run build
# or
npx coda build src/pack.ts
```
Compiles pack for debugging. Output in temporary directory.

**3. Test Formulas Locally**
```bash
npm run execute <FormulaName> [params]
# or
npx coda execute src/pack.ts Risk_Level 75 120
npx coda execute src/pack.ts GetAccountHealth "Acme Financial Services"
npx coda execute src/pack.ts CreateReferenceID "Acme Financial Services" "OBJ" 1
```

**4. Test Sync Tables Locally**
```bash
npx coda execute src/pack.ts SyncAccountMaster
npx coda execute src/pack.ts SyncStrategicObjectives
npx coda execute src/pack.ts SyncViewTemplates
```

---

### Publishing Workflow

**1. Upload New Version (Testing)**
```bash
npm run upload
# or
npx coda upload src/pack.ts
```
- Automatically increments version number
- Uploads to Pack ID 46088
- Available for testing in your docs immediately
- NOT released to public until you create a release

**2. Create Release (Publish)**
```bash
npx coda release src/pack.ts <version> --notes "Release notes here"
```
Example:
```bash
npx coda release src/pack.ts 6 --notes "Added lookup formulas for cross-table relationships. Includes GetAccountHealth, GetAccountARR, FormatAccountSummary, and CreateReferenceID."
```

---

## 🔧 Setup Commands

### Initial Setup (Already Complete)

**Register API Token**
```bash
npx coda register
```
Saves API token in `~/.coda.json`

**Create New Pack** (SKIP - we already have Pack ID 46088)
```bash
npx coda create src/pack.ts --name "CSM Intelligence Platform" --description "Complete Customer Success Management solution"
```
Creates `.coda-pack.json` with pack ID.

**Link Existing Pack** (SKIP - already linked)
```bash
npx coda link src/pack.ts 46088
```

---

## 🧪 Testing Commands

### Test Individual Formulas

**Risk Level Calculation**
```bash
npx coda execute src/pack.ts Risk_Level 60 45
# Expected: "High" (low health, renewal soon)

npx coda execute src/pack.ts Risk_Level 85 200
# Expected: "Low" (high health, renewal far)
```

**Days to Renewal**
```bash
npx coda execute src/pack.ts Days_To_Renewal "2025-05-01"
# Returns days until renewal
```

**Account Health Lookup**
```bash
npx coda execute src/pack.ts GetAccountHealth "Acme Financial Services"
# Returns: 82

npx coda execute src/pack.ts GetAccountHealth "Nordic Logistics Group"
# Returns: 88
```

**Account ARR Lookup**
```bash
npx coda execute src/pack.ts GetAccountARR "HealthTech Solutions"
# Returns: 350000
```

**Reference ID Generation**
```bash
npx coda execute src/pack.ts CreateReferenceID "Acme Financial Services" "OBJ" 5
# Returns: "ACME-OBJ-005"

npx coda execute src/pack.ts CreateReferenceID "Nordic Logistics Group" "INIT" 12
# Returns: "NORD-INIT-012"
```

**Composite Health Score**
```bash
npx coda execute src/pack.ts Composite_Health 85 80 90 75
# Returns weighted composite health score
```

---

### Test Sync Tables

**Test AccountMaster Sync**
```bash
npx coda execute src/pack.ts SyncAccountMaster
# Returns: Sample data for 3 accounts
```

**Test QuickStartGuide Sync**
```bash
npx coda execute src/pack.ts SyncQuickStartGuide
# Returns: 8-step setup guide
```

**Test ViewTemplates Sync**
```bash
npx coda execute src/pack.ts SyncViewTemplates
# Returns: 5 view templates
```

---

## 📦 Version Management

### Version History
- **Version 1**: Initial pack with 14 sync tables
- **Version 2**: Added ViewTemplates (Table 15)
- **Version 3**: Updated metadata and keywords
- **Version 4**: Added QuickStartGuide (Table 16)
- **Version 5**: Generic branding (removed MuleSoft references)
- **Version 6**: Added lookup formulas (GetAccountHealth, GetAccountARR, FormatAccountSummary, CreateReferenceID)

### Creating New Versions

**Development Cycle**:
1. Make code changes in `src/pack.ts`, `src/schemas.ts`, or `src/helpers.ts`
2. Validate: `npm run validate`
3. Build locally: `npm run build`
4. Test formulas: `npx coda execute src/pack.ts <FormulaName> [params]`
5. Upload: `npm run upload` (auto-increments to Version 7)
6. Test in Coda doc
7. If successful, create release: `npx coda release src/pack.ts 7 --notes "..."`

**Before Uploading New Version - Checklist**:
- [ ] All formulas tested locally
- [ ] Build successful (`npm run build`)
- [ ] Validation passed (`npm run validate`)
- [ ] Sample data updated if needed
- [ ] Documentation updated (README.md)
- [ ] Release notes prepared

---

## 🔍 Debugging Commands

### View Pack Metadata
```bash
npx coda execute src/pack.ts --help
```

### Test with Debug Output
Add console.log statements in formulas/sync functions and run:
```bash
npx coda execute src/pack.ts <FormulaName> [params]
```

### Validate Schemas
```bash
npm run test
# Runs: TS_NODE_TRANSPILE_ONLY=1 npx ts-node src/testing.ts
```

---

## 📁 File Structure

```
csm-cockpit/
├── src/
│   ├── pack.ts              # Main pack definition (DO NOT MOVE)
│   ├── schemas.ts           # All table schemas
│   ├── helpers.ts           # Sync table functions
│   ├── lookups.ts           # Lookup formulas (reference, not used directly)
│   ├── formulas.ts          # Formula executors
│   └── .coda-pack.json      # Pack ID configuration (DO NOT DELETE)
├── package.json             # NPM scripts
├── tsconfig.json            # TypeScript config
└── Documentation files...
```

**IMPORTANT**:
- `src/.coda-pack.json` must stay in `src/` directory next to `pack.ts`
- Pack ID 46088 is registered and cannot be changed
- Always use `src/pack.ts` as the manifest file

---

## 🌐 Web Pack Studio Tasks

Some tasks require the web interface at https://coda.io/packs/46088:

**Web-Only Tasks**:
1. Edit pack name and description
2. Change pack icon
3. Configure pack listing (categories, screenshots)
4. Set rate limits
5. Configure OAuth credentials (Phase 2)
6. View usage analytics
7. Manage pack permissions

**Management URL**: https://coda.io/p/46088

---

## 🎯 Quick Reference

| Task | Command |
|------|---------|
| Validate | `npm run validate` |
| Build | `npm run build` |
| Test formula | `npx coda execute src/pack.ts <Formula> [params]` |
| Upload version | `npm run upload` |
| Release version | `npx coda release src/pack.ts <version> --notes "..."` |
| Test sync table | `npx coda execute src/pack.ts Sync<TableName>` |

---

## 🚨 Common Issues

### Issue: "Pack not found"
**Solution**: Verify `src/.coda-pack.json` contains `"packId": 46088`

### Issue: "Authentication failed"
**Solution**: Run `npx coda register` and re-enter API token

### Issue: "Unreachable code hit"
**Solution**: Check formula syntax - must use arrow functions `([param]) => { }`

### Issue: "Build failed"
**Solution**:
1. Check TypeScript syntax
2. Ensure all imports are correct
3. Validate schema properties match helpers.ts

### Issue: "Version already exists"
**Solution**: Upload creates new version automatically. Check current version on web.

---

## 🔐 Security

**API Token Location**: `~/.coda.json`
**Pack Credentials**: `src/.coda-credentials.json` (Phase 2, for OAuth)

**Never commit**:
- `.coda.json` (contains API token)
- `.coda-credentials.json` (contains OAuth credentials)
- Add both to `.gitignore`

---

## 📝 Example: Adding New Formula

**Step 1**: Add formula to `src/pack.ts`
```typescript
pack.addFormula({
  name: "MyNewFormula",
  description: "Description here",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "input",
      description: "Input description",
    }),
  ],
  resultType: coda.ValueType.String,
  execute: ([input]) => {
    return `Result: ${input}`;
  },
});
```

**Step 2**: Validate
```bash
npm run validate
```

**Step 3**: Test locally
```bash
npx coda execute src/pack.ts MyNewFormula "test input"
```

**Step 4**: Upload
```bash
npm run upload
# Auto-creates Version 7
```

**Step 5**: Test in Coda doc
1. Open a doc with the pack installed
2. Type `=MyNewFormula("test")`
3. Verify result

**Step 6**: Release (if successful)
```bash
npx coda release src/pack.ts 7 --notes "Added MyNewFormula for XYZ functionality"
```

---

## 📈 Next Steps

### Phase 2 Enhancements
When ready to add API integrations:

**1. Configure Authentication**
```bash
npx coda auth src/pack.ts
```

**2. Update pack.ts**
```typescript
pack.setUserAuthentication({
  type: coda.AuthenticationType.OAuth2,
  // ... OAuth config
});
```

**3. Test with credentials**
```bash
npx coda execute src/pack.ts <Formula> [params]
# Will use credentials from .coda-credentials.json
```

---

## 💡 Best Practices

1. **Always validate before upload**: `npm run validate`
2. **Test formulas locally first**: `npx coda execute`
3. **Write release notes**: Document what changed
4. **Test in dev doc**: Create a test doc before releasing
5. **Increment major versions**: For breaking changes (1.0 → 2.0)
6. **Use semantic versioning**: Major.Minor.Patch
7. **Keep pack.ts clean**: Extract complex logic to helpers.ts
8. **Document new formulas**: Update README.md and guides

---

## 🎓 Resources

- **Coda CLI Docs**: https://coda.io/packs/build/latest/guides/development/cli/
- **Pack SDK Docs**: https://coda.io/packs/build/latest/
- **Pack Studio**: https://coda.io/p/46088
- **Community**: https://community.coda.io/c/packs/

---

**Current Pack Status**: ✅ Version 6 Live | 16 Sync Tables | 4 Lookup Formulas | Phase 1 Complete
