// Import express package
import express from "express";

// Import Routes
import movieRoutes from "./routes/movieRoutes.js";
// ./src/routes/movieRoutes.js
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

// End Point Categories
// AUTH - signin, signup
// MOVIE - GETTING ALL MOVIES
// USER - Profile
// WATCHLIST
