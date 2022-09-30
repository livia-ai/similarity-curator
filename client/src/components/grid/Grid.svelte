<script>
	import { flip } from 'svelte/animate';
  import { fade } from 'svelte/transition';

  import { records } from '../store/Store.js';
  
  import Cell from './Cell.svelte';
</script>

<div class="app-container">
	<ul class="grid-container">
		{#each $records as record, idx (record.id)}
			<li 
				animate:flip={{ delay: 10 * idx, duration: d => 30 * Math.sqrt(d) }} 
				on:click={() => records.setCenter(record) }>
				<Cell delay={10 * idx} src={record.image_url} museum={record.museum} />
			</li>
		{/each}
	</ul>
</div>

<style>
	.app-container {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}

	.grid-container {
		display: grid;
		gap: 8px;
		grid-template-columns: repeat(5, 0.2fr);
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