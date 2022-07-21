import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FirstComponent from './components/examples/FirstComponent.jsx'
import SecondComponent from './components/examples/SecondComponent.jsx'
import Counter from './components/counter/Counter.jsx'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Counter/>
      </div>
    );
  }
}


class LearningComponents extends Component {
  render() {
    return (
      <div className="LearningComponents">
        Hello world
        <FirstComponent></FirstComponent>
        <SecondComponent></SecondComponent>
      </div>
    );
  }
}


export default App;
