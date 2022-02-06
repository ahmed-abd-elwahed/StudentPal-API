const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
openapi: '3.0.0',
info: {
    title: "Drawing Application API", // short title.
    description: "A Drawing Application API", //  desc.
    version: "1.0.0",
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    }, 
    contact: {
      name: "Abdalrashid Saeed", // your name
      email: "fwglory5@gmail.com", // your email
      url: "https://www.shido.dev", // your website
    },
  },
  servers: [
    {
      url: 'http://localhost:3003',
      description: 'Development server',
    },
  ]
}

const options = {
swaggerDefinition,
// Paths to files containing OpenAPI deinitions
apis: ['./controllers/*.js'],
}

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec