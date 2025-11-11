/**
 * Coda Template Creator - Google Apps Script
 *
 * Creates CSM Intelligence Platform templates in Coda via API
 *
 * Setup Instructions:
 * 1. Create new Google Sheet
 * 2. Extensions → Apps Script
 * 3. Paste this code
 * 4. Update CODA_API_TOKEN with your token from coda.io/account
 * 5. Run setupMenu() once to add custom menu
 * 6. Use "Coda Templates" menu in sheet
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  CODA_API_TOKEN: 'YOUR_CODA_API_TOKEN_HERE', // Get from https://coda.io/account
  CODA_API_BASE: 'https://coda.io/apis/v1',
  PACK_ID: '46088', // CSM Intelligence Platform Pack

  // Template doc ID (if using copy method - faster)
  // Leave blank to create from scratch
  MASTER_TEMPLATE_DOC_ID: '', // Format: 'abc123def456'

  // Workspace ID (optional, for workspace-specific templates)
  WORKSPACE_ID: ''
};

// ============================================================================
// MENU SETUP
// ============================================================================

/**
 * Creates custom menu in Google Sheets
 */
function onOpen() {
  setupMenu();
}

function setupMenu() {
  SpreadsheetApp.getUi()
    .createMenu('🎯 Coda Templates')
    .addItem('📋 Create Full Workspace Template', 'createFullWorkspaceTemplate')
    .addItem('📄 Create Single Account Template', 'createSingleAccountTemplate')
    .addItem('📝 Create Template with Backfill Data', 'createTemplateWithBackfill')
    .addSeparator()
    .addItem('📊 List My Coda Docs', 'listCodaDocs')
    .addItem('🔧 Test API Connection', 'testApiConnection')
    .addSeparator()
    .addItem('📋 Setup Backfill Sheet', 'setupBackfillSheet')
    .addItem('⚙️ Settings', 'showSettings')
    .addToUi();
}

// ============================================================================
// MAIN TEMPLATE CREATION FUNCTIONS
// ============================================================================

/**
 * Creates a complete CSM Intelligence Platform workspace template
 */
function createFullWorkspaceTemplate() {
  const ui = SpreadsheetApp.getUi();

  // Get template name from user
  const response = ui.prompt(
    'Create Full Workspace Template',
    'Enter template name:',
    ui.ButtonSet.OK_CANCEL
  );

  if (response.getSelectedButton() !== ui.Button.OK) {
    return;
  }

  const templateName = response.getResponseText() || 'CSM Intelligence Platform - Full Workspace';

  ui.alert('Creating template...', 'This may take 30-60 seconds. Please wait.', ui.ButtonSet.OK);

  try {
    let docId;

    if (CONFIG.MASTER_TEMPLATE_DOC_ID) {
      // Method 1: Copy existing master doc (FASTER - recommended)
      docId = copyMasterDoc(templateName);
      Logger.log('Copied master doc: ' + docId);
    } else {
      // Method 2: Create from scratch via API
      docId = createDocFromScratch(templateName);
      Logger.log('Created new doc: ' + docId);
    }

    const docUrl = `https://coda.io/d/_d${docId}`;

    ui.alert(
      '✅ Template Created!',
      `Template "${templateName}" created successfully!\n\n` +
      `Doc ID: ${docId}\n` +
      `URL: ${docUrl}\n\n` +
      `Next steps:\n` +
      `1. Open the doc in Coda\n` +
      `2. Go to Doc Settings → Create a template\n` +
      `3. Publish to your workspace`,
      ui.ButtonSet.OK
    );

    // Log to sheet
    logTemplateCreation(templateName, docId, docUrl);

  } catch (error) {
    Logger.log('Error: ' + error);
    ui.alert('❌ Error', 'Failed to create template:\n' + error.message, ui.ButtonSet.OK);
  }
}

/**
 * Creates a single-account executive summary template
 */
function createSingleAccountTemplate() {
  const ui = SpreadsheetApp.getUi();

  const response = ui.prompt(
    'Create Single Account Template',
    'Enter template name (or press OK for default):',
    ui.ButtonSet.OK_CANCEL
  );

  if (response.getSelectedButton() !== ui.Button.OK) {
    return;
  }

  const templateName = response.getResponseText() || 'CSM Account Executive Summary';

  ui.alert('Creating template...', 'This may take 15-30 seconds. Please wait.', ui.ButtonSet.OK);

  try {
    const docId = createSingleAccountDoc(templateName);
    const docUrl = `https://coda.io/d/_d${docId}`;

    ui.alert(
      '✅ Template Created!',
      `Single-account template "${templateName}" created!\n\n` +
      `Doc ID: ${docId}\n` +
      `URL: ${docUrl}\n\n` +
      `Next steps:\n` +
      `1. Open the doc and add pack tables\n` +
      `2. Create a template from Doc Settings\n` +
      `3. Publish to workspace`,
      ui.ButtonSet.OK
    );

    logTemplateCreation(templateName, docId, docUrl);

  } catch (error) {
    Logger.log('Error: ' + error);
    ui.alert('❌ Error', 'Failed to create template:\n' + error.message, ui.ButtonSet.OK);
  }
}

// ============================================================================
// CODA API FUNCTIONS
// ============================================================================

/**
 * Makes authenticated API call to Coda
 */
function callCodaApi(endpoint, method = 'GET', payload = null) {
  const url = CONFIG.CODA_API_BASE + endpoint;

  const options = {
    method: method,
    headers: {
      'Authorization': 'Bearer ' + CONFIG.CODA_API_TOKEN,
      'Content-Type': 'application/json'
    },
    muteHttpExceptions: true
  };

  if (payload) {
    options.payload = JSON.stringify(payload);
  }

  Logger.log(`API Call: ${method} ${endpoint}`);

  const response = UrlFetchApp.fetch(url, options);
  const responseCode = response.getResponseCode();
  const responseText = response.getContentText();

  Logger.log(`Response: ${responseCode}`);

  if (responseCode < 200 || responseCode >= 300) {
    throw new Error(`API Error ${responseCode}: ${responseText}`);
  }

  return JSON.parse(responseText);
}

/**
 * Creates new Coda doc
 */
function createCodaDoc(title, sourceDocId = null) {
  const payload = { title: title };

  if (sourceDocId) {
    payload.sourceDoc = sourceDocId;
  }

  const result = callCodaApi('/docs', 'POST', payload);
  return result.id;
}

/**
 * Copies master template doc
 */
function copyMasterDoc(newTitle) {
  if (!CONFIG.MASTER_TEMPLATE_DOC_ID) {
    throw new Error('MASTER_TEMPLATE_DOC_ID not configured');
  }

  return createCodaDoc(newTitle, CONFIG.MASTER_TEMPLATE_DOC_ID);
}

/**
 * Creates page in doc
 */
function createPage(docId, pageName) {
  const payload = { name: pageName };
  const result = callCodaApi(`/docs/${docId}/pages`, 'POST', payload);
  return result.id;
}

/**
 * Lists all Coda docs
 */
function listDocs() {
  const result = callCodaApi('/docs');
  return result.items;
}

/**
 * Gets doc info
 */
function getDocInfo(docId) {
  return callCodaApi(`/docs/${docId}`);
}

// ============================================================================
// TEMPLATE CREATION LOGIC
// ============================================================================

/**
 * Creates full workspace template from scratch
 */
function createDocFromScratch(templateName) {
  // Step 1: Create empty doc
  const docId = createCodaDoc(templateName);
  Logger.log('Created doc: ' + docId);

  // Wait for doc to be ready
  Utilities.sleep(2000);

  // Step 2: Create pages
  const pages = [
    '📚 Getting Started',
    '📊 Executive Summary',
    '🎯 My Command Center',
    '🏥 Health Dashboard',
    '📋 QBR Preparation',
    '💼 Renewal Pipeline'
  ];

  pages.forEach((pageName, index) => {
    try {
      Logger.log(`Creating page: ${pageName}`);
      createPage(docId, pageName);
      Utilities.sleep(1000); // Rate limiting
    } catch (error) {
      Logger.log(`Failed to create page ${pageName}: ${error}`);
    }
  });

  return docId;
}

/**
 * Creates single account template
 */
function createSingleAccountDoc(templateName) {
  // Create doc with single page
  const docId = createCodaDoc(templateName);
  Logger.log('Created single account doc: ' + docId);

  Utilities.sleep(2000);

  // Rename default page
  try {
    createPage(docId, 'Executive Summary');
  } catch (error) {
    Logger.log('Page creation note: ' + error);
  }

  return docId;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Tests API connection
 */
function testApiConnection() {
  const ui = SpreadsheetApp.getUi();

  try {
    const docs = listDocs();

    ui.alert(
      '✅ API Connection Successful!',
      `Connected to Coda API successfully.\n\n` +
      `You have ${docs.length} documents in your account.\n\n` +
      `API Token: ${CONFIG.CODA_API_TOKEN.substring(0, 20)}...`,
      ui.ButtonSet.OK
    );
  } catch (error) {
    ui.alert(
      '❌ API Connection Failed',
      `Could not connect to Coda API:\n\n${error.message}\n\n` +
      `Please check your API token in Settings.`,
      ui.ButtonSet.OK
    );
  }
}

/**
 * Lists Coda docs in a dialog
 */
function listCodaDocs() {
  const ui = SpreadsheetApp.getUi();

  try {
    const docs = listDocs();

    let message = `You have ${docs.length} Coda documents:\n\n`;

    docs.slice(0, 10).forEach(doc => {
      message += `• ${doc.name}\n  ID: ${doc.id}\n\n`;
    });

    if (docs.length > 10) {
      message += `\n... and ${docs.length - 10} more`;
    }

    ui.alert('📊 Your Coda Documents', message, ui.ButtonSet.OK);

  } catch (error) {
    ui.alert('❌ Error', 'Failed to list documents:\n' + error.message, ui.ButtonSet.OK);
  }
}

/**
 * Shows settings dialog
 */
function showSettings() {
  const ui = SpreadsheetApp.getUi();

  const message =
    `Current Settings:\n\n` +
    `API Token: ${CONFIG.CODA_API_TOKEN ? CONFIG.CODA_API_TOKEN.substring(0, 20) + '...' : 'NOT SET'}\n` +
    `Pack ID: ${CONFIG.PACK_ID}\n` +
    `Master Template Doc ID: ${CONFIG.MASTER_TEMPLATE_DOC_ID || 'Not set (will create from scratch)'}\n\n` +
    `To update settings:\n` +
    `1. Go to Extensions → Apps Script\n` +
    `2. Edit CONFIG object at top of code\n` +
    `3. Save and refresh sheet`;

  ui.alert('⚙️ Settings', message, ui.ButtonSet.OK);
}

/**
 * Logs template creation to sheet
 */
function logTemplateCreation(templateName, docId, docUrl) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Check if this is first entry
  if (sheet.getRange('A1').getValue() === '') {
    // Add headers
    sheet.getRange('A1:E1').setValues([[
      'Timestamp', 'Template Name', 'Doc ID', 'Doc URL', 'Status'
    ]]);
    sheet.getRange('A1:E1').setFontWeight('bold');
  }

  // Add new row
  sheet.appendRow([
    new Date(),
    templateName,
    docId,
    docUrl,
    'Created'
  ]);
}

// ============================================================================
// ADVANCED: FULL TEMPLATE SETUP WITH PACK TABLES
// ============================================================================

/**
 * Creates complete template with pack tables and views
 * NOTE: This requires the doc to have the pack installed manually first
 */
function createFullTemplateAdvanced(docId) {
  Logger.log('Setting up full template in doc: ' + docId);

  // This would require:
  // 1. Pack installation (must be done manually or via Coda UI)
  // 2. Table insertion (API doesn't support direct table creation from packs)
  // 3. Page configuration (limited API support)

  // Recommendation: Use copy method (copyMasterDoc) instead for full setup

  Logger.log('For full setup with pack tables, use the Copy Master Doc method.');
  Logger.log('Create a master doc manually in Coda with all tables configured, then copy it.');
}

// ============================================================================
// BATCH OPERATIONS
// ============================================================================

/**
 * Creates multiple templates from a list
 * Reads from "Templates to Create" sheet
 */
function batchCreateTemplates() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  let sheet = ss.getSheetByName('Templates to Create');

  if (!sheet) {
    ui.alert(
      'Setup Required',
      'Please create a sheet named "Templates to Create" with columns:\n' +
      'A: Template Name\n' +
      'B: Type (Full/Single)\n' +
      'C: Account Name (for single account templates)',
      ui.ButtonSet.OK
    );
    return;
  }

  const data = sheet.getRange('A2:C' + sheet.getLastRow()).getValues();
  const results = [];

  data.forEach((row, index) => {
    const [templateName, type, accountName] = row;

    if (!templateName) return;

    try {
      Logger.log(`Creating template ${index + 1}: ${templateName}`);

      let docId;
      if (type === 'Full') {
        docId = createDocFromScratch(templateName);
      } else {
        docId = createSingleAccountDoc(templateName);
      }

      results.push([templateName, docId, 'Success', new Date()]);

      // Rate limiting
      Utilities.sleep(2000);

    } catch (error) {
      Logger.log(`Error creating ${templateName}: ${error}`);
      results.push([templateName, '', 'Error: ' + error.message, new Date()]);
    }
  });

  // Write results
  const resultSheet = ss.getSheetByName('Creation Results') || ss.insertSheet('Creation Results');
  resultSheet.getRange(resultSheet.getLastRow() + 1, 1, results.length, 4).setValues(results);

  ui.alert('✅ Batch Creation Complete', `Created ${results.length} templates.`, ui.ButtonSet.OK);
}

// ============================================================================
// HELPER: CREATE MASTER TEMPLATE DOC (RUN ONCE)
// ============================================================================

/**
 * Creates a master template doc that can be copied later
 * This should be run ONCE to create your master template
 * Then manually configure it in Coda with all tables and formatting
 * Then use copyMasterDoc() to duplicate it quickly
 */
function createMasterTemplateDoc() {
  const ui = SpreadsheetApp.getUi();

  const response = ui.prompt(
    'Create Master Template Doc',
    'This will create a new doc that you can configure as your master template.\n\n' +
    'Enter name for master doc:',
    ui.ButtonSet.OK_CANCEL
  );

  if (response.getSelectedButton() !== ui.Button.OK) {
    return;
  }

  const masterName = response.getResponseText() || 'CSM Intelligence Platform - MASTER TEMPLATE';

  try {
    const docId = createDocFromScratch(masterName);
    const docUrl = `https://coda.io/d/_d${docId}`;

    ui.alert(
      '✅ Master Template Created!',
      `Master template doc created!\n\n` +
      `Doc ID: ${docId}\n` +
      `URL: ${docUrl}\n\n` +
      `NEXT STEPS:\n` +
      `1. Copy this Doc ID: ${docId}\n` +
      `2. Open the doc in Coda and set it up completely:\n` +
      `   - Install CSM Intelligence Platform pack\n` +
      `   - Add all tables to pages\n` +
      `   - Configure views, filters, formatting\n` +
      `3. Update CONFIG.MASTER_TEMPLATE_DOC_ID with this Doc ID\n` +
      `4. Use "Create Full Workspace Template" to copy this master`,
      ui.ButtonSet.OK
    );

    // Write to sheet for reference
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([
      new Date(),
      'MASTER TEMPLATE',
      docId,
      docUrl,
      'Configure this doc manually in Coda'
    ]);

  } catch (error) {
    ui.alert('❌ Error', 'Failed to create master doc:\n' + error.message, ui.ButtonSet.OK);
  }
}

// ============================================================================
// BACKFILL FUNCTIONALITY
// ============================================================================

/**
 * Sets up a backfill data sheet for pre-populating templates
 */
function setupBackfillSheet() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Check if sheet already exists
  let sheet = ss.getSheetByName('Backfill Data');

  if (sheet) {
    const response = ui.alert(
      'Sheet Exists',
      'Backfill Data sheet already exists. Do you want to reset it?',
      ui.ButtonSet.YES_NO
    );

    if (response === ui.Button.YES) {
      ss.deleteSheet(sheet);
    } else {
      return;
    }
  }

  // Create new sheet
  sheet = ss.insertSheet('Backfill Data');

  // Set up headers for AccountMaster data
  const headers = [
    'Account Name',
    'Industry Vertical',
    'Industry Sub-Sector',
    'Contract Type',
    'ARR',
    'CSM Name',
    'Account Executive',
    'Executive Sponsor',
    'Primary Contact Name',
    'Primary Contact Email',
    'Geography',
    'Health Score',
    'Business Value Score',
    'Stakeholder Engagement Score',
    'Strategic Alignment Score',
    'Contract Start Date',
    'Contract End Date',
    'Renewal Date',
    'Risk Level',
    'Notes'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.getRange(1, 1, 1, headers.length).setBackground('#4285f4');
  sheet.getRange(1, 1, 1, headers.length).setFontColor('#ffffff');

  // Add example row
  const exampleRow = [
    'Gard AS',
    'Maritime',
    'P&I Insurance',
    'Signature Success',
    850000,
    'Nirmal John',
    'Emilie Moen',
    'Christian Tome',
    'Christian Tome',
    'christian.tome@gard.no',
    'EMEA',
    80,
    75,
    78,
    79,
    '2024-01-01',
    '2025-12-31',
    '2025-12-31',
    'Healthy',
    'Example account - replace with your data'
  ];

  sheet.getRange(2, 1, 1, exampleRow.length).setValues([exampleRow]);
  sheet.getRange(2, 1, 1, exampleRow.length).setFontStyle('italic');

  // Auto-resize columns
  for (let i = 1; i <= headers.length; i++) {
    sheet.autoResizeColumn(i);
  }

  // Add instructions
  sheet.getRange('A4').setValue('INSTRUCTIONS:');
  sheet.getRange('A4').setFontWeight('bold');
  sheet.getRange('A5').setValue('1. Fill in account data in rows below the example');
  sheet.getRange('A6').setValue('2. Delete or replace the example row (row 2)');
  sheet.getRange('A7').setValue('3. Use "Create Template with Backfill Data" to create pre-populated templates');
  sheet.getRange('A8').setValue('4. Leave cells blank if you don\'t want to backfill that field');

  ui.alert(
    '✅ Backfill Sheet Created!',
    'The "Backfill Data" sheet is ready.\n\n' +
    'Fill in your account data and use "Create Template with Backfill Data" ' +
    'to create templates with pre-populated information.',
    ui.ButtonSet.OK
  );
}

/**
 * Creates template with backfill data from spreadsheet
 */
function createTemplateWithBackfill() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Check if backfill sheet exists
  const backfillSheet = ss.getSheetByName('Backfill Data');

  if (!backfillSheet) {
    ui.alert(
      'Setup Required',
      'Please run "Setup Backfill Sheet" first to create the data sheet.',
      ui.ButtonSet.OK
    );
    return;
  }

  // Get all data rows (skip header)
  const dataRange = backfillSheet.getRange(2, 1, backfillSheet.getLastRow() - 1, 20);
  const dataValues = dataRange.getValues();

  // Filter out empty rows and example row
  const accountsData = dataValues.filter(row => {
    return row[0] && row[0] !== 'Gard AS'; // Skip example row
  });

  if (accountsData.length === 0) {
    ui.alert(
      'No Data Found',
      'Please add at least one account to the Backfill Data sheet.',
      ui.ButtonSet.OK
    );
    return;
  }

  // Show account selection dialog
  const accountNames = accountsData.map(row => row[0]);
  const accountList = accountNames.map((name, i) => `${i + 1}. ${name}`).join('\n');

  const response = ui.prompt(
    'Select Account for Template',
    `Found ${accountNames.length} account(s):\n\n${accountList}\n\n` +
    'Enter account number (or account name):',
    ui.ButtonSet.OK_CANCEL
  );

  if (response.getSelectedButton() !== ui.Button.OK) {
    return;
  }

  const input = response.getResponseText().trim();
  let selectedIndex = -1;

  // Check if input is a number
  if (!isNaN(input)) {
    selectedIndex = parseInt(input) - 1;
  } else {
    // Try to find by name
    selectedIndex = accountNames.findIndex(name =>
      name.toLowerCase().includes(input.toLowerCase())
    );
  }

  if (selectedIndex < 0 || selectedIndex >= accountsData.length) {
    ui.alert('Invalid Selection', 'Please enter a valid account number or name.', ui.ButtonSet.OK);
    return;
  }

  const selectedAccount = accountsData[selectedIndex];
  const accountName = selectedAccount[0];

  // Confirm template creation
  const confirmResponse = ui.alert(
    'Create Template with Backfill',
    `Create template for: ${accountName}?\n\n` +
    `This will create a copy of your master template and update it with:\n` +
    `- Account: ${accountName}\n` +
    `- Industry: ${selectedAccount[1] || 'Not specified'}\n` +
    `- ARR: $${selectedAccount[4] ? selectedAccount[4].toLocaleString() : 'Not specified'}\n` +
    `- CSM: ${selectedAccount[5] || 'Not specified'}\n\n` +
    'Continue?',
    ui.ButtonSet.YES_NO
  );

  if (confirmResponse !== ui.Button.YES) {
    return;
  }

  ui.alert('Creating template...', 'This may take 30-60 seconds. Please wait.', ui.ButtonSet.OK);

  try {
    // Step 1: Create template copy
    const templateName = `${accountName} - CSM Executive Summary`;
    const docId = copyMasterDoc(templateName);

    Logger.log(`Created template doc: ${docId}`);

    // Wait for doc to be ready
    Utilities.sleep(3000);

    // Step 2: Get tables in the doc
    const tables = getDocTables(docId);
    Logger.log(`Found ${tables.length} tables`);

    // Step 3: Find AccountMaster table
    const accountMasterTable = tables.find(t =>
      t.name === 'AccountMaster' || t.name.includes('Account')
    );

    if (accountMasterTable) {
      Logger.log(`Found AccountMaster table: ${accountMasterTable.id}`);

      // Step 4: Add row with backfill data
      const rowData = prepareAccountMasterRow(selectedAccount);
      addRowToTable(docId, accountMasterTable.id, rowData);

      Logger.log('Added backfill row to AccountMaster');
    } else {
      Logger.log('AccountMaster table not found - skipping backfill');
    }

    const docUrl = `https://coda.io/d/_d${docId}`;

    ui.alert(
      '✅ Template Created with Backfill!',
      `Template "${templateName}" created successfully!\n\n` +
      `Doc ID: ${docId}\n` +
      `URL: ${docUrl}\n\n` +
      `Account data has been pre-populated in AccountMaster table.\n\n` +
      `Next steps:\n` +
      `1. Open the doc in Coda\n` +
      `2. Review and adjust the pre-filled data\n` +
      `3. Add additional data to other tables as needed\n` +
      `4. Create a template from Doc Settings if desired`,
      ui.ButtonSet.OK
    );

    // Log to sheet
    logTemplateCreation(templateName, docId, docUrl, 'With Backfill');

  } catch (error) {
    Logger.log('Error: ' + error);
    ui.alert('❌ Error', 'Failed to create template:\n' + error.message, ui.ButtonSet.OK);
  }
}

/**
 * Gets list of tables in a doc
 */
function getDocTables(docId) {
  try {
    const result = callCodaApi(`/docs/${docId}/tables`);
    return result.items || [];
  } catch (error) {
    Logger.log('Error getting tables: ' + error);
    return [];
  }
}

/**
 * Prepares AccountMaster row data from backfill sheet row
 */
function prepareAccountMasterRow(accountData) {
  // Map spreadsheet columns to Coda table columns
  // accountData array indices match the headers in setupBackfillSheet

  return {
    'accountName': accountData[0] || '',
    'industryVertical': accountData[1] || '',
    'industrySubSector': accountData[2] || '',
    'contractType': accountData[3] || '',
    'arr': accountData[4] || 0,
    'customerSuccessManager': accountData[5] || '',
    'accountExecutive': accountData[6] || '',
    'executiveSponsorCustomer': accountData[7] || '',
    'primaryContactName': accountData[8] || '',
    'primaryContactEmail': accountData[9] || '',
    'geography': accountData[10] || '',
    'platformHealthScore': accountData[11] || 0,
    'businessValueRealizationScore': accountData[12] || 0,
    'stakeholderEngagementScore': accountData[13] || 0,
    'strategicAlignmentScore': accountData[14] || 0,
    'contractStartDate': accountData[15] || '',
    'contractEndDate': accountData[16] || '',
    'renewalDate': accountData[17] || '',
    'riskLevel': accountData[18] || 'Healthy',
    'notes': accountData[19] || ''
  };
}

/**
 * Adds a row to a Coda table
 */
function addRowToTable(docId, tableId, rowData) {
  const payload = {
    rows: [
      {
        cells: Object.keys(rowData).map(key => ({
          column: key,
          value: rowData[key]
        }))
      }
    ]
  };

  try {
    const result = callCodaApi(`/docs/${docId}/tables/${tableId}/rows`, 'POST', payload);
    Logger.log('Row added successfully');
    return result;
  } catch (error) {
    Logger.log('Error adding row: ' + error);
    throw error;
  }
}

/**
 * Updates logging function to include backfill status
 */
function logTemplateCreation(templateName, docId, docUrl, status = 'Created') {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Check if this is first entry
  if (sheet.getRange('A1').getValue() === '') {
    // Add headers
    sheet.getRange('A1:E1').setValues([[
      'Timestamp', 'Template Name', 'Doc ID', 'Doc URL', 'Status'
    ]]);
    sheet.getRange('A1:E1').setFontWeight('bold');
  }

  // Add new row
  sheet.appendRow([
    new Date(),
    templateName,
    docId,
    docUrl,
    status
  ]);
}
