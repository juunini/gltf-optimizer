export const flagOptions = {
  input: {
    alias: "i",
    describe: "Path to the glTF or glb file.",
    type: "string",
    normalize: true,
    demandOption: true,
  },
  output: {
    alias: "o",
    describe:
      "Output path of the glTF or glb file. Separate resources will be saved to the same directory.",
    type: "string",
    normalize: true,
  },
  binary: {
    alias: "b",
    describe: "Convert the input glTF to glb.",
    type: "boolean",
    default: false,
  },
  json: {
    alias: "j",
    describe: "Convert the input glb to glTF.",
    type: "boolean",
    default: false,
  },
  separate: {
    alias: "s",
    describe:
      "Write separate buffers, shaders, and textures instead of embedding them in the glTF.",
    type: "boolean",
    default: false,
  },
  separateTextures: {
    alias: "t",
    describe: "Write out separate textures only.",
    type: "boolean",
    default: false,
  },
  stats: {
    describe: "Print statistics to console for output glTF file.",
    type: "boolean",
    default: false,
  },
  keepUnusedElements: {
    describe: "Keep unused materials, nodes and meshes.",
    type: "boolean",
    default: false,
  },
  keepLegacyExtensions: {
    describe:
      "When false, materials with KHR_techniques_webgl, KHR_blend, or KHR_materials_common will be converted to PBR.",
    type: "boolean",
    default: false,
  },
  "draco.compressMeshes": {
    alias: "d",
    describe:
      "Compress the meshes using Draco. Adds the KHR_draco_mesh_compression extension.",
    type: "boolean",
    default: false,
  },
  "draco.compressionLevel": {
    describe:
      "Draco compression level [0-10], most is 10, least is 0. A value of 0 will apply sequential encoding and preserve face order.",
    type: "number",
    default: 7,
  },
  "draco.quantizePositionBits": {
    describe:
      "Quantization bits for position attribute when using Draco compression.",
    type: "number",
    default: 11,
  },
  "draco.quantizeNormalBits": {
    describe:
      "Quantization bits for normal attribute when using Draco compression.",
    type: "number",
    default: 8,
  },
  "draco.quantizeTexcoordBits": {
    describe:
      "Quantization bits for texture coordinate attribute when using Draco compression.",
    type: "number",
    default: 10,
  },
  "draco.quantizeColorBits": {
    describe:
      "Quantization bits for color attribute when using Draco compression.",
    type: "number",
    default: 8,
  },
  "draco.quantizeGenericBits": {
    describe:
      "Quantization bits for skinning attribute (joint indices and joint weights) ad custom attributes when using Draco compression.",
    type: "number",
    default: 8,
  },
  "draco.uncompressedFallback": {
    describe: "Adds uncompressed fallback versions of the compressed meshes.",
    type: "boolean",
    default: false,
  },
  "draco.unifiedQuantization": {
    describe:
      "Quantize positions of all primitives using the same quantization grid defined by the unified bounding box of all primitives. If this option is not set, quantization is applied on each primitive separately which can result in gaps appearing between different primitives.",
    type: "boolean",
    default: false,
  },
  "texture.webp.enabled": {
    describe: "",
    type: "boolean",
    default: true,
  },
  "texture.webp.quality": {
    describe: "Set quality factor between 0 and 100.",
    type: "number",
    default: 75,
  },
  "texture.webp.alphaQuality": {
    describe: "Set transparency-compression quality between 0 and 100.",
    type: "number",
    default: 100,
  },
  "texture.webp.method": {
    describe: "Specify the compression method to use, between 0 (fastest) and 6 (slowest). This parameter controls the trade off between encoding speed and the compressed file size and quality.",
    type: "number",
    default: 4,
  },
  "texture,webp.size": {
    describe: "Set target size in bytes.",
    type: "number",
  },
  "texture.webp.sns": {
    describe: "Set the amplitude of spatial noise shaping between 0 and 100.",
    type: "number",
    default: 80,
  },
  "texture.webp.filter": {
    describe: "Set deblocking filter strength between 0 (off) and 100.",
    type: "number",
  },
  "texture.webp.autoFilter": {
    describe: "Adjust filter strength automatically.",
    type: "boolean",
    default: false,
  },
  "texture.webp.sharpness": {
    describe: "Set filter sharpness between 0 (sharpest) and 7 (least sharp).",
    type: "number",
    default: 0,
  },
  "texture.webp.lossless": {
    describe: "Encode images losslessly.",
    type: "boolean",
    default: false,
  },
  "texture.webp.nearLossless": {
    describe: "Encode losslessly with an additional lossy pre-processing step, with a quality factor between 0 (maximum pre-processing) and 100 (same as lossless).",
    type: "number",
    default: 100,
  },
  "texture.webp.crop": {
    describe: "Crop the image.",
    type: "string",
    example: "object { x: number, y: number, width: number, height: number }",
  },
  "texture.webp.resize": {
    describe: "Resize the image. Happens after crop.",
    type: "string",
    example: "object { width: number, height: number }",
  },
  "texture.webp.metadata": {
    describe: "A list of metadata to copy from the input to the output if present.",
    choices: ["all", "none", "exif", "icc", "xmp"],
  },
};
