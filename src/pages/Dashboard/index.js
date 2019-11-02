import React from 'react'
import { Card } from 'antd'

const Dashboard = props => {
  const { auth } = props
  
  return (
    <Card style={{ height: 500 }}>
      <h3>Dashboard</h3>
      <p>Alias : {auth && auth.alias}</p>
      <p>Epub : {auth && auth.epub}</p>
      <p>Pub : {auth && auth.pub}</p>
    </Card>
  )
}

export default Dashboard
