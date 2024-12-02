import PropTypes from "prop-types";
import { useState } from "react";
import { format } from "date-fns";
import { sentenceCase } from "change-case";
// @mui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Card,
  Table,
  Avatar,
  Button,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  Typography,
  IconButton,
  TableContainer,
} from "@mui/material";
// utils
// _mock
import { _bankingRecentTransitions } from "../../../../_mock";
// components
import Label from "../../../../components/Label";
import Iconify from "../../../../components/Iconify";
import Scrollbar from "../../../../components/Scrollbar";
import MenuPopover from "../../../../components/MenuPopover";

// ----------------------------------------------------------------------

export default function BankingRecentTransitions({ isUser }) {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  return (
    <>
      <Card>
        <CardHeader
          title={isUser ? "My Recent Transaction" : "Recent Transitions"}
          sx={{ mb: 3 }}
        />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Requested By</TableCell>
                  <TableCell>Assets</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {_bankingRecentTransitions.map(row => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.assetName}</TableCell>
                    <TableCell>{row.message}</TableCell>

                    <TableCell>
                      <Typography variant="subtitle2">
                        {format(new Date(row.date), "dd MMM yyyy")}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {format(new Date(row.date), "p")}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Label
                        variant={isLight ? "ghost" : "filled"}
                        color={
                          (row.status === "approved" && "success") ||
                          (row.status === "pending" && "warning") ||
                          "error"
                        }
                      >
                        {sentenceCase(row.status)}
                      </Label>
                    </TableCell>

                    <TableCell align="right">
                      <MoreMenuButton />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Divider />

        <Box sx={{ p: 2, textAlign: "right" }}>
          <Button
            size="small"
            color="inherit"
            LinkComponent={"a"}
            href={isUser ? "user/my-all-request" : "action/assets-request"}
            // onClick={() => {
            //   navigate("action/assets-request");
            // }}
            endIcon={<Iconify icon={"eva:arrow-ios-forward-fill"} />}
          >
            View All
          </Button>
        </Box>
      </Card>
    </>
  );
}

// ----------------------------------------------------------------------

AvatarIcon.propTypes = {
  icon: PropTypes.string.isRequired,
};

function AvatarIcon({ icon }) {
  return (
    <Avatar
      sx={{
        width: 48,
        height: 48,
        color: "text.secondary",
        bgcolor: "background.neutral",
      }}
    >
      <Iconify icon={icon} width={24} height={24} />
    </Avatar>
  );
}

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

function MoreMenuButton() {
  const [open, setOpen] = useState(null);

  const handleOpen = event => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };

  return (
    <>
      <IconButton size="large" onClick={handleOpen}>
        <Iconify icon={"eva:more-vertical-fill"} width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        arrow="right-top"
        sx={{
          mt: -0.5,
          width: 160,
          "& .MuiMenuItem-root": {
            px: 1,
            typography: "body2",
            borderRadius: 0.75,
          },
        }}
      >
        <MenuItem>
          <Iconify icon={"eva:download-fill"} sx={{ ...ICON }} />
          Download
        </MenuItem>

        <MenuItem>
          <Iconify icon={"eva:printer-fill"} sx={{ ...ICON }} />
          Print
        </MenuItem>

        <MenuItem>
          <Iconify icon={"eva:share-fill"} sx={{ ...ICON }} />
          Share
        </MenuItem>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem sx={{ color: "error.main" }}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ ...ICON }} />
          Delete
        </MenuItem>
      </MenuPopover>
    </>
  );
}
