describe("Update user", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
    cy.login("maxim.lison@student.hogent.be", "123456789");
    cy.get("[data-cy=user]").click();
    cy.get("[data-cy=headerlink_profilepage]").click();
  });

  it("should update firstname", () => {
    cy.get("[data-cy=firstname_input]").clear();
    cy.get("[data-cy=firstname_input]").type("Nieuwe firstname");
    cy.get("[data-cy=update_user]").click();
  });

  it("should update lastname", () => {
    cy.get("[data-cy=lastname_input]").clear();
    cy.get("[data-cy=lastname_input]").type("Nieuwe lastname");
    cy.get("[data-cy=update_user]").click();
  });

  it("should update street", () => {
    cy.get("[data-cy=street_input]").clear();
    cy.get("[data-cy=street_input]").type("Nieuwe straat");
    cy.get("[data-cy=update_user]").click();
  });

  it("should update postalcode", () => {
    cy.get("[data-cy=postalcode_input]").clear();
    cy.get("[data-cy=postalcode_input]").type("1234");
    cy.get("[data-cy=update_user]").click();
  });

  it("should update city", () => {
    cy.get("[data-cy=city_input]").clear();
    cy.get("[data-cy=city_input]").type("Amsterdam");
    cy.get("[data-cy=update_user]").click();
  });

  it("should update country", () => {
    cy.get("[data-cy=country_input]").clear();
    cy.get("[data-cy=country_input]").type("Nederland");
    cy.get("[data-cy=update_user]").click();
  });
});
