import type { PropsWithChildren } from 'react';
import { createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { IconTriangleInvertedFilled } from '@tabler/icons-react';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/dates/styles.css';
import 'ag-charts-enterprise';

const theme = createTheme({
  /** Theme override here */
  colors: {
    skyblue: [
      '#e3f6ff',
      '#cee7ff',
      '#9fccfb',
      '#6db0f6',
      '#4398f2',
      '#2d8cf0',
      '#1281f0',
      '#006fd6',
      '#0063c1',
      '#0055ab',
    ],
  },
  primaryColor: 'skyblue',
  primaryShade: 5,
  defaultRadius: 'xs',

  components: {
    Select: {
      defaultProps: {
        rightSection: <IconTriangleInvertedFilled size={10} />,
      },
    },
  },
});

function ThemeProvider({ children }: Readonly<PropsWithChildren>) {
  return (
    <MantineProvider theme={theme}>
      <ModalsProvider>
        <Notifications />
        {children}
      </ModalsProvider>
    </MantineProvider>
  );
}

export default ThemeProvider;
