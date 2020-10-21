/* eslint-disable functional/no-let */
import test from 'ava';

import config from "../../config";
import { Auth } from '../auth/auth';
import { Client } from '../client/client';
let auth: Auth;

test.beforeEach(() => {
  auth = new Auth(config.endpoint, config.apikey);
})

test('get user', async (t) => {
  const loginData = await auth.login(config.user, config.password).catch(err => {
    console.log(err.statusText)
  })

  const client = loginData && Client.create(loginData.token, auth);
  const user = await client.getUser()
  console.log(client.user.email);

  t.is(user && user.email, config.user);
});

