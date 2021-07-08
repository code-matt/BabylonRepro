import { Scene, Engine, UniversalCamera, Vector3, Color3, Mesh, Animation } from '@babylonjs/core'
import { GridMaterial } from '@babylonjs/materials'

export function initBabylon (canvasId) {
    let canvas, engine, scene, camera

    canvas = document.getElementById(canvasId);

    engine = new Engine(canvas);
    scene = new Scene(engine, {});
    scene.createDefaultSkybox()
    camera = new UniversalCamera("WVR", new Vector3(0, 2, -20), scene);
    
    camera.attachControl(document.getElementById(canvasId), true)

    window.addEventListener('resize', function(){
        engine.resize();
    });

    let box = Mesh.CreateBox("box", 2, scene, true)

    return { canvas, engine, scene, camera, box }
}

export function render ({ scene }) {
    return () => scene.render()
}

export function addGround ({ scene }) {
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

export function animateBox ({ box }) {
    Animation.CreateAndStartAnimation("boxmove", box, "position", 30, 30, new Vector3(0, 0, 0), new Vector3(0, 2, 0), Animation.ANIMATIONLOOPMODE_RELATIVE)
}