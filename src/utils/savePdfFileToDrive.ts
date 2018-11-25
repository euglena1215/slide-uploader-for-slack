import { API_TOKEN } from "../const";
import { PdfFile } from "./getTmpPdfFromSlack";

const DRIVE_FOLDER_ID = PropertiesService.getScriptProperties().getProperty("DRIVE_FOLDER_ID");

export const savePdfFileToDrive = (pdfFiles: PdfFile[]): PdfFile[] => {
  const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);

  return pdfFiles.map(pdfFile => {
    const pdfName = `${pdfFile.fileId}.pdf`;
    const pdfBlob = UrlFetchApp.fetch(pdfFile.pdfUrl, {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
    });
    const pdf = DriveApp.createFile(pdfBlob);
    pdf.makeCopy(pdfName, folder);
    pdf.setTrashed(true);

    const imgName = `${pdfFile.fileId}.png`;
    const imgBlob = UrlFetchApp.fetch(pdfFile.imgUrl, {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
    });
    const img = DriveApp.createFile(imgBlob);
    img.makeCopy(imgName, folder);
    img.setTrashed(true);

    pdfFile.pdfUrl = DriveApp.getFilesByName(pdfName)
      .next()
      .getDownloadUrl();

    pdfFile.imgUrl = DriveApp.getFilesByName(imgName)
      .next()
      .getDownloadUrl();

    return pdfFile;
  });
};
