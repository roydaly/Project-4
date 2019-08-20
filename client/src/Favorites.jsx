import React, { useState, useEffect } from "react";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import axios from "axios";

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() =>
    axios.get('/api/stocks', )
     .then(res => {
        let favorites = res.data
        setFavorites(favorites)
    }))
    
  return (
        <>
        <div>{favorites}</div>
        </>
  );
}



// const Planets = () => {
//   const [hasError, setErrors] = useState(false);
//   const [planets, setPlanets] = useState({});

//   useEffect(() =>
//     fetch("https://swapi.co/api/planets/4/")
//       .then(res => res.json())
//       .then(res => this.setState({ planets: res }))
//       .catch(() => this.setState({ hasErrors: true }))
//   );

//   return <div>{JSON.stringify(planets)}</div>;
// };
// export default Planets;