<script>
  import { createEventDispatcher } from 'svelte';

  export let lang; 

  const dispatch = createEventDispatcher();

  const text = {
    de: `Wähle zuerst einen Startpunkt. Suche nach einem Begriff - zum Beispiel einem bestimmten Künstler, 
         Thema oder Gegenstand - oder lass LiviaAI ein zufälliges Kunstwerk als Startpunkt für Dich wählen.`,

    en: `Choose a starting point for your journey. Search for a term - maybe a specific artist, theme or type
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
  <p>
    {text[lang]}
  </p>
  <button>{next[lang]}</button>
  <button>{skip[lang]}</button>
</div>