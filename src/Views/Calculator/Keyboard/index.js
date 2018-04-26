import React from 'react'

import Button from '../Button'

import {
  VALUE_TOGGLE,
  VALUE_UNDO,
  VALUE_CLEAR,
  VALUE_DOT
} from 'Constants'

import './styles.css'

const Index = () => {

  const keyboardMap = [
    { value: VALUE_UNDO, label: '&#10508;', symbol: true },
    { value: VALUE_CLEAR, label: 'C', onClick: e => console.log('clear') },
    { value: VALUE_TOGGLE, label: '&plusmn;', symbol: true },
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
    { value: VALUE_DOT, label: '&#806;', symbol: true },
    { value: '=', label: '&#61;', operator: true }
  ]

  return (
    <div className="app__calculator__keyboard">
      { keyboardMap.map( ( k, i ) =>
        <Button key={`keyboard__keys__${i}`} onClick={ e => console.log( e )} {...k} />
      )}
    </div>
  )
}

export default Index
