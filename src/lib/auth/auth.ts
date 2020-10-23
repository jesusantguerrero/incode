/* eslint-disable functional/immutable-data */
/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
import Axios, { AxiosInstance, AxiosPromise } from 'axios';
import qs from 'qs';

import { Client } from '../client/client';
import { BaseAPI } from '../shared/BaseAPI';

type UserForm = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  verify_password: string;
  default_company: string;
};

type LoginData = {
  token: string;
  refresh_token: string;
  time: string;
  expires: string;
  refresh_token_expires: string;
  id: number;
};

type AuthConfig = {
  readonly endpoint: string;
  readonly appKey: string;
};

type AuthOptions = {
  tokenName: string;
};

export type KanvasError = {
  error: string;
};

export class Auth extends BaseAPI {
  appKey: string;
  token: string;
  $http: AxiosInstance;
  options: AuthOptions = {
    tokenName: 'incode::token',
  };

  constructor(authConfig: AuthConfig) {
    super({
      baseURL: authConfig.endpoint
    })
    this.appKey = authConfig.appKey;
  }

  login(email: string, password: string): Promise<Client> {
    return this.$http({
      url: `/auth`,
      method: 'POST',
      data: {
        email,
        password,
      },
    }).then(async ({ data }) => {
      this.setToken(data.token);
      const client = Client.create(data.token, this);
      await client.getUser()
      return client;
    });
  }

  signup(formData: UserForm): Promise<LoginData | KanvasError> {
    const form = qs.stringify(formData);

    return this.$http({
      url: `/users`,
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: form,
    })
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        const error: KanvasError = { error: err.response.data.errors.message };
        return error;
      });
  }

  resetPassword(email: string): AxiosPromise {
    return this.$http({
      url: `/auth/reset`,
      method: 'POST',
      data: {
        email,
      },
    });
  }

  logout(): AxiosPromise {
    return this.$http({
      url: '/auth/logout',
      method: 'POST',
    }).then((res) => {
      this.setToken(null);
      return res;
    });
  }

  setToken(token: string) {
    this.token = token;
  }

  async getClient(token?: string): Promise<Client> {
    if (token) {
      this.setToken(token)
    }
    const client = Client.create(this.token, this);
    await client.getUser()
    return client;
  }
}
