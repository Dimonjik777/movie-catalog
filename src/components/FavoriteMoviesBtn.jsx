import React, {useState} from 'react'
import Star from '../assets/star.png'
import StarInactive from '../assets/favorite_inactive.png'

const FavoriteMoviesBtn = ({place, onClick}) => {

  const [activeFavorite, setActiveFavorite] = useState(false);

  const handleClick = () => {

    if(place === "main"){
      onClick();
    }
    else{
      setActiveFavorite(prev => !prev);
      onClick();
    }
  }

  return (
    <button onClick={handleClick} className='favorite__btn'>
      <img src={place === "main" ? Star :
         activeFavorite ? Star : StarInactive} alt="" />
      </button>
  )
}

export default FavoriteMoviesBtn