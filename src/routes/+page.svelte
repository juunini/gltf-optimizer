<svelte:head>
	<title>Online glTF optimizer</title>
	<meta name="description" content="Optimize your glTF. Compress to Draco and convert texture to WebP" />
</svelte:head>

<script lang="ts">
	import type { PerspectiveCamera, Scene } from 'three';
	import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { onMount } from 'svelte'
	import { optimizer } from 'gltf-optimizer'
  import { filesize } from 'filesize'
	import download from 'get-file-using-a-tag'
  
	import Dropzone from '../components/Dropzone.svelte'
	import GithubLink from '../components/GitHubLink.svelte'
	import Header from '../components/Header.svelte';
	import DisplaySection from '../components/DisplaySection/DisplaySection.svelte';
	import DisplayArticle from '../components/DisplaySection/DisplayArticle.svelte';
	import DownloadButton from '../components/DownloadButton.svelte';
	import ControlPanel from '../components/ControlPanel.svelte';
	import { loadGLTF, newScene } from '../components/Scene'

  const COMPRESSED_FILE_NAME = 'compressed.glb'

  let file: File
	let scene1: Scene
	let scene2: Scene
  let camera1: PerspectiveCamera
  let camera2: PerspectiveCamera
	let canvas1: HTMLElement
	let canvas2: HTMLElement
  let fileName1: string = ''
  let fileName2: string = ''
  let size1: string = ''
  let size2: string = ''
  let gltf1: GLTF
  let gltf2: GLTF
  let downloadDisabled = true
  let optimizedGLB: ArrayBuffer

  let emissiveStrength = 1.0
  let weld = {
    tolerance: 0.0001
  }
  let simplify = {
    enabled: false,
    ratio: 0.75,
    error: 0.01
  }
  let texture = {
    resize: {
      resolution: 1024,
      filter: 'LANCZOS3'
    }
  }

	onMount(() => {
    const {scene: beforeScene, camera: beforeCamera, renderer: beforeRenderer, animate: beforeAnimate} = newScene()
    const {scene: afterScene, camera: afterCamera, renderer: afterRenderer, animate: afterAnimate} = newScene()

    scene1 = beforeScene
    scene2 = afterScene
    camera1 = beforeCamera
    camera2 = afterCamera
    canvas1 = beforeRenderer.domElement
    canvas2 = afterRenderer.domElement

    beforeAnimate()
    afterAnimate()
	})

	async function onChangeFile(files: FileList): Promise<void> {
		file = files[0]
    fileName1 = file.name
    fileName2 = COMPRESSED_FILE_NAME
    size1 = filesize(file.size, { base: 2, standard: 'jedec' }) as string
		const beforeOptimizeURL = URL.createObjectURL(file)

    gltf1 = await loadGLTF(beforeOptimizeURL, camera1)
    scene1.add(gltf1.scene)

		optimizedGLB = await optimizer.web(new Uint8Array(await file.arrayBuffer()), {
      emissiveStrength,
			transform: {
				simplify,
        weld,
        texture,
			}
		})
		const afterOptimizeURL = URL.createObjectURL(new Blob([optimizedGLB]))
    size2 = filesize(optimizedGLB.byteLength, { base: 2, standard: 'jedec' }) as string

    gltf2 = await loadGLTF(afterOptimizeURL, camera2)
    scene2.add(gltf2.scene)

    downloadDisabled = false
	}

  function onClickDownload(): void {
    download({
      fileName: COMPRESSED_FILE_NAME,
      arrayBuffer: optimizedGLB,
    })
  }

  async function reCompress() {
    scene2.remove(gltf2.scene)

    optimizedGLB = await optimizer.web(new Uint8Array(await file.arrayBuffer()), {
      emissiveStrength,
			transform: {
				simplify,
        weld,
        texture,
			}
		})
		const afterOptimizeURL = URL.createObjectURL(new Blob([optimizedGLB]))
    size2 = filesize(optimizedGLB.byteLength, { base: 2, standard: 'jedec' }) as string

    gltf2 = await loadGLTF(afterOptimizeURL, camera2)
    scene2.add(gltf2.scene)
  }
</script>

<Header />
<GithubLink />
<Dropzone onChangeFile={onChangeFile} />

<div style="display: flex; justify-content: center; align-items: center; margin: 20px;">
  <DownloadButton disabled={downloadDisabled} onClick={onClickDownload} />
</div>

<ControlPanel
  bind:emissiveStrength={emissiveStrength}
  bind:weld={weld}
  bind:simplify={simplify}
  bind:texture={texture}
  reCompress={reCompress}
  disabledReCompress={downloadDisabled}
/>

<DisplaySection>
	<DisplayArticle
    id="article1"
    fileName={fileName1}
    size={size1}
    scene={canvas1}
  />
	<DisplayArticle
    id="article2"
    fileName={fileName2}
    size={size2}
    scene={canvas2}
  />
</DisplaySection>

<style>
  * {
    box-sizing: border-box;
  }
</style>
