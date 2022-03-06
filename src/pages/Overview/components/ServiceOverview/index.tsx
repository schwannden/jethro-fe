import { useEffect } from 'react';
import ProCard from '@ant-design/pro-card';
import { useIntl } from 'umi';
import { Col, Descriptions, List, message, Row, Space } from 'antd';
import { ServiceGroup, ServiceGroupKeys } from '@/utils/constant';
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

  const groupRWD = (group: ServiceGroup) =>
    group === 'jk' ? { xl: 4, lg: 4, md: 2, sm: 2, xs: 2 } : { xl: 3, lg: 3, md: 2, sm: 2, xs: 2 };

  return signedIn ? (
    <ProCard ghost title={'服事表'} gutter={[16, 8]} direction={'column'} loading={!auth}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ProCard key={'card-filter'} title={formatMessage({ id: `service.filter` })}>
            <QueryFilter />
          </ProCard>
        </Col>
        {services.map((service: API.ServiceSummary) => (
          <Col lg={12} md={24}>
            <ProCard
              key={`card-${service.name}`}
              title={formatMessage({ id: `service.name.${service.name}` })}
              subTitle={service.date}
              gutter={[16, 8]}
              bordered
              headerBordered
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
                    column={groupRWD(group)}
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
          </Col>
        ))}
      </Row>
    </ProCard>
  ) : (
    <Col span={24}>
      <h4 style={{ textAlign: 'center' }}> {formatMessage({ id: loadingMessage })} </h4>
      <ProCard>
        <List>
          <List.Item>
            <List.Item.Meta
              title={formatMessage({ id: 'app.author.title' })}
              description={formatMessage({ id: 'app.author.content' })}
            />
          </List.Item>
          <List.Item>
            <List.Item.Meta
              title={formatMessage({ id: 'app.usage.title' })}
              description={formatMessage({ id: 'app.usage.content' })}
            />
          </List.Item>
          <List.Item>
            <List.Item.Meta
              title={formatMessage({ id: 'app.demo.title' })}
              description={
                <a href="https://youtu.be/m1iRx5C76xU" target="_blank">
                  {formatMessage({ id: 'app.demo.content' })}
                </a>
              }
            />
          </List.Item>
        </List>
      </ProCard>
    </Col>
  );
};

export default OverviewPage;
