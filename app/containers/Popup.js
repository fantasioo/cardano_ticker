import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Popup from '../components/Popup'

export default class PopupContainer extends Component {
  static propTypes = {
    state: PropTypes.object.isRequired
  };

  render() {
    const { state } = this.props;

    return (
      <Popup state={state}/>
    )
  }
}
