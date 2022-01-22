import { useEffect, useState } from 'react';
import { getOverview } from '@/services/overview';
import ProCard from '@ant-design/pro-card';
import { useIntl } from 'umi';
import { Col, Descriptions, Space } from 'antd';
import { useGoogleApi } from 'react-gapi';
import { ServantGroupKeys } from '@/utils/constant';

const OverviewPage = ({ signedIn, auth }: { signedIn: boolean; auth?: gapi.auth2.GoogleAuth }) => {
  const { formatMessage } = useIntl();
  const [spreadSheetClient, setSpreadSheetClient] =
    useState<gapi.client.sheets.SpreadsheetsResource>();
  const [services, setServices] = useState<API.ServiceSummary[]>([]);
  const [] = useState<API.ServiceSummary[]>([]);
  const loadingMessage = auth === undefined ? 'google.auth.loading' : 'signin.prompt';

  const gapi = useGoogleApi();

  useEffect(() => {
    if (gapi?.client?.sheets && signedIn) {
      // @ts-ignore
      setSpreadSheetClient(gapi.client.sheets.spreadsheets);
    }
  }, [gapi, signedIn]);

  useEffect(() => {
    if (!!spreadSheetClient) {
      getOverview(spreadSheetClient).then(setServices);
    }
  }, [spreadSheetClient]);

  return signedIn ? (
    <ProCard ghost title={'服事表'} gutter={[16, 8]} direction={'column'} loading={!auth}>
      {services.map((service) => (
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
          {ServantGroupKeys.map((group) => (
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
          ))}
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
