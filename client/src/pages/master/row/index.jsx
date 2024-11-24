/* eslint-disable no-unused-vars */
import { useState } from "react";
import MRTTable from "../../../components/mrt-table";
import { Box, Button, IconButton } from "@mui/material";
import Iconify from "../../../components/Iconify";
import AddRow from "./add-row";
import { useGetRows } from "../../../api-hook";
import DeleteRecord from "../../../components/DeleteRecord";
import { useSnackbar } from "notistack";
import { deleteRow } from "../../../mutations";
const columns = [
  {
    accessorKey: "name",
    header: "Row Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
];
export default function AssertsRow() {
  const { enqueueSnackbar } = useSnackbar();
  const { data, isLoading, refetch } = useGetRows();
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteRow(selectedRow.id);
      enqueueSnackbar("Successfully deleted record", { variant: "success" });
      setOpenDelete(false);
      setSelectedRow(null);
      refetch();
    } catch (error) {
      enqueueSnackbar("Failed to delete", { variant: "error" });
    }
  };
  return (
    <>
      {open && (
        <AddRow
          open={open}
          row={selectedRow}
          isEditMode={isEditMode}
          onClose={() => {
            setIsEditMode(false);
            setSelectedRow(null);
            setOpen(false);
          }}
          refetch={refetch}
        />
      )}
      {openDelete && (
        <DeleteRecord
          title={"Delete Row"}
          row={selectedRow}
          onClose={() => {
            setOpenDelete(false);
            setSelectedRow(null);
          }}
          onSubmit={handleDelete}
        />
      )}
      <MRTTable
        data={data ?? []}
        columns={columns}
        loading={isLoading}
        renderRowActions={({ row }) => (
          <Box sx={{ display: "flex" }}>
            <IconButton
              onClick={() => {
                setOpen(true);
                setSelectedRow(row.original);
                setIsEditMode(true);
              }}
            >
              <Iconify icon={"eva:edit-fill"} />
            </IconButton>
            <IconButton
              onClick={() => {
                setOpenDelete(true);
                setSelectedRow(row.original);
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
