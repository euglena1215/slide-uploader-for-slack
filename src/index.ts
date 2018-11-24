import { getTmpPdfFromSlack } from "./utils/getTmpPdfFromSlack";
import { savePdfFileToSpreadSheet, getLastSaveFileId } from "./utils/savePdfFileToSpreadSheet";
import { savePdfFileToDrive } from "./utils/savePdfFileToDrive";

global.main = () => {
  const unSavedPdfFiles = getUnsavedPdffiles();
  const savedPdfFiles = savePdfFileToDrive(unSavedPdfFiles);
  savePdfFileToSpreadSheet(savedPdfFiles);
};

const getUnsavedPdffiles = () => {
  const lastFileId = getLastSaveFileId().toString();
  const pdfFiles = getTmpPdfFromSlack();
  const index = pdfFiles.map(file => file.fileId.toString()).indexOf(lastFileId);
  return index === -1 ? pdfFiles : pdfFiles.slice(index + 1);
};
