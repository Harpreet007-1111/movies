import React from "react";
import Movies from "./components/Movies";
import MovieID from "./components/MovieID";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Review from "./components/Review";
import Navigation from "./components/Navigation";
import GetMovies from "./components/GetMovies";

function App() {

  return (
    <div>
    <BrowserRouter> 
    <Navigation />
    <Routes>
      
      <Route path="/" element={<Movies />} />
      <Route path="/movie/:id" element={<MovieID />} />
      <Route path="/movie/:id/reviews" element={<Review />} />
      <Route path="movie/genre/:genID/" element={<GetMovies />} />
    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
