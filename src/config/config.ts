export const config = {
  PORT: process.env.APP_PORT || 8050,

  ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:8500',

  JWT_SECRET: process.env.JWT_SECRET || 'uf7e^WaiUGFSA7fd8&^dadh',
  JWT_EXPIRES: process.env.JWT_EXPIRES || '20m'};
