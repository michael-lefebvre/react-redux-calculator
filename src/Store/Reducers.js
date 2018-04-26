import { combineReducers } from 'redux'

import History             from './History/Reducers'
import Operation           from './Operation/Reducers'
import Ui                  from './Ui/Reducers'

const rootReducers = combineReducers({
    History
  , Operation
  , Ui
})

export default rootReducers
