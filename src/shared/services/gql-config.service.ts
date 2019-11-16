import { Injectable } from '@nestjs/common';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { InjectConfig } from 'nestjs-config';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  constructor(@InjectConfig() private readonly config) {
    this.config = config;
  }

  createGqlOptions(): GqlModuleOptions {
    const { autoSchemaFile, debug, tracing } = this.config.get('graphql');
    return {
      autoSchemaFile,
      context: ({ req }) => ({ req }),
      debug,
      tracing,
    };
  }
}
