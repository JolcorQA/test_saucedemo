describe('verificacion login', () => {

    it('validadndo pagina', () => {
        cy.get('.login_logo').should('be.visible')
        cy.title().should('include', 'Swag Labs')
    })
    
    it('deberia iniciar sesion correctamente', () => {
        cy.login('usuarioValido')
        cy.get('[data-test="title"]').should('be.visible')
        cy.url().should('contain', '/inventory.html');
    })

    it('deberia enviarme un mensaje de error: El nombre de usuario y la contraseña no coinciden con ningún usuario en este servicio', () => {
        cy.login('usuarioInvalido')
        cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain', 'Username and password do not match any user in this service');
    })

    it('deberia enviarme un mensaje de error: Se requiere el nombre de usuario', () => {
       cy.get('[data-test="login-button"]').click();
        cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain', 'Username is required')
    })

    it('deberia enviarme un mensaje de error: Se requiere contraseña', () => {
        cy.get('[data-test="username"]').type('asiudhsiudh')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain', 'Password is required')
    })
})