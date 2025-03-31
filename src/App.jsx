import {useState} from "react"
import SearchMovies from "./components/SearchMovies"

function App() {

  const [searchQuery, setSearchQuery] = useState("");

  function handleChangeSearch(event){
    setSearchQuery(event.target.value);
  }

  return (
    <>
      <div className="container">
        <SearchMovies search={searchQuery} onChangeSearch={handleChangeSearch} />
      </div>
    </>
  )
}

export default App
