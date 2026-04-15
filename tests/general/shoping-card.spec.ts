import ProductModel from '../../data-models/product.model';
import { expect, test } from '../../fixtures/base-fixtures';

test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
    await inventoryPage.resetAppState();
});

test('test user can add and remove products from cart', async ({ inventoryPage }) => {
    const productItems = inventoryPage.productItems;
    expect(await productItems.all()).toHaveLength(6);
    let cartBadgeCount = 0;

    await test.step('add products to cart', async () => {
        for (const productItem of await productItems.all()) {
            cartBadgeCount++;
            await inventoryPage.productAddToCartButton(productItem).click();
            await expect(inventoryPage.navbar.cartBadge).toHaveText(String(cartBadgeCount));
        }
        await expect(inventoryPage.navbar.cartBadge).toHaveText('6');
    });

    await test.step('remove products from cart', async () => {
        for (const productItem of await productItems.all()) {
          cartBadgeCount--;
          await inventoryPage.productRemoveFromCartButton(productItem).click();
      
          if (cartBadgeCount > 0) {
            await expect(inventoryPage.navbar.cartBadge).toHaveText(String(cartBadgeCount));
          }
        }
        await expect(inventoryPage.navbar.cartBadge).not.toBeVisible();
      });
  });

test('test cart page displays correct items and prices', async ({ inventoryPage, cartPage }) => {
    const itemsToAdd = 3;
    const expectedCartItems = ProductModel.generateDefaultProducts().slice(0, itemsToAdd);
    const productItems = inventoryPage.productItems;
    expect(await productItems.all()).toHaveLength(6);

    await test.step('add first three products to cart', async () => {
        for (const productItem of (await productItems.all()).slice(0, itemsToAdd)) {
            await inventoryPage.productAddToCartButton(productItem).click();
        }
        await expect(inventoryPage.navbar.cartBadge).toHaveText(String(itemsToAdd));
    });

    await test.step('assert cart page displays correct items and details', async () => {
        await cartPage.navbar.shoppingButton.click();
        const cartItemLocators = await cartPage.cartItems.all();
        expect(cartItemLocators).toHaveLength(itemsToAdd);
        for (const [index, cartItemLocator] of cartItemLocators.entries()) {
            const item = cartPage.cartItem(cartItemLocator);
            await expect(item.name).toHaveText(expectedCartItems[index].name);
            await expect(item.price).toHaveText(expectedCartItems[index].price);
            await expect(item.description).toHaveText(expectedCartItems[index].description);
            await expect(item.quantity).toHaveText('1');
        }
    });

    await test.step('assert user can remove products from cart', async () => {
        expect(await cartPage.cartItems.all()).toHaveLength(itemsToAdd);
        for (let i = 0; i < itemsToAdd; i++) {
          await cartPage.cartItemRemoveButton(cartPage.cartItems.first()).click();
        }
        await expect(inventoryPage.navbar.cartBadge).not.toBeVisible();
        expect(await cartPage.cartItems.all()).toHaveLength(0);
      });
});