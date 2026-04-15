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
    readonly cartContainer: Locator;
    readonly cartList: Locator;
    readonly continueShoppingButton: Locator;
    readonly checkoutButton: Locator;
    readonly cartItems: Locator;
    readonly cartItemName: (parent: Locator) => Locator;
    readonly cartItemDescription: (parent: Locator) => Locator;
    readonly cartItemPrice: (parent: Locator) => Locator;
    readonly cartItemQuantity: (parent: Locator) => Locator;
    readonly cartItemRemoveButton: (parent: Locator) => Locator;

    constructor(page: Page) {
        super(page);
        this.cartContainer = page.getByTestId('cart-contents-container');
        this.continueShoppingButton = this.cartContainer.getByTestId('continue-shopping');
        this.checkoutButton = this.cartContainer.getByTestId('checkout');
        this.cartList = this.cartContainer.getByTestId('cart-list');
        this.cartItems = this.cartList.getByTestId('inventory-item');
        this.cartItemName = (parent) => parent.getByTestId('inventory-item-name');
        this.cartItemDescription = (parent) => parent.getByTestId('inventory-item-desc');
        this.cartItemPrice = (parent) => parent.getByTestId('inventory-item-price');
        this.cartItemQuantity = (parent) => parent.getByTestId('item-quantity');
        this.cartItemRemoveButton = (parent) => parent.getByTestId(/^remove-sauce-labs-.*$/);
    }

    async goto() {
        await this.page.goto(this.pagePath);
    }
}
