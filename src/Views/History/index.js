import React, { PureComponent } from 'react'
import onClickOutside           from 'react-onclickoutside'

import Search                   from './Search'

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


  handleClickOutside( e )
  {
    if( document.body.classList.contains('ui-history') )
      document.body.classList.toggle('ui-history')
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

export default onClickOutside( Index )
