<script>
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import CgClose from 'svelte-icons-pack/cg/CgClose';
  import CgRadioCheck from 'svelte-icons-pack/cg/CgRadioCheck';
  import CgCheckO from 'svelte-icons-pack/cg/CgCheckO';
  import CgSearch from 'svelte-icons-pack/cg/CgSearch';
  import RiFinanceShoppingBasketLine from 'svelte-icons-pack/ri/RiFinanceShoppingBasketLine';
  import { collection } from '../store/MyCollection';
  import CartRow from './CartRow.svelte';

  const dispatch = createEventDispatcher();

  const onDeleteItem = ({ detail }) =>
    collection.remove(detail);
</script>

<div 
  class="cart-panel" 
  transition:fly="{{ x: 380, duration: 250 }}">
  
  <header>
    {#if $collection.length > 0}
      <h1>Meine Sammlung ({$collection.length} Werke)</h1>
    {/if}
    <button on:click={() => dispatch('close')}>
      <Icon src={CgClose} />
    </button>
  </header>

  <main class:empty={$collection.length === 0}>
    {#if $collection.length === 0}
      <div>
        <div class="icon-wrapper">
          <Icon src={CgSearch} />
        </div>

        <h2>
          Deine Sammlung ist leer.
        </h2>

        <p>
          Bewege die Maus über die Bilder. Klicke das <Icon src={CgSearch} /> Icon für 
          die Detailansicht. Mit dem <Icon src={RiFinanceShoppingBasketLine} /> Icon nimmst Du 
          das Kunstwerk in Deine Sammlung auf.  
        </p>
      </div>
    {:else}
      <p class="instructions" class:ready={$collection.length > 4}>
        <Icon src={$collection.length > 4 ? CgCheckO : CgRadioCheck} /> Füge deiner Sammlung 5 oder mehr Kunstwerke zu.

        {#if $collection.length > 4}
          <button on:click={() => dispatch('shareMyCollection')}>
            Meine Sammlung teilen
          </button>
        {/if}
      </p>

      <table>
        <tbody>
          {#each $collection as item}
            <CartRow 
              item={item} 
              on:delete={onDeleteItem} 
              on:moreLikeThis />
          {/each}
        </tbody>
      </table>
    {/if}
  </main>
</div>

<style>
  .cart-panel {
    position: absolute;
    top: 0;
    right: 0;
    width: 640px;
    max-width: 80%;
    height: 100%;
    background-image: linear-gradient(#9e9e9ee6,#3e3e3ecf);
    backdrop-filter: blur(3px);
    box-shadow: 0 0 120px rgb(0, 0, 0, 0.8);
    overflow-y: auto;
    z-index: 1;
    color: #fff;
  }

  main.empty {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    box-sizing: border-box;
    padding: 0 40px;
  }

  main.empty > div {
    text-align: center;
    line-height: 1.8em;
  }

  main.empty h2 {
    font-size: 1.6em;
    padding-bottom: 0.65em;
  }

  :global(main.empty svg) {
    display: inline;
    font-size: 1.3em;
    fill: #fff;
  }

  :global(main.empty .icon-wrapper svg) {
    display: block;
    margin: 0 auto;
    font-size: 160px;
    color: rgba(255,255,255,0.35);
    padding: 20px;
  }

  header {
    color: #fff;
    display: flex;
  }

  header h1 {
    font-size: 1.8em;
    padding: 20px;
  }

  header button {
    position: absolute;
    top: 20px;
    right: 20px;
  }

  p.instructions {
    padding: 0 20px 30px 20px;
  }

  p.instructions button {
    display: block;
    border: 2px solid #00ff00;
    padding: 10px;
    margin-top: 20px;
    background-color: #00ff003b;
    border-radius: 3px;
  }

  :global(p.instructions svg) {
    display: inline;
    font-size: 20px;
    vertical-align: text-top;
    padding-right: 3px;
  }

  :global(p.instructions.ready svg) {
    color: #00ff00;
  }

  table {
    width: 100%;
  }

  :global(.cart-panel header svg) {
    font-size: 30px;
  }
</style>