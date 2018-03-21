import React, { Component } from 'react'
import { saveState } from '../utils/storage'
import Beer from './Beer'

const exchanges =
  {
    Binance: {
      chart: true,
      pairs: [
        'ADA-BTC',
        'ADA-ETH'
      ]
    },
    Bittrex: {
      chart: true,
      pairs: [
        'ADA-BTC',
        'ADA-ETH',
        'ADA-USDT'
      ]
    },
    Upbit: {
      chart: false,
      pairs: [
        'KRW-ADA',
        'BTC-ADA',
      ]
    },
    HitBTC: {
      chart: false,
      pairs: [
        'ADA-BTC',
        'ADA-ETH',
        'ADA-USD'
      ]
    }
  }

class OptionsForm extends Component {
  constructor(props) {
    super(props)
    this.state = this.props.state

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleExchangeChange = this.handleExchangeChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleExchangeChange(event) {
    const exchange = event.target.value
    const pair = exchanges[exchange].pairs[0]
    const chart = exchanges[exchange].chart

    this.setState({
      pair,
      chart,
      exchangeService: exchange
    })
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    saveState(this.state)
  }

  render() {
    return (
      <div className="container">
        <div>
          <h1 className="title">
            ADA Ticker - Options
          </h1>

          <form onSubmit={this.handleSubmit}>

            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Exchange service</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select
                        name="exchangeService"
                        value={this.state.exchangeService}
                        onChange={this.handleExchangeChange}>
                        {Object.keys(exchanges).map(exchange => <option key={exchange}>{exchange}</option>)}
                      </select>
                    </div>
                    {!exchanges[this.state.exchangeService].chart &&
                        <p className="help">This exchange is not compatible with Chart</p>
                    }
                  </div>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Pair</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select
                        name="pair"
                        value={this.state.pair}
                        onChange={this.handleInputChange}>
                      >
                        {exchanges[this.state.exchangeService].pairs.map(
                          pair => <option key={pair}>{pair}</option>
                        )}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Update delay</label>
              </div>
              <div className="field-body">
                <div className="field has-addons">
                  <p className="control">
                    <div className="select is-fullwidth">
                      <select
                        name="updateDelay"
                        value={this.state.updateDelay}
                        onChange={this.handleInputChange}>
                      >
                        <option>1</option>
                        <option>5</option>
                        <option>10</option>
                        <option>20</option>
                        <option>30</option>
                      </select>
                    </div>
                  </p>
                  <p className="control">
                    <a className="button is-static">
                      second
                    </a>
                  </p>
                </div>

              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label">
                <label className="label">Chart</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <label className="radio">
                      <input
                        type="checkbox"
                        name="chart"
                        checked={exchanges[this.state.exchangeService].chart && this.state.chart}
                        onChange={this.handleInputChange}
                        disabled={!exchanges[this.state.exchangeService].chart}
                      />
                      Yes
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Theme</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select
                        name="theme"
                        value={this.state.theme}
                        disabled={!exchanges[this.state.exchangeService].chart}
                        onChange={this.handleInputChange}>
                      >
                        <option>Light</option>
                        <option>Dark</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label"></div>
              <div className="field-body">
                <div className="field is-grouped">
                  <p className="control">
                    <input className="button is-primary" type="submit" value="Update" />
                  </p>
                </div>
              </div>
            </div>

          </form>

          <div style={{marginTop: '50px'}} className="field is-grouped is-grouped-multiline">
            <div className="field-label"></div>
            <div className="field-body">
              <div className="control">
                <div className="tags has-addons">
                  <span className="tag is-dark">
                    Buy me a beer&nbsp;&nbsp;
                    <Beer width="20" fill="#ccc"/>
                  </span>
                  <span className="tag is-warning">BTC</span>
                  <span className="tag is-info">1CL4hRq183mGWL4xHATnXehYkvticyE3hv</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default OptionsForm
