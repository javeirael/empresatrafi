import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { useObtenerCuentas } from 'src/actions/account';

import { SignUpView } from 'src/sections/auth';

// ----------------------------------------------------------------------

const metadata = { title: `Sign up - ${CONFIG.site.name}` };

export default function Page() {
  const { accounts } = useObtenerCuentas();

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <SignUpView accounts={accounts} />
    </>
  );
}
