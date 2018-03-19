import React from 'react';
import ReactDOM from 'react-dom';
import Options from '../../app/containers/Options';

chrome.storage.local.get('state', obj => {
  const { state } = obj;
  const initialState = JSON.parse(state);

  ReactDOM.render(
    <Options state={initialState} />,
    document.getElementById('root')
  )
})
