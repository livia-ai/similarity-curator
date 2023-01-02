<script>
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';

  import { fade, fly } from 'svelte/transition';

  const config = {
    duration: 180,
    easing: cubicOut
  };

  let right = tweened(-380, config);
  

</script>

<div transition:fly="{{ x: 380, duration: 250 }}" class="cart-panel">

</div>

<style>
  .cart-panel {
    position: absolute;
    top: 0;
    right: 0;
    width: 380px;
    height: 100%;
    background-image: linear-gradient(#9e9e9ee6,#3e3e3ecf);
    backdrop-filter: blur(3px);
    box-shadow: 0 0 120px rgb(0, 0, 0, 0.8);
  }
</style>