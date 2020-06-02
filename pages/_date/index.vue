<template>
  <div class="container">
    <searchBar />
    <div class="row">
      <div class="col-12 col-md-8 test">
        {{ thisDayMidday[0] }}
      </div>
      <div class="col-12 col-md-4 test">
        <ForecastThreeHourly
          v-for="forecast of thisDayForecasts"
          :key="forecast.id"
          :forecast="forecast"
        />
      </div>
    </div>

    <div class="row">
      <nuxt-link to="/">
        <h1>Today</h1>
      </nuxt-link>
      <!-- daily forecast component  -->
      <ForecastDaily
        v-for="forecast of dailyMidday"
        :key="forecast.id"
        :forecast="forecast"
        :day="theWeekday(forecast.dt)"
        :date="forecast.dt_txt"
      />
    </div>
  </div>
</template>

<script>

import searchBar from '../../components/searchBar'
import ForecastDaily from '../../components/forecastDaily'
import ForecastThreeHourly from '../../components/forecastThreeHourly'

export default {
  components: {
    searchBar,
    ForecastDaily,
    ForecastThreeHourly
  },
  computed: {
    forecasts () {
      return this.$store.state.forecasts
    },
    thisDayForecasts () {
      const forecasts = this.forecasts
      const theDate = this.$route.params.date
      return forecasts.filter(forecast => forecast.dt_txt.slice(0, 10) === theDate)
    },
    thisDayMidday () {
      const forecasts = this.forecasts
      const theDate = this.$route.params.date
      return forecasts.filter(forecast => forecast.dt_txt.slice(0, 10) === theDate && forecast.dt_txt.slice(-8) === '12:00:00')
    },
    dailyMidday () {
      return this.$store.getters.dailyMidday
    }
  },
  methods: {
    // get the weekday from unix
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
