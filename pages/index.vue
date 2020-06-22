<template>
  <div class="container-fluid" :class="typeof weather.main != 'undefined' && weather.main.temp > 16 ? 'warm' : typeof weather.main!= 'undefined' && weather.main.temp <= 16 ? 'cool' : 'initial'">
    <div class="row">
      <div class="container">
        <searchBar />
        <div v-if="typeof weather.main != 'undefined'">
          <div class="row">
            <div class="col-12 col-md-5 test">
              <div class="row">
                <div class="col-12 text-center">
                  <h5>{{ todayBuilder() }}</h5>
                </div>
                <div class="col-7 col-md-12 text-right text-md-center test">
                  <img :src="this.$theIcon(weather.weather[0].icon)" alt="weather icon" class="main-icon">
                </div>
                <div class="col-5 col-md-12 pl-0 pl-md-3 d-flex align-content-center flex-wrap test">
                  <div class="col-12 text-left text-md-center test">
                    <h1>{{ Math.round(weather.main.temp) }}°c</h1>
                  </div>
                  <div class="col-12 text-left text-md-center test">
                    <h5>{{ weather.weather[0].main }}</h5>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-7 test">
              <div class="row">
                <div class="col-12 test">
                  <div class="row">
                    <div class="col-12 text-center">
                      <h5>3 Hourly Forecast</h5>
                    </div>
                    <ForecastThreeHourly
                      v-for="forecast of threeHourlyToday"
                      :key="forecast.id"
                      :forecast="forecast"
                    />
                  </div>
                </div>
                <div class="col-12 test">
                  <div class="row d-flex justify-content-around">
                    <div class="col-12 pt-4 text-center">
                      <h5>Daily Forecasts</h5>
                    </div>
                    <div class="col-2 p-0 text-center test">
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
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      const weekday = new Date(timestamp * 1000).getDay()
      return days[weekday]
    }
  }
}
</script>

<style  lang="scss">
// .test {
//   border: 1px solid red;
// }
body {
  color: white;
}
.container-fluid{
  min-height: 100vh;
}
.initial {
  // background-color: red;
}
.warm{
  background-color: linear-gradient( 180deg,  rgba(202,50,50,1) 5.7%, rgba(252,195,12,1) 92.4% );
}
.cool{
  background-color: radial-gradient( circle farthest-corner at 10% 20%,  rgba(234,199,199,1) 0%, rgba(181,188,243,1) 99.3% );
}
.main-icon{
  width: 85%;
  filter: invert(99%) sepia(1%) saturate(7500%) hue-rotate(173deg) brightness(115%) contrast(101%); /*convert svg to white */
}

a:hover{
  color: black;
  text-decoration: none;

  .daily-icons {
    filter: none;
  }
}
.nuxt-link-exact-active {
  color: black;

  .daily-icons {
    filter: none;
  }

}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px){
  .main-icon {
    width: 50%;

  }
}

</style>
