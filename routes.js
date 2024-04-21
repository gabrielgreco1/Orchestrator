import express from "express";
import controller from "./controller.js"

const router = express.Router();

router
    .route("/linkedin_scrapper")
    .get(controller);

export default router;
