// @mui
import { Grid, Container, Typography } from "@mui/material";
// hooks
import useSettings from "../../hooks/useSettings";
// components

// sections
import { AnalyticsWidgetSummary } from "../../sections/@dashboard/general/analytics";
import { BankingRecentTransitions } from "../../sections/@dashboard/general/banking";
import useAuth from "../../hooks/useAuth";
import UserDashboard from "./UserDashboard";

// ----------------------------------------------------------------------

export default function GeneralAnalytics() {
  const { user } = useAuth();
  const { themeStretch } = useSettings();
  console.log(user, "user");
  return (
    <>
      {user.role === "admin" ? (
        <Container maxWidth={themeStretch ? false : "xl"}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Hi, Welcome back
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <AnalyticsWidgetSummary
                title="Total Assets"
                total={5000}
                icon={"mdi:server"}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AnalyticsWidgetSummary
                title="Accepted Request"
                total={2000}
                color="info"
                icon={"carbon:server-dns"}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AnalyticsWidgetSummary
                title="Pending Request"
                total={2000}
                color="warning"
                icon={"mdi:account-pending"}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AnalyticsWidgetSummary
                title="Rejected Request"
                total={1000}
                color="error"
                icon={"line-md:cancel-twotone"}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <BankingRecentTransitions />
            </Grid>
          </Grid>
        </Container>
      ) : (
        <UserDashboard />
      )}
    </>
  );
}
