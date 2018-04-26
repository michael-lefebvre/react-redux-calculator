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
  OPERATORS }                   from 'Constants'

import Provider                 from 'Views/Calculator/Provider'
import Calculator               from 'Views/Calculator'
import History                  from 'Views/History'

import './styles.css'


const keyMap = {
    keyEsc:      ['esc']
  , keyClear:    [ VALUE_CLEAR ]
  , keySearch:   ['f']
  , keyDigit:    ['0','1','2','3','4','5','6','7','8','9']
  , keyDot:      ['.',',']
  , keyOperator: OPERATORS
  , keyEqual:    [ VALUE_EQUAL ]
}

class Index extends PureComponent {

  constructor( props ) {

    super( props )

    this.handleOnEsc      = this.handleOnEsc.bind( this )
    this.handleOnSearch   = this.handleOnSearch.bind( this )
    this.handleOnClear    = this.handleOnClear.bind( this )
    this.handleOnDot      = this.handleOnDot.bind( this )
    this.handleOnDigit    = this.handleOnDigit.bind( this )
    this.handleOnOperator = this.handleOnOperator.bind( this )
    this.handleOnEqual    = this.handleOnEqual.bind( this )
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

  handleOnDigit({ key }) {

    if( !this._isActive() )
      return

    this.props.Operation.setInput( key )
  }

  handleOnDot() {

    if( !this._isActive() )
      return

    this.props.Operation.setInput( VALUE_DOT )
  }

  handleOnOperator({ key }) {

    if( !this._isActive() )
      return

    this.props.Operation.setOperator( key )
  }

  handleOnEqual( e ) {

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
      keyEsc:      this.handleOnEsc,
      keySearch:   this.handleOnSearch,
      keyClear:    this.handleOnClear,
      keyDigit:    this.handleOnDigit,
      keyDot:      this.handleOnDot,
      keyOperator: this.handleOnOperator,
      keyEqual:    this.handleOnEqual
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
