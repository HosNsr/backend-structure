import express from 'express';
const routes = express.Router();

import Auth from '../middlewares/Auth';
import {
	upload,
	
} from '../controllers/FilesController'


routes.post('/upload/:token',Auth, upload);

export default routes;