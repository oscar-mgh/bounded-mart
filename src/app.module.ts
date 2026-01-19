import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CatalogModule } from './modules/catalog/infrastructure/catalog.module';
import { HealthModule } from './modules/health/health.module';
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
    UserModule,
    CatalogModule,
    HealthModule
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule { }
