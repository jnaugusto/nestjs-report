import { Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app/app-config.module';
import { MongodbConfigService } from './config/mongodb/mongodb.config.service';
import { RedisOptionsProvider } from './config/redis/redis-options.provider';

@Module({
  imports: [
    AppConfigModule,
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      useClass: MongodbConfigService,
    }),
    RedisModule.forRootAsync({
      imports: [AppConfigModule],
      useClass: RedisOptionsProvider,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, RedisOptionsProvider],
})
export class AppModule {}
