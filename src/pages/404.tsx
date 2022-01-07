import React, { useRef, useEffect } from 'react';
import { Button, Result } from 'antd';
import { history, useIntl } from 'umi';
import lottie from 'lottie-web';
import styled from 'styled-components';

const IconContainer = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

const NoFoundPage: React.FC = () => {
  const intl = useIntl();
  const lottieRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: lottieRef.current as HTMLDivElement,
      loop: true,
      path: 'https://assets4.lottiefiles.com/packages/lf20_r0tkeuzo.json',
    });
  }, []);

  return (
    <Result
      title="404"
      subTitle={intl.formatMessage({
        id: 'pages.404.description',
        defaultMessage: 'Sorry, the page you visited does not exist.',
      })}
      icon={
        <IconContainer>
          <div style={{ width: '100%', height: '100%' }} ref={lottieRef} />
        </IconContainer>
      }
      extra={
        <Button type="primary" onClick={() => history.push('/')}>
          Back Home
        </Button>
      }
    />
  );
};

export default NoFoundPage;
