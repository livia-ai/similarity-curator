<script>
	import { flip } from 'svelte/animate';
  import { records } from '../store/Store.js';
  import Cell from './Cell.svelte';
	import NeighbourhoodControl from '../controls/neighbourhood/NeighbourhoodControl.svelte';

	let zoom;

	const onChangeZoom = ({ detail }) => {
		// Value range is 0 to 1. Zoom is 1 to 1000
		zoom = detail * 4999 + 1;
		const anchor = $records[12];
		records.setCenter(anchor, zoom);
	}
</script>

<div class="app-container">
	<section class="top">
		<div class="inner">
			<NeighbourhoodControl on:change={onChangeZoom} />
		</div>
	</section>

	<section class="center">
		<ul class="grid-container">
			{#each $records as record, idx (record.id)}
				<li 
					animate:flip={{ delay: 10 * idx, duration: d => 30 * Math.sqrt(d) }} 
					on:click={() => records.setCenter(record, zoom) }>
					<Cell delay={10 * idx} src={record.image_url} museum={record.museum} />
				</li>
			{/each}
		</ul>
	</section>

	<section class="bottom">

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

	section .inner {
		width: calc(100vh - 140px);
		height: 100%;
		margin: 0 auto;
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