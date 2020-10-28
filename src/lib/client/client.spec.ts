/* eslint-disable functional/no-let */
import test from 'ava';

import config from "../../config";
import { Auth } from '../auth/auth';
let auth: Auth;

test.beforeEach(() => {
  auth = new Auth({
    endpoint: config.apps.GEWAER_API,
    appKey: config.apikey
  });
})

test('get user', async (t) => {
  const client = await auth.login(config.user, config.password).catch(err => {
    console.log(err.statusText)
  })

  const user = client && await client.getUser()

  t.is(user && user.email, config.user);
});

