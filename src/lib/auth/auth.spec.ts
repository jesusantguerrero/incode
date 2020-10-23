/* eslint-disable functional/no-let */
import test from 'ava';

import config from '../../config';

import { Auth } from './auth';
let auth: Auth;
let token: string;

test.before(async () => {
  auth = new Auth({
    endpoint: config.apps.GEWAER_API,
    appKey: config.apikey,
  });
  const client = await auth.login(config.user, config.password);
  if (client.user) {
    token = client.token
  }
});

test('login user', async (t) => {
  const client = await auth.login(config.user, config.password);
  if (client.user) {
    token = client.token
  }
  t.is(client && client.user.email, config.user);
});


test("login from storage", async (t) => {
  const client = await auth.getClient(token);
  t.is(client.user && client.user.email, config.user);
})

test('register', async (t) => {
  const loginData = await auth.signup({
    firstname: "Jesus",
    lastname: "Guerrero",
    email: "jesusant@mctekk.com",
    password: config.password,
    verify_password: config.password,
    default_company: "incode"
  })

    if (loginData && loginData.error != null) {
      t.is( loginData.error, "Users This email already has an account.")
    } else {
      t.is(typeof loginData.token, 'string');
  }
})
