import React from 'react';
import { DefaultFooter } from '@ant-design/pro-layout';
import { useIntl } from 'umi';
import footer from '../../../config/footer';

const Footer: React.FC<{
  styles?: React.CSSProperties;
}> = ({ styles = {} }) => {
  const intl = useIntl();

  return (
    <DefaultFooter
      copyright={intl.formatMessage({
        id: 'app.copyright',
      })}
      {...footer}
      style={{ background: 'inherit', padding: '30px 0', ...styles }}
    />
  );
};

export default Footer;
