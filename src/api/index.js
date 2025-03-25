import {getRoute, postRoute, deleteRoute, rateLimitAndTimeout} from './routes.js'

function loadRoutes(app) {
  getRoute(app)
  postRoute(app),
  deleteRoute(app);
}

export {loadRoutes, rateLimitAndTimeout}