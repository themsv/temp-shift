import type { PropsWithChildren } from 'react';
import { createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/dates/styles.css';
import { IconTriangleInvertedFilled } from '@tabler/icons-react';

const theme = createTheme({
  /** Theme override here */
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
