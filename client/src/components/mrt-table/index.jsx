import { useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
// import { loadIcon } from "@iconify/react";

//nested data is ok, see accessorKeys in ColumnDef below
const defaultPagination = {
  pageIndex: 0,
  pageSize: 10,
};

const MRTTable = ({
  data,
  columns,
  renderRowActions,
  renderTopToolbarCustomActions,
  loading,
  pagination = defaultPagination,
  enableRowSelection,
  expanded,
  ...others
}) => {
  const table = useMaterialReactTable({
    columns,
    data,
    // enableColumnResizing: true,
    enableColumnActions: true,
    enableRowActions: true,
    positionActionsColumn: "last",
    enableDensityToggle: false,
    enableColumnPinning: true,
    enableRowSelection: enableRowSelection || false,
    enableFullScreenToggle: false,
    layoutMode: "grid",
    enableStickyHeader: true,
    rowPinningDisplayMode: "select-sticky",
    displayColumnDefOptions: { "mrt-row-actions": { size: 130 } },

    //  enableGrouping:true,
    initialState: {
      density: "comfortable",
      // columnPinning: { left: [], right: ["mrt-row-actions"] },
      expanded: expanded || false,
      showGlobalFilter: true,
      pagination: pagination,
    },
    state: { showSkeletons: loading, showProgressBars: loading },
    muiTableHeadRowProps: {
      sx: {
        background: theme =>
          `${
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[700]
          }  !important`,
      },
    },
    muiTableHeadCellProps: {
      sx: {
        color: theme =>
          theme.palette.mode === "light"
            ? theme.palette.grey[600]
            : theme.palette.grey[200],
        paddingLeft: "4px",
        paddingRight: "8px",
        fontWeight: 600,
        boxShadow: "none",
        background: theme =>
          `${
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[700]
          }  !important`,
        "& .Mui-TableHeadCell-Content": {
          justifyContent: "space-between",
        },
      },
    },
    muiTableBodyCellProps: {
      sx: {
        paddingLeft: "4px",
        paddingRight: "8px",
        boxShadow: "none",
        borderBottom: theme => `1px solid ${theme.palette.grey[300]}`,
      },
    },
    muiTableHeadCellColumnActionsButtonProps: {
      sx: {
        color: theme => theme.palette.primary.contrastText,
        opacity: 1,
      },
    },

    renderRowActions: renderRowActions,
    renderTopToolbarCustomActions: renderTopToolbarCustomActions,
    muiDetailPanelProps: {
      sx: {
        display: "block",
        width: "100%",
        // background: (theme) => theme.palette.grey[100],
      },
    },
    ...others,
  });

  useEffect(() => {
    table.resetRowSelection();
  }, [data, table]);
  return <MaterialReactTable table={table} />;
};

export default MRTTable;
