import React from 'react';
import { ThemeProvider } from 'styled-components';
import themeSettings from '../../config/theme';

const ThemeLayout = ({ children }) => {
  return <ThemeProvider theme={themeSettings}>{children}</ThemeProvider>;
};

export default ThemeLayout;
