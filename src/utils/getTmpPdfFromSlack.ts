const ENDPOINT = {
  CHANNELS_HISTORY: "https://slack.com/api/channels.history",
  FILES_SHARED_PUBLIC_URL: "https://slack.com/api/files.sharedPublicURL",
};

const API_TOKEN = PropertiesService.getScriptProperties().getProperty("SLACK_API_TOKEN");
const TARGET_CHANNEL = PropertiesService.getScriptProperties().getProperty("SLACK_TARGET_CHANNEL");

export const getTmpPdfFromSlack = () => {
  const res = UrlFetchApp.fetch(`${ENDPOINT.CHANNELS_HISTORY}?token=${API_TOKEN}&channel=${TARGET_CHANNEL}`);
  const json = JSON.parse(res.getContentText());
  if (!json.ok) {
    throw new Error(`Failed request: ${ENDPOINT.CHANNELS_HISTORY}?token=${API_TOKEN}&channel=${TARGET_CHANNEL}`);
  }

  return [].concat(
    ...json.messages.map(message => {
      if (message.files === undefined) {
        return [];
      }
      return message.files.map(file => (file.filetype === "pdf" ? file.url_private_download : ""));
    })
  );
};
