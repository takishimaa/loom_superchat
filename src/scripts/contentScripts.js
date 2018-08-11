import { Provider } from 'react-redux'
import { render } from 'react-dom'
import configureStore from 'Store'
import Popup from 'Components/Popup'
import 'Styles/reset'

const initialState = {}
const store = configureStore(initialState)
render(
  <Provider store={store}>
    <Popup />
  </Provider>,
  document.getElementById('app')
)
