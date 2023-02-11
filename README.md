<h1 align="center">GLTF Optimizer</h1>

<div align="center">
  <img
    src="https://repository-images.githubusercontent.com/581755148/e31793f8-a960-45f0-887e-fffe5f68677f"
    alt=""
    width="300"
  />
</div>

<br />

<div align="center">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/GLTF-07C160?style=for-the-badge&logo=gltf&logoColor=white" alt="GLTF" />
</div>

<br />

<div align="center">
  <a href="https://codecov.io/gh/juunini/gltf-optimizer" > 
    <img src="https://codecov.io/gh/juunini/gltf-optimizer/branch/main/graph/badge.svg?token=46CB8BN45T"/> 
  </a>
</div>

---

## [Demo](https://juunini.github.io/gltf-optimizer)

## Caution

Only can compress `.glb` file now.  
Will be support `.gltf` soon.  

## Introduce

Optimize glTF.  
Draco compress and convert texture to WebP.  

Using [glTF-Transform](https://github.com/donmccurdy/glTF-Transform) and [webp-converter-browser](https://github.com/juunini/webp-converter-browser)

## Install

```bash
# If you want to use CLI
npm install --global gltf-optimizer

# npm
npm install gltf-optimizer

# yarn
yarn add gltf-optimizer

# pnpm
pnpm add gltf-optimizer

# bun
bun add gltf-optimizer

# If you install and use browser side
cp node_modules/gltf-optimizer/draco3d/* ./<your_static_path>/
```

## Usage

```ts
import { optimizer } from 'gltf-optimizer'

// ...

// node (backend side)
const glb = fs.readFileSync('./target.glb')
const optimized = await optimizer.node(glb, { /* options */ })
fs.writeFileSync('./compressed.glb', optimized)

// browser (frontend side)
const optimized = await optimizer.web(glb, { /* options */ })
// if using get-file-using-a-tag (https://github.com/juunini/get-file-using-a-tag)
download({ fileName: 'compressed.glb', arrayBuffer: optimized })
```

## Usage(CLI)

```bash
gltf-optimizer -i model.glb
gltf-optimizer -i model.glb -o ./output
```

## Command-Line Flags

| Flag | Description | Required |
|-|-|-|
| `--help`, `-h` | Display help | No |
| `--input`, `-i` | Path to the glTF or glb file. | :white_check_mark: Yes |
| `--output`, `-o` | Output path of the glTF or glb file. Separate resources will be saved to the same directory. | No, default `./` |
| `--emissiveStrength` | Emissive strength of the glTF file. | No, default `1.0` |
| `--draco.method` | `edgebreaker` or `sequential` | No, default `edgebreaker` |
| `--weld.tolerance` | Tolerance, as a fraction of primitive AABB, used when merging similar vertices. | No, default `0.0001` |
| `--simplify.enabled` | Enable/disable vertex simplification. | No, default `true` |
| `--simplify.ratio` | Target ratio (0-1) of vertices to keep. | No, default `0.75` |
| `--simplify.error` | Limit on error, as a fraction of mesh radius. | No, default `0.01` |
| `--texture.resize.resolution` | Maximum width/height to enforce, preserving aspect ratio. For example, a 4096x8192 texture, resized with limit [2048, 2048] will be reduced to 1024x2048. | No, default `1024` |
| `--texture.resize.filter` | Resampling filter method. LANCZOS3 is sharper, LANCZOS2 is smoother. | No, default `LANCZOS3` |
