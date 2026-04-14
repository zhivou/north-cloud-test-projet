import ProductModel from '../../data-models/product.model';
import UserModel from '../../data-models/user.model';
import { expect, test } from '../../fixtures/base-fixtures';

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

test('test user can complete the checkout flow', async ({ inventoryPage, cartPage, checkoutPage }) => {
    const user = new UserModel('standard_user');
    user.generateRandomInformation();

    await test.step('complete checkout flow', async () => {
        await cartPage.checkoutButton.click();
        await checkoutPage.completeCheckout(user);
    });

    await test.step('assert checkout complete page is displayed cart items are removed', async () => {
        await expect(checkoutPage.checkoutComplete.iconImage).toBeVisible();
        await expect(checkoutPage.checkoutComplete.titleText).toHaveText('Thank you for your order!');
        await expect(checkoutPage.checkoutComplete.descriptionText).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
        await expect(inventoryPage.navbar.cartBadge).not.toBeVisible();
        await checkoutPage.navbar.shoppingButton.click();
        await expect(inventoryPage.productItems).toHaveCount(0);
    });
});

// Note: there is a bug in the checkout flow where the total amount is not displayed correctly due to a floating point precision issue
// use first 4 items to test the checkout flow bug. it will show $105.96000000000001 instead of $105.96
test('test checkout flow overview page shows correct information', async ({ cartPage, checkoutPage, standardUser }) => {
    standardUser.generateRandomInformation();
    const taxRate = 0.08;

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
            subtotal += Number.parseFloat(expectedCartItems[index].price.slice(1)); // TODO Move to unitls
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