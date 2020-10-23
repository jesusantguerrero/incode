/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
import { Auth } from './lib/auth/auth';
import { Client } from './lib/client/client';
import { BaseAPI } from './lib/shared/BaseAPI';

type AuthConfig = {
  readonly endpoint: string;
  readonly appKey: string;
};

export default class ClientSDK extends BaseAPI {
  public readonly auth: Auth;
  public readonly settings: any;
  public readonly client: Client;

  constructor(config: AuthConfig) {
    super({
      baseURL: config.endpoint
    })
    this.auth = new Auth(config);
  }
}
