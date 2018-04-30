import React      from 'react'
import PropTypes  from 'prop-types'
import classNames from 'classnames'

import './styles.css'

const Button = ({ value, label, symbol, operator, digit, large, onClick }) =>
{
  var className = classNames('app__calculator__button', {
    'app__calculator__button--symbol':   symbol,
    'app__calculator__button--operator': operator,
    'app__calculator__button--digit':    digit,
    'app__calculator__button--large':    large
  })

  return (
    <button className={className} type="button" value={value} onClick={onClick}>
      <span dangerouslySetInnerHTML={{ __html: label || value }} />
    </button>
  )
}

Button.propTypes = {
    value:     PropTypes.string.isRequired
  , onClick:   PropTypes.func.isRequired
  , label:     PropTypes.oneOfType([ PropTypes.string, PropTypes.bool ])
  , symbol:    PropTypes.bool
  , operator:  PropTypes.bool
  , digit:     PropTypes.bool
  , large:     PropTypes.bool
}

Button.defaultProps = {
    label:     false
  , symbol:    false
  , operator:  false
  , digit:     false
  , large:     false
}

export default Button
