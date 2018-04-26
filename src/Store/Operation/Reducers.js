import {
    OPERATION_CLEAR
  , OPERATION_PUSH
  , OPERATION_COMPUTE
  , OPERATION_LOAD
  , OPERATION_WARNING
} from './index'

import Record from './Record'


const initialState = new Record()

export default function update( state = initialState, action )
{
  switch ( action.type )
  {
    case OPERATION_WARNING:
      return state.set('warning', true)

    case OPERATION_COMPUTE:
      return new Record({ ...action.props, warning: false, isResult: true })

    case OPERATION_PUSH:
      return state.merge({ ...action.props, warning: false, isResult: false })

    case OPERATION_LOAD:
      return action.props

    case OPERATION_CLEAR:
      return initialState

    default:
      return state
  }
}
