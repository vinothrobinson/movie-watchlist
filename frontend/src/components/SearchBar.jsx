// src/components/SearchBar.jsx
import { Search } from "lucide-react";

export default function SearchBar({ query, setQuery, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <Search
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
        size={20}
      />

      <input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="
          w-full
          p-2
          bg-white
          border
          border-gray-200
          rounded-2xl
          shadow-sm
          focus:outline-none
          focus:ring-2
          focus:ring-maroon-300
        "
      />
    </form>
  );
}
