import { Close } from "@mui/icons-material";
import { AppBar, Button, Dialog, DialogActions, DialogContent, IconButton, Toolbar, Typography } from "@mui/material";
import { useGetAssetItemByAssetId } from "../../../api-hook";
import MRTTable from "../../../components/mrt-table";
import { useState } from "react";
import AddAssetItem from "./add-asset-items";

const columns = [
  { accessorKey: "asset_items.barcodeId", header: "Barcode ID" },
  { accessorKey: "rackOrCupboardBoardName", header: "Rack/Cupboard Name" },
  { accessorKey: "userName", header: "User Name" },
];

export default function AddAssetItems({ onClose, row,  }) {
  const { data, isLoading, refetch } = useGetAssetItemByAssetId(row.original.assetId);
const [open, setOpen] = useState(false);
const [selectedRow, setSelectedRow] = useState(false);

console.log(row,"===========")
  return (
    <>

{open && (
        <AddAssetItem
          onClose={() => {
            setSelectedRow(null);
            setOpen(false);
          }}
          row={selectedRow}
          refetch={refetch}
          assetId={row.original.assetId}
        />
      )}

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
        <MRTTable data={data || []} columns={columns} loading={isLoading} renderTopToolbarCustomActions={() => (
          
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setOpen(true);
              }}>
              Add New Item
            </Button>
          
        )} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="error">
          Close
        </Button>
      </DialogActions>
    </Dialog>

    </>
  );
}
