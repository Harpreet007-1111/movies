import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { BsFillStarFill } from "react-icons/bs";
import { BiLeftArrow } from "react-icons/bi";
import ReadMore from './ReadMore';
import "./review.css";

function Review() {

  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const movieID = id;
  const baseUrl = `https://image.tmdb.org/t/p/w500/`;

  useEffect(() => {
   fetch(`https://api.themoviedb.org/3/movie/${movieID}/reviews?api_key=f87e714f5116fc6f1f28864af74da53b`)
      .then(Response => Response.json())
      .then(myData => {
        console.log("myData", myData.results);
        setReviews(myData.results);
      })
      .catch(error => console.log(error))
  }, [movieID]);

  const handleData = (created_at) => {

    const monthStrings = [
      "January", "February", "March",
      "April", "May", "June",
      "July", "August", "September",
      "October", "November", "December"
    ];

    const date = new Date(created_at);
    const getDate = date.getDate();
    const getMonth = monthStrings[date.getMonth()];
    const getYear = date.getFullYear();
    return `${getMonth}, ${getDate}, ${getYear}`;
  }

  const displayReviews = (review, index) => {
    const profile = review.author_details.avatar_path;
    return (
      <div className='review-container' key={index}>
        <div className='review-wrapper'>
          <div id='img'>
            {(profile != null ?
              (<img src={baseUrl + profile} alt={review.author} onError={(e) => { e.target.onerror = null; e.target.src = "/profile.png" }} />) :
              (<img src="/profile.png" alt={review.author} />))}
          </div>
          <div className='myContent'> 
            <h1>A Review by {review.author} <span id='rating'><BsFillStarFill title='rating' />{review.author_details.rating}</span></h1>
            <p className='format'>Written by {review.author} on {handleData(review.created_at)}</p>
            <p><ReadMore>{review.content}</ReadMore> </p>
          </div>
        </div>
      </div>

    )
  }

  return (
    <div>
      {reviews.map((value,index) => (displayReviews(value, index)))}

        <div className='goBack' onClick={() => navigate(`/movie/${movieID}`)}>
          <BiLeftArrow className='backIcon' title='Go Back' />
        </div>
     

    </div>
  )
}

export default Review;