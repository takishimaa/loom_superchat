import { Provider } from 'react-redux'
import { render } from 'react-dom'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import configureStore from 'Store'
import PopupContainer from 'Containers/PopupContainer'
import 'Styles/reset'
import 'babel-polyfill'

TimeAgo.locale(en)

const initialState = {}
const store = configureStore(initialState)
render(
  <Provider store={store}>
    <PopupContainer />
  </Provider>,
  document.getElementById('app')
)
