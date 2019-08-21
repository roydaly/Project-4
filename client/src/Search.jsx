// This is where the search page will go. 

import React, { useState, useEffect } from "react";
import { Route, Link, Redirect, BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios';

export default function Search({config}) {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [ticker, setTicker] = useState(null);
  const [name, setName] = useState(null);
//   const [stockData, setStockData] = useState([]);
  const urlPost = '/api/stocks/';

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${process.env.API_KEY}`)
        .then(res => {
            let data = res.data.bestMatches
            setData(data)
            // console.log(data[0]["6. marketClose"])
        })
    }

    const addFavorite = (fave) => {
        axios.post(urlPost, fave, config)
         .then(function(response) {
          console.log(response)
        });
    }


    // const handleStockDetail = (event) => {
    //     event.preventDefault();
    //     axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&interval=5min&outputsize=full&apikey${process.env.API_KEY}`)
    //     .then(res => {
    //         let stockData = res.data.daily
    //         setStockData(stockData)
    //         console.log(stockData)
    //     })
    // }
       
  return (
      <>
        <div className='search'>
            <h1>Search for a Company below:</h1>
        </div>
        <div className='search-page'>
    <form>
        <input
          type="text"
          name="query"
          placeholder="Enter company name..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
        <div>
            {data.map((data, index) => {
            return <div onClick={() => {
                let fave = {
                    name: data['2. name'],
                    ticker: data['1. symbol']
                }
                addFavorite(fave)
            }} key={index}>{data['2. name']}</div>
            })}
        </div>
    </>
  );
}


// handleStockDetail(data['1. symbol'])}

// setTicker(data['1. symbol'])}