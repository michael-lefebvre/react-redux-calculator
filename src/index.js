import React                 from 'react'
import ReactDOM              from 'react-dom'
import { Provider }          from 'react-redux'
import registerServiceWorker from 'registerServiceWorker'

import Store                 from 'Store'
import App                   from 'Views/App'

import './Scss/index.css'

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
