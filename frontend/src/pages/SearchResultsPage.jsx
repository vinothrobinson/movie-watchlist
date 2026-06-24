import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // URL is the source of truth
  const urlQuery = searchParams.get("q") || "";

  // Local input state (for editing)
  const [query, setQuery] = useState(urlQuery);

  // Results state
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Keep input in sync when URL changes
  useEffect(() => {
    setQuery(urlQuery);
  }, [urlQuery]);

  // Fetch movies whenever URL query changes
  useEffect(() => {
    if (!urlQuery.trim()) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/movies/search?q=${urlQuery}`
        );

        const data = await response.json();
        setMovies(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [urlQuery]);

  // Submit new search → updates URL → triggers fetch
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    navigate(`/search/results?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen bg-beige-200">
      <div className="max-w-7xl mx-auto p-8">
        {/* Search Bar */}
        <SearchBar
          query={query}
          setQuery={setQuery}
          handleSubmit={handleSubmit}
        />

        {/* Header */}
        <h1 className="text-3xl font-bold mt-6 mb-2">
          Results for "{urlQuery}"
        </h1>

        <p className="text-gray-500 mb-6">{movies.length} results found</p>

        {/* Loading */}
        {loading && <p className="text-gray-500">Loading...</p>}

        {/* No results */}
        {!loading && movies.length === 0 && urlQuery && (
          <div className="text-center mt-10">
            <p className="text-xl">No movies found</p>
            <p className="text-gray-500">Try a different search term</p>
          </div>
        )}

        {/* Results grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
