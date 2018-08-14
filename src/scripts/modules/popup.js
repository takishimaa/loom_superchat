import { createActions, handleActions } from 'redux-actions'
import { takeEvery, put, call } from 'redux-saga/effects'
import * as Api from 'Api'

// ############################## //
//           Constants            //
// ############################## //

const INITIALIZE_CONTRACT = 'INITIALIZE_CONTRACT'
const INITIALIZE_CONTRACT_FINISHED = 'INITIALIZE_CONTRACT_FINISHED'

const OPEN_ASSET_SELECT = 'OPEN_ASSET_SELECT'
const CLOSE_ASSET_SELECT = 'CLOSE_ASSET_SELECT'

const CREATE_ROOM  = 'CREATE_ROOM'
const CREATE_ROOM_FINISHED  = 'CREATE_ROOM_FINISHED'

const GET_MESSAGES = 'GET_MESSAGES'
const GET_MESSAGES_FINISHED = 'GET_MESSAGES_FINISHED'

const SEND_TEXT_MESSAGE = 'SEND_TEXT_MESSAGE'
const SEND_TEXT_MESSAGE_FINISHED = 'SEND_TEXT_MESSAGE_FINISHED'

const SELECT_ASSET = 'SELECT_ASSET'

// ############################## //
//            Actions             //
// ############################## //

export const actions = createActions(
  INITIALIZE_CONTRACT,
  INITIALIZE_CONTRACT_FINISHED,

  OPEN_ASSET_SELECT,
  CLOSE_ASSET_SELECT,

  CREATE_ROOM,
  CREATE_ROOM_FINISHED,

  GET_MESSAGES,
  GET_MESSAGES_FINISHED,

  SEND_TEXT_MESSAGE,
  SEND_TEXT_MESSAGE_FINISHED,

  SELECT_ASSET
)

// ############################## //
//            saga                //
// ############################## //

function * watchInitializeContract(args) {  
  const { payload, error } = yield call(Api.initializeContract, args.payload)
  yield put(actions.initializeContractFinished(error ? new TypeError(error.message) : payload))
}

function * watchCreateRoom(args) {  
  const { payload, error } = yield call(Api.createRoom, args.payload)
  yield put(actions.createRoomFinished(error ? new TypeError(error.message) : payload))
}

function * watchPostMessage(args) {  
  const { payload, error } = yield call(Api.postMessage, args.payload)
  yield put(actions.sendTextMessageFinished(error ? new TypeError(error.message) : payload))
}

function * watchGetMessages(args) {  
  const { payload, error } = yield call(Api.getMessages, args.payload)
  yield put(actions.getMessagesFinished(error ? new TypeError(error.message) : payload))
}

export const popupSaga = [
  takeEvery(INITIALIZE_CONTRACT, watchInitializeContract),
  takeEvery(CREATE_ROOM, watchCreateRoom),
  takeEvery(SEND_TEXT_MESSAGE, watchPostMessage),
  takeEvery(GET_MESSAGES, watchGetMessages),
]

// ############################## //
//           reducer              //
// ############################## //

export default handleActions({
  [INITIALIZE_CONTRACT]: state => ({
    ...state,
    initializingContract: true
  }),
  [INITIALIZE_CONTRACT_FINISHED]: state => ({
    ...state,
    initializingContract: false
  }),

  [OPEN_ASSET_SELECT]: state => ({
    ...state,
    assetSelectOpend: true
  }),
  [CLOSE_ASSET_SELECT]: state => ({
    ...state,
    assetSelectOpend: false
  }),

  [CREATE_ROOM]: state => ({
    ...state,
    creatingRoom: true
  }),
  [CREATE_ROOM_FINISHED]: {
    next: (state, { payload }) => ({
      ...state,
      creatingRoom: false
    }),
    throw: (state, { payload }) => ({
      ...state,
      creatingRoom: false
    })
  },

  [GET_MESSAGES]: state => ({
    ...state,
    loading: true
  }),
  [GET_MESSAGES_FINISHED]:  {
    next: (state, { payload }) => ({
      ...state,
      loading: false,
      messages: payload.messages
    }),
    throw: (state, { payload }) => ({
      ...state,
      loading: false
    })
  },

  [SEND_TEXT_MESSAGE]: state => ({
    ...state,
    sending: true
  }),
  [SEND_TEXT_MESSAGE_FINISHED]: {
    next: (state, { payload }) => ({
      ...state,
      sending: false,
    }),
    throw: (state, { payload }) => ({
      ...state,
      sending: false,
    })
  },

  [SELECT_ASSET]: (state, { payload }) => ({
    ...state,
    sending: true,
    selectedAsset: payload
  }),
}, {
  initializingContract: false,
  assetSelectOpend: false,
  sending: false,
  creatingRoom: false
})