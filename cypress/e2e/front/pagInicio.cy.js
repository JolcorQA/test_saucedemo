describe('verificacion pagina inciio', () => {
    
    beforeEach(() => {
        cy.login('usuarioValido')
    });

    it('deberia mostrar la cantidad de los productos de incios' , () =>{
        cy.get('[data-test="inventory-item"]').should('have.length', 6) 
    })
    
    it('debería probar todas las opciones del filtro de ordenamiento' , () => {

        // label: Texto exacto que aparece en el dropdown.
        // selector: Identificador interno para distinguir los casos.
        // sorter: Función que determina el criterio de ordenamiento.

        // Opciones de ordenamiento
        const opcionFiltro = [
            { label: 'Name (A to Z)', selector: 'az', sorter: (a, b) => a.localeCompare(b) },
            { label: 'Name (Z to A)', selector: 'za', sorter: (a, b) => b.localeCompare(a) },
            { label: 'Price (low to high)', selector: 'lohi', sorter: (a, b) => a - b },
            { label: 'Price (high to low)', selector: 'hilo', sorter: (a, b) => b - a },
        ]
        
        // Iteración sobre cada opción
        opcionFiltro.forEach( opcion => {
            cy.log(`Probando opción: ${opcion.label}`)
            cy.get('[data-test="product-sort-container"]').select(opcion.label)
            
            let values = []
            
            if (opcion.selector === 'az' || opcion.selector === 'za'){
                cy.get('[data-test="inventory-item-name"]').each(($nombre) => {
                    values.push($nombre.text().trim())
                }).then(() => {
                    const orden = [...values].sort(opcion.sorter) // Ordena usando el criterio de la opción
                    expect(values).to.deep.equal(orden) // Valida que estén correctamente ordenados
                }) 
            } else if ( opcion.selector === 'lohi' || opcion.selector === 'hilo') {
                cy.get('[data-test="inventory-item-price"]').each(($precio) => {
                values.push(parseFloat($precio.text().replace('$', '')))
                }).then (() => {
                    const orden = [...values].sort(opcion.sorter)
                    expect(values).to.deep.equal(orden)
                })
            }
        })
    })

    it('deberia redirigirme a la pagina del detalle del producto haciendo click en el nombre', () => {
        cy.get('[data-test="item-4-title-link"]').click()
        cy.get('[data-test="inventory-item"]').should('have.length', 1)
    })

    it('deberia redirigirme a la pagina del detalle del producto haciendo click en el imagen', () => {
        cy.get('[data-test="item-4-img-link"]').click()
        cy.get('[data-test="inventory-item"]').should('have.length', 1)
    })

    it('deberia redirigirme a la pagina de incio estando en la pagina de detalle del producto', () => {
        cy.get('[data-test="item-4-title-link"]').click()
        cy.get('[data-test="inventory-item"]').should('have.length', 1)

        cy.get('[data-test="back-to-products"]').click()
        cy.get('[data-test="inventory-item"]').should('have.length', 6) 
    })

    it('debería abrir el menú lateral y haciendo click cerrar sesión debera salir de la sesión', () => {
        cy.get('#react-burger-menu-btn').click()
        cy.get('#logout_sidebar_link').click()
        cy.get('[data-test="login-button"]').should('be.visible')
    })
})