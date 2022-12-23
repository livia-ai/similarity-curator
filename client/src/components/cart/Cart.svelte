<script>
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import RiFinanceShoppingBasketLine from 'svelte-icons-pack/ri/RiFinanceShoppingBasketLine';

  let count = 0;

  let basket = [];

  const onClick = () => {
    console.log('basket:', basket);
  }
</script>

<button class="livia-cart" on:click="{onClick}">
  <div class="cart-icon">
    <Icon src={RiFinanceShoppingBasketLine} />
  </div>

  {#if count > 0}
    <span class="count">{count}</span>
  {/if}
</button>

<style>
  .livia-cart {
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
    top: -4px;
    right: -4px;
    justify-content: center;
    align-items: center;
    padding-bottom: 2px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    color: #fff;
    font-weight: bold;
    font-size: 14px;
  }
</style>