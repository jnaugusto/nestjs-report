import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigService } from './app-config.service';
import * as Joi from 'joi';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      expandVariables: true,
      validationSchema: Joi.object({
        APP_ENV: Joi.string().valid('dev', 'prod', 'test'),
        APP_PORT: Joi.number(),
        APP_BASE_URL: Joi.string(),
        APP_URL: Joi.string(),
        AUTH_SECRET: Joi.string(),
        MONGODBCONSTRING: Joi.string(),
        REDIS_PORT: Joi.number(),
        REDIS_USERNAME: Joi.string().allow(null, ''),
        REDIS_PASSWORD: Joi.string().allow(null, ''),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
