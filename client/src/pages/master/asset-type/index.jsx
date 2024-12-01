/* eslint-disable no-unused-vars */
import { useState, useMemo } from "react";
import MRTTable from "../../../components/mrt-table";
import { Box, Button, IconButton, MenuItem, Select, TextField, Typography } from "@mui/material";
import Iconify from "../../../components/Iconify";
import { useGetAllAssetTypes, useGetAssets, useGetAssetTypes } from "../../../api-hook";
import AddAssetType from "./add-asset-type";
import AssetTypeProperty from "./asset-type-property";

const columns = [
  { accessorKey: "name", header: "Asset Type Name" },
  // { accessorKey: "propertyDataType", header: "DataType" },
  // { accessorKey: "propertyName", header: "propertyName" },
  // {
  //   accessorKey: "propertyIsRequired",
  //   header: "Required",
  //   Cell: ({ row }) => {
  //     return <Typography>{row.original.propertyIsRequired ? "Yes" : "No"}</Typography>;
  //   },
  // },
];

export default function AssetType() {
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [openPropView, setOpenPropView] = useState(false);

  const { data, isLoading, refetch } = useGetAllAssetTypes();

  return (
    <>
      {open && (
        <AddAssetType
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

      {openPropView && (
        <AssetTypeProperty
          onClose={() => {
            setSelectedRow(null);
            setOpenPropView(false);
          }}
          row={selectedRow}
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
                setOpenPropView(true);
                setSelectedRow(row);
              }}>
              <Iconify icon={"eva:eye-fill"} sx={{ color: "skyblue" }} />
            </IconButton>
            <IconButton
              onClick={() => {
                setOpen(true);
                setSelectedRow(row);
                setIsEditMode(true);
              }}>
              <Iconify icon={"eva:edit-fill"} />
            </IconButton>
            <IconButton
              onClick={() => {
                setOpenDelete(true);
                setSelectedRow(row);
              }}
              color="error">
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
              }}>
              Add New
            </Button>
          </Box>
        )}
      />
    </>
  );
}
