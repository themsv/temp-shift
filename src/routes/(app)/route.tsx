import { createFileRoute, Outlet } from '@tanstack/react-router';
import { AppShell } from '@mantine/core';

import SideNavbar from '../../components/side-navbar';
import Header from '../../components/header';

export const Route = createFileRoute('/(app)')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppShell
      layout="alt"
      header={{ height: 64 }}
      navbar={{
        width: 64,
        breakpoint: 'sm',
      }}
      styles={{
        header: {
          borderBottom: '2px solid #000',
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
