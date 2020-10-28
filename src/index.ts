/* eslint-disable functional/prefer-readonly-type */
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
  // Unauthenticated API
  public readonly auth: Auth;
  public readonly settings: any;
  // Authenticated APIS
  public client: Client;

  constructor(config: AuthConfig) {
    super({
      baseURL: config.endpoint
    })
    // props
    this.auth = new Auth(config, this.emitter);

    // Events
    this.emitter.on('logged', (client) => {
      this.client = client;
    })
    this.emitter.on('logout', () => {
      this.client = null;
    })
  }
}
