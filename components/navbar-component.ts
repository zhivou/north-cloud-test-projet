import type { Locator, Page } from '@playwright/test';

/** Primary header: menu host, branding, cart (Sauce Demo `HeaderContainer`). */
export class NavbarComponent {
  readonly page: Page;
  readonly root: Locator;
  readonly shoppingButton: Locator;
  readonly cartBadge: Locator;
  readonly drawerButton: Locator;

  readonly secondaryHeader: Locator;
  readonly secondaryHeaderTitle: Locator;
  readonly secondaryHeaderProductSortSelector: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.getByTestId('primary-header');
    this.shoppingButton = this.root.getByTestId('shopping-cart-link');
    this.cartBadge = this.shoppingButton.getByTestId('shopping-cart-badge');
    // The element for this button is not well designed; in a real world scenario I would use a data-test attribute. I could use id but it is not recommended per best practices.
    // getByRole with root isolation will work but I would refactor the code to use a data-test attribute.
    this.drawerButton = this.root.getByRole('button', { name: 'Open Menu' }); 
    this.secondaryHeader = page.getByTestId('secondary-header');
    this.secondaryHeaderTitle = this.secondaryHeader.getByTestId('title');
    this.secondaryHeaderProductSortSelector = this.secondaryHeader.getByTestId('product-sort-container');
  }

  async selectProductSort(sortOption: 'lohi' | 'hilo' | 'az' | 'za') {
    await this.secondaryHeaderProductSortSelector.selectOption({ value: sortOption });
  }
}
