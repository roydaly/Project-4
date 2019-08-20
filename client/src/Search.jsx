// This is where the search page will go. 

import React, { useState, useEffect } from "react";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios';

export default function Search() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([{}]);
  
//   useEffect(() => {
//     axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${process.env.API_KEY}`)
//     .then(result => setData(result.data));
//       console.log(data.name)
//   }, []);

  const handleSubmit = ((e) => {
    e.preventDefault();
        axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${process.env.API_KEY}`)
        .then(result => setData(result.data));
          console.log(data.name)
      }, []);

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
          placeholder="Enter company name here.."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      <button onClick={handleSubmit} type="submit">Submit</button>
      </form>
    </div>
    {/* // <div>
    //     <ul>
    //         {data.map(data => {
    //         <li > {data.name}</li>
    //         })}
    //     </ul>
    // </div> */}
    </>
  );
}
