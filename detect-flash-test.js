'use strict';

import test from 'tape';
import detectFlash from './detect-flash';

const TIMEOUT = 1000;
const ID = '__flash_detector';
const CALLBACK = `${ID}_call`;

const dummyFlash = {};

function makeFlashFound() {
  setTimeout(() => {
    window[CALLBACK]();
  }, TIMEOUT / 2);
}

test('detectFlash in case flash is not installed', t => {
  t.plan(1);

  detectFlash('dummy-path')
    .catch(() => t.pass('No flash sould be found when flash is not installed.'));
});

test('detectFlash in case flash is installed but blocked', t => {
  t.plan(1);

  navigator.plugins["Shockwave Flash"] = dummyFlash;
  detectFlash('dummy-path')
    .catch(() => t.pass('No flash sould be found when flash is installed but blocked.'));
});

test('detectFlash in case flash is alive', t => {
  t.plan(1);

  detectFlash('dummy-path')
    .then(() => t.pass('Flash should be found when flash is alive.'));

  makeFlashFound();
});
