export const API_TOKEN = PropertiesService.getScriptProperties().getProperty("SLACK_API_TOKEN");
export const TARGET_CHANNEL = PropertiesService.getScriptProperties().getProperty("SLACK_TARGET_CHANNEL");

export const SPREADSHEET_URL = PropertiesService.getScriptProperties().getProperty("SPREADSHEET_URL");
export const SHEET_APP = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
export const PDF_FILES_SHEET = SHEET_APP.getSheetByName("pdfFiles");
