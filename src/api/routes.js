import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import userRoles from '../utils/userRoles.js';
import { createProxyMiddleware } from 'http-proxy-middleware';
import authMiddleware from '../../src/middlewares/authMiddleware.js';


const rateLimit = 20; 
const interval = 60 * 1000; // Time window in milliseconds (1 minute)
const requestCounts = {};


setInterval(() => {
  Object.keys(requestCounts).forEach((ip) => {
    requestCounts[ip] = 0;
  });
}, interval);

function rateLimitAndTimeout(req, res, next) {
  const ip = req.ip;
  requestCounts[ip] = (requestCounts[ip] || 0) + 1;

  if (requestCounts[ip] > rateLimit) {
    return res.status(429).json({
      code: 429,
      status: "Error",
      message: "Rate limit exceeded.",
      data: null,
    });
  }

  req.setTimeout(15000, () => {
    res.status(504).json({
      code: 504,
      status: "Error",
      message: "Gateway timeout.",
      data: null,
    });
    req.abort();
  });

  next();
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const servicesPath = path.join(__dirname, 'services.json');
let services = JSON.parse(fs.readFileSync(servicesPath, 'utf-8'));

const postRoute = (app) => {
  app.post('/create', authMiddleware(null, null), (req, res) => {
    const { route, target } = req.body;
    const userRole = req.userRole;
  
    if (!route || !target) {
      return res.status(400).json({ message: 'Route and target are required' });
    }
  
    if (userRoles[userRole].canCreateRoutes) {
      services.push({ route, target });
      fs.writeFileSync(servicesPath, JSON.stringify(services, null, 2));
      if (target) {
        app.use(route, rateLimitAndTimeout, authMiddleware(target, route), createProxyMiddleware({ target, changeOrigin: true }));
        res.status(201).json({ message: 'Service added successfully' });
      } else {
        res.status(400).json({ message: 'Invalid target' });
      }
    } else {
      res.status(403).json({ message: 'Forbidden: Your current User do not have permission to create routes' });
    }
  });
 } 

 const deleteRoute = (app) => {
  app.delete('/delete', authMiddleware(null, null), (req, res) => {
    const {route} = req.body;
    const userRole = req.userRole;

    if(!route) {
      return res.status(400).json({message: 'Route is required to use this method'})
    }

    if(userRoles[userRole].canDeleteRoutes) {
      services = services.filter(services =>  services.route != route);
      fs.writeFileSync(servicesPath, JSON.stringify(services, null, 2));
      res.status(200).json({ message: 'Service deleted successfully' });
    } else {
      res.status(403).json({ message: 'Forbidden: Your current User do not have permission to delete routes' });
    }
  });
}

export {postRoute, deleteRoute, rateLimitAndTimeout};