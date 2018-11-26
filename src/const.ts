export const ENDPOINT = {
  CHANNELS_HISTORY: "https://slack.com/api/channels.history",
  FILES_SHARED_PUBLIC_URL: "https://slack.com/api/files.sharedPublicURL",
  USERS_LIST: "https://slack.com/api/users.list",
};

export const API_TOKEN = PropertiesService.getScriptProperties().getProperty("SLACK_API_TOKEN");
export const TARGET_CHANNEL = PropertiesService.getScriptProperties().getProperty("SLACK_TARGET_CHANNEL");
export const BUILD_WEBHOOK = PropertiesService.getScriptProperties().getProperty("BUILD_WEBHOOK");

export const SPREADSHEET_URL = PropertiesService.getScriptProperties().getProperty("SPREADSHEET_URL");
export const SHEET_APP = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
export const PDF_FILES_SHEET = SHEET_APP.getSheetByName("pdfFiles");
export const USERS_SHEET = SHEET_APP.getSheetByName("users");
