import { fromJS } from 'immutable'

import {
    UI_HISTORY_CLOSE
  , UI_HISTORY_OPEN
} from './index'


const initialState = new fromJS({
  history: false
})

export default function update( state = initialState, action )
{
  switch ( action.type )
  {
    case UI_HISTORY_OPEN:
      return state.set( 'history', true )

    case UI_HISTORY_CLOSE:
      return state.set( 'history', false )

    default:
      return state
  }
}
