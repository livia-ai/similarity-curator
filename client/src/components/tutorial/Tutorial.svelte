<script>
  import Step1 from './Step1.svelte';
  import Step2 from './Step2.svelte';
  import Step3 from './Step3.svelte';
  import Step4 from './Step4.svelte';

  export let lang;

	const steps = [	Step1, Step2, Step3, Step4 ];

  let step = 0;

  const next = () =>
    step = Math.min(3, step + 1);

  const done = () => 
    window.location = '/search';
</script>

<div class="tutorial-wrapper">
  <svelte:component
    this={steps[step]}
    lang={lang}
    on:next={next} 
    on:done={done} /> 
</div>

<style>
  .tutorial-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  :global(.tutorial) {
    max-width: 840px;
    padding: 40px;
    color: #fff;
    font-size: 1.2em;
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.8);
    line-height: 160%;
  }

  :global(.tutorial h1) {
    font-size: 2em;
    padding-bottom: 1.5em;
  }

  :global(.tutorial p) {
    padding-bottom: 1.5em;
  }

  :global(.tutorial button) {
    padding-top: 1.5em;
  }

  :global(.tutorial button:not(.skip)) {
    padding: 0.3em 0.5em;
    margin-right: 0.5em;
    border: 2px solid #fff;
  }

  :global(.tutorial button:not(.skip):hover) {
    background-color: rgba(255, 255, 255, 0.25);
  }

  :global(.tutorial button.skip:hover) {
    text-decoration: underline;
  }
</style>