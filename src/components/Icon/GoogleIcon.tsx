import Icon from '@ant-design/icons';
import type { IconComponentProps } from '@ant-design/icons/lib/components/Icon';
import React from 'react';
// @ts-ignore
import { ReactComponent as GoogleSvg } from '../../../public/google.svg';

const GoogleIcon = (
  props: JSX.IntrinsicAttributes & IconComponentProps & React.RefAttributes<HTMLSpanElement>,
) => <Icon component={() => <GoogleSvg style={{ width: '20px', height: '20px' }} />} {...props} />;

export default GoogleIcon;
