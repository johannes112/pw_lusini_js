export default class Account {
  constructor(page) {
    this.page = page;
    this.initialize();
  }

  async initialize() {
    // Function to be executed first
    console.log("-> handle Account");
    console.log("current URL", this.page.url());
    console.log("current Date", this.getCurrentDate());
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

  // Custom locator wrapper method
  async secureLocator(selector, options = { retry: 1 }) {
    try {
      // Attempt to find the element
      const element = await this.page.waitForSelector(selector, {
        state: "attached",
      });
      return this.page.locator(selector);
    } catch (error) {
      if (options.retry > 0) {
        console.log(
          `Element not found, setting a cookie and retrying: ${selector}`
        );
        // Set a cookie here
        await this.page
          .context()
          .addCookies([{ name: "retry", value: "1", url: this.page.url() }]);
        // Decrement retry count and retry
        return this.customLocator(selector, { retry: options.retry - 1 });
      } else {
        // If retries are exhausted, throw the error
        throw error;
      }
    }
  }

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
  };

  urls = {
    lusini: "https://dev.lusini.com:8000/",
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
            value: "2024-07-03T16:05:06.188Z",
            url: this.urls.lusini,
          },
        ]),
    };
  }

  // get current date -> for cookie
  async getCurrentDate() {
    const date = new Date();
    const isoDate = await date.toISOString();
    console.log(isoDate);
    console.log(typeof isoDate);
    return isoDate;
  }
}
