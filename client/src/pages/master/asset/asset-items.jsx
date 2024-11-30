import { Close } from "@mui/icons-material";
import { AppBar, Button, Dialog, DialogActions, DialogContent, IconButton, Toolbar, Typography } from "@mui/material";
import { useGetAssetItemByAssetId } from "../../../api-hook";
import MRTTable from "../../../components/mrt-table";

const columns = [
  { accessorKey: "barcodeId", header: "Barcode ID" },
  { accessorKey: "rackOrCupboardBoardName", header: "Rack/Cupboard Name" },
  { accessorKey: "userName", header: "User Name" },
];

export default function AddAssetItems({ onClose, row, assetTypeId }) {
  const { data, isLoading } = useGetAssetItemByAssetId(assetTypeId);
  console.log(row);
  return (
    <Dialog
      maxWidth="lg"
      fullWidth
      open
      onClose={(event, reason) => {
        if (reason === "backdropClick") {
          return false;
        }
        onClose();
      }}>
      <AppBar
        sx={{
          position: "relative",
          background: (theme) => theme.palette.primary.lighter,
          color: (theme) => theme.palette.primary.darker,
        }}
        variant="outlined">
        <Toolbar variant="dense">
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Items
          </Typography>
          <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close" size="small">
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent dividers>
        <MRTTable data={data || []} columns={columns} loading={isLoading} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="error">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
