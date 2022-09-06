<!-- A double-sided card that can be used for transitions -->
<script>
  export let src;
  export let delay;

  const DURATION = 600;

  let frontSrc;
  let backSrc;

  $: {
    backSrc = src;

    if (frontSrc !== src) {
      setTimeout(() => { 
        frontSrc = src;
        backSrc = null;
      }, DURATION + delay);
    }  
  }
</script>

<div 
  class="card-container" 
  class:flipped={frontSrc === backSrc}
  class:flipping={backSrc && frontSrc !== backSrc}
  on:click>
  <div class="card" data-delay={`${delay}ms`}>
    <div class="front">
      {#if frontSrc}
        <img src={frontSrc} width="120" height="120" alt="Flippable front" />
      {/if}
    </div>
    <div class="back">
      {#if backSrc}
        <img src={backSrc} width="120" height="120" alt="Flippable back" />
      {/if}
    </div>
  </div>
</div>

<style>
  .card-container {
    perspective: 1000px;
  }

  .card-container.flipping .card {
    transform: rotateY(-180deg);
  }

  .card-container.flipped .card {
    transition: 800ms;
    transition-delay: 0ms;
  }

  .card-container, .front, .back {
    width: 120px;
    height: 120px;
  }

  .card {
    transition: 0.6s;
    transform-style: preserve-3d;
    position: relative;
    cursor: pointer;
    box-shadow: 0 0 18px rgba(0, 0, 0, 0.9);
  }

  .card img {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 3px;
    box-shadow: 0 0 24px rgba(0, 0, 0, 0.25);
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

  .front img, .back img {
    width: 120px;
    height: 120px;
    object-fit: cover;
  }

  .front {
    z-index: 2;
    transform: rotateY(0deg);
  }

  .back {
    transform: rotateY(180deg);
  }
</style>