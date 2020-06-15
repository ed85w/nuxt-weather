<template>
  <div class="container">
    <searchBar />
    <div v-if="typeof weather.main != 'undefined'" class="wrapper">
      <div class="row">
        <div class="col-12 col-md-5 test">
          <div class="row">
            <div class="col-6 col-md-12 text-right text-md-center test">
              <img :src="theIcon(weather.weather[0].icon)" alt="weather icon" width="100" height="100">
            </div>
            <div class="col-6 col-md-12 d-flex align-content-center flex-wrap test">
              <div class="col-12 text-left text-md-center test">
                <h1>{{ Math.round(weather.main.temp) }}°c</h1>
              </div>
              <div class="col-12 text-left text-md-center test">
                {{ weather.weather[0].main }}
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-7 p-0 test">
          <div class="col-12 test">
            <div class="row">
              <ForecastThreeHourly
                v-for="forecast of threeHourlyToday"
                :key="forecast.id"
                :forecast="forecast"
              />
            </div>
          </div>
          <div class="col-12 test">
            <div class="row">
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
  },
  head () {
    return {
      bodyAttrs: {
        class: typeof this.weather.main !== 'undefined' ? 'cold' : 'hot'
      }
    }
  }

}
</script>

<style>
/* .test {
  border: 1px solid red;
} */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: 'montserrat', sans-serif;
  color: white;
  height: 100vh;
  /* cool night:  */
  /* background: linear-gradient( 180deg,  rgba(62,5,116,1) -5.2%, rgba(41,14,151,1) -5.2%, rgba(216,68,148,1) 103.3% ); */
  /* warm night  */
  /* background: linear-gradient( 180deg,  rgba(69,16,129,1) 1.6%, rgba(154,58,127,1) 40.4%, rgba(242,173,78,1) 73.5%, rgba(250,209,152,1) 99.2% ); */
  /* Warm day: */
/* background: linear-gradient( 180deg,  rgba(202,50,50,1) 5.7%, rgba(252,195,12,1) 92.4% ); */

}

.warm-day {
  background: linear-gradient( 180deg,  rgba(202,50,50,1) 5.7%, rgba(252,195,12,1) 92.4% );
}
.cool-day {
  background: radial-gradient( circle farthest-corner at 10% 20%,  rgba(234,199,199,1) 0%, rgba(181,188,243,1) 99.3% );
}

.wrapper{
}
</style>
