import { type Page, type Locator, expect } from '@playwright/test';
import BasePage from './base.page';
import UserModel from '../data-models/user.model';

export const loginPage = {
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    }
};

export class LoginPage extends BasePage {
    readonly pagePath = '/';

    readonly loginContainer: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.loginContainer = page.getByTestId('login-container'); // This is a container for the login form. Just in case if there is more than one login form on the page with the same selectors.
        this.usernameInput = this.loginContainer.getByTestId('username');
        this.passwordInput = this.loginContainer.getByTestId('password');
        this.loginButton = this.loginContainer.getByTestId('login-button');
        this.errorMessage = this.loginContainer.getByTestId('error');
    }

    async goto() {
        await this.page.goto(this.pagePath);
    }

    async login(user: UserModel) {
        await this.usernameInput.fill(user.username);
        await this.passwordInput.fill(user.password);
        await this.loginButton.click();
    }

    async assertLoginSuccess() {
        await expect(this.page).toHaveURL('/inventory.html');
        await expect(this.navbar.root).toBeVisible();
    }
}
