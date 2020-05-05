<template>
  <div class="col">
    <h5>{{ theWeekday(forecast.dt) }}</h5>
    <h5>{{ forecast.weather[0].main }}</h5>
  </div>
</template>

<script>
export default {
  name: 'Forecast',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    forecast: Object
  },
  methods: {
  // function to get the weekday from unix
    theWeekday (timestamp) {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const weekday = new Date(timestamp * 1000).getDay()
      return days[weekday]
    }
  }
}
</script>

<style>

</style>
