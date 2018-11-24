import { getTmpPdfFromSlack } from "./utils/getTmpPdfFromSlack";
import { savePdfFileToSpreadSheet, getLastSaveFileId } from "./utils/savePdfFileToSpreadSheet";

global.main = () => {
  // 保存されてないpdfを取得
  const lastFileId = getLastSaveFileId().toString();
  const pdfFiles = getTmpPdfFromSlack();
  const index = pdfFiles.map(file => file.fileId.toString()).indexOf(lastFileId);
  const unSavedPdfFiles = index === -1 ? pdfFiles : pdfFiles.slice(index + 1);

  // driveへ保存

  // スプレッドシートに保存
  savePdfFileToSpreadSheet(unSavedPdfFiles);
};
