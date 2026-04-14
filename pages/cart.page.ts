import { type Page, type Locator, PlaywrightTestArgs } from '@playwright/test';
import BasePage from './base.page';

export const cartPage = {
    cartPage: async ({ page }: PlaywrightTestArgs, use: (r: CartPage) => void) => {
        const cartPage = new CartPage(page);
        use(cartPage);
    },
};

export class CartPage extends BasePage {
    readonly pagePath = '/cart.html';

    constructor(page: Page) {
        super(page);
    }

    async goto() {
        await this.page.goto(this.pagePath);
    }
}
