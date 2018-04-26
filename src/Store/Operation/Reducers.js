import {
    OPERATION_CLEAR
  , OPERATION_PUSH
  , OPERATION_COMPUTE
  , OPERATION_LOAD
} from './index'

import Record from './Record'


const initialState = new Record()

export default function update( state = initialState, action )
{
  switch ( action.type )
  {
    case OPERATION_COMPUTE:
      return new Record({ ...action.props, isResult: true })

    case OPERATION_PUSH:
      return state.merge({ ...action.props, isResult: false })

    case OPERATION_LOAD:
      return action.props

    case OPERATION_CLEAR:
      return initialState

    default:
      return state
  }
}
