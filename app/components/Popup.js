import React, { Component } from 'react'
import TradingViewWidget from 'react-tradingview-widget';

function Popup({state}) {
  return (
    <div>
      <a className="button is-small" href="options.html" target="_blank">Settings</a>
      <button className="button is-small" onClick={() => window.close()}>Close</button>
      {state.chart &&
        <TradingViewWidget
          width="770"
          height="560"
          interval="30"
          timezone="Etc/Utc"
          theme={state.theme}
          style="1"
          locale="en"
          save_image="false"
          symbol={`${state.exchangeService}:${state.pair.replace('-', '')}`}
          allow_symbol_change="false"
          show_popup_button="false"
          hide_top_toolbar="true"
        />
      }
  </div>
  )
}

export default Popup
