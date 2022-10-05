import React, { useState, useEffect } from 'react';
import {AiOutlineHeart, AiOutlineUnorderedList, AiOutlineStar} from 'react-icons/ai';
import { BsBookmark } from "react-icons/bs";
import { BiLeftArrow } from 'react-icons/bi';
import { MdReviews } from "react-icons/md";
import './movie.css';
import { useParams, useNavigate } from "react-router-dom";
import Review from './Review';

function MovieID() {
  const [Movies, setMovies] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const movieID = id; 
  const baseUrl = `https://image.tmdb.org/t/p/w500/`;
  
  console.log("ShowMovies", Movies);
  
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=f87e714f5116fc6f1f28864af74da53b`)
    .then(Response => Response.json())
    .then(data => setMovies(data))
    .catch(error => console.log(error));
  }, [movieID]);

  const backImage = {
    backgroundImage: `url(${baseUrl + Movies.backdrop_path})`
  }

  const handleReview = (getid) => {
    console.log("GetID", getid);
    navigate(`/movie/${getid}/reviews`);
  }

if(Object.keys(Movies).length > 0){
  return (
    <div id='container' style={backImage}> 
      <div id='wrapper'>
      <div className='img'>
      <img src={baseUrl + Movies.poster_path} alt={Movies.title} />
    </div>
      <div className='content'>
        <h1>{Movies.title}</h1>
        {Movies.genres.map(data => <h4 className='genre' key={data.id}>{data.name} </h4>)}
        <span id='icons'>
            <AiOutlineHeart className='app' title='LOVE IT!' /> 
            <AiOutlineUnorderedList className='app' title='Add to list' />
            <BsBookmark className='app' title='Add a bookmark' />
            <AiOutlineStar className='app' title='RATE IT!' />
            <MdReviews className='app' title='Reviews' onClick={() => handleReview(Movies.id)} />
        </span>
        <p className='tagname'>{Movies.tagline}</p>
        <h2>Overview</h2>
        <p>{Movies.overview}</p>
      </div>
      </div>
        <Review />
        <div className='goBack' onClick={() => navigate("/")}>
        <BiLeftArrow className='backIcon' title='Go Back' />
      </div>
    </div>
  )
}else{
  return(
    <div></div>
  )
  
}

}

export default MovieID;