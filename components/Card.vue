<template>
  <div class="card" style="margin: 15px 0">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img :src="image" alt="Kabupaten Tegal" />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ title }}</p>
          <p class="subtitle is-6">{{ description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "description", "image"],
};
</script>
