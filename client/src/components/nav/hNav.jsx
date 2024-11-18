import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import ChevronDownIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";

const NavigationMenu = React.forwardRef(
  ({ children, className, ...props }, ref) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div className={className} ref={ref}>
        <IconButton
          {...props}
          onClick={handleClick}
          aria-controls="navigation-menu"
          aria-haspopup="true"
        >
          {children}
          <ChevronDownIcon />
        </IconButton>
        <Menu
          id="navigation-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          getContentAnchorEl={null}
        >
          {React.Children.map(children, (child) =>
            React.cloneElement(child, { onClose: handleClose })
          )}
        </Menu>
      </div>
    );
  }
);

const NavigationMenuItem = ({ onClose, ...props }) => {
  const handleClose = () => {
    onClose && onClose();
  };

  return <MenuItem onClick={handleClose} {...props} />;
};

export { NavigationMenu, NavigationMenuItem };
