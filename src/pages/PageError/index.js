import React from 'react'
import { Result, Button, Icon, Typography } from 'antd'

const { Paragraph, Text } = Typography
const PageError = message => {
  return (
    <Result
      status="error"
      title="Page Error"
      subTitle="Please click button Refresh to reload page."
      extra={[
        <Button type="primary" key="refresh" onClick={window.location.reload}>
          Refresh
        </Button>,
      ]}
    >
      {message ? (
        <div className="desc">
          <Paragraph>
            <Text strong style={{ fontSize: 16 }}>
              The content has the following error:
            </Text>
          </Paragraph>
          <Paragraph>
            <Icon style={{ color: 'red' }} type="close-circle" /> {message}
          </Paragraph>
        </div>
      ) : null}
    </Result>
  )
}

export default PageError
