<script>
  import { createEventDispatcher } from 'svelte';

  export let lang; 

  const dispatch = createEventDispatcher();

  const header = {
    de: 'Wähle zuerst einen Startpunkt',
    en: 'Choose a starting point for your journey'
  };

  const text = {
    de: `Suche nach einem Begriff - zum Beispiel einem bestimmten Künstler, 
         Thema oder Gegenstand - oder lass LiviaAI ein zufälliges Kunstwerk als Startpunkt für Dich wählen.`,

    en: `Search for a term - maybe a specific artist, theme or type
         of object - or let LiviaAI choose a random work of art as your starting point.`
  }

  const next = {
    de: 'Weiter',
    en: 'Next'
  }

  const skip = {
    de: 'Tutorial überspringen',
    en: 'Skip tutorial'
  }
</script>

<div class="tutorial step step-2">
  <h1>{header[lang]}</h1>
  <p>
    {text[lang]}
  </p>
  <button on:click={() => dispatch('next')}>{next[lang]}</button>
  <button class="skip">{skip[lang]}</button>
</div>