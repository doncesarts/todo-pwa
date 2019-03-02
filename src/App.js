import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import List from "./components/List";
import Profile from "./components/Profile";
import logo from "./logo.svg";
import greyProfileImg from './grey_profile.png'

import "./App.css";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      todoItem: '',
      offline: !navigator.onLine
    };
  }

  componentDidMount() {
    window.addEventListener('online',  this.setOfflineStatus)
    window.addEventListener('offline',  this.setOfflineStatus)
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.setOfflineStatus)
    window.removeEventListener('offline', this.setOfflineStatus)
  }
  setOfflineStatus = () => {
    this.setState({ offline: !navigator.onLine })
  }
  render() {
    return (
      <Router>
      <div className="App">
        <nav className="navbar navbar-light bg-light">
          <span className="navbar-brand mb-0 h1">
              <Link to="/">
                <img src={logo} alt="logo" style={{ height: 30 }} />
              </Link>
              Todo List
          </span>
          {this.state.offline && (
            <span className="badge badge-danger my-3">Offline</span>
          )}
            <span className="navbar-brand mb-0 h1">
              <Link to="/profile">
                <img src={greyProfileImg} alt="logo" style={{ height: 30 }} />
              </Link>
              Profile
            </span>
            <span>
          </span>
        </nav>
        <div className="px-3 py-2">
              <Route path="/" exact component={List} />
              <Route path="/profile" exact component={Profile} />
        </div>
      </div>
       </Router>
    );
  }
}

export default App;
