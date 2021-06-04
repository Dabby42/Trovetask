import cookieParser from 'cookie-parser';
import errorHandler from './middleware/errorHandler';
import bodyParser from 'body-parser';
import connectDB from './config/dbconnection';
import express from 'express';
import { config as _config } from 'dotenv';
import cors from 'cors';
import Routes from './routes/index'
const app          = express();

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

app.listen(process.env.PORT, function () {
  console.info('Server listening on port: ' + process.env.PORT)
});

