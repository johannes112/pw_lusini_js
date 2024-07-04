import config from "../playwright.config.js";
export default class Account {
  constructor(page) {
    this.page = page;
    this.initialize();
  }

  async initialize() {
    // Function to be executed first
    console.log("-> handle Account");
  }

  cssPathes = {
    pageContext: '[data-cy-ctx="molecules/account/AccountLoginForm"]',
    formLoginMail: ".login-mail",
    accountIcon: ".account",
    fieldEmailInput: '[data-cy-handle="email-input"]',
    fieldPasswordInput: '[data-cy-handle="password-input"]',
    buttonLogin: '[data-cy-handle="login-btn"]',
    // data-cy-state="login-form-password-error"
    stateErrorPassword: '[data-cy-state="login-form-password-error"]',
  };

  elements = {
    pageContext: () => this.page.locator(this.cssPathes.pageContext),
    formLoginMail: () => this.page.locator(this.cssPathes.formLoginMail),
    accountIcon: () => this.page.locator(this.cssPathes.accountIcon),
    fieldEmailInput: () => this.page.locator(this.cssPathes.fieldEmailInput),
    fieldPasswordInput: () =>
      this.page.locator(this.cssPathes.fieldPasswordInput),
    buttonLogin: () => this.page.locator(this.cssPathes.buttonLogin),
    stateErrorPassword: () =>
      this.page.locator(this.cssPathes.stateErrorPassword),
  };

  actions = {
    loginAsUser: async (user) => {
      console.log("-> fillLoginForm");
      await this.page.fill(this.cssPathes.fieldEmailInput, user.email);
      await this.page.fill(this.cssPathes.fieldPasswordInput, user.password);
      await this.page.click(this.cssPathes.buttonLogin);
    },
    clickIcon: async () => {
      console.log("-> clickIcon");
      await this.secureClick(this.cssPathes.accountIcon);
    },
  };

  urls = {
    lusini: config.use.baseURL,
    account: "account/",
    accountLogin: "account/login/",
  };
  cookies = {
    b2b: "channel=b2b",
    b2c: "channel=b2c",
    cookieBanner: "OptanonAlertBoxClosed",
  };

  setCookies(context) {
    console.log("-> setCookies");
    return {
      setB2b: async () =>
        await context.addCookies([
          {
            name: "channel",
            value: "de-de_b2b",
            url: this.urls.lusini,
          },
        ]),
      setB2c: async () =>
        await context.addCookies([
          {
            name: "channel",
            value: "de-de_b2c",
            url: this.urls.lusini,
          },
        ]),
      closeCookieBanner: async () =>
        await context.addCookies([
          {
            name: "OptanonAlertBoxClosed",
            value: this.getCurrentDate(),
            url: this.urls.lusini,
          },
        ]),
    };
  }

  // get current date -> for cookie
  getCurrentDate() {
    const date = new Date();
    const isoDate = date.toISOString();
    return isoDate;
  }

  // set a cookie and retry it
  async secureClick(selector, options = { retry: 2 }) {
    let attempts = 0;
    while (attempts < options.retry) {
      try {
        console.log("> secureClick");
        console.log(`Attempt to click on ${selector}, try #${attempts + 1}`);
        const element = await this.page.locator(selector);
        // Set cookies to close the cookie banner
        this.setCookies(this.page.context()).closeCookieBanner();
        // Click the element
        console.log(`Clicked on ${selector} successfully.`);
        await element.click({ timeout: 1000 });
        return true;
      } catch (error) {
        console.error(`Error clicking on ${selector}:`, error);
        // Increment the attempt counter
        attempts++;
        // Optionally, wait a bit before retrying (e.g., 500ms)
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
    console.error(
      `Failed to click on ${selector} after ${options.retry} attempts.`
    );
    return false; // Click failed after retrying
  }
}
