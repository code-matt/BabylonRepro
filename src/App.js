import './App.scss';

import {
  addGround,
  camera, initBabylon, makeAndAnimateCube
} from './Babylon'

import React, { Component } from 'react';
class App extends Component {

  componentDidMount() {
    initBabylon()
    camera.attachControl(document.getElementById('canvaselement'), true)
    document.getElementById('canvaselement').focus()
    addGround()
    makeAndAnimateCube()
  }

  render() {
    return (
      <div className="App">

      </div>
    )
  }
}

export default App;
