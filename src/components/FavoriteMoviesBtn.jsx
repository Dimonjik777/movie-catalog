import React, {useState} from 'react'
import Star from '../assets/star.png'
import StarInactive from '../assets/favorite_inactive.png'

const FavoriteMoviesBtn = ({place, onClick, isActive}) => {


  return (
    <button onClick={onClick} className='favorite__btn'>
      <img src={place === "main" ? Star :
         isActive ? Star : StarInactive} alt="" />
      </button>
  )
}

export default FavoriteMoviesBtn