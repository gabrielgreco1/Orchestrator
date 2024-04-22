import run_automation from "./rpa/main.js";
import write_start from "./utils/writeDB.js";
import updateData from "./database/update.js";

export default async function linkedin_scrapper(req, res) {
  let id;
  try {
    console.log("Iniciou a automação com a query: ", req.query.search);
    id = await write_start("Linkedin scrapper");
    run_automation(req.query.search).then(() => {
      updateData(id, "Finalizado");
    });
  } catch (e) {
    console.log(`Erro executar automação linkedin_scrapper `, e);
  }
  console.log("Automação executada");

  res.status(200).json({
    status: `Automação executada com a query ${req.query.search}`,
  });
}
