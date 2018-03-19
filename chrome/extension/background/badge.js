function convertToSatoshi(rate) {
  return Math.floor(rate * 100000000).toString()
}

function sliceTextTo4(str) {
  const slice = -(str.length - 4)
  return (slice >= 0) ?
    str.slice(0, str.length) :
    str.slice(0, slice)
}

export default function badge(pair, rate, up) {
  const color = up ? '#080' : '#c45c50'
  const re = new RegExp('KRW|USD')
  let rateText = ''

  if (re.test(pair)) {
    rateText = sliceTextTo4(rate.toString())
  } else {
    rateText = sliceTextTo4(convertToSatoshi(rate))
  }

  chrome.browserAction.setBadgeText({text: rateText});
  chrome.browserAction.setBadgeBackgroundColor({color: color});
}
