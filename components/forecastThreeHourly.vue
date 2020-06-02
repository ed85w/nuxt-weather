<template>
  <div>
    <img :src="theIcon(forecast.weather[0].icon)" alt="weather icon" width="50" height="50">
  </div>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    forecast: {
      type: Object
    }
  },
  methods: {
    // build url for weather icons
    theIcon (icon) {
      return 'http://openweathermap.org/img/wn/' + icon + '@2x.png'
    }
  }
}

</script>

<style>

</style>
