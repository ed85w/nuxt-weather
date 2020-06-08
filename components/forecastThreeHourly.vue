<template>
  <div class="col col-md-12 p-0 text-center test">
    <p>{{ forecast.dt_txt.slice(11,16) }}</p>
    <img :src="theIcon(forecast.weather[0].icon)" alt="weather icon" class="hourly-icons">
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

.hourly-icons{
  width: 10vw;
}

</style>
