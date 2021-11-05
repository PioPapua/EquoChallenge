import Axios from 'axios'

const coins = ['BTCUSDT', 'ETHUSDT', 'ADAUSDT', 'LTCUSDT', 'AXSUSDT', 'BNBUSDT']

export const state = () => ({
  data: [],
  lastUpdate: '',
  singleCoin: {},
  isLoading: true
})
export const getters = {
  data: state => state.data,
  singleCoin: state => state.singleCoin,
  lastUpdate: state => state.lastUpdate,
  isLoading: state => state.isLoading
}
export const mutations = {
  setData (state, value) {
    state.data = value
  },
  setSingleCoin (state, value) {
    state.singleCoin = value
  },
  setLastUpdate (state, value) {
    state.lastUpdate = value
  },
  setIsLoading (state, value) {
    state.isLoading = value
  }
}
export const actions = {
  updateOrderedCoins ({ st, commit, getters }, coin) {
    const data = getters.data
    data.forEach((item) => {
      if (item.symbol === coin) {
        item.lastVisited = Date.now()
      }
    })
    commit('setData', data)
  },
  async loadSingleCoin ({ st, commit, getters }, coin) {
    commit('setIsLoading', true)
    const data = await Axios.get(`https://api2.binance.com/api/v3/ticker/24hr?symbol=${coin}`)

    if (data.status === 200) {
      commit('setSingleCoin', data.data)
    }
    commit('setIsLoading', false)
  },
  async loadCoins ({ st, commit, getters }) {
    const previousData = getters.data
    const data = await Axios.get('https://api2.binance.com/api/v3/ticker/24hr')

    if (data.status === 200) {
      const results = []
      data.data.forEach((item) => {
        if (coins.includes(item.symbol)) {
          results.push({
            symbol: item.symbol,
            pricechange: item.priceChange,
            weightedavgprice: item.weightedAvgPrice,
            bidprice: item.bidPrice,
            askprice: item.askPrice,
            openprice: item.openPrice,
            highprice: item.highPrice,
            lowprice: item.lowPrice,
            volume: item.volume,
            count: item.count
          })
        }
      })
      const postData = results.map(t1 => ({ ...t1, ...previousData.find(t2 => t2.symbol === t1.symbol) }))
      commit('setData', postData)
      const date = new Date().toISOString()
      commit('setLastUpdate', date)
    }
    commit('setIsLoading', false)
  }
}
