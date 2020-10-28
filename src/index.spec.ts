import test from 'ava';

import config from './config';

import ClientSDK from './index';
// eslint-disable-next-line functional/no-let
let incodeSDK: ClientSDK;

test.before(async () => {
  incodeSDK = new ClientSDK({
    endpoint: config.apps.GEWAER_API,
    appKey: config.apikey,
  });
});

test('get logged in client', async (t) => {
  await incodeSDK.auth.login(config.user, config.password);
  t.is(incodeSDK.client && incodeSDK.client.user.email, config.user);
});


test('listen logout', async (t) => {
  await incodeSDK.auth.login(config.user, config.password);
  t.is(incodeSDK.client && incodeSDK.client.user.email, config.user );
  await incodeSDK.auth.logout()
  t.is(incodeSDK.client, null);
});
