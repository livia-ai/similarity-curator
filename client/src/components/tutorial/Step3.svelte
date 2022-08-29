<script>
  import { createEventDispatcher } from 'svelte';

  export let lang; 

  const dispatch = createEventDispatcher();

  const text = {
    de: `LiviaAI wird Dir zu jedem Kunstwerk ähnliche Werke zeigen, die sie mit ihrem Algorithmus in den 
         Sammlungen des Belvedere, des Museums für Angewandte Kunst und des Wien Museums gefunden hat.
         Klicke Dich von Kunstwerk zu Kunstwerk. LiviaAI wird dir immer weitere ähnliche Werke vorschlagen.
         Wenn Dir ein Werk besonders gefällt, wähle es für Deine Ausstellung aus.`,

    en: ``
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

<div class="tutorial step step-3">
  <p>
    {text[lang]}
  </p>
  <button>{next[lang]}</button>
  <button>{skip[lang]}</button>
</div>