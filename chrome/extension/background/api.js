function cleanMin(market) {
  return market.replace('-', '')
}

function inverse(market) {
  const split = market.split('-')
  return split[1] + '-' + split[0]
}

function binanceTicker(market) {
  return fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${cleanMin(market)}`)
    .then(res => res.json())
    .then(json => json.price)
}

function bittrexTicker(market) {
  return fetch('https://bittrex.com/api/v1.1/public/getticker', {
    body: JSON.stringify({market: inverse(market)}),
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(json => {
      if (json.result.Ask > 1) {
        // bittrexTicker api give weird result sometime so we redo the call
        return bittrexTicker(market)
      }
      return json.result.Ask
    })
}

function upbitTicker(market) {
  return fetch(`https://crix-api-endpoint.upbit.com/v1/crix/trades/ticks?code=CRIX.UPBIT.${market}`)
    .then(res => res.json())
    .then(json => json[0].tradePrice)
}

function hitbtcTicker(market) {
  return fetch(`https://api.hitbtc.com/api/2/public/ticker/${cleanMin(market)}`)
    .then(res => res.json())
    .then(json => json.ask)
}

const pointerFunction = {
  Binance: binanceTicker,
  Bittrex: bittrexTicker,
  Upbit: upbitTicker,
  HitBTC: hitbtcTicker
}

export default function getApi(exchange, market) {
  return pointerFunction[exchange](market)
}
