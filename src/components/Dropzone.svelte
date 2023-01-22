<script lang="ts">
	import { onMount } from 'svelte'

  export let onChangeFile: (files: FileList) => Promise<void>
	let dropzoneInput: HTMLInputElement

	onMount(() => {
		dropzoneInput = document.getElementById('dropzoneInput') as HTMLInputElement
	})

	function onDrop(e: DragEvent): void {
		dropzoneInput.files = e.dataTransfer!.files
		onChangeFile(dropzoneInput.files!)
	}
	const onChange = () => onChangeFile(dropzoneInput.files!)
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	id="dropzone"
	on:dragover|preventDefault
	on:drop|preventDefault
	on:drop={onDrop}
	on:click={() => dropzoneInput.click()}
>
	Drag and drop your <code>.glb</code> file here

	<input
		type="file"
		accept=".glb"
		id="dropzoneInput"
		on:change={onChange}
	/>
</div>

<style>
	#dropzone {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 300px;
		border: 2px dashed #ccc;
		border-radius: 5px;
		background-color: #eee;
	}

	#dropzone code {
		margin: 0 10px;
	}

	#dropzoneInput {
		display: none;
	}
</style>
