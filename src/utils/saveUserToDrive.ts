import { API_TOKEN } from "../const";
import { User } from "./getUserListFromSlack";

const DRIVE_FOLDER_ID = PropertiesService.getScriptProperties().getProperty("DRIVE_FOLDER_ID");

export const saveUserToDrive = (userList: User[]): User[] => {
  const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);

  return userList.map(user => {
    const imgName = `${user.userId}.png`;
    // const imgBlob = UrlFetchApp.fetch(user.imgUrl, {
    //   headers: { Authorization: `Bearer ${API_TOKEN}` },
    // });
    const imgBlob = UrlFetchApp.fetch(user.imgUrl);
    const img = DriveApp.createFile(imgBlob);
    img.makeCopy(imgName, folder);
    img.setTrashed(true);

    user.imgUrl = DriveApp.getFilesByName(imgName)
      .next()
      .getDownloadUrl();

    return user;
  });
};
