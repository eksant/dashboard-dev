import React, { PureComponent } from 'react';
import { Spin, Icon } from 'antd';

const loading = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Loading extends PureComponent {
  render() {
    return (
      <div style={{ textAlign: 'center', height: '50px' }}>
        <Spin indicator={loading} />
      </div>
    );
  }
}

export default Loading;
