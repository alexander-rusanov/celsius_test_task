import { CacheModule, HttpModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [HttpModule, ConfigModule.forRoot(), CacheModule.register()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
