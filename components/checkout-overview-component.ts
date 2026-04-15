import type { Locator, Page } from '@playwright/test';
import { CartItemComponent } from './cart-item-component';

export class CheckoutOverviewComponent {
  readonly page: Page;
  readonly checkoutOverviewContainer: Locator;
  readonly cartList: Locator;
  readonly cartItems: Locator;
  readonly paymentInfoValue: Locator;
  readonly shippingInfoValue: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;
  readonly cartItem: (parent: Locator) => CartItemComponent;

  constructor(page: Page) {
    this.page = page;
    this.checkoutOverviewContainer = page.getByTestId('checkout-summary-container');
    this.cartList = this.checkoutOverviewContainer.getByTestId('cart-list');
    this.cartItems = this.cartList.getByTestId('inventory-item');
    this.paymentInfoValue = this.checkoutOverviewContainer.getByTestId('payment-info-value');
    this.shippingInfoValue = this.checkoutOverviewContainer.getByTestId('shipping-info-value');
    this.subtotalLabel = this.checkoutOverviewContainer.getByTestId('subtotal-label');
    this.taxLabel = this.checkoutOverviewContainer.getByTestId('tax-label');
    this.totalLabel = this.checkoutOverviewContainer.getByTestId('total-label');
    this.finishButton = this.checkoutOverviewContainer.getByTestId('finish');
    this.cancelButton = this.checkoutOverviewContainer.getByTestId('cancel');
    this.cartItem = (parent) => new CartItemComponent(parent);
  }
}
