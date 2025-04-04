import { useState, useEffect, useRef } from "react"
import SearchMovies from "./components/SearchMovies"
import ModalWindow from "./components/ModalWindow";
import noPoster from "./assets/no poster.png"
import useModal from "./hooks/useModal";
import FavoriteMoviesBtn from "./components/FavoriteMoviesBtn";
import SkeletonMovie from "./components/SkeletonMovie";

function App() {

  // Search input data
  const [searchQuery, setSearchQuery] = useState("");
  function handleChangeSearch(event) {
    setSearchQuery(event.target.value);
  }

  // Save timer in input
  const timeoutRef = useRef(null);

  //  Movies on main page
  const [movies, setMovies] = useState([]);

  // Loading circle during API request
  const [isLoading, setIsLoading] = useState(false);

  // Using hook for modal window
  const { modal, openSelectMovie, closeModal, openFavoriteMovies } = useModal();

  // Choose favorite movies
  const [favoriteMovies, setFavoriteMovies] = useState(() => {
    const savedMovies = localStorage.getItem("favoriteMovies");
    return savedMovies ? JSON.parse(savedMovies) : [];
  });

  // Save favorite movies in localStorage
  useEffect(() => {
    if (favoriteMovies.length > 0)
      localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));

  }, [favoriteMovies]);

  useEffect(() => {

    if (searchQuery == "")
      return;

    // Clear timer if user typing
    if(timeoutRef.current)
      clearTimeout(timeoutRef.current);

    // Make API query after 500 ms
    timeoutRef.current = setTimeout(() => {

      setIsLoading(true);

      fetch(`https://www.omdbapi.com/?s=${searchQuery}&apikey=1ae6eafe`)
        .then(response => response.json())
        .then(json => {
          if (json.Response == "True")
            setMovies(json.Search);
          else
            setMovies([]);

          setIsLoading(false);
        }
        )
        .catch(error => {
          console.error(error)
          setIsLoading(false);
        })
    }, 500);
  }, [searchQuery]);

  return (
    <>
      <div className="container">
        <div className="container__top">
          <SearchMovies search={searchQuery} onChangeSearch={handleChangeSearch} />
          <FavoriteMoviesBtn onClick={openFavoriteMovies} place={"main"} />
        </div>
        <div className="movies">
          {
            isLoading ? (
              [...Array(10)].map((_, index) => <SkeletonMovie key={index} />)
            )
              :
              (searchQuery != "" && movies.length === 0 ?
                (<p className="not__found">Movie not found</p>)
                :
                (movies.map(element => (
                  <div className="movie" key={element.imdbID}>
                    <img className="movie__img" src={element.Poster !== "N/A" ?
                      element.Poster
                      :
                      noPoster
                    }
                      onClick={() => openSelectMovie(element.imdbID)}
                      alt={element.Title} />
                    <h2 className="movie__title">{element.Title}</h2>
                  </div>
                )))
              )}
        </div>
      </div>
      <ModalWindow
        isActive={modal.isActive}
        windowType={modal.type}
        movieId={modal.movieId}
        onCloseModal={closeModal}
        onChooseMovie={setFavoriteMovies}
        favoriteMovies={favoriteMovies}
        onNewFavoriteMovies={setFavoriteMovies}
        onOpenSelectMovie={openSelectMovie} />
    </>
  )
}

export default App
