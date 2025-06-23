import { createFileRoute, Outlet } from '@tanstack/react-router';
import { AppShell } from '@mantine/core';

import SideNavbar from '@app/components/app-layout/side-navbar';
import Header from '@app/components/app-layout/header';

export const Route = createFileRoute('/(app)')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppShell
      layout="alt"
      header={{ height: 52 }}
      navbar={{
        width: 64,
        breakpoint: 'xs',
      }}
      styles={{
        header: {
          borderBottom: '1px solid #000',
        },
        navbar: {
          background: '#000',
        },
      }}
      p="lg"
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
