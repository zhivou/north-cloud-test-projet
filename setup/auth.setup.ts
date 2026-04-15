import { existsSync } from 'node:fs';
import { expect, test as setup } from '../fixtures/base-fixtures';
import { createStorageStateUI } from '../utils/auth.utils';

setup('create session for standard user', async ({ loginPage, standardUser }) => {
  const userSessionFilePath = await createStorageStateUI(loginPage, standardUser);
  expect(existsSync(userSessionFilePath)).toBe(true);
});

// I just added this as example that more users can be added here if needed. We only user
// standard user in the tests so I skipped the other users.
setup.skip('create session for problem user', async ({ loginPage, problemUser }) => {
  const userSessionFilePath = await createStorageStateUI(loginPage, problemUser);
  expect(existsSync(userSessionFilePath)).toBe(true);
});

setup.skip('create session for performance glitch user', async ({ loginPage, performanceGlitchUser }) => {
  const userSessionFilePath = await createStorageStateUI(loginPage, performanceGlitchUser);
  expect(existsSync(userSessionFilePath)).toBe(true);
});

setup.skip('create session for error user', async ({ loginPage, errorUser }) => {
  const userSessionFilePath = await createStorageStateUI(loginPage, errorUser);
  expect(existsSync(userSessionFilePath)).toBe(true);
});

setup.skip('create session for visual user', async ({ loginPage, visualUser }) => {
  const userSessionFilePath = await createStorageStateUI(loginPage, visualUser);
  expect(existsSync(userSessionFilePath)).toBe(true);
});
