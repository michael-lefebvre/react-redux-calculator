import { List } from 'immutable'

import {
    HISTORY_PUSH
} from './index'

const initialState = new List([])

export default function update( state = initialState, action )
{
  switch ( action.type )
  {
    case HISTORY_PUSH:
      return state.unshift( action.props )

    default:
      return state
  }
}
