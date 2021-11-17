<template>
  <div class="row">
    <div class="col d-flex flex-column justify-content-center text-center p-3 search-box" :class="typeof weather.main != 'undefined' ? 'top-screen' : 'mid-screen'">
      <h2 class="mb-5">
        Nuxt.js/Vue.js Weather
      </h2>
      <input
        id="queryInput"
        v-model="query"
        type="text"
        class="search-bar"
        placeholder="Search for city"
        data-city-search
      >
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    weather () {
      return this.$store.state.weather
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
    const options = {
      types: ['(cities)']
    }
    const searchElement = document.querySelector('[data-city-search]')
    // eslint-disable-next-line no-undef
    const searchBox = new google.maps.places.Autocomplete(searchElement, options)
    searchBox.addListener('place_changed', () => {
      const place = searchBox.getPlace()
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
    }
  }
}
</script>

<style>

.search-box {
  width: 100%;
  transition: 1s ease-out;
}

.search-box  .search-bar {
    display: block;
    width: 100%;
    padding: 7px 10px;
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

.search-box.mid-screen{
  height: 100vh;
}
.search-box.mid-screen h2 {
    display: block;
    color: #08003b;
}
.search-box.top-screen{
  height: 85px;
}

.search-box.top-screen h2 {
    display: none;
}

.search-box .search-bar:focus {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 16px 0px 16px 0px;
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px){

}

</style>
