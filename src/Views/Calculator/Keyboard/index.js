import React                  from 'react'
import { bindActionCreators } from 'redux'
import { connect }            from 'react-redux'

import { clearOperation  }    from 'Store/Operation/Actions'

import { withOperation }      from 'Views/App/Provider'
import Button                 from '../Button'

import {
  VALUE_TOGGLE,
  VALUE_PERCENT,
  VALUE_CLEAR,
  VALUE_DOT,
  VALUE_EQUAL,
  OPERATORS_KEYS,
  OPERATORS_KEYS_ADD,
  OPERATORS_KEYS_SUBTRACT,
  OPERATORS_KEYS_DEVIDE,
  OPERATORS_KEYS_MULTIPLY,
  OPERATORS_LABELS_ADD,
  OPERATORS_LABELS_SUBTRACT,
  OPERATORS_LABELS_DEVIDE,
  OPERATORS_LABELS_MULTIPLY
} from 'Constants'

import './styles.css'

const Index = ({ Operation, clearOperation }) => {

  const handleOnClick = ({ currentTarget: { value }}) => {

    if( !isNaN( value ) )
      return Operation.setInput( value )

    if( OPERATORS_KEYS.indexOf( value ) !== -1 )
      return Operation.setOperator( value )
  }

  const handleOnEqual = () =>
    Operation.setResult()

  const handleOnToggle = () =>
    Operation.setToggle()

  const handleOnPercent = () =>
    Operation.setPercent()

  const handleOnDot = () =>
    Operation.setInput( VALUE_DOT )

  const keyboardMap = [
    { value: VALUE_CLEAR, label: 'C', onClick: clearOperation },
    { value: VALUE_TOGGLE, label: '&plusmn;', symbol: true, onClick: handleOnToggle },
    { value: VALUE_PERCENT, label: '&percnt;', symbol: true, onClick: handleOnPercent },
    { value: OPERATORS_KEYS_DEVIDE, label: OPERATORS_LABELS_DEVIDE, operator: true },
    { value: '1', digit: true },
    { value: '2', digit: true },
    { value: '3', digit: true },
    { value: OPERATORS_KEYS_MULTIPLY, label: OPERATORS_LABELS_MULTIPLY, operator: true },
    { value: '4', digit: true },
    { value: '5', digit: true },
    { value: '6', digit: true },
    { value: OPERATORS_KEYS_SUBTRACT, label: OPERATORS_LABELS_SUBTRACT, operator: true },
    { value: '7', digit: true },
    { value: '8', digit: true },
    { value: '9', digit: true },
    { value: OPERATORS_KEYS_ADD, label: OPERATORS_LABELS_ADD, operator: true },
    { value: '0', digit: true, large: true },
    { value: VALUE_DOT, label: '&#806;', symbol: true, onClick: handleOnDot },
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
