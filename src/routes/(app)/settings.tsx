import { useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useIntl } from 'react-intl';
import {
  Card,
  Center,
  Divider,
  Grid,
  Select,
  Stack,
  Text,
  Title,
  LoadingOverlay,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import {
  staticSettingsQueryOptions,
  useGetUserSettings,
  useUpdateUserSettings,
} from '@app/data/api';
import type { SettingType } from '@app/data/types/setting';

export const Route = createFileRoute('/(app)/settings')({
  component: Settings,
  loader: ({ context }) => context.queryClient.ensureQueryData(staticSettingsQueryOptions()),
});

const initialValues = {
  country: '',
  shortDate: '',
  longDate: '',
  clockFormat: '',
  shortTime: '',
  longTime: '',
  numericAlignment: '',
  textAlignment: '',
  defaultCurrency: '',
  defaultUniverse: '',
};
function Settings() {
  const { formatMessage } = useIntl();
  const { data: staticSettings } = useSuspenseQuery(staticSettingsQueryOptions());
  const { data: userSettings, isPending: pendingUserSetting } = useGetUserSettings();

  const { mutate, isPending: pendingUpdate } = useUpdateUserSettings();

  const form = useForm({
    initialValues: initialValues,
    onValuesChange: (curr) => {
      // Identify which form field has been changed using form dirty instead of diff b/w curr, prev states
      const changedField = Object.keys(curr).find((key) => form.isDirty(key));
      const payload = userSettings?.original.find((setting) => setting.type === changedField);
      if (changedField && payload) {
        console.log(changedField);
        mutate(
          {
            id: payload.referenceId,
            type: changedField,
            data: curr[changedField as SettingType],
          },
          {
            onSuccess: () => {
              // reset dirty status to avoid dupe API calls
              form.resetDirty();
              notifications.show({
                title: 'Success',
                message: 'Updated Successfully',
                color: 'green',
              });
            },
          },
        );
      }
    },
  });

  useEffect(() => {
    if (userSettings) {
      form.setInitialValues(userSettings.transformed);
      form.setValues(userSettings.transformed);
    }
  }, [userSettings]);

  if (pendingUserSetting) return <LoadingOverlay visible />;
  return (
    <Stack>
      <Title order={3}>{formatMessage({ id: 'SETTINGS_PAGE_TITLE' })}</Title>
      <Center>
        <Stack w="70vw" component={Card}>
          <Grid>
            <Grid.Col span={{ lg: 10, md: 9 }}>
              {formatMessage({ id: 'SETTINGS_COUNTRY_REGION' })}
            </Grid.Col>

            <Grid.Col span={{ lg: 2, md: 3 }}>
              <Select
                {...form.getInputProps('country')}
                data={staticSettings.country}
                // avoid user changing the field immediately when the mutation in progress instead of debounce
                readOnly={pendingUpdate}
              />
            </Grid.Col>

            <Grid.Col span={12} my="sm">
              <Divider />
            </Grid.Col>
            <Grid.Col span={12}>
              <Text fw={600}>{formatMessage({ id: 'SETTINGS_HEADER_DATE_TIME' })}</Text>
            </Grid.Col>

            <Grid.Col span={{ lg: 10, md: 9 }}>
              {formatMessage({ id: 'SETTINGS_DATE_SHORT' })}
            </Grid.Col>

            <Grid.Col span={{ lg: 2, md: 3 }}>
              <Select
                {...form.getInputProps('shortDate')}
                data={staticSettings.shortDate}
                readOnly={pendingUpdate}
              />
            </Grid.Col>

            <Grid.Col span={{ lg: 10, md: 9 }}>
              {formatMessage({ id: 'SETTINGS_DATE_LONG' })}
            </Grid.Col>

            <Grid.Col span={{ lg: 2, md: 3 }}>
              <Select
                {...form.getInputProps('longDate')}
                data={staticSettings.longDate}
                readOnly={pendingUpdate}
              />
            </Grid.Col>

            <Grid.Col span={{ lg: 10, md: 9 }}>
              {formatMessage({ id: 'SETTINGS_TIME_CLOCK' })}
            </Grid.Col>

            <Grid.Col span={{ lg: 2, md: 3 }}>
              <Select
                {...form.getInputProps('clockFormat')}
                data={staticSettings.clockFormat}
                readOnly={pendingUpdate}
              />
            </Grid.Col>

            <Grid.Col span={{ lg: 10, md: 9 }}>
              {formatMessage({ id: 'SETTINGS_TIME_SHORT' })}
            </Grid.Col>

            <Grid.Col span={{ lg: 2, md: 3 }}>
              <Select
                {...form.getInputProps('shortTime')}
                data={staticSettings.shortTime}
                readOnly={pendingUpdate}
              />
            </Grid.Col>

            <Grid.Col span={{ lg: 10, md: 9 }}>
              {formatMessage({ id: 'SETTINGS_TIME_LONG' })}
            </Grid.Col>

            <Grid.Col span={{ lg: 2, md: 3 }}>
              <Select
                {...form.getInputProps('longTime')}
                data={staticSettings.longTime}
                readOnly={pendingUpdate}
              />
            </Grid.Col>
            <Grid.Col span={12} my="sm">
              <Divider />
            </Grid.Col>
            <Grid.Col span={12}>
              <Text fw={600}>{formatMessage({ id: 'SETTINGS_HEADER_ALIGNMENT' })}</Text>
            </Grid.Col>

            <Grid.Col span={{ lg: 10, md: 9 }}>
              {formatMessage({ id: 'SETTINGS_ALIGNMENT_NUMERIC' })}
            </Grid.Col>

            <Grid.Col span={{ lg: 2, md: 3 }}>
              <Select
                {...form.getInputProps('numericAlignment')}
                data={staticSettings.numericAlignment}
                readOnly={pendingUpdate}
              />
            </Grid.Col>

            <Grid.Col span={{ lg: 10, md: 9 }}>
              {formatMessage({ id: 'SETTINGS_ALIGNMENT_TEXT' })}
            </Grid.Col>

            <Grid.Col span={{ lg: 2, md: 3 }}>
              <Select
                {...form.getInputProps('textAlignment')}
                data={staticSettings.textAlignment}
                readOnly={pendingUpdate}
              />
            </Grid.Col>

            <Grid.Col span={12} my="sm">
              <Divider />
            </Grid.Col>

            <Grid.Col span={{ lg: 10, md: 9 }}>
              {formatMessage({ id: 'SETTINGS_DEFAULT_CCY' })}
            </Grid.Col>

            <Grid.Col span={{ lg: 2, md: 3 }}>
              <Select
                {...form.getInputProps('defaultCurrency')}
                data={staticSettings.defaultCurrency}
                readOnly={pendingUpdate}
              />
            </Grid.Col>
            <Grid.Col span={12} my="sm">
              <Divider />
            </Grid.Col>

            <Grid.Col span={{ lg: 10, md: 9 }}>
              {formatMessage({ id: 'SETTINGS_DEFAULT_UNIV' })}
            </Grid.Col>

            <Grid.Col span={{ lg: 2, md: 3 }}>
              <Select
                {...form.getInputProps('defaultUniverse')}
                data={staticSettings.defaultUniverse}
                readOnly={pendingUpdate}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Divider />
            </Grid.Col>
          </Grid>
        </Stack>
      </Center>
    </Stack>
  );
}
