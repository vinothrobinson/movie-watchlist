import axios from "axios";
import { prisma } from "../config/db.js";

const searchForMovie = async (req, res) => {
  try {
    const query = req.query.q; // Takes in query search parameter to search the API

    if (!query) {
      return res.status(400).json({
        error: "Search query is required",
      });
    }

    // Searches for the movie
    const response = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
          query: query,
        },
      }
    );

    res.status(201).json({
      status: "Success",
      data: response.data.results,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch movies",
    });
  }
};

export { searchForMovie };
