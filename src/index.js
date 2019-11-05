import React, { PureComponent, Suspense } from 'react'
import ReactDOM from 'react-dom'
// import { Provider } from 'react-redux'
// import { BrowserRouter, Switch, Route } from 'react-router-dom'

import 'antd/dist/antd.css'
import './styles/index.scss'
import 'react-app-polyfill/ie9'
import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import * as serviceWorker from './serviceWorker'

// import redux from './redux'
// import { TopBarProgress } from './components'
// import { LoginLayout, RegisterLayout, DefaultLayout } from './containers'

import { gun, store, decrypt } from './utils'
const user = gun.user()

class App extends PureComponent {
  async componentDidMount() {
    const alias = await decrypt(store.get('alias'))
    const passphare = await decrypt(store.get('passphare'))
    user.auth(alias, passphare, ack => {
      console.log('==ack', ack)
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3>TEST</h3>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
        </header>
      </div>
    )
  }
}

const Root = () => <App />
ReactDOM.render(<Root />, document.getElementById('root'))
// serviceWorker.register()
serviceWorker.unregister()
