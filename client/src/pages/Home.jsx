// @mui
import { styled } from '@mui/material/styles';
// components

// sections
import {
  HomeHero,
  HomeMinimal,
  HomeDarkMode,
  HomeLookingFor,
  HomeColorPresets,
  HomePricingPlans,
  HomeAdvertisement,
  HomeCleanInterfaces,
  HomeHugePackElements,
} from '../sections/home';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  height: '100%',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <RootStyle>
      <HomeHero />
      <ContentStyle>
        <HomeMinimal />

        {/* <HomeHugePackElements /> */}

        {/* <HomeDarkMode /> */}

        <HomeColorPresets />

        {/* <HomeCleanInterfaces /> */}

        {/* <HomePricingPlans /> */}

        {/* <HomeLookingFor /> */}

        <HomeAdvertisement />
      </ContentStyle>
    </RootStyle>
  );
}
