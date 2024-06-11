import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppConfigService } from './config/app/app-config.service';
import * as cors from '@fastify/cors';
import { join } from 'path';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // Get app config
  const appConfig: AppConfigService = app.get(AppConfigService);

  // Use public assets
  app.useStaticAssets({
    prefix: '/reports/',
    root: join(__dirname, '..', 'reports'),
  });

  // Set global path variables
  const baseDir = __dirname.replace('dist', '');
  global.__reportsDir = `${baseDir}/reports`;

  const reportsFolder = `${global.__reportsDir}`;
  if (!fs.existsSync(reportsFolder)) {
    fs.mkdirSync(reportsFolder);
  }

  // Register CORS
  app.register(cors, (instance) => {
    return (req, callback) => {
      const corsOptions = {
        origin: true,
        credentials: true,
        methods: 'GET, PUT, PATCH, POST, DELETE, OPTIONS',
        allowedHeaders: 'Content-Type, Authorization, x-api-key, Accept',
        exposedHeaders: 'Content-Disposition',
      };

      console.log(req.headers.host);

      // do not include CORS headers for requests from localhost
      if (/localhost/.test(req.headers.host)) {
        corsOptions.origin = false;
      } else {
        return callback(new Error('Not allowed by CORS'));
      }

      // callback expects two parameters: error and options
      callback(null, corsOptions);
    };
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.startAllMicroservices();
  await app.listen(appConfig.port, () => {
    console.log(`Service started at port ${appConfig.port}...`);
  });
}
bootstrap();
