import axios from 'axios'

export const state = () => ({
  api_key: '840937906722893d2f73c00b953b1969',
  url_base: 'https://api.openweathermap.org/data/2.5/',
  query: '',
  weather: {},
  forecasts: []
})

export const mutations = {
  SET_WEATHER (state, value) {
    state.weather = value
  },
  SET_FORECASTS (state, value) {
    state.forecasts = value.list
  }
}

export const actions = {
  async setWeather ({ commit }) {
    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=leeds+&units=metric&APPID=840937906722893d2f73c00b953b1969')
    commit('SET_WEATHER', data)
  },
  async setForecasts ({ commit }) {
    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/forecast?q=leeds&appid=840937906722893d2f73c00b953b1969')
    commit('SET_FORECASTS', data)
  }
}

// export const mutations = {
//   fetchWeatherData: (state, query) => {
//     axios.get(`${state.url_base}weather?q=${query}+&units=metric&APPID=${state.api_key}`).then((response) => {
//       state.weather = response.data
//     })
//   }
// }

// axios.get(`${this.url_base}forecast?q=${this.query}&appid=${this.api_key}`).then((response2) => {
//   this.forecasts = response2.data.list
