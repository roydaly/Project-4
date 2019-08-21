import React, { useState, useEffect } from "react";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import axios from "axios";

export default function Favorites({config}) {
    const [favorites, setFavorites] = useState([]);
    const [id, setId] = useState(null);
    const [name, setName] = useState(null);
    const urlAll = '/api/stocks';
    const urlDelete = '/api/stocks/';
    // const urlUpdate = '/api/stocks/:sid';

    useEffect(() =>{
        axios.get(urlAll, config)
            .then(res => {
            let favorites = res.data
            setFavorites(favorites)
        })
    },[])

    function handleDelete(current) {
        console.log(current._id)
        axios.delete(urlDelete + current._id, config)
        .then(function(response) {
            console.log(response)
            axios.get(urlAll, config)
                .then(res => {
                let favorites = res.data
                setFavorites(favorites)
            })
        });
    }

    // function handleUpdate() {
    //     console.log(id)
    //     axios.put(urlUpdate, {
        //     name: name
        // }, config)
    //     .then(res => {
    //     handleUpdate(res.data)
    //     })
    // }

    
  return (
    <div>
    {favorites.map((favorite, index) => {
    return <div onClick={() => {
        let current = {
            _id: favorite._id,
            name: favorite.name
        }
            handleDelete(current)
        }} key={index}>{favorite.name} - {favorite.ticker} </div>
    })}
    </div>
  );
}
