import { API_TOKEN, TARGET_CHANNEL, ENDPOINT } from "../const";

export interface Slide {
  fileId: string;
  pdfUrl: string;
  imgUrl: string;
  uploadUser: string;
  aspectRatio: number;
  timestamp: string;
}

/*
  pdfFileを古いもの順で返す
*/
export const getTmpPdfFromSlack = (): Array<Slide> => {
  const res = UrlFetchApp.fetch(`${ENDPOINT.CHANNELS_HISTORY}?token=${API_TOKEN}&channel=${TARGET_CHANNEL}`);
  const json = JSON.parse(res.getContentText());
  if (!json.ok) {
    throw new Error(`Failed request: ${ENDPOINT.CHANNELS_HISTORY}?token=${API_TOKEN}&channel=${TARGET_CHANNEL}`);
  }

  return json.messages
    .filter(
      message =>
        message.files !== undefined &&
        message.files[0].filetype === "pdf" &&
        message.files[0].thumb_pdf_w >= message.files[0].thumb_pdf_h
    )
    .map(message => {
      const file = message.files[0];
      return {
        fileId: file.id,
        pdfUrl: file.url_private_download,
        imgUrl: file.thumb_pdf,
        uploadUser: message.user,
        aspectRatio: file.thumb_pdf_w / file.thumb_pdf_h,
        timestamp: message.ts,
      };
    })
    .reverse();
};
