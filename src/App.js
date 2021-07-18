import './App.scss';

import {
  addGround, initBabylon, animateBox, render, addMesh, createMaterialPool
} from './Babylon'

import React, { Component } from 'react';
import { Animation, Vector3 } from '@babylonjs/core';
class App extends Component {

  componentDidMount() {
    this.init()

  }

  init = async () => {
    this.scene1stuff = initBabylon('canvaselement')
    this.scene1stuff.camera.attachControl(document.getElementById('canvaselement'), true)
    document.getElementById('canvaselement').focus()

    this.scene1stuff.engine.runRenderLoop(render(this.scene1stuff))

    addGround(this.scene1stuff)
    await createMaterialPool(this.scene1stuff)

    await addMesh(this.scene1stuff, 'lod_level_0/sector_5_4/', new Vector3())
    await addMesh(this.scene1stuff, 'lod_level_1/sector_4_4/', new Vector3(-3, 0, 0))
  }

  runAnimation = (key) => {
    animateBox(this[key])
  }

  render() {
    return null
  }
}

export default App;
