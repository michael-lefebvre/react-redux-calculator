import { createSelector } from 'reselect'

const getOperationState = state => state.Operation

export const getOperation = createSelector(
    [ getOperationState ]
  , operation => operation
)
