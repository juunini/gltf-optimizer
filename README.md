<h1 align="center">GLTF Optimizer</h1>

<div align="center">
  <img src="https://img.shields.io/badge/ThreeJs-black?style=for-the-badge&logo=three.js&logoColor=white" alt="ThreeJS" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
</div>

---

## Caution

This is not yet usable production version.  
Sample glb file from https://sketchfab.com/3d-models/472b965ae78244ad99e08528e52f3b6f

## Introduce

Developing a tool that optimizes GLTF in one run.  
Draco compression of GLTF, transforming Texture into Webp.

## Install

```bash
$ git clone https://github.com/juunini/gltf-optimizer.git
$ pnpm i
$ pnpm tsc
```

## Usage

```bash
$ node index.js --input ./sample/nanachi.glb --output ./output/nanachi.gltf
```
