import { type Page, type Locator, expect } from '@playwright/test';
import BasePage from './base.page';
import ProductModel from '../data-models/product.model';
import { parsePrice } from '../utils/price.utils';

export const inventoryPage = {
    inventoryPage: async ({ page }, use) => {
        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage);
    },
};

export class InventoryPage extends BasePage {
    readonly pagePath = '/inventory.html';

    // Product items
    readonly inventoryList: Locator;
    readonly productItems: Locator;
    readonly productName: (parent: Locator) => Locator;
    readonly productPrice: (parent: Locator) => Locator;
    readonly productDescription: (parent: Locator) => Locator;
    readonly productImage: (parent: Locator) => Locator;
    readonly productImageLink: (parent: Locator) => Locator;
    readonly productLink: (parent: Locator) => Locator;
    readonly productAddToCartButton: (parent: Locator) => Locator;
    readonly productRemoveFromCartButton: (parent: Locator) => Locator;

    constructor(page: Page) {
        super(page);
        this.inventoryList = page.getByTestId('inventory-list');
        this.productItems = this.inventoryList.getByTestId('inventory-item');
        this.productName = (parent) => parent.getByTestId('inventory-item-name');
        this.productPrice = (parent) => parent.getByTestId('inventory-item-price');
        this.productDescription = (parent) => parent.getByTestId('inventory-item-desc');
        this.productImage = (parent) => parent.getByTestId(/^inventory-item-.*-img$/);
        this.productImageLink = (parent) => parent.getByTestId(/item-\d+-img-link/);
        this.productLink = (parent) => parent.getByTestId(/item-\d+-title-link/);
        this.productAddToCartButton = (parent) => parent.getByTestId(/^add-to-cart-.*$/);
        this.productRemoveFromCartButton = (parent) => parent.getByTestId(/^remove.*$/);
    }

    async goto() {
        await this.page.goto(this.pagePath);
    }

    async allProducts(): Promise<Locator[]> {
        return await this.productItems.all();
    }

    // Collect prices from all product items and keeps the sorted order
    async collectPrices(): Promise<number[]> {
        const prices: number[] = [];
        for (const item of await this.allProducts()) {
            const priceText = await this.productPrice(item).textContent();
            expect(priceText, 'Expected each product card to have a visible price text').not.toBeNull();
            prices.push(parsePrice(priceText!));
        }
        return prices;
    }

    async collectProductNames(): Promise<string[]> {
        const productNames: string[] = [];
        for (const item of await this.allProducts()) {
            const productNameText = await this.productName(item).textContent();
            expect(productNameText, 'Expected each product card to have a visible product name text').not.toBeNull();
            productNames.push(productNameText!);
        }
        return productNames;
    }

    async addToCart(products: ProductModel[]) {
        for (const product of products) {
            const item = this.productItems.filter({ has: this.page.getByTestId('inventory-item-name').getByText(product.name, { exact: true }) });
            await this.productAddToCartButton(item).click();
        }
    }
}
