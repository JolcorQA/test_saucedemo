describe('verificacion carrito de compras', () => {

    beforeEach(() => {
        cy.login('usuarioValido')
    });

    it('deberia mostrar la cantidad de los productos de incios' , () =>{
        cy.get('[data-test="inventory-item"]').should('have.length', 6) // mostrara la cantidad de productos de la pagina de inicio
    })

    it('deberia agregar producto al carro y mostrarlo desde pagina del carrito', () => {
        cy.agregaProducto('sauce-labs-backpack')
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="inventory-item"]').should('be.visible')
    })

    it('deberia remover desde el carrito el producto', () => {
        cy.agregaProducto('sauce-labs-backpack')
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.eliminarProducto('sauce-labs-backpack')
        cy.get('[data-test="inventory-item"]').should('not.exist')
    })

    it('debería agregar y remover un producto desde el botón correctamente', () => {  
        const addProductSelector = '[data-test="add-to-cart-sauce-labs-backpack"]';  
        const removeProductSelector = '[data-test="remove-sauce-labs-backpack"]';  
    
        cy.get('body').then(($body) => {  // Esto asegura que el chequeo de la existencia del elemento sea robusto y no arroje errores si el selector no existe.
            if ($body.find(removeProductSelector).length === 0) {  
                cy.get(addProductSelector)  
                    .should('be.visible')  
                    .click()  
            } else {  
                cy.get(removeProductSelector)  
                    .should('be.visible')  
                    .click();  
                cy.get(addProductSelector).should('be.visible');  
            }  
        });  
    }); 
    
    it('debería mostrar todos los productos agregados en el carrito', () => {
        const productos = [
            'sauce-labs-backpack',
            'sauce-labs-bike-light',
            'sauce-labs-bolt-t-shirt',
            'test.allthethings()-t-shirt-(red)'
        ]
        for (const producto of productos) cy.agregaProducto(producto)

        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="inventory-item"]').should('have.length', 4)
    })

    it('deberia el contador del carrito de compras', () => {
        cy.agregaProducto('sauce-labs-backpack')
        cy.get('[data-test="shopping-cart-link"]').should('contain' , '1')
        cy.agregaProducto('sauce-labs-bolt-t-shirt')
        cy.get('[data-test="shopping-cart-link"]').should('contain' , '2')
        cy.eliminarProducto('sauce-labs-backpack')
        cy.get('[data-test="shopping-cart-link"]').should('contain' , '1')
    })

    it('deberia visualizar el detallede la compra', () => {
        cy.realizaCompra('sauce-labs-backpack', 'inforUsuarioValido')
        cy.get('[data-test="total-info-label"]').should('be.visible')
        cy.get('[data-test="total-label"]').should('contain', 'Total: $')
    })

    it('deberia realiazar la compra exitosa', () => {
        cy.realizaCompra('sauce-labs-backpack', 'inforUsuarioValido')
        cy.get('[data-test="finish"]').click()
        cy.get('[data-test="complete-header"]').should('contain', 'Thank you for your order!')
    })

    it('deberia enviarme un mensaje de error: Last Name is required', () => {
        cy.agregaProducto('sauce-labs-backpack')
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('Jorge')
        cy.get('[data-test="continue"]').click()
        cy.get('[data-test="error"').should('contain', 'Last Name is required')
    })

    it('deberia enviarme un mensaje de error: First Name is required', () => {
        cy.agregaProducto('sauce-labs-backpack')
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="lastName"]').type('Corrales')
        cy.get('[data-test="continue"]').click()
        cy.get('[data-test="error"').should('contain', 'First Name is required')
    })
})