import config from './config.json'
import getTicker from './background/api'
import badge from './background/badge'

chrome.runtime.onInstalled.addListener(details => {
  chrome.storage.local.set({ state: JSON.stringify(config) })
})


const intervalId = setInterval(ticker, 2000)

function ticker() {
  chrome.storage.local.get('state', obj => {
    console.log(obj)
    const { state } = obj;
    const { exchangeService, pair } = JSON.parse(state);
    getTicker(exchangeService, pair)
    .then(rate => {
      console.log(rate)
      badge(pair, rate, true)
    })
    .catch(console.log)
  })
}

