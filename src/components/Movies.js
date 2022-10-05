import React, { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import {BiRightArrow, BiLeftArrow } from "react-icons/bi";
import "../index.css";
import ReadMore from './ReadMore';

function Movies() {

  const [movies, setMovies] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [getPage, setGetPage] = useState(1);
  console.log(movies);
  let Navigation = useNavigate();
  const baseUrl = "https://image.tmdb.org/t/p/w500/";


  const getIncrement = () => {
    {(getPage === 10) ? setGetPage(1) : setGetPage(getPage + 1)}    
  }

  const getDecrement = () => {
    {(getPage !== 1) ? setGetPage(getPage - 1) : setGetPage(1)}
  }

  const movieInfo = (id) => {
    console.log(id);
    Navigation(`/movie/${id}`);
  }
  
  
  const filteredData = movies.filter(item => {
    return item.title.toLowerCase().includes(searchWord.toLowerCase());
  });

    useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=f87e714f5116fc6f1f28864af74da53b&language=en-US&page=${getPage}`)
    .then(response => response.json())
    .then(data => setMovies(data.results)
    ).catch(error => console.log(error));
    }, [getPage]);

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
    <div className='container'>
      <div className='search'>
    <input type='text' placeholder='Search here...' value={searchWord} onChange={(event) => setSearchWord(event.target.value)} />
    </div>

  {(searchWord.length !== 0) ? filteredData.map((data) => displayMovies(data)) : ""}
      
  {movies.map(data => displayMovies(data))}

      <div className="buttons">

  <button type='button' className='icons left' onClick={() => getDecrement()}><BiLeftArrow title='Left' />Prev</button>
      
  <button type='button' className='icons right' onClick={() => getIncrement()}>Next<BiRightArrow /></button>

    </div>
    </div>
   
  )
}

export default Movies;