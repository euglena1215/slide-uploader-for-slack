import { getTmpPdfFromSlack, Slide } from "./utils/getTmpPdfFromSlack";
import { savePdfFileToSpreadSheet, getLastSaveFileId } from "./utils/savePdfFileToSpreadSheet";
import { savePdfFileToDrive } from "./utils/savePdfFileToDrive";
import { getAllPdfFiles } from "./utils/getAllPdfFiles";
import { getUserListFromSlack, User } from "./utils/getUserListFromSlack";
import { saveUserToDrive } from "./utils/saveUserToDrive";
import { saveUserToSpreadSheet } from "./utils/saveUserToSpreadSheet";
import { getUserLists } from "./utils/getUserLists";
import { BUILD_WEBHOOK } from "./const";

global.main = () => {
  const unSavedPdfFiles = getUnsavedPdffiles();
  const savedPdfFiles = savePdfFileToDrive(unSavedPdfFiles);
  savePdfFileToSpreadSheet(savedPdfFiles);

  if (savedPdfFiles.length > 0) {
    rebuildWebpage();
  }
};

global.doGet = e => {
  const res = ContentService.createTextOutput();
  res.setMimeType(ContentService.MimeType.JSON);
  res.setContent(JSON.stringify(mixSlideAndUser(getAllPdfFiles(), getUserLists())));

  return res;
};

global.saveUserList = () => {
  const userList = getUserListFromSlack();
  const savedUserList = saveUserToDrive(userList);

  saveUserToSpreadSheet(savedUserList);
};

const mixSlideAndUser = (slides: Slide[], users: User[]) => {
  return slides.map(slide => {
    const uploadUser = users.filter(user => user.userId === slide.uploadUser)[0];

    return {
      ...slide,
      uploadUser,
    };
  });
};

const rebuildWebpage = () => {
  UrlFetchApp.fetch(BUILD_WEBHOOK, {
    method: "post",
    payload: {},
  });
};

const getUnsavedPdffiles = () => {
  const lastFileId = getLastSaveFileId().toString();
  const pdfFiles = getTmpPdfFromSlack();
  const index = pdfFiles.map(file => file.fileId.toString()).indexOf(lastFileId);
  return index === -1 ? pdfFiles : pdfFiles.slice(index + 1);
};
