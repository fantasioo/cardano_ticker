import React, { Component } from 'react'
import PropTypes from 'prop-types'

import OptionsForm from '../components/OptionsForm'

export default class Options extends Component {
  static propTypes = {
    state: PropTypes.object.isRequired
  };

  render() {
    const { state } = this.props;

    return (
      <OptionsForm state={state} />
    )
  }
}
