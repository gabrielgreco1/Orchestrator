// Router.js
import express from "express";
import AutomationController from "../controller/automationController.js";

class Router {
  constructor() {
    this.router = express.Router();
    this.automationController = new AutomationController();
    this.configureRoutes();
  }

  configureRoutes() {
    const automations = [
      "multas01",
      "multas01_2",
      "multas02"
    ];

    // automations.forEach(route => {
    //   this.router.route(route).get((req, res) => this.automationController.runAutomation(req, res));
    // });
    // automations.forEach(automation => {
    //   this.router.route(`${automation}/run`).get((req, res) => {
    //     this.automationController.runAutomation(req, res)
    //   });
    // })
    automations.forEach(automation => {
      // Rota para iniciar a automação
      this.router.get(`/${automation}/run`, (req, res) => {
        this.automationController.runAutomation(req, res);
      });
  
      // Rota para parar a automação
      this.router.get(`/${automation}/stop`, (req, res) => {
        this.automationController.stopAutomation(req, res);
      });
    });
    }

  getRouter() {
    return this.router;
  }
}

export default Router;

