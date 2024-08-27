import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ResetPasswordView } from 'src/sections/auth';

const metadata = { title: `Reset Password - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ResetPasswordView />
    </>
  );
}
