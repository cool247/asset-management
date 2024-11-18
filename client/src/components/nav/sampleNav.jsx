import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';

const data = [
  {
    label: 'Home',
    url: '/home',
    subMenu: [
      { label: 'Submenu 1', url: '/submenu1' },
      { label: 'Submenu 2', url: '/submenu2' },
      { label: 'Submenu 3', url: '/submenu3' },
    ],
  },
  {
    label: 'About',
    url: '/about',
  },
  {
    label: 'Services',
    url: '/services',
    subMenu: [
      { label: 'Submenu 1', url: '/services/submenu1' },
      { label: 'Submenu 2', url: '/services/submenu2' },
    ],
  },
  {
    label: 'Contact',
    url: '/contact',
  },
];

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handlePopoverOpen = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedIndex(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      {data.map((item, index) => (
        <div key={index}>
          <Button
            aria-owns={open ? `popover-${index}` : undefined}
            aria-haspopup="true"
            onMouseEnter={(e) => handlePopoverOpen(e, index)}
            onMouseLeave={handlePopoverClose}
          >
            {item.label}
          </Button>
          <Popover
            id={`popover-${index}`}
            open={open && selectedIndex === index}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            {item.subMenu && (
              <div>
                {item.subMenu.map((subItem, subIndex) => (
                  <MenuItem key={subIndex} onClick={handlePopoverClose}>
                    {subItem.label}
                  </MenuItem>
                ))}
              </div>
            )}
          </Popover>
        </div>
      ))}
    </>
  );
};

export default Navbar;
