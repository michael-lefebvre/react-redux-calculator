import React                  from 'react'
import { bindActionCreators } from 'redux'
import { connect }            from 'react-redux'

import { clearOperation  }    from 'Store/Operation/Actions'

import Button                 from '../Button'
import { withOperation }      from '../Provider'

import {
  VALUE_TOGGLE,
  VALUE_UNDO,
  VALUE_CLEAR,
  VALUE_DOT,
  VALUE_EQUAL,
  OPERATORS
} from 'Constants'

import './styles.css'

const Index = ({ Operation, clearOperation }) => {

  const handleOnClick = ({ currentTarget: { value }}) => {

    if( !isNaN( value ) )
      return Operation.setInput( value )

    if( OPERATORS.indexOf( value ) !== -1 )
      return Operation.setOperator( value )
  }

  const handleOnEqual = () =>
    Operation.setResult()

  const handleOnToggle = () =>
    Operation.setToggle()

  const handleOnSep = () =>
    Operation.setInput( VALUE_DOT )

  const keyboardMap = [
    { value: VALUE_UNDO, label: '&#10508;', symbol: true },
    { value: VALUE_CLEAR, label: 'C', onClick: clearOperation },
    { value: VALUE_TOGGLE, label: '&plusmn;', symbol: true, onClick: handleOnToggle },
    { value: '/', label: '&divide;', operator: true },
    { value: '1', integer: true },
    { value: '2', integer: true },
    { value: '3', integer: true },
    { value: '*', label: '&times;', operator: true },
    { value: '4', integer: true },
    { value: '5', integer: true },
    { value: '6', integer: true },
    { value: '-', label: '&minus;', operator: true },
    { value: '7', integer: true },
    { value: '8', integer: true },
    { value: '9', integer: true },
    { value: '+', label: '&#43;', operator: true },
    { value: '0', integer: true, large: true },
    { value: VALUE_DOT, label: '&#806;', symbol: true, onClick: handleOnSep },
    { value: VALUE_EQUAL, label: '&#61;', operator: true, onClick: handleOnEqual }
  ]

  return (
    <div className="app__calculator__keyboard">
      { keyboardMap.map( ( k, i ) =>
        <Button key={`keyboard__keys__${i}`} onClick={handleOnClick} {...k} />
      )}
    </div>
  )
}


const mapDispatchToProps = dispatch =>
  bindActionCreators( { clearOperation }, dispatch )

export default connect( null, mapDispatchToProps )( withOperation( Index ) )
