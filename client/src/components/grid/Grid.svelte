<script>
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import HiOutlineRefresh from 'svelte-icons-pack/hi/HiOutlineRefresh';
  import { records } from '../store/Records.js';
  import Cell from './Cell.svelte';
	import SearchControl from '../controls/search/SearchControl.svelte';
	import NeighbourhoodControl from '../controls/neighbourhood/NeighbourhoodControl.svelte';
	import CartIcon from '../cart/CartIcon.svelte';
	import CartPanel from '../cart/CartPanel.svelte';
  import Details from '../details/Details.svelte';

	let zoom = 1;

	let selected;

	let isCartOpen = false;

	const onChangeZoom = ({ detail }) => {
		// Value range is 0 to 1. Zoom is 1 to 1000
		zoom = detail * 999 + 1;
		const anchor = $records[12];
		records.setCenter(anchor, zoom);
	}

	const onCenter = ({ detail }) => {
		records.setCenter(detail, zoom);
		selected = null;
	}

	const onShuffle = () => {
		if (zoom === 1)
			records.randomize();
		else
			records.setCenter($records[12], zoom);
	}

	const onMoreLikeThis = ({ detail }) => {
		zoom = 1;
		isCartOpen = false;
		records.setCenter(detail, 1);
	}
</script>

<div out:fade class="app-container">
	<section class="top">
		<div class="inner">
			<div class="inner-left">
				<SearchControl 
					on:search={({ detail }) => records.search(detail) }/>

				<button 
					on:click={onShuffle}
					title="Neue Vorschläge">
					<Icon src={HiOutlineRefresh} />
				</button>
			</div>

			<div class="inner-right">
				<NeighbourhoodControl 
					value={(zoom - 1) / 999}
					on:change={onChangeZoom} />
				<CartIcon on:toggleCollection={() => isCartOpen = !isCartOpen} />
			</div>
		</div>
	</section>

	<section class="center">
		<ul class="grid-container">
			{#each $records as record, idx (record.id)}
				<li 
					animate:flip={{ delay: 10 * idx, duration: d => 30 * Math.sqrt(d) }}>

					<Cell 
						delay={10 * idx} 
						src={record.image_url} 
						museum={record.museum} 
						on:click={() => records.setCenter(record, zoom)}
						on:details={() => selected = record} />
				</li>
			{/each}
		</ul>
	</section>

	<section class="bottom"></section>

	{#if Boolean(selected)}
		<Details 
			record={selected} 
			on:close={() => selected = null} 
			on:center={onCenter} />
	{/if}

	{#if isCartOpen}
		<CartPanel 
			on:close={() => isCartOpen = false}
			on:moreLikeThis={onMoreLikeThis} 
			on:shareMyCollection />
	{/if}
</div>

<style>
	.app-container {
		height: 100vh;
		position: relative;
		overflow: hidden;
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

	section .inner-left {
		font-size: 30px;
		color: #fff;
		height: 100%;
		display: flex;
		align-items: center;
	}

	section .inner-left button {
		margin: 0 10px 0 10px;
		transition: opacity 0.2s;
	}

	section .inner-left button:disabled {
		opacity: 0.15;
	}

	:global(section .inner-left path) {
		stroke: #fff;
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