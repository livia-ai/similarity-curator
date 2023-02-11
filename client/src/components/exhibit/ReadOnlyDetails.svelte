<script>
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import CgClose from 'svelte-icons-pack/cg/CgClose';
  import WienMuseum from '../details/logos/WienMuseum.svelte';
    
  export let item;

  let wrapperEl; 

  const dispatch = createEventDispatcher();

  const onClick = evt => {
    if (evt.target === wrapperEl)
      dispatch('close');
  }
</script>

<div class="details-wrapper" 
  transition:fade={{ duration: 200 }}
  bind:this={wrapperEl}
  on:click={onClick}>

  <button 
    class="details-close"
    on:click={() => dispatch('close')}>
    <Icon src={CgClose} />
  </button>

  <div class="details">
    <div class="image-wrapper">
      <img class="preview" src={item.image_url} alt={item.title} />
    </div>

    {#if Boolean(item.title)}
      <h1>{item.title}</h1>
    {/if}

    <footer>
      {#if item.museum === 'MAK'}
        <button 
          data-tooltip="Im MAK ansehen"
          on:click={() => window.open(item.record_url, '_blank')}>
          <img class="logo" src="/assets/logo-mak.png" alt="MAK Wien" />
        </button>
      {:else if item.museum === 'WM'}
        <button 
          data-tooltip="Im Wien Museum ansehen"
          on:click={() => window.open(item.record_url, '_blank')}>
          <WienMuseum />
        </button>
      {:else if item.museum === 'BEL'}
        <button 
          data-tooltip="Im Belvedere ansehen"
          on:click={() => window.open(item.record_url, '_blank')}>
          <img class="logo" src="/assets/logo-belvedere.png" alt="Belvedere" />
        </button>
      {/if}
    </footer>
  </div>
</div>

<style>
  .details-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    background-image: linear-gradient(#5f5f5fd2,#444444d2);
    backdrop-filter: blur(6px);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
  }

  .details-close {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 34px;
    color: #ffffff7a;
  }

  .details-close:hover {
    color: #fff;
  }

  .details {
    width: 80%;
    max-width: 600px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    pointer-events: none;
  }

  .details * {
    pointer-events: all;
  }

  .details img.preview {
    max-width: 100%;
    max-height: calc(100vh - 400px);
    object-fit: contain;
    box-shadow: 
      0 0 20px rgb(0, 0, 0, 0.3), 
      0 20px 30px -20px rgb(0, 0, 0, 0.3),
      0 60px 40px -40px rgb(0, 0, 0, 0.2),
      0 120px 80px -20px rgb(0, 0, 0, 0.2);
  }

  .details h1 {
    text-align: center;
    font-size: 20px;
    padding: 20px 0;
    color: #fff;
    text-shadow: 0 0 8px rgb(0, 0, 0, 0.8);
  }

  .details footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    padding-top: 20px;
  }


  button img.logo {
    width: 220px;
    padding: 0 30px;
    opacity: 45%;
  }

  button:hover img.logo {
    opacity: 1;
  }

  [data-tooltip] {
    position: relative;
    z-index: 2;
    display: block;
  }

  [data-tooltip]:before,
  [data-tooltip]:after {
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
    transition: .2s ease-out;
    transform: translate(-50%, 5px)
  }

  [data-tooltip]:before {
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-bottom: 5px;
    padding: 7px;
    width: 200%;
    min-width: 70px;
    max-width: 250px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    background-color: #000;
    background-color: hsla(0, 0%, 20%, 0.9);
    color: #fff;
    content: attr(data-tooltip);
    text-shadow: none;
    text-align: center;
    font-size: 14px;
    line-height: 1.2;
    transition: .2s ease-out
  }

  [data-tooltip]:after {
    position: absolute;
    bottom: 100%;
    left: 50%;
    width: 0;
    border-top: 5px solid #000;
    border-top: 5px solid hsla(0, 0%, 20%, 0.9);
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    content: " ";
    font-size: 0;
    line-height: 0;
  }

  [data-tooltip]:hover:before,
  [data-tooltip]:hover:after {
    visibility: visible;
    opacity: 1;
    transform: translate(-50%, 0)
  }
</style>