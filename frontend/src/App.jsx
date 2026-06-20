import { useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import WatchlistPage from "./pages/WatchlistPage";
import MoviePage from "./pages/MoviePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/search" element={<SearchPage />} />

        <Route path="/movie/:tmdbId" element={<MoviePage />} />

        <Route path="/watchlist" element={<WatchlistPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// const searchMovies = async () => {
//   const response = await axios.get(
//     "http://localhost:5001/movies/search?q=batman"
//   );

//   console.log(response.data);
// };

// <button
//   onClick={searchMovies}
//   className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
// >
//   Search
// </button>
