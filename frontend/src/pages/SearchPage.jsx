import { useState, useEffect } from "react";
import { Search } from "lucide-react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // prevent empty searches
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    // Fetch movies via backend
    const fetchMovies = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/movies/search?q=${query}`
        );

        const data = await response.json();

        setMovies(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // Timeout when searching
    const timeout = setTimeout(() => {
      fetchMovies();
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="flex flex-col items-center bg-beige-200 font-['Inter'] min-h-screen">
      <header className="w-full bg-maroon-500 text-white mb-5">
        <nav className="max-w-7xl mx-auto flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold">CineLog</h1>

          <div className="flex gap-6">
            <a href="/watchlist">Watchlist</a>
            <a href="/login">Log Out</a>
          </div>
        </nav>
      </header>
      {/* Search Container */}
      <div className="relative w-2xl">
        <h1 className="text-6xl font-semi-bold text-center mb-5">Search</h1>
        {/* Search Bar */}
        <div className="relative w-full">
          <Search
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search for movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full
          p-2
          bg-white
          border
          border-gray-200
          rounded-2xl
          shadow-sm
          focus:outline-none
          focus:ring-2
          focus:ring-maroon-300"
          />
        </div>

        {/* Results */}
        {movies.length > 0 && (
          <div className="absolute w-full bg-white border rounded-xl mt-2 shadow-lg max-h-96 overflow-y-auto">
            {movies.map((movie, index) => (
              <div key={movie.id}>
                {/* Movie Row */}
                <div className="flex items-center gap-4 p-4 hover:bg-gray-100 cursor-pointer">
                  {/* Poster */}
                  {movie.poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                      className="w-16 rounded-lg"
                    />
                  )}

                  {/* Movie Info */}
                  <div>
                    <h2 className="font-semibold">{movie.title}</h2>

                    <p className="text-sm text-gray-500">
                      {movie.release_date}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                {index !== movies.length - 1 && (
                  <hr className="border-gray-200" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Loading */}
      {loading && <p className="mt-4 text-gray-500">Loading...</p>}
    </div>
  );
}
