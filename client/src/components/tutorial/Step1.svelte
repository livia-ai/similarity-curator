<script>
  import { createEventDispatcher } from 'svelte';

  export let lang; 

  const dispatch = createEventDispatcher();

  const header = {
    de: 'Willkommen bei LiviaAI!',
    en: 'Welcome to LiviaAI!'
  };

  const text = {
    de: `Entdecke Deinen persönlichen Pfad durch Wiens Kunstschätze. 
         Gestalte Deine eigene virtuelle Auststellung und teile sie mit Freunden.
         Unsere Künstliche Intelligenz LiviaAI unterstützt Dich dabei!`,

    en: `Discover your personal path through Vienna's cultural treasures.
         Curate your own virtual exhibition and share it with your friends.
         Our artifical intelligence LiviaAI will guide you on the way!`
  }

  const next = {
    de: 'So geht\'s',
    en: 'Here\'s how it works'
  }

  const skip = {
    de: 'Tutorial überspringen',
    en: 'Skip tutorial'
  }
</script>

<div class="tutorial step step-1">
  <h1>{header[lang]}</h1>
  <p>
    {text[lang]}
  </p>
  <button on:click={() => dispatch('next')}>{next[lang]}</button>
  <button class="skip" on:click={() => dispatch('done')}>{skip[lang]}</button>
</div>