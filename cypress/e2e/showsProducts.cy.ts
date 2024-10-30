describe("Shows all products", () => {
  it("Alle hoodies weergeven", () => {
    cy.visit("http://localhost:5173/hoodies");
  });
  it("Alle shirts weergeven", () => {
    cy.visit("http://localhost:5173/shirts");
  });
  it("Alle trousers weergeven", () => {
    cy.visit("http://localhost:5173/trousers");
  });
  it("Alle accessories weergeven", () => {
    cy.visit("http://localhost:5173/accessories");
  });
});
