import React                 from 'react'
import ReactDOM              from 'react-dom'
import registerServiceWorker from 'registerServiceWorker'

import App                   from 'Views/App'

import './Scss/index.css'

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

registerServiceWorker()
