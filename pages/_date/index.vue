<template>
  <div class="container-fluid" :class="typeof thisDayMidday != 'undefined' && thisDayMidday[0].main.temp > 16 ? 'warm' : 'cool'">
    <div class="row">
      <div class="container">
        <searchBar />
        <div v-if="typeof weather.main != 'undefined'" class="container">
          <div class="row">
            <div class="col-12 col-md-5 test">
              <div class="row">
                <div class="col-6 col-md-12 text-right text-md-center test">
                  <img :src="theIcon(thisDayMidday[0].weather[0].icon)" alt="weather icon" class="main-icon">
                </div>
                <div class="col-6 col-md-12 d-flex align-content-center flex-wrap test">
                  <div class="col-12 text-left text-md-center test">
                    <h1>{{ Math.round(thisDayMidday[0].main.temp) }}°c</h1>
                  </div>
                  <div class="col-12 text-left text-md-center test">
                    {{ thisDayMidday[0].weather[0].main }}
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-7 p-0 test">
              <div class="row">
                <div class="col-12 test">
                  <div class="row">
                    <ForecastThreeHourly
                      v-for="forecast of thisDayForecasts"
                      :key="forecast.id"
                      :forecast="forecast"
                    />
                  </div>
                </div>
                <div class="col-12 test">
                  <div class="row d-flex justify-content-around">
                    <div class="col-2">
                      <nuxt-link to="/">
                        <h5>Today</h5>
                        <div class="row">
                          <div class="col-12 col-md-6 text-center">
                            <img :src="theIcon(weather.weather[0].icon)" alt="weather icon" class="daily-icons">
                          </div>
                          <div class="col-12 col-md-6 text-center">
                            <p>{{ Math.round(weather.main.temp) }}°c</p>
                          </div>
                        </div>
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
    // get the weekday from unix
    theWeekday (timestamp) {
      const days = ['Sun', 'Mon', 'Tues', 'Weds', 'Thurs', 'Fri', 'Sat']
      const weekday = new Date(timestamp * 1000).getDay()
      return days[weekday]
    },
    // build url for weather icons
    theIcon (icon) {
      return '/' + icon + '.svg'
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
