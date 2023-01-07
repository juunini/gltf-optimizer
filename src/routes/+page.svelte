<svelte:head>
	<title>Online glTF optimizer</title>
	<meta name="description" content="Optimize your glTF. Compress to Draco and convert texture to WebP" />
</svelte:head>

<script lang="ts">
	import { optimizer } from 'gltf-optimizer'
	import download from 'get-file-using-a-tag'

	function sizeToMB(size: number) {
		return (size / 1024 / 1024).toFixed(2)
	}

	async function onChangeFile() {
		const size = document.getElementById('size')!
		size.innerText = 'processing...'

		const file = document.getElementById('file') as HTMLInputElement
		const glb = await optimizer.web(new Uint8Array(await file.files![0].arrayBuffer()))
		size.innerText = `${sizeToMB(file.files![0].size)}MB => ${sizeToMB(new Blob([glb]).size)}MB`

		download({
			fileName: 'compressed.glb',
			arrayBuffer: glb,
		})
	}

</script>

<h1>glTF Optimizer</h1>
<a href="https://github.com/juunini/gltf-optimizer" target="_blank" rel="noreferrer">Link to GitHub</a>

<br />
<br />
<br />

<input type="file" id="file" accept=".glb" on:change="{onChangeFile}" />

<br />

<span id="size"></span>
