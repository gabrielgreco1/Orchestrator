import { startAutomation as multas01 } from "../../../Multas/Multas_01-Validar-dados-Arval/teste.js";
import StatusController from "../database/databaseController/statusController.js";
import ExecutionController from "../database/databaseController/executionController.js";
import formatDate from "../utils/formatDate.js";

class AutomationService {
  constructor() {
    this.statusController = new StatusController();
    this.executionController = new ExecutionController();
    this.runningAutomations = new Map(); // Armazena automações ativas
    this.automationFunctions = {
      multas01
    };
  }

  async runAutomation(automationName) {
    const status = await this.statusController.getStatus(automationName);
    if (status === "Em execução") {
      throw { statusCode: 400, message: `A automação '${automationName}' já está em execução` };
    }

    const startTime = new Date();
    const formattedDate = formatDate(startTime);
    const id = await this.executionController.start(automationName, formattedDate);

    const automationFunction = this.automationFunctions[automationName];
    if (!automationFunction) {
      throw { statusCode: 404, message: "Automação não encontrada" };
    }

    if (automationFunction) {
      automationFunction()
        .then(() => {
          const endTime = new Date(); // Captura o momento de término
          const duration = (endTime - startTime) / 60000; // Calcula a duração em minutos
          console.log("Automação finalizada com sucesso");
          this.executionController.updateSuccess(id, endTime.toISOString(), duration);
        })
        .catch((err) => {
          const endTime = new Date();
          const duration = (endTime - startTime) / 60000;
          const errorDetails = { message: err.message, stack: err.stack };
          console.error(`Erro durante a execução da automação ${automationName}: \n`, errorDetails);
          this.executionController.updateError(id, endTime.toISOString(), duration);
        });
    } else {
      console.error("Automação não encontrada: ", automationName);
      res.status(500).json({
        message: `Automação não encontrada: ${automationName}`
      });
    }
  }
  // async stopAutomation(automationName) {
  //   console.log('Running: ', this.runningAutomations)
  //   const process = this.runningAutomations.get(automationName);
  //   if (process) {
  //     process.terminate();  // Método fictício, depende da implementação de como terminar o processo
  //     this.runningAutomations.delete(automationName);
  //   } else {
  //     throw new Error(`Automação ${automationName} não está em execução`);
  //   }
  // }
}

export default AutomationService;
