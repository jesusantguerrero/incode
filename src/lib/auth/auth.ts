/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
import Axios, { AxiosInstance, AxiosPromise } from "axios";
import qs from "qs";

type UserForm = {
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  verify_password: string,
  default_company: string
};

type LoginData = {
  token: string,
  refresh_token: string,
  time: string,
  expires: string,
  refresh_token_expires: string,
  id: number
}

export type KanvasError = {
  error: string
}

export class Auth {
  endpoint: string;
  appKey: string;
  $http: AxiosInstance

  constructor(endpoint: string, appKey: string) {
    this.endpoint = endpoint;
    this.appKey = appKey;
    this.$http = Axios.create({
      baseURL: this.endpoint
    })
  };

  login(email: string, password: string): Promise<LoginData> {
    return this.$http({
        url: `/auth`,
        method: "POST",
        data: {
          email,
          password
        }
    }).then(({data}) => {
      return data
    })
  }

  signup(formData: UserForm): Promise<LoginData | KanvasError> {
    const form = qs.stringify(formData);

    return this.$http({
      url: `/users`,
      method: "POST",
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: form
    }).then(({data}) => {
      return data
    }).catch(err => {
      const error: KanvasError = { error: err.response.data.errors.message}
      return error
    })
  }

  resetPassword(email: string): AxiosPromise {
    return this.$http({
      url: `/auth/reset`,
      method: "POST",
      data: {
        email
      }
    })
  }

  logout(): AxiosPromise {
    return this.$http({
      url: '/auth/logout',
      method: "POST"
    })
  }
}
