import ProductModel from '../../data-models/product.model';
import { expect, test } from '../../fixtures/base-fixtures';
import { sortingTestData } from '../../fixtures/sort-fixtures';

test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
});

test('test all products are displayed with correct info', async ({ inventoryPage }) => {
    const allProductItems = inventoryPage.productItems;

    // I am assuming that there are 6 products in the inventory page, and there is no pagination.
    await expect(allProductItems).toHaveCount(6);

    // For big number of products Promises.all is a good way ro run all assertions in parallel.
    // I left it as a loop as we only have 6 products.
    for (const productItem of await allProductItems.all()) {
        const productName = await inventoryPage.productName(productItem).textContent();

        await test.step(`assert product item ${productName} details are visible`, async () => {
            await expect(inventoryPage.productName(productItem)).toBeVisible();
            await expect(inventoryPage.productPrice(productItem)).toBeVisible();
            await expect(inventoryPage.productDescription(productItem)).toBeVisible();
            await expect(inventoryPage.productImage(productItem)).toBeVisible();
            await expect(inventoryPage.productImageLink(productItem)).toBeVisible();
        });
    }
});

for (const { sortOption, description, collectValues, assertOrder } of sortingTestData) {
    test(`test products can be sorted by ${description}`, async ({ inventoryPage }) => {
        await inventoryPage.navbar.selectProductSort(sortOption);

        const allItems = await inventoryPage.productItems.all();
        expect(allItems).toHaveLength(6);

        const values = await collectValues(inventoryPage);

        await test.step(`assert items are sorted by ${description}`, async () => {
            for (let i = 0; i < values.length - 1; i++) {
                assertOrder(values[i], values[i + 1]);
            }
        });
    });
}

test('test user can see details of a product', async ({ inventoryPage, productDetailPage }) => {
    expect(await inventoryPage.productItems.all()).toHaveLength(6);
    
    const firstProductItem = inventoryPage.productItems.first();
    const productModel = ProductModel.generateDefaultProducts()[0];

    await test.step('assert card details are correct', async () => {
        await expect(inventoryPage.productName(firstProductItem)).toHaveText(productModel.name);
        await expect(inventoryPage.productPrice(firstProductItem)).toHaveText(productModel.price);
        await expect(inventoryPage.productDescription(firstProductItem)).toHaveText(productModel.description);
        await expect(inventoryPage.productImage(firstProductItem)).toHaveAttribute('src', productModel.image);
    });

    await inventoryPage.productLink(firstProductItem).click();

    await test.step('assert product details page is displayed with correct info', async () => {
        await expect(productDetailPage.detailsImage).toHaveAttribute('src', productModel.image);
        await expect(productDetailPage.detailsName).toHaveText(productModel.name);
        await expect(productDetailPage.detailsPrice).toHaveText(productModel.price);
        await expect(productDetailPage.detailsDescription).toHaveText(productModel.description);
    });
});
