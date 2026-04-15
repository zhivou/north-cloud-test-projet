import type { Locator, Page } from '@playwright/test';


export class CheckoutOverviewComponent {
  readonly page: Page;
  readonly checkoutOverviewContainer: Locator;
  readonly cartList: Locator;
  readonly cartItems: Locator;
  readonly cartItemName: (parent: Locator) => Locator;
  readonly cartItemDescription: (parent: Locator) => Locator;
  readonly cartItemPrice: (parent: Locator) => Locator;
  readonly cartItemQuantity: (parent: Locator) => Locator;
  readonly paymentInfoValue: Locator;
  readonly shippingInfoValue: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutOverviewContainer = page.getByTestId('checkout-summary-container');
    this.cartList = this.checkoutOverviewContainer.getByTestId('cart-list');
    this.cartItems = this.cartList.getByTestId('inventory-item');
    this.cartItemName = (parent) => parent.getByTestId('inventory-item-name');
    this.cartItemDescription = (parent) => parent.getByTestId('inventory-item-desc');
    this.cartItemPrice = (parent) => parent.getByTestId('inventory-item-price');
    this.cartItemQuantity = (parent) => parent.getByTestId('item-quantity');
    this.paymentInfoValue = this.checkoutOverviewContainer.getByTestId('payment-info-value');
    this.shippingInfoValue = this.checkoutOverviewContainer.getByTestId('shipping-info-value');
    this.subtotalLabel = this.checkoutOverviewContainer.getByTestId('subtotal-label');
    this.taxLabel = this.checkoutOverviewContainer.getByTestId('tax-label');
    this.totalLabel = this.checkoutOverviewContainer.getByTestId('total-label');
    this.finishButton = this.checkoutOverviewContainer.getByTestId('finish');
    this.cancelButton = this.checkoutOverviewContainer.getByTestId('cancel');
  }
}
