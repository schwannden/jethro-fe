import React from 'react';
import { Menu } from 'antd';
import { useIntl } from 'umi';
import styles from './index.less';
import { QuestionCircleOutlined } from '@ant-design/icons';
import HeaderDropdown from '../HeaderDropdown';

const QuestionMenu = () => {
  const { formatMessage } = useIntl();
  return (
    <Menu className={styles.shadow}>
      <Menu.Item
        onClick={() => {
          window.open('https://github.com/schwannden/jethro-fe/issues');
        }}
      >
        {formatMessage({ id: 'common.nav.contact' })}
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          window.open('https://github.com/schwannden/jethro-fe/blob/develop/README.md');
        }}
      >
        {formatMessage({ id: 'common.nav.faq' })}
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          window.open('https://jethro.schwannden.com/privacy');
        }}
      >
        {formatMessage({ id: 'common.nav.privacy' })}
      </Menu.Item>
    </Menu>
  );
};

export default () => {
  return (
    <HeaderDropdown overlay={<QuestionMenu />} placement="bottomRight">
      <span className={styles.action}>
        <QuestionCircleOutlined />
      </span>
    </HeaderDropdown>
  );
};
