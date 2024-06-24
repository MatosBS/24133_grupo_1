import { middlewares as routes } from './routes.middlewares.js'
import { middlewares as errors } from './errors.middlewares.js';

export const middlewares = {
  routes,
  errors
};