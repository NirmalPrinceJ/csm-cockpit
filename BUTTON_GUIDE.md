# Button Guide - Easy Add/Modify for All Tables

## What's New in Version 17

### ✅ 5 Button-Friendly Actions

No more JSON formatting! Use simple Coda buttons with form fields.

**Available actions:**
1. **AddOrModifyAccount** - Add/update accounts
2. **AddOrModifyObjective** - Add/update strategic objectives
3. **AddOrModifyEngagement** - Log customer interactions
4. **AddOrModifyRisk** - Track account risks
5. **AddOrModifyTask** - Create action items

**Plus the universal action:**
- **UpsertData** - For advanced users or webhook integration

---

## How to Create Buttons in Coda

### Example 1: "Add Account" Button

**Step 1:** In your Coda doc, type `/button`

**Step 2:** Click "Button" from menu

**Step 3:** Configure button:
- **Label:** "Add Account"
- **Action:** Search for "AddOrModifyAccount"
- **Fill parameters:**

| Parameter | Value | Notes |
|-----------|-------|-------|
| accountName | `[Ask user]` | Required - user will type in |
| arr | `[Ask user]` | Optional |
| healthScore | `[Ask user]` | Optional |
| customerSuccessManager | `[Ask user]` | Optional |
| accountExecutive | `[Ask user]` | Optional |
| riskLevel | `[Ask user]` | Optional |

**Step 4:** Click "Done"

**Result:** When user clicks button, they get a form with all fields!

---

### Example 2: "Log QBR" Button (Pre-filled)

**Use case:** Quick logging of QBR meetings

**Step 1:** Create button → "Log QBR"

**Step 2:** Action: `AddOrModifyEngagement`

**Step 3:** Fill parameters:

| Parameter | Value | Notes |
|-----------|-------|-------|
| account | `[Ask user]` | User selects account |
| engagementDate | `Today()` | Auto-filled to today |
| engagementType | `"QBR"` | Hard-coded to QBR |
| sentiment | `[Ask user]` | User selects sentiment |
| keyTopics | `[Ask user]` | User types summary |

**Result:** One-click QBR logging with minimal fields!

---

### Example 3: "Add Risk" Button

**Step 1:** Create button → "Add Risk"

**Step 2:** Action: `AddOrModifyRisk`

**Step 3:** Parameters:

| Parameter | Value |
|-----------|-------|
| account | `[Ask user]` |
| riskTitle | `[Ask user]` |
| riskLevel | `[Ask user]` |
| riskCategory | `[Ask user]` |
| mitigationStrategy | `[Ask user]` |

**Result:** Easy risk tracking!

---

### Example 4: "Create Task" Button

**Use case:** Quick task creation from any page

**Step 1:** Create button → "Create Task"

**Step 2:** Action: `AddOrModifyTask`

**Step 3:** Parameters:

| Parameter | Value |
|-----------|-------|
| account | `[Current row account]` or `[Ask user]` |
| taskTitle | `[Ask user]` |
| priority | `"High"` (or ask user) |
| assignedTo | `User()` (current user) |
| dueDate | `Today() + 7` (7 days from now) |

**Result:** Tasks auto-assigned to you with 1-week due date!

---

### Example 5: "Update Account Health" Button

**Use case:** Quick health score updates from account page

**Step 1:** Create button → "Update Health"

**Step 2:** Action: `AddOrModifyAccount`

**Step 3:** Parameters:

| Parameter | Value | Notes |
|-----------|-------|-------|
| accountName | `thisRow.Account Name` | From current row |
| healthScore | `[Ask user]` | Only field to update |
| arr | _(leave empty)_ | Won't be updated |
| customerSuccessManager | _(leave empty)_ | Won't be updated |

**Result:** Update just health score without touching other fields!

---

## Advanced: Button with Formulas

### Dynamic Account Selector

Create button that auto-fills based on context:

```
Button: "Add Objective for This Account"
Action: AddOrModifyObjective
Parameters:
- account: thisRow.[Account Name]  ← From current row
- objectiveName: [Ask user]
- status: "Planning"  ← Default value
- progressPercent: 0  ← Start at 0%
```

**Usage:** Place this button in your AccountMaster table → automatically knows which account!

---

### Conditional Button Actions

Show different buttons based on data:

**If health score < 70:**
```
Button: "🚨 Add Critical Risk"
Action: AddOrModifyRisk
Parameters:
- account: thisRow.[Account Name]
- riskLevel: "Critical"  ← Pre-filled
- riskTitle: [Ask user]
```

**If health score > 80:**
```
Button: "✅ Log Success"
Action: AddOrModifyEngagement
Parameters:
- account: thisRow.[Account Name]
- engagementType: "Success Story"
- sentiment: "Very Positive"  ← Pre-filled
```

---

## Button Placement Ideas

### 1. In Tables

Add button column to any table:

**AccountMaster table:**
- "Add Objective" button
- "Log Engagement" button
- "Update Health" button

**Result:** Quick actions right in the table!

### 2. On View Pages

Create action panels:

```
═══════════════════════════════════════
         QUICK ACTIONS
═══════════════════════════════════════

[Add Account]  [Log QBR]  [Add Risk]  [Create Task]

```

### 3. In Forms

Add buttons to custom forms:

```
Account: Gard AS
Health Score: 80

[Update Health]  [Add Objective]  [Log Engagement]
```

### 4. Context Menus

Right-click options in tables (Coda feature)

---

## Real-World Examples

### Use Case 1: Post-QBR Workflow

**Scenario:** After every QBR, you need to:
1. Log the engagement
2. Update account health
3. Add any new objectives
4. Create follow-up tasks

**Solution:** Create a "Post-QBR Workflow" button group:

```
[1. Log QBR] → Adds engagement with today's date
     ↓
[2. Update Health] → Updates account health score
     ↓
[3. Add Objective] → Adds new strategic objective
     ↓
[4. Create Follow-up Task] → Auto-creates task with 1-week due date
```

**Result:** Complete post-QBR workflow in 4 clicks!

---

### Use Case 2: Daily Standup Updates

**Scenario:** Daily team standup, each CSM updates their accounts

**Solution:** Create standup update buttons:

```
CSM Dashboard

Your Accounts:
┌─────────────────────────────────────────┐
│ Gard AS - Health: 80                    │
│ [Update Health] [Add Task] [Log Touch]  │
├─────────────────────────────────────────┤
│ Wates Group - Health: 72                │
│ [Update Health] [Add Task] [Log Touch]  │
└─────────────────────────────────────────┘
```

**Result:** Quick daily updates without leaving the page!

---

### Use Case 3: Risk Review Meeting

**Scenario:** Weekly risk review, need to add/update risks

**Solution:** Create risk management buttons:

```
Risk Dashboard

[Add New Risk]  [Update Existing Risk]  [Mark Risk Mitigated]

Recent Risks:
┌────────────────────────────────────────┐
│ Budget constraints - Gard AS           │
│ [Update] [Mitigate] [Escalate]         │
└────────────────────────────────────────┘
```

---

## Button vs Formula vs Webhook

When to use each:

### Use Buttons When:
- ✅ Manual data entry by team members
- ✅ Quick updates during meetings
- ✅ Form-based workflows
- ✅ User needs to review before submitting

**Example:** "Log QBR" button after customer meeting

### Use Formulas When:
- ✅ Calculated fields
- ✅ Data transformations
- ✅ Cross-table lookups
- ✅ Automatic computations

**Example:** `=Composite_Health_Score(platform, business, stakeholder, strategic)`

### Use Webhooks When:
- ✅ External system integration
- ✅ Real-time automated updates
- ✅ Bulk data imports
- ✅ Scheduled jobs

**Example:** Salesforce opportunity closed → Auto-creates account

---

## Tips & Best Practices

### 1. Use Clear Button Labels

❌ Bad: "Action1", "Submit", "Go"
✅ Good: "Add Account", "Log QBR", "Create Task"

### 2. Pre-fill When Possible

Don't ask for data you already have:
- Account name from current row
- Date defaults to today
- Assigned to current user

### 3. Group Related Buttons

Create workflow sequences:
```
[1. Add Account] → [2. Add Objective] → [3. Create Task]
```

### 4. Use Conditional Visibility

Show buttons only when relevant:
- "Add Risk" only if health < 70
- "Schedule QBR" only if renewal < 90 days

### 5. Add Success Messages

Configure button to show result:
```
Button clicked → Shows: "✅ Account added successfully!"
```

---

## Comparison: Old vs New

### Before (Version 16)

**Manual JSON entry:**
```
=UpsertData('{
  "table": "accounts",
  "data": {
    "accountName": "Gard AS",
    "arr": 850000,
    "healthScore": 80
  }
}')
```

**Issues:**
- ❌ Need to type JSON
- ❌ Easy to make syntax errors
- ❌ No autocomplete
- ❌ Not user-friendly

### After (Version 17)

**Button-based entry:**
```
Click [Add Account] button
→ Form appears with fields:
   - Account Name: [Type here]
   - ARR: [Type here]
   - Health Score: [Type here]
   - CSM: [Select from list]
Click Submit
→ Done!
```

**Benefits:**
- ✅ No JSON needed
- ✅ Form validation
- ✅ Dropdowns for selections
- ✅ User-friendly
- ✅ Can't make syntax errors

---

## Complete Button Set

Recommended buttons for complete CSM Intelligence Platform:

### Data Entry Buttons
1. Add Account
2. Add Person
3. Add Objective
4. Add Initiative
5. Add Risk
6. Add Task
7. Log Engagement

### Update Buttons
8. Update Health Score
9. Update Account Info
10. Mark Risk Mitigated
11. Complete Task
12. Update Objective Progress

### Workflow Buttons
13. Post-QBR Workflow (multi-step)
14. Weekly Check-in (pre-filled engagement)
15. Risk Review (add/update risks)
16. Account Review (update all metrics)

---

## Next Steps

1. **Install Version 17** in your Coda doc
2. **Create your first button** - Try "Add Account"
3. **Test it** - Add a test account
4. **Build workflow** - Create button sequences for common tasks
5. **Train team** - Show them the buttons (no JSON needed!)

---

## Support

- **Button not working?** Check that Version 17 is installed
- **Missing fields?** All parameters except the first 1-2 are optional
- **Need more buttons?** Use UpsertData action for any table
- **Custom workflows?** Combine multiple button clicks

---

**Result:** Your team can now add/modify data with ZERO technical knowledge!

No JSON. No formulas. Just simple buttons. 🎉
