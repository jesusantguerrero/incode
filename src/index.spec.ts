import test from 'ava';

import config from "./config";

import * as IncodeSDK from "./index";
// eslint-disable-next-line functional/no-let
let auth: IncodeSDK.Auth;

test.beforeEach(() => {
  auth = new IncodeSDK.Auth(config.endpoint, config.apikey);
})

test('get user', async (t) => {
  const loginData = await auth.login(config.user, config.password).catch(err => {
    console.log(err.statusText)
  })

  const client = loginData && IncodeSDK.Client.create(loginData.token, auth);
  const user = await client.getUser()
  console.log(client.user.email);

  t.is(user && user.email, config.user);
});

