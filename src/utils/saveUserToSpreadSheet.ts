import { USERS_SHEET } from "../const";
import { User } from "./getUserListFromSlack";

export const saveUserToSpreadSheet = (userList: User[]) => {
  userList.forEach(user => {
    USERS_SHEET.appendRow([user.userId, user.name, user.imgUrl]);
  });
};
