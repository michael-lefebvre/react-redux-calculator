import React, { PureComponent, Fragment } from 'react'
import { findDOMNode }                    from 'react-dom'
import { bindActionCreators }             from 'redux'
import { connect }                        from 'react-redux'
import onClickOutside                     from 'react-onclickoutside'
import classNames                         from 'classnames'

import { isHistoryOpen }                  from 'Store/Ui/Selectors'
import { getHistory }                     from 'Store/History/Selectors'

import Actions                            from 'Store/Actions'

import Search                             from './Search'

import {
  KEYCODES_DROPDOWN,
  KEYCODE_ENTER,
  KEYCODE_TAB,
  KEYCODE_UP,
  KEYCODE_DOWN }                          from 'Constants'

import './styles.css'

const {
  Ui:        { closeHistory },
  Operation: { loadOperation }} = Actions


const getInitialState = () => ({
    focused:  -1
  , list:     null
  , results:  null
  , isEmpty:  false
  , query:    ''
})

class Index extends PureComponent {

  constructor( props ) {

    super( props )

    this.state = getInitialState()

    this._lastTrigger = null
    this._resultsRef  = null

    this.handleKeyNav       = this.handleKeyNav.bind( this )
    this.handleKeyNavScroll = this.handleKeyNavScroll.bind( this )
    this.handleMouseFocus   = this.handleMouseFocus.bind( this )
    this.handleMouseOut     = this.handleMouseOut.bind( this )
    this.handleOnClick      = this.handleOnClick.bind( this )
    this.handleClose        = this.handleClose.bind( this )
    this.handleSelect       = this.handleSelect.bind( this )
    this.handleOnQuery      = this.handleOnQuery.bind( this )
  }

  //
  // Life cycle
  // --------------------------------------------------

  componentWillMount()
  {
  }

  componentWillReceiveProps( nextProps )
  {
    if( !nextProps.history.equals( this.props.history ) )
      this._setList( nextProps )
  }

  componentDidUpdate( prevProps ) {

    if( prevProps.isHistoryOpen && !this.props.isHistoryOpen )
      this.setState({ query: '', focused: -1, results: this.state.list ? [ ...this.state.list ] : null })
  }

  //
  // Helpers
  // --------------------------------------------------

  _keyHandler({ currentTarget })
  {
    const { dataset } = currentTarget

    if( dataset && dataset.key )
      return +dataset.key

    return -1
  }

  _setList({ history })
  {
    var list = history.map( ( o, i ) => ({
      operation: o.displayOperation(),
      input:     o.displayInput(),
      index:     i
    })).toJSON()

    this.setState({ ...getInitialState(), list, results: list })
  }

  //
  // Handlers
  // --------------------------------------------------

  handleMouseOut()
  {
    if( this._lastTrigger !== 'key' )
      this.setState({ focused: -1 }, () => this._lastTrigger = null )
  }

  handleMouseFocus( e )
  {
    var index = this._keyHandler( e )

    if( index < 0 )
      return console.log('no index onFocus')

    if( this._lastTrigger === 'key' )
    {
      this._lastTrigger = null
      return
    }

    this.setState({ focused: index })
  }

  handleKeyNavScroll()
  {
    this._lastTrigger = 'key'

    try {
      findDOMNode( this.refs.list ).querySelectorAll('li')[ this.state.focused ].scrollIntoView( false )
    }
    catch( e )
    {
      console.info( this.state.focused)
      console.log(e)
    }
  }

  handleKeyNav( e )
  {
    // Tab, Enter, Escape, up, down
    if( KEYCODES_DROPDOWN.indexOf( e.keyCode ) === -1 )
      return

    e.stopPropagation()

    var { focused, results } = this.state

    if( !results )
      return

    var total = ( results.length - 1 )

    if( focused > total )
      focused = 0

    if( e.keyCode === KEYCODE_ENTER && focused === -1 )
      return // this.props.onEnter()

    // tab
    if( e.keyCode === KEYCODE_TAB )
      return this.handleClose()

    e.preventDefault()

    // up
    if( e.keyCode === KEYCODE_UP )
      return this.setState({ focused: focused > 0 ? ( focused - 1 ) : total }, this.handleKeyNavScroll )

    // down
    if( e.keyCode === KEYCODE_DOWN )
      return this.setState({ focused: focused < total ? ( focused + 1 ) : 0 }, this.handleKeyNavScroll )

    // enter
    if( e.keyCode === KEYCODE_ENTER && focused !== -1 )
      return this.handleSelect( focused )
  }

  handleSelect( index )
  {
    const rowResult = this.state.results[ index ]

    if( !rowResult )
      return console.log('no rowResult')

    var operation = this.props.history.get( rowResult.index )

    this.props.loadOperation( operation )
      // .then( () => this.setState( getInitialState() ) )
  }

  handleClickOutside( e ) {

    if( !this.props.isHistoryOpen )
      return

    this.handleClose()
  }

  handleOnClick({ currentTarget: { dataset: { index } } }) {

    this.handleSelect( index )
    // var operation = this.props.history.get( key )

    // this.props.loadOperation( operation )
  }

  handleClose()
  {
    this.props.closeHistory()
  }

  handleOnQuery( query )
  {
    var results = [ ...this.state.list ]

    if( query.trim() !== '' )
      results = results.filter( r => r.input.indexOf( query ) === 0 )

    this.setState({
        focused: -1
      , results
      , query
    })
  }

  //
  // Renders
  // --------------------------------------------------

  render() {

    const { focused, list, results } = this.state
        , isListEmpty                = !list
        , hasNoMatch                 = results && !results.length

    return (
      <div className="app__history">
        <div className="app__history__content">
          { isListEmpty && <div className="app__history__empty"><div><span role="img" aria-label="emoji">🤓</span> No previous operations</div></div>}
          { !isListEmpty && (
            <Fragment>
              <Search
               query={this.state.query}
               onEsc={this.handleClose}
               onQuery={this.handleOnQuery}
               onKeyNav={this.handleKeyNav} />
              <div className="app__history__list">
                { hasNoMatch && <div className="app__history__empty"><div><span role="img" aria-label="emoji">🤔</span> No operations match your search</div></div>}
                <ul ref="list" onMouseOut={this.handleMouseOut}>
                  {results.map( ( o, i ) =>
                    <li
                     data-key={i}
                     data-index={o.index}
                     key={`history__list__${i}`}
                     className={classNames('app__history__item', { focused: focused === i })}
                     onClick={this.handleOnClick}
                     onMouseOver={this.handleMouseFocus}>
                      <div className="app__history__item__operation" dangerouslySetInnerHTML={{ __html: o.operation }} />
                      <div className="app__history__item__result">{o.input}</div>
                    </li>
                  )}
                </ul>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ( state, ownProps ) => ({
  isHistoryOpen: isHistoryOpen( state ),
  history:       getHistory( state )
})

const mapDispatchToProps = dispatch =>
  bindActionCreators( { closeHistory, loadOperation }, dispatch )

export default connect( mapStateToProps, mapDispatchToProps )( onClickOutside( Index ) )
