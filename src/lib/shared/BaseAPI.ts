/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
import axios, { AxiosInstance } from "axios"
import emitter, { Emitter } from "mitt";

/**
 *
 * @export
 * @class BaseAPI
 */
export class BaseAPI {
    protected readonly $http: AxiosInstance;
    public readonly baseURL: string;
    public emitter: Emitter;

    constructor(config: { readonly baseURL: string,readonly token?: string }) {
      this.$http = axios.create({
        baseURL: config.baseURL,
        headers: config.token ? {
          Authorization: config.token,
        } : {},
      });
      this.emitter = emitter();
      this.baseURL = config.baseURL;
    }

    emit(eventName: string, event?: any) {
      this.emitter && this.emitter.emit(eventName, event)
    }
}

