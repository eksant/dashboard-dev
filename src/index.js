import React, { PureComponent, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { CookiesProvider } from 'react-cookie'

import 'antd/dist/antd.css'
import './styles/index.scss'
import 'react-app-polyfill/ie9'
import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import * as serviceWorker from './serviceWorker'

class App extends PureComponent {
  render() {
    return (
      <CookiesProvider>
        <div className="App">
          <header className="App-header">
            <h3>Developer Dashboard</h3>
            <p>Comming Soon..</p>
          </header>
        </div>
      </CookiesProvider>
    )
  }
}

const Root = () => <App />
ReactDOM.render(<Root />, document.getElementById('root'))
serviceWorker.register()
