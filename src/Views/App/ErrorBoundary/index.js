import React, { Component } from 'react'

import './styles.css'

export default class ErrorBoundary extends Component {

  constructor( props ) {

    super( props )

    this.state = {
      error:     null,
      errorInfo: null
    }
  }

  componentDidCatch( error, errorInfo ) {

    this.setState({
      error,
      errorInfo
    })
  }

  render() {

    // fallback UI
    if ( this.state.errorInfo )
      return (
        <div className="app">
          <div className="app__container">
            <div className="app__error">
              <div className="app__error__content">
                <h2>
                  <span role="img" aria-label="emoji">🤔</span>
                  Oops something went wrong
                </h2>
                <div className="app__error__details">
                  <pre>
{this.state.error && this.state.error.toString()}
{this.state.errorInfo.componentStack}
                  </pre>
                </div>
                <div className="app__error__btn" onClick={ e => document.location.reload(true) }>Reload app</div>
              </div>
            </div>
          </div>
        </div>
      )

    return this.props.children
  }
}
