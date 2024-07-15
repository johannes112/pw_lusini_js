const { use } = require("../playwright.config");
import GlobalFunctions from "./Functions";

export default class Cookies {
  /** urls: relative http-pathes */
  urls = {
    lusini: config.use.baseURL,
  };

  /** Cookies */

  static setCookies(context) {
    console.log("-> setCookies");
    const cookies = {
      b2b: {
        name: "channel",
        value: "de-de_b2b",
        url: use.baseURL,
      },
      b2c: {
        name: "channel",
        value: "de-de_b2c",
        url: use.baseURL,
      },
      cookieBanner: {
        name: "OptanonAlertBoxClosed",
        value: GlobalFunctions.getCurrentDate(),
        url: use.baseURL,
      },
    };

    return {
      setB2b: async () => await context.addCookies([cookies.b2b]),
      setB2c: async () => await context.addCookies([cookies.b2c]),
      closeCookieBanner: async () =>
        await context.addCookies([cookies.cookieBanner]),
    };
  }
}
