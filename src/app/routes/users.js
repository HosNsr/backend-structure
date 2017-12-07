import express from 'express';
const routes = express.Router();

import Auth from '../middlewares/Auth';
import {
	getUsers,
	getUserById,
	saveUser,
	login,
	deleteUserById,
	status,
	updateUser,
	getCurrentLoggedInUser,
	addToFavorites,
	search,
	history
} from '../controllers/UsersController'
 

routes.post('/',Auth, getUsers);
routes.post('/find', getUserById);
routes.post('/create', saveUser);
routes.post('/login', login);
routes.post('/delete',Auth, deleteUserById);
routes.post('/status', status);
routes.post('/update', updateUser);
routes.post('/me', getCurrentLoggedInUser);
routes.post('/favorite', addToFavorites);
routes.post('/search',Auth, search);
routes.post('/history',Auth,history)
// routes.post('/image/upload', uploadImage);

export default routes;