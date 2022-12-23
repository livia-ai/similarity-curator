<script>
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';

  export let from;
  export let to;

  const config = {
    duration: 250,
    easing: cubicOut
  };

  let top = tweened(from[1], config);

  let left = tweened(from[0], config);

  let scale = tweened(1, config);

  let opacity = tweened(1, config);

  onMount(() => {
    $top = to[1];
    $left = to[0];
    $scale = 0.5;
    $opacity = 0;
  });
</script>

<div class="to-cart-animation" 
  style={`top: ${$top}px; left:${$left}px; transform: scale(${$scale}); opacity:${$opacity};`}>

</div>

<style>
  .to-cart-animation {
    position: absolute;
    background-color: red;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-top: -30px;
    margin-left: -22px;
  }
</style>
