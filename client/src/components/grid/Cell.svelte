<!-- A double-sided card that can be used for transitions -->
<script>
  import { createEventDispatcher } from 'svelte';
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import AiOutlineSearch from 'svelte-icons-pack/ai/AiOutlineSearch';
  import ProxiedImage from '../controls/ProxiedImage.svelte';

  const dispatch = createEventDispatcher();

  export let src;
  export let museum;
  export let delay;

  const DURATION = 600;

  let color;
  let frontSrc;
  let backSrc = src;

  let showButton = true;

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

  const onClickDetails = evt => {
    evt.stopPropagation(); 
    dispatch('details')
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
        {#if showButton}
          <div class="show-details">
            <button on:click={onClickDetails}>
              <Icon src={AiOutlineSearch} />
            </button>
          </div>
        {/if}

        <ProxiedImage 
          src={backSrc} 
          alt="Flippable back" />
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

  :global(.card img) {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 3px;
    box-shadow: 0 0 24px rgba(0, 0, 0, 0.4);
  }

  .front, .back {
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
  }

  :global(.back img) {
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

  .back .show-details {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: none;
  }

  .back:hover .show-details {
    display: flex;
  }

  .back .show-details button {
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.45);
    fill: #fff;
    padding: 10px;
    font-size: 26px;
    border-radius: 5px 0 0 0;
  }
</style>