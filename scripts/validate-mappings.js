#!/usr/bin/env node

/**
 * Validation Script for Coda Table Mappings
 * Validates the TABLE_MAPPINGS.json file for consistency and completeness
 */

const fs = require('fs');
const path = require('path');

const MAPPINGS_FILE = path.join(__dirname, '..', 'TABLE_MAPPINGS.json');

// Load mappings
let mappings;
try {
  const content = fs.readFileSync(MAPPINGS_FILE, 'utf8');
  mappings = JSON.parse(content);
} catch (error) {
  console.error('❌ Error loading TABLE_MAPPINGS.json:', error.message);
  process.exit(1);
}

// Validation results
const errors = [];
const warnings = [];
const info = [];

// Table definitions from schemas
const EXPECTED_TABLES = [
  'PeopleTeam',
  'AccountMaster',
  'BusinessContext',
  'StrategicObjectives',
  'MuleSoftCapabilities',
  'ValueStreams',
  'APIPortfolio',
  'PlatformHealthMetrics',
  'Initiatives',
  'RiskRegister',
  'StakeholderOutcomes',
  'EngagementLog',
  'SuccessPlanTracker',
  'ActivitiesTasks'
];

// Expected identity names
const EXPECTED_IDENTITIES = {
  'PeopleTeam': 'Person',
  'AccountMaster': 'Account',
  'BusinessContext': 'Context',
  'StrategicObjectives': 'Objective',
  'MuleSoftCapabilities': 'Capability',
  'ValueStreams': 'ValueStream',
  'APIPortfolio': 'API',
  'PlatformHealthMetrics': 'Metric',
  'Initiatives': 'Initiative',
  'RiskRegister': 'Risk',
  'StakeholderOutcomes': 'Outcome',
  'EngagementLog': 'Engagement',
  'SuccessPlanTracker': 'SuccessPlan',
  'ActivitiesTasks': 'Task'
};

console.log('🔍 Validating Coda Table Mappings...\n');

// 1. Check all expected tables are present
console.log('1. Checking table presence...');
EXPECTED_TABLES.forEach(tableName => {
  if (!mappings.tables[tableName]) {
    errors.push(`Missing table: ${tableName}`);
  } else {
    info.push(`✓ Found table: ${tableName}`);
  }
});

// 2. Validate table structure
console.log('\n2. Validating table structure...');
Object.entries(mappings.tables).forEach(([tableName, tableDef]) => {
  // Check required fields
  if (!tableDef.id) {
    errors.push(`${tableName}: Missing 'id' field`);
  } else if (tableDef.id !== EXPECTED_IDENTITIES[tableName]) {
    warnings.push(`${tableName}: Identity '${tableDef.id}' doesn't match expected '${EXPECTED_IDENTITIES[tableName]}'`);
  }
  
  if (!tableDef.primaryKey) {
    errors.push(`${tableName}: Missing 'primaryKey' field`);
  }
  
  if (!tableDef.displayProperty) {
    errors.push(`${tableName}: Missing 'displayProperty' field`);
  }
  
  if (!tableDef.relationships) {
    warnings.push(`${tableName}: Missing 'relationships' object`);
  }
});

// 3. Validate relationships
console.log('\n3. Validating relationships...');
const relationshipCounts = {
  oneToOne: 0,
  oneToMany: 0,
  manyToOne: 0,
  manyToMany: 0
};

Object.entries(mappings.tables).forEach(([tableName, tableDef]) => {
  if (!tableDef.relationships) return;
  
  const rels = tableDef.relationships;
  
  // Count relationships
  if (rels.oneToOne) {
    relationshipCounts.oneToOne += rels.oneToOne.length;
    rels.oneToOne.forEach(rel => {
      if (!rel.targetTable || !rel.sourceField || !rel.targetField) {
        errors.push(`${tableName}: Invalid oneToOne relationship`);
      }
    });
  }
  
  if (rels.oneToMany) {
    relationshipCounts.oneToMany += rels.oneToMany.length;
    rels.oneToMany.forEach(rel => {
      if (!rel.targetTable || !rel.sourceField || !rel.targetField) {
        errors.push(`${tableName}: Invalid oneToMany relationship`);
      }
      // Verify target table exists
      if (!mappings.tables[rel.targetTable]) {
        errors.push(`${tableName}: oneToMany references non-existent table '${rel.targetTable}'`);
      }
    });
  }
  
  if (rels.manyToOne) {
    relationshipCounts.manyToOne += rels.manyToOne.length;
    rels.manyToOne.forEach(rel => {
      if (!rel.targetTable || !rel.sourceField || !rel.targetField) {
        errors.push(`${tableName}: Invalid manyToOne relationship`);
      }
      // Verify target table exists
      if (!mappings.tables[rel.targetTable]) {
        errors.push(`${tableName}: manyToOne references non-existent table '${rel.targetTable}'`);
      }
    });
  }
  
  if (rels.manyToMany) {
    relationshipCounts.manyToMany += rels.manyToMany.length;
    rels.manyToMany.forEach(rel => {
      if (!rel.targetTable || !rel.sourceField || !rel.targetField) {
        errors.push(`${tableName}: Invalid manyToMany relationship`);
      }
      if (!rel.junctionType) {
        warnings.push(`${tableName}: manyToMany relationship missing 'junctionType'`);
      }
      // Verify target table exists
      if (!mappings.tables[rel.targetTable]) {
        errors.push(`${tableName}: manyToMany references non-existent table '${rel.targetTable}'`);
      }
    });
  }
});

// 4. Check for circular references
console.log('\n4. Checking for circular references...');
const visited = new Set();
const recursionStack = new Set();

function checkCircular(tableName, path = []) {
  if (recursionStack.has(tableName)) {
    warnings.push(`Potential circular reference: ${[...path, tableName].join(' -> ')}`);
    return;
  }
  
  if (visited.has(tableName)) return;
  
  visited.add(tableName);
  recursionStack.add(tableName);
  
  const tableDef = mappings.tables[tableName];
  if (!tableDef || !tableDef.relationships) {
    recursionStack.delete(tableName);
    return;
  }
  
  const allRels = [
    ...(tableDef.relationships.oneToOne || []),
    ...(tableDef.relationships.oneToMany || []),
    ...(tableDef.relationships.manyToOne || []),
    ...(tableDef.relationships.manyToMany || [])
  ];
  
  allRels.forEach(rel => {
    if (rel.targetTable && rel.targetTable !== tableName) {
      checkCircular(rel.targetTable, [...path, tableName]);
    }
  });
  
  recursionStack.delete(tableName);
}

Object.keys(mappings.tables).forEach(tableName => {
  if (!visited.has(tableName)) {
    checkCircular(tableName);
  }
});

// 5. Validate integration points
console.log('\n5. Validating integration points...');
if (mappings.integrationPoints) {
  Object.entries(mappings.integrationPoints).forEach(([pointName, pointDef]) => {
    if (!pointDef.dependencies || !Array.isArray(pointDef.dependencies)) {
      warnings.push(`Integration point '${pointName}': Missing or invalid dependencies`);
    } else {
      pointDef.dependencies.forEach(dep => {
        if (!mappings.tables[dep]) {
          errors.push(`Integration point '${pointName}': References non-existent table '${dep}'`);
        }
      });
    }
  });
}

// 6. Validate data flow
console.log('\n6. Validating data flow...');
if (mappings.dataFlow) {
  Object.entries(mappings.dataFlow).forEach(([flowName, flowDef]) => {
    if (!flowDef.path || !Array.isArray(flowDef.path)) {
      warnings.push(`Data flow '${flowName}': Missing or invalid path`);
    } else {
      flowDef.path.forEach(tableName => {
        if (!mappings.tables[tableName]) {
          errors.push(`Data flow '${flowName}': References non-existent table '${tableName}'`);
        }
      });
    }
  });
}

// Print results
console.log('\n' + '='.repeat(60));
console.log('VALIDATION RESULTS');
console.log('='.repeat(60));

if (info.length > 0) {
  console.log(`\n✅ Info (${info.length}):`);
  info.slice(0, 5).forEach(msg => console.log(`   ${msg}`));
  if (info.length > 5) {
    console.log(`   ... and ${info.length - 5} more`);
  }
}

if (warnings.length > 0) {
  console.log(`\n⚠️  Warnings (${warnings.length}):`);
  warnings.forEach(msg => console.log(`   ${msg}`));
}

if (errors.length > 0) {
  console.log(`\n❌ Errors (${errors.length}):`);
  errors.forEach(msg => console.log(`   ${msg}`));
}

console.log('\n' + '='.repeat(60));
console.log('RELATIONSHIP SUMMARY');
console.log('='.repeat(60));
console.log(`1:1 Relationships:     ${relationshipCounts.oneToOne}`);
console.log(`1:Many Relationships:  ${relationshipCounts.oneToMany}`);
console.log(`Many:1 Relationships:  ${relationshipCounts.manyToOne}`);
console.log(`Many:Many Relationships: ${relationshipCounts.manyToMany}`);
console.log(`Total Relationships:   ${Object.values(relationshipCounts).reduce((a, b) => a + b, 0)}`);

// Exit code
if (errors.length > 0) {
  console.log('\n❌ Validation failed with errors');
  process.exit(1);
} else if (warnings.length > 0) {
  console.log('\n⚠️  Validation passed with warnings');
  process.exit(0);
} else {
  console.log('\n✅ Validation passed successfully');
  process.exit(0);
}

