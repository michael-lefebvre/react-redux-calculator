import React, { PureComponent } from 'react'
import { bindActionCreators }   from 'redux'
import { connect }              from 'react-redux'
import classNames               from 'classnames'

import { isHistoryOpen }        from 'Store/Ui/Selectors'
import Actions                  from 'Store/Actions'

import Warning                  from '../Warning'
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

  //
  // Helpers
  // --------------------------------------------------

  //
  // Handlers
  // --------------------------------------------------

  handleHistoryTrigger() {

    if( this.props.isHistoryOpen )
      return

    this.props.openHistory()
  }

  //
  // Renders
  // --------------------------------------------------

  render() {

    const { isHistoryOpen, Operation } = this.props

    var inputValue   = Operation.displayInput()
      , isValueNeg   = inputValue[0] === '-'
      , isPendingDot = inputValue.slice( -1 ) === ','

    if( isValueNeg )
      inputValue = inputValue.substring( 1 )

    if( isPendingDot )
      inputValue = inputValue.slice(0,-1)

    const buttonClassnames = classNames('app__calculator__history', { 'app__calculator__history--active': isHistoryOpen })
        , inputClassnames  = classNames('app__calculator__input', {
            'app__calculator__input--negative': isValueNeg,
            'app__calculator__input--dot':      isPendingDot
          })

    return (
        <div className="app__calculator__screen">
          <Warning />
          <div className="app__calculator__screen__header">
            <input type="button" alt="Show History" onClick={this.handleHistoryTrigger} className={buttonClassnames} />
            <div className="app__calculator__operation" dangerouslySetInnerHTML={{ __html: Operation.displayOperation() }} />
          </div>
          <div className={inputClassnames}>{inputValue}</div>
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
