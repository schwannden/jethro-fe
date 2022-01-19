import { PageContainer } from '@ant-design/pro-layout';
import { ReactText, useEffect, useState } from 'react';
import ProCard, { CheckCard } from '@ant-design/pro-card';
import ProList from '@ant-design/pro-list';
import { useIntl, useModel } from 'umi';
import Moment from 'moment';
import { ColumnsType } from 'antd/es/table';
import { Table } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

const AvailabilityPage: React.FC = () => {
  const { formatMessage } = useIntl();
  const { availabilities, syncAvailabilities } = useModel('useAvailability');
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly ReactText[]>([]);

  useEffect(() => {
    syncAvailabilities();
  }, [syncAvailabilities]);

  const columns: ColumnsType<Record<string, any>> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 60,
      fixed: 'left',
    },
  ];

  if (availabilities?.length > 0) {
    const example = availabilities[0];
    const availableDates = example.availability.map((a) => Moment(a.date));
    const month2date: Record<string, string[]> = {};
    availableDates.forEach((date) => {
      const month = `${date.month() + 1}`;
      month2date[month] = month2date[month] || [];
      month2date[month].push(date.format('YYYY-MM-DD'));
    });
    Object.keys(month2date).forEach((month) => {
      columns.push({
        title: `${month} 月`,
        children: month2date[month].map((date) => ({
          title: Moment(date).format('MM/DD'),
          dataIndex: date,
          key: date,
          width: 30,
          align: 'center',
          render: (value) =>
            value ? (
              <CheckCircleTwoTone twoToneColor="#52c41a" />
            ) : (
              <CloseCircleTwoTone twoToneColor="#eb2f96" />
            ),
        })),
      });
    });
  }

  const tableData = availabilities.map(({ user_name, availability }) => {
    const availabilityDict: Record<string, boolean> = availability.reduce((acc, a) => {
      acc[a.date] = a.available;
      return acc;
    }, {});
    return { name: user_name, ...availabilityDict };
  });

  return (
    <PageContainer
      ghost
      title={formatMessage({ id: 'menu.availability', defaultMessage: 'Availability' })}
    >
      <ProCard title={'更改本季時間調查'} ghost>
        <ProList<API.UserAvailability>
          rowKey="user_name"
          expandable={{ expandedRowKeys, onExpandedRowsChange: setExpandedRowKeys }}
          dataSource={availabilities}
          metas={{
            title: { dataIndex: 'user_name' },
            description: {
              render: (text, record) => {
                const availableDates = record.availability.map((a) => a.date);
                return (
                  <CheckCard.Group multiple defaultValue={availableDates}>
                    {availableDates.map((date) => (
                      <CheckCard
                        title={Moment(date).format('YYYY-MM-DD ddd')}
                        value={date}
                        style={{ width: 155 }}
                      />
                    ))}
                  </CheckCard.Group>
                );
              },
            },
          }}
        />
      </ProCard>
      <ProCard title={'本季時間調查總覽'} ghost>
        <Table<Record<string, any>>
          columns={columns}
          dataSource={tableData}
          bordered
          size="middle"
        />
      </ProCard>
    </PageContainer>
  );
};

export default AvailabilityPage;
