/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
import Axios, { AxiosInstance, AxiosPromise } from 'axios';

import { Auth } from '../auth/auth';
import { BaseAPI } from '../shared/BaseAPI';

type User = {
  firstname: string;
  email: string;
};

export class Client extends BaseAPI {
  user: User;
  token: string;
  // APIS
  // 1-users
  // 2-companies
  // 3-apps
  // 4-plans
  // 5-notifications
  // 6-filesystem
  // 7-

  constructor(token: string, auth: Auth) {
    super({
      baseURL: auth.baseURL,
      token: token
    })
    this.token = token;
  }

  static create(token: string, auth: Auth): Client {
    return new Client(token, auth);
  }

  getUser(): Promise<User> {
    return this.$http({
      url: 'users/0',
    }).then(({ data }) => {
      // eslint-disable-next-line functional/immutable-data
      this.user = data;
      return data;
    });
  }
}
