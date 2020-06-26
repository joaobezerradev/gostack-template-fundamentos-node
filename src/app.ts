import express, { Application } from 'express';

import Routes from './routes';

class App {
  public server: Application;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(Routes);
  }
}
export default new App().server;
