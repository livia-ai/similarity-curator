<!-- A double-sided card that can be used for transitions -->
<script>
  export let record;
  export let delay;

  const DURATION = 600;

  let frontSrc;
  let backSrc;

  $: {
    backSrc = record.image_url;

    if (frontSrc !== record.image_url) {
      setTimeout(() => { 
        frontSrc = record.image_url;
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
        <img src={frontSrc} width="220" height="220" alt="Flippable front" />
      {/if}
    </div>
    <div class="back">
      {#if backSrc}
        <img src={backSrc} width="220" height="220" alt="Flippable back" />
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
    transition: 0s;
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
    border-radius: 5px;
    box-shadow: 0 0 24px rgba(0, 0, 0, 0.25);
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