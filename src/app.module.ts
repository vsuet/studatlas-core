import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AcademiesModule } from './academies/academies.module';
import { ConfigModule } from 'nestjs-config';
import * as path from 'path';
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
    AuthModule,
    AcademiesModule,
  ],
})
export class AppModule {}
