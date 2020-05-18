<template>
  <nuxt-link :to="{path: '/' + day + ' ' + date.slice(0, 10)}">
    <div class="col">
      <h5>{{ theWeekday(forecast.dt) }}</h5>
      <h5>{{ forecast.weather[0].main }}</h5>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'Forecast',
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
    // function to get the weekday from unix
    theWeekday (timestamp) {
      const days = ['Sun', 'Mon', 'Tues', 'Weds', 'Thurs', 'Fri', 'Sat']
      const weekday = new Date(timestamp * 1000).getDay()
      return days[weekday]
    }
  }
}
</script>

<style>

</style>
