import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { BiLeftArrow } from 'react-icons/bi';
import "../index.css";
import ReadMore from './ReadMore';

function GetMovies() {

  const { genID } = useParams();
  const navigate = useNavigate();
  let genreID = genID;
  console.log(genreID);

  const [getMovies, setGetMovies] = useState([]);
  const baseUrl = "https://image.tmdb.org/t/p/w500/";

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=f87e714f5116fc6f1f28864af74da53b`)
      .then(response => response.json())
      .then(data => {
        let info = data.results;
        const myList = [];
        for (let index = 0; index < info.length; index++) {
          let genid = info[index].genre_ids;
          for (let j = 0; j < genid.length; j++) {
            if (genid[j] == genreID) {
              myList.push(info[index]);
            }
          }
        }
        setGetMovies(myList);
      }).catch(error => console.log(error));
  }, [genreID]);

  const movieInfo = (id) => {
    console.log(id);
    navigate(`/movie/${id}`);
  }

  const displayMovies = (data) => {
    return (
  <div className='wrapper' onClick={() => movieInfo(data.id)} key={data.id}> 
     <div className='card' key={data.id}>
  <img src={baseUrl + data.poster_path} alt={data.title} />
    <h2>{data.title}</h2>
      <p className='overview'><ReadMore>{data.overview}</ReadMore></p>
        <h4>{(data.release_date)}</h4>
    </div>
    </div>
  
     )
  } 

  return (
    <div>
      <div className='goBack' onClick={() => navigate("/")}>
        <BiLeftArrow className='backIcon' title='Go Back' />
      </div>

    {getMovies.map(data => displayMovies(data))}
    </div>
  )
}

export default GetMovies