/* eslint-disable functional/no-let */
import test from 'ava';

import config from "../../config";

import { Auth, KanvasError } from './auth';
let auth: Auth;

test.beforeEach(() => {
  auth = new Auth(config.endpoint, config.apikey);
})

test('login', async (t) => {
  const loginData = await auth.login(config.user, config.password).catch(err => {
    console.log(err.statusText)
  })

  t.is(loginData && typeof loginData.token, 'string');
});

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

