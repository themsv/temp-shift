import { createFileRoute, Outlet } from '@tanstack/react-router';
import { AppShell } from '@mantine/core';

import SideNavbar from '@app/components/app-layout/side-navbar';
import Header from '@app/components/app-layout/header';
import appLayoutConfig from '@app/consts/app-layout';

export const Route = createFileRoute('/(app)')({
  component: MainLayout,
});

function MainLayout() {
  return (
    <AppShell
      layout="alt"
      padding={appLayoutConfig.padding}
      header={{ height: appLayoutConfig.header.height }}
      navbar={{
        width: appLayoutConfig.navbar.width,
        breakpoint: appLayoutConfig.navbar.breakpoint,
      }}
      styles={{
        header: {
          borderBottom: '1px solid #000',
        },
        navbar: {
          background: '#000',
        },
      }}
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Navbar>
        <SideNavbar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
