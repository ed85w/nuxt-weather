<template>
  <div>
    <h1>Hello</h1>
    <h1>{{ forecasts }}</h1>
  </div>
</template>

<script>

export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    forecast: {
      type: Object
    },
    day: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    }
  },
  computed: {
    forecasts () {
      return this.$store.state.forecasts
    }
  }
}
</script>

<style>

</style>
