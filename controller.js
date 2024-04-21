import run_automation from "./rpa/main.js";

export default async function multas_01(req, res) {
  try {
    run_automation(req.query.search);
  } catch (e) {
    console.log("Erro na automação: ", e);
  }
  console.log("Automação executada");

  res.status(200).json({
    status: "Automação executada",
  });
}
