import { applyMiddleware, createStore, combineReducers, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { reducer as form } from 'redux-form'
// import rootSaga from 'Sagas'
import appReducer from 'Modules/app'

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
    form,
    app: appReducer
  })
  const store = createStoreWithMiddleware(reducers, initialState)
  // sagaMiddleware.run(rootSaga)

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