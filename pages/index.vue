<template>
  <div :class="typeof weather.main != 'undefined' && weather.main.temp > 16 ? 'warm' : ''">
    <main>
      <div class="search-box">
        <input
          id="queryInput"
          v-model="query"
          type="text"
          class="search-bar"
          placeholder="Search..."
          data-city-search
        >
      </div>

      <div v-if="typeof weather.main != 'undefined'" class="weather-wrap">
        <!-- only displays if api call does not return undefined  -->
        <div class="location-box">
          <div class="location">
            {{ weather.name }}, {{ weather.sys.country }}
          </div>
          <div class="date">
            {{ todayBuilder() }}
          </div>
        </div>

        <div class="weather-box">
          <div class="temp">
            {{ Math.round(weather.main.temp) }}°c
          </div>
          <div class="weather">
            {{ weather.weather[0].main }}
            <img :src="theIcon(weather.weather[0].icon)" alt="weather icon" width="500" height="600">
          </div>
        </div>
        <div v-if="typeof threeHourlyToday != 'undefined'">
          <ForecastThreeHourly
            v-for="forecast of threeHourlyToday"
            :key="forecast.id"
          />
        </div>

        <div class="container">
          <div class="row">
            <!-- daily forecast component  -->
            <ForecastDaily
              v-for="forecast of dailyMidday"
              :key="forecast.id"
              :forecast="forecast"
              :day="theWeekday(forecast.dt)"
              :date="forecast.dt_txt"
            />
          </div>

          <div />
        </div>
      </div>
    </main>
  </div>
</template>

<script>

// import axios from 'axios'
import ForecastDaily from '../components/forecastDaily'
import ForecastThreeHourly from '../components/forecastThreeHourly'

export default {
  components: {
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
    },
    query: {
      get () {
        return this.$store.state.query
      },
      set (value) {
        this.$store.commit('updateQuery', value)
      }
    }
  },
  mounted () {
    // google places for search input - fires api calls on place change
    const searchElement = document.querySelector('[data-city-search]')
    // eslint-disable-next-line no-undef
    const searchBox = new google.maps.places.SearchBox(searchElement)
    searchBox.addListener('places_changed', () => {
      const place = searchBox.getPlaces()[0]
      // eslint-disable-next-line no-console
      this.$store.commit('updateQuery', place.formatted_address)
      this.$store.dispatch('setToday')
      this.$store.dispatch('setWeather')
      this.$store.dispatch('setForecasts')
    })
  },
  methods: {
    updateQuery (e) {
      this.$store.commit('updateQuery', e.target.value)
    },
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
.search-box {
  width: 100%;
  margin-bottom: 30px;
}
.search-box .search-bar {
  display: block;
  width: 100%;
  padding: 15px;

  color: #313131;
  font-size: 20px;
  appearance: none;
  border:none;
  outline: none;
  background: none;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0px 16px 0px 16px;
  transition: 0.4s;
}
.search-box .search-bar:focus {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 16px 0px 16px 0px;
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
