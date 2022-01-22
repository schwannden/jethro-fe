import { useEffect } from 'react';
import ProCard from '@ant-design/pro-card';
import { useIntl } from 'umi';
import { Col, Descriptions, message, Space } from 'antd';
import { ServiceGroupKeys } from '@/utils/constant';
import QueryFilter from '../Query';
import { useModel } from '@@/plugin-model/useModel';

const OverviewPage = () => {
  const { formatMessage } = useIntl();
  const { services, syncServiceSummery } = useModel('useOverview');
  const { signedIn, auth } = useModel('useGoogleAPI');
  const loadingMessage = auth === undefined ? 'google.auth.loading' : 'signin.prompt';

  useEffect(() => {
    syncServiceSummery().catch((e) => message.error(e));
  }, [syncServiceSummery]);

  return signedIn ? (
    <ProCard ghost title={'服事表'} gutter={[16, 8]} direction={'column'} loading={!auth}>
      <ProCard key={'card-filter'} title={formatMessage({ id: `service.filter` })}>
        <QueryFilter />
      </ProCard>
      {services.map((service: API.ServiceSummary) => (
        <ProCard
          key={`card-${service.name}`}
          title={formatMessage({ id: `service.name.${service.name}` })}
          subTitle={service.date}
          type={'inner'}
          gutter={[16, 8]}
          extra={
            <Space>
              {service.servants
                .filter((servant) => servant.title === 'service.special-day')
                .map((servant) => (
                  <ProCard key={servant.name} ghost>
                    <Space>
                      <span>{servant.name}</span>
                    </Space>
                  </ProCard>
                ))}
            </Space>
          }
        >
          {ServiceGroupKeys.map((group) =>
            service.servants.filter((s) => s.title.startsWith(group)).length > 0 ? (
              <Descriptions
                size={'small'}
                key={group}
                title={formatMessage({ id: `servant.group.${group}` })}
                column={{ xl: 5, lg: 5, md: 3, sm: 2, xs: 1 }}
              >
                {service.servants
                  .filter((s) => s.title.startsWith(group))
                  .map((servant) => (
                    <Descriptions.Item
                      key={servant.title}
                      label={formatMessage({ id: `servant.title.${servant.title}` })}
                    >
                      {servant.name}
                    </Descriptions.Item>
                  ))}
              </Descriptions>
            ) : (
              ''
            ),
          )}
        </ProCard>
      ))}
    </ProCard>
  ) : (
    <Col span={24}>
      <h4 style={{ textAlign: 'center' }}> {formatMessage({ id: loadingMessage })} </h4>
      <ProCard layout={'center'} loading={true} />
    </Col>
  );
};

export default OverviewPage;
