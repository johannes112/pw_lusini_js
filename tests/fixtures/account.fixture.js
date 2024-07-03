// This fixture works but i have no idea how to handle the cookies
import { test as baseTest } from "@playwright/test";
import AccountPage from "../../pageobjects/AccountPage"; // Adjust the path to the correct location of the AccountPage module
import { chromium } from "playwright";

export const accountTest = baseTest.extend({
  pageAndAccountPage: async ({}, use) => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const accountPage = new AccountPage(page);

    await use({ page, accountPage, context }); // Makes the page available to the test
    await browser.close(); // Cleanup after the test
  },
});
