import { Injectable } from '@nestjs/common';
import { RedisModuleOptions } from '@nestjs-modules/ioredis';
import { AppConfigService } from '../app/app-config.service';
import { RedisOptions } from 'ioredis';

@Injectable()
export class RedisOptionsProvider {
  constructor(private readonly appConfigService: AppConfigService) {}

  createRedisModuleOptions(): RedisModuleOptions {
    return {
      type: 'single',
      options: this.getRedisOptions(),
    };
  }

  getRedisOptions(): RedisOptions {
    return {
      host: this.appConfigService.redisHost,
      port: this.appConfigService.redisPort,
      username: this.appConfigService.redisUsername,
      password: this.appConfigService.redisPassword,
    };
  }
}
