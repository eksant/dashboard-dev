import React from 'react';
import { Card } from 'antd';

const img404 = require('../../assets/404.png');

const Page404 = () => {
  return (
    <Card style={{ height: 500 }}>
      <div className="page404">
        <img alt="page not found!" src={img404} />
      </div>
    </Card>
  );
};

export default Page404;
