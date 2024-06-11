import { Controller, Get, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';
import { AppService } from './app.service';
import { RedisOptionsProvider } from './config/redis/redis-options.provider';

@Controller()
export class AppController implements OnModuleInit, OnModuleDestroy {
  private publisherRedis: Redis = null;

  constructor(
    @InjectRedis() private readonly subscriberRedis: Redis,
    private readonly redisOptionsProvider: RedisOptionsProvider,
    private readonly appService: AppService,
  ) {
    this.publisherRedis = new Redis(
      this.redisOptionsProvider.getRedisOptions(),
    );
  }

  async onModuleInit() {
    this.subscriberRedis.subscribe(
      'report:convert_html_to_pdf',
      (err, count) => {
        if (err) {
          // Handle subscription error
          console.error('Subscription failed:', err);
          return 'Subscription failed';
        }
        // Subscription success
        console.log('Subscribed to channel', count);
      },
    );

    this.subscriberRedis.on('message', (channel, message) => {
      const html = JSON.parse(message);
      // Handle incoming messages
      console.log(
        `Received message from channel ${channel}: ${html.htmlString}`,
      );
    });
  }

  async onModuleDestroy() {
    this.subscriberRedis.disconnect();
    this.publisherRedis.disconnect();
  }

  @Get()
  async getIndex(): Promise<string> {
    const reportHtmlData = {
      chunkPath: '',
      filePath: '',
      htmlString: '<div>data111</div>',
      logMessage: 'Report saved',
      reportType: 'TeSt',
    };
    this.publisherRedis.publish(
      'report:convert_html_to_pdf',
      JSON.stringify(reportHtmlData),
    );
    return this.appService.getHello();
  }

  @Get('subscribe')
  async subscribeToChannel(): Promise<string> {
    return 'Subscribing to channel';
  }
}
