import { useEffect, useState } from 'react';
import { getOverview } from '@/services/overview';
import ProCard from '@ant-design/pro-card';
import { useIntl } from 'umi';
import { List, Space } from 'antd';
import {useGoogleApi} from "react-gapi";

const OverviewPage = ({ signedIn, auth }: { signedIn: boolean; auth?: gapi.auth2.GoogleAuth }) => {
  const [spreadSheet, setSpreadSheet] = useState<gapi.client.sheets.SpreadsheetsResource>();
  const [services, setServices] = useState<API.ServiceSummary[]>([]);
  const { formatMessage } = useIntl();
  const [] = useState<API.ServiceSummary[]>([]);

  const gapi = useGoogleApi({
    discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    scopes: ['profile', 'https://www.googleapis.com/auth/spreadsheets'],
  });

  useEffect(() => {
    if (gapi?.client?.sheets && signedIn) {
      // @ts-ignore
      setSpreadSheet(gapi.client.sheets.spreadsheets)
    }
  }, [gapi, signedIn]);

  useEffect(() => {
    if (!!spreadSheet) {
      spreadSheet.values.get({
        spreadsheetId: '1G3zqXsX6NwisgL3Al-cxQREsIFyYyFM1tEznClA0bug',
        range: 'Q1!A2:T',
      }).then(resp => {
        console.log(resp.result.values)
      })
    }
  }, [spreadSheet]);

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

  return signedIn ? (
    <ProCard ghost title={'服事表'} gutter={[16, 8]} direction={'column'} loading={!auth}>
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
  ) : (
    <ProCard ghost title={'Please Sign In First'} />
  );
};

export default OverviewPage;
