<script>
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import CgClose from 'svelte-icons-pack/cg/CgClose';
  import CgSearch from 'svelte-icons-pack/cg/CgSearch';

  const dispatch = createEventDispatcher();

  let isOpen = false;

  let inputEl;

  const onKeyDown = evt => {
    if (evt.key === 'Enter') 
      onSubmit();

    if (evt.key === 'Escape') {
      inputEl.value = '';
      isOpen = false;
    }
  }

  const onSubmit = () => { 
    isOpen = false;
    dispatch('search', inputEl.value);
  }
</script>

<button title="Suche" on:click={() => isOpen = true}>
  <Icon src={CgSearch} />
</button>

{#if isOpen}
  <div class="search-modal" transition:fade={{ duration: 150 }}>
    <button 
      class="search-close"
      on:click={() => isOpen = false}>
      <Icon src={CgClose} />
    </button>
    
    <div class="search-wrapper">
      <!-- svelte-ignore a11y-autofocus -->
      <input 
        id="search-input" 
        autofocus 
        spellcheck="false" 
        on:keydown={onKeyDown}
        bind:this={inputEl} />

      <button on:click={onSubmit}>
        <Icon src={CgSearch} />
      </button>
    </div>
  </div>
{/if}

<style>
  .search-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(#5f5f5fd2,#444444d2);
    backdrop-filter: blur(6px);
  }

  .search-close {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 34px;
    color: #ffffff7a;
  }

  .search-close:hover {
    color: #fff;
  }

  .search-wrapper {
    position: relative;
    width: 700px;
    max-width: 85%;
    position: relative;
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.8);
  }

  input {
    border: 2px solid #fff;
    background-color: transparent;
    outline: none;
    padding: 14px;
    color: #fff;
    width: 100%;
  }

  :global(.search-wrapper button) {
    position: absolute;
    top: 0;
    right: 20px;
    bottom: 0;
    margin: auto;
    font-size: 50px;
    color: #fff;
  }
</style>

