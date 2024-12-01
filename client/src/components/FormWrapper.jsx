import PropTypes from "prop-types";
// @mui
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
//
import { LoadingButton } from "@mui/lab";
import { Close } from "@mui/icons-material";

// ----------------------------------------------------------------------

FormWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func,
  sx: PropTypes.object,
  variants: PropTypes.object,
};

export default function FormWrapper({
  onClose,
  children,
  onSubmit,
  submitText = "Save",
  onReset,
  loading,
  isEditMode,
  maxWidth,
  disabled,
  title,
  ...other
}) {
  return (
    // <AnimatePresence>
    <Dialog
      maxWidth={maxWidth || "sm"}
      open
      onClose={(event, reason) => {
        if (reason === "backdropClick") {
          return false;
        }
        onClose();
      }}
      {...other}
    >
      <AppBar
        sx={{
          position: "relative",
          background: theme => theme.palette.primary.lighter,
          color: theme => theme.palette.primary.darker,
        }}
      >
        <Toolbar variant="dense">
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {title || ""}
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
            size="small"
          >
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent dividers>{children}</DialogContent>
      <Divider />
      <DialogActions>
        {onSubmit && (
          <LoadingButton
            onClick={onSubmit}
            variant="contained"
            color="success"
            loading={loading}
            disabled={disabled}
          >
            {isEditMode ? "Update" : submitText}
          </LoadingButton>
        )}
        {onReset && (
          <Button onClick={onReset} variant="contained" color="warning">
            Reset
          </Button>
        )}
        <Button onClick={onClose} variant="contained" color="error">
          Close
        </Button>
      </DialogActions>
    </Dialog>
    // </AnimatePresence>
  );
}
