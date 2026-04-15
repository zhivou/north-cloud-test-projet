import { type Locator, type Page } from '@playwright/test';
import BasePage from './base.page';

export const productDetailPage = {
    productDetailPage: async ({ page }, use) => {
        const productDetailPage = new ProductDetailPage(page);
        await use(productDetailPage);
    },
};

export class ProductDetailPage extends BasePage {
    readonly detailContainer: Locator;
    readonly detailsImage: Locator;
    readonly detailsName: Locator;
    readonly detailsPrice: Locator;
    readonly detailsDescription: Locator;
    readonly detailsAddToCartButton: Locator;
    readonly detailsRemoveFromCartButton: Locator;
    readonly detailsBackToProductsButton: Locator;

    constructor(page: Page) {
        super(page);
        this.detailContainer = page.getByTestId('inventory-item');
        this.detailsImage = this.detailContainer.getByTestId(/^item-sauce-labs-.*-img$/);
        this.detailsName = this.detailContainer.getByTestId('inventory-item-name');
        this.detailsPrice = this.detailContainer.getByTestId('inventory-item-price');
        this.detailsDescription = this.detailContainer.getByTestId('inventory-item-desc');
        this.detailsAddToCartButton = this.detailContainer.getByTestId('add-to-cart');
        this.detailsRemoveFromCartButton = this.detailContainer.getByTestId('remove');
        this.detailsBackToProductsButton = this.detailContainer.getByTestId('back-to-products');
    }

    async goto(itemId: string) {
        await this.page.goto(`/inventory-item.html?id=${itemId}`);
    }
}
