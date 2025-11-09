// ============================================================================
// STRATEGIC ACCOUNT TRACKING PACK - MAIN ENTRY POINT
// ============================================================================

export { pack } from "./pack";

// ============================================================================
// AGENT EXPORTS FOR TESTING AND EXTENSIBILITY
// ============================================================================

export { setupTables } from "./agents/schema-agent";
export { setupFormulas } from "./agents/formula-agent";
export { setupAutomations } from "./agents/automation-agent";
export { setupViews } from "./agents/view-agent";
export { setupTesting } from "./agents/testing-agent";

// ============================================================================
// UTILITY EXPORTS
// ============================================================================

export const PACK_VERSION = "1.0.0";
export const PACK_NAME = "Strategic Account Tracking";
export const PACK_DESCRIPTION = "12-Table Architecture for MuleSoft Customer Success Intelligence Platform";

console.log(`${PACK_NAME} v${PACK_VERSION} - ${PACK_DESCRIPTION}`);
console.log("Multi-Agent Architecture: Schema ✓ Formula ✓ Automation ✓ View ✓ Testing ✓");
