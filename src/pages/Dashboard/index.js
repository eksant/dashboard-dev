import React from 'react'
import { Card, Skeleton } from 'antd'

const Dashboard = ({ loading, data }) => {
  return (
    <Card style={{ height: 500 }}>
      <Skeleton loading={loading} active>
        <p>Email : {data && data.email}</p>
        <p>Public Key : {data && data.pubkey}</p>
      </Skeleton>
    </Card>
  )
}

export default Dashboard
