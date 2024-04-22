import run_automation from "./rpa/main.js";

export default async function linkedin_scrapper(req, res) {
  try {
    run_automation(req.query.search);
  } catch (e) {
    console.log(`Erro executar automação linkedin_scrapper `, e);
  }
  console.log("Automação executada");

  res.status(200).json({
    status: "Automação executada",
  });
}
