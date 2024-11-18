// mapboxgl
// Fix map on production
import '../../utils/mapboxgl';

import MapGL from 'react-map-gl';
import { useState } from 'react';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
// _mock
import { _mapContact } from '../../_mock';
// config
// import { MAPBOX_API } from '../../config';
// components
import Iconify from '../../components/Iconify';
import { MapControlPopup, MapControlMarker, MapControlScale, MapControlNavigation } from '../../components/map';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  zIndex: 0,
  height: 560,
  overflow: 'hidden',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  '& .mapboxgl-ctrl-logo, .mapboxgl-ctrl-bottom-right': {
    display: 'none',
  },
}));

// ----------------------------------------------------------------------

export default function ContactMap() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const [tooltip, setTooltip] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 12,
    longitude: 42,
    zoom: 2,
  });

  return (
    <RootStyle>
      
    </RootStyle>
  );
}
