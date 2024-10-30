describe("Mijn eerste test", () => {
  it("Draait de applicatie", () => {
    cy.visit("http://localhost:5173");
  });

  it("should login", () => {
    cy.login("maxim.lison@student.hogent.be", "123456789");
  });
});

describe("Navigation header", () => {
  beforeEach("start page", () => {
    cy.visit("http://localhost:5173");
  });

  it("should navigate to homepage", () => {
    cy.get("[data-cy=headerlink_homepage]").click();
  });

  it("should navigate to hoodies page from header", () => {
    cy.get("[data-cy=headerlink_Hoodies_page]").click();
  });

  it("should navigate to shirts page from header", () => {
    cy.get("[data-cy=headerlink_Shirts_page]").click();
  });

  it("should navigate to trousers page from header", () => {
    cy.get("[data-cy=headerlink_Trousers_page]").click();
  });

  it("should navigate to accessories page", () => {
    cy.get("[data-cy=headerlink_Accessories_page]").click();
  });

  it("should navigate to login", () => {
    cy.get("[data-cy=headerlink_loginpage]").click();
  });

  it("should navigate to profile", () => {
    cy.login("maxim.lison@student.hogent.be", "123456789");
    cy.visit("http://localhost:5173/Profile");
  });

  it("should navigate to order page", () => {
    cy.login("maxim.lison@student.hogent.be", "123456789");
    cy.visit("http://localhost:5173/cart");
  });
});

describe("Navigation home page", () => {
  beforeEach("start page", () => {
    cy.visit("http://localhost:5173");
  });

  it("should navigate to shirts page from picture", () => {
    cy.get("[data-cy=link_shirts_page]").click();
  });

  it("should navigate to trousers page from picture", () => {
    cy.get("[data-cy=link_trousers_page]").click();
  });

  it("should navigate to accessories page from picture", () => {
    cy.get("[data-cy=link_accessories_page]").click();
  });
});

describe("Navigation loginpage", () => {
  beforeEach("start page", () => {
    cy.visit("http://localhost:5173/login");
  });

  it("should navigate to home page", () => {
    cy.get("[data-cy=link_homepage_from_login]");
  });

  it("should navigate to login page", () => {
    cy.get("[data-cy=link_loginpage_from_login]");
  });

  it("should navigate to register page", () => {
    cy.get("[data-cy=link_registerpage_from_login]");
  });
});

describe("Navigation registerpage", () => {
  beforeEach("start page", () => {
    cy.visit("http://localhost:5173/register");
  });

  it("should navigate to home page", () => {
    cy.get("[data-cy=link_homepage_from_register]");
  });

  it("should navigate to login page", () => {
    cy.get("[data-cy=link_loginpage_from_register]");
  });

  it("should navigate to register page", () => {
    cy.get("[data-cy=link_registerpage_from_register]");
  });
});
