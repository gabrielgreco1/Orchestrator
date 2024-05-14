import express from "express";
import getMultasAutomation from "../controller/controllerMultas.js";

const routerMultas = express.Router();

// Array com os caminhos das rotas
const rotas = [
    "/multas01",
    "/multas01_2",
    "/multas02"
];

// Itera sobre o array de rotas e configura cada uma para usar getMultasAutomation
rotas.forEach(rota => {
    routerMultas.route(rota).get(getMultasAutomation);
});

export default routerMultas;
