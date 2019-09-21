import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AcademiesModule } from './academies/academies.module';
import { GraphQLModule } from '@nestjs/graphql';
import { GroupsModule } from './groups/groups.module';

@Module({
  imports: [
    AcademiesModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      debug: true,
    }),
    // GroupsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
