import { useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { useObtenerTours } from 'src/actions/excursion';
import { useObtenerCategorias } from 'src/actions/category';
import { useObtenerDestinos } from 'src/actions/destination';

import { TourListView } from 'src/sections/tour/view';

const metadata = { title: `Tours | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const { destinyId } = useParams();

  const { tours } = useObtenerTours();

  const { destinations } = useObtenerDestinos();

  const { categories } = useObtenerCategorias();

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <TourListView
        tours={tours}
        destinations={destinations}
        categories={categories}
        destinyId={destinyId}
      />
    </>
  );
}
