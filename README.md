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
$ npm install --global gltf-optimizer
```

## Usage

```bash
$ gltf-optimizer --help
```

## Command-Line Flags

|Flag|Description|Required|
|-|-|-|
|`--help`, `-h`|Display help|No|
|`--input`, `-i`|Path to the glTF or glb file.|:white_check_mark: Yes|
|`--output`, `-o`|Output path of the glTF or glb file. Separate resources will be saved to the same directory.|No|
|`--binary`, `-b`|Convert the input glTF to glb.|No, default `false`|
|`--json`, `-j`|Convert the input glb to glTF.|No, default `false`|
|`--separate`, `-s`|Write separate buffers, shaders, and textures instead of embedding them in the glTF.|No, default `false`|
|`--separateTextures`, `-t`|Write out separate textures only.|No, default `false`|
|`--stats`|Print statistics to console for output glTF file.|No, default `false`|
|`--keepUnusedElements`|Keep unused materials, nodes and meshes.|No, default `false`|
|`--keepLegacyExtensions`|When false, materials with `KHR_techniques_webgl`, `KHR_blend`, or `KHR_materials_common` will be converted to PBR.|No, default `false`|
|`--draco.compressMeshes`, `-d`|Compress the meshes using Draco. Adds the KHR_draco_mesh_compression extension.|No, default `false`|
|`--draco.compressionLevel`|Draco compression level [0-10], most is 10, least is 0. A value of 0 will apply sequential encoding and preserve face order.|No, default `7`|
|`--draco.quantizePositionBits`|Quantization bits for position attribute when using Draco compression.|No, default `11`|
|`--draco.quantizeNormalBits`|Quantization bits for normal attribute when using Draco compression.|No, default `8`|
|`--draco.quantizeTexcoordBits`|Quantization bits for texture coordinate attribute when using Draco compression.|No, default `10`|
|`--draco.quantizeColorBits`|Quantization bits for color attribute when using Draco compression.|No, default `8`|
|`--draco.quantizeGenericBits`|Quantization bits for skinning attribute (joint indices and joint weights) and custom attributes when using Draco compression.|No, default `8`|
|`--draco.unifiedQuantization`|Quantize positions of all primitives using the same quantization grid. If not set, quantization is applied separately.|No, default `false`|
|`--texture.webp.enabled`|Compress the texture using WebP.|No, default `true`|
|`--texture.webp.quality`|Set quality factor between 0 and 100.|No, default `75`|
|`--texture.webp.alphaQuality`|Set transparency-compression quality between 0 and 100.|No, default `100`|
|`--texture.webp.method`|Specify the compression method to use, between 0 (fastest) and 6 (slowest). This parameter controls the trade off between encoding speed and the compressed file size and quality.|No, default `4`|
|`--texture.webp.size`|Set target size in bytes.|No|
|`--texture.webp.sns`|Set the amplitude of spatial noise shaping between 0 and 100.|No, default `80`|
|`--texture.webp.filter`|Set deblocking filter strength between 0 (off) and 100.|No|
|`--texture.webp.autoFilter`|Adjust filter strength automatically.|No, default `false`|
|`--texture.webp.sharpness`|Set filter sharpness between 0 (sharpest) and 7 (least sharp).|No, default `0`|
|`--texture.webp.lossless`|Encode images losslessly.|No, default `false`|
|`--texture.webp.nearLossless`|Encode losslessly with an additional lossy pre-processing step, with a quality factor between 0 (maximum pre-processing) and 100 (same as lossless).|No, default `100`|
|`--texture.webp.crop`|Crop the image.|No|
|`--texture.webp.crop.x`||No|
|`--texture.webp.crop.y`||No|
|`--texture.webp.crop.width`||No|
|`--texture.webp.crop.height`||No|
|`--texture.webp.resize`|Resize the image. Happens after crop.|No|
|`--texture.webp.resize.width`||No|
|`--texture.webp.resize.height`||No|
|`--texture.webp.metadata`|A list of metadata to copy from the input to the output if present.|No, default `none`|
