// Import necessary Playwright utilities
const { test: baseTest } = require("@playwright/test");

// Define the secureClick function as a fixture
exports.test = baseTest.extend({
  secureClick: async ({ page }, use) => {
    // Implementation of secureClick adapted for use as a fixture
    async function secureClick(selector, options = { retry: 2 }) {
      let attempts = 0;
      while (attempts < options.retry) {
        try {
          console.log("> secureClick");
          console.log(`Attempt to click on ${selector}, try #${attempts + 1}`);
          const element = await page.locator(selector);
          console.log(">> Got the element: ", element);
          await element.click({ timeout: 2000 });
          console.log(`>> Clicked on ${selector} successfully.`);
          return true;
        } catch (error) {
          console.warn(`>>> Error clicking on ${selector}:`, error);
          // Assuming setCookies is defined elsewhere and properly handles the context
          // await page.context().setCookies().setB2b();
          // await page.context().setCookies().closeCookieBanner();
          await page.reload();
          attempts++;
        }
      }
      throw new Error(
        `Failed to click on ${selector} after ${options.retry} attempts.`
      );
    }

    // Use the fixture in your tests
    await use(secureClick);
  },
});
