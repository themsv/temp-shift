import type { PropsWithChildren } from 'react';
import { createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { IconTriangleInvertedFilled } from '@tabler/icons-react';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/dates/styles.css';
import './style.css';

const theme = createTheme({
  /** Theme override here */
  defaultRadius: 'xs',

  fontFamily: 'MCQGlobal, sans-serif',
  headings: {
    fontFamily: 'MCQGlobal, sans-serif',
  },

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
