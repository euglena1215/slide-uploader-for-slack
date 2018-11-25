import { API_TOKEN, ENDPOINT } from "../const";

export interface User {
  userId: string;
  name: string;
  imgUrl: string;
}

export const getUserListFromSlack = (): User[] => {
  const res = UrlFetchApp.fetch(`${ENDPOINT.USERS_LIST}?token=${API_TOKEN}`);
  const json = JSON.parse(res.getContentText());
  if (!json.ok) {
    throw new Error(`Failed request: ${ENDPOINT.USERS_LIST}?token=${API_TOKEN}`);
  }

  return json.members.map(member => {
    return {
      userId: member.id,
      name: member.profile.real_name,
      imgUrl: member.profile.image_192,
    };
  });
};
