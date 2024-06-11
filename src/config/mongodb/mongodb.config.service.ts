import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { AppConfigService } from '../app/app-config.service';

@Injectable()
export class MongodbConfigService implements MongooseOptionsFactory {
  constructor(private readonly configService: AppConfigService) {}

  //You can retrun promise as well
  public createMongooseOptions(): MongooseModuleOptions {
    let targetUri;
    switch (this.configService.env) {
      case 'dev':
        targetUri = this.configService.mongoDBUrl;
        break;
      case 'test':
        targetUri = this.configService.mongoDBUrlQt;
        break;
      case 'prod':
        targetUri = this.configService.mongoDBUrlProd;
        break;
      default:
        targetUri = this.configService.mongoDBUrl;
    }
    return {
      uri: targetUri,
    };
  }
}