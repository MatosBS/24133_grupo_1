import { middlewares as routes } from './routes.middlewares.js';
import { middlewares as errors } from './errors.middlewares.js';
import { middlewares as files } from './files.middlewares.js';

export const middlewares = {
  routes,
  errors,
  files
};