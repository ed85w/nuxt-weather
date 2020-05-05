<template>
  <div id="app" :class="typeof weather.main != 'undefined' && weather.main.temp > 16 ? 'warm' : ''">
    <main>
      <div class="search-box">
        <input
          v-model="query"
          type="text"
          class="search-bar"
          placeholder="Search..."
          @keypress="fetchWeather"
        > <!-- same as v-on:keypress -->
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
          </div>
        </div>

        <div class="container">
          <div class="row">
            <!-- forecast component  -->
            <Forecast v-for="forecast of dailyMidday" :key="forecast.id" :forecast="forecast" />
          </div>
        </div>

        <div />
      </div>
    </main>
  </div>
</template>

<script>

import axios from 'axios'
import Forecast from '../components/forecast'

export default {
  // name: 'App',
  components: {
    Forecast
  },
  data () {
    return {
      api_key: '840937906722893d2f73c00b953b1969',
      url_base: 'https://api.openweathermap.org/data/2.5/',
      query: '',
      weather: {},
      forecasts: []
    }
  },
  computed: {
    // filter out midday weather for next 5 days
    dailyMidday () {
      const forecasts = this.forecasts
      let today = new Date()
      const dd = String(today.getDate()).padStart(2, '0')
      const mm = String(today.getMonth() + 1).padStart(2, '0')
      const yyyy = today.getFullYear()
      today = yyyy + '-' + mm + '-' + dd
      return forecasts.filter(forecast => forecast.dt_txt.slice(-8) === '12:00:00' && forecast.dt_txt.slice(10) !== today)
    }
  },
  methods: {
    fetchWeather (ev) {
      if (ev.key === 'Enter') {
        axios.get(`${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`).then((response) => {
          this.weather = response.data
          axios.get(`${this.url_base}forecast?q=${this.query}&appid=${this.api_key}`).then((response2) => {
            this.forecasts = response2.data.list
            // console.log(this.forecast.list))
          })
        })
      }
    },
    todayBuilder () {
      const d = new Date()
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const day = days[d.getDay()]
      const date = d.getDate()
      const month = months[d.getMonth()]
      const year = d.getFullYear()
      return `${day} ${date} ${month} ${year}`
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
