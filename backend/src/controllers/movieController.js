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

const viewMovie = async (req, res) => {
  const { tmdbId } = req.params;

  try {
    let movie = await prisma.movie.findUnique({
      where: {
        tmdbId: Number(tmdbId),
      },
    });

    if (!movie) {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${tmdbId}`,
        {
          params: {
            api_key: process.env.TMDB_API_KEY,
          },
        }
      );

      return res.status(200).json({
        status: "Success",
        data: response.data,
      });
    }

    res.status(200).json({
      status: "Success",
      data: movie,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to retrieve movie",
    });
  }
};

export { searchForMovie, viewMovie };
