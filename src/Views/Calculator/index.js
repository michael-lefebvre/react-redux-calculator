import React, { PureComponent } from 'react'
import classNames               from 'classnames'

import Button                   from './Button'

import './styles.css'

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

  handleHistoryTrigger()
  {
    document.body.classList.toggle('ui-history')
  }

  //
  // Renders
  // --------------------------------------------------

  render() {

    return (
      <div className="app__calculator app__calculator--close-">
        <div className="app__calculator__content">
          <div className="app__calculator__screen">
            <div className="app__calculator__screen__header">
              <input type="button" alt="Show History" onClick={this.handleHistoryTrigger} className={classNames('app__calculator__history', { 'app__calculator__history--active': false })} />
              <div className="app__calculator__operation">1230,1 + 4,01 + 1230,1 + 4,01 + 1230,1 + 4,01 + 1230,1 + 4,01 + 1230,1 + 4,01 + 1230,1 + 4,01 + 1230,1 + 4,01</div>
            </div>
            <div className="app__calculator__input">12341234123412341234123412341234123412341234,11</div>
          </div>
          <div className="app__calculator__keyboard">
            <Button symbol={true} value="b" label="&#10508;" onClick={ e => console.log( e )} />
            <Button value="c" onClick={ e => console.log( e )} />
            <Button symbol={true} value="toggle" label="&plusmn;" onClick={ e => console.log( e )} />
            <Button operator={true} value="/" label="&divide;" onClick={ e => console.log( e )} />
            <button className="app__calculator__button app__calculator__button--integer">1</button>
            <button className="app__calculator__button app__calculator__button--integer">2</button>
            <button className="app__calculator__button app__calculator__button--integer">3</button>
            <button className="app__calculator__button app__calculator__button--operator">&times;</button>
            <button className="app__calculator__button app__calculator__button--integer">4</button>
            <button className="app__calculator__button app__calculator__button--integer">5</button>
            <button className="app__calculator__button app__calculator__button--integer">6</button>
            <button className="app__calculator__button app__calculator__button--operator">&minus;</button>
            <button className="app__calculator__button app__calculator__button--integer">7</button>
            <button className="app__calculator__button app__calculator__button--integer">8</button>
            <button className="app__calculator__button app__calculator__button--integer">9</button>
            <button className="app__calculator__button app__calculator__button--operator">&#43;</button>
            <button className="app__calculator__button app__calculator__button--large app__calculator__button--integer">0</button>
            <button className="app__calculator__button app__calculator__button--symbol">&#806;</button>
            <button className="app__calculator__button app__calculator__button--operator">&#61;</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Index
