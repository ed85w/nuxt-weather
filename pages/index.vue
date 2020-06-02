<template>
  <!-- <div class="container" :class="typeof weather.main != 'undefined' && weather.main.temp > 16 ? 'warm' : ''"> -->
  <div class="container">
    <searchBar />

    <div v-if="typeof weather.main != 'undefined'" class="row weather-wrap">
      <div class="col-12 col-md-8 test">
        <div class="weather-box">
          <div class="temp">
            {{ Math.round(weather.main.temp) }}°c
          </div>
          <div class="weather">
            {{ weather.weather[0].main }}
            <img :src="theIcon(weather.weather[0].icon)" alt="weather icon" width="200" height="200">
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4 test">
        <ForecastThreeHourly
          v-for="forecast of threeHourlyToday"
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
    // query: {
    //   get () {
    //     return this.$store.state.query
    //   },
    //   set (value) {
    //     this.$store.commit('updateQuery', value)
    //   }
    // }
  },
  // mounted () {
  //   // google places for search input - fires api calls on place change
  //   const searchElement = document.querySelector('[data-city-search]')
  //   // eslint-disable-next-line no-undef
  //   const searchBox = new google.maps.places.SearchBox(searchElement)
  //   searchBox.addListener('places_changed', () => {
  //     const place = searchBox.getPlaces()[0]
  //     // eslint-disable-next-line no-console
  //     this.$store.commit('updateQuery', place.formatted_address)
  //     this.$store.dispatch('setToday')
  //     this.$store.dispatch('setWeather')
  //     this.$store.dispatch('setForecasts')
  //   })
  // },
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
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: 'montserrat', sans-serif;
}
#app {
  background-image: url('../assets/cold-bg.jpg');
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
}
#app.warm {
  background-image: url('../assets/warm-bg.jpg');
}
main {
  min-height: 100vh;
  padding: 25px;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75));
}

.location-box .location {
  color: #FFF;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}
.location-box .date {
  color: #FFF;
  font-size: 20px;
  font-weight: 300;
  font-style: italic;
  text-align: center;
}
.weather-box {
  text-align: center;
}
.weather-box .temp {
  display: inline-block;
  padding: 10px 25px;
  color: #FFF;
  font-size: 102px;
  font-weight: 900;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  background-color:rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  margin: 30px 0px;
  box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}
.weather-box .weather {
  color: #FFF;
  font-size: 48px;
  font-weight: 700;
  font-style: italic;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}
</style>
