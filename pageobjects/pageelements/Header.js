export default class Header {
  constructor() {
    // Your initialization code here
    this.initialize();
  }

  initialize() {
    // Function to be executed first
    cy.log("-> handle Header");
  }

  cssPathes = {
    context: '[data-cy-ctx="app/Header"]',
    logo: ".logo",
    searchField: '[data-cy-handle="search-input"]',
    searchIcon: '[data-cy-handle="search-icon"]',
    wishlistButton: ".wishlist",
    contactButton: ".contact",
    accountButton: ".account",
    cartButton: ".cart",
    navigation: ".Navigation",
    burgermenuButton: ".category-button",
    handleMenuCategoryItem: '[data-cy-handle="select-category-item"]',
    menuCategoryItem: ".CategoryItem",
    b2bButton: '[data-cy-handle="b2x-toggle"]',
  };

  elements = {
    context: () => cy.get(this.cssPathes.context),
    logo: () => cy.get(this.cssPathes.logo),
    //search
    searchField: () => cy.get(this.cssPathes.searchField),
    searchIcon: () => cy.get(this.cssPathes.searchIcon),
    //buttons
    wishlistButton: () => cy.get(this.cssPathes.wishlistButton),
    contactButton: () => cy.get(this.cssPathes.contactButton),
    accountButton: () => cy.get(this.cssPathes.accountButton),
    cartButton: () => cy.get(this.cssPathes.cartButton),
    // menu
    navigation: () => cy.get(this.cssPathes.navigation),
    burgermenuButton: () => cy.get(this.cssPathes.burgermenuButton),
    menuCategoryItem: (entry) =>
      cy.get(this.cssPathes.menuCategoryItem).eq(entry),
    menuSubCategoryItem: () => cy.get(this.cssPathes.menuSubCategoryItem),
    //b2b/b2c
    b2bButton: () => cy.get(this.cssPathes.b2bButton),
  };

  actions = {
    clickOnTheMenu: () => this.elements.burgermenuButton().click(),
    handleMenuCategoryItem: () => this.elements.menuCategoryItem(),
    clickOnTheMenuCategoryItem: (entry) =>
      this.elements.menuCategoryItem(entry).click(),
    handleMenuSubCategoryItem: () => this.elements.menuSubCategoryItem(),
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
