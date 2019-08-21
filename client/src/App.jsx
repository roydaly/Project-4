import React from 'react';
import axios from 'axios';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Search from './Search';
import Trades from './Trades';
import Favorites from './Favorites';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      user: null,
      errorMessage: '',
      apiData: null
    }
    this.checkForLocalToken = this.checkForLocalToken.bind(this);
    this.liftToken = this.liftToken.bind(this);
    this.logout = this.logout.bind(this);
  }

  checkForLocalToken() {
    var token = localStorage.getItem('mernToken');
    if (!token || token === 'undefined') {
      // token is invalid or missing 
      localStorage.removeItem('mernToken');
      this.setState({
        token: '',
        user: null
      })
    } else {
      // we found a token in local storage...now verify it
      axios.post('/auth/me/from/token', {token})
      .then(res => {
        if (res.data.type === 'error') {
          localStorage.removeItem('mernToken')
          this.setState({
            token: '',
            user: null,
            errorMessage: res.data.message
           })
        } else {
          localStorage.setItem('mernToken', res.data.token);
          this.setState({
            token: res.data.token,
            user: res.data.user,
            errorMessage: ''
          })
        }
      })
    }
  }

  liftToken({token, user}) {
    this.setState({
      token,
      user
    })
  }

  componentDidMount() {
    this.checkForLocalToken()
  }

  logout() {
    // remove token from localstorage 
    localStorage.removeItem('mernToken');
    // remove user and token from state
    this.setState({
      token: '',
      user: null
    })
}

  render() {
    // var token = this.state.token
    var config = {
      headers: {
          Authorization: `Bearer ${this.state.token}`
      }
  }
    var user = this.state.user
    var contents = ''
    if (user) {
      contents = (
        <>
        <nav>
            <Link to="/home">Home</Link>{' | '}
            <Link to="/search">Search</Link>{' | '}
            <Link to="/trades">Trades</Link>{' | '}
            <Link to="/favorites">Favorites</Link>{' | '}
            <Link onClick={this.logout}>Logout</Link>
          </nav>
          <div>
            <Route exact path="/home" render={() => < Home user={user}  />} />
            <Route exact path="/search" render={() => < Search config={config} />} />
            <Route exact path="/trades" component={Trades} />
            <Route exact path="/favorites" render={() => < Favorites config={config} />} />
          </div>
        </>
      );
    } else {
      contents = (
        <>
        <p>Please signup or login</p>
        <Login liftToken={this.liftToken}/>
        <Signup liftToken={this.liftToken}/>
        </>
      );
    }
    return(
      <Router>
      {contents}
      </Router>
    );
  }

}



export default App;
