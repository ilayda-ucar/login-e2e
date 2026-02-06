describe("Login Form E2E", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5175/");
  });

  it("Başarılı form doldurulunca success sayfasına giderim", () => {
    cy.get('[data-cy="email"]').type("test@example.com");
    cy.get('[data-cy="password"]').type("Strong1!");
    cy.get('[data-cy="terms"]').check();

    cy.get('[data-cy="submit"]').should("not.be.disabled").click();

    cy.url().should("include", "/success");
    cy.contains("Success").should("be.visible");
  });

  it("Email yanlış: 1 hata ve buton disabled", () => {
    cy.get('[data-cy="email"]').type("yanlis-email");
    cy.get('[data-cy="password"]').type("Strong1!");
    cy.get('[data-cy="terms"]').check();

    cy.get('[data-cy="error-item"]').should("have.length", 1);
    cy.get('[data-cy="error-email"]').should("contain", "Geçerli bir email giriniz.");
    cy.get('[data-cy="submit"]').should("be.disabled");
  });

  it("Email ve password yanlış: 2 hata ve buton disabled", () => {
    cy.get('[data-cy="email"]').type("yanlis-email");
    cy.get('[data-cy="password"]').type("123");
    cy.get('[data-cy="terms"]').check();

    cy.get('[data-cy="error-item"]').should("have.length", 2);
    cy.get('[data-cy="submit"]').should("be.disabled");
  });

  it("Email & password doğru ama kurallar kabul edilmedi: buton disabled", () => {
    cy.get('[data-cy="email"]').type("test@example.com");
    cy.get('[data-cy="password"]').type("Strong1!");
    cy.get('[data-cy="submit"]').should("be.disabled");
  });
});
