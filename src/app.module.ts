import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from 'nestjs-config';

@Module({
  imports: [
    SharedModule,
    UserModule,
    ConfigModule.load(),
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('mongoose.uri'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {}
}
