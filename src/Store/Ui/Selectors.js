import { createSelector } from 'reselect'

const getHistoryState = state => state.Ui.get('history')

export const isHistoryOpen = createSelector(
    [ getHistoryState ]
  , history => history
)
