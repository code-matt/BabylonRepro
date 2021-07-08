import './App.scss';

import {
  addGround, initBabylon, animateBox, render
} from './Babylon'

import React, { Component } from 'react';
class App extends Component {

  componentDidMount() {
    this.scene1stuff = initBabylon('canvaselement')
    this.scene1stuff.camera.attachControl(document.getElementById('canvaselement'), true)
    document.getElementById('canvaselement').focus()

    this.scene2stuff = initBabylon('canvaselement2')

    this.scene1stuff.engine.runRenderLoop(render(this.scene1stuff))
    this.scene2stuff.engine.runRenderLoop(render(this.scene2stuff))

    addGround(this.scene1stuff)
    addGround(this.scene2stuff)
    animateBox(this.scene1stuff)
    animateBox(this.scene2stuff)
  }

  runAnimation = (key) => {
    animateBox(this[key])
  }

  render() {
    return (
      <div className="App">
        <div className="buttons-container">
          <div className="button" onClick={() => this.runAnimation("scene1stuff")}>
            Animate Left
          </div>
          <div className="button" onClick={() => this.runAnimation("scene2stuff")}>
            Animate Right
          </div>
        </div>
      </div>
    )
  }
}

export default App;
