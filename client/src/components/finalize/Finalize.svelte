<script>
	import DraggableList from './DraggableList.svelte';
	import { collection } from '../store/MyCollection';
</script>

<div class="app-container">
	
  Finalize...

	<DraggableList list={$collection} />
</div>

<style>
  .app-container {
		height: 100vh;
		position: relative;
		overflow: hidden;
	}

	:global(.dragdroplist .list) {
		flex-direction: row !important;
	} 

	:global(.dragdroplist > .list > div.item) {
		display: inline;
	}
	
	:global(.dragdroplist div.buttons) {
		display: none !important;
	}
	
	:global(.dragdroplist div.content img) {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 2px;
	}
</style>