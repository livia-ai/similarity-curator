<script>
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';

  const config = {
    duration: 180,
    easing: cubicOut
  };

  let right = tweened(-380, config);
  
  onMount(() => {
    $right = 0;
  });
</script>

<div class="cart-panel" style={`right: ${$right}px`}>

</div>

<style>
  .cart-panel {
    position: absolute;
    top: 0;
    width: 380px;
    height: 100%;
    background-image: linear-gradient(#9e9e9ee6,#3e3e3ecf);
    backdrop-filter: blur(3px);
    box-shadow: 0 0 120px rgb(0, 0, 0, 0.8);
  }
</style>