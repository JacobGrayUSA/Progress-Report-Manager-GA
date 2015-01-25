/**
 * Creates a menu entry in the Google Docs UI when the document is opened.
 *
 * @param {object} e The event parameter for a simple onOpen trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode.
 */
function onOpen(e) {
  SpreadsheetApp.getUi().createAddonMenu()
      .addItem('Start', 'showSidebar')
      .addToUi();
  // get all properties in each of the three property stores.
  var scriptProperties = PropertiesService.getScriptProperties();
  var userProperties = PropertiesService.getUserProperties();
  var documentProperties = PropertiesService.getDocumentProperties();
}

/**
 * Runs when the add-on is installed.
 *
 * @param {object} e The event parameter for a simple onInstall trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode. (In practice, onInstall triggers always
 *     run in AuthMode.FULL, but onOpen triggers may be AuthMode.LIMITED or
 *     AuthMode.NONE.)
 */
function onInstall(e) {
  onOpen(e);
}

/**
 * Opens a sidebar in the document containing the add-on's user interface.
 */
function showSidebar() {
  var ui = HtmlService.createHtmlOutputFromFile('Sidebar-01')
      .setTitle('Progress Report Start');
  SpreadsheetApp.getUi().showSidebar(ui);
}

/**
 * Asks the user for the password defined below.  Not much for security, as it
 * assumes if you know how to get into the script editor.  But it gives easy
 * access for people to test stuff, the button & all can always be commented out
 * or for production use.  If the "devMode" property is enabled, no password is
 * requested.
 *
 * changes the property to enable "devMode" and load the dev sidebar
 */
function confirmDevMode() {
  //SpreadsheetApp.getUi().alert('In confirmDevMode().');
  // if DevMode already enabled, don't need to do anything, but should at least tell the user
  var userProperties = PropertiesService.getUserProperties();
  var propUserDevMode = userProperties.getProperty('DEV_MODE');
  //SpreadsheetApp.getUi().alert('Found: ' + propUserDevMode);
  if (propUserDevMode != '1') {
    var pwdVar = 'sscps123';
    var ui = SpreadsheetApp.getUi();
    var devModeDialogResult = ui.prompt(
        'Enable Dev Mode?',
        'This will enable the developer sidebar.  Do not run those processes\nunless you know what they do.  BE CAREFUL!  Enter password to enable:',
        ui.ButtonSet.OK_CANCEL);
    // Process the user's response.
    var devModeDialogResultButtonVal = devModeDialogResult.getSelectedButton();
    var devModeDialogResultTextVal = devModeDialogResult.getResponseText();
    if (devModeDialogResultButtonVal == ui.Button.OK) {
      // User clicked "OK".
      if (devModeDialogResultTextVal == pwdVar) {
        userProperties.setProperty('DEV_MODE', '1');
        var propUserDevMode = '1';
      } else {
        ui.alert('Incorrect value, are you sure you want to got to Dev Mode?');
        userProperties.setProperty('DEV_MODE', '0');
        var propUserDevMode = '0';
      }
    } else {
      userProperties.setProperty('DEV_MODE', '0');
      var propUserDevMode = '0';
    }
  } else {
    SpreadsheetApp.getUi().alert('Dev Mode already enabled.');
  }
  if (propUserDevMode != '1') {
    
  }
}


