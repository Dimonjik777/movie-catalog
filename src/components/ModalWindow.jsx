import React from 'react'

const ModalWindow = ({isActive, windowType,children}) => {
  
  let height = windowType == "movie" ? 380 : 900;
  return (
    <>
    <div
    className={isActive
    ? "modal__window active" : "modal__window" }
    style={{
      height: height
    }}
    >{children}</div>
    <div className={isActive ?
      "modal__bg active" :
      "modal__bg"
    }></div>
    </>
  )
}

export default ModalWindow