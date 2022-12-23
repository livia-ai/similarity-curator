<script>
  import { createEventDispatcher } from 'svelte';
  import { collection } from '../store/MyCollection';
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import RiFinanceShoppingBasketLine from 'svelte-icons-pack/ri/RiFinanceShoppingBasketLine';

  const dispatch = createEventDispatcher();
</script>

<button class="livia-cart-control" on:click={() => dispatch('openCollection')}>
  <div class="cart-icon">
    <Icon src={RiFinanceShoppingBasketLine} />
  </div>

  {#if $collection.length > 0}
    <span class="count">{$collection.length}</span>
  {/if}
</button>

<style>
  .livia-cart-control {
    position: absolute;
    top: 22px;
    right: 10px;
    cursor: pointer;
  }
  .cart-icon {
    fill: #fff;
    font-size: 30px;
    position: relative;
  }

  .count {
    position: absolute;
    background-color: red;
    display: flex;
    top: -8px;
    right: -9px;
    justify-content: center;
    align-items: center;
    padding-bottom: 1px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    color: #fff;
    font-weight: bold;
    font-size: 12px;
  }
</style>