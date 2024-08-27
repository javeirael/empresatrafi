import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';
import { useObtenerTour } from 'src/actions/excursion';

import { TourDetailsView } from 'src/sections/tour/view';

const metadata = { title: `Tour details - ${CONFIG.site.name}` };

export default function Page() {
  const { id = '' } = useParams();

  const { tour, tourLoading } = useObtenerTour(id);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <TourDetailsView tour={tour} tourLoading={tourLoading} />
    </>
  );
}
