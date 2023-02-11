<script>
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import AiOutlineSearch from 'svelte-icons-pack/ai/AiOutlineSearch';
  import ReadOnlyDetails from './ReadOnlyDetails.svelte';
  import ProxiedImage from '../controls/ProxiedImage.svelte';

  export let item;

  $: src = item.image_url;

  $: alt = item.title || `Thumbnail ${item.id}`;

  let showDetails = false;
</script>

<div class="image-wrapper">
  <div class="show-details">
    <button on:click={() => showDetails = true}>
      <Icon src={AiOutlineSearch} />
    </button>
  </div>

  <ProxiedImage class="thumbnail" src={src} alt={alt} />
</div>

{#if showDetails}
  <ReadOnlyDetails 
    item={item} 
    on:close={() => showDetails = false} />
{/if}

<style> 
  .image-wrapper {
    position: relative;
    border-radius: 5px;
  }

  .show-details {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: none;
    border-radius: 5px;
  }

  .image-wrapper:hover .show-details {
    display: block;
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.45);
    fill: #fff;
    font-size: 50px;
    border-radius: 5px;
  }

  .show-details button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    opacity: 0.65;
  }

  :global(.image-wrapper img.thumbnail) {
    width: 160px;
    height: 160px;
    object-fit: cover;
    border-radius: 5px;
  }
</style>