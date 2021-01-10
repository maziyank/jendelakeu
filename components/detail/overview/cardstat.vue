<template>
  <div class="box">
    <div class="media">
      <div class="media-left">
        <b-icon
          :icon="icon"
          size="is-large"
          :type="type"
        />
      </div>
      <div class="media-content">
        <p class="title is-4">
          {{ value }}
        </p>
        <p class="subtitle is-6">
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: false,
      default: 'is-info'
    }
  }
}
</script>
