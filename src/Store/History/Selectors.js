import { createSelector } from 'reselect'

const getHistoryState = state => state.History

export const getHistory = createSelector(
    [ getHistoryState ]
  , history => history
)
