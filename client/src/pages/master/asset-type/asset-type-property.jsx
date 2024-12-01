import { Close } from "@mui/icons-material";
import { AppBar, Button, Dialog, DialogActions, DialogContent, IconButton, Toolbar, Typography } from "@mui/material";
import { useGetAssetTypeWithPropertiesById } from "../../../api-hook";
import MRTTable from "../../../components/mrt-table";

const columns = [
  { accessorKey: "dataType", header: "Data Type" },
  { accessorKey: "name", header: "Property Name" },
  {
    accessorKey: "isRequired",
    header: "Required",
    Cell: ({ row }) => {
      return <Typography>{row.original.isRequired ? "Yes" : "No"}</Typography>;
    },
  },
];

export default function AssetTypeProperty({ onClose, row }) {
  const { data, isLoading } = useGetAssetTypeWithPropertiesById(row.original?.id);
  console.log(row.original, "row", data);
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
        }}>
        <Toolbar variant="dense">
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Properties
          </Typography>
          <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close" size="small">
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent dividers>
        <MRTTable
          data={data?.properties || []}
          columns={columns}
          loading={isLoading}
          enableColumnActions={false}
          enableRowActions={false}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="error">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
