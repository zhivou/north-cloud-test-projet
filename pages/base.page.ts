import type { Page } from '@playwright/test';
import { DrawerComponent } from '../components/drawer-component';
import { FooterComponent } from '../components/footer-component';
import { NavbarComponent } from '../components/navbar-component';

export default class BasePage {
  readonly page: Page;
  readonly navbar: NavbarComponent;
  readonly drawer: DrawerComponent;
  readonly footer: FooterComponent;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new NavbarComponent(page);
    this.drawer = new DrawerComponent(page);
    this.footer = new FooterComponent(page);
  }

  async logout() {
    await this.navbar.drawerButton.click();
    await this.drawer.logoutLink.click();
  }
}
