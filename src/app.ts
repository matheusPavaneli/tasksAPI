import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
dotenv.config();


import corsConfig from './config/corsConfig';
import taskRoutes from './routes/taskRoutes';
import checkExpirationData from './middlewares/checkExpirationData';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }
  
  middlewares(): void {
    this.app.use(cors(corsConfig))
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(helmet());
  }
  
  routes(): void {
    this.app.use('/task', taskRoutes, checkExpirationData);
  }
}

export default new App().app;
