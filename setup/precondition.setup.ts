import { expect, test as setup } from '@playwright/test';

setup('validatebase URL is reachable', async ({ request }) => {
  const response = await request.get('/');
  expect(
    response.ok(),
    `expected base URL to return a successful status, got ${response.status()}`
  ).toBeTruthy();
});
