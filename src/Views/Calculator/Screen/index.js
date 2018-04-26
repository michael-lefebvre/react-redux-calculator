import React, { PureComponent } from 'react'
import { bindActionCreators }   from 'redux'
import { connect }              from 'react-redux'
import classNames               from 'classnames'

import { isHistoryOpen }        from 'Store/Ui/Selectors'
import Actions                  from 'Store/Actions'

import { withOperation }        from '../Provider'

import './styles.css'

const { Ui: { openHistory } } = Actions

class Index extends PureComponent {

  constructor( props )
  {
    super( props )

    this.handleHistoryTrigger = this.handleHistoryTrigger.bind( this )
  }

  //
  // Life cycle
  // --------------------------------------------------

  // componentDidMount()
  // {
  // }

  //
  // Helpers
  // --------------------------------------------------

  //
  // Handlers
  // --------------------------------------------------

  handleHistoryTrigger()
  {
    if( this.props.isHistoryOpen )
      return

    this.props.openHistory()
  }

  //
  // Renders
  // --------------------------------------------------

  render() {

    const { isHistoryOpen, Operation } = this.props

    const buttonClassnames  = classNames('app__calculator__history', { 'app__calculator__history--active': isHistoryOpen })

    return (
        <div className="app__calculator__screen">
          <div className="app__calculator__screen__header">
            <input type="button" alt="Show History" onClick={this.handleHistoryTrigger} className={buttonClassnames} />
            <div className="app__calculator__operation">{Operation.displayOperation()}</div>
          </div>
          <div className="app__calculator__input">{Operation.displayInput()}</div>
        </div>
    )
  }
}

const mapStateToProps = ( state, ownProps ) => ({
  isHistoryOpen: isHistoryOpen( state )
})

const mapDispatchToProps = dispatch =>
  bindActionCreators( { openHistory }, dispatch )

export default connect( mapStateToProps, mapDispatchToProps )( withOperation( Index ) )
