import React, { PureComponent } from 'react'
import { connect }              from 'react-redux'

import { isHistoryOpen }        from 'Store/Ui/Selectors'

import Screen                   from './Screen'
import Keyboard                 from './Keyboard'

import './styles.css'

class Index extends PureComponent {

  // constructor( props )
  // {
  //   super( props )
  // }

  //
  // Life cycle
  // --------------------------------------------------

  componentDidMount()
  {
    console.log(this.props)
  }

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
      <div className="app__calculator">
        <div className="app__calculator__content">
          <Screen />
          <Keyboard />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ( state, ownProps ) => ({
  isHistoryOpen: isHistoryOpen( state )
})

export default connect( mapStateToProps )( Index )
