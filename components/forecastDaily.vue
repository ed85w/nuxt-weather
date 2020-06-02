<template>
  <nuxt-link :to="{path: '/' + date.slice(0, 10)}">
    <div class="col">
      <h5>{{ theWeekday(forecast.dt) }}</h5>
      <img :src="theIcon(forecast.weather[0].icon)" alt="weather icon" width="50" height="50">
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'ForecastDaily',
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
  methods: {
    theWeekday (timestamp) {
      const days = ['Sun', 'Mon', 'Tues', 'Weds', 'Thurs', 'Fri', 'Sat']
      const weekday = new Date(timestamp * 1000).getDay()
      return days[weekday]
    },
    // build url for weather icons
    theIcon (icon) {
      return 'http://openweathermap.org/img/wn/' + icon + '@2x.png'
    }
  }
}
</script>

<style>

</style>
