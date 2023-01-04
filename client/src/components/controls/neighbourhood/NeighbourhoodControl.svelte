<script>
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();

  export let value;

  const width = 200;
  const height = 40; 

  const minRadius = 3;
  const maxRadius = 14;

  let grabbed = false;
  
  $: offsetX = value * width;

  $: radius = minRadius + (maxRadius - minRadius) * value;

  let debounceTimer;

	const debounce = v => {
		clearTimeout(debounceTimer);

		debounceTimer = setTimeout(() => {
			dispatch('change', v);
		}, 250);
	}

  const onPointerDown = evt => {
    const { target } = evt;
    target.setPointerCapture(evt.pointerId);
    grabbed = true;
  }

  const onPointerMove = evt => {
    if (grabbed) {
      offsetX = Math.min(Math.max(0, evt.offsetX), width);
      
      value = offsetX / width;

      debounce(value);
    }
  }

  const onPointerUp = evt => {
    const { target } = evt;    
    target.releasePointerCapture(evt.pointerId);
    grabbed = false;
  }
</script>

<div class="neighbourhood">
  <svg width={width} height={height}>
    <line x1="0" y1="20" x2={width} y2={height / 2} />

    <g class="handle">
      <circle class="dot" cx={offsetX} cy={height / 2} r={radius} />
      <circle
        class="border" 
        cx={offsetX} 
        cy={height / 2}
        r={maxRadius}
        on:pointerdown={onPointerDown} 
        on:pointermove={onPointerMove} 
        on:pointerup={onPointerUp} />
    </g>
  </svg>
</div>

<style>
  .neighbourhood {
    position: absolute;
    right: 70px;
    bottom: 12px;
    width: 200px;
    height: 40px;
  }

  svg {
    overflow: visible;
  }

  line {
    stroke: rgba(255, 255, 255, 0.15);
    stroke-width: 5px;
    stroke-linecap: round;
  }

  .handle {
    cursor: move;
  }

  .handle circle.dot {
    stroke: none;
    fill: #fff;
  }

  .handle circle.border {
    fill: transparent;
    stroke: #fff;
    stroke-width: 2px;
  }
</style>