<template>
  <div class="card" style="margin: 15px 0">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure v-if="title" class="image is-48x48">
            <img :src="image" alt="Kabupaten Tegal" />
          </figure>
          <b-skeleton v-else circle width="64px" height="64px"></b-skeleton>
        </div>
        <div class="media-content">
          <p v-if="title" class="title is-4">{{ title }}</p>
          <b-skeleton v-else width="20%" animated></b-skeleton>
          <p v-if="description" class="subtitle is-6">{{ description }}</p>
          <b-skeleton v-else width="80%" animated></b-skeleton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "description", "image", "isLoading"],
};
</script>
