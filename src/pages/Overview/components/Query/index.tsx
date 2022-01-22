import React from 'react';
import {
  QueryFilter,
  ProFormSelect,
  ProFormDatePicker,
  ProFormDependency,
} from '@ant-design/pro-form';
import { ServantGroupKeys, ServantTitleKeys } from '@/utils/constant';
import type { ServiceGroup, ServantTitle } from '@/utils/constant';
import { useIntl } from '@@/plugin-locale/localeExports';
import moment from 'moment';

export default () => {
  const { formatMessage } = useIntl();

  return (
    <QueryFilter
      initialValues={{
        sex: 'man',
      }}
      onFinish={async (values) => console.log(values)}
    >
      <ProFormSelect<ServiceGroup>
        name="serviceGroups"
        showSearch
        placeholder={formatMessage({ id: `service.group` })}
        width={300}
        fieldProps={{
          options: ServantGroupKeys.map((key) => ({
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
          const servantTitleKeys = serviceGroups
            ? serviceGroups
                .map((serviceGroup: ServiceGroup) =>
                  ServantTitleKeys.filter((s) => s.startsWith(serviceGroup)),
                )
                .flat()
            : ServantTitleKeys;

          return (
            <ProFormSelect<ServantTitle>
              name="servantTitle"
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
        initialValue={moment()}
        label={formatMessage({ id: `service.filter.start-date` })}
      />
    </QueryFilter>
  );
};
