<template>
  <div class="col-2 p-0 text-center test">
    <nuxt-link :to="{path: '/' + date.slice(0, 10)}">
      <h5>{{ theWeekday(forecast.dt) }}</h5>
      <div class="row">
        <div class="col-12 col-md-6 text-center">
          <img :src="theIcon(forecast.weather[0].icon)" alt="weather icon" class="daily-icons">
        </div>
        <div class="col-12 col-md-6 text-center">
          <p>{{ Math.round(forecast.main.temp) }}°c</p>
        </div>
      </div>
    </nuxt-link>
  </div>
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

.daily-icons{
  width: 10vw;
}

</style>
