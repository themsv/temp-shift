import { Link } from '@tanstack/react-router';
import { Group, Text, ActionIcon } from '@mantine/core';
import { IconUserCircle } from '@tabler/icons-react';

import { IconMCQLogo, IconLogout } from '../ui-core/icons';

function Header() {
  return (
    <Group justify="space-between" align="center" h="100%" px="lg">
      <Text fw={500} size="lg" style={{ letterSpacing: '2px' }}>
        <IconMCQLogo />
      </Text>
      <Group align="center">
        <IconUserCircle size={32} />
        <Text>John Doe</Text>
        <ActionIcon variant="transparent" component={Link} to="/login">
          <IconLogout />
        </ActionIcon>
      </Group>
    </Group>
  );
}
export default Header;
