import { useState, useEffect } from "react"
import SearchMovies from "./components/SearchMovies"
import ModalWindow from "./components/ModalWindow";
import noPoster from "./assets/no poster.png"

function App() {

  // search input data
  const [searchQuery, setSearchQuery] = useState("");
  function handleChangeSearch(event) {
    setSearchQuery(event.target.value);
  }

  //  Movies on main page
  const [movies, setMovies] = useState([]);

  // Loading circle during API request
  const [isLoading, setIsLoading] = useState(false);

  // Select a movie by poster
  const [selectMovie, setSelectMovie] = useState(null);

  // Object for working with modal window
  const [modal, setModal] = useState({
    isActive: false,
    type: "",
    movieId: null
  });

  function openSelectMovie(id){
    setModal({
      isActive: true,
      type: "movie",
      movieId: id
    });
  }

  useEffect(() => {

    if (searchQuery == "")
      return;

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
  }, [searchQuery]);

  return (
    <>
      <div className="container">
        <SearchMovies search={searchQuery} onChangeSearch={handleChangeSearch} />

        <div className="movies">
          {
            isLoading ? (<img className="loading" src="src/assets/circle-loading.png" />)
              :
              ( searchQuery != "" && movies.length == 0 ?
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
      <ModalWindow isActive={modal.isActive} windowType={modal.type} movieId={modal.movieId} />
    </>
  )
}

export default App
