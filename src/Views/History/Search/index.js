import React, { PureComponent } from 'react'
import classNames               from 'classnames'

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
      <div className="app__history__search">
        <div className="app__history__search__input">
          <input
           type="text"
           ref="input"
           defaultValue=""
           placeholder="Search"
           spellCheck={false} />
        </div>
        <div className={classNames('app__history__search__reset', { 'app__history__search__reset--active': true })} />
      </div>
    )
  }
}

export default Index
