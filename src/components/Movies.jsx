import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";

function Movies({
  handleAddtoWatchList,
  handleRemoveFromWatchlist,
  watchlist,
}) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const handlePrev = () => {
    if (pageNo == 1) {
      setPageNo(pageNo);
    } else {
      setPageNo(pageNo - 1);
    }
  };

  const handleNext = () => {
    setPageNo(pageNo + 1);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=b734cca0723462560434ef3dd3fbab46&language=en-US&page=${pageNo}`
      )
      .then(
        (res) => {
          setMovies(res.data.results);
        },
        [pageNo]
      );
  });
  return (
    <div className="p-5">
      <div className="text-2xl m-5 font-bold text-center">Trending Movies</div>
      <div className="flex flex-row flex-wrap justify-around m-10 mb-5 gap-8">
        {movies.map((movieObj) => {
          return (
            <MovieCard
              key={movieObj.id}
              movieObj={movieObj}
              poster_path={movieObj.poster_path}
              name={movieObj.original_title}
              handleAddtoWatchList={handleAddtoWatchList}
              handleRemoveFromWatchlist={handleRemoveFromWatchlist}
              watchlist={watchlist}
            ></MovieCard>
          );
        })}
      </div>
      <Pagination
        pageNo={pageNo}
        handleNext={handleNext}
        handlePrev={handlePrev}
      ></Pagination>
    </div>
  );
}
//https://api.themoviedb.org/3/movie/popular?api_key=b734cca0723462560434ef3dd3fbab46&language=en-US&page=1
export default Movies;
