// Import express package
const express = require("express");
// Instance of our app
const app = express();

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
