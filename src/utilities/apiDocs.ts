import swaggerJSDoc from 'swagger-jsdoc';

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Streamer API Documentation',
    version: '1.0.0',
    description: 'This is a REST API application made with Express. It retrieves data from Google Drive and streams it to clients.',
  },
  // Base path for endpoints
  servers: [
    {
      url: 'http://localhost:3000/api', // INPUT_REQUIRED {Set the correct server URL}
      description: 'Local server',
    },
  ],
};

// Options for the swagger docs
const options = {
  // Import swaggerDefinitions
  swaggerDefinition,
  // Path to the API docs
  apis: ['./src/routes.ts'],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;