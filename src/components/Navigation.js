import React, { useState, useEffect } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import "./nav.css";
import { AiFillCloseCircle } from "react-icons/ai";

function Navigation() {

  const [categories, setCategories] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [showGenres, setShowGenres] = useState(false);

  const navigate = useNavigate();
  
  useEffect(() => {
    fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=f87e714f5116fc6f1f28864af74da53b")
    .then(response => response.json())
    .then(data => setCategories(data.genres))
    .catch(error => console.log(error));
  }, []);

  const handleClick = (genID) => {
    navigate(`movie/genre/${genID}`);
  } 

  const displayCategories = (category) => {
    return (
      <div className='list'>
        <li key={category.id} onClick={() => handleClick(category.id)}>{category.name}</li>
      </div>
    )
  }

  return (
    <div className='nav-container'>
    
    <div className='menu-buttons'>
    {showMenu ? <AiFillCloseCircle className='nav-icons' onClick={() => setShowMenu(!showMenu)} /> : <GiHamburgerMenu className='nav-icons' onClick={() => setShowMenu(!showMenu)} /> }
    </div>

    <div className='main-content'>
    {(showMenu === true) ? 
      <nav>
        <Link exact to="/">Home</Link>
    <li onClick={() => setShowGenres(!showGenres)}>Genres {!showGenres ? <BiDownArrow /> : <BiUpArrow />}</li>
  {showGenres ? categories.map(category => displayCategories(category)) : null}
      
  </nav>
    : null}
    </div>

    </div>
  )
}

export default Navigation;