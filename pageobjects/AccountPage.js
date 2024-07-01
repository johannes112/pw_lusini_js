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

  getElements() {
    return {
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
  }

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
  setCookies(context) {
    console.log("-> setCookies");
    return {
      setB2b: async () =>
        await context.addCookies([
          {
            name: "channel",
            value: "b2b",
            url: this.urls.lusini,
          },
        ]),
      setB2c: async () =>
        await context.addCookies([
          {
            name: "channel",
            value: "b2c",
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
    console.log(isoDate);
    console.log(typeof isoDate);
    return isoDate;
  }
}
