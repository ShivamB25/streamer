import express, { Request, Response, NextFunction } from 'express';
import { initializeCacheManager } from './components/cacheManager';
import './preloadEnvironment'; // This ensures environment variables are loaded first
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './utilities/apiDocs';

const app = express();
const PORT = process.env.PORT || 3000; // INPUT_REQUIRED {Set the environment variable PORT to configure the server port}

// Ensure the preloadEnvironment import is the first operation to load environment variables before any other operations
console.log('Environment variables should now be loaded.');

app.get('/ping', (req: Request, res: Response) => {
  console.log('Received a request on /ping');
  res.status(200).send('Service is alive');
});

// Initialize the Cache Manager
initializeCacheManager();

// Use the routes defined in routes.ts
app.use('/api', routes);

// Setup Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
console.log('Swagger UI is set up at /api-docs');

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('An error occurred:', err.message, err.stack);
  res.status(500).send('Something broke!');
});