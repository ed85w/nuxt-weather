<template>
  <div v-if="typeof forecast != 'undefined'" class="col-2 p-0 text-center test">
    <nuxt-link :to="{path: '/' + date.slice(0, 10)}">
      <p class="mb-1">
        {{ theWeekday(forecast.dt) }}
      </p>
      <img :src="this.$theIcon(forecast.weather[0].icon)" alt="weather icon" class="daily-icons">
      <p>{{ Math.round(forecast.main.temp) }}°c</p>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'ForecastDaily',
  props: {
    forecast: {
      type: Object,
      default () {
        return {}
      }
    },
    day: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    }
  },
  methods: {
    theWeekday (timestamp) {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      const weekday = new Date(timestamp * 1000).getDay()
      return days[weekday]
    }
  }
}
</script>

<style>

a {
  color: white;
}

.daily-icons{
  width: 10vw;
  filter: invert(99%) sepia(1%) saturate(7500%) hue-rotate(173deg) brightness(115%) contrast(101%); /*convert svg to white */
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px){
  .daily-icons {
    width: 5vw;

  }
}

</style>
