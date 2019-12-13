import React from 'react'
import { Result, Button } from 'antd'

const Page404 = () => {
  return (
    <Result
      status="404"
      title="Sorry, the page you visited does not exist"
      subTitle="Please click button Refresh to reload page."
      extra={[
        <Button type="primary" key="refresh" onClick={() => window.location.reload()}>
          Refresh
        </Button>,
      ]}
    />
  )
}

export default Page404
