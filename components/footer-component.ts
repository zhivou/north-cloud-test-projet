import type { Locator, Page } from '@playwright/test';

/** Global footer (Sauce Demo `SwagLabsFooter`). */
export class FooterComponent {
  readonly page: Page;
  readonly root: Locator;
  readonly twitterLink: Locator;
  readonly facebookLink: Locator;
  readonly linkedinLink: Locator;
  readonly copy: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.getByTestId('footer');
    this.twitterLink = page.getByTestId('social-twitter');
    this.facebookLink = page.getByTestId('social-facebook');
    this.linkedinLink = page.getByTestId('social-linkedin');
    this.copy = page.getByTestId('footer-copy');
  }
}
