import { Suspense } from "react";
// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import Settings from "./components/settings";
import RtlLayout from "./components/RtlLayout";
import { ChartStyle } from "./components/chart";
import ScrollToTop from "./components/ScrollToTop";
import { ProgressBarStyle } from "./components/ProgressBar";
import NotistackProvider from "./components/NotistackProvider";
import ThemeColorPresets from "./components/ThemeColorPresets";
import ThemeLocalization from "./components/ThemeLocalization";
import MotionLazyContainer from "./components/animate/MotionLazyContainer";
import LoadingScreen from "./components/LoadingScreen";
import { useNavigate } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// ----------------------------------------------------------------------
const createQueryClient = navigate =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        throwOnError: error => {
          if (error?.response?.status === 401) {
            console.error("Unauthorized! Redirecting to login...");
            navigate("/auth/login"); // Redirect to the login page
          } else {
            console.error("Error:", error);
          }
        },
      },
    },
  });

// ----------------------------------------------------------------------

export default function App() {
  const navigate = useNavigate();
  const queryClient = createQueryClient(navigate);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ThemeColorPresets>
          <ThemeLocalization>
            <RtlLayout>
              <NotistackProvider>
                <MotionLazyContainer>
                  <ProgressBarStyle />
                  <ChartStyle />
                  <Settings />
                  <ScrollToTop />
                  <Suspense fallback={<LoadingScreen />}>
                    <Router />
                  </Suspense>
                </MotionLazyContainer>
              </NotistackProvider>
            </RtlLayout>
          </ThemeLocalization>
        </ThemeColorPresets>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
