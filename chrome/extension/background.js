import config from './config.json'
import getApi from './background/api'
import badge from './background/badge'

chrome.runtime.onInstalled.addListener(details => {
  chrome.storage.local.set({ state: JSON.stringify(config) })
})

let intervalId = null
let prev = null

function launchTicker() {
  chrome.storage.local.get('state', obj => {
    const { state } = obj;
    const { exchangeService, pair, updateDelay } = JSON.parse(state);
    prev = 0
    intervalId = setInterval(ticker, updateDelay * 1000, exchangeService, pair)
    ticker(exchangeService, pair)
  })
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'reload') {
    clearInterval(intervalId)
    launchTicker()
  }
})

function ticker(exchangeService, pair) {
  getApi(exchangeService, pair)
    .then(rate => {
      const message = {
        message: 'update',
        exchangeService,
        pair,
        rate
      }
      chrome.runtime.sendMessage(message)
      badge(pair, rate, prev <= rate)
      prev = rate
    })
    .catch(console.error)
}

launchTicker()
