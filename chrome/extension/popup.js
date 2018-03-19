import React from 'react';
import ReactDOM from 'react-dom';
import Popup from '../../app/containers/Popup';

chrome.storage.local.get('state', obj => {
  const { state } = obj;
  const initialState = JSON.parse(state);

  ReactDOM.render(
    <Popup state={initialState} />,
    document.getElementById('root')
  )
})
