import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MoviePage() {
  const { tmdbId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/movies/${tmdbId}`
      );

      const data = await response.json();

      setMovie(data.data);
    };

    fetchMovie();
  }, [tmdbId]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-beige-200">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-maroon-500 hover:underline"
      >
        ← Back
      </button>
      <div className="max-w-6xl mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster */}
            <div className="shrink-0">
              {movie.posterUrl && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.posterUrl}`}
                  alt={movie.title}
                  className="w-72 rounded-xl shadow-md"
                />
              )}
            </div>

            {/* Movie Information */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>

              <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
                {movie.releaseDate && (
                  <span>{new Date(movie.releaseDate).getFullYear()}</span>
                )}

                {movie.runtime && <span>{movie.runtime} min</span>}
              </div>

              {/* Overview */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Overview</h2>

                <p className="text-gray-700 leading-relaxed">
                  {movie.overview}
                </p>
              </div>

              {/* Watchlist Button */}
              <button
                className="
                  bg-maroon-500
                  text-white
                  px-6
                  py-3
                  rounded-xl
                  hover:bg-maroon-600
                  transition
                  font-medium
                "
              >
                Add To Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
