import "./App.css";
import Navbar from "./components/navbar";
import Movies from "./components/Movies";
import WatchList from "./components/WatchList";
import Banner from "./components/Banner"; // Import the Banner component
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [watchlist, setWatchList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);

  const handleAddtoWatchlist = (movieObj) => {
    const newWatchList = [...watchlist, movieObj];
    localStorage.setItem("movieApp", JSON.stringify(newWatchList));
    setWatchList(newWatchList);
  };

  const handleRemoveFromWatchlist = (movieObj) => {
    let filteredWatchList = watchlist.filter((movie) => {
      return movie.id !== movieObj.id;
    });
    localStorage.setItem("movieApp", JSON.stringify(filteredWatchList));
    setWatchList(filteredWatchList);
  };

  useEffect(() => {
    let moviesFromLocalStorage = localStorage.getItem("movieApp");
    if (!moviesFromLocalStorage) return;
    setWatchList(JSON.parse(moviesFromLocalStorage));
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/trending/movie/week?api_key=b734cca0723462560434ef3dd3fbab46"
      )
      .then((res) => {
        setTrendingMovies(res.data.results);
      });
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner movies={trendingMovies} />
              <Movies
                watchlist={watchlist}
                handleAddtoWatchList={handleAddtoWatchlist}
                handleRemoveFromWatchlist={handleRemoveFromWatchlist}
              />
            </>
          }
        />
        <Route
          path="/watchlist"
          element={
            <WatchList
              watchlist={watchlist}
              setwatchlist={setWatchList}
              handleRemoveFromWatchlist={handleRemoveFromWatchlist}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
