import React from 'react';
import {
  QueryFilter,
  ProFormSelect,
  ProFormDatePicker,
  ProFormDependency,
} from '@ant-design/pro-form';
import { ServiceGroupKeys, ServantTitleKeys } from '@/utils/constant';
import type { ServiceGroup, ServantTitle } from '@/utils/constant';
import { useIntl } from '@@/plugin-locale/localeExports';
import moment from 'moment';
import { useModel } from '@@/plugin-model/useModel';

export default () => {
  const { formatMessage } = useIntl();
  const { servantNames, syncServiceSummery } = useModel('useOverview');

  return (
    <QueryFilter<API.ServiceSummaryFilter>
      initialValues={{ startDate: moment() }}
      onFinish={async (formData) => syncServiceSummery(formData).then(() => true)}
    >
      <ProFormDatePicker
        name="startDate"
        label={formatMessage({ id: `service.filter.start-date` })}
      />
      <ProFormSelect<ServiceGroup>
        name="servantNames"
        placeholder={formatMessage({ id: `servant.name` })}
        showSearch={false}
        width={300}
        fieldProps={{
          options: servantNames.map((key) => ({
            value: key,
            label: key,
          })),
          allowClear: true,
          mode: 'multiple',
          style: { width: '100%' },
        }}
      />
      <ProFormSelect<ServiceGroup>
        name="serviceGroups"
        placeholder={formatMessage({ id: `service.group` })}
        showSearch={false}
        width={300}
        fieldProps={{
          options: ServiceGroupKeys.map((key) => ({
            value: key,
            label: formatMessage({ id: `servant.group.${key}` }),
          })),
          allowClear: true,
          mode: 'multiple',
          style: { width: '100%' },
        }}
      />
      <ProFormDependency name={['serviceGroups']}>
        {({ serviceGroups }) => {
          const servantTitleKeys =
            serviceGroups && serviceGroups.length > 0
              ? serviceGroups
                  .map((serviceGroup: ServiceGroup) =>
                    ServantTitleKeys.filter((s) => s.startsWith(serviceGroup)),
                  )
                  .flat()
              : ServantTitleKeys;

          return (
            <ProFormSelect<ServantTitle>
              name="servantTitles"
              placeholder={formatMessage({ id: `servant.title` })}
              showSearch={false}
              fieldProps={{
                options: servantTitleKeys.map((key: ServantTitle) => ({
                  value: key,
                  label: formatMessage({ id: `servant.title.${key}` }),
                })),
                allowClear: true,
                mode: 'multiple',
                style: { width: '100%' },
              }}
            />
          );
        }}
      </ProFormDependency>
    </QueryFilter>
  );
};
