import { getTmpPdfFromSlack } from "./utils/getTmpPdfFromSlack";
import { savePdfFileToSpreadSheet, getLastSaveFileId } from "./utils/savePdfFileToSpreadSheet";
import { savePdfFileToDrive } from "./utils/savePdfFileToDrive";
import { getAllPdfFiles } from "./utils/getAllPdfFiles";

global.main = () => {
  const unSavedPdfFiles = getUnsavedPdffiles();
  const savedPdfFiles = savePdfFileToDrive(unSavedPdfFiles);
  savePdfFileToSpreadSheet(savedPdfFiles);
};

global.doGet = e => {
  const res = ContentService.createTextOutput();
  res.setMimeType(ContentService.MimeType.JSON);
  res.setContent(JSON.stringify(getAllPdfFiles()));

  return res;
};

const getUnsavedPdffiles = () => {
  const lastFileId = getLastSaveFileId().toString();
  const pdfFiles = getTmpPdfFromSlack();
  const index = pdfFiles.map(file => file.fileId.toString()).indexOf(lastFileId);
  return index === -1 ? pdfFiles : pdfFiles.slice(index + 1);
};
