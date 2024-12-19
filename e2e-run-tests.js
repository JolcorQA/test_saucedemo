// e2e-run-tests.js
const cypress = require('cypress')

cypress.run({
  reporter: 'junit', // Especifica el reportero JUnit para la salida del reporte
  browser: 'chrome', // El navegador donde se ejecutarán las pruebas
  config: {
    baseUrl: 'https://www.saucedemo.com', // La URL base para la aplicación
  },
  env: {
    login_url: '/login', // URL para el login (usada en las pruebas)
    products_url: '/products', // URL para los productos (usada en las pruebas)
  },
})
