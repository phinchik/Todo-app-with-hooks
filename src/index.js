import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import Routes from './routes'
import './index.scss';

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))