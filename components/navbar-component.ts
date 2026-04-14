import type { Locator, Page } from '@playwright/test';

/** Primary header: menu host, branding, cart (Sauce Demo `HeaderContainer`). */
export class NavbarComponent {
  readonly page: Page;
  readonly root: Locator;
  readonly shoppingButton: Locator;
  readonly drawerButton: Locator;

  readonly secondaryHeader: Locator;
  readonly secondaryHeaderTitle: Locator;
  readonly secondaryHeaderProductSort: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.getByTestId('primary-header');
    this.shoppingButton = this.root.getByTestId('shopping-cart-link');
    // The element for this button is not well design in real world I would use a data-test attribute. I could use id but it is not recomended per best practices.
    // getByRole with root isolation will work but I woudl refactor the code to use a data-test attribute.
    this.drawerButton = this.root.getByRole('button', { name: 'Open Menu' }); 
    this.secondaryHeader = page.getByTestId('secondary-header');
    this.secondaryHeaderTitle = this.secondaryHeader.getByTestId('title');
    this.secondaryHeaderProductSort = this.secondaryHeader.getByTestId('product-sort');
  }
}
