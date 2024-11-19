/* eslint-disable no-unused-vars */
import { useState } from "react";
import MRTTable from "../../../components/mrt-table";
import { Box, Button, IconButton } from "@mui/material";
import Iconify from "../../../components/Iconify";
import AddRow from "./add-row";
const columns = [
  {
    accessorKey: "name",
    header: "Row Name",
  },
  {
    accessorKey: "name",
    header: "Description",
  },
];
export default function AssertsRow() {
  const [record, setRecords] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  return (
    <>
      {open && (
        <AddRow
          open={open}
          isEditMode={isEditMode}
          onClose={() => {
            setIsEditMode(false);
            setSelectedRow(null);
            setOpen(false);
          }}
        />
      )}
      <MRTTable
        data={record}
        columns={columns}
        loading={false}
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
