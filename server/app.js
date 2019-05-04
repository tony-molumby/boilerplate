import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//used for serving the static react build files without having a seperate server
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
  //
  app.get('*', (req, res) => {
    res.sendFile('build/index.html');
  })
}

//routes
app.use('/api', routes);

export default app;


