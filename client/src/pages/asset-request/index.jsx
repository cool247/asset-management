/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import Iconify from "../../components/Iconify";
import { useGetAllAssetsRequestAdmin } from "../../api-hook";
import MRTTable from "../../components/mrt-table";
import Label from "../../components/Label";
import { Close } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";
import { updateReqByAdmin } from "../../mutations";

const getStatusColor = (status) => {
  if (status === "Pending") {
    return "warning";
  }
  if (status === "Approved") {
    return "success";
  }
  if (status === "Rejected") {
    return "error";
  }
  return "default";
};

const columns = [
  {
    accessorKey: "requesterName",
    header: "Requested By",
  },
  {
    accessorKey: "assetName",
    header: "Asset Name",
  },
  {
    accessorKey: "requestedQuantity",
    header: "Requested Qty",
  },
  {
    accessorKey: "requestedRemarks",
    header: "Requester Remarks",
  },
  {
    accessorKey: "approvedQuantity",
    header: "Approved Qty",
  },
  {
    accessorKey: "approvalRemarks",
    header: "Approval Remarks",
  },
  {
    accessorKey: "createdAt",
    header: "Requested Date",
    Cell: ({ renderedCellValue }) => (
      <Typography variant={"body2"} fontFamily={"monospace"} color="error">
        {new Date(renderedCellValue).toDateString()}
      </Typography>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    Cell: ({ renderedCellValue }) => (
      <Label variant={"ghost"} color={getStatusColor(renderedCellValue)}>
        {renderedCellValue}
      </Label>
    ),
  },
];
export default function AllAssetRequestAdmin() {
  const { enqueueSnackbar } = useSnackbar();
  const { data, isLoading, refetch } = useGetAllAssetsRequestAdmin();
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [approvedQuantity, setApprovedQuantity] = useState(0);
  const [selectedActionType, setSetSelectedActionType] = useState("");
  const onClose = () => {
    setOpen(false);
    setSetSelectedActionType("");
    setRemarks("");
    setApprovedQuantity(0);
  };
  const onSubmit = async () => {
    setLoading(true);
    try {
      const req = {
        status: selectedActionType,
        approvalRemarks: remarks,
        approvedQuantity:parseInt(approvedQuantity,10),
      };
      await updateReqByAdmin(req, selectedRow.requestId);
      enqueueSnackbar("Successfully updated status ", { variant: "success" });
      onClose();
      refetch();
    } catch (error) {
      enqueueSnackbar("Failed to update status", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MRTTable
        data={data || []}
        columns={columns}
        loading={isLoading}
        renderRowActions={({ row }) => (
          <Box sx={{ display: "flex" }}>
            {row.original.status === "Pending" ? (
              <>
                <IconButton
                  onClick={() => {
                    setOpen(true);
                    setSelectedRow(row.original);
                    setSetSelectedActionType("Approved");
                  }}
                  color="success">
                  <Iconify icon={"healthicons:yes"} />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setOpen(true);
                    setSelectedRow(row.original);
                    setSetSelectedActionType("Rejected");
                  }}
                  color="error">
                  <Iconify icon={"material-symbols:cancel"} />
                </IconButton>
              </>
            ) : (
              <IconButton color="info">
                <Iconify icon={"hugeicons:view"} />
              </IconButton>
            )}
          </Box>
        )}
      />

      <Dialog
        maxWidth={"xs"}
        fullWidth
        open={open}
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
              Approve/Reject
            </Typography>
            <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close" size="small">
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                type="number"
                placeholder="Approved Qty"
                label="Approved Qty"
                onChange={(e) => {
                  setApprovedQuantity(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label='Remarks'
                placeholder="Enter you remarks here..."
                onChange={(e) => {
                  setRemarks(e.target.value);
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions>
          <LoadingButton onClick={onSubmit} variant="contained" color="success" loading={loading}>
            Submit
          </LoadingButton>

          <Button onClick={onClose} variant="contained" color="error">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
