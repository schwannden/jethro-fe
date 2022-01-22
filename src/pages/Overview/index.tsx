import { PageContainer } from '@ant-design/pro-layout';
import { GoogleApiProvider } from 'react-gapi';
import GoogleLogin from './components/GoogleLogin';
import ServiceOverview from './components/ServiceOverview';
import { Row } from 'antd';

const OverviewPage: React.FC = () => {
  return (
    <PageContainer ghost title={false}>
      <GoogleApiProvider clientId={GOOGLE_CLIENT_ID}>
        <Row gutter={[8, 16]} justify={'space-around'} key={'main'}>
          <GoogleLogin />
          <ServiceOverview />
        </Row>
      </GoogleApiProvider>
    </PageContainer>
  );
};

export default OverviewPage;
