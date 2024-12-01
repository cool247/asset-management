4; /* eslint-disable no-unused-vars */
import { useState, useMemo } from "react";
import MRTTable from "../../../components/mrt-table";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Iconify from "../../../components/Iconify";
import AddAsset from "./add-asset";
import {
  useGetAssets,
  useGetAssetsById,
  useGetAssetTypes,
} from "../../../api-hook";
import AddAssetItems from "./asset-items";

export default function Asset() {
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedAssetTypeId, setSelectedAssetTypeId] = useState(1);
  const [openItems, setOpenItems] = useState(false);

  const { data: assetType } = useGetAssetTypes();
  const { data, isLoading, refetch } = useGetAssetsById(selectedAssetTypeId);

  const dynamicPropertyKeys = useMemo(() => {
    const keys = new Set();
    (data || []).forEach(item => {
      Object.keys(item.properties || {}).forEach(key => keys.add(key));
    });
    return Array.from(keys);
  }, [data]);

  const columns = useMemo(() => {
    const staticColumns = [
      { accessorKey: "assetName", header: "Asset Name" },
      { accessorKey: "totalQuantity", header: "Quantity" },
      { accessorKey: "usedQuantity", header: "Quantity in Use" },
    ];
    const propertyColumns = dynamicPropertyKeys.map(key => ({
      accessorKey: `properties.${key}`,
      header: key,
    }));
    return [...staticColumns, ...propertyColumns];
  }, [dynamicPropertyKeys]);

  return (
    <>
      {open && (
        <AddAsset
          isEditMode={isEditMode}
          onClose={() => {
            setIsEditMode(false);
            setSelectedRow(null);
            setOpen(false);
          }}
          row={selectedRow}
          refetch={refetch}
          assetTypeId={selectedAssetTypeId}
        />
      )}

      {openItems && (
        <AddAssetItems
          onClose={() => {
            setSelectedRow(null);
            setOpenItems(false);
          }}
          row={selectedRow}
          assetTypeId={selectedAssetTypeId}
        />
      )}

      <TextField
        value={selectedAssetTypeId}
        label="Select Asset Type"
        onChange={e => setSelectedAssetTypeId(e.target.value)}
        select
        sx={{ minWidth: 300 }}
        size="small"
      >
        <MenuItem value={""}>Select</MenuItem>
        {assetType?.map((el, index) => (
          <MenuItem value={el.id} key={index}>
            {el.name}
          </MenuItem>
        ))}
      </TextField>

      <MRTTable
        data={data || []}
        columns={columns}
        loading={isLoading}
        renderRowActions={({ row }) => (
          <Box sx={{ display: "flex" }}>
            <IconButton
              onClick={() => {
                setOpenItems(true);
                setSelectedRow(row);
              }}
            >
              <Iconify icon={"eva:eye-fill"} sx={{ color: "skyblue" }} />
            </IconButton>
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
