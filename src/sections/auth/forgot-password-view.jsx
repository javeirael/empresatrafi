import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, Collapse, AlertTitle } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import EmailInboxIcon from 'src/assets/icons/email-inbox-icon';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { forgotPassword } from 'src/auth/context/jwt';

import { useTranslate } from 'src/locales';


export function ForgotPasswordView() {
  
  const { t } = useTranslate('auth');

  const ForgotPasswordSchema = zod.object({
    email: zod
      .string()
      .min(1, { message: 'forgot.email_required' })
      .email({ message: 'forgot.email_invalid' }),
  });
  
  const [errorMsg, setErrorMsg] = useState('');

  const [successMsg, setSuccessMsg] = useState('');

  const [openErrorCollapse, setOpenErrorCollapse] = useState(false);

  const [openSuccessCollapse, setOpenSuccessCollapse] = useState(false);



  const defaultValues = { email: '' };

  const methods = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
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
      const response = await forgotPassword(data);

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
      <EmailInboxIcon sx={{ mx: 'auto' }} />

      <Stack spacing={1} sx={{ mt: 3, mb: 5, textAlign: 'center', whiteSpace: 'pre-line' }}>
        <Typography variant="h5">{t('forgot.title')}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {t('forgot.subtitle')}
        </Typography>
      </Stack>
    </>
  );

  const renderForm = (
    <Stack spacing={3}>
      <Field.Text
        autoFocus
        name="email"
        label={t('forgot.email')}
        placeholder="example@gmail.com"
        InputLabelProps={{ shrink: true }}
      />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Send request..."
      >
        {t('forgot.submit')}
      </LoadingButton>

      <Link
        component={RouterLink}
        href={paths.auth.signIn}
        color="inherit"
        variant="subtitle2"
        sx={{ mx: 'auto', alignItems: 'center', display: 'inline-flex' }}
      >
        <Iconify icon="eva:arrow-ios-back-fill" width={16} sx={{ mr: 0.5 }} />
        {t('forgot.login')}
      </Link>
    </Stack>
  );

  return (
    <>
      {renderHead}

      {!!successMsg && (
        <Collapse in={openSuccessCollapse}>
          <Alert onClose={() => setOpenSuccessCollapse(false)} severity="success" sx={{ mb: 5 }}>
            <AlertTitle>Request send successfully</AlertTitle>
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
