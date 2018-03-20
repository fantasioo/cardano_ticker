import React, { Component } from 'react'
import TradingViewWidget from 'react-tradingview-widget';

class Popup extends Component {
  constructor(props) {
    super(props)
    this.state = {exchangeService: 'exchange', pair: 'ADA-BTC', rate: 0}

    this.handleClose = this.handleClose.bind(this)
    this.listener()
  }

  listener() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.message === 'update') {
        const {exchangeService, pair, rate} = request
        this.setState({exchangeService, pair, rate})
      }
    })
  }

  handleClose() {
    window.close()
  }

  render() {
    const {state} = this.props
    const {exchangeService, pair, rate} = this.state

    return (
      <div>
        <div style={{padding: '5px'}} className="field is-grouped is-grouped-multiline">
          <div className="control is-marginless">
            <div style={{paddingRight: '15px'}} className="tags has-addons">
              <span className="tag is-medium is-dark">{exchangeService}</span>
              <span className="tag is-medium is-info">{pair}</span>
            </div>
          </div>
          <div className="control is-marginless">
            <div className="tags has-addons">
              <span className="tag is-medium is-dark">rate</span>
              <span className="tag is-medium is-light">{rate}</span>
            </div>
          </div>
          <div style={{position: 'fixed', top: '7px', right: '6px'}} className="control is-marginless">
            <a className="button is-small" href="options.html" target="_blank">Settings</a>
            <button className="button is-small" onClick={this.handleClose}>Close</button>
          </div>
        </div>
        {state.chart &&
          <TradingViewWidget
            width="780"
            height="550"
            interval="1"
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
}

export default Popup
