import { expect, test } from '../../fixtures/base-fixtures';
import { wrongLoginUserScenarios } from '../../fixtures/users-fixture';

test.beforeEach(async ({ loginPage }) => {
    await loginPage.page.goto('/');
});

test('test user can login', async ({ loginPage, standardUser }) => {
    await loginPage.login(standardUser);
    await loginPage.assertLoginSuccess();
});

test('test locked user cannot login', async ({ loginPage, lockedOutUser }) => {
    await loginPage.login(lockedOutUser);
    await expect(loginPage.errorMessage).toContainText("Epic sadface: Sorry, this user has been locked out.");
});

test('test logout clears the session', async ({ loginPage, standardUser, inventoryPage }) => {
    await loginPage.login(standardUser);
    await loginPage.assertLoginSuccess();   
    await loginPage.logout();

    await inventoryPage.goto();

    await expect(inventoryPage.page).toHaveURL('/');
    await expect(loginPage.errorMessage).toContainText(
        "Epic sadface: You can only access '/inventory.html' when you are logged in."
    );
});

// Example of data driven test I use combination of fixtures and data driven test to test multiple scenarios.
// Locked out user could have been also added here but I kept it separate to just show a use case.
for (const { id, user, expectedErrorMessage } of wrongLoginUserScenarios) {
    test(`login is rejected: ${id}`, async ({ loginPage }) => {
        await loginPage.login(user);
        await expect(loginPage.errorMessage).toContainText(expectedErrorMessage);
    });
}

test('unauthorized user cannot access protected pages', async ({
    inventoryPage,
    cartPage,
    loginPage,
}) => {
    const protectedPages = [inventoryPage, cartPage];

    // Another example of data driven test this time I am using page objects to test multiple pages with soft assertions 
    for (const protectedPage of protectedPages) {
        await test.step(`visit ${protectedPage.pagePath}`, async () => {
            await protectedPage.goto();
            await expect.soft(protectedPage.page).toHaveURL('/');
            await expect.soft(loginPage.errorMessage).toContainText(
                `Epic sadface: You can only access '${protectedPage.pagePath}' when you are logged in.`
            );
        });
    }
});
