import express, { Application } from 'express';
import dotenv from 'dotenv';
dotenv.config();

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
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes(): void {
    this.app.use('/task', taskRoutes, checkExpirationData);
  }
}

export default new App().app;
