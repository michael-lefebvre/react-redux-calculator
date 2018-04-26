
import {
    HISTORY_CLOSE
  , HISTORY_OPEN
} from './index'


  //== set History pannel state
  //

export const openHistory = () => ({
    type: HISTORY_OPEN
})

export const closeHistory = () => ({
    type: HISTORY_CLOSE
})
