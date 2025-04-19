
// // export const swaggerSpec = swaggerJSDoc(options);
// import swaggerJsdoc from 'swagger-jsdoc';
// import swaggerUi from 'swagger-ui-express';
// import { Express } from 'express';
// import YAML from 'yamljs';
// import path from 'path';

// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Job Portal API',
//       version: '1.0.0',
//       description: 'API for a job portal with user, admin, and superadmin roles',
//     },
//     servers: [
//       {
//         url: 'http://localhost:5000',
//         description: 'Development server',
//       },
//     ],
//     components: {
//       securitySchemes: {
//         bearerAuth: {
//           type: 'http',
//           scheme: 'bearer',
//           bearerFormat: 'JWT',
//         },
//       },
//     },
//     security: [{ bearerAuth: [] }],
//   },
//   apis: ['./src/docs/swagger.yaml'], // Scan route files for JSDoc comments
// };

// const swaggerSpec = swaggerJsdoc(options);

// export const setupSwagger = (app: Express): void => {
//   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// };

// export default swaggerSpec;
import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

// Load individual Swagger YAML files
const userSpec = YAML.load(path.join(__dirname, '../docs/user.yaml'));
const adminSpec = YAML.load(path.join(__dirname, '../docs/admin.yaml'));
const superadminSpec = YAML.load(path.join(__dirname, '../docs/superadmin.yaml'));

// Combine specifications
const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Job Portal API',
    version: '1.0.0',
    description: 'API for a job portal with user, admin, and superadmin roles',
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  paths: {
    ...userSpec.paths,
    ...adminSpec.paths,
    ...superadminSpec.paths,
  },
};

export default swaggerSpec;

export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};