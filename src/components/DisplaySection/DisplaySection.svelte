<section class="display-section">
  <slot></slot>
</section>

<style>
  .display-section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 50px;
  }

  @media (max-width: 768px) {
    .display-section {
      flex-direction: column;
    }
  }
</style>
