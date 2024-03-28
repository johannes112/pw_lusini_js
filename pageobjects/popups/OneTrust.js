export default class OneTrust {
  constructor() {
    // Your initialization code here
    this.initialize();
  }

  initialize() {
    // Function to be executed first
    cy.log("-> handle OneTrust popup");
  }

  // get current date -> for cookie
  getCurrentDate() {
    const date = new Date();
    const isoDate = date.toISOString();
    console.log(isoDate);
    return isoDate;
  }

  elements = {
    bannerArea: () => cy.get("#onetrust-group-container"),
    acceptButton: () => cy.get("#onetrust-accept-btn-handler"),
    rejectButton: () => cy.get("#onetrust-reject-all-handler"),
    settingsButton: () => cy.get("#onetrust-pc-btn-handler"),
    //settingsBanner
    settingsArea: () => cy.get("#ot-pc-content"),
    saveSettingsButton: () => cy.get(".save-preference-btn-handler"),
    performanceToggle: () => cy.get("#ot-group-id-C0002"),
    functionalToggle: () => cy.get("#ot-group-id-C0003"),
    advertisingToggle: () => cy.get("#ot-group-id-C0004"),
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

  cookies = {
    acceptAll: () =>
      cy.setCookie(
        "OptanonConsent",
        "isGpcEnabled=0&datestamp=Fri+Jan+20+2024+21%3A55%3A45+GMT%2B0100+(Mitteleurop%C3%A4ische+Normalzeit)&version=6.30.0&isIABGlobal=false&hosts=&consentId=2bc5dece-9112-42a9-9c89-8948028374c2&interactionCount=1&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1%2CC0004%3A1"
      ),
    rejectAll: () =>
      cy.setCookie(
        "OptanonConsent",
        "consentId=4a14fe2a-dc77-4d7d-ae2e-e07b29b7c054&datestamp=Fri+Jan+19+2024+21%3A24%3A55+GMT%2B0100+(Mitteleurop%C3%A4ische+Normalzeit)&version=6.30.0&interactionCount=1&isGpcEnabled=0&isIABGlobal=false&hosts=&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A0%2CC0003%3A0%2CC0004%3A0"
      ),
    closeAlertBox: () =>
      cy.setCookie("OptanonAlertBoxClosed", this.getCurrentDate()),
  };
}
