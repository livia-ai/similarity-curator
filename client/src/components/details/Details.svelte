<script>
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import CgClose from 'svelte-icons-pack/cg/CgClose';
  import RiFinanceShoppingBasketLine from 'svelte-icons-pack/ri/RiFinanceShoppingBasketLine';
  import RiDesignDragMoveLine from 'svelte-icons-pack/ri/RiDesignDragMoveLine';
  import { collection } from '../store/MyCollection';
  import ToCartAnimation from './ToCartAnimation.svelte';
  import WienMuseum from './logos/WienMuseum.svelte';
    
  export let record;

  console.log(record);

  let wrapperEl; 

  let animation;

  const dispatch = createEventDispatcher();

  const onClick = evt => {
    if (evt.target === wrapperEl)
      dispatch('close');
  }

  const onAddToCollection = evt => {
    const { clientX, clientY } = evt;

    const cartEl = document.querySelector('.livia-cart-control');
    const { x, y } = cartEl.getBoundingClientRect();

    animation = {
      from: [clientX, clientY],
      to: [x, y]
    };

    collection.add(record);

    setTimeout(() => dispatch('close'), 125);
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
      <img class="preview" src={record.image_url} alt={record.title} />
    </div>

    {#if Boolean(record.title)}
      <h1>{record.title}</h1>
    {/if}

    <footer>
      <section>
        <button 
          data-tooltip="Zu meiner Sammlung"
          on:click={onAddToCollection}>
          <Icon src={RiFinanceShoppingBasketLine} />
        </button>
      </section>

      <section>
        {#if record.museum === 'MAK'}
          <button 
            data-tooltip="Im MAK ansehen"
            on:click={() => window.open(record.record_url, '_blank')}>
            <img class="logo" src="/assets/logo-mak.png" alt="MAK Wien" />
          </button>
        {:else if record.museum === 'WM'}
          <button 
            data-tooltip="Im Wien Museum ansehen"
            on:click={() => window.open(record.record_url, '_blank')}>
            <WienMuseum />
          </button>
        {:else if record.museum === 'BEL'}
          <button 
            data-tooltip="Im Belvedere ansehen"
            on:click={() => window.open(record.record_url, '_blank')}>
            <img class="logo" src="/assets/logo-belvedere.png" alt="Belvedere" />
          </button>
        {/if}
      </section>

      <section>
        <button 
          class="move-to-center"
          data-tooltip="In die Mitte schieben"
          on:click={() => dispatch('center', record)}>
          <Icon src={RiDesignDragMoveLine} />
        </button>
      </section>
    </footer>
  </div>

  {#if Boolean(animation)}
    <ToCartAnimation {...animation} /> 
  {/if}
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

  section {
    font-size: 34px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
  }

  section button {
    cursor: pointer;
    color: rgba(255, 255, 255, 0.45);
    fill: rgba(255, 255, 255, 0.45);
    text-shadow: 0 0 8px rgb(0, 0, 0, 0.8);
    padding: 20px;
    border-radius: 4px;
  }

  section button:hover {
    color: #fff;
    fill: #fff;
    background-color: rgba(255, 255, 255, 0.15);
  }

  section button img.logo {
    width: 220px;
    padding: 0 30px;
    opacity: 45%;
  }

  section button:hover img.logo {
    opacity: 1;
  }

  :global(section button.move-to-center svg) {
    font-size: 42px;
    transform: rotateZ(45deg);
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