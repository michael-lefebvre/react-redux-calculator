
import {
    HISTORY_PUSH
} from './index'


  //== Perform actions on operations history
  //

export const pushToHistory = props => ({
    type: HISTORY_PUSH
  , props
})
