import start from "./databaseController/insertStart.js";
import { startAutomation as multas01 } from "../../Multas/Multas_01-Validar-dados-Arval/teste.js";
import { startAutomation as multas01_2 } from "../../Multas/Multas_01.2-Validar-dados-Arval/teste.js";
import { RunAtomation as multas02 } from "../../Multas/Multas_02-Busca-AIT-originaria-no-DNIT/main.js";
import { updateSuccess, updateError } from "./databaseController/updateFinal.js";
import getStatus from "./databaseController/getLastStatus.js";

const automationFunctions = {
  multas01,
  multas01_2,
  multas02
};

export default async function getMultasAutomation(req, res) {
  const automationName = req.route.path.replace("/", "");
  const status = await getStatus(automationName);

  if (status == "Em execução") {
    console.log(`A automação '${automationName}' já está em execução`);
    res.status(400).json({ message: `A automação '${automationName}' já está em execução` });
    return;
  }


  // Captura o momento de início
  const startTime = new Date()
  const formattedData = startTime.toLocaleString('pt-BR')

  console.log(`Iniciou a automação ${automationName}`);
  const id = await start(automationName, formattedData);
  const automationFunction = automationFunctions[automationName];
  if (automationFunction) {
    automationFunction()
      .then(() => {
        const endTime = new Date(); // Captura o momento de término
        const duration = (endTime - startTime) / 60000; // Calcula a duração em minutos
        console.log("Automação finalizada com sucesso");
        updateSuccess(id, endTime.toISOString(), duration);
      })
      .catch((err) => {
        const endTime = new Date();
        const duration = (endTime - startTime) / 60000;
        const errorDetails = { message: err.message, stack: err.stack };
        console.error(`Erro durante a execução da automação ${automationName}: \n`, errorDetails);
        updateError(id, endTime.toISOString(), duration);
      });
  } else {
    console.error("Automação não encontrada: ", automationName);
    res.status(500).json({
      message: `Automação não encontrada: ${automationName}`
    });
  }

  res.status(200).json({
    status: `Automação ${automationName} executada com sucesso`
  });
}
