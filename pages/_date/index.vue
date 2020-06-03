<template>
  <div class="container">
    <searchBar />
    <div v-if="typeof weather.main != 'undefined'" class="wrapper">
      <div class="row">
        <div class="col-12 col-md-8 test">
          <div class="row">
            <div class="col-6 text-right test">
              <img :src="theIcon(thisDayMidday[0].weather[0].icon)" alt="weather icon" width="100" height="100">
            </div>
            <div class="col-6 text-left test">
              {{ thisDayMidday[0].weather[0].main }}
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              {{ Math.round(thisDayMidday[0].main.temp) }}°c
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4 test">
          <div class="row">
            <ForecastThreeHourly
              v-for="forecast of thisDayForecasts"
              :key="forecast.id"
              :forecast="forecast"
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-2">
          <nuxt-link to="/">
            <h5>Today</h5>
            <img :src="theIcon(weather.weather[0].icon)" alt="weather icon" class="daily-icons">
          </nuxt-link>
        </div>
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
    weather () {
      return this.$store.state.weather
    },
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
