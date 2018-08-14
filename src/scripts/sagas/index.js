
import { createActions, handleActions } from 'redux-actions'
import { popupSaga } from 'Modules/popup'
import { all } from 'redux-saga/effects'

export default function * rootSaga() {
  yield all([
    ...popupSaga
  ])
}
