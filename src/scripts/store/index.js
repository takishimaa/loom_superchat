import { applyMiddleware, createStore, combineReducers, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { reducer as form } from 'redux-form'
import rootSaga from 'Sagas'
import popupReducer from 'Modules/popup'

const configureStore = (initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware()
  const enhancers = []
  const middlewares = [sagaMiddleware]
  // if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  // const devToolsExtension = window.devToolsExtension
  // if (typeof devToolsExtension === 'function') {
  //   enhancers.push(devToolsExtension())
  // }
  // }
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const createStoreWithMiddleware = composeEnhancers(
    applyMiddleware(...middlewares),
    ...enhancers
  )(createStore)
  const reducers = combineReducers({
    form: form.plugin({
      MessageInput: (state, action) => {
        switch(action.type) {
          case 'SEND_TEXT_MESSAGE':
            return undefined; 
          default:
            return state;
        }
      }
    }),
    popup: popupReducer
  })
  const store = createStoreWithMiddleware(reducers, initialState)
  sagaMiddleware.run(rootSaga)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    // module.hot.accept('../reducers', () => {
    //   const nextRootReducer = require('../reducers/index')
    //   store.replaceReducer(nextRootReducer)
    // })
  }
  return store
}

export default configureStore