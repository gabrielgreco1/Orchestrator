import express from "express";
import getAutomation from "../controller/controller.js";

const router = express.Router();

router.route("/linkedin_scrapper").get(getAutomation);

export default router;
