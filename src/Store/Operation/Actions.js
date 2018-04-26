
import {
    OPERATION_CLEAR
  , OPERATION_PUSH
  , OPERATION_COMPUTE
  , OPERATION_LOAD
} from './index'

import { pushToHistory } from '../History/Actions'
import { closeHistory }  from '../Ui/Actions'

  //== Perform actions on current operation
  //

export const clearOperation = () => ({
    type: OPERATION_CLEAR
})

export const pushOperation = props => ({
    type: OPERATION_PUSH
  , props
})

export const loadOperation = props =>
  dispatch =>
    Promise.all([
      dispatch({ type: OPERATION_LOAD, props }),
      dispatch( closeHistory() )
    ])


export const computeOperation = props =>
  ( dispatch, getState ) =>
    Promise.resolve( dispatch({
          type: OPERATION_COMPUTE
        , props
      }) )
      .then( a =>
      {
        dispatch( pushToHistory( getState().Operation ) )

        return a
      })
