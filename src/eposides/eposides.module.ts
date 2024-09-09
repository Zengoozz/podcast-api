import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { EposidesController } from './eposides.controller';
import { EposidesService } from './eposides.service';

@Module({
    imports: [ConfigModule],
    controllers: [EposidesController],
    providers: [EposidesService]
})
export class EposidesModule { }
