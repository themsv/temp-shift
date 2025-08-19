import { useLocation, useNavigate } from '@tanstack/react-router';
import { Center, Select, Stack, Text, ActionIcon, Group, Box } from '@mantine/core';
import { IconChevronLeft, IconChevronRight, IconSearch, IconX } from '@tabler/icons-react';
import { useAnalyze } from '../../context/useAnalyze';

export default function SearchSecurity() {
  const { isExpanded, setIsExpanded, changeFlex, setChangeFlex, setData, data } = useAnalyze();
  const navigate = useNavigate();
  const location = useLocation();
  const fromButton = location.state.fromButton === true;
  return (
    <Box
      style={{
        flex: 1,
        transition: 'width 0.3s ease',
        padding: '0.5%',
        border: '1px solid #dcdcdc',
        backgroundColor: '#FFFFF',
      }}
    >
      <Group justify="space-between">
        {fromButton ? (
          <Text fw={500}> Stock Profile </Text>
        ) : (
          <Group gap={0}>
            {changeFlex === true ? null : isExpanded === false ? (
              <IconChevronLeft
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  void navigate({ to: '/analyze/stock-profile' });
                  setIsExpanded(true);
                }}
              />
            ) : (
              <IconChevronRight
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  {
                    setIsExpanded(false);
                    void navigate({ to: '/analyze/115' });
                  }
                }}
              />
            )}
            <Text fw={500}> Stock Profile </Text>
          </Group>
        )}
        <ActionIcon
          onClick={() => {
            window.history.back();
            setData(null);
            setChangeFlex(false);
            setIsExpanded(false);
          }}
          aria-label="Go back"
          variant="transparent"
          size="lg"
        >
          <IconX color="black" size={20} />
        </ActionIcon>
      </Group>
      <Center h={isExpanded === true ? 500 : 570}>
        <Stack align="center">
          <Text> Add security for comparison </Text>
          <Select
            searchable
            rightSection={<IconSearch style={{ color: 'var(--mantine-color-skyblue-5)' }} />}
            placeholder="Search"
            clearable
            size="xs"
            style={{
              width:
                isExpanded === true || fromButton
                  ? 'clamp(180px, 40vw  , 450px)'
                  : 'clamp(180px, 15vw  , 450px)',
              border: '1px solid var(--mantine-color-skyblue-5)',
            }}
            data={[
              { value: 'IAG AU', label: 'Insurance Australian Group Limited' },
              { value: 'McQ', label: 'Macquarie Investment Bank' },
            ]}
            value={data ? data.value : null}
            onChange={(_value, option) => {
              setData(option);
              setChangeFlex(true);
            }}
          />
        </Stack>
      </Center>
    </Box>
  );
}
