import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
var path = require('path');
import './config/env';
import './config/database';
import routes from './app/routes';
import CORS from './app/middlewares/CORS';
import ResponseTransformer from './app/middlewares/ResponseTransformer';

const app = express();

// Middlewares
if(__DEV__) {
  app.use(logger('dev'));
}
app.use(bodyParser.json());
app.use(CORS);
app.use(ResponseTransformer);

// Routes
routes.get('/', (req, res) => res.json({message: 'InsMusic API'}));
app.use('/api', routes);
app.use(express.static(path.join(__dirname, '../public')));

const port = process.env.PORT || 3000;

app.listen(port, (err) => {
  if (err) {
    console.error(err)
  }

  if (__DEV__) {
    console.log('> in development')
  }

  console.log(`> listening on port ${port}`)
});