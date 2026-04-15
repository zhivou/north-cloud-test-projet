import type { Locator, Page } from '@playwright/test';

/** Burger menu panel and sidebar links (Sauce Demo `DrawerMenu`). */
export class DrawerComponent {
  readonly page: Page;
  readonly openMenu: Locator;
  readonly closeMenu: Locator;
  readonly allItemsLink: Locator;
  readonly aboutLink: Locator;
  readonly logoutLink: Locator;
  readonly resetAppStateLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.openMenu = page.getByTestId('open-menu');
    this.closeMenu = page.getByTestId('close-menu');
    this.allItemsLink = page.getByTestId('inventory-sidebar-link');
    this.aboutLink = page.getByTestId('about-sidebar-link');
    this.logoutLink = page.getByTestId('logout-sidebar-link');
    this.resetAppStateLink = page.getByTestId('reset-sidebar-link');
  }
}
