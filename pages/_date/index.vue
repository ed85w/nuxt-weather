<template>
  <div class="container-fluid" :class="typeof thisDayMidday != 'undefined' && thisDayMidday[0].main.temp > 16 ? 'warm' : 'cool'">
    <div class="row">
      <div class="container">
        <searchBar />
        <div v-if="typeof weather.main != 'undefined'">
          <div class="row padded">
            <div class="col-12 col-md-5">
              <div class="row">
                <div class="col-12 text-center">
                  <h5>{{ theDay(thisDayMidday[0].dt) }}</h5>
                </div>
                <div class="col-7 col-md-12 text-right text-md-center">
                  <img :src="this.$theIcon(thisDayMidday[0].weather[0].icon)" alt="weather icon" class="main-icon">
                </div>
                <div class="col-5 col-md-12 pl-0 pl-md-3 d-flex align-content-center flex-wrap">
                  <div class="col-12 text-left text-md-center">
                    <h1>{{ Math.round(thisDayMidday[0].main.temp) }}°c</h1>
                  </div>
                  <div class="col-12 text-left text-md-center">
                    <h5>{{ thisDayMidday[0].weather[0].main }}</h5>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-7 pr-md-5">
              <div class="row">
                <div class="col-12">
                  <div class="row">
                    <div class="col-12 text-center">
                      <h5>3 Hourly Forecast</h5>
                    </div>
                    <ForecastThreeHourly
                      v-for="forecast of thisDayForecasts"
                      :key="forecast.id"
                      :forecast="forecast"
                    />
                  </div>
                </div>
                <div class="col-12">
                  <div class="row d-flex justify-content-around">
                    <div class="col-12 pt-4 text-center">
                      <h5>Daily Forecasts</h5>
                    </div>
                    <div class="col-2 p-0 text-center">
                      <nuxt-link to="/">
                        <p class="mb-1">
                          Today
                        </p>
                        <img :src="this.$theIcon(weather.weather[0].icon)" alt="weather icon" class="daily-icons">
                        <p>{{ Math.round(weather.main.temp) }}°c</p>
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
            </div>
          </div>
        </div>
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
    // create the date in reader friendly format
    theDay (timestamp) {
      const d = new Date(timestamp * 1000)
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
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      const weekday = new Date(timestamp * 1000).getDay()
      return days[weekday]
    }
  }
}
</script>

<style>
.warm{
  background: linear-gradient( 180deg,  rgba(202,50,50,1) 5.7%, rgba(252,195,12,1) 92.4% );
}
.cool{
  background: radial-gradient( circle farthest-corner at 10% 20%,  rgba(234,199,199,1) 0%, rgba(181,188,243,1) 99.3% );
}

</style>
