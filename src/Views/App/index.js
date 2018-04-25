import React, { PureComponent } from 'react'

import Calculator               from 'Views/Calculator'
import History                  from 'Views/History'

import './styles.css'

class Index extends PureComponent {

  //
  // Life cycle
  // --------------------------------------------------

  //
  // Helpers
  // --------------------------------------------------

  //
  // Handlers
  // --------------------------------------------------

  //
  // Renders
  // --------------------------------------------------

  render() {

    return (
      <div className="app">
        <Calculator />
        <History />
      </div>
    )
  }
}

export default Index
