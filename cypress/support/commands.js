
Cypress.Commands.add('login', (tipoUsuario) => {
   cy.fixture('usuario').then((data) => {
       const usuario = data[tipoUsuario]
       cy.get('[data-test="username"]').type(usuario.username);
       cy.get('[data-test="password"]').type(usuario.password);
       cy.get('[data-test="login-button"]').click();
   });
});

 Cypress.Commands.add('inforCompra', (tipoUsuario) => {
   cy.fixture('inforCompra').then((data) => {
      const usuario = data[tipoUsuario]
      cy.get('[data-test="firstName"]').type(usuario.firstName)
      cy.get('[data-test="lastName"]').type(usuario.lastName)
      cy.get('[data-test="postalCode"]').type(usuario.codePostal)
   })
 })

 Cypress.Commands.add('agregaProducto', (producto) => {
    cy.get(`[data-test="add-to-cart-${producto}"]`).click()
 })

 Cypress.Commands.add('eliminarProducto', (producto) => {
    cy.get(`[data-test="remove-${producto}"]`).click()
 })

 Cypress.Commands.add('realizaCompra', (producto, inforUsuario) => {
   cy.agregaProducto(producto)
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="checkout"]').click()
        cy.inforCompra(inforUsuario)
        cy.get('[data-test="continue"]').click()
 })