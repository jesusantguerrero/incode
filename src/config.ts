/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

export default {
  endpoint: process.env.ENDPOINT || '',
  apikey: process.env.APIKEY || '',
  user: process.env.APP_USER || '',
  password: process.env.APP_PASS || '',
  apps: {
    KANVAS_API: "https://apidev.kanvas.dev/v1",
    GEWAER_API: "https://apikdev.gewaer.io/v1"
  }
};
