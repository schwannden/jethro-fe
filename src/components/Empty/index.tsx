import React from 'react';
import { Empty } from 'antd';
import ProCard from '@ant-design/pro-card';

export default ({ description }: { description: string }) => {
  return (
    <ProCard>
      <Empty description={description} />
    </ProCard>
  );
};
