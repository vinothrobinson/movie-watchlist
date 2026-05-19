import { prisma } from "../config/db.js";

const addToWatchlist = async (req, res) => {
  const { movieId, status, rating, notes, userId } = req.body;
  // Verify movie exists
  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
  });

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  // Check if movie already exists in watchlist
  const existingInWatchList = await prisma.watchlistItem.findUnique({
    where: {
      userId_movieId: {
        userId: userId,
        movieId: movieId,
      },
    },
  });

  if (existingInWatchList) {
    return res.status(400).json({ error: "Movie already in watchlist" });
  }

  const watchlistItem = await prisma.watchlistItem.create({
    data: {
      userId,
      movieId,
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

export { addToWatchlist };
