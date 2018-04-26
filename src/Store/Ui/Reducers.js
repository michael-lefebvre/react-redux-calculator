import { fromJS } from 'immutable'

import {
    HISTORY_CLOSE
  , HISTORY_OPEN
} from './index'


const initialState = new fromJS({
  history: false
})

export default function update( state = initialState, action )
{
  switch ( action.type )
  {
    case HISTORY_OPEN:
      return state.set( 'history', true )

    case HISTORY_CLOSE:
      return state.set( 'history', false )

    default:
      return state
  }
}
