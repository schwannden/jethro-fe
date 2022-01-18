import { PageContainer } from '@ant-design/pro-layout';
import { useEffect, useState } from 'react';
import { getOverview } from '@/services/overview';
import ProCard from '@ant-design/pro-card';
import { useIntl } from 'umi';
import { List, Space } from 'antd';
import GoogleAuth from './components/GoogleAuth';

const OverviewPage: React.FC = () => {
  const [services, setServices] = useState<API.ServiceSummary[]>([]);
  const { formatMessage } = useIntl();
  const [] = useState<API.ServiceSummary[]>([]);

  useEffect(() => {
    getOverview().then(setServices);
  }, []);

  const renderServants = (servants: API.Servant[], group: string) => (
    <List<API.Servant>
      dataSource={servants.filter((s) => s.title.startsWith(group))}
      header={formatMessage({ id: `servant.group.${group}` })}
      renderItem={(servant) => (
        <List.Item>
          <Space>
            {formatMessage({ id: `servant.title.${servant.title}` })}:{servant.name}
          </Space>
        </List.Item>
      )}
    />
  );

  const servantGourps = ['teacher', 'jk', 'meal'];

  return (
    <PageContainer ghost title={false}>
      <GoogleAuth />
      <ProCard ghost title={'服事表'} gutter={[16, 8]} direction={'column'}>
        {services.map((service) => (
          <ProCard
            key={`card-${service.name}`}
            title={formatMessage({ id: `service.name.${service.name}` })}
            subTitle={service.date}
            type={'inner'}
            extra={
              <Space>
                {service.servants
                  .filter((servant) => servant.title.startsWith('general'))
                  .map((servant) => (
                    <ProCard key={servant.name} ghost>
                      <Space>
                        <span>{formatMessage({ id: `servant.title.${servant.title}` })}</span> :
                        <span>{servant.name}</span>
                      </Space>
                    </ProCard>
                  ))}
              </Space>
            }
          >
            {service.name === 'friday-prayer'
              ? ''
              : servantGourps.map((group) => (
                  <ProCard type={'inner'} key={`card-${group}`}>
                    {renderServants(service.servants, group)}
                  </ProCard>
                ))}
          </ProCard>
        ))}
        ;
      </ProCard>
    </PageContainer>
  );
};

export default OverviewPage;
