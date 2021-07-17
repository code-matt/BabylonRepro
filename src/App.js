import './App.scss';

import {
  addGround, initBabylon, animateBox, render, addMesh, createMaterialPool
} from './Babylon'

import React, { Component } from 'react';
import { Animation } from '@babylonjs/core';
class App extends Component {

  componentDidMount() {
    this.init()

  }

  init = async () => {
    this.scene1stuff = initBabylon('canvaselement')
    this.scene1stuff.camera.attachControl(document.getElementById('canvaselement'), true)
    document.getElementById('canvaselement').focus()

    this.scene2stuff = initBabylon('canvaselement2')

    this.scene1stuff.engine.runRenderLoop(render(this.scene1stuff))
    this.scene2stuff.engine.runRenderLoop(render(this.scene2stuff))

    addGround(this.scene1stuff)
    addGround(this.scene2stuff)

    await createMaterialPool(this.scene1stuff)

    // addMesh(this.scene1stuff)
    // addMesh(this.scene2stuff)


    setInterval(() => {
      animateBox(this.scene1stuff)
      animateBox(this.scene2stuff)
    }, 1000)
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
