import yargs from 'yargs';

import { flagOptions } from './flagOptions';

const argv = yargs(process.argv.slice(2))
  .usage("Usage: gltf-optimizer -i inputPath -o outputPath")
  .example("gltf-optimizer", "-i model.gltf")
  .example("gltf-optimizer", "-i model.gltf -b")
  .example("gltf-optimizer", "-i model.glb -o ./output")
  .help("h")
  .alias("h", "help")
  .options(flagOptions)
  .parse();
