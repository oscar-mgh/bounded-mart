import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/users/infrastructure/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>(
          'MONGO_URI',
          'mongodb://localhost:27017/bounded-mart',
        ),
      }),
      inject: [ConfigService],
    }),
    UserModule
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule { }
