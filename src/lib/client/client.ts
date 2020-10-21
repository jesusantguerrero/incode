/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
import Axios, { AxiosInstance, AxiosPromise } from "axios";

import { Auth } from "../auth/auth";

type User = {
    firstname: string;
    email: string
}

export class Client {
  $http: AxiosInstance;
  user: User


  constructor(token: string, endpoint: string) {
    this.$http = Axios.create({
      baseURL: endpoint,
      headers: {
        Authorization: token
      }
    })
  };

  static create(token: string, auth: Auth): Client {
    return new Client(token, auth.endpoint)
  }

  static getSettings(auth: Auth): AxiosPromise {
    return auth.$http({
      url: `/app/${auth.appKey}/settings`
    })
  }


  getCompanies() {
    return this.$http({
      url: 'companies'
    })
  }

  getUser(): Promise<User> {
    return this.$http({
      url: 'users/0'
    }).then(({ data }) => {
      // eslint-disable-next-line functional/immutable-data
      this.user = data
      return data
    })

  }

  getMenu(menuName = 'main'): AxiosPromise {
    return this.$http({
      url: `/menus/${menuName}`
    })
  }

  getApps(): AxiosPromise {
    return this.$http({
      url: `/apps`
    })
  }

  getPlans(): AxiosPromise {
    return this.$http({
      url: `/app-plans`
    })
  }

  getNotifications(): AxiosPromise {
    return this.$http({
      url: `/notifications`
    })
  }

}
