import axios from 'axios'

export const state = () => ({
  api_key: '840937906722893d2f73c00b953b1969',
  url_base: 'https://api.openweathermap.org/data/2.5/',
  query: '',
  weather: {},
  forecasts: [],
  today: ''
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
  },
  SET_TODAY (state, value) {
    state.today = value
  }
}

export const actions = {
  async setForecasts ({ commit }) {
    const { data } = await axios.get(`${this.state.url_base}forecast?q=${this.state.query}&units=metric&appid=${this.state.api_key}`)
    commit('SET_FORECASTS', data)
  },
  async setWeather ({ commit }) {
    const { data } = await axios.get(`${this.state.url_base}weather?q=${this.state.query}&units=metric&APPID=${this.state.api_key}`).catch(() => {
      // simple error catch
      alert('Unable to find forecast for this location, please try a different location')
    })
    commit('SET_WEATHER', data)
  },
  // sets todays date in correct format for filters
  setToday ({ commit }) {
    let today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const yyyy = today.getFullYear()
    today = yyyy + '-' + mm + '-' + dd
    commit('SET_TODAY', today)
  }
}

export const getters = {
  // fiter out remaining results for todays date from 3 hrly data
  threeHourlyToday: (state) => {
    const forecasts = state.forecasts
    return forecasts.filter(forecast => forecast.dt_txt.slice(0, 10) === state.today)
  },
  // filter out midday weather from 3hrly data for next 4 days (not today)
  dailyMidday: (state) => {
    const forecasts = state.forecasts
    return forecasts.filter(forecast => forecast.dt_txt.slice(-8) === '12:00:00' && forecast.dt_txt.slice(0, 10) !== state.today)
  }
}
