import React, { useState, useEffect } from 'react'
import FavoriteMoviesBtn from './FavoriteMoviesBtn';
import noPoster from "../assets/no poster.png";

const ModalWindow = ({ isActive, windowType, movieId, onCloseModal, onChooseMovie, favoriteMovies, onNewFavoriteMovies, onOpenSelectMovie }) => {

  // Defines the height of the window
  let height = windowType == "movie" ? 380
    :
    windowType == "favoriteMovies" ? 900 : 0;

  if (window.innerWidth <= 950) {
    height = "auto";
  }

  // Detailed info about movie
  const [movieInfo, setMovieInfo] = useState(null);

  // Loading circle during API request
  const [isLoading, setIsLoading] = useState(false);

  // Create local storage with favorite movies
  const [localFavoriteMovies, setLocalFavoriteMovies] = useState(favoriteMovies);

  useEffect(() => {
    setLocalFavoriteMovies(favoriteMovies);
  }, [favoriteMovies]);

  useEffect(() => {

    if (!movieId) {
      setMovieInfo(null);
      return;
    }

    // Load movie from local storage if he saved
    if (favoriteMovies.some(movie => movie.movieId === movieId)) {
      const savedMovie = favoriteMovies.find(movie => movie.movieId === movieId);
      setMovieInfo(savedMovie);
      return;
    }

    setIsLoading(true);

    fetch(`http://www.omdbapi.com/?i=${movieId}&plot=full&apikey=1ae6eafe`)
      .then(response => response.json())
      .then(json => {
        if (json.Response == "True") {
          setMovieInfo(json);
          setIsLoading(false);
        }
        else {
          setIsLoading(false);
          setMovieInfo(null);
        }
      })
      .catch(error => {
        console.error(error)
        setIsLoading(false)
      })

  }, [movieId])

  return (
    <>
      <div
        className={isActive
          ? "modal__window active" : "modal__window"}
        style={{
          height: height
        }}
      >
        {isLoading ? (<img className="loading loading__modal" src="src/assets/circle-loading black.png" />) :
          (movieInfo && (
            <div className="show__movie">
              <img className='modal__img' src={movieInfo.Poster} alt="" />
              <div>
                <div className='modal__title'>
                  <h1>{movieInfo.Title}</h1>
                  <FavoriteMoviesBtn
                    isActive={favoriteMovies.some(movie => movie.movieId === movieId)}
                    onClick={() => onChooseMovie(prev => {

                      // Check favorite movie or no
                      const checkMovie = prev.some(movie => movie.movieId === movieId);

                      // Delete movie from favorite
                      if (checkMovie)
                        return prev.filter(movie => movie.movieId !== movieId)

                      // Add movie to favorite
                      else
                        return [...prev, {
                          movieId: movieId,
                          Title: movieInfo.Title,
                          Poster: movieInfo.Poster,
                          Genre: movieInfo.Genre,
                          Type: movieInfo.Type,
                          imdbRating: movieInfo.imdbRating,
                          Plot: movieInfo.Plot
                        }];
                    }
                    )} /></div>
                <h2>Genre: {movieInfo.Genre.toLowerCase()}</h2>
                <h2>Type: {movieInfo.Type}</h2>
                <h2>imdbRating: {movieInfo.imdbRating}</h2>
                <p>Plot: {movieInfo.Plot.length > 350 ?
                  movieInfo.Plot.slice(0, 350) + "..." :
                  movieInfo.Plot}</p>
              </div>
            </div>
          ))}
        <div className={windowType == "favoriteMovies" ? "favorite__movies active" : "favorite__movies"}>

          {windowType == "favoriteMovies" &&
            favoriteMovies.map(element => (
              <div key={element.movieId} className="modal__movie">
                <img className='movie__img' src={element.Poster !== "N/A" ?
                  element.Poster :
                  noPoster}
                  onClick={() => {
                    onNewFavoriteMovies(localFavoriteMovies);
                    onOpenSelectMovie(element.movieId)
                    }} alt="" />
                <h1>{element.Title}</h1>
                <FavoriteMoviesBtn
                  isActive={localFavoriteMovies.some(movie =>
                    movie.movieId === element.movieId
                  )}
                  onClick={() => {

                    setLocalFavoriteMovies(prevMovies => {
                      let movieInLocalStorage = localFavoriteMovies.some(movie => movie.movieId === element.movieId);

                      // If movie in favorite, delete him
                      if (movieInLocalStorage) {
                        return prevMovies.filter(movie => movie.movieId !== element.movieId);
                      }
                      // If movie not in favorite, add him
                      else {
                        return [...prevMovies, {
                          movieId: element.movieId,
                          Title: element.Title,
                          Poster: element.Poster,
                          Genre: element.Genre,
                          Type: element.Type,
                          imdbRating: element.imdbRating,
                          Plot: element.Plot
                        }];
                      }
                    });
                  }} />
              </div>
            ))}

        </div>

      </div>
      <div className={isActive ?
        "modal__bg active" :
        "modal__bg"
      }
        onClick={() => {
          onCloseModal();

          // Save new favorite movies
          onNewFavoriteMovies(localFavoriteMovies);
        }}></div>
    </>
  )
}

export default ModalWindow