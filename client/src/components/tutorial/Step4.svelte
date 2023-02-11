<script>
  import { createEventDispatcher } from 'svelte';

  export let lang; 

  const dispatch = createEventDispatcher();

  const header = {
    de: 'Kuratiere Deine Austellung',
    en: 'Curate your exhibition'
  };

  const text = {
    de: [
          `Nimm mindestens 5 Kunstwerke in deine Ausstellung auf. Du kannst Deiner fertigen
           Ausstellung auch einen Namen geben. Am Ende erhältst Du einen Link, den Du an Deine Freunde senden kannst, um Deine Ausstellung mit ihnen
           zu teilen.`,
          `Viel Spaß mit LiviaAI!`
        ],

    en: [
          `Choose at least 5 and at most 12 artworks for your exhibition. You can give your exhibition a title.
           LiviaAI will support you again, if you want.`,
          `As the last step, you will get a link you can send to your friends to share your exhibition with them. 
           Have fun with LiviaAI!`
        ]
  }

  const next = {
    de: 'Los geht\'s!',
    en: 'Let\'s go!'
  }
</script>

<div class="tutorial step step-4">
  <h1>{header[lang]}</h1>
  {#each text[lang] as paragraph}
    <p>{paragraph}</p>
  {/each}
  <button on:click={() => dispatch('done')}>{next[lang]}</button>
</div>