import { materialPool } from '.';

const pLimit = require('p-limit');
const limit = pLimit(1);

const WAIT_TIME_PER_TEXTURE_BLOB = 100

function Custom(loader) {
    this.name = "bitreel_pbr_lightbake";
    this.enabled = true;

    this.createMaterial = function (context, gltf_material, drawmode_number) {
        if (!materialPool.length) {
            return null
        } else {
            return materialPool.shift()
        }
    }

    this.loadMaterialPropertiesAsync = function (context, material, babylonMaterial) {
        var promises = [];

        if (material.name === "principled") {

            if (material.pbrMetallicRoughness && material.pbrMetallicRoughness.metallicFactor !== 0) {
                return null
            }


            promises.push(new Promise(resolve => loader.loadTextureInfoAsync(context + "/pbrMetallicRoughness/baseColorTexture", material.pbrMetallicRoughness.baseColorTexture, function (babylonTexture) {
                var emissive_input = babylonMaterial.getBlockByName("Emissive Texture");
                emissive_input.texture = babylonTexture;
                resolve(true)
            })))

            promises.push(new Promise(resolve => loader.loadTextureInfoAsync(context + "/normalTexture", material.normalTexture, function (babylonTexture) {
                var normal_input = babylonMaterial.getBlockByName("Normal Texture");
                normal_input.texture = babylonTexture;
                resolve(true)
            })))


            promises.push(new Promise(resolve => loader.loadTextureInfoAsync(context + "/pbrMetallicRoughness/metallicRoughnessTexture", material.pbrMetallicRoughness.metallicRoughnessTexture, function (babylonTexture) {
                var orm_input = babylonMaterial.getBlockByName("ORM Texture");
                orm_input.texture = babylonTexture;
                resolve(true)
            })))


            return Promise.all(promises)
        } else {
            return null
        }
    }
}

export default Custom