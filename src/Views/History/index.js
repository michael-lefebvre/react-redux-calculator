import React, { PureComponent } from 'react'
import { bindActionCreators }   from 'redux'
import { connect }              from 'react-redux'
import onClickOutside           from 'react-onclickoutside'

import { isHistoryOpen }        from 'Store/Ui/Selectors'
import Actions                  from 'Store/Actions'

import Search                   from './Search'

import './styles.css'

const { Ui: { closeHistory } } = Actions

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


  handleClickOutside( e )
  {
    if( !this.props.isHistoryOpen )
      return

    this.props.closeHistory()
  }

  //
  // Renders
  // --------------------------------------------------

  render() {

    return (
      <div className="app__history">
        <div className="app__history__content">
          <Search />
          <div className="app__history__list">
            <div className="app__history__item">
              <div className="app__history__item__operation">1234,12 / 2 + 1234,12 - 2 + 1234,12 - 2 + 1234,12 - 2 + 1234,12 - 2 + 1234,12 - 2</div>
              <div className="app__history__item__result">627,6</div>
            </div>
            <div className="app__history__item">
              <div className="app__history__item__operation">1234,12 / 2</div>
              <div className="app__history__item__result">6271234567892345678902345678904567845678,6</div>
            </div>
            <div className="app__history__item">
              <div className="app__history__item__operation">1234,12 / 2</div>
              <div className="app__history__item__result">627,6</div>
            </div>
            <div className="app__history__item">
              <div className="app__history__item__operation">1234,12 / 2</div>
              <div className="app__history__item__result">627,6</div>
            </div>
            <div className="app__history__item">
              <div className="app__history__item__operation">1234,12 / 2</div>
              <div className="app__history__item__result">627,6</div>
            </div>
            <div className="app__history__item">
              <div className="app__history__item__operation">1234,12 / 2</div>
              <div className="app__history__item__result">627,6</div>
            </div>
            <div className="app__history__item">
              <div className="app__history__item__operation">1234,12 / 2</div>
              <div className="app__history__item__result">627,6</div>
            </div>
            <div className="app__history__item">
              <div className="app__history__item__operation">1234,12 / 2</div>
              <div className="app__history__item__result">627,6</div>
            </div>
            <div className="app__history__item">
              <div className="app__history__item__operation">1234,12 / 2</div>
              <div className="app__history__item__result">627,6</div>
            </div>
            <div className="app__history__item">
              <div className="app__history__item__operation">1234,12 / 2</div>
              <div className="app__history__item__result">627,6</div>
            </div>
            <div className="app__history__item">
              <div className="app__history__item__operation">1234,12 / 2</div>
              <div className="app__history__item__result">627,6</div>
            </div>
            <div className="app__history__item">
              <div className="app__history__item__operation">1234,12 / 2</div>
              <div className="app__history__item__result">627,6</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ( state, ownProps ) => ({
  isHistoryOpen: isHistoryOpen( state )
})

const mapDispatchToProps = dispatch =>
  bindActionCreators( { closeHistory }, dispatch )

export default connect( mapStateToProps, mapDispatchToProps )( onClickOutside( Index ) )
