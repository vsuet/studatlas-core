import { ConflictException, Injectable } from '@nestjs/common';
import { InjectConfig } from 'nestjs-config';
import { ManagementClient, ManagementClientOptions } from 'auth0';

@Injectable()
export class AuthService {
  constructor(@InjectConfig() private readonly config) {
    this.config = config;
  }

  getUserInfo(id: string) {
    return this.createManagementClient({
      scope: 'read:users update:users',
    }).getUser({ id });
  }

  createManagementClient(
    options?: Omit<
      ManagementClientOptions,
      'domain' | 'clientId' | 'clientSecret'
    >,
  ): ManagementClient {
    const { domain, clientId, clientSecret } = this.config.get('auth0');
    return new ManagementClient({
      domain,
      clientId,
      clientSecret,
      ...options,
    });
  }
}
