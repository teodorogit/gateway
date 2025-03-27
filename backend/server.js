import path from 'path';
import { fileURLToPath } from 'url';
import { ServiceManager, ApiGateway } from './src/api/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const servicesPath = path.join(__dirname, 'services.json');
const serviceManager = new ServiceManager(servicesPath);
const apiGateway = new ApiGateway(serviceManager);

apiGateway.start(3001); 