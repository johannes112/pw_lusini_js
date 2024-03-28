export default class Footer {
  elements = {
    context: () => cy.get('[data-cy-ctx="app/Footer"]'),
    //content
    infoPointLabels: () => cy.get(".lists.desktop > div> ul > li > a"),
    socialIcons: () => cy.get(".social > .icons"),
    linkedNumbers: () => cy.get(".info-contact > a"),
    countrySwitcher: () => cy.get('[data-cy-handle="country-switcher"]'),
    trustedBadge: () => cy.get(".Trusted > .icons-wrapper > div"),
    //copyRight
    copyRightLabels: () => cy.get(".Copyright > div > div > div > a"),
    bottomLineInfoText: () => cy.get('[data-cy-handle="b2x-toggle"]'),
  };

  actions = {
    contextShouldBeVisible: () => this.elements.context().should("be.visible"),
    changeCustomerType: () => this.elements.b2bButton().click(),
    executeSearchFor: (value) => {
      this.elements.searchField().type(value);
      this.elements.searchIcon().click();
    },
  };

  cookies = {
    setB2b: () => cy.setCookie("channel", "b2b"),
    setB2c: () => cy.setCookie("channel", "b2c"),
  };
}
