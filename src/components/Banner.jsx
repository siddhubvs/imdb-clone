import React, { useEffect, useState } from "react";

function Banner({ movies }) {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000); // Change the interval duration according to your preference

    return () => clearInterval(interval);
  }, [movies]);

  return (
    <div
      className="relative h-[20vh] md:h-[75vh] bg-cover bg-center flex items-end"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movies[currentMovieIndex]?.poster_path})`,
        backgroundSize: "contain", // Ensure the image fits within the background area
        backgroundPosition: "center", // Center the background image
        backgroundRepeat: "no-repeat", // Do not repeat the background image
      }}
    >
      <div className="text-white text-2xl text-center w-full bg-gray-900/60 p-4">
        {movies[currentMovieIndex]?.original_title}
      </div>
    </div>
  );
}

export default Banner;
