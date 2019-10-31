import React from 'react'
import topbar from 'topbar'

let progress = 0
let defaultConfig = {
  barThickness: 2,
  barColors: {
    '0': '#4169E1',
    '0.7': '#87CEFA',
    '1.0': '#FFFFFF',
  },
  shadowBlur: 5,
  shadowColor: 'rgba(0, 0, 0, .5)',
}

class TopBarProgress extends React.Component {
  static config = topbar.config

  componentDidMount() {
    if (progress === 0) {
      topbar.show()
    }
    progress++
  }

  componentWillUnmount() {
    progress--
    if (progress === 0) {
      topbar.hide()
    }
  }

  render() {
    if (!this.config) {
      topbar.config(defaultConfig)
    }

    return null
  }
}

export default TopBarProgress
