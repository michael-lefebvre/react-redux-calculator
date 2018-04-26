import React, { PureComponent } from 'react'
import { connect }              from 'react-redux'
import classNames               from 'classnames'

import { isHistoryOpen }        from 'Store/Ui/Selectors'

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
      <div className={classNames('app', { 'ui-history': this.props.isHistoryOpen })}>
        <Calculator />
        <History />
      </div>
    )
  }
}

const mapStateToProps = ( state, ownProps ) => ({
  isHistoryOpen: isHistoryOpen( state )
})

export default connect( mapStateToProps, null )( Index )
