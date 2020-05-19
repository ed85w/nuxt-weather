<template>
  <div>
    <h1>Hello</h1>
    <h1>{{ thisDayMidday[0].weather[0].main }}</h1>
    <ul>
      <li v-for="forecast in thisDayForecasts" :key="forecast.index">
        {{ forecast.weather[0].main }}
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  // props: {
  //   // eslint-disable-next-line vue/require-default-prop
  //   forecast: {
  //     type: Object
  //   },
  //   day: {
  //     type: String,
  //     default: ''
  //   },
  //   date: {
  //     type: String,
  //     default: ''
  //   }
  // },
  computed: {
    forecasts () {
      return this.$store.state.forecasts
    },
    thisDayForecasts () {
      const forecasts = this.forecasts
      const theDate = this.$route.params.day.slice(-10)
      return forecasts.filter(forecast => forecast.dt_txt.slice(0, 10) === theDate)
    },
    thisDayMidday () {
      const forecasts = this.forecasts
      const theDate = this.$route.params.day.slice(-10)
      return forecasts.filter(forecast => forecast.dt_txt.slice(0, 10) === theDate && forecast.dt_txt.slice(-8) === '12:00:00')
    }
  }
}
</script>

<style>

</style>
