<script>
  import Grid from './grid/Grid.svelte';
  import Finalize from './finalize/Finalize.svelte';
  
  let done = false;
</script>

{#if done}
  <Finalize />
{:else}
  <Grid on:shareMyCollection={() => done = true}/>
{/if}