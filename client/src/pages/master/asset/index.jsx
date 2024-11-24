/* eslint-disable no-unused-vars */
import { useState } from "react";
import MRTTable from "../../../components/mrt-table";
import { Box, Button, IconButton } from "@mui/material";
import Iconify from "../../../components/Iconify";
import AddAsset from "./add-asset";
import { useGetAssets } from "../../../api-hook";

const columns = [
  {
    accessorKey: "type",
    header: "Asset Type",
  },
  {
    accessorKey: "name",
    header: "Asset Name",
  },
  {
    accessorKey: "location",
    header: "Asset Location/Position",
  },
  {
    accessorKey: "capacity",
    header: "Capacity",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "quantityInUse",
    header: "Quantity in use",
  },
];
export default function Asset() {
  const { data, isLoading, refetch } = useGetAssets();
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  return (
    <>
      {open && (
        <AddAsset
          open={open}
          isEditMode={isEditMode}
          onClose={() => {
            setIsEditMode(false);
            setSelectedRow(null);
            setOpen(false);
          }}
          row={selectedRow}
          refetch={refetch}
        />
      )}
      <MRTTable
        data={data || []}
        columns={columns}
        loading={isLoading}
        renderRowActions={({ row }) => (
          <Box sx={{ display: "flex" }}>
            <IconButton
              onClick={() => {
                setOpen(true);
                setSelectedRow(row);
                setIsEditMode(true);
              }}
            >
              <Iconify icon={"eva:edit-fill"} />
            </IconButton>
            <IconButton
              onClick={() => {
                setOpenDelete(true);
                setSelectedRow(row);
              }}
              color="error"
            >
              <Iconify icon={"eva:trash-2-outline"} />
            </IconButton>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setOpen(true);
                setIsEditMode(false);
              }}
            >
              Add New
            </Button>
          </Box>
        )}
      />
    </>
  );
}
