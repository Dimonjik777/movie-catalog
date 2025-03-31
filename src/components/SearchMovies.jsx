import React from 'react'

const SearchMovies = ({search, onChangeSearch}) => {
  return (
    <input
    className='search__movie'
    type="text"
    placeholder='Enter a movie'
    value={search}
    onChange={(event) => onChangeSearch(event)} />
  )
}

export default SearchMovies