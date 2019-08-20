import React, { useState, useEffect } from "react";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import axios from "axios";

export default function Favorites({config}) {
    const [favorites, setFavorites] = useState([]);
    const url = '/api/stocks';

    useEffect(() =>{
        axios.get(url, config)
         .then(res => {
            let favorites = res.data
            setFavorites(favorites)
        })
    },[])
    
  return (
    <div>
    {favorites.map((favorite, index) => {
    return <div key={index}>{favorite.name} - {favorite.ticker}</div>})}
</div>
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