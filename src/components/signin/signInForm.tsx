import {
  Anchor,
  Divider,
  Group,
  Text,
  PasswordInput,
  TextInput,
  Button,
  Stack,
  Center,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from '@tanstack/react-router';
import { useIntl } from 'react-intl';

function Disclaimer() {
  const intl = useIntl();

  return (
    <Group gap="sm" align="baseline">
      <Text fw={400} size="lg" w="15%">
        {intl.formatMessage({ id: 'DISCLAIMER_TITLE' })}
      </Text>
      <Text size="xs" c="dimmed" w="82%">
        {intl.formatMessage({ id: 'DISCLAIMER_CONTENT' })}
      </Text>
    </Group>
  );
}

function SignInForm() {
  const intl = useIntl();

  const navigate = useNavigate();
  const form = useForm({
    mode: 'uncontrolled',
    validateInputOnBlur: true,
    initialValues: {
      email: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });
  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        console.log(values);
        await navigate({ to: '/dashboard' });
      })}
    >
      <Stack align="center" gap="xl">
        <Title order={3}>Sign in to your account</Title>
        <Stack w="460" gap="lg">
          <TextInput
            label={intl.formatMessage({ id: 'USN_EMAIL' })}
            placeholder="Enter username or email"
            key={form.key('email')}
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label={intl.formatMessage({ id: 'PASSWORD' })}
            placeholder="Enter password"
            minLength={5}
            {...form.getInputProps('password')}
          />
          <Button type="submit" variant="filled" color="gray">
            {intl.formatMessage({ id: 'SIGN_IN' })}
          </Button>
          <Anchor href="#" underline="hover" c="black">
            {intl.formatMessage({ id: 'FORGOT_PWD' })}
          </Anchor>
          <Divider my="xs" label="or" labelPosition="center" />

          <Center>
            <Text c="dimmed">
              {intl.formatMessage({ id: 'CREATE_ACCOUNT' })}{' '}
              <Anchor href="#" underline="hover" c="black">
                {intl.formatMessage({ id: 'REGISTER' })}
              </Anchor>
            </Text>
          </Center>
        </Stack>

        <Disclaimer />
      </Stack>
    </form>
  );
}

export default SignInForm;
