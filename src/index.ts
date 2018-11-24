import { getTmpPdfFromSlack } from "./utils/getTmpPdfFromSlack";

global.main = () => {
  Logger.log(getTmpPdfFromSlack());
};
