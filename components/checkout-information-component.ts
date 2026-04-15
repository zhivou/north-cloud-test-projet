import type { Locator, Page } from '@playwright/test';


export class CheckoutInformationComponent {
  readonly page: Page;
  readonly checkoutInformationContainer: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutInformationContainer = page.getByTestId('checkout-info-container');
    this.firstNameInput = this.checkoutInformationContainer.getByTestId('firstName');
    this.lastNameInput = this.checkoutInformationContainer.getByTestId('lastName');
    this.postalCodeInput = this.checkoutInformationContainer.getByTestId('postalCode');
    this.continueButton = this.checkoutInformationContainer.getByTestId('continue');
    this.cancelButton = this.checkoutInformationContainer.getByTestId('cancel');
    this.errorMessage = this.checkoutInformationContainer.getByTestId('error');
  }
}
