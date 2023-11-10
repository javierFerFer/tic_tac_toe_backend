import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './core/modules/user/user.module';

@Module({
  imports: [ConfigModule.forRoot({ cache: true }), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
