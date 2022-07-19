import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FirstComponent from './components/examples/FirstComponent.jsx'
import SecondComponent from './components/examples/SecondComponent.jsx'

class App extends Component {
  render() {
    return (
      <div className="App">
        Hello world
        <FirstComponent></FirstComponent>
        <SecondComponent></SecondComponent>
      </div>
    );
  }
}





export default App;
