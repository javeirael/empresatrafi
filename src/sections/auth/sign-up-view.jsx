import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'react-phone-number-input';

import LoadingButton from '@mui/lab/LoadingButton';
import {
  Link,
  Alert,
  Stack,
  Collapse,
  MenuItem,
  AlertTitle,
  IconButton,
  Typography,
  InputAdornment,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

import { signUp } from 'src/auth/context/jwt';

import { useTranslation } from 'react-i18next';
import { useTranslate } from 'src/locales';
// ----------------------------------------------------------------------

export const SignUpSchema = zod.object({
  firstName: zod.string().min(1, { message: 'First name is required!' }),
  lastName: zod.string().min(1, { message: 'Last name is required !' }),
  accountId: zod.string().min(1, { message: 'Account ID is required!' }),
  phoneNumber: schemaHelper.phoneNumber({ isValidPhoneNumber }),
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  password: zod
    .string()
    .min(1, { message: 'Password is required!' })
    .min(8, { message: 'Password must be at least 8 characters!' }),
});

// ----------------------------------------------------------------------

export function SignUpView({ accounts }) {
  const password = useBoolean();

  const [errorMsg, setErrorMsg] = useState('');

  const [successMsg, setSuccessMsg] = useState('');

  const [openErrorCollapse, setOpenErrorCollapse] = useState(false);

  const [openSuccessCollapse, setOpenSuccessCollapse] = useState(false);

  const { t } = useTranslate('auth');

  const defaultValues = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    accountId: '',
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    if (openSuccessCollapse || openErrorCollapse) {
      setOpenSuccessCollapse(false);
      setOpenErrorCollapse(false);
    }

    try {
      const response = await signUp({
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        accountId: data.accountId,
        email: data.email,
        password: data.password,
      });

      if (response.isSuccess) {
        setSuccessMsg(response.message);
        setOpenSuccessCollapse(true);
      }
    } catch (error) {
      setErrorMsg(error.message);
      setOpenErrorCollapse(true);
    }
  });

  const renderHead = (
    <Stack spacing={1.5} sx={{ mb: 5 }}>
      <Typography variant="h5">{t('register.title')}</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {t('register.login')}
        </Typography>

        <Link component={RouterLink} href={paths.auth.signIn} variant="subtitle2">
          {t('register.login_link')}
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={3}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Field.Text
          name="firstName"
          label={t('register.name')}
          InputLabelProps={{ shrink: true }}
        />
        <Field.Text
          name="lastName"
          label={t('register.last_name')}
          InputLabelProps={{ shrink: true }}
        />
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Field.Phone name="phoneNumber" label={t('register.phone_number')} />

        <Field.Select name="accountId" label={t('register.ttoo')}>
          {accounts.map((account) => (
            <MenuItem key={account.id} value={account.id}>
              {account.name}
            </MenuItem>
          ))}
        </Field.Select>
      </Stack>

      <Field.Text name="email" label={t('register.email')} InputLabelProps={{ shrink: true }} />

      <Field.Text
        name="password"
        label={t('register.password')}
        placeholder="********"
        type={password.value ? 'text' : 'password'}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Create account..."
      >
        {t('register.submit')}
      </LoadingButton>
    </Stack>
  );

  const renderTerms = (
    <Typography
      component="div"
      sx={{
        mt: 3,
        textAlign: 'center',
        typography: 'caption',
        color: 'text.secondary',
      }}
    >
      {t('register.terms')}
    </Typography>
  );

  return (
    <>
      {renderHead}

      {!!errorMsg && (
        <Collapse in={openErrorCollapse}>
          <Alert
            onClose={() => setOpenErrorCollapse(false)}
            variant="standard"
            severity="error"
            sx={{ mb: 5 }}
          >
            <AlertTitle>Error</AlertTitle>
            {errorMsg}
          </Alert>
        </Collapse>
      )}

      {!!successMsg && (
        <Collapse in={openSuccessCollapse}>
          <Alert
            onClose={() => setOpenSuccessCollapse(false)}
            icon={<Iconify icon="ic:outline-email" />}
            variant="standard"
            severity="success"
            sx={{ mb: 5 }}
          >
            <AlertTitle>Verify Email</AlertTitle>
            {successMsg}
          </Alert>
        </Collapse>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </Form>

      {renderTerms}
    </>
  );
}
