describe("Register user", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/register");
    cy.get("[data-cy=register_firstname_input]").type("Tester");
    cy.get("[data-cy=register_lastname_input]").type("TesterLastname");
    cy.get("[data-cy=register_email_input]").type(
      "tester.testerlastname@student.hogent.be"
    );
    cy.get("[data-cy=register_password_input]").type("123456789");
    cy.get("[data-cy=register_street_input]").type("Voskenslaan");
    cy.get("[data-cy=register_number_input]").type("12");
    cy.get("[data-cy=register_postalcode_input]").type("9000");
    cy.get("[data-cy=register_city_input]").type("Ghent");
    cy.get("[data-cy=register_country_input]").type("Belgium");
  });

  it("should register user", () => {
    cy.get("[data-cy=submit_user]").click();
  });

  it("should clear form inputs", () => {
    cy.get("[data-cy=cancel]").click();
  });
});
