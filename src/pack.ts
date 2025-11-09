import * as coda from "@codahq/packs-sdk";

/**
 * Strategic Account Tracking Pack
 * 12-Table Architecture for MuleSoft Customer Success Intelligence
 *
 * Multi-Agent Development:
 * - Schema Agent: Table definitions and relationships
 * - Formula Agent: Calculations and business logic
 * - Automation Agent: Buttons and workflows
 * - View Agent: Filtered views and dashboards
 * - Testing Agent: Validation and QA
 */

export const pack = coda.newPack();

// ============================================================================
// PACK METADATA
// ============================================================================

pack.addNetworkDomain("coda.io");
pack.addNetworkDomain("localhost");

pack.setUserAuthentication({
  type: coda.AuthenticationType.CodaApiHeaderBearerToken,
  instructionsUrl: "https://coda.io/account",
});

// ============================================================================
// IMPORT AGENT MODULES
// ============================================================================

// Schema Agent: Table definitions and relationships
import { setupTables } from "./agents/schema-agent";
// Formula Agent: Calculations and business logic
import { setupFormulas } from "./agents/formula-agent";
// Automation Agent: Buttons and workflows
import { setupAutomations } from "./agents/automation-agent";
// View Agent: Filtered views and dashboards
import { setupViews } from "./agents/view-agent";
// Testing Agent: Validate functionality and data integrity
import { setupTesting } from "./agents/testing-agent";

// ============================================================================
// COORDINATE ALL AGENTS
// ============================================================================

setupTables(pack);
setupFormulas(pack);
setupAutomations(pack);
setupViews(pack);
setupTesting(pack);

// ============================================================================
// EXPORT PACK
// ============================================================================

export { pack };
