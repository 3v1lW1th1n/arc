// https://github.com/diegohaz/arc/wiki/Example-app
import 'react-hot-loader/patch'
import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createHistory } from 'history'
import { Router, useRouterHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from 'store/configure'
import api from 'services/api'
import routes from 'routes'

const baseHistory = useRouterHistory(createHistory)({ basename: process.env.PUBLIC_PATH })
const store = configureStore({}, baseHistory, { api: api.create() })
const history = syncHistoryWithStore(baseHistory, store)
const root = document.getElementById('app')

const renderApp = () => (
  <Provider store={store}>
    <Router key={Math.random()} history={history} routes={routes} />
  </Provider>
)

render(renderApp(), root)

if (module.hot) {
  module.hot.accept('routes', () => {
    require('routes')
    render(renderApp(), root)
  })
}
