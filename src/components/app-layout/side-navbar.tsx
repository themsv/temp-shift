import type { ComponentType } from 'react';
import { Link, useMatchRoute } from '@tanstack/react-router';
import type { LinkProps } from '@tanstack/react-router';
import { useIntl } from 'react-intl';
import {
  ActionIcon,
  Drawer,
  Group,
  Image,
  Stack,
  Text,
  Tooltip,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronRight, IconChevronLeft } from '@tabler/icons-react';
import { IconDashboard, IconData, IconHelp, IconMCQLogo, IconSettings } from '@app/ui-core/icons';

function SideNavbar() {
  const [opened, { open, close }] = useDisclosure();
  const intl = useIntl();

  return (
    <>
      {/* Expanded mode */}
      <Drawer
        opened={opened}
        onClose={close}
        withCloseButton={false}
        size={198}
        styles={{
          content: {
            backgroundColor: '#000',
            overflow: 'visible',
          },
        }}
      >
        <Stack justify="space-between" align="flex-start" h="92vh">
          <Stack gap="xl">
            <IconMCQLogo size="26" />
            <ExpandedNavItem
              to="/dashboard"
              label={intl.formatMessage({ id: 'NAV_ITEM_DASHBOARD' })}
              icon={IconDashboard}
            />
            <ExpandedNavItem
              to="/reference-data"
              label={intl.formatMessage({ id: 'NAV_ITEM_REFERENCE_DATA' })}
              icon={IconData}
            />
          </Stack>
          <ActionIcon
            onClick={close}
            color="#5A5A58"
            radius="lg"
            size="md"
            style={{
              alignSelf: 'flex-end',
              right: -30,
            }}
          >
            <IconChevronLeft color="white" size={20} />
          </ActionIcon>

          <Stack gap="xl">
            <ExpandedNavItem
              to="/settings"
              label={intl.formatMessage({ id: 'NAV_ITEM_SETTINGS' })}
              icon={IconSettings}
            />
            <ExpandedNavItem
              to="/help"
              label={intl.formatMessage({ id: 'NAV_ITEM_HELP' })}
              icon={IconHelp}
            />
          </Stack>
        </Stack>
      </Drawer>

      {/* Collapsed Mode */}
      <Stack justify="space-between" align="center" h="92vh" my={8}>
        <Stack gap="xl" align="center">
          <Image src="/logo_mini.png" alt="Shorter version of Macquarie logo" w="48" />
          <CollapsedNavItem
            to="/dashboard"
            label={intl.formatMessage({ id: 'NAV_ITEM_DASHBOARD' })}
            icon={IconDashboard}
          />
          <CollapsedNavItem
            to="/reference-data"
            label={intl.formatMessage({ id: 'NAV_ITEM_REFERENCE_DATA' })}
            icon={IconData}
          />
        </Stack>

        <ActionIcon
          onClick={open}
          color="#5A5A58"
          radius="lg"
          size="md"
          style={{
            alignSelf: 'flex-end',
            right: -13,
          }}
        >
          <IconChevronRight color="white" size={20} />
        </ActionIcon>

        <Stack gap="xl">
          <CollapsedNavItem
            to="/settings"
            label={intl.formatMessage({ id: 'NAV_ITEM_SETTINGS' })}
            icon={IconSettings}
          />
          <CollapsedNavItem
            to="/help"
            label={intl.formatMessage({ id: 'NAV_ITEM_HELP' })}
            icon={IconHelp}
          />
        </Stack>
      </Stack>
    </>
  );
}

export default SideNavbar;

interface NavItemProps {
  to: LinkProps['to'];
  label: string;
  icon: ComponentType<{ color: string }>;
}
function ExpandedNavItem({ to, label, icon: Icon }: Readonly<NavItemProps>) {
  const matchRoute = useMatchRoute();
  const { primaryColor, colors } = useMantineTheme();

  const color = matchRoute({ to }) ? colors[primaryColor][5] : '#fff';

  return (
    <UnstyledButton component={Link} to={to}>
      <Group>
        <Icon color={color} />
        <Text c={color}>{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

function CollapsedNavItem({ to, label, icon: Icon }: Readonly<NavItemProps>) {
  const matchRoute = useMatchRoute();
  const { primaryColor, colors } = useMantineTheme();

  const color = matchRoute({ to }) ? colors[primaryColor][5] : '#fff';

  return (
    <Tooltip position="right" label={label}>
      <ActionIcon component={Link} to={to} variant="transparent" size={36}>
        <Icon color={color} />
      </ActionIcon>
    </Tooltip>
  );
}
