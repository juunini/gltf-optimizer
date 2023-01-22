<script lang="ts">
	import { onMount } from "svelte";


  export let id: string
  export let fileName: string
  export let size: string
  export let scene: HTMLElement

  onMount(() => {
    setTimeout(() => document.getElementById(id)!.appendChild(scene), 100)
  })
</script>

<article class="display-article" id={id}>
  <p>{fileName}</p>
  <p>{size}</p>
</article>

<style>
  .display-article {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .display-article p {
    margin: 0;
    margin-bottom: 20px;
  }
</style>
