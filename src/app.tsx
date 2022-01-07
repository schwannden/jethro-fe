import React from 'react';
import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import PageLoading from '@/components/PageLoading';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import ThemeLayout from './Layout/ThemeLayout';

import layoutSettings from '../config/layout';
import interceptorSettings from './services/interceptor';
// @ts-ignore
import logo from '../public/8ndpoint_logo.png';

/** show loading when get current user is slowly，just support loading now */
export const initialStateConfig = {
  loading: <PageLoading />,
};

export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
}> {
  return {
    settings: layoutSettings || {},
  };
}

export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => (
      <div style={{ background: '#FFF' }}>
        <Footer />
      </div>
    ),
    onPageChange: () => {
      window.scrollTo({
        top: 0,
      });
    },
    menuHeaderRender: () => (
      <div style={{ cursor: 'pointer' }}>
        <img
          alt="logo"
          style={{
            width: 180,
            height: 36,
            margin: '0 24px',
            textAlign: 'left',
          }}
          src={logo}
        />
      </div>
    ),
    childrenRender: (dom) => <ThemeLayout>{dom}</ThemeLayout>,
    // custom 403 page
    unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};

export const request: RequestConfig = interceptorSettings;
