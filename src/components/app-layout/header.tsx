import { Link } from '@tanstack/react-router';
import { Group, Text, Image, Menu, Button } from '@mantine/core';
import { IconLogout } from '@app/ui-core/icons';

function Header() {
  return (
    <Group justify="space-between" align="center" h="100%" px="lg">
      <Text fw={500} size="lg" style={{ letterSpacing: '1.5px' }}>
        MACQUARIE
      </Text>
      <Menu>
        <Menu.Target>
          <Button
            leftSection={<Image src="/jane_doe.jpg" alt="Jane Doe" h="25" w="25" radius="50%" />}
            variant="transparent"
          >
            Jane Doe
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item leftSection={<IconLogout size="20" />} component={Link} to="/">
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
export default Header;
