
import {
    UI_HISTORY_CLOSE
  , UI_HISTORY_OPEN
} from './index'


  //== set History pannel state
  //

export const openHistory = () => ({
    type: UI_HISTORY_OPEN
})

export const closeHistory = () => ({
    type: UI_HISTORY_CLOSE
})
