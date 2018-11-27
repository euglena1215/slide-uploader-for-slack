import { PDF_FILES_SHEET } from "../const";
import { Slide } from "./getTmpPdfFromSlack";

export const savePdfFileToSpreadSheet = (pdfFiles: Slide[]) => {
  pdfFiles.forEach(pdfFile => {
    PDF_FILES_SHEET.appendRow([
      pdfFile.fileId,
      pdfFile.pdfUrl,
      pdfFile.imgUrl,
      pdfFile.uploadUser,
      pdfFile.aspectRatio,
      pdfFile.timestamp,
      pdfFile.keywords,
    ]);
  });
};

export const getLastSaveFileId = () => {
  return PDF_FILES_SHEET.getRange(PDF_FILES_SHEET.getLastRow(), 1).getValue();
};
