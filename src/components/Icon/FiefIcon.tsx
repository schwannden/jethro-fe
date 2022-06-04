import Icon from '@ant-design/icons';
import type { IconComponentProps } from '@ant-design/icons/lib/components/Icon';
import React from 'react';
// @ts-ignore
import { ReactComponent as FiefSvg } from '../../../public/fief.svg';

const FiefIcon = (
  props: JSX.IntrinsicAttributes & IconComponentProps & React.RefAttributes<HTMLSpanElement>,
) => <Icon component={() => <FiefSvg style={{ width: '30px', height: '30px' }} />} {...props} />;

export default FiefIcon;
