<script>
	import DraggableList from './DraggableList.svelte';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import RiDesignDragMove2Fill from 'svelte-icons-pack/ri/RiDesignDragMove2Fill';
	import { collection } from '../store/MyCollection';

	let title;

	const onChangeTitle = evt => title = evt.target.value;

	const onShareCollection = () => {
		fetch('/api/collection', {
			method: 'POST',
    	headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
    	},
    	body: JSON.stringify($collection)
		}).then(res => res.json())
			.then(data => {
				// TODO - UI feedback
				console.log(data);
			})
			.catch(error => {
				// TODO - UI feedback
				console.error(error);
			});
	}
</script>

<div class="app-container">
	<main>
		<h1>Meine Sammlung</h1>

		<div class="enter-name">
			<input
				type="text" 
				placeholder="Gib Deiner Sammlung einen Namen..." 
				spellcheck="false" 
				on:input={onChangeTitle} />
		</div>

		<DraggableList list={$collection} />

		<p class="drag-instructions">
			Du kannst die Reihenfolge per <Icon src={RiDesignDragMove2Fill} /> Drag-and-Drop ändern.
		</p>

		<button 
			class="hero" 
			disabled={!title}
			on:click={onShareCollection}>
			Fertig!
		</button>
	</main>
</div>

<style>
  .app-container {
		height: 100vh;
		position: relative;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		color: #fff;
		text-shadow: 0 0 4px rgba(0, 0, 0, 0.8);
	}

	h1 {
		font-size: 1.8em;
	}

	input {
		background-color: transparent;
		outline: none;
		border-style: solid;
		border-color: #fff;
		border-width: 0 0 1px 0;
		width: 480px;
		padding: 5px 0;
		margin: 50px 0;
	}

	.drag-instructions {
		margin: 10px 0;
		text-shadow: none;
	}

	:global(.drag-instructions svg) {
		display: inline;
		fill: #fff;
	}

	button.hero {
		padding: 16px 70px;
    margin-top: 30px;
    border: 1px solid #fff;
    background-color: rgba(255, 255, 255, 0.08);
    font-size: 1.2em;
	}

	button.hero:hover {
		background-color: rgba(255, 255, 255, 0.12);
	}

	button.hero:disabled {
    background-color: transparent;
    border-color: rgba(255,255,255,0.2);
    color: rgba(255,255,255,0.2);
	}
</style>