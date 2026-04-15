import type { Locator } from '@playwright/test';

export class CartItemComponent {
  readonly name: Locator;
  readonly description: Locator;
  readonly price: Locator;
  readonly quantity: Locator;

  constructor(parent: Locator) {
    this.name = parent.getByTestId('inventory-item-name');
    this.description = parent.getByTestId('inventory-item-desc');
    this.price = parent.getByTestId('inventory-item-price');
    this.quantity = parent.getByTestId('item-quantity');
  }
}
