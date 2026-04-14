import { type Page, type Locator, PlaywrightTestArgs } from '@playwright/test';
import BasePage from './base.page';

export const inventoryPage = {
    inventoryPage: async ({ page }: PlaywrightTestArgs, use: (r: InventoryPage) => void) => {
        const inventoryPage = new InventoryPage(page);
        use(inventoryPage);
    },
};

export class InventoryPage extends BasePage {
    readonly pagePath = '/inventory.html';

    constructor(page: Page) {
        super(page);
    }

    async goto() {
        await this.page.goto(this.pagePath);
    }
}
