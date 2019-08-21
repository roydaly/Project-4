import React from "react";

function Home({ user }) {
    return (

        <div className='home'>
            <h1>Hello, {user.name}!</h1>
            <h3>Welcome To Trade Tracker....</h3>
            <img src="https://investorplace.com/wp-content/uploads/2019/05/stock-picks-1024x683.jpg"></img>
        </div>

    );
}

export default Home;
