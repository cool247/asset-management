import { Fragment, useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Input, InputAdornment, Divider, Box, Typography, Stack, ListItem, ListItemText, List } from '@mui/material';
// utils
// components
import Iconify from '../../../components/Iconify';
import { DialogAnimate, IconButtonAnimate } from '../../../components/animate';
import navConfig from '../navbar/NavConfig';
import Scrollbar from '../../../components/Scrollbar';
import { useNavigate } from 'react-router';

// ----------------------------------------------------------------------

// --------------------------------------------------ks--------------------

export default function Searchbar() {
  const [isOpen, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleInputChange(e) {
    setSearchTerm(e.target.value);
  }

  return (
    <div>
      {!isOpen && (
        <IconButtonAnimate onClick={handleOpen}>
          <Iconify icon="eva:search-fill" width={20} height={20} />
        </IconButtonAnimate>
      )}

      <DialogAnimate open={isOpen} onClose={handleClose}>
        <Stack maxWidth="sm" sx={{ minHeight: 481 }}>
          <Stack flexDirection="row" justifyContent="space-between" sx={{ padding: { xs: 2, lg: 3 } }}>
            <Input
              sx={{ mr: 1 }}
              onChange={handleInputChange}
              value={searchTerm}
              autoFocus
              fullWidth
              disableUnderline
              placeholder="Search…"
              startAdornment={
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                </InputAdornment>
              }
            />

            <Box
              sx={{
                backgroundColor: 'divider',
                px: 1,
                height: 24,
                lineHeight: 1.5,
                fontFamily: 'monospace',
                fontWeight: 600,
                color: 'text.secondary',
                fontSize: '14px',
              }}
              borderRadius={1}
            >
              Esc
            </Box>
          </Stack>
          <Divider />

          <NavListOptions onClose={handleClose} searchTerm={searchTerm} />
        </Stack>
      </DialogAnimate>
    </div>
  );
}

const list = navConfig.flatMap((el) => el.items);

function filterByTitle(data, title) {
  const lowercaseTitle = title.toLowerCase();
  return data.filter((item) => item.title.toLowerCase().includes(lowercaseTitle));
}

function NavListOptions({ onClose, searchTerm }) {
  const navigate = useNavigate();
  // console.log(list);
  function handleLink(path) {
    if (path) {
      navigate(path);
      onClose();
    }
  }

  const highlightMatch = (title, searchText) => {
    if (!searchText) return title; // Return original title if search text is empty
    const lowerCaseTitle = title.toLowerCase();
    const index = lowerCaseTitle.indexOf(searchText.toLowerCase());
    if (index === -1) return title; // Return original title if search text is not found
    const beforeMatch = title.slice(0, index);
    const match = title.slice(index, index + searchText.length);
    const afterMatch = title.slice(index + searchText.length);
    return (
      <>
        {beforeMatch}
        <Typography  variant='subtitle2' component="span" color="primary">
          {match}
        </Typography>
        {afterMatch}
      </>
    );
  };

  return (
    <Scrollbar sx={{ maxHeight: 400, overflow: 'auto', paddingInline: 3, marginInline: 1 }}>
      <List sx={{ width: '100%' }}>
        {filterByTitle(list, searchTerm).map((s, i) => (
          <Fragment key={i}>
            <ListItem
              alignItems="flex-start"
              sx={{
                cursor: 'pointer',
                border: '1px dashed transparent',
                borderRadius: 1,
                ':hover': {
                  backgroundColor: (theme) => alpha(theme.palette.primary.lighter, 0.2),
                  border: '1px dashed',
                  borderColor: 'primary',
                },
              }}
            >
              <ListItemText
                onClick={() => handleLink(s.path)}
                primaryTypographyProps={{ variant: 'subtitle2' }}
                primary={highlightMatch(s.title, searchTerm)}
                secondary={
                  <Fragment>
                    <Typography sx={{ display: 'inline' }} component="span" variant="caption" color="text.secondary">
                      {s.path}
                    </Typography>
                  </Fragment>
                }
              />
            </ListItem>

            <Divider variant="fullWidth" sx={{ borderBottomStyle: 'dashed', mx: 1 }} component="li" />
          </Fragment>
        ))}
      </List>
    </Scrollbar>
  );
}
