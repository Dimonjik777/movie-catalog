import React from 'react'

const SkeletonMovie = () => {
  return (
    <div className="movie__skeleton">
      <img alt="" className="movie__img" />
      <h2 className="movie__title"></h2>
    </div>
  )
}

export default SkeletonMovie