import { createProxyMiddleware } from "http-proxy-middleware";
import userRoles from '../utils/userRoles.js';

const authMiddleware = (route) => {
  return (req, res, next) => {
    const token = req.headers['authorization'];
    const userRole = req.headers['user-role'];

    const proxyOptions = {
      target:'http://127.0.0.1',
      changeOrigin: true,
      pathRewrite: {
        [`^${route}`]: ""
      },
      onProxyReq: (proxyReq, req, res) => {
        // Manipule a requisição do proxy se necessário
      },
      onProxyRes: (proxyRes, req, res) => {
        // Manipule a resposta do proxy se necessário
      },
      onError: (err, req, res) => {
        res.status(500).json({ message: 'Proxy error', error: err.message });
      }
    };

    const proxy = createProxyMiddleware(proxyOptions);

    if (token) {
      if (token === 'validation-token') {
        if (userRoles[userRole]) {
          if (userRoles[userRole].canCreateRoutes) {
            req.userRole = userRole;
            next();
          } else {
            res.status(403).json({ message: 'Forbidden: You do not have access to this endpoint' });
          }
        } else {
          res.status(403).json({ message: 'Forbidden: Invalid user role, verify if your user has the correct access to this route' });
        }
      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
    } else {
      res.status(401).json({ message: 'No valid token was provided' });
    }
  };
};


export default authMiddleware;