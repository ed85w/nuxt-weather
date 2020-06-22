<template>
  <div v-if="typeof forecast != 'undefined'" class="col text-center test">
    <div class="row">
      <div class="col-12 p-0 text-center">
        <p class="small m-0">
          {{ forecast.dt_txt.slice(11,16) }}
        </p>
      </div>
      <div class="col-12 p-0 text-center">
        <img :src="this.$theIcon(forecast.weather[0].icon)" alt="weather icon" class="hourly-icons">
      </div>
      <div class="col-12 p-0 text-center">
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
  }
}

</script>

<style>

.hourly-icons{
  width: 8vw;
  filter: invert(99%) sepia(1%) saturate(7500%) hue-rotate(173deg) brightness(115%) contrast(101%); /*convert svg to white */
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px){
  .hourly-icons {
    width: 4vw;

  }
}

</style>
