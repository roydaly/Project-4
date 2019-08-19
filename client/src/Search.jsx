// This is where the search page will go. 

import React, { useState, useEffect } from "react";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios';

export default function Search({ onSearch }) {
  const [query, setQuery] = useState({ text: "" });
  const [data, setData] = useState([]);

  function handleChange(event) {
    const newQuery = Object.freeze({ text: event.target.value });
    setQuery(newQuery);
  }

  function search() {
    const newQuery = Object.freeze({ text: query.text });
    if (onSearch) onSearch(newQuery);
  }

  function RestApiHooksComponent() {
    useEffect(() => {
      axios
        .get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${process.env.API_KEY}`)
        .then(result => setData(result.data));
    }, []);

  return (
      <div>
        <div className='search'>
            <h1>Search for a Company below:</h1>
        </div>
        <div className='search-page'>
    <form>
      <input type="text" onChange={handleChange} />
      <button onClick={search} type="button">
        Search
      </button>
    </form>
    </div>
    <ul>
        {data.map(item => (
          <li key={item.name}>
            {item.name}: {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}}
