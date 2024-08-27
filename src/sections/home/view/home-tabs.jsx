import { Tab, Tabs } from '@mui/material';

import { useTabs } from 'src/hooks/use-tabs';

import { Iconify } from 'src/components/iconify';

import { HomeTabToursContent } from '../home-tab-tours-content';
import { HomeTabTransfersContent } from '../home-tab-transfers-content';
import { useTranslate } from 'src/locales';

const TOUR_HOME_TABS = [
  { label: 'tabs.tours', value: 'tours', icon: 'material-symbols:tsunami' },
  { label: 'tabs.transfers', value: 'transfers', icon: 'mdi:bus' },
];

export function HomeTabs({ destinations }) {
  const tabs = useTabs('tours');

  const { t } = useTranslate('home');

  const renderTabs = (
    <Tabs value={tabs.value} onChange={tabs.onChange}>
      {TOUR_HOME_TABS.map((tab, index) => (
        <Tab
          key={index}
          iconPosition="end"
          label={t(tab.label)}
          value={tab.value}
          icon={<Iconify icon={tab.icon} />}
        />
      ))}
    </Tabs>
  );

  return (
    <>
      {renderTabs}

      {tabs.value === 'tours' && <HomeTabToursContent destinations={destinations} />}
      {tabs.value === 'transfers' && <HomeTabTransfersContent />}
    </>
  );
}
