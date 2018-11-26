import { API_TOKEN } from "../const";
import { Slide } from "./getTmpPdfFromSlack";

const DRIVE_FOLDER_ID = PropertiesService.getScriptProperties().getProperty("DRIVE_FOLDER_ID");

export const savePdfFileToDrive = (pdfFiles: Slide[]): Slide[] => {
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

    const pdfId = DriveApp.getFilesByName(pdfName)
      .next()
      .setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.VIEW)
      .getId();
    pdfFile.pdfUrl = `https://drive.google.com/uc?export=download&id=${pdfId}`;

    const imgId = DriveApp.getFilesByName(imgName)
      .next()
      .setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.VIEW)
      .getId();
    pdfFile.imgUrl = `https://drive.google.com/uc?export=download&id=${imgId}`;

    return pdfFile;
  });
};
