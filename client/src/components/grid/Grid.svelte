<script>
	import { flip } from 'svelte/animate';
  import { fade } from 'svelte/transition';
  import { records } from '../store/Store.js';
  import Cell from './Cell.svelte';
</script>

<div class="app-container">
	<section class="top">
		TOP SECTION
	</section>

	<section class="center">
		<ul class="grid-container">
			{#each $records as record, idx (record.id)}
				<li 
					animate:flip={{ delay: 10 * idx, duration: d => 30 * Math.sqrt(d) }} 
					on:click={() => records.setCenter(record) }>
					<Cell delay={10 * idx} src={record.image_url} museum={record.museum} />
				</li>
			{/each}
		</ul>
	</section>

	<section class="bottom">
		BOTTOM SECTION
	</section>
</div>

<style>
	.app-container {
		height: 100vh;
		position: relative;
	}

	section.top, section.bottom {
		height:70px;
	}

	section.center {
		height: calc(100vh - 140px);
		position: relative; 	
	}

	.grid-container {
		display: grid;
		gap: 8px;
		grid-template-columns: repeat(5, 0.2fr);
    position:relative;
	}

	ul {
		list-style-type: none;
		margin: 0 auto;
		padding: 0;
		width: calc(100vh - 140px);
		height: calc(100vh - 140px);
	}

  li {
    perspective: 1000px;
		position: relative;
  }
</style>