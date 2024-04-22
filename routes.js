import express from "express";
import linkedin_scrapper from "./controller_linkedin.js"

const router = express.Router();

router
    .route("/linkedin_scrapper")
    .get(linkedin_scrapper);

export default router;
