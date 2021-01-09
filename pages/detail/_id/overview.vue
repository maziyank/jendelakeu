<template>
  <div>
    <p>Overview</p>
    <p>{{ doc }}</p>
  </div>
</template>

<script>
// import xpath from 'xpath'

export default {
  props: ['doc'],
  watch: {
    doc () {}
  }
}
</script>
