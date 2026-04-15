import { type Page, type Locator } from '@playwright/test';
import BasePage from './base.page';
import { CartItemComponent } from '../components/cart-item-component';

export const cartPage = {
    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },
};

export class CartPage extends BasePage {
    readonly pagePath = '/cart.html';
    readonly cartContainer: Locator;
    readonly cartList: Locator;
    readonly continueShoppingButton: Locator;
    readonly checkoutButton: Locator;
    readonly cartItems: Locator;
    readonly cartItemRemoveButton: (parent: Locator) => Locator;
    readonly cartItem: (parent: Locator) => CartItemComponent;

    constructor(page: Page) {
        super(page);
        this.cartContainer = page.getByTestId('cart-contents-container');
        this.continueShoppingButton = this.cartContainer.getByTestId('continue-shopping');
        this.checkoutButton = this.cartContainer.getByTestId('checkout');
        this.cartList = this.cartContainer.getByTestId('cart-list');
        this.cartItems = this.cartList.getByTestId('inventory-item');
        this.cartItemRemoveButton = (parent) => parent.getByTestId(/^remove-sauce-labs-.*$/);
        this.cartItem = (parent) => new CartItemComponent(parent);
    }

    async goto() {
        await this.page.goto(this.pagePath);
    }
}
