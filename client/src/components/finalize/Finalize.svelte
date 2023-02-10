<script>
	import Confetti from 'svelte-confetti';
	import copy from 'copy-to-clipboard';
	import DraggableList from './DraggableList.svelte';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import RiDesignDragMove2Fill from 'svelte-icons-pack/ri/RiDesignDragMove2Fill';
	import { collection } from '../store/MyCollection';

	let title;

	const onChangeTitle = evt => title = evt.target.value;

	let link;

	let error;

	const onShareCollection = () => {
		fetch('/api/collection', {
			method: 'POST',
    	headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
    	},
    	body: JSON.stringify({
				title,
				items: $collection
			})
		}).then(res => res.json())
			.then(data => {
				link = `${window.location.origin}/${data.id}`;
				copy(link);
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

		{#if link}
			<div class="popup-wrapper">
				<div class="popup success">
					<Confetti x={[-1.5, 1.5]} amount={200} delay={[120, 220]} fallDistance="200px" />

					<h1>Gratulation!</h1>
					<p>
						Deine Sammlung ist jetzt unter diesem Link online:
					</p>

					<p>
						<a href={link} target="_blank">{link}</a>
					</p>

					<p>
						Wir freuen uns, dass Dich LiviaAI beim Zusammenstellen Deiner Ausstellung 
						unterstützen konnte, und hoffen es hat Spaß gemacht!
					</p>
				</div>
			</div>
		{:else if error}
			<div class="popup-wrapper">
				<div class="popup error">

				</div>
			</div>
		{/if}
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

	.popup-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
    background-image: linear-gradient(#9e9e9ef5,#3e3e3ee7);
    backdrop-filter: blur(3px);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 0;
	}

	.popup {
		position: relative;
		width: 90vw;
		height: 90vh;
		max-width: 800px;
		max-height: 640px;
		padding: 60px;
		color: #fff;
	}

	:global(.confetti-holder) {
		position: absolute !important;
		top: 40px;
		left: 50%;
		z-index: 1;
	}


	.popup h1 {
		font-size: 2.5em;
	}

	.popup p {
		padding: 30px 0;
		font-size: 1.2em;
		line-height: 160%;
	}
</style>