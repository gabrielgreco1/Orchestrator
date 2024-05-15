import AutomationService from '../services/automationService.js';
import StatusController from "../database/databaseController/statusController.js";


class AutomationController {
  constructor() {
    this.automationService = new AutomationService();
    this.statusController = new StatusController();

  }

  async runAutomation(req, res) {
    try {
      let automationName = req.route.path.replace("/run", "");// Asegure-se de que os parâmetros da rota estão corretos
      automationName = automationName.replace("/", "")
      const result = await this.automationService.runAutomation(automationName);
      res.status(200).json({ message: 'Automação iniciada com sucesso', details: result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  // async runAutomation(req, res) {
  //   let automationName = req.route.path.replace("/run", "");// Asegure-se de que os parâmetros da rota estão corretos
  //   automationName = automationName.replace("/", "")
  //   try {
  //     // Verifica o status da automação antes de iniciar
  //     const status = await this.statusController.getStatus(automationName);
  //     if (status === "Em execução") {
  //       return res.status(400).json({ message: `A automação '${automationName}' já está em execução` });
  //     }

  //     // Chama o serviço para iniciar a automação
  //     const result = await this.automationService.runAutomation(automationName);
  //     res.status(200).json({ message: `Automação ${automationName} iniciada com sucesso`, details: result });
  //   } catch (error) {
  //     res.status(error.statusCode || 500).json({ message: error.message || "Erro interno no servidor" });
  //   }
  // }

  async stopAutomation(req, res) {
    let automationName = req.route.path.replace("/stop", "");// Asegure-se de que os parâmetros da rota estão corretos
    automationName = automationName.replace("/", "")
    try {
      const result = await this.automationService.stopAutomation(automationName);
      res.status(200).json({ message: 'Automação parada com sucesso', details: result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default AutomationController;
