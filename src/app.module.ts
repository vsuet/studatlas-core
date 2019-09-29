import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { AcademiesModule } from './academies/academies.module';
import { ConfigModule } from 'nestjs-config';
import * as path from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './shared/services/mongoose-config.service';
import { AuthModule } from './auth/auth.module';
import { GqlConfigService } from './shared/services/gql-config.service';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, '**/!(*.d).config.{ts,js}'), {
      modifyConfigName: name => name.replace('.config', ''),
    }),
    GraphQLModule.forRootAsync({
      useClass: GqlConfigService,
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    AuthModule,
    AcademiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
