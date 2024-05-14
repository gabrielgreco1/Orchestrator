import start from "./databaseController/insertStart.js";
import { startAutomation as multas01} from "../../Multas/Multas_01-Validar-dados-Arval/teste.js"
import { startAutomation as multas01_2} from "../../Multas/Multas_01.2-Validar-dados-Arval/teste.js"
import {
  updateSuccess,
  updateError,
} from "./databaseController/updateFinal.js";
import getStatus from "./databaseController/getLastStatus.js";

export default async function getMultasAutomation(req, res) {
  const automationName = req.route.path.replace("/", "");
  const status = await getStatus(automationName);

  if (status == "Em execução") {
    console.log(`A automação '${automationName}' já está em execução`);
    res.status(400).json({
      message: `A automação '${automationName}' já está em execução`,
    });
    return;
  }

  console.log(`Iniciou a automação ${automationName}`);
  const id = await start(automationName);
  if (automationName == 'multas01') {
    multas01()
      .then(() => {
        console.log("Automação finalizada com sucesso");
        updateSuccess(id);
      })
      .catch((err) => {
        const errorDetails = {
          message: err.message,
          stack: err.stack,
        };
        console.error(
          `Erro durante a execução da automação ${automationName}: \n`,
          errorDetails
        );
        updateError(id);
      });
  }
  if (automationName == 'multas01_2') {
    multas01_2()
      .then(() => {
        console.log("Automação finalizada com sucesso");
        updateSuccess(id);
      })
      .catch((err) => {
        const errorDetails = {
          message: err.message,
          stack: err.stack,
        };
        console.error(
          `Erro durante a execução da automação ${automationName}: \n`,
          errorDetails
        );
        updateError(id);
      });
  }

  res.status(200).json({
    status: `Automação ${automationName} executada com sucesso'`,
  });
}
