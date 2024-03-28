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
  };
  urls = {
    lusini: "https://dev.lusini.com:8000/",
    account: "https://dev.lusini.com:8000/account/",
    accountLogin: "https://dev.lusini.com:8000/account/login/",
  };

  getElements() {
    return {
      pageContext: () => this.page.locator(this.cssPathes.pageContext),
      formLoginMail: () => this.page.locator(this.cssPathes.formLoginMail),
      accountIcon: () => this.page.locator(this.cssPathes.accountIcon),
    };
  }

  actions = {};

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
