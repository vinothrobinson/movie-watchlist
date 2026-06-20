import express from "express";
import { searchForMovie, viewMovie } from "../controllers/movieController.js";

// Creating the router for the Movie route
const router = express.Router();

router.get("/search", searchForMovie);

router.get("/:tmdbId", viewMovie);

export default router;
