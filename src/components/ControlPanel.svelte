<script lang="ts">
  export let emissiveStrength: number
  export let weld: {
    tolerance: number
  }
  export let simplify: {
    enabled: boolean
    ratio: number
    error: number
  }
  export let texture: {
    resize: {
      resolution: number
      filter: string
    }
  }
  export let reCompress: () => Promise<void>
  export let disabledReCompress: boolean
</script>

<div class="box">
  <label>
    Emissive Strength
    <input type="number" bind:value={emissiveStrength} min="0" step="0.1" />
  </label>
</div>

<div class="box">
  <label>
    Simplify
    <input type="checkbox" bind:checked={simplify.enabled} />
  </label>

  <label>
    Simplify Ratio
    <input type="number" bind:value={simplify.ratio} disabled={!simplify.enabled} max="1" min="0" step="0.01" />
  </label>

  <label>
    Simplify Error
    <input type="number" bind:value={simplify.error} disabled={!simplify.enabled} max="1" min="0" step="0.01" />
  </label>
</div>

<div class="box">
  <label>
    Weld Tolerance
    <input type="number" bind:value={weld.tolerance} max="1" min="0" step="0.0001" />
  </label>
</div>

<div class="box">
  <label>
    Texture Resolution
    <input type="number" bind:value={texture.resize.resolution} />
  </label>
  <label>
    LANCZOS2
    <input
      type="radio"
      name="texture-resize-filter"
      value="LANCZOS2"
      checked={texture.resize.filter === 'LANCZOS2'}
      bind:group={texture.resize.filter}
    />
  </label>
  <label>
    LANCZOS3
    <input
      type="radio"
      name="texture-resize-filter"
      value="LANCZOS3"
      checked={texture.resize.filter === 'LANCZOS3'}
      bind:group={texture.resize.filter}
    />
  </label>
</div>

<div class="box">
  <button type="button" on:click={reCompress} disabled={disabledReCompress}>Re Compress</button>
</div>

<style>
  .box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    gap: 10px;
  }

  .box button, .box input[type="number"] {
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    color: #333;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 0.375rem 0.75rem;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    white-space: nowrap;
    min-width: 100px;
  }

  .box input[type="number"] {
    max-width: 120px;
    margin-left: 10px;
  }

  .box button:hover {
    background-color: #e6e6e6;
    border-color: #adadad;
  }

  .box button:active {
    background-color: #e6e6e6;
    border-color: #adadad;
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  }

  .box button:disabled, .box input[type="number"]:disabled {
    background-color: #e6e6e6;
    border-color: #adadad;
    color: #999;
    cursor: not-allowed;
  }
</style>
