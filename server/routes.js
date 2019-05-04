import app from './app';
import express from 'express';

//Controller Imports
import basicController from './controllers/basicController';

const routes = express();

routes.post('/search', basicController.post);

export default routes;