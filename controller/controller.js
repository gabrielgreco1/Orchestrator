import run_automation from "../rpa/main.js";
import start_automation from "../rpa/teste.js";
import start from "./databaseController/insertStart.js";
import {
  updateSuccess,
  updateError,
} from "./databaseController/updateFinal.js";
import getStatus from "./databaseController/getLastStatus.js";

export default async function getAutomation(req, res) {
  const automationName = req.route.path.replace("/", "")
  const status = await getStatus(automationName);

  console.log(status)
  if (status == "Em execução") {
    console.log(
      `A automação '${automationName}' já está em execução`
    );
    res.status(400).json({
      message: `A automação '${automationName}' já está em execução`,
    });
    return;
  }

  console.log(`Iniciou a automação`);
  const id = await start(automationName);

  run_automation()
    .then(() => {
      console.log("Automação finalizada com sucesso");
      updateSuccess(id);
    })
    .catch((err) => {
      const errorDetails = {
        message: err.message,
        stack: err.stack,
      };
      console.error("ERRO AO EXECUTAR: ", errorDetails);
      updateError(id);
    });

  res.status(200).json({
    status: `Automação ${automationName} executada com sucesso'`,
  });
}
