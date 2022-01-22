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
  const { syncServiceSummery } = useModel('useOverview');

  return (
    <QueryFilter<API.ServiceSummaryFilter>
      initialValues={{ startDate: moment() }}
      onFinish={async (formData) => syncServiceSummery(formData).then(() => true)}
    >
      <ProFormSelect<ServiceGroup>
        name="serviceGroups"
        showSearch
        placeholder={formatMessage({ id: `service.group` })}
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
              showSearch
              placeholder={formatMessage({ id: `servant.title` })}
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
      <ProFormDatePicker
        name="startDate"
        label={formatMessage({ id: `service.filter.start-date` })}
      />
    </QueryFilter>
  );
};
