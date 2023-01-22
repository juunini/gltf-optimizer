<script lang="ts">
  export let disabled: boolean
  export let onClick: () => void
</script>

<button class="download-button" type="button" disabled={disabled} on:click={onClick}>Download</button>

<style>
  .download-button {
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    color: #333;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 0.375rem 0.75rem;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    white-space: nowrap;
  }

  .download-button:hover {
    background-color: #e6e6e6;
    border-color: #adadad;
  }

  .download-button:active {
    background-color: #e6e6e6;
    border-color: #adadad;
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  }

  .download-button:disabled {
    background-color: #e6e6e6;
    border-color: #adadad;
    color: #999;
    cursor: not-allowed;
  }
</style>
