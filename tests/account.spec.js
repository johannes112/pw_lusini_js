import AccountPage from "../pageobjects/AccountPage";

const { chromium } = require("playwright");
import { test, expect } from "@playwright/test";
import { beforeAll } from "@playwright/test";
import { afterAll } from "@playwright/test";

test.describe("template account", () => {
  let browser, page, context, account, pageElements;

  beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    account = new AccountPage(page); // Assuming 'page' is defined and is an instance of Playwright's Page
    pageElements = account.getElements();
    // set Cookies
    account.setCookies(context).setB2b();
    console.log("URL", page.url());
    account.setCookies(context).closeCookieBanner();
  });

  afterAll(async () => {
    await browser.close();
  });

  test("contains the account-context when user is on the account-page", async () => {
    // negative test
    await expect(pageElements.pageContext()).not.toBeVisible();
    // visit the accountpage
    await page.goto(account.urls.account);
    // locator exists and is visible on the page
    await expect(pageElements.pageContext()).toBeVisible();
  });
  test("contains a loginmask when user is on the account-page", async () => {
    // negative test
    await expect(pageElements.formLoginMail()).not.toBeVisible();
    // visit the accountpage
    await page.goto(account.urls.accountLogin);
    // locator exists and is visible on the page
    await expect(pageElements.formLoginMail()).toBeVisible();
  });
  test("navigates to account-url when user click to the account-icon", async () => {
    await page.goto("https://dev.lusini.com:8000");
    // negative test
    await expect(pageElements.pageContext()).not.toBeVisible();
    // click on the account-icon
    await pageElements.accountIcon().click();
    // check if the context of the accountpage is visible
    await expect(pageElements.pageContext()).toBeVisible();
  });
});
