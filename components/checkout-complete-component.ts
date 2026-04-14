import type { Locator, Page } from '@playwright/test';


export class CheckoutCompleteComponent {
  readonly page: Page;
  readonly checkoutCompleteContainer: Locator;
  readonly iconImage: Locator;
  readonly titleText: Locator;
  readonly descriptionText: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutCompleteContainer = page.getByTestId('checkout-complete-container');
    this.iconImage = this.checkoutCompleteContainer.getByTestId('pony-express');
    this.titleText = this.checkoutCompleteContainer.getByTestId('complete-header');
    this.descriptionText = this.checkoutCompleteContainer.getByTestId('complete-text');
    this.backHomeButton = this.checkoutCompleteContainer.getByTestId('back-to-products');
  }
}
