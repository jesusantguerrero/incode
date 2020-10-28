/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
// All basic crud methods for
import { BaseAPI } from "./BaseAPI";

export default class RestApi extends BaseAPI{
  constructor(config: { readonly baseURL: string, readonly token: string }) {
    super(config)
  }

  create(resourceName: string, data?: any) {
    return this.$http.post(resourceName, data)
  }

  get(resourceName: string, resourceId: string, params: any) {
    return this.$http.get(`${resourceName}/${resourceId}`, {
      params: params
    })
  }

  list(resourceName: string, params?: any) {
    return this.$http.get(resourceName, {
      params: params
    })
  }

  update(resourceName: string, data?: any) {
    return this.$http.put(resourceName, data)
  }

  delete(resourceName: string, resourceId: string) {
    return this.$http.delete(`${resourceName}/${resourceId}`)
  }
}
