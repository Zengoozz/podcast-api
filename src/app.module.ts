import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EposidesModule } from './eposides/eposides.module';
import { TopicsModule } from './topics/topics.module';

@Module({
  imports: [EposidesModule, TopicsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
