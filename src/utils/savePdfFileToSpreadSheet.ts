import { PdfFile } from "./getTmpPdfFromSlack";

const SPREADSHEET_URL = PropertiesService.getScriptProperties().getProperty("SPREADSHEET_URL");
const SHEET_APP = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
const PDF_FILES_SHEET = SHEET_APP.getSheetByName("pdfFiles");

export const savePdfFileToSpreadSheet = (pdfFiles: PdfFile[]) => {
  pdfFiles.forEach(pdfFile => {
    PDF_FILES_SHEET.appendRow([pdfFile.fileId, pdfFile.pdfUrl, pdfFile.imgUrl, pdfFile.uploadUser, pdfFile.timestamp]);
  });
};

export const getLastSaveFileId = () => {
  return PDF_FILES_SHEET.getRange(PDF_FILES_SHEET.getLastRow(), 1).getValue();
};
