import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Alert, Collapse, AlertTitle } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useQuery } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import NewPasswordIcon from 'src/assets/icons/new-password-icon';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { resetPassword } from 'src/auth/context/jwt';

export const ResetPasswordSchema = zod
  .object({
    password: zod
      .string()
      .min(1, { message: 'Password is required!' })
      .min(8, { message: 'Password must be at least 8 characters!' }),
    confirmPassword: zod.string().min(1, { message: 'Confirm password is required!' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match!',
    path: ['confirmPassword'],
  });

export function ResetPasswordView() {
  const query = useQuery();

  const password = useBoolean();

  const [errorMsg, setErrorMsg] = useState('');

  const [successMsg, setSuccessMsg] = useState('');

  const [openErrorCollapse, setOpenErrorCollapse] = useState(false);

  const [openSuccessCollapse, setOpenSuccessCollapse] = useState(false);

  const defaultValues = {
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    resolver: zodResolver(ResetPasswordSchema),
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
      const id = query.get('id');

      const resetPasswordToken = query.get('reset_password_token');

      const response = await resetPassword({
        ...data,
        password_reset_token: resetPasswordToken,
        id,
      });

      if (response.isSuccess) {
        setOpenSuccessCollapse(true);
        setSuccessMsg(response.message);
      }
    } catch (error) {
      setOpenErrorCollapse(true);
      setErrorMsg(error.message);
    }
  });

  const renderHead = (
    <>
      <NewPasswordIcon sx={{ mx: 'auto' }} />

      <Stack spacing={1} sx={{ mt: 3, mb: 5, textAlign: 'center', whiteSpace: 'pre-line' }}>
        <Typography variant="h5">Change your password</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {`Enter your new password below. Don't use the same password you have used before.`}
        </Typography>
      </Stack>
    </>
  );

  const renderForm = (
    <Stack spacing={3}>
      <Field.Text
        name="password"
        label="Password"
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

      <Field.Text
        name="confirmPassword"
        label="Confirm new password"
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
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Reset password..."
      >
        Reset password
      </LoadingButton>

      <Link
        component={RouterLink}
        href={paths.auth.signIn}
        color="inherit"
        variant="subtitle2"
        sx={{ mx: 'auto', alignItems: 'center', display: 'inline-flex' }}
      >
        <Iconify icon="eva:arrow-ios-back-fill" width={16} sx={{ mr: 0.5 }} />
        Return to sign in
      </Link>
    </Stack>
  );

  return (
    <>
      {renderHead}

      {!!successMsg && (
        <Collapse in={openSuccessCollapse}>
          <Alert
            icon={<Iconify icon="mdi:password-check" />}
            onClose={() => setOpenSuccessCollapse(false)}
            severity="success"
            sx={{ mb: 5 }}
          >
            <AlertTitle>Updated password</AlertTitle>
            {successMsg}
          </Alert>
        </Collapse>
      )}

      {!!errorMsg && (
        <Collapse in={openErrorCollapse}>
          <Alert onClose={() => setOpenErrorCollapse(false)} severity="error" sx={{ mb: 5 }}>
            {errorMsg}
          </Alert>
        </Collapse>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </Form>
    </>
  );
}
