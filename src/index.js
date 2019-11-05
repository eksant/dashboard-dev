import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

import './styles/index.scss'
import * as serviceWorker from './serviceWorker'

class App extends PureComponent {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
        </header>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
// serviceWorker.register()
serviceWorker.unregister()
