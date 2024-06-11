import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}
  get env(): string {
    return this.configService.get<string>('app.env');
  }

  get port(): number {
    return this.configService.get<number>('app.port');
  }

  get baseUrl(): string {
    return this.configService.get<string>('app.baseUrl');
  }

  get url(): string {
    return this.configService.get<string>('app.url');
  }

  get mongoDBUrl(): string {
    return this.configService.get<string>('app.mongoDBConString');
  }

  get mongoDBUrlQt(): string {
    return this.configService.get<string>('app.mongoDBConStringQt');
  }

  get mongoDBUrlProd(): string {
    return this.configService.get<string>('app.mongoDBConStringProd');
  }

  get redisHost(): string {
    return this.configService.get<string>('app.redisHost');
  }

  get redisPort(): number {
    return this.configService.get<number>('app.redisPort');
  }

  get redisUsername(): string {
    return this.configService.get<string>('app.redisUsername');
  }

  get redisPassword(): string {
    return this.configService.get<string>('app.redisPassword');
  }
}
