import express from "express";
import getMultasAutomation from "../controller/controllerMultas.js";

const routerMultas = express.Router();

routerMultas.route("/multas01").get(getMultasAutomation);
routerMultas.route("/multas01_2").get(getMultasAutomation);

export default routerMultas;
