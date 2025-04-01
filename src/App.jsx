import { useState, useEffect } from "react"
import SearchMovies from "./components/SearchMovies"

function App() {

  // search input data
  const [searchQuery, setSearchQuery] = useState("");
  function handleChangeSearch(event) {
    setSearchQuery(event.target.value);
  }

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?s=${searchQuery}&apikey=1ae6eafe`)
      .then(response => response.json())
      .then(json => {
        if (json.Response == "True")
          setMovies(json.Search)
        else { 
          setMovies([]);
        }
      }
      )
      .catch(error => console.error(error))
  }, [searchQuery]);

  return (
    <>
      <div className="container">
        <SearchMovies search={searchQuery} onChangeSearch={handleChangeSearch} />

        <div className="movies">
          {
            movies.length != 0 &&
              movies.map(element => (
                <div className="movie" key={element.imdbID}>
                  <img className="movie__img" src={element.Poster} alt={element.Title} />
                  <h2 className="movie__title">{element.Title}</h2>
                </div>
              ))
          }
        </div>
      </div>
    </>
  )
}

export default App
