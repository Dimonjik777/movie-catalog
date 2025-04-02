import React, { useState, useEffect } from 'react'
import FavoriteMoviesBtn from './FavoriteMoviesBtn';

const ModalWindow = ({ isActive, windowType, movieId, onCloseModal, onChooseMovie }) => {

  // Defines the height of the window
  let height = windowType == "movie" && 380;

  // Detailed info about movie
  const [movieInfo, setMovieInfo] = useState(null);

  // Loading circle during API request
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    if (!movieId) return;

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
            <>
              <img className='modal__img' src={movieInfo.Poster} alt="" />
              <div>
                <div className='modal__title'>
                  <h1>{movieInfo.Title}</h1>
                  <FavoriteMoviesBtn onClick={() => {
                    onChooseMovie(prev => [...prev, {movieId: movieId, movieTitle: movieInfo.Title, moviePoster: movieInfo.Poster}])
                    }} /></div>
                <h2>Genre: {movieInfo.Genre.toLowerCase()}</h2>
                <h2>Type: {movieInfo.Type}</h2>
                <h2>imdbRating: {movieInfo.imdbRating}</h2>
                <p>Plot: {movieInfo.Plot.length > 500 ?
                  movieInfo.Plot.slice(0, 500) + "..." :
                  movieInfo.Plot}</p>
              </div>
            </>
          ))}

      </div>
      <div className={isActive ?
        "modal__bg active" :
        "modal__bg"
      }
        onClick={onCloseModal}></div>
    </>
  )
}

export default ModalWindow