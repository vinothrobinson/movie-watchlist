import { prisma } from "../config/db.js";
import axios from "axios";

const addToWatchlist = async (req, res) => {
  const { tmdbId, status, rating, notes } = req.body;
  // Verify movie exists
  const movie = await prisma.movie.findUnique({
    where: { tmdbId: tmdbId },
  });

  // If movie does not exist, fetch from TMDB
  if (!movie) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${tmdbId}`,
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
        },
      }
    );

    const data = response.data;

    // Store movie in database
    movie = await prisma.movie.create({
      data: {
        tmdbId: data.id,
        title: data.title,
        overview: data.overview,
        releaseDate: data.release_date ? new Date(data.release_date) : null,
        runtime: data.runtime,
        posterUrl: data.poster_path
          ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
          : null,
        genres: data.genres.map((genre) => genre.name),
      },
    });
  }

  // Check if movie already exists in watchlist
  const existingInWatchList = await prisma.watchlistItem.findUnique({
    where: {
      userId_movieId: {
        userId: req.user.id,
        movieId: movie.id,
      },
    },
  });

  if (existingInWatchList) {
    return res.status(400).json({ error: "Movie already in watchlist" });
  }

  const watchlistItem = await prisma.watchlistItem.create({
    data: {
      userId: req.user.id,
      movieId: movie.id,
      status: status || "PLANNED",
      rating,
      notes,
    },
  });

  res.status(201).json({
    status: "Success",
    data: {
      watchlistItem,
    },
  });
};

const removeFromWatchlist = async (req, res) => {
  // Find watchlist item and verify ownership
  const watchlistItem = await prisma.watchlistItem.findUnique({
    where: { id: req.params.id },
  });

  if (!watchlistItem) {
    return res.status(404).json({
      error: "Watchlist item not found",
    });
  }

  // Ensure only owner can delete
  if (watchlistItem.userId !== req.user.id) {
    return res.status(403).json({
      error: "Not allowed to update this watchlist item",
    });
  }

  await prisma.watchlistItem.delete({
    where: { id: req.params.id },
  });

  res.status(200).json({
    status: "success",
    message: "Movie removed from watchlist",
  });
};

// Update watchlist item with new status, rating, or notes
const updateWatchlistItem = async (req, res) => {
  const { status, rating, notes } = req.body;

  // Find watchlist item and verify ownership
  const watchlistItem = await prisma.watchlistItem.findUnique({
    where: { id: req.params.id },
  });

  if (!watchlistItem) {
    return res.status(404).json({
      error: "Watchlist item not found",
    });
  }

  // Ensure only owner can update
  if (watchlistItem.userId !== req.user.id) {
    return res.status(403).json({
      error: "Not allowed to update this watchlist",
    });
  }

  // Build update data
  const updateData = {};
  if (status !== undefined) updateData.status = status.toUpperCase();
  if (rating !== undefined) updateData.rating = rating;
  if (notes !== undefined) updateData.notes = notes;

  // Update watchlist item
  const updatedItem = await prisma.watchlistItem.update({
    where: { id: req.params.id },
    data: updateData,
  });

  res.status(200).json({
    status: "success",
    data: {
      watchlistItem: updatedItem,
    },
  });
};

const getWatchlist = async (req, res) => {
  try {
    const watchlist = await prisma.watchlistItem.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        movie: true,
      },
      orderBy: {
        status: "asc",
      },
    });

    res.status(200).json({
      status: "Success",
      results: watchlist.length,
      data: {
        watchlist,
      },
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to fetch watchlist",
    });
  }
};

export {
  addToWatchlist,
  removeFromWatchlist,
  updateWatchlistItem,
  getWatchlist,
};
