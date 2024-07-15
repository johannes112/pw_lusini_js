// import OneTrust from "../pageobjects/popups/OneTrust";
import Cookies from "./Cookies";

export default class GlobalFunctions {
  constructor(page) {
    this.page = page;
  }

  // get current date -> for cookie
  static getCurrentDate() {
    const date = new Date();
    const isoDate = date.toISOString();
    return isoDate;
  }

  // set a cookie and retry it
  static async secureClick(page, selector, options = { retry: 2 }) {
    let attempts = 0;
    while (attempts < options.retry) {
      try {
        console.log("> secureClick");
        console.log(`Attempt to click on ${selector}, try #${attempts + 1}`);
        const element = await page.locator(selector);
        console.log(">> Got the element: ", element);
        // Click the element
        await element.click({ timeout: 1000 }); //{ timeout: 2000 }
        console.log(`>> Clicked on ${selector} successfully.`);
        return true;
      } catch (error) {
        console.warn(`>>> Error clicking on ${selector}:`, error);
        // Set cookies to close the cookie banner and refresh the page
        // Cookies.setCookies(this.page.context()).setB2b();
        await Cookies.setCookies(page.context()).setB2b();
        await Cookies.setCookies(page.context()).closeCookieBanner();
        // this.cookies.setCookies(this.page.context()).closeCookieBanner();
        if (attempts > 1) {
          await page.reload();
        }
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
