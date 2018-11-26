import { API_TOKEN } from "../const";
import { User } from "./getUserListFromSlack";

const DRIVE_FOLDER_ID = PropertiesService.getScriptProperties().getProperty("DRIVE_FOLDER_ID");

export const saveUserToDrive = (userList: User[]): User[] => {
  const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);

  return userList.map(user => {
    const imgName = `${user.userId}.png`;
    const imgBlob = UrlFetchApp.fetch(user.imgUrl);
    const img = DriveApp.createFile(imgBlob);
    img.makeCopy(imgName, folder);
    img.setTrashed(true);

    const imgId = DriveApp.getFilesByName(imgName)
      .next()
      .setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.VIEW)
      .getId();

    user.imgUrl = `https://drive.google.com/uc?export=download&id=${imgId}`;

    return user;
  });
};
