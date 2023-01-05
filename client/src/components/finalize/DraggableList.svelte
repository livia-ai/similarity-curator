<script>
  import {flip} from 'svelte/animate';

  export let list;
  
  let hovering = false;

  const drop = (event, target) => {
    event.dataTransfer.dropEffect = 'move'; 
    const start = parseInt(event.dataTransfer.getData("text/plain"));
    const newTracklist = list

    if (start < target) {
      newTracklist.splice(target + 1, 0, newTracklist[start]);
      newTracklist.splice(start, 1);
    } else {
      newTracklist.splice(target, 0, newTracklist[start]);
      newTracklist.splice(start + 1, 1);
    }
    list = newTracklist
    hovering = null
  }

  const dragstart = (event, i) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.dropEffect = 'move';
    const start = i;
    event.dataTransfer.setData('text/plain', start);
  }

</script>

<div class="list">
  {#each list as n, index  (n.id)}
    <div
			 class="list-item" 
       animate:flip={{ duration: 200 }}
       draggable={true} 
       on:dragstart={event => dragstart(event, index)}
       on:drop|preventDefault={event => drop(event, index)}
       ondragover="return false"
       on:dragenter={() => hovering = index}
       class:is-active={hovering === index}>

       <img src={n.image_url} alt={n.title || `Thumbnail ${n.id}`}/>

    </div>
  {/each}
</div>

<style>
  .list {
    display: inline-block;
  }

  .list-item {
    display: block;
    padding: 0;
    display: inline-block;
    margin: 10px;
    cursor: move;
  }

  .list-item img {
    width: 160px;
    height: 160px;
    object-fit: cover;
    border-radius: 2px;
  }

  .list-item.is-active {
    background-color: #3273dc;
    color: #fff;
  }
</style>