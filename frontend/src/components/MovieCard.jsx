import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="block hover:scale-105 transition"
    >
      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg mb-2 shadow-md"
        />
      )}

      <h2 className="font-semibold">{movie.title}</h2>

      <div className="flex items-center flex-wrap gap-2 text-sm text-gray-500">
        {movie.release_date && <span>{movie.release_date.slice(0, 4)}</span>}

        {movie.vote_average && (
          <>
            <span>•</span>
            <span className="text-yellow-600">
              ⭐ {movie.vote_average.toFixed(1)}
            </span>
          </>
        )}

        <span className="text-gray-400 text-xs">
          ({movie.vote_count?.toLocaleString()})
        </span>
      </div>
    </Link>
  );
}
