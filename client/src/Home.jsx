import React from "react";

function Home (user) {

    return (
        
        <div className='home'>
        <h1>Hello, {user.name}!</h1>
        <h3>Welcome To Trade Tracker....</h3>
         </div>
        
    );
}

export default Home;
