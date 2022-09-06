<!-- 
Animation effect from
https://stackoverflow.com/questions/45665851/how-do-i-make-my-flipping-image-display-a-different-image-on-either-side-with-ja
-->
<script>
  import { fade } from 'svelte/transition';

  export let record;
  export let delay;

  const spin = (node, params) => ({
    duration: 600,
    delay,
    css: t => `transform: rotateY(${(1 - t) * 180}deg)`
  });

  console.log('CELL');
</script>

<div class="grid-cell">
  <div class="card-container">
    <div class="card" in:spin out:fade>
      <div class="front">
        <img src={record.image_url} width="220" height="220" alt="Random sample" />
      </div>
      <div class="back"></div>
    </div>
  </div>
</div>

<style>
  .card-container {
    width: 220px;
    height: 220px;
    perspective: 1000px;
  }

  .card {
    position: relative;
    transform-style: preserve-3d;
    cursor: pointer;
    box-shadow: 0 0 18px rgba(0, 0, 0, 0.9);
  }

  .card img {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 5px;
    box-shadow: 0 0 24px rgba(0, 0, 0, 0.25);
    transition: transform .2s ease-in-out;
  }

  .card:hover img {
    transform: scale(1.04,1.04);
  }

  .front, .back {
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
  }

  .front {
    z-index: 2;
    transform: rotateY(0deg);
  }

  .back {
    background: transparent;
    transform: rotateY(180deg);
  }
</style>