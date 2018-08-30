import React, { Component } from 'react';
import NavBar from './nav.js';
import Motor from './motor.js'

class App extends Component {
  render() {
    return (
      <div className="main-app">
        <NavBar />
        <Motor />
      </div>
    );
  }
}

export default App;
