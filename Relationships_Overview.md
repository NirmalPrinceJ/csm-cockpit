---
title: Relationships Overview
tags: [relationships, obsidian, coda, cs-platform]
aliases: [Data Relationships]
---

# Customer Success Platform Relationships

> [!summary] High-level relationship map connecting the 12 core tables within the MuleSoft Customer Success Intelligence Platform.

## Hub-and-Spoke
- [[Account_Master]] *(primary hub)*
  - ↳ [[Strategic_Objectives]]
  - ↳ [[MuleSoft_Capabilities]]
  - ↳ [[Value_Streams]]
  - ↳ [[API_Portfolio]]
  - ↳ [[Platform_Health_Metrics]]
  - ↳ [[Initiatives]]
  - ↳ [[Risk_Register]]
  - ↳ [[Stakeholder_Outcomes]]
  - ↳ [[Engagement_Log]]
  - ↔ [[People_Team]] *(via owner lookups)*
  - ↔ [[Business_Context]] *(1:1 profile)*

## Key Many-to-Many Bridges
- [[Strategic_Objectives]]
  - ⇄ [[MuleSoft_Capabilities]] (`Linked_Capabilities`)
  - ⇄ [[Value_Streams]] (`Linked_Value_Streams`)
  - ⇄ [[Initiatives]] (`Linked_Initiatives`)
  - ⇄ [[API_Portfolio]] (`Linked_Strategic_Objectives`)
  - ⇄ [[Stakeholder_Outcomes]] (`Linked_Strategic_Objective`)
  - ⇄ [[Platform_Health_Metrics]] (`Linked_Strategic_Objective`)
- [[Value_Streams]]
  - ⇄ [[MuleSoft_Capabilities]] (`Enabled_MuleSoft_Capabilities`)
  - ⇄ [[API_Portfolio]] (`Linked_Value_Streams`)
  - ⇄ [[Stakeholder_Outcomes]] (`Linked_Value_Stream`)
- [[MuleSoft_Capabilities]]
  - ⇄ [[Risk_Register]] (`Affected_Capability`)
  - ⇄ [[Initiatives]] (`Linked_Capabilities`)

## Automation Touchpoints
- [[Platform_Health_Metrics]] ↦ `Health_Status_Numeric` → [[Account_Master]].`Platform_Technical_Health`
- [[Stakeholder_Outcomes]] ↦ `Target_Achievement_Percent` → [[Account_Master]].`Business_Value_Realization`
- [[Engagement_Log]] ↦ `Relationship_Depth_Score` → [[Account_Master]].`Stakeholder_Engagement`
- [[Strategic_Objectives]] ↦ `Status` → [[Account_Master]].`Strategic_Alignment`
- [[Risk_Register]] ↦ `Mitigation_Initiative` → [[Initiatives]]

## Supporting Tables (Snapshots)
- `[[Account_Master_History]]` ← [[Account_Master]] daily snapshots
- `[[Platform_Health_Metrics_History]]` ← [[Platform_Health_Metrics]] daily snapshots

> [!tip] Navigation
> Use Obsidian graph view to explore relationships by opening any table note and following the linked references in the **Key Relationships** section.
