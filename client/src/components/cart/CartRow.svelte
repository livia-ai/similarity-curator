<script>
  import { createEventDispatcher } from 'svelte';

  export let item;

  const dispatch = createEventDispatcher();
</script>

<tr class="cart-item">
  <td>
    <a href={item.record_url} target="_blank">
      <img src={item.image_url} alt={item.title} />
    </a>
  </td>

  <td>
    {#if item.title}
      <h4>{item.title}</h4>
    {/if}

    {#if item.description}
      <p>{item.description}</p>
    {/if}

    <div class="actions">
      <button on:click={() => dispatch('delete', item)}>
        Löschen
      </button>
      
      &nbsp; | &nbsp; 

      <button on:click={() => dispatch('moreLikeThis', item)}>
        Weitere Kunstwerke wie dieses
      </button>
    </div>  
  </td>
</tr>

<style>
  img {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 2px;
  }

  td {
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    color: #fff;
    min-width: 160px;
    padding: 20px;
    position: relative;
    vertical-align: top;
  }

  td h4 {
    font-weight: 700;
  }

  td h4,
  td p {
    display: -webkit-box;
    line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  td .actions {
    position: absolute;
    bottom: 20px;
    left: 20px;
    font-size: 14px;
  }
  
  td .actions button:hover {
    text-decoration: underline;
  }
</style>