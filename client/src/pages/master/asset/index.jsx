/* eslint-disable no-unused-vars */
import { useState, useMemo } from "react";
import MRTTable from "../../../components/mrt-table";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Iconify from "../../../components/Iconify";
import AddAsset from "./add-asset";
import { useGetAssetsById, useGetAssetTypes } from "../../../api-hook";
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
    (data || []).forEach((item) => {
      Object.keys(item.properties || {}).forEach((key) => keys.add(key));
    });
    return Array.from(keys);
  }, [data]);

  const columns = useMemo(() => {
    const staticColumns = [
      { accessorKey: "assetName", header: "Asset Name" },
      { accessorKey: "totalQuantity", header: "Quantity" },
      { accessorKey: "usedQuantity", header: "Quantity in Use" },
    ];
    const propertyColumns = dynamicPropertyKeys.map((key) => ({
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
            refetch()
          }}
          row={selectedRow}
        />
      )}

      <TextField
        value={selectedAssetTypeId}
        label="Select Asset Type"
        onChange={(e) => setSelectedAssetTypeId(e.target.value)}
        select
        sx={{ minWidth: 300 }}
        size="small">
        <MenuItem value={""}>Select</MenuItem>
        {assetType?.map((el, index) => (
          <MenuItem value={el.id} key={index}>
            {el.name}
          </MenuItem>
        ))}
      </TextField>

      {!isLoading ? (
        <MRTTable
          data={data}
          columns={columns}
          renderRowActions={({ row }) => (
            <Box sx={{ display: "flex" }}>
              <IconButton
                onClick={() => {
                  setOpenItems(true);
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
      ) : (
        <SkeletonTable />
      )}
    </>
  );
}

const SkeletonTable = ({ rows = 10, columns = 4 }) => {
  return (
    <Table>
      {/* Table Head Skeleton */}
      <TableHead>
        <TableRow>
          {[...Array(columns)].map((_, index) => (
            <TableCell key={`head-${index}`}>
              <Skeleton variant="text" width="80%" height={20} />
            </TableCell>
          ))}
        </TableRow>
      </TableHead>

      {/* Table Body Skeleton */}
      <TableBody>
        {[...Array(rows)].map((_, rowIndex) => (
          <TableRow key={`row-${rowIndex}`}>
            {[...Array(columns)].map((_, colIndex) => (
              <TableCell key={`cell-${rowIndex}-${colIndex}`}>
                <Skeleton variant="rectangular" width="100%" height={20} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
