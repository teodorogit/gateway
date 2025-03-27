import { createProxyMiddleware } from "http-proxy-middleware";
import userRoles from '../utils/userRoles.js';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()


function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token === null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
      req.user = user
      next()
  })
}

const authMiddleware = (route) => {
  return (req, res, next) => {
    authenticateToken(req, res, () => {
      const userRole = req.headers['user-role'];

      const proxyOptions = {
        target: 'http://127.0.0.1:',
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
    });
  };
};

export default authMiddleware;