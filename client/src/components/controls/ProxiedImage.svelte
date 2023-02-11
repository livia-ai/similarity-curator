<script>
  export let src;

  export let alt;

  // Runs file downloads through the server-side proxy
  const getDownloadUrl = url => url.includes('sammlung.wienmuseum.at') ? `/api/proxy?url=${url}` : url;
</script>

<img class="{$$restProps.class || ''}" src={getDownloadUrl(src)} alt={alt} />