import { expect, type Locator, type Page, PlaywrightTestArgs } from '@playwright/test';
import BasePage from './base.page';
import { CheckoutInformationComponent } from '../components/checkout-information-component';
import { CheckoutOverviewComponent } from '../components/checkout-overview-component';
import UserModel from '../data-models/user.model';
import { CheckoutCompleteComponent } from '../components/checkout-complete-component';
import ProductModel from '../data-models/product.model';

export const checkoutPage = {
    checkoutPage: async ({ page }: PlaywrightTestArgs, use: (r: CheckoutPage) => void) => {
        const checkoutPage = new CheckoutPage(page);
        use(checkoutPage);
    },
};

export class CheckoutPage extends BasePage {
    readonly checkoutInformation: CheckoutInformationComponent;
    readonly checkoutOverview: CheckoutOverviewComponent;
    readonly checkoutComplete: CheckoutCompleteComponent;
    
    constructor(page: Page) {
      super(page);
      this.checkoutInformation = new CheckoutInformationComponent(page);
      this.checkoutOverview = new CheckoutOverviewComponent(page);
      this.checkoutComplete = new CheckoutCompleteComponent(page);
    }

    async fillOutUserInformationAllowEmpty(user: UserModel) {
        await this.checkoutInformation.firstNameInput.fill(`${user.firstName}`);
        await this.checkoutInformation.lastNameInput.fill(`${user.lastName}`);
        await this.checkoutInformation.postalCodeInput.fill(`${user.postalCode}`);
    }

    async fillOutUserInformation(user: UserModel) {
        if (!user.firstName || !user.lastName || !user.postalCode) {
            throw new Error('Framework Error: User information is not complete');
        }
        await this.fillOutUserInformationAllowEmpty(user);
    }

    async completeCheckout(user: UserModel) {
        await this.fillOutUserInformation(user);
        await this.checkoutInformation.continueButton.click();
        await this.checkoutOverview.finishButton.click();
    }

    async assertCheckoutItem(checkoutItem: Locator, item: ProductModel) {
        await expect(checkoutItem.getByTestId('inventory-item-name')).toHaveText(item.name);
        await expect(checkoutItem.getByTestId('inventory-item-price')).toHaveText(item.price);
        await expect(checkoutItem.getByTestId('inventory-item-desc')).toHaveText(item.description);
        await expect(checkoutItem.getByTestId('item-quantity')).toHaveText('1');
    }
}