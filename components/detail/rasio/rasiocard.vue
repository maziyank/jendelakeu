<template>
  <article class="media">
    <figure class="media-left">
      <gauge :title="title" class="gauge" :value="value * 100 " :inner-text="`${value.toFixed(2) * 100} %` " :color="color"/>
    </figure>
    <div class="media-content">
      <div class="content">
        <p class="title is-6">
          {{ title }}
        </p>
        <p>{{ description }}</p>
      </div>
    </div>
  </article>
</template>

<script>
import gauge from './../overview/gauge'

export default {
  components: { gauge },
  props: {
    title: {
      type: String,
      required: true,
      default: ''
    },
    value: {
      type: Number,
      required: true,
      default: 0
    },
    description: {
      type: String,
      required: false,
      default: ''
    },
    color: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style scoped>
    .gauge{
        width: 100px;
        height: 70px;
    }

    .media-left {
        margin-bottom: 0 !important;
    }
</style>
