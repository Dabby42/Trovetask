import cookieParser from 'cookie-parser';
import errorHandler from './middleware/errorHandler';
import bodyParser from 'body-parser';
import connectDB from './config/dbconnection';
import helpers from './helpers/helper';
import express from 'express';
import { config as _config } from 'dotenv';
import { listenPort } from './config';
import cors from 'cors';
import Routes from './routes/index'
const app          = express();
const http = require('http');

_config();
app.use(cors());

//Connect to database
connectDB();

//Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Cookie parser
app.use(cookieParser());

//Mount routers
Routes(app);
 
app.use(errorHandler);

helpers.socket(http.createServer(app));

app.listen(listenPort.express, function () {
  console.info('Server listening on port: ' + listenPort.express)
});

