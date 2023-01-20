<script>
  export let src;

  export let alt;
</script>

<img src={src} alt={alt} />

<style> 
  img {
    width: 160px;
    height: 160px;
    object-fit: cover;
    border-radius: 2px;
  }
</style>