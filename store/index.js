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
  },
  updateQuery (state, query) {
    state.query = query
  }
}

export const actions = {
  async setForecasts ({ commit }) {
    const { data } = await axios.get(`${this.state.url_base}forecast?q=${this.state.query}&appid=${this.state.api_key}`)
    commit('SET_FORECASTS', data)
  },
  async setWeather ({ commit }) {
    const { data } = await axios.get(`${this.state.url_base}weather?q=${this.state.query}&units=metric&APPID=${this.state.api_key}`)
    commit('SET_WEATHER', data)
  }
}
