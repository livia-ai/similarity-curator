<!-- A double-sided card that can be used for transitions -->
<script>
  export let src;
  export let museum;
  export let delay;

  const DURATION = 600;

  let color;
  let frontSrc;
  let backSrc = src;

  // Runs file downloads through the server-side proxy
  const getDownloadUrl = url => url.includes('sammlung.wienmuseum.at') ? `/api/proxy?url=${url}` : url;

  $: {
    setTimeout(() => { 
      frontSrc = src;
    }, DURATION + delay);
  }

  $: {
    if (museum == 'WM')
      color = 'red';
    else if (museum === 'BEL')
      color = 'green';
    else if (museum === 'MAK')
      color = 'blue';
  }
</script>

<div 
  class="card-container" 
  class:flipped={frontSrc === backSrc}
  class:flipping={frontSrc !== backSrc}
  on:click>
  <div class="card" data-delay={`${delay}ms`}>
    <div class="front">

    </div>
    <div class="back">
      {#if backSrc}
        <div class="shading" 
          style={`background-color: ${color}`} />
        <img src={getDownloadUrl(backSrc)} width="120" height="120" alt="Flippable back" />
      {/if}
    </div>
  </div>
</div>

<style>
  .card-container {
    perspective: 1000px;
  }

  .card-container .card {
    transition: 1s;
    transform: rotateY(-180deg);
  }

  .card-container.flipping .card {
    transform: rotateY(-180deg);
  }

  .card-container.flipped .card {
    transform: rotateY(0deg);
  }

  .card-container, .front, .back {
    width: 100%;
    height: 100%;
  }

  .card {
    transform-style: preserve-3d;

    cursor: pointer;

    width: 100%;
    height: 100%;
  }

  .card img {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 3px;
    box-shadow: 0 0 24px rgba(0, 0, 0, 0.4);
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

  .back img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  .front {
    z-index: 2;
    transform: rotateY(-180deg);
    display: none;
  }

  .back {
    transform: rotateY(0deg);
  }

  .shading {
    border-radius: 3px;
    opacity: 0.2;
    position: relative;
    z-index: 1;
    display: none;
  }

  .card:hover .shading {
    display: none;
  }
</style>