import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createProxyMiddleware } from 'http-proxy-middleware';
import authMiddleware from '../middlewares/authMiddleware.js';
import userRoles from '../utils/userRoles.js';
import Service from './Service.js';
import axios from 'axios'


class ApiGateway {
  constructor(serviceManager) {
    this.app = express();
    this.serviceManager = serviceManager;
    this.configureMiddleware();
    this.configureRoutes();
  }

  configureMiddleware() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(morgan("combined"));
    this.app.disable("x-powered-by");
  }

  configureRoutes() {
    this.app.get('/api/*', authMiddleware(null, null), async (req, res, next) => {
      const userRole = req.userRole;
      const requestedRoute = req.path;
      console.log('REQUEST: ', requestedRoute);

      if (!userRoles[userRole].isAdmin) {
        const allowedEndpoints = userRoles[userRole].allowedEndpoints;
        if (allowedEndpoints.includes(requestedRoute)) {
        //  res.status(200).json({message:'Welcome to api gateway!'})
         next()
        } else {
          res.status(403).json({ message: 'You do not have access to this endpoint' });
        }
      } else {
        try {
            // res.status(200).json({message:'Welcome to api gateway!'})
            next()
          } catch {
            res.status(404).json({ message: 'Route not found' });
          }
      }
    });

    this.app.post('/create/*', authMiddleware(null, null), (req, res) => {
      const { route, target } = req.body;
      const userRole = req.userRole;

      if (!route || !target) {
        return res.status(400).json({ message: 'Route and target are required' });
      }

      if (userRoles[userRole].canCreateRoutes) {
        const service = new Service(route, target);
       const createRoute =  this.serviceManager.addService(service);
       if(createRoute){
         this.app.use(route, createProxyMiddleware({ target, changeOrigin: true }));
         res.status(201).json({ message: 'Service added successfully' });
       }
       res.status(401).json("You trying to create a route that already exist or has a forbidden route name")
      } else {
        res.status(403).json({ message: 'Forbidden: Your current User do not have permission to create routes' });
      }
    });

    this.app.put('/update/*', authMiddleware(null, null), (req, res) => {
      const { route, newRoute, newTarget } = req.body;
      const userRole = req.userRole;

      if (!route || !newRoute || !newTarget) {
        return res.status(400).json({ message: 'Route, target, newRoute, and newTarget are required' });
      }

      if (userRoles[userRole].canUpdateRoutes) {
        try {
          this.serviceManager.updateService(route, newRoute, newTarget);
          res.status(200).json({ message: 'Service updated successfully' });
        } catch (error) {
          res.status(500).json({ message: 'Error updating service' });
        }
      } else {
        res.status(403).json({ message: 'Forbidden: Your current User do not have permission to update routes' });
      }
    });

    this.app.delete('/delete', authMiddleware(null, null), (req, res) => {
      const { route } = req.body;
      const userRole = req.userRole;

      if (!route) {
        return res.status(400).json({ message: 'Route is required' });
      }

      if (userRoles[userRole].canDeleteRoutes) {
        this.serviceManager.deleteService(route);
        res.status(200).json({ message: 'Service deleted successfully' });
      } else {
        res.status(403).json({ message: 'Forbidden: Your current User do not have permission to delete routes' });
      }
    });

    this.app.get('/list', authMiddleware(null, null), (req,res) => {
      return res.json(this.serviceManager.loadServices())
    })
  }

  start(port) {
    this.app.listen(port, () => {
      console.log(`API Gateway running on port ${port}`);
    });
  }
}

export default ApiGateway;