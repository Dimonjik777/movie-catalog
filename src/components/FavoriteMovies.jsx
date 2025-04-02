import React from 'react'
import Star from '../assets/star.png'

const FavoriteMovies = () => {
  return (
    <button className='favorite__btn'><img src={Star} alt="" /></button>
  )
}

export default FavoriteMovies