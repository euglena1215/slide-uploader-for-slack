import { PDF_FILES_SHEET } from "../const";
import { PdfFile } from "./getTmpPdfFromSlack";

export const getAllPdfFiles = () => {
  return PDF_FILES_SHEET.getRange(2, 1, PDF_FILES_SHEET.getLastRow() - 1, 5)
    .getValues()
    .map(arrayToPdfFile);
};

const arrayToPdfFile = (arr): PdfFile => {
  return {
    fileId: arr[0],
    pdfUrl: arr[1] + `&access_token=${ScriptApp.getOAuthToken()}`,
    imgUrl: arr[2] + `&access_token=${ScriptApp.getOAuthToken()}`,
    uploadUser: arr[3],
    aspectRatio: arr[4],
    timestamp: arr[5],
  };
};
