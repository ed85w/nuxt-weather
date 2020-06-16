<template>
  <div class="row">
    <div class="col d-flex align-items-center p-3 search-box" :class="typeof weather.main != 'undefined' ? 'top-screen' : 'mid-screen'">
      <input
        id="queryInput"
        v-model="query"
        type="text"
        class="search-bar"
        placeholder="Search for city"
        data-city-search
      >
    </div>
    <div class="col-12 col-md-7 text-center date-holder" :class="typeof weather.main != 'undefined' ? 'd-block' : 'd-none'">
      <h5>{{ todayBuilder() }}</h5>
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

    // or

    // const searchBox = new google.maps.places.Autocomplete(searchElement, options)
    // searchBox.addListener('places_changed', () => {
    //   const place = searchBox.getPlaces()[0]
    //   // eslint-disable-next-line no-console
    //   this.$store.commit('updateQuery', place.formatted_address)
    //   this.$store.dispatch('setToday')
    //   this.$store.dispatch('setWeather')
    //   this.$store.dispatch('setForecasts')
    // })
  },
  methods: {
    updateQuery (e) {
      this.$store.commit('updateQuery', e.target.value)
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

<style lang="scss">

.search-box {
  width: 100%;
  transition: 1.5s ease-out;

  .search-bar {
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
}
.search-box.mid-screen{
  height: 100vh;
}
.search-box.top-screen{
  height: 85px;
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
