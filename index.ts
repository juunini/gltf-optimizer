import shell from 'shelljs';
import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
// @ts-ignore
import flags from 'flags';

flags.defineString('input', '', 'Input glb file');
flags.defineString('output', '', 'Output path');
flags.defineInteger('draco.compressionLevel', 10, 'Draco compression level');
flags.defineInteger('quality', 50, 'Webp quality');

flags.parse();

const output = flags.get('output');
const outputWithoutExtension = output.replace('.glb', '').replace('.gltf', '');
const outputDirectory = outputWithoutExtension.substring(0, outputWithoutExtension.lastIndexOf('/'));

(async () => {
  shell.exec(`pnpm gltf-pipeline -i ${flags.get('input')} --draco.compressionLevel ${flags.get('draco.compressionLevel')} --draco.compressMeshes -s -o ${flags.get('output')}`);

	// @ts-ignore
	await imagemin([`${outputWithoutExtension}*.png`], {
		destination: outputDirectory,
		plugins: [
      // @ts-ignore
      imageminWebp({ quality: flags.get('quality') }),
		],
	});

	shell.sed('-i', 'image/png', 'image/webp', `${outputWithoutExtension}.gltf`);
	shell.sed('-i', '.png', '.webp', `${outputWithoutExtension}.gltf`);
	shell.rm(`${outputWithoutExtension}*.png`);
	shell.exec(`pnpm gltf-pipeline -i ${output} -b -o ${outputWithoutExtension}.glb`);
	shell.rm(`${outputWithoutExtension}.gltf`);
	shell.rm(`${outputWithoutExtension}.bin`);
	shell.rm(`${outputWithoutExtension}*.webp`);
})();
