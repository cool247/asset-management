// @mui
import { Grid, Container, Typography } from "@mui/material";
// hooks
import useSettings from "../../hooks/useSettings";
// components

// sections
import { AnalyticsWidgetSummary } from "../../sections/@dashboard/general/analytics";
import { BankingRecentTransitions } from "../../sections/@dashboard/general/banking";

// ----------------------------------------------------------------------

export default function UserDashboard() {
  const { themeStretch } = useSettings();

  return (
    <Container maxWidth={themeStretch ? false : "xl"}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Total Assets"
            total={100}
            icon={"mdi:server"}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Accepted Request"
            total={90}
            color="info"
            icon={"carbon:server-dns"}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Pending Request"
            total={1}
            color="warning"
            icon={"mdi:account-pending"}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Rejected Request"
            total={9}
            color="error"
            icon={"line-md:cancel-twotone"}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <BankingRecentTransitions isUser />
        </Grid>
      </Grid>
    </Container>
  );
}
