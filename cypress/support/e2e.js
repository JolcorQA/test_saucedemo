// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import './backend-commands'

// Configuración global de Cypress, si es necesario
Cypress.on('uncaught:exception', (err, runnable) => {
    // Prevenir que errores inesperados rompan las pruebas
    console.error('Error no capturado:', err);
    return false; // Devuelve false para evitar que Cypress falle por este error
});

// Hooks globales (si necesitas configurar algo para cada prueba)
beforeEach(() => {
    // Ejemplo: limpiar datos de sesión o cookies antes de cada prueba
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('/')
});

// Alternatively you can use CommonJS syntax:
// require('./commands')