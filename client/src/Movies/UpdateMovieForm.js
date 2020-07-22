import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'



const UpdateMovie = (props) => {

 
   const { id } = useParams();
   const { push } = useHistory();

   useEffect(() => {
       axios
       .get(`http://localhost:5000/api/movies/${id}`)
       .then(res => {
           props.setUpdateMovie(res.data)
       })
       .catch(err => console.log(err))
   }, [id])
   
   const changeHandler = (evt) => {
    const name = evt.target.name
    let value = evt.target.value

    if (evt.target.name === 'stars'){
        value = evt.target.value.split()
    }

    props.setUpdateMovie({
        ...props.updateMovie,
        [name]: value 
    })
}

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, props.updateMovie)
        .then(res => {
            props.setUpdateMovie(res.data)
            push(`/`)
        })
        .catch(err => console.log(err))
    }
   

    return (
        <div>
            <h2>Update Movie</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        onChange={changeHandler}
                        placeholder="title"
                        value={props.updateMovie.title}
                    />
            
                    <input
                        type="text"
                        name="director"
                        onChange={changeHandler}
                        placeholder="director"
                        value={props.updateMovie.director}
                    />
  
                    <input
                        type="text"
                        name="metascore"
                        onChange={changeHandler}
                        placeholder="metascore"
                        value={props.updateMovie.metascore}
                    />
   
  
                    <input
                        type="text"
                        name="stars"
                        onChange={changeHandler}
                        placeholder="stars"
                        value={props.updateMovie.stars}
                    />
     
          <button>Update Movie</button>
        </form>
    </div>

    )
}

export default UpdateMovie