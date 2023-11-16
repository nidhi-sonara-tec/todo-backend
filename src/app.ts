import { limiter } from '@middlewares/limiter';
import compression from 'compression';
 
import express from 'express';
import helmet from 'helmet';

import { connectToDatabase } from './connection';

import tasksRoutes from './routes/tasks';

require('dotenv').config();
const cors = require('cors');

connectToDatabase();

const app = express();

//const tasksRoutes = require('routes/tasks');

app.use(express.urlencoded({ extended: true }));
app.use(helmet(), compression(), limiter, express.json());

// Use CORS middleware with specific options
app.use(cors({
  origin: 'http://192.168.137.1:3000', // Allow requests from this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
  credentials: true, // Allow sending credentials (cookies, etc.) with the request
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
}));

app.use('/tasks',tasksRoutes);
 
// module.exports =  app;
export default app;