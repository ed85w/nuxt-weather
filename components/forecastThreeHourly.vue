<template>
  <div class="col col-md-12 p-0 text-center test">
    <div class="row">
      <div class="col-12 col-md-4 text-center">
        <p class="small m-0">
          {{ forecast.dt_txt.slice(11,16) }}
        </p>
      </div>
      <div class="col-12 col-md-4 text-center">
        <img :src="theIcon(forecast.weather[0].icon)" alt="weather icon" class="hourly-icons">
      </div>
      <div class="col-12 col-md-4 text-center">
        <p class="m-0">
          {{ Math.round(forecast.main.temp) }}°c
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    forecast: {
      type: Object
    }
  },
  methods: {
    // build url for weather icons
    theIcon (icon) {
      return 'http://openweathermap.org/img/wn/' + icon + '@2x.png'
    }
  }
}

</script>

<style>

.hourly-icons{
  width: 10vw;
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px){
  .hourly-icons {
    width: 5vw;
  }
}

</style>
