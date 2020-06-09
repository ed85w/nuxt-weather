<template>
  <div class="container">
    <searchBar />
    <div v-if="typeof weather.main != 'undefined'" class="wrapper">
      <div class="row">
        <div class="col-12 col-md-8 test">
          <div class="row">
            <div class="col-6 text-right test">
              <img :src="theIcon(weather.weather[0].icon)" alt="weather icon" width="100" height="100">
            </div>
            <div class="col-6 text-left test">
              {{ weather.weather[0].main }}
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              {{ Math.round(weather.main.temp) }}°c
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4 test">
          <div class="row">
            <ForecastThreeHourly
              v-for="forecast of threeHourlyToday"
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

import searchBar from '../components/searchBar'
import ForecastDaily from '../components/forecastDaily'
import ForecastThreeHourly from '../components/forecastThreeHourly'

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
    threeHourlyToday () {
      return this.$store.getters.threeHourlyToday
    },
    dailyMidday () {
      return this.$store.getters.dailyMidday
    }
  },
  methods: {
    // updateQuery (e) {
    //   this.$store.commit('updateQuery', e.target.value)
    // },
    // create todays date in reader friendly format
    todayBuilder () {
      const d = new Date()
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const day = days[d.getDay()]
      const date = d.getDate()
      const month = months[d.getMonth()]
      const year = d.getFullYear()
      return `${day} ${date} ${month} ${year}`
    },
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

.test{
  border: 1px solid red;
  transition: 1s ease-in;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: 'montserrat', sans-serif;
}
.wrapper{
}
</style>
