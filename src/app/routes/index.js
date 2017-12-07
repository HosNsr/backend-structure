import express from 'express';
const routes = express.Router();

import users from './users';
import files from './files';

/**
 * You can register all of the application routes here
 */

routes.use('/users', users);
routes.use('/files', files);

export default routes;