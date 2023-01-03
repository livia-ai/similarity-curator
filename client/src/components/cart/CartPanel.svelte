<script>
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import CgClose from 'svelte-icons-pack/cg/CgClose';
  import CgRadioCheck from 'svelte-icons-pack/cg/CgRadioCheck';
  import CgCheckO from 'svelte-icons-pack/cg/CgCheckO';
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
    <h1>Meine Sammlung</h1>
    <button on:click={() => dispatch('close')}>
      <Icon src={CgClose} />
    </button>
  </header>

  <main class:empty={$collection === 0}>
    {#if $collection.length === 0}
      <h2>
        Deine Sammlung ist leer.
      </h2>
      <p>
        Füge Deiner Sammlung Kunstwerke hinzu.
      </p>
    {:else}
      <p class="instructions">
        <Icon src={$collection.length > 4 ? CgCheckO : CgRadioCheck} /> Füge deiner Sammlung 5 bis 15 Kunstwerke zu.

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

  header {
    color: #fff;
    display: flex;
    padding: 20px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  header h1 {
    font-size: 1.8em;
  }

  p.instructions {
    padding: 0 20px 30px 20px;
  }

  p.instructions button {
    display: block;
    border: 2px solid #60bcff;
    padding: 10px;
    margin-top: 20px;
    background-color: rgb(0, 133, 204, 0.25);
    border-radius: 3px;
  }

  :global(p.instructions svg) {
    display: inline;
    font-size: 20px;
    vertical-align: text-top;
    padding-right: 3px;
  }

  table {
    width: 100%;
  }

  :global(.cart-panel header svg) {
    font-size: 30px;
  }
</style>