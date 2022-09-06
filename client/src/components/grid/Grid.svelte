<script>
	import { flip } from 'svelte/animate';
  import { fade } from 'svelte/transition';

  import { records } from '../store/Store.js';
  
  import Cell from './Cell.svelte';

</script>

<ul class="grid-container">
	{#each $records as record, idx (record)}
		<li 
			animate:flip={{ delay: 50*idx, duration: d => 30 * Math.sqrt(d) }} 
			out:fade
			on:click={() => console.log('click')}>
			<Cell delay={100*idx} record={record} />
		</li>
	{/each}
</ul>

<style>
	.grid-container {
		display: grid;
		gap: 12px;
		grid-template-columns: repeat(3, 1fr);
    position:relative;
	}

	ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
	}

  li {
    perspective: 1000px;
  }
</style>