import React, { useState, useEffect } from "react";
import MovieDetail from "./MovieDetail";
import SearchBar from "./SearchBar";
import "./MovieList.css";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [genres, setGenres] = useState([]);
  useEffect(() => {

    fetch("https://dummyapi.online/api/movies")
      .then((response) => response.json())
      .then((data) => {

        const moviesWithGenres = data.map((movie, index) => ({
          ...movie,
          genre: ["Action", "Drama", "Comedy", "Thriller", "Horror", "Fantasy"][
            index % 6
          ],
        }));

        console.log("API Data with Genres:", moviesWithGenres);
        setMovies(moviesWithGenres);
        setFilteredMovies(moviesWithGenres);


        const uniqueGenres = [
          ...new Set(moviesWithGenres.map((movie) => movie.genre)),
        ];
        setGenres(uniqueGenres);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  useEffect(() => {
    let result = movies;


    if (searchTerm) {
      result = result.filter((movie) =>
        movie.movie.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }


    if (selectedGenre) {
      result = result.filter((movie) => movie.genre === selectedGenre);
    }

    setFilteredMovies(result);
  }, [searchTerm, selectedGenre, movies]);

  return (
    <div className="movie-list-container">
      <h1>MovieSphere</h1>

      {}
      <SearchBar onSearch={setSearchTerm} />

      {}
      <select
        onChange={(e) => setSelectedGenre(e.target.value)}
        value={selectedGenre}
        className="genre-dropdown"
      >
        <option value="">All Genres</option>
        {genres.length > 0 ? (
          genres.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))
        ) : (
          <option disabled>Loading genres...</option>
        )}
      </select>

      {}
      <div className="movie-grid">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="movie-card"
              onClick={() => setSelectedMovie(movie)}
            >
              {}
              <img
                src={movie.image}
                alt={movie.movie}
                className="movie-image"
                onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
              />
              <h3>{movie.movie}</h3>
              <p>Rating: {movie.rating}</p>
            </div>
          ))
        ) : (
          <p>No movies found. Please try again later.</p>
        )}
      </div>

      {}
      {selectedMovie && (
        <div className="movie-detail-modal">
          <MovieDetail
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        </div>
      )}
    </div>
  );
};

export default MovieList;
