import AccountPage from "../pageobjects/AccountPage";
import GlobalFunctions from "../helpers/Functions.js";
import Cookies from "../helpers/Cookies";
const { use } = require("../playwright.config");
const { chromium } = require("playwright");
import { users } from "../data/users.json";
import { test, expect } from "@playwright/test";
import { beforeAll } from "@playwright/test";
import { afterAll } from "@playwright/test";

test.describe("template account", () => {
  let browser, page, context, account, pageElements, cookies;

  beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    account = new AccountPage(page); // Assuming 'page' is defined and is an instance of Playwright's Page
    pageElements = account.elements;
    // set Cookies
    await Cookies.setCookies(context).setB2c();
    await Cookies.setCookies(context).closeCookieBanner();

    // Get cookies from the current context
    cookies = await context.cookies();
    console.log("Cookies after beforeAll:", cookies);
  });

  afterAll(async () => {
    // Get all cookies
    // const cookies = await context.cookies();
    // console.log(cookies);
    // console.log("AllCookies after afterAll:", cookies);
    await browser.close();
  });

  test("navigates to account-url when user click to the account-icon", async () => {
    await page.goto("/");
    // negative test
    await expect(page.url()).not.toBe(use.baseURL + account.urls.accountLogin);
    // click on the account-icon
    await GlobalFunctions.secureClick(page, account.cssPathes.accountIcon);
    // await GlobalFunctions.secureClick(account.elements.accountIcon());
    await page.waitForURL(use.baseURL + account.urls.accountLogin, {
      // Ensure consistent variable name
      timeout: 2000,
    });
    await expect(page.url()).toBe(use.baseURL + account.urls.accountLogin);
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
  test("get an error msg when login with an unregistered user", async () => {
    // visit the accountpage
    await page.goto(account.urls.accountLogin);
    // negative test
    await expect(pageElements.stateErrorPassword()).not.toBeVisible();
    // fill the login form
    await account.actions.loginAsUser(users[0]);
    // expect the error message to be visible
    await expect(pageElements.stateErrorPassword()).toBeVisible();
  });
});
