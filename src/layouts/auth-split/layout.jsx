import { Section } from './section';
import { Main, Content } from './main';
import { LayoutSection } from '../core/layout-section';

// ----------------------------------------------------------------------

export function AuthSplitLayout({ sx, section, children }) {
  const layoutQuery = 'md';

  return (
    <LayoutSection
      headerSection={null}
      footerSection={null}
      sx={sx}
      cssVars={{
        '--layout-auth-content-width': '420px',
      }}
    >
      <Main layoutQuery={layoutQuery}>
        <Section
          title={section?.title}
          layoutQuery={layoutQuery}
          imgUrl={section?.imgUrl}
          subtitle={section?.subtitle}
        />
        <Content layoutQuery={layoutQuery}>{children}</Content>
      </Main>
    </LayoutSection>
  );
}
