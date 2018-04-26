import React, { PureComponent } from 'react'
import { findDOMNode }          from 'react-dom'
import { connect }              from 'react-redux'
import { HotKeys }              from 'react-hotkeys'
import classNames               from 'classnames'

import { isHistoryOpen }        from 'Store/Ui/Selectors'

import './styles.css'

const keyMap = {
    keyNav: ['up','down','enter']
  , keyEsc: ['esc','tab']
}

class Index extends PureComponent {

  constructor( props )
  {
    super( props )

    // this.state = getInitialState()

    this.handleOnChange = this.handleOnChange.bind( this )
    this.handleOnEsc    = this.handleOnEsc.bind( this )
    this.handleOnNav    = this.handleOnNav.bind( this )
  }

  //
  // Life cycle
  // --------------------------------------------------

  componentDidUpdate( prevProps ) {

    if( !prevProps.isHistoryOpen && this.props.isHistoryOpen )
      findDOMNode( this.refs.input ).focus()
  }

  //
  // Helpers
  // --------------------------------------------------

  //
  // Handlers
  // --------------------------------------------------

  handleOnChange({ target: { value }})
  {
    if( value.trim() === '' || /^(-)?(([0-9]+)[.,]?([0-9]+)?)?$/.test( value ) )
      this.props.onQuery( value )
  }

  handleOnEsc( e )
  {
    if( this.refs.input.value.trim() === '' )
      return this.props.onEsc()

    this.props.onQuery('')
  }

  handleOnNav( e )
  {
    e.preventDefault()

    this.props.onKeyNav( e )
  }

  //
  // Renders
  // --------------------------------------------------

  render() {

    var hasValue = this.props.query.trim() !== ''

    return (
      <div className="app__history__search">
        <HotKeys className="app__history__search__input" keyMap={keyMap} handlers={{ keyEsc: this.handleOnEsc, keyNav: this.handleOnNav }} focused>
          <input
           type="text"
           ref="input"
           value={this.props.query}
           placeholder="Search"
           disabled={!this.props.isHistoryOpen}
           onChange={this.handleOnChange}
           spellCheck={false} />
        </HotKeys>
        <div className={classNames('app__history__search__reset', { 'app__history__search__reset--active': hasValue })} />
      </div>
    )
  }
}

const mapStateToProps = ( state, ownProps ) => ({
  isHistoryOpen: isHistoryOpen( state )
})

export default connect( mapStateToProps )( Index )
