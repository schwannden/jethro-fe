import { PageContainer } from '@ant-design/pro-layout';
import FiefLogin from './components/FiefLogin';
import ServiceOverview from './components/ServiceOverview';
import { Row } from 'antd';

const OverviewPage: React.FC = () => {
  return (
    <PageContainer ghost title={false}>
      <Row gutter={[8, 16]} justify={'space-around'} key={'main'}>
        <FiefLogin />
        <ServiceOverview />
      </Row>
    </PageContainer>
  );
};

export default OverviewPage;
