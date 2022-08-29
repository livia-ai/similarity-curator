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
</script>

<div class="tutorial">
  <svelte:component
    this={steps[step]}
    lang={lang}
    on:next={next} /> 
</div>

<style>
  .tutorial :global(.step) {
    
  }
</style>