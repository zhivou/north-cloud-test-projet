import ProductModel from '../../data-models/product.model';
import { expect, test } from '../../fixtures/base-fixtures';
import { parsePrice } from '../../utils/price.utils';
import { TAX_RATE } from '../../utils/tax.utils';

const itemsToAdd = 3;
const expectedCartItems = ProductModel.generateDefaultProducts().slice(0, itemsToAdd);

test.beforeEach(async ({ inventoryPage, cartPage }) => {
    await inventoryPage.goto();
    await inventoryPage.resetAppState();
    await inventoryPage.addToCard(expectedCartItems);
    await expect(inventoryPage.navbar.cartBadge).toHaveText(String(itemsToAdd));
    await cartPage.goto();
    await expect(cartPage.cartItems).toHaveCount(itemsToAdd);
});

test('test user can complete the checkout flow', async ({ cartPage, checkoutPage, standardUser }) => {
    standardUser.generateRandomInformation();

    await test.step('complete checkout flow', async () => {
        await cartPage.checkoutButton.click();
        await checkoutPage.completeCheckout(standardUser);
    });

    await test.step('assert checkout complete page is displayed cart items are removed', async () => {
        await expect(checkoutPage.checkoutComplete.iconImage).toBeVisible();
        await expect(checkoutPage.checkoutComplete.titleText).toHaveText('Thank you for your order!');
        await expect(checkoutPage.checkoutComplete.descriptionText).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
        await expect(checkoutPage.navbar.cartBadge).not.toBeVisible();
        await cartPage.navbar.shoppingButton.click();
        await expect(cartPage.cartItems).toHaveCount(0);
    });
});

// Note: there is a bug in the checkout flow where the total amount is not displayed correctly due to a floating point precision issue
// use first 4 items to test the checkout flow bug. it will show $105.96000000000001 instead of $105.96
test('test checkout flow overview page shows correct information', async ({ cartPage, checkoutPage, standardUser }) => {
    standardUser.generateRandomInformation();
    const taxRate = TAX_RATE;

    await test.step('complete first step of checkout flow', async () => {
        await cartPage.checkoutButton.click();
        await checkoutPage.fillOutUserInformation(standardUser);
        await checkoutPage.checkoutInformation.continueButton.click();
    });

    await test.step('assert checkout overview page is displayed with correct information', async () => {
        const allCheckoutItems = await checkoutPage.checkoutOverview.cartItems.all();
        let subtotal = 0;

        for (const [index, checkoutItem] of allCheckoutItems.entries()) {
            await checkoutPage.assertCheckoutItem(checkoutItem, expectedCartItems[index]);
            subtotal += parsePrice(expectedCartItems[index].price);
        }

        const tax = subtotal * taxRate;
        const total = subtotal + tax;

        await expect(checkoutPage.checkoutOverview.subtotalLabel).toHaveText(`Item total: $${subtotal.toFixed(2)}`);
        await expect(checkoutPage.checkoutOverview.taxLabel).toHaveText(`Tax: $${tax.toFixed(2)}`);
        await expect(checkoutPage.checkoutOverview.totalLabel).toHaveText(`Total: $${total.toFixed(2)}`);
    });
});

test('test checkout flow fails if user information is not complete', async ({ cartPage, checkoutPage, incompleteUserInformation }) => {
    for (const scenario of incompleteUserInformation) {
        await test.step(`validate incomplete user information: ${scenario.id}`, async () => {
            await cartPage.goto();
            await cartPage.checkoutButton.click();
            await checkoutPage.fillOutUserInformationAllowEmpty(scenario.user);
            await checkoutPage.checkoutInformation.continueButton.click();

            await expect.soft(checkoutPage.checkoutInformation.errorMessage).toHaveText(
                scenario.expectedErrorMessage
            );
        });
    }
});

// API Mocking Test Scenario
//
// saucedemo does not have any API to test the checkout flow with an empty card or any other checkout flow errors. All works with states on the client side.
// This is also not a proper test level to test the checkout flow errors like this.
// The proper level would be componet tests like Storybook or Jest unit tests. Playwright is not a good fit for this. And should not be used for this type of tests.
// However here is a hypotheticak test scenario that could work if we were to have anreal API calls in place.
test.skip('test empty card checkout shows correct error message', async ({ cartPage, checkoutPage, page, standardUser }) => {
    standardUser.generateRandomInformation();

    // Mock the api call before navigating per Playwright documentation: https://playwright.dev/docs/api/class-route#route-continue
    await page.route('/checkout-complete', async route => {
        if (route.request().method() === 'POST') {
            await route.fulfill({
                status: 500,
                contentType: 'application/json',
                body: JSON.stringify({ error: 'Internal Server Error' }),
            });
        } else {
            await route.continue();
        }
    });

    await cartPage.checkoutButton.click();
    await checkoutPage.completeCheckout(standardUser);
    await expect(checkoutPage.checkoutInformation.errorMessage).toHaveText('Error: Internal Server Error');
});