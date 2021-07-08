import './App.scss';

import {
  addGround, initBabylon, makeAndAnimateCube, render
} from './Babylon'

import React, { Component } from 'react';
class App extends Component {

  componentDidMount() {
    let scene1stuff = initBabylon('canvaselement')
    scene1stuff.camera.attachControl(document.getElementById('canvaselement'), true)
    document.getElementById('canvaselement').focus()

    let scene2stuff = initBabylon('canvaselement2')
    scene2stuff.camera.attachControl(document.getElementById('canvaselement2'), true)

    scene1stuff.engine.runRenderLoop(render(scene1stuff))
    scene2stuff.engine.runRenderLoop(render(scene2stuff))

    addGround(scene1stuff)
    addGround(scene2stuff)
    makeAndAnimateCube(scene1stuff)
  }

  render() {
    return (
      <div className="App">

      </div>
    )
  }
}

export default App;
