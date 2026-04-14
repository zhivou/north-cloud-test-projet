import { test as base } from '@playwright/test';
import UserModel from '../data-models/user.model';
import { cartPage, CartPage } from '../pages/cart.page';
import { inventoryPage, InventoryPage } from '../pages/inventory.page';
import { loginPage, LoginPage } from '../pages/login-page.page';
import { productDetailPage, ProductDetailPage } from '../pages/product-detail.page';
import { type WrongLoginUserScenario, usersFixture } from './users-fixture';

export const test = base.extend<{
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
    productDetailPage: ProductDetailPage;
    standardUser: UserModel;
    lockedOutUser: UserModel;
    problemUser: UserModel;
    performanceGlitchUser: UserModel;
    errorUser: UserModel;
    visualUser: UserModel;
    wrongLoginUserScenarios: readonly WrongLoginUserScenario[];
}>({
    ...loginPage,
    ...inventoryPage,
    ...cartPage,
    ...productDetailPage,
    ...usersFixture,
});

export { expect } from '@playwright/test';
