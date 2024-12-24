import React from "react";
import "./MovieDetail.css";

const MovieDetail = ({ movie, onClose }) => {
  return (
    <>
      {}
      <div className="overlay" onClick={onClose}></div>

      {}
      <div className="movie-detail">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <img
          src={movie.image}
          alt={movie.movie}
          className="detail-image"
        />
        <h2>{movie.movie}</h2>
        <p>
          <strong>Genre:</strong> {movie.genre || "N/A"}
        </p>
        <p>
          <strong>Rating:</strong> {movie.rating || "N/A"}
        </p>
        <p>
          <strong>IMDB:</strong>{" "}
          <a href={movie.imdb_url} target="_blank" rel="noreferrer">
            View on IMDB
          </a>
        </p>
      </div>
    </>
  );
};

export default MovieDetail;
