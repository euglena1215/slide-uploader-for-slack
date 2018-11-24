const ENDPOINT = {
  CHANNELS_HISTORY: "https://slack.com/api/channels.history",
  FILES_SHARED_PUBLIC_URL: "https://slack.com/api/files.sharedPublicURL",
};

const API_TOKEN = PropertiesService.getScriptProperties().getProperty("SLACK_API_TOKEN");
const TARGET_CHANNEL = PropertiesService.getScriptProperties().getProperty("SLACK_TARGET_CHANNEL");

export interface PdfFile {
  fileId: string;
  pdfUrl: string;
  imgUrl: string;
  uploadUser: string;
  timestamp: string;
}

/*
  pdfFileを古いもの順で返す
*/
export const getTmpPdfFromSlack = (): Array<PdfFile> => {
  const res = UrlFetchApp.fetch(`${ENDPOINT.CHANNELS_HISTORY}?token=${API_TOKEN}&channel=${TARGET_CHANNEL}`);
  const json = JSON.parse(res.getContentText());
  if (!json.ok) {
    throw new Error(`Failed request: ${ENDPOINT.CHANNELS_HISTORY}?token=${API_TOKEN}&channel=${TARGET_CHANNEL}`);
  }

  return json.messages
    .filter(message => message.files !== undefined && message.files[0].filetype === "pdf")
    .map(message => {
      const file = message.files[0];
      return {
        fileId: file.id,
        pdfUrl: file.url_private_download,
        imgUrl: file.thumb_pdf,
        uploadUser: message.user,
        timestamp: message.ts,
      };
    })
    .reverse();
};
