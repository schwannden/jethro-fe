import React from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;
const ThemeSpin = styled(Spin)``;

const PageLoading: React.FC = () => {
  return (
    <ThemeSpin indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />}>
      <Container />
    </ThemeSpin>
  );
};

export default PageLoading;
