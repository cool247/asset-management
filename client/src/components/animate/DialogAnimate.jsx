import PropTypes from 'prop-types';
import { m, AnimatePresence } from 'framer-motion';
// @mui
import { Dialog, Box, Paper } from '@mui/material';
//
import { varFade } from './variants';

// ----------------------------------------------------------------------

export default function DialogAnimate({ open = false, variants, onClose, children, sx, maxWidth, ...other }) {
  return (
    <Dialog fullWidth maxWidth={maxWidth} open={open} onClose={onClose} {...other}>
      {children}
    </Dialog>
  );
}
