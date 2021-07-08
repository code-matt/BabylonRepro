import { Scene, Engine, UniversalCamera, Vector3, Color3, Mesh, Animation } from '@babylonjs/core'
import { GridMaterial } from '@babylonjs/materials'

let canvas, engine, scene, camera

export function initBabylon () {
    canvas = document.getElementById('canvaselement');

    engine = new Engine(canvas);
    scene = new Scene(engine, {});
    scene.createDefaultSkybox()
    camera = new UniversalCamera("WVR", new Vector3(0, 4, -10), scene);
    
    camera.attachControl(document.getElementById('canvaselement'), true)

    window.addEventListener('resize', function(){
        engine.resize();
    });

    engine.runRenderLoop(render)
}

function render () {
    scene.render()
}

export function addGround () {
    var groundMaterial = new GridMaterial("groundMaterial", scene);
    groundMaterial.majorUnitFrequency = 1;
    groundMaterial.minorUnitVisibility = 0.1;
    groundMaterial.gridRatio = 1;
    groundMaterial.backFaceCulling = false;
    groundMaterial.mainColor = new Color3(1, 1, 1);
    groundMaterial.lineColor = new Color3(1.0, 1.0, 1.0);
    groundMaterial.opacity = 0.2;
    
    var ground = Mesh.CreateGround("ground1", 100, 100, 2, scene);
    ground.material = groundMaterial;
}

export function makeAndAnimateCube () {
    var box = Mesh.CreateBox("box", 2, scene, true)
    Animation.CreateAndStartAnimation("boxmove", box, "position", 30, 30, box.position, new Vector3(0, 2, 0), Animation.ANIMATIONLOOPMODE_RELATIVE)
}

export {
    canvas,
    engine,
    scene,
    camera,
}