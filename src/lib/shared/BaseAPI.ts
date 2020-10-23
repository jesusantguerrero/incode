/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
import axios, { AxiosInstance } from "axios"

/**
 *
 * @export
 * @class BaseAPI
 */
export class BaseAPI {
    protected readonly $http: AxiosInstance;
    public readonly baseURL: string;

    constructor(config: { readonly baseURL: string,readonly token?: string }) {
      this.$http = axios.create({
        baseURL: config.baseURL,
        headers: config.token ? {
          Authorization: config.token,
        } : {},
      });
      this.baseURL = config.baseURL;
    }
}

