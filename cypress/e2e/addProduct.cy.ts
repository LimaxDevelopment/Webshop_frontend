describe("Add product", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
    cy.login("maxim.lison@student.hogent.be", "123456789");
    cy.get("[data-cy=headerlink_Add_Item_page]").click();
  });

  it("should add product", () => {
    cy.get("[data-cy=person_check]").check("Men");
    cy.get("[data-cy=type_check]").check("Trousers");
    cy.get("[data-cy=picture_input]").selectFile("src/images/Broek.png");
    cy.get("[data-cy=brand_input]").type("Gymshark");
    cy.get("[data-cy=productName_input]").type("Jogging");
    cy.get("[data-cy=color_select]").select("BLUE");
    cy.get("[data-cy=size_select]").select("XS");
    cy.get("[data-cy=price_input]").type("23.95");

    cy.get("[data-cy=submit_product]").click();
  });

  it("should clear form inputs", () => {
    cy.get("[data-cy=person_check]").check("Men");
    cy.get("[data-cy=type_check]").check("Trousers");
    cy.get("[data-cy=picture_input]").selectFile("src/images/Broek.png");
    cy.get("[data-cy=brand_input]").type("Gymshark");
    cy.get("[data-cy=productName_input]").type("Jogging");
    cy.get("[data-cy=color_select]").select("BLUE");
    cy.get("[data-cy=size_select]").select("XS");
    cy.get("[data-cy=price_input]").type("23.95");

    cy.get("[data-cy=cancel_submit]").click();
  });

  it("should show the error message for an invalid price", () => {
    cy.get("[data-cy=person_check]").check("Men");
    cy.get("[data-cy=type_check]").check("Trousers");
    cy.get("[data-cy=picture_input]").selectFile("src/images/Broek.png");
    cy.get("[data-cy=brand_input]").type("Gymshark");
    cy.get("[data-cy=productName_input]").type("Jogging");
    cy.get("[data-cy=color_select]").select("BLUE");
    cy.get("[data-cy=size_select]").select("XS");
    cy.get("[data-cy=price_input]").type("-1");
    cy.get("[data-cy=submit_product]").click();

    cy.get("[data-cy=price_input_error]").contains("min price of 1");
  });
});
