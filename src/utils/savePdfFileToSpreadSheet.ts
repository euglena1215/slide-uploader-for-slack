import { PDF_FILES_SHEET } from "../const";
import { PdfFile } from "./getTmpPdfFromSlack";

export const savePdfFileToSpreadSheet = (pdfFiles: PdfFile[]) => {
  pdfFiles.forEach(pdfFile => {
    PDF_FILES_SHEET.appendRow([
      pdfFile.fileId,
      pdfFile.pdfUrl,
      pdfFile.imgUrl,
      pdfFile.uploadUser,
      pdfFile.aspectRatio,
      pdfFile.timestamp,
    ]);
  });
};

export const getLastSaveFileId = () => {
  return PDF_FILES_SHEET.getRange(PDF_FILES_SHEET.getLastRow(), 1).getValue();
};
