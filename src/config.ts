/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config();

export default {
  endpoint: process.env.ENDPOINT || "",
  apikey: process.env.APIKEY || "",
  user: process.env.APP_USER || "",
  password: process.env.APP_PASS || ""
};
