import config from "../../playwright.config";
export default class OneTrust {
  constructor(page) {
    // Your initialization code here
    this.initialize();
    this.page = page;
  }

  initialize() {
    // Function to be executed first
    console.log("-> handle OneTrust popup");
  }

  // get current date -> for cookie
  getCurrentDate() {
    const date = new Date();
    const isoDate = date.toISOString();
    console.log(isoDate);
    return isoDate;
  }

  /** cssPathes: CSS-Selectors */
  cssPathes = {
    containerOneTrust: "#onetrust-group-container",
    acceptButton: "#onetrust-accept-btn-handler",
    rejectButton: "#onetrust-reject-all-handler",
    settingsButton: "#onetrust-pc-btn-handler",
    settingsArea: "#ot-pc-content",
    saveSettingsButton: ".save-preference-btn-handler",
    performanceToggle: "#ot-group-id-C0002",
    functionalToggle: "#ot-group-id-C0003",
    advertisingToggle: "#ot-group-id-C0004",
  };
  elements = {
    bannerArea: () => this.page.locator(this.cssPathes.containerOneTrust),
    acceptButton: () => this.page.locator(this.cssPathes.acceptButton),
    rejectButton: () => this.page.locator(this.cssPathes.rejectButton),
    settingsButton: () => this.page.locator(this.cssPathes.settingsButton),
    //settingsBanner
    settingsArea: () => this.page.locator(this.cssPathes.settingsArea),
    saveSettingsButton: () =>
      this.page.locator(this.cssPathes.saveSettingsButton),
    performanceToggle: () =>
      this.page.locator(this.cssPathes.performanceToggle),
    functionalToggle: () => this.page.locator(this.cssPathes.functionalToggle),
    advertisingToggle: () =>
      this.page.locator(this.cssPathes.advertisingToggle),
  };

  actions = {
    contextShouldBeVisible: () =>
      this.elements.bannerArea().should("be.visible"),
    acceptAllCookies: () => this.elements.acceptButton().click(),
    rejectAllCookies: () => this.elements.rejectButton().click(),
    openSettings: () => this.elements.settingsButton().click(),

    executeActionWithVisibilityCheck: (action, ...args) => {
      this.actions.contextShouldBeVisible();
      this.actions[action](...args);
    },
  };
}
