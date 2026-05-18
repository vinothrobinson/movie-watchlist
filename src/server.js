// Import express package
import express from "express";
import { config } from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";

// Import Routes
import movieRoutes from "./routes/movieRoutes.js";

config();
connectDB();

// Instance of our app
const app = express();

// API Routes
app.use("/movies", movieRoutes);

// GET request, in every request we receive a req and res
app.get("/hello", (req, res) => {
  res.json({ message: "Hello World" });
});

// Listen to a specific port to initalize the app
const PORT = 5001; // http://localhost:5001 (base url)
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

// Handle unhandled promise rejection (e.g database connection errors)
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await disconnectDB();
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});

// End Point Categories
// AUTH - signin, signup
// MOVIE - GETTING ALL MOVIES
// USER - Profile
// WATCHLIST
