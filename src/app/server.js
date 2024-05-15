// server.js
import App from './app.js';

class Server {
  constructor(port) {
    this.port = port;
    this.app = new App();
    this.addNotFoundMiddleware();
    this.addErrorHandler();
  }

  // Middleware para validação se a automação está em execução

  // Middleware para rotas não encontradas
  addNotFoundMiddleware() {
    this.app.app.all('*', (req, res, next) => {
      const automation = req.originalUrl.split('/')[3]; // Ajuste conforme a estrutura da URL
      res.status(404).json({
        status: 'fail',
        message: `Não foi possível encontrar a automação ${automation} neste server`
      });
    next()
    });
  }

  // Middleware para tratamento de erros gerais
  addErrorHandler() {
    this.app.app.use((err, req, res, next) => {
      console.error('Erro inesperado: ', err);
      res.status(500).json({
        status: 'error',
        message: 'Ocorreu um erro inesperado no servidor'
      });
    next()
    });
  }

  start() {
    this.app.listen(this.port);
  }
}

const port = 5000;
const server = new Server(port);
server.start();
