// app.js
import express from 'express';
import Router from '../route/routesMultas.js';

class App {
  constructor() {
    this.app = express();
    this.setupRouters();
  }

  setupRouters() {
    const routerMultas = new Router();
    this.app.use('/automation/multas', routerMultas.getRouter());
  }

  listen(port) {
    this.app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
}

export default App;
