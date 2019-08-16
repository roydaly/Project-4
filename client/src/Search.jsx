// This is where the search page will go. 

import React, { useState } from "react";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

export default function Search({ onSearch }) {
  const [query, setQuery] = useState({ text: "" });

  function handleChange(event) {
    const newQuery = Object.freeze({ text: event.target.value });
    setQuery(newQuery);
  }

  function search() {
    const newQuery = Object.freeze({ text: query.text });
    if (onSearch) onSearch(newQuery);
  }

  return (
      <div>
        <div className='search'>
            <h1>Search for a Company or Ticker below:</h1>
        </div>
    <form>
      <input type="text" onChange={handleChange} />
      <button onClick={search} type="button">
        Search
      </button>
    </form>
    </div>
  );
}