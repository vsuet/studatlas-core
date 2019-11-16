import { Client, ClientGrpc } from '@nestjs/microservices';
import { grabberClientOptions } from '../options/grabber-client.options';
import { OnModuleInit } from '@nestjs/common';

export abstract class EntityResolver implements OnModuleInit {
  @Client(grabberClientOptions)
  protected readonly client: ClientGrpc;

  abstract onModuleInit();
}
