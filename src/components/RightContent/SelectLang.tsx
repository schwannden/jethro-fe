import React from 'react';
import { GlobalOutlined } from '@ant-design/icons';
import { Menu, Space } from 'antd';
import type { MenuInfo } from 'rc-menu/lib/interface';
import { setLocale } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

const DEFAULT_LANGS = [
  {
    lang: 'zh-TW',
    label: '繁體中文',
  },
  {
    lang: 'en-US',
    label: 'English',
  },
];

const SelectedLang: React.FC = () => {
  const itemClick = (item: MenuInfo) => {
    console.log(item);
    setLocale(item?.key, false);
  };

  const menu = (
    <Menu onClick={itemClick}>
      {DEFAULT_LANGS.map((lang) => (
        <Menu.Item key={lang?.lang}>
          <Space>{lang.label}</Space>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <HeaderDropdown overlay={menu} placement="bottomCenter">
      <span className={styles.action}>
        <GlobalOutlined />
      </span>
    </HeaderDropdown>
  );
};

export default SelectedLang;
