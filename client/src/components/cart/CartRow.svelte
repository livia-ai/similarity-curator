<script>
  import { createEventDispatcher } from 'svelte';

  export let item;

  const MUSEUMS = {
    WM: 'Wien Museum',
    MAK: 'MAK',
    BEL: 'Belvedere'
  };

  const dispatch = createEventDispatcher();
</script>

<tr class="cart-item">
  <td>
    <a href={item.record_url} target="_blank">
      <img src={item.image_url} alt={item.title} />
    </a>
  </td>

  <td>
    <h5>
      {MUSEUMS[item.museum]}
    </h5>

    {#if item.title}
      <h4>{item.title}</h4>
    {/if}

    {#if item.description}
      <p>{item.description}</p>
    {/if}

    {#if !item.title && !item.description}
      <p>
        <em>Ohne Titel</em>
      </p>
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
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    color: #fff;
    min-width: 160px;
    padding: 20px;
    position: relative;
    vertical-align: top;
  }

  td:last-child {
    width: 99%;
  }

  td h5 {
    font-size: 0.8em;
  }

  td h4 {
    font-weight: 600;
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
    font-size: 0.8em;
  }
  
  td .actions button:hover {
    text-decoration: underline;
  }
</style>