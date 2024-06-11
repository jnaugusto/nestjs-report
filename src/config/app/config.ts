import { registerAs } from '@nestjs/config';
export default registerAs('app', () => ({
  env: process.env.APP_ENV,
  port: process.env.PORT || process.env.APP_PORT,
  baseUrl: process.env.APP_BASE_URL,
  url: process.env.APP_URL,
  mongoDBConString: process.env.MONGODBCONSTRING,
  mongoDBConStringQt: process.env.MONGODBCONSTRINGQT,
  mongoDBConStringProd: process.env.MONGODBCONSTRINGPROD,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  redisUsername: process.env.REDIS_USERNAME,
  redisPassword: process.env.REDIS_PASSWORD,
}));
