import { Record, List }       from 'immutable'

import Store                  from 'Store'
import {
  pushOperation,
  computeOperation }          from './Actions'

import {
  VALUE_DOT,
  OPERATION_INPUT,
  OPERATION_OPERATOR }        from 'Constants'

const Operation = new Record({
  // input:       '-1234512345.1234512345456',
  input:       '',
  placeholder: '0',
  isResult:    false,
  operation:   new List([]),
  // operation:   new List([
  //     12344.456
  //   , '+'
  //   , 1
  //   , '+'
  //   , 12344.456
  //   , '+'
  //   , 1
  //   , '+'
  //   , 1
  //   , '+'
  //   , 12344.456
  //   , '+'
  //   , 1
  //   , '+'
  //   , 1
  //   , '+'
  //   , 12344.456
  //   , '+'
  //   , 1
  // ])
})

export default class OperationRecord extends Operation {


  //
  // Helpers
  // --------------------------------------------------

  _formatInput( value )
  {
    var pattern = new RegExp( '\\' + VALUE_DOT, 'g' )

    return value.replace( pattern, ',' )
  }

  _lastOperationType()
  {
    const operation      = this.operation.toJSON()
        , operationValue = operation[ operation.length - 1 ]

    if( !operationValue )
      return OPERATION_INPUT

    return isNaN( operationValue ) ? OPERATION_OPERATOR : OPERATION_INPUT
  }

  //
  // Display
  // --------------------------------------------------

  displayInput()
  {
    var value = this.input === '' ? this.placeholder : this.input

    // dumbly copy/paste from
    // http://www.saintsatplay.com/blog/2014/08/handling-floating-point-numbers-in-javascript#.WuGgV1OFPxg
    if( !Number.isInteger( +value ) )
      value = ''+Math.round( parseFloat( ( +value * Math.pow( 10, 4 ) ).toFixed( 4 ) ) ) / Math.pow( 10, 4 )

    return this._formatInput( value )
  }

  displayOperation()
  {
    const operation = this.operation.toJSON()

    return this._formatInput( operation.join(' ') )
  }

  //
  // Precogs
  // --------------------------------------------------

  setInput( value )
  {
    var prevInput
      , operation
      , input

    if( this.isResult )
    {
      prevInput = ''
      operation = []
    }
    else
    {
      prevInput = this.input
      operation = [ ...this.operation.toJSON() ]
    }

    if( value === '0' && prevInput === '' )
      return false

    if( value === VALUE_DOT && prevInput.indexOf( VALUE_DOT ) !== -1 )
      return false

    if( value === VALUE_DOT && prevInput === '' )
      value = '0.'

    if( prevInput === '-0' && value !== VALUE_DOT )
      prevInput = '-'

    input = prevInput + value

    var operationSize = operation.length
      , operationRow  = operationSize < 2 ? 0 : ( operationSize - 1 )

    if( isNaN( operation[ operationRow ] ) )
      operation.push( +input )
    else
      operation[ operationRow ] = +input

    return Store.dispatch( pushOperation({ input, operation: new List( operation ) }) )
  }

  setToggle()
  {
    if( this._lastOperationType() === OPERATION_OPERATOR )
      return false

    var prevInput = this.input

    if( prevInput === '' )
      prevInput = '0'

    var input = prevInput.substring( 0, 1 ) === '-' ? prevInput.substring( 1 ) : '-' + prevInput

    if( this.isResult )
      return Store.dispatch( pushOperation({ input, operation: new List( [ +input ] ) }) )

    var operation     = this.operation.toJSON()
      , operationSize = operation.length
      , operationRow  = operationSize < 2 ? 0 : ( operationSize - 1 )

    operation[ operationRow ] = +input

    return Store.dispatch( pushOperation({ input, operation: new List( operation ) }) )
  }

  setOperator( operator )
  {
    var operation     = [ ...this.operation ]
      , operationSize = operation.length

    if( !operationSize )
      return

    if( isNaN( operation[ operationSize - 1 ] ) )
      return false

    // operation.push( +this.input )
    operation.push( operator )

    var placeholder = this.input

    return Store.dispatch( pushOperation({ input: '', operation: new List( operation ), placeholder }))
  }

  setResult()
  {
    if( this.isResult )
      return

    const operation = this.operation.toJSON()
        , size      = operation.length
        , isOdd     = size % 2

    if( size < 3 || !isOdd )
      return false

    // @TODO: find an alternative to `eval`
    // var _result = operation[0]

    // for( var i = 0, l = size; ++i < l; )
    // {
    //   console.log(operation[ i ])
    // }

    try
    {
       // eslint-disable-next-line
      var result = eval( operation.join(' ') )
    }
    catch( err )
    {
      console.log('_setResult err')
      console.log(err.message)
      console.log(err)
    }

    // return { operation: new List([ result ]), input: ''+result }
    return Store.dispatch( computeOperation({ operation: new List( operation ), input: ''+result }) )
  }
}
