import { paths } from 'src/routes/paths';

import { Iconify } from 'src/components/iconify';

export const navData = [
  {
    subheader: 'Trafictours',
    items: [
      {
        title: 'Home',
        path: paths.dashboard.root,
        icon: <Iconify icon="ic:round-home" className="w-6 h-6" />,
      },
      {
        title: 'Tours',
        path: paths.dashboard.tours.root('789f8cf1-de57-4ddf-8796-7de288805d27'),
        icon: <Iconify icon="material-symbols:tsunami" className="w-6 h-6" />,
      },
      {
        title: 'Transfers',
        path: paths.dashboard.transfers,
        icon: <Iconify icon="mdi:bus" className="w-6 h-6" />,
      },
    ],
  },
];
