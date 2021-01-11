<template>
  <div>
    <client-only>
      <vue-gauge
        :value="value"
        :separator-step="0"
        :min="0"
        :max="1"
        :gauge-color="color"
        :scale-interval="1"
      >
        <div class="inner-text">
          {{ value.toFixed(2) * 100 }} %
        </div>
      </vue-gauge>
    </client-only>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: false,
      default: 0
    },
    title: {
      type: String,
      required: false,
      default: 'Title'
    },
    color: {
      type: String,
      required: false,
      default: '#8CDFAD'
    },
    innerText: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style scoped>
.inner-text {
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    margin-top: 60px;
    font-size: 22px;
    font-weight: 600;
    color: #de3a21;
}
</style>
