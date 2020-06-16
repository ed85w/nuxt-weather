<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
export default {
  computed: {
    weather () {
      return this.$store.state.weather
    }
  },
  head () {
    return {
      bodyAttrs: {
        class: typeof this.weather.main === 'undefined' ? 'starting-bg' : ''
      }
    }
  }
}

</script>

<style>
.starting-bg {
  background: blueviolet;
}
</style>
