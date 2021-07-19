import { Scene, Engine, UniversalCamera, Vector3, Color3, Mesh, Animation, SceneLoader, HemisphericLight, AbstractMesh, NodeMaterial } from '@babylonjs/core'
import { GridMaterial } from '@babylonjs/materials'
import "@babylonjs/loaders/glTF";
import { GLTF2 } from '@babylonjs/loaders/glTF';
import PBRExt from './extension'
import "@babylonjs/core/Debug/debugLayer"
import "@babylonjs/inspector";

export const materialPool = []
let pbrMaterial

GLTF2.GLTFLoader.RegisterExtension(
    "bitreel_pbr_lightbake",
    function (loader) {
        loader._parent.validate = false
        return new PBRExt(loader);
    }
);

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

    new HemisphericLight("HemiLight", new Vector3(0, 1, 0), scene);

    SceneLoader.OnPluginActivatedObservable.addOnce(function (loader) {
        if (loader.name === "gltf") {
            loader.useSRGBBuffers = false;
        }
    });


    return { canvas, engine, scene, camera }
}

export function render ({ scene }) {
    return () => scene.render()
}

export async function createMaterialPool ({ scene }) {
    return new Promise(async (resolve, reject) => {
        
        pbrMaterial = new NodeMaterial("pbrmaterial")
        await pbrMaterial.loadAsync("https://portal-external-dev.s3.amazonaws.com/2/2/shells/2/a7ceb6be-55cc-4582-add0-cc6f0764c4c3/shell_mat.json")
        pbrMaterial.getBlockByName("Occlusion Power").value = 0.5
        pbrMaterial.getBlockByName("Reflection Strength").value = 1.5
        pbrMaterial.getBlockByName("Roughness Power").value = 1.0
        pbrMaterial.build()
        materialPool.push(pbrMaterial)
        SceneLoader.LoadAssetContainer(
            "https://portal-external-dev.s3.amazonaws.com/3/3/shells/4/b57ba702-54a5-4d6c-be38-081bb1edbab6/lod_level_0/sector_4_1/",
            "sector.glb",
            scene,
            async (container) => {
                pbrMaterial.forceCompilation(container.meshes[1], () => {
                    for (let i = 0; i < 10; i++) {
                        var clone = pbrMaterial.clone("mat" + i, true);
                        materialPool.push(clone)   
                    }
                    resolve(true)
                })
            }
        )
    })
}

export function addMesh({scene}, sector, initialPosition) {
    return new Promise(async (resolve, reject) => {
        SceneLoader.LoadAssetContainer(
            "https://portal-external-dev.s3.amazonaws.com/3/3/shells/4/b57ba702-54a5-4d6c-be38-081bb1edbab6/" + sector,
            "sector.glb",
            scene,
            async (container) => {
                container.meshes[1].freezeWorldMatrix();
                container.meshes[1].doNotSyncBoundingInfo = true;
                container.meshes[1].cullingStrategy = AbstractMesh.CULLINGSTRATEGY_BOUNDINGSPHERE_ONLY  
                container.meshes[1].disableLighting = true
                container.addAllToScene()
                container.meshes[1].position = initialPosition
                resolve(true)
            }
        )
    })
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

export function animateBox ({ box, box2 }) {
    let animateable = Animation.CreateAndStartAnimation("boxmove", box, "position", 30, 30, box.position, new Vector3(0, 3 * Math.random(), 0), Animation.ANIMATIONLOOPMODE_RELATIVE)
    console.log(animateable)
    let animateable2 = Animation.CreateAndStartAnimation("boxrotate", box, "rotation", 30, 30, box.rotation, new Vector3(0, 5 * Math.random(), 0), Animation.ANIMATIONLOOPMODE_RELATIVE)

    let animateable3 = Animation.CreateAndStartAnimation("boxmove", box2, "position", 30, 30, box.position, new Vector3(-2, 3 * Math.random(), 0), Animation.ANIMATIONLOOPMODE_RELATIVE)
    let animateable4 = Animation.CreateAndStartAnimation("boxrotate", box2, "rotation", 30, 30, box.rotation, new Vector3(0, 5 * Math.random(), 0), Animation.ANIMATIONLOOPMODE_RELATIVE)
}