import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { useObtenerDestinos } from 'src/actions/destination';

import { HomeView } from 'src/sections/home/view';

const metadata = { title: `Home | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const { destinations } = useObtenerDestinos();
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <HomeView destinations={destinations} />
    </>
  );
}
