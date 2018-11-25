import { USERS_SHEET } from "../const";
import { User } from "./getUserListFromSlack";

export const getUserLists = () => {
  return USERS_SHEET.getRange(2, 1, USERS_SHEET.getLastRow() - 1, 5)
    .getValues()
    .map(arrayToPdfFile);
};

const arrayToPdfFile = (arr): User => {
  return {
    userId: arr[0],
    name: arr[1],
    imgUrl: arr[2] + `&access_token=${ScriptApp.getOAuthToken()}`,
  };
};
