import React from 'react';

import { Skeleton, Card } from 'antd';

const Loading: React.FC<{
  style?: React.CSSProperties;
  rows: number;
  title?: string;
}> = ({ style, rows = 1, title = '' }) => {
  return (
    <Card title={title} style={style}>
      <Skeleton paragraph={{ rows, width: '100%' }} />
    </Card>
  );
};

export default Loading;
