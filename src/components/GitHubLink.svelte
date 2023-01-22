<script>
  import icon from '../assets/github-mark.png'
</script>

<a href="https://github.com/juunini/gltf-optimizer" target="_new" id="githubLink">
  Link to <img src={icon} alt="GitHub" />
</a>

<style>
  #githubLink {
    position: absolute;
    top: 45px;
    right: -45px;
    transform: rotate(45deg);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 10px 60px;
    background: #fff;
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
    color: #000;
  }

  #githubLink img {
    height: 30px;
  }

  @media (max-width: 768px) {
    #githubLink {
      top: 30px;
      right: -110px;
      font-size: 1rem;
      padding: 10px 100px;
    }
  }
</style>