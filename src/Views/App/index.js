import React, { PureComponent } from 'react'
import { findDOMNode }          from 'react-dom'
import { bindActionCreators }   from 'redux'
import { connect }              from 'react-redux'
import { HotKeys }              from 'react-hotkeys'
import classNames               from 'classnames'

import { isHistoryOpen }        from 'Store/Ui/Selectors'
import { getOperation }         from 'Store/Operation/Selectors'

import { clearOperation }       from 'Store/Operation/Actions'

import {
  closeHistory,
  openHistory }                 from 'Store/Ui/Actions'

import {
  VALUE_EQUAL,
  VALUE_DOT,
  VALUE_CLEAR,
  OPERATORS,
  OPERATION_OPERATOR }          from 'Constants'

import Provider                 from 'Views/Calculator/Provider'
import Calculator               from 'Views/Calculator'
import History                  from 'Views/History'

import './styles.css'


const keyMap = {
    keyEsc:    ['esc']
  , keyClear:  [ VALUE_CLEAR ]
  , keySearch: ['f']
  , keyInt:    ['0','1','2','3','4','5','6','7','8','9']
  , keySep:    ['.',',']
  , keyOp:     OPERATORS
  , keyEq:     [ VALUE_EQUAL ]
}

class Index extends PureComponent {

  constructor( props ) {

    super( props )

    this.handleOnInt    = this.handleOnInt.bind( this )
    this.handleOnSep    = this.handleOnSep.bind( this )
    this.handleOnEsc    = this.handleOnEsc.bind( this )
    this.handleOnSearch = this.handleOnSearch.bind( this )
    this.handleOnClear  = this.handleOnClear.bind( this )
    this.handleOnOp     = this.handleOnOp.bind( this )
    this.handleOnEq     = this.handleOnEq.bind( this )
  }

  //
  // Life cycle
  // --------------------------------------------------

  componentDidMount() {

    findDOMNode( this.refs.calculator ).focus()
  }

  componentDidUpdate( prevProps ) {

    if( prevProps.isHistoryOpen && !this.props.isHistoryOpen )
      findDOMNode( this.refs.calculator ).focus()
  }
  //
  // Helpers
  // --------------------------------------------------

  _isActive() {
    return !this.props.isHistoryOpen
  }

  //
  // Handlers
  // --------------------------------------------------

  handleOnInt({ key }) {

    if( !this._isActive() )
      return

    this.props.Operation.setInput( key )
  }

  handleOnSep() {

    if( !this._isActive() )
      return

    if( this.props.Operation._lastOperationType() === OPERATION_OPERATOR )
      return

    this.props.Operation.setInput( VALUE_DOT )
  }

  handleOnOp({ key }) {

    if( !this._isActive() )
      return

    this.props.Operation.setOperator( key )
  }

  handleOnEq( e ) {

    if( !this._isActive() )
      return

    this.props.Operation.setResult()
  }

  handleOnEsc( e ) {

    e.preventDefault()

    if( !this.props.isHistoryOpen )
      return

    this.props.closeHistory()
  }

  handleOnSearch( e ) {

    e.preventDefault()

    if( this.props.isHistoryOpen )
      return

    this.props.openHistory()

  }

  handleOnClear() {

    if( !this._isActive() )
      return

    this.props.clearOperation()
  }

  //
  // Renders
  // --------------------------------------------------

  render() {

    const handlers = {
      keyEsc:    this.handleOnEsc,
      keySearch: this.handleOnSearch,
      keyClear:  this.handleOnClear,
      keyInt:    this.handleOnInt,
      keySep:    this.handleOnSep,
      keyOp:     this.handleOnOp,
      keyEq:     this.handleOnEq
    }

    return (
      <Provider Operation={this.props.Operation}>
        <HotKeys className={classNames('app', { 'ui-history': this.props.isHistoryOpen })} keyMap={keyMap} handlers={handlers} ref="calculator">
          <div className="app__container">
            <Calculator />
            <History />
          </div>
        </HotKeys>
      </Provider>
    )
  }
}

const mapStateToProps = ( state, ownProps ) => ({
  isHistoryOpen: isHistoryOpen( state ),
  Operation:     getOperation( state )
})

const mapDispatchToProps = dispatch =>
  bindActionCreators( { clearOperation, closeHistory, openHistory }, dispatch )

export default connect( mapStateToProps, mapDispatchToProps )( Index )
