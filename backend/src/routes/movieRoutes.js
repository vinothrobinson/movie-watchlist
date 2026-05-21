import express from "express";
import { searchForMovie } from "../controllers/movieController.js";

// Creating the router for the Movie route
const router = express.Router();

router.get("/search", searchForMovie);

export default router;
