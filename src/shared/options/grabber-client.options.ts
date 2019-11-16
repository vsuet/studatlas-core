import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grabberClientOptions: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:50052',
    package: 'grabber',
    protoPath: join(__dirname, '../../shared/protobuf/grabber.proto'),
  },
};
