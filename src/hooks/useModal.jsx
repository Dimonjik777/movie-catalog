import React, {useState} from 'react'

const useModal = () => {

    // Object for working with modal window
    const [modal, setModal] = useState({
      isActive: false,
      type: "",
      movieId: null
    });
  
    // Open movie in modal
    function openSelectMovie(id){
      setModal({
        isActive: true,
        type: "movie",
        movieId: id
      });
    }
  
    // Close modal when bg clicked
    function closeModal(){
      setModal({
        isActive: false,
        type: "",
        movieId: null
      });
    }
  return {modal, openSelectMovie, closeModal};
}

export default useModal