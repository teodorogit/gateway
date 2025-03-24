import {postRoute, deleteRoute, rateLimitAndTimeout} from './routes.js'

function loadRoutes(app) {
  postRoute(app),
  deleteRoute(app);
  rateLimitAndTimeout
}

export default loadRoutes;